import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

export const INDEX_VERSION = 1;
export const DEFAULT_INDEX_PATH = ".ai/project-knowledge/index.json";
export const DEFAULT_EVAL_CASES_PATH = ".ai/project-knowledge/eval-cases.json";

const MARKDOWN_EXTENSIONS = new Set([".md", ".mdx"]);
const SOURCE_EXTENSIONS = new Set([".css", ".json", ".mjs", ".ts", ".tsx", ".yaml", ".yml"]);
const INDEXABLE_EXTENSIONS = new Set([...MARKDOWN_EXTENSIONS, ...SOURCE_EXTENSIONS]);
const STOP_WORDS = new Set([
  "a",
  "about",
  "after",
  "all",
  "also",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "before",
  "by",
  "can",
  "code",
  "do",
  "docs",
  "for",
  "from",
  "has",
  "how",
  "if",
  "in",
  "is",
  "it",
  "its",
  "must",
  "not",
  "of",
  "on",
  "or",
  "project",
  "should",
  "source",
  "that",
  "the",
  "this",
  "to",
  "use",
  "when",
  "with",
]);

const ALLOWLIST = [
  "AGENTS.md",
  ".ai/ai-sdlc",
  ".ai/project-map",
  ".ai/project-knowledge/README.md",
  ".ai/project-knowledge/eval-cases.json",
  "package.json",
  "turbo.json",
  "apps/web/package.json",
  "apps/web/tsconfig.json",
  "apps/web/next.config.mjs",
  "apps/web/eslint.config.mjs",
  "apps/web/tailwind.config.js",
  "apps/web/postcss.config.mjs",
  "apps/web/src",
  "packages/shared/src",
  "packages/shared/tokens.json",
  "packages/data",
];

const DENY_SEGMENTS = new Set([".git", ".next", ".pnp", ".turbo", ".vercel", "coverage", "dist", "node_modules", "out-tsc"]);

const DENY_FILE_PATTERNS = [
  /^\.env(?:\.|$)/,
  /^npm-debug\.log/,
  /^yarn-debug\.log/,
  /^yarn-error\.log/,
  /(?:^|\/)package-lock\.json$/,
  /(?:^|\/)yarn\.lock$/,
  /(?:^|\/)pnpm-lock\.yaml$/,
  /\.(?:key|pem|p12|pfx|crt|cer)$/i,
  /index\.json$/,
  /eval-results\.json$/,
  /\.tmp\.json$/,
];

const SECRET_PATTERNS = [
  /-----BEGIN (?:RSA |EC |OPENSSH |DSA |)?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\b(?:sk|pk)-[A-Za-z0-9]{24,}\b/,
  /\b(?:password|secret|token|api[_-]?key)\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{24,}/i,
];

export function resolveRepoPath(relativePath) {
  return path.resolve(process.cwd(), relativePath);
}

export function toRepoRelative(absolutePath) {
  return path.relative(process.cwd(), absolutePath).split(path.sep).join("/");
}

export async function ensureDirectoryFor(filePath) {
  await fs.mkdir(path.dirname(resolveRepoPath(filePath)), { recursive: true });
}

export async function collectIndexableFiles() {
  const files = [];

  for (const allowPath of ALLOWLIST) {
    const absolutePath = resolveRepoPath(allowPath);
    const stat = await statIfExists(absolutePath);

    if (!stat) {
      continue;
    }

    if (stat.isDirectory()) {
      const directoryFiles = await walkDirectory(absolutePath);
      files.push(...directoryFiles);
    } else if (stat.isFile()) {
      files.push(absolutePath);
    }
  }

  return Array.from(new Set(files.map(toRepoRelative)))
    .filter((filePath) => isIndexablePath(filePath))
    .sort((currentPath, nextPath) => currentPath.localeCompare(nextPath));
}

async function statIfExists(absolutePath) {
  try {
    return await fs.stat(absolutePath);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function walkDirectory(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);
    const relativePath = toRepoRelative(absolutePath);

    if (isDeniedPath(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(absolutePath)));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

export function isIndexablePath(filePath) {
  return INDEXABLE_EXTENSIONS.has(path.extname(filePath)) && !isDeniedPath(filePath);
}

export function isDeniedPath(filePath) {
  const pathSegments = filePath.split("/");

  if (pathSegments.some((segment) => DENY_SEGMENTS.has(segment))) {
    return true;
  }

  return DENY_FILE_PATTERNS.some((pattern) => pattern.test(filePath));
}

export async function readSafeTextFile(filePath) {
  const text = await fs.readFile(resolveRepoPath(filePath), "utf8");
  const secretSignals = SECRET_PATTERNS.filter((pattern) => pattern.test(text)).map((pattern) => pattern.toString());

  if (secretSignals.length > 0) {
    throw new Error(`Refusing to index ${filePath}; secret-like content matched ${secretSignals.join(", ")}`);
  }

  return text;
}

export function buildChunks(filePath, text) {
  const extension = path.extname(filePath);
  const sourceMetadata = classifySource(filePath);

  if (MARKDOWN_EXTENSIONS.has(extension)) {
    return chunkMarkdown(filePath, text, sourceMetadata);
  }

  return chunkPlainText(filePath, text, sourceMetadata);
}

function chunkMarkdown(filePath, text, sourceMetadata) {
  const lines = text.split(/\r?\n/);
  const chunks = [];
  let currentHeading = "Document";
  let currentLines = [];
  let startLine = 1;

  const flush = (endLine) => {
    const content = currentLines.join("\n").trim();

    if (content.length === 0) {
      return;
    }

    chunks.push(createChunk(filePath, currentHeading, content, startLine, endLine, sourceMetadata));
  };

  lines.forEach((line, lineIndex) => {
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line);

    if (headingMatch) {
      flush(lineIndex);
      currentHeading = headingMatch[2].trim();
      currentLines = [line];
      startLine = lineIndex + 1;
      return;
    }

    currentLines.push(line);
  });

  flush(lines.length);

  return splitLargeChunks(chunks);
}

function chunkPlainText(filePath, text, sourceMetadata) {
  const lines = text.split(/\r?\n/);
  const chunks = [];
  const chunkSize = 80;

  for (let startIndex = 0; startIndex < lines.length; startIndex += chunkSize) {
    const chunkLines = lines.slice(startIndex, startIndex + chunkSize);
    const content = chunkLines.join("\n").trim();

    if (content.length === 0) {
      continue;
    }

    chunks.push(
      createChunk(
        filePath,
        `Lines ${startIndex + 1}-${startIndex + chunkLines.length}`,
        content,
        startIndex + 1,
        startIndex + chunkLines.length,
        sourceMetadata,
      ),
    );
  }

  return splitLargeChunks(chunks);
}

function splitLargeChunks(chunks) {
  const maxCharacters = 5000;
  const splitChunks = [];

  for (const chunk of chunks) {
    if (chunk.content.length <= maxCharacters) {
      splitChunks.push(chunk);
      continue;
    }

    const paragraphs = chunk.content.split(/\n{2,}/);
    let buffer = "";
    let splitIndex = 1;

    for (const paragraph of paragraphs) {
      const nextBuffer = buffer.length === 0 ? paragraph : `${buffer}\n\n${paragraph}`;

      if (nextBuffer.length > maxCharacters && buffer.length > 0) {
        splitChunks.push({
          ...chunk,
          id: `${chunk.id}-part-${String(splitIndex).padStart(2, "0")}`,
          heading: `${chunk.heading} (part ${splitIndex})`,
          content: buffer,
        });
        splitIndex++;
        buffer = paragraph;
      } else {
        buffer = nextBuffer;
      }
    }

    if (buffer.length > 0) {
      splitChunks.push({
        ...chunk,
        id: `${chunk.id}-part-${String(splitIndex).padStart(2, "0")}`,
        heading: `${chunk.heading} (part ${splitIndex})`,
        content: buffer,
      });
    }
  }

  return splitChunks;
}

function createChunk(filePath, heading, content, startLine, endLine, sourceMetadata) {
  return {
    id: stableChunkId(filePath, heading, startLine),
    sourcePath: filePath,
    heading,
    startLine,
    endLine,
    content,
    ...sourceMetadata,
  };
}

function stableChunkId(filePath, heading, startLine) {
  const slug = `${filePath}-${heading}-${String(startLine)}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);

  return slug || `chunk-${String(startLine)}`;
}

function classifySource(filePath) {
  if (filePath === "AGENTS.md") {
    return {
      sourceType: "project-instruction",
      ownerRole: "Human Approver",
      authorityLevel: "instruction",
      projectArea: "repository-process",
      moduleName: "ai-sdlc-operating-model",
      riskLevel: "medium",
      containsSensitiveData: false,
      allowedAudiences: ["ai-agents", "maintainers"],
    };
  }

  if (/^\.ai\/ai-sdlc\/adr\/adr-\d+-.+\.md$/.test(filePath)) {
    return {
      sourceType: "adr",
      ownerRole: "AI Architect",
      authorityLevel: "accepted-adr",
      adrStatus: "Accepted",
      projectArea: "architecture-decisions",
      moduleName: "ai-sdlc-operating-model",
      riskLevel: "medium",
      containsSensitiveData: false,
      allowedAudiences: ["ai-agents", "maintainers"],
    };
  }

  if (filePath.startsWith(".ai/ai-sdlc/templates/")) {
    return {
      sourceType: "template",
      ownerRole: "Owning AI role",
      authorityLevel: "template",
      projectArea: "ai-sdlc",
      moduleName: "ai-sdlc-operating-model",
      riskLevel: "low",
      containsSensitiveData: false,
      allowedAudiences: ["ai-agents", "maintainers"],
    };
  }

  if (filePath.startsWith(".ai/ai-sdlc/")) {
    return {
      sourceType: "process-doc",
      ownerRole: "Owning AI role",
      authorityLevel: "process-doc",
      projectArea: "ai-sdlc",
      moduleName: "ai-sdlc-operating-model",
      riskLevel: "medium",
      containsSensitiveData: false,
      allowedAudiences: ["ai-agents", "maintainers"],
    };
  }

  if (filePath.startsWith(".ai/project-map/")) {
    return {
      sourceType: "project-map",
      ownerRole: "AI Architect",
      authorityLevel: "project-map",
      projectArea: "project-navigation",
      moduleName: "project-map",
      riskLevel: "low",
      containsSensitiveData: false,
      allowedAudiences: ["ai-agents", "maintainers"],
    };
  }

  if (filePath.startsWith(".ai/project-knowledge/")) {
    return {
      sourceType: "retrieval-doc",
      ownerRole: "AI Architect",
      authorityLevel: "process-doc",
      projectArea: "project-knowledge",
      moduleName: "project-knowledge-retrieval",
      riskLevel: "low",
      containsSensitiveData: false,
      allowedAudiences: ["ai-agents", "maintainers"],
    };
  }

  if (filePath.startsWith("apps/web/src/")) {
    return {
      sourceType: "source-code",
      ownerRole: "AI Developer",
      authorityLevel: "source-code",
      projectArea: "web-app",
      moduleName: "web-app",
      riskLevel: "low",
      containsSensitiveData: false,
      allowedAudiences: ["ai-agents", "maintainers"],
    };
  }

  if (filePath.startsWith("packages/")) {
    return {
      sourceType: "source-code",
      ownerRole: "AI Developer",
      authorityLevel: "source-code",
      projectArea: "shared-packages",
      moduleName: filePath.startsWith("packages/data/") ? "phrase-data" : "shared-package",
      riskLevel: "low",
      containsSensitiveData: false,
      allowedAudiences: ["ai-agents", "maintainers"],
    };
  }

  return {
    sourceType: "config",
    ownerRole: "AI Developer",
    authorityLevel: "source-code",
    projectArea: "configuration",
    moduleName: "web-config",
    riskLevel: "low",
    containsSensitiveData: false,
    allowedAudiences: ["ai-agents", "maintainers"],
  };
}

export function tokenize(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9а-яіїєґ]+/iu)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}

export function buildVector(tokens, idf) {
  const termFrequency = new Map();

  for (const token of tokens) {
    termFrequency.set(token, (termFrequency.get(token) ?? 0) + 1);
  }

  const vector = {};

  for (const [token, count] of termFrequency.entries()) {
    const tokenIdf = idf[token];

    if (tokenIdf == null) {
      continue;
    }

    vector[token] = Number((count * tokenIdf).toFixed(6));
  }

  return vector;
}

export function cosineSimilarity(currentVector, nextVector) {
  let dotProduct = 0;
  let currentMagnitude = 0;
  let nextMagnitude = 0;

  for (const value of Object.values(currentVector)) {
    currentMagnitude += value * value;
  }

  for (const [token, value] of Object.entries(nextVector)) {
    nextMagnitude += value * value;
    dotProduct += (currentVector[token] ?? 0) * value;
  }

  if (currentMagnitude === 0 || nextMagnitude === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(currentMagnitude) * Math.sqrt(nextMagnitude));
}

export function parseCommonArgs(argv) {
  const parsedArgs = {
    indexPath: DEFAULT_INDEX_PATH,
    limit: 8,
    queryParts: [],
  };

  for (let argIndex = 0; argIndex < argv.length; argIndex++) {
    const argument = argv[argIndex];

    if (argument === "--index") {
      parsedArgs.indexPath = argv[argIndex + 1] ?? parsedArgs.indexPath;
      argIndex++;
      continue;
    }

    if (argument === "--limit") {
      const parsedLimit = Number.parseInt(argv[argIndex + 1] ?? "", 10);
      parsedArgs.limit = Number.isFinite(parsedLimit) ? parsedLimit : parsedArgs.limit;
      argIndex++;
      continue;
    }

    parsedArgs.queryParts.push(argument);
  }

  return parsedArgs;
}

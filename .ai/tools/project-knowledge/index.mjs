import { promises as fs } from "node:fs";
import process from "node:process";

import {
  buildChunks,
  buildVector,
  collectIndexableFiles,
  DEFAULT_INDEX_PATH,
  ensureDirectoryFor,
  INDEX_VERSION,
  readSafeTextFile,
  resolveRepoPath,
  tokenize,
} from "./shared.mjs";

function parseArgs(argv) {
  const parsedArgs = {
    outputPath: DEFAULT_INDEX_PATH,
  };

  for (let argIndex = 0; argIndex < argv.length; argIndex++) {
    const argument = argv[argIndex];

    if (argument === "--output") {
      parsedArgs.outputPath = argv[argIndex + 1] ?? parsedArgs.outputPath;
      argIndex++;
    }
  }

  return parsedArgs;
}

export async function buildKnowledgeIndex() {
  const files = await collectIndexableFiles();
  const chunks = [];

  for (const filePath of files) {
    const text = await readSafeTextFile(filePath);
    chunks.push(...buildChunks(filePath, text));
  }

  const chunkTokens = chunks.map((chunk) => tokenize(`${chunk.heading}\n${chunk.content}`));
  const documentFrequency = new Map();

  for (const tokens of chunkTokens) {
    for (const token of new Set(tokens)) {
      documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
    }
  }

  const chunkCount = chunks.length;
  const idf = {};

  for (const [token, frequency] of documentFrequency.entries()) {
    idf[token] = Number((Math.log((chunkCount + 1) / (frequency + 1)) + 1).toFixed(6));
  }

  const indexedChunks = chunks.map((chunk, chunkIndex) => ({
    ...chunk,
    tokenCount: chunkTokens[chunkIndex].length,
    vector: buildVector(chunkTokens[chunkIndex], idf),
  }));

  return {
    version: INDEX_VERSION,
    generatedAt: new Date().toISOString(),
    retrievalModel: "local-tfidf-cosine",
    embeddingProvider: "none",
    corpus: {
      fileCount: files.length,
      chunkCount,
      files,
    },
    idf,
    chunks: indexedChunks,
  };
}

async function main() {
  const { outputPath } = parseArgs(process.argv.slice(2));
  const index = await buildKnowledgeIndex();

  await ensureDirectoryFor(outputPath);
  await fs.writeFile(resolveRepoPath(outputPath), `${JSON.stringify(index, null, 2)}\n`, "utf8");

  console.log(`Indexed ${String(index.corpus.fileCount)} files into ${String(index.corpus.chunkCount)} chunks.`);
  console.log(`Wrote ${outputPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

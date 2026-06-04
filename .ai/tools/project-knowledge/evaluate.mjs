import { promises as fs } from "node:fs";
import process from "node:process";

import { DEFAULT_EVAL_CASES_PATH, DEFAULT_INDEX_PATH, resolveRepoPath } from "./shared.mjs";
import { buildKnowledgeIndex } from "./index.mjs";
import { searchKnowledgeIndex } from "./search.mjs";

function parseArgs(argv) {
  const parsedArgs = {
    casesPath: DEFAULT_EVAL_CASES_PATH,
    indexPath: DEFAULT_INDEX_PATH,
    limit: 8,
  };

  for (let argIndex = 0; argIndex < argv.length; argIndex++) {
    const argument = argv[argIndex];

    if (argument === "--cases") {
      parsedArgs.casesPath = argv[argIndex + 1] ?? parsedArgs.casesPath;
      argIndex++;
      continue;
    }

    if (argument === "--index") {
      parsedArgs.indexPath = argv[argIndex + 1] ?? parsedArgs.indexPath;
      argIndex++;
      continue;
    }

    if (argument === "--limit") {
      const parsedLimit = Number.parseInt(argv[argIndex + 1] ?? "", 10);
      parsedArgs.limit = Number.isFinite(parsedLimit) ? parsedLimit : parsedArgs.limit;
      argIndex++;
    }
  }

  return parsedArgs;
}

async function readEvalCases(casesPath) {
  const casesText = await fs.readFile(resolveRepoPath(casesPath), "utf8");

  return JSON.parse(casesText);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const evalCases = await readEvalCases(args.casesPath);
  const index = await buildKnowledgeIndex();
  const results = [];

  for (const evalCase of evalCases) {
    const searchResult = await searchKnowledgeIndex(evalCase.query, {
      index,
      indexPath: args.indexPath,
      limit: args.limit,
    });
    const returnedPaths = new Set(searchResult.results.map((result) => result.chunk.sourcePath));
    const matchedPaths = evalCase.expectedPaths.filter((expectedPath) => returnedPaths.has(expectedPath));
    const didPass = matchedPaths.length > 0;

    results.push({
      id: evalCase.id,
      query: evalCase.query,
      didPass,
      matchedPaths,
      expectedPaths: evalCase.expectedPaths,
      topPaths: searchResult.results.map((result) => result.chunk.sourcePath),
    });
  }

  const passedCount = results.filter((result) => result.didPass).length;
  const totalCount = results.length;

  for (const result of results) {
    const status = result.didPass ? "PASS" : "FAIL";
    console.log(`${status} ${result.id}`);

    if (!result.didPass) {
      console.log(`  Expected one of: ${result.expectedPaths.join(", ")}`);
      console.log(`  Top paths: ${result.topPaths.join(", ")}`);
    }
  }

  console.log(`\nRetrieval eval: ${String(passedCount)}/${String(totalCount)} passed.`);

  if (passedCount !== totalCount) {
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

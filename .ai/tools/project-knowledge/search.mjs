import { promises as fs } from "node:fs";
import process from "node:process";

import { buildVector, cosineSimilarity, DEFAULT_INDEX_PATH, parseCommonArgs, resolveRepoPath, tokenize } from "./shared.mjs";
import { buildKnowledgeIndex } from "./index.mjs";

async function loadOrBuildIndex(indexPath) {
  try {
    const indexText = await fs.readFile(resolveRepoPath(indexPath), "utf8");

    return JSON.parse(indexText);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.error(`Index not found at ${indexPath}; building an in-memory index for this search.`);

      return buildKnowledgeIndex();
    }

    throw error;
  }
}

export async function searchKnowledgeIndex(query, options = {}) {
  const indexPath = options.indexPath ?? DEFAULT_INDEX_PATH;
  const limit = options.limit ?? 8;
  const index = options.index ?? (await loadOrBuildIndex(indexPath));
  const queryTokens = tokenize(query);
  const queryVector = buildVector(queryTokens, index.idf);

  const results = index.chunks
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryVector, chunk.vector),
    }))
    .filter((result) => result.score > 0)
    .sort((currentResult, nextResult) => nextResult.score - currentResult.score)
    .slice(0, limit);

  return {
    query,
    retrievalModel: index.retrievalModel,
    generatedAt: index.generatedAt,
    results,
  };
}

function printResults(searchResult) {
  if (searchResult.results.length === 0) {
    console.log("No matching chunks found.");
    return;
  }

  for (const [resultIndex, result] of searchResult.results.entries()) {
    const { chunk, score } = result;
    const excerpt = chunk.content.replace(/\s+/g, " ").slice(0, 280);

    console.log(`${String(resultIndex + 1)}. ${chunk.sourcePath}:${String(chunk.startLine)} (${score.toFixed(4)})`);
    console.log(`   ${chunk.heading}`);
    console.log(`   authority=${chunk.authorityLevel}; type=${chunk.sourceType}; model=${searchResult.retrievalModel}`);
    console.log(`   ${excerpt}${chunk.content.length > 280 ? "..." : ""}`);
  }
}

async function main() {
  const args = parseCommonArgs(process.argv.slice(2));
  const query = args.queryParts.join(" ").trim();

  if (query.length === 0) {
    console.error('Usage: npm run knowledge:search -- "query" [--limit 8] [--index .ai/project-knowledge/index.json]');
    process.exitCode = 1;
    return;
  }

  const searchResult = await searchKnowledgeIndex(query, {
    indexPath: args.indexPath,
    limit: args.limit,
  });

  printResults(searchResult);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

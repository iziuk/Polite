#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const CURRENT_FILE_PATH = fileURLToPath(import.meta.url);
const CURRENT_DIRNAME = dirname(CURRENT_FILE_PATH);
const ROOT = resolve(CURRENT_DIRNAME, "..");
const VERSION_JSON_PATH = resolve(ROOT, "version.json");
const INITIAL_VERSION = "0.0.0.0";
const VERSION_PATTERN = /^\d+\.\d+\.\d+\.\d+$/;

const rawArgs = process.argv.slice(2);
const isDryRun = rawArgs.includes("--dry-run");
const version = rawArgs.find((arg) => arg !== "--dry-run");

const exitWithError = (message) => {
  process.stderr.write(`${message}\n`);
  process.exit(1);
};

const runGit = (args, options = {}) => {
  const result = spawnSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: options.stdio ?? "pipe",
  });

  if (result.status !== 0 && !options.allowFailure) {
    const errorOutput = result.stderr.trim() || result.stdout.trim();
    exitWithError(errorOutput);
  }

  return {
    output: result.stdout.trim(),
    status: result.status ?? 1,
  };
};

const assertValidReleaseVersion = (targetVersion) => {
  if (!VERSION_PATTERN.test(targetVersion)) {
    exitWithError(`Invalid version "${targetVersion}". Expected format: a.b.c.d, for example 1.2.3.4.`);
  }
};

const compareReleaseVersions = (currentVersion, targetVersion) => {
  const currentParts = currentVersion.split(".").map(Number);
  const targetParts = targetVersion.split(".").map(Number);

  for (let partIndex = 0; partIndex < 4; partIndex++) {
    if (targetParts[partIndex] > currentParts[partIndex]) {
      return 1;
    }

    if (targetParts[partIndex] < currentParts[partIndex]) {
      return -1;
    }
  }

  return 0;
};

const readCurrentVersion = () => {
  if (!existsSync(VERSION_JSON_PATH)) {
    return INITIAL_VERSION;
  }

  const parsedVersion = JSON.parse(readFileSync(VERSION_JSON_PATH, "utf8"));

  if (typeof parsedVersion.version !== "string") {
    exitWithError("version.json must contain a string version field.");
  }

  assertValidReleaseVersion(parsedVersion.version);

  return parsedVersion.version;
};

const writeVersionJson = (targetVersion) => {
  writeFileSync(VERSION_JSON_PATH, `${JSON.stringify({ version: targetVersion }, null, 2)}\n`, "utf8");
};

const getCurrentBranch = () => runGit(["branch", "--show-current"]).output;
const hasUncommittedChanges = () => runGit(["status", "--porcelain"]).output !== "";

const branchExistsLocally = (branchName) => runGit(["show-ref", "--verify", "--quiet", `refs/heads/${branchName}`], { allowFailure: true }).status === 0;

const branchExistsOnRemote = (branchName) => runGit(["ls-remote", "--exit-code", "--heads", "origin", branchName], { allowFailure: true }).status === 0;

if (!version) {
  exitWithError("Version argument is required. Usage: yarn release <a.b.c.d> [--dry-run]");
}

assertValidReleaseVersion(version);

const currentBranch = getCurrentBranch();

if (!isDryRun && currentBranch !== "main") {
  exitWithError(`Release must start from main. Current branch: ${currentBranch}`);
}

if (!isDryRun && hasUncommittedChanges()) {
  exitWithError("Working tree has uncommitted changes. Commit or stash them before creating a release.");
}

const currentVersion = readCurrentVersion();
const versionComparison = compareReleaseVersions(currentVersion, version);

if (versionComparison <= 0) {
  exitWithError(`Release version ${version} must be greater than current version ${currentVersion}.`);
}

const releaseBranch = `release/${version}`;

if (branchExistsLocally(releaseBranch)) {
  exitWithError(`Branch ${releaseBranch} already exists locally.`);
}

if (branchExistsOnRemote(releaseBranch)) {
  exitWithError(`Branch ${releaseBranch} already exists on origin.`);
}

if (isDryRun) {
  process.stdout.write(
    `Dry run passed. ${releaseBranch} can be created from main and version.json can be updated from ${currentVersion} to ${version}. Actual release still requires a clean main branch.\n`,
  );
  process.exit(0);
}

process.stdout.write("Pulling latest main from origin...\n");
runGit(["pull", "--ff-only", "origin", "main"], { stdio: "inherit" });

process.stdout.write(`Creating ${releaseBranch}...\n`);
runGit(["checkout", "-b", releaseBranch], { stdio: "inherit" });

writeVersionJson(version);

runGit(["add", "version.json"], { stdio: "inherit" });
runGit(["commit", "-m", `chore: release ${version}`], { stdio: "inherit" });
runGit(["push", "-u", "origin", releaseBranch], { stdio: "inherit" });

process.stdout.write(`Release ${version} created and pushed as ${releaseBranch}.\n`);

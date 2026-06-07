#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const runGit = (args) => {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

runGit(["config", "merge.yarn-merge-driver.name", "Automatically merge Yarn lockfiles"]);
runGit(["config", "merge.yarn-merge-driver.driver", 'corepack yarn npm-merge-driver merge %A %O %B %P -c "corepack yarn"']);

process.stdout.write("Configured yarn-merge-driver for yarn.lock\n");

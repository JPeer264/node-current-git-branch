import isGit from "is-git-repository";
import process from "node:process";
import { execSync } from "node:child_process";

const cwd = process.cwd();
const defaultOptions = {
  cwd,
  branchOptions: null,
};

const sanitize = (input) => {
  if (Array.isArray(input)) return input.map(sanitize).join(" ").trim();

  if (typeof input !== "string") {
    return "";
  }

  return input?.replace(/[^a-zA-Z0-9-_]/g, "");
};

const branchName = (options = defaultOptions) => {
  if (!isGit(options.cwd)) {
    return false;
  }

  const branchOptions = sanitize(options.branchOptions);

  try {
    const cmd = `git branch --show-current ${branchOptions}`;

    return execSync(cmd.trim(), {
      cwd: options.cwd ?? cwd,
    })
      .toString()
      .trim();
  } catch {
    return false;
  }
};

export default branchName;

import isGit from "is-git-repository";
import process from "node:process";
import { execSync } from "child_process";

const cwd = process.cwd();
const defaultOptions = {
  cwd,
  branchOptions: null,
};

const sanitize = (input) => {
  if (!Array.isArray(input)) return input.replace(/[^a-zA-Z0-9-_]/g, "");

  return input.map(sanitize).join(" ");
};

const branchName = (options = defaultOptions) => {
  if (!isGit(options.cwd)) {
    return false;
  }

  const branchOptions = sanitize(options.branchOptions);

  try {
    const cmd = `git branch ${branchOptions}`;

    return execSync(cmd.trim(), {
      cwd: options.cwd ?? cwd,
    })
      .toString()
      .substring(2)
      .trim();
  } catch {
    return false;
  }
};

export default branchName;

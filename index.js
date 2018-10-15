import { platform } from 'os';
import execa from 'execa';
import isGit from 'is-git-repository';

const cwd = process.cwd();
const defaultOptions = {
  altPath: cwd,
  branchOptions: null,
};
const isGitAdded = (options = defaultOptions) => {
  let stdout;

  if (!isGit(options.altPath)) {
    return false;
  }
  const branchOptions = options.branchOptions && Array.isArray(options.branchOptions) ? options.branchOptions.join(' ') : options.branchOptions || '';
  try {
    let cmd = '';

    if (platform() === 'win32') {
      cmd = `pushd ${options.altPath || cwd} & git branch ${branchOptions} | findstr \\*`;
    } else {
      cmd = `(cd ${options.altPath || cwd} ; git branch ${branchOptions} | grep \\*)`;
    }

    stdout = execa.shellSync(cmd).stdout;
  } catch (e) {
    return false;
  }

  const branchName = stdout.slice(2, stdout.length);

  return branchName;
};

export default isGitAdded;

import { platform } from 'os';
import execa from 'execa';
import isGit from 'is-git-repository';

const cwd = process.cwd();

const isGitAdded = (altPath = cwd) => {
  let stdout;

  if (!isGit(altPath)) {
    return false;
  }

  try {
    let cmd = '';

    if (platform() === 'win32') {
      cmd = `pushd ${altPath} & git branch | findstr \\*`;
    } else {
      cmd = `(cd ${altPath} ; git branch | grep \\*)`;
    }

    stdout = execa.shellSync(cmd).stdout;
  } catch (e) {
    return false;
  }

  const branchName = stdout.slice(2, stdout.length);

  return branchName;
};

export default isGitAdded;

import { homedir } from 'os';
import test from 'ava';
import path from 'path';
import execa from 'execa';
import fs from 'fs-extra';

import branchName from './index';

const fixtures = 'test/fixtures';

test('check if the given directory is the branch master', (t) => {
  const headPath = path.join(fixtures, 'master', '.git', 'HEAD');

  fs.writeFileSync(headPath, 'ref: refs/heads/master');

  const headFile = fs.readFileSync(headPath, 'utf8').replace(/\n/, '');

  t.is(branchName(path.join(fixtures, 'master')), headFile.slice(16, headFile.length));
});

test('check if the given directory is the branch feat/test', (t) => {
  const headPath = path.join(fixtures, 'master', '.git', 'HEAD');

  fs.writeFileSync(headPath, 'ref: refs/heads/feat/test');

  const headFile = fs.readFileSync(path.join(fixtures, 'feat_test', '.git', 'HEAD'), 'utf8').replace(/\n/, '');

  t.is(branchName(path.join(fixtures, 'feat_test')), headFile.slice(16, headFile.length));
});

test('check the branch name of the home dir', (t) => {
  t.false(branchName(homedir()));
});

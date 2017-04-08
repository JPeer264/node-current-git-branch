import { homedir } from 'os';
import test from 'ava';
import path from 'path';
import execa from 'execa';
import fs from 'fs-extra';

import branchName from './index';

const fixtures = 'test/fixtures';

test('check if the given directory is the right branch', (t) => {
  t.is(branchName(path.join(fixtures, 'master')), 'master');
  t.is(branchName(path.join(fixtures, 'feat_test')), 'feat/test');
});

test('check the branch name of the home dir', (t) => {
  t.false(branchName(homedir()));
});

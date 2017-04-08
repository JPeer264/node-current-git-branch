import { homedir } from 'os';
import test from 'ava';
import path from 'path';
import execa from 'execa';
import fs from 'fs-extra';
import isCi from 'is-ci';

import branchName from './index';

const fixtures = 'test/fixtures';

test('check if the given directory is the branch master', (t) => {
  t.plan(1);

  if (isCi) {
    t.is(branchName(path.join(fixtures, 'master')).slice(0, 14), '(HEAD detached');
  } else {
    t.is(branchName(path.join(fixtures, 'master')), 'master');
  }
});

test('check if the given directory is the branch feat/test', (t) => {
  t.plan(1);

  if (isCi) {
    t.is(branchName(path.join(fixtures, 'feat_test')).slice(0, 14), '(HEAD detached');
  } else {
    t.is(branchName(path.join(fixtures, 'feat_test')), 'feat/test');
  }
});

test('check the branch name of the home dir', (t) => {
  t.false(branchName(homedir()));
});

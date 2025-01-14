# current-git-branch

[![Build Status](https://img.shields.io/github/actions/workflow/status/JPeer264/node-current-git-branch/ci.yml?branch=main)](https://github.com/JPeer264/node-current-git-branch/actions/workflows/ci.yml?query=branch%3Amain)
[![Coverage Status](https://coveralls.io/repos/github/JPeer264/node-current-git-branch/badge.svg?branch=master)](https://coveralls.io/github/JPeer264/node-current-git-branch?branch=master)

Get synchronously the current branch name

## Installation

```sh
$ npm i current-git-branch --save
```

## Usage

Returns:

- Boolean `false`: It is not a git repository
- String: The branch name

```js
import branchName from "current-git-branch";

branchName(); // false or branch name of process.cwd()
branchName({ cwd: "any/git/repo" }); // false or branch name of the directory 'any/git/repo'
branchName({ cwd: "any/git/repo", branchOptions: ["--no-color"] }); // alternatively, you may pass git-branch command options, either as a string or an array
```

## LICENSE

MIT © [Jan Peer Stöcklmair](https://www.jpeer.at)

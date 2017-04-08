# current-git-branch

[![Build Status](https://travis-ci.org/JPeer264/node-current-git-branch.svg?branch=master)](https://travis-ci.org/JPeer264/node-current-git-branch) [![Coverage Status](https://coveralls.io/repos/github/JPeer264/node-current-git-branch/badge.svg?branch=master)](https://coveralls.io/github/JPeer264/node-current-git-branch?branch=master)

Get synchronously the current branch name

## Installation

```sh
$ npm i current-git-branch --save
```
or
```sh
$ yarn add current-git-branch
```

## Usage

Returns:
- Boolean `false`: It is not a git repository
- String: The branch name

```js
const branchName = require('current-git-branch');

branchName(); // false or branch name of process.cwd()
branchName('any/git/repo'); // false or branch name of the directory 'any/git/repo'
```

## LICENSE

MIT © [Jan Peer Stöcklmair](https://www.jpeer.at)

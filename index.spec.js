import fs from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import process from "node:process";

import branchName from "./index";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const cwd = process.cwd();
const fixtures = path.join(cwd, "test", "fixtures");

const folders = ["feat_test", "master"];

describe("branchName", () => {
  beforeAll(() => {
    folders.map((folder) =>
      fs.renameSync(
        path.join(fixtures, folder, "git"),
        path.join(fixtures, folder, ".git"),
      ),
    );
  });

  afterAll(() => {
    folders.map((folder) =>
      fs.renameSync(
        path.join(fixtures, folder, ".git"),
        path.join(fixtures, folder, "git"),
      ),
    );
  });

  it("check if the given directory is the branch master", () => {
    expect(
      branchName({
        cwd: path.join(fixtures, "master"),
        branchOptions: "--no-color",
      }),
    ).toBe("master");
  });

  it("check if the given directory is the branch feat/test", () => {
    expect(
      branchName({
        cwd: path.join(fixtures, "feat_test"),
        branchOptions: "--no-color",
      }),
    ).toBe("feat_test");
  });

  it("check the branch name of the home dir", () => {
    expect(branchName({ cwd: homedir(), branchOptions: "--no-color" })).toBe(
      false,
    );
  });
});

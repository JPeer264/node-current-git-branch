import fs from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import process from "node:process";

import branchName from "./index";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { execSync } from "node:child_process";

const cwd = process.cwd();
const fixtures = path.join(cwd, "test", "fixtures");

const folders = ["feat_test", "master", "more_branches"];

vi.mock("node:child_process", { spy: true });

describe("branchName", () => {
  beforeAll(() => {
    folders.map((folder) =>
      fs.renameSync(
        path.join(fixtures, folder, "git"),
        path.join(fixtures, folder, ".git"),
      ),
    );
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    folders.map((folder) =>
      fs.renameSync(
        path.join(fixtures, folder, ".git"),
        path.join(fixtures, folder, "git"),
      ),
    );
  });

  it("check the default", () => {
    branchName();

    expect(execSync).toHaveBeenCalledWith("git branch --show-current", { cwd });
  });

  it("check if values are properly ignored", () => {
    branchName({ cwd: path.join(fixtures, "master"), branchOptions: [] });
    branchName({ branchOptions: [null, 0, "--no-color"] });

    expect(execSync).toHaveBeenCalledTimes(2);
    expect(execSync).toHaveBeenNthCalledWith(1, "git branch --show-current", {
      cwd: path.join(fixtures, "master"),
    });
    expect(execSync).toHaveBeenNthCalledWith(
      2,
      "git branch --show-current --no-color",
      {
        cwd,
      },
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

  it("check if more branches still return just one branch", () => {
    expect(
      branchName({
        cwd: path.join(fixtures, "more_branches"),
        branchOptions: "--no-color",
      }),
    ).toBe("feat/new");
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

  it("check any non existing dir", () => {
    expect(branchName({ cwd: "ʕっ•ᴥ•ʔっ" })).toBe(false);
  });
});

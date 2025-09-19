declare const branchName: (options?: {
  cwd?: string;
  branchOptions?: string | string[];
}) => string | false;
export default branchName;

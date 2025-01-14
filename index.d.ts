declare const branchName: (options?: {
  cwd?: string;
  branchOptions?: string | string[];
}) => boolean;
export default branchName;

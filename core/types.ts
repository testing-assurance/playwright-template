export type Environments = "NA" | "Mobile Chrome" | "Desktop Chrome";
export type Status = "passed" | "failed" | "skipped" | "NA";

type Test = {
  timeout: number;
  annotations: any[];
  expectedStatus: string;
  projectId: string;
  projectName: string;
  results: { attachments: { name: string; path?: string }[] }[];
  status: string;
};

export type FailedTests = {
  testId: string;
  environment: string;
  videoLocation: string | null;
};

export type Spec = {
  title: string;
  annotations: Array<{ type: "ID"; description: string }>;
  ok: boolean;
  tags: any[];
  tests: Test[];
  id: string;
  file: string;
  line: number;
  column: number;
};

type Suite = {
  title: string;
  file: string;
  line: number;
  column: number;
  specs: Spec[];
};

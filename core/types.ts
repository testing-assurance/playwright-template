export type Environments = "NA" | "Mobile Chrome" | "Desktop Chrome";
export type Status = "passed" | "failed" | "skipped" | "NA";

// export type CustomTestItem = {
//   id: string;
//   title: string;
//   status: string;
//   duration: number;
//   environments: Array<{
//     name: Environments;
//     status: string;
//     duration: number;
//   }>;
// };

// export type Repository = {
//   id: number;
//   name: string;
//   fullname: string;
//   description: string | null;
//   updatedAt: string | null | undefined;
// };

// type TestResult = {
//   workerIndex: number;
//   status: string;
//   duration: number;
//   errors: any[];
//   stdout: any[];
//   stderr: any[];
//   retry: number;
//   startTime: string;
//   attachments: any[];
// };

type Test = {
  timeout: number;
  annotations: any[];
  expectedStatus: string;
  projectId: string;
  projectName: string;
  results: TestResult[];
  status: string;
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

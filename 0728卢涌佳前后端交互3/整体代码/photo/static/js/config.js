
// 环境
const DEV = "dev";
const PROD = "PROD";
const baseURLMap = {
  [DEV]: "http://localhost:8080",
  [PROD]: "http://localhost:8081",
};
const currentEnv = DEV;
const instanceConfig = {
  baseUrl: baseURLMap[currentEnv],
  timeout: 4000,
};

export {
  instanceConfig
}

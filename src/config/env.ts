//指定当前环境为dev
const apiEnv: ApiEnv = 'dev'

const envMap = {
  dev: {
    baseUrl: '',
    ossHost: '',
    apiBaseUrl: ''
  },
  prod: {
    baseUrl: '',
    apiBaseUrl: '',
    ossHost: ''
  }
}

type ApiEnv = keyof typeof envMap;
type Env<T extends ApiEnv> = {
  apiEnv: T;
} & (typeof envMap)[T];

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
  return Object.assign({ apiEnv }, envMap[apiEnv])
}

const env = createEnv(apiEnv)
export default env

import { TOKEN_NAME } from '@/config/app'

export function getUserInfo() {
  return uni.getStorageSync(TOKEN_NAME)
}

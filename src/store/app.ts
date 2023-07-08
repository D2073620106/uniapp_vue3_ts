import {defineStore} from "pinia";

export default defineStore({
  id: 'app',
  // persist: {
  //   // 开启持久化
  //   enabled: true,
  //   H5Storage: window?.localStorage,
  //   strategies: [
  //     {
  //       key: 'test',
  //       storage: window?.sessionStorage
  //     }
  //   ]
  // },
  state: () => {
    return {
      systemInfo: {}
    } as {
      systemInfo: UniApp.GetSystemInfoResult;
    };
  },
  actions: {
    getSystemInfo(): UniApp.GetSystemInfoResult {
      if (Object.keys(this.systemInfo).length) return this.systemInfo;
      const systemInfo = uni.getSystemInfoSync();
      Object.assign(this.systemInfo, systemInfo);
      return systemInfo;
    }
  }
});

import piniaPluginPersist from 'pinia-plugin-persist-uni';
import {createPinia} from "pinia";

const store = createPinia();
store.use(piniaPluginPersist); //持久化插件

export default store;

import { App } from "vue";
import VueAudio from "./vue-audios.vue";

export { VueAudio };

const plugin = {
  install(Vue: App) {
    Vue.component(`vue-audio`, VueAudio);
  }
};

export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

declare global {
  interface Window {
    Vue: App;
  }
}

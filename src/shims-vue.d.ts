/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  import store from './store'
  declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $store: Store;
    }
  }
  const component: DefineComponent
  export default component
}





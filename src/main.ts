import Vue from 'vue'
import App from './App.vue'

import VueCompositionApi from '@vue/composition-api'
// import iView from 'iview'
import { Button, Table, Tabs, TabPane, Select, Option } from 'iview';
import 'iview/dist/styles/iview.css'

Vue.use(VueCompositionApi)
declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  }
}

// Vue.use(iView)
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('Select', Select);
Vue.component('Option', Option);

Vue.config.productionTip = false



new Vue({
  render: h => h(App),
}).$mount('#app')

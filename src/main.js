import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)
import App from './App.vue'

Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
}).$mount('#app')

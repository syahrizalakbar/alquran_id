import Vue from 'vue';
import Router from 'vue-router';

import App from './App.vue';
import Sura from './components/Sura.vue';
import SuraDetail from './components/SuraDetail.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Sura
    },
    {
      path: '/sura/:id',
      name: 'sura',
      component: SuraDetail
    }
  ],
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});

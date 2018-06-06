import Vue from 'vue';
import VueAuth from '@/plugins/auth';

Vue.use(VueAuth);

const auth = new VueAuth({
  rolesVar: 'roles'
});

export default auth;

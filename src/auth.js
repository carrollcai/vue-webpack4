import Vue from 'vue';
import VueAuth from '@/utils/plugins/auth';

Vue.use(VueAuth);

const auth = new VueAuth({
  rolesVar: 'roles'
});

export default auth;

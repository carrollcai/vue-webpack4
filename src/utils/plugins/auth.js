'use strict';

let _Vue;

function toArray(val) {
  return (typeof val) === 'string' || (typeof val) === 'number' ? [val] : val;
}

function compare(one, two) {
  let i, ii, key;
  if (Object.prototype.toString.call(one) === '[object Object]' && Object.prototype.toString.call(two) === '[object Object]') {
    for (key in one) {
      if (compare(one[key], two[key])) {
        return true;
      }
    }
    return false;
  }

  one = toArray(one);
  two = toArray(two);
  if (!one || !two || one.constructor !== Array || two.constructor !== Array) {
    return false;
  }

  for (i = 0, ii = one.length; i < ii; i++) {
    if (two.indexOf(one[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function _check(role) {
  if (role) {
    return compare(role, this.watch.data[this.options.rolesVar]);
  } else {
    return false;
  }
}

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }
  install.installed = true;

  _Vue = Vue;

  const isDef = v => v !== undefined;

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.auth)) {
        this._authRoot = this;
        this._auth = this.$options.auth;
        this._auth.init(this);
      } else {
        this._authRoot = (this.$parent && this.$parent._authRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed() {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$auth', {
    get() {
      return this._authRoot._auth;
    }
  });
}

class VueAuth {
  static install() {}

  constructor(options = {}) {
    this.app = null;
    this.apps = [];
    this.options = options;
    this.watch = {
      data: {}
    };
  }

  init(app /* Vue component instance */) {
    this.apps.push(app);
    // main app already initialized.
    if (this.app) {
      return;
    }
    this.app = app;
  }

  check(role) {
    return _check.call(this, role);
  }

  setUser(data) {
    this.watch.data = data;
  }

  getUser() {
    return this.watch.data;
  }
}

VueAuth.install = install;

export default VueAuth;

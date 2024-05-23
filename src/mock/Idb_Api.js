import Idb from "idb-js"; //  引入Idb
import IDB_Config from "./IDB_Config";
import IDB_Config_xiapi from "./IDB_Config_xiapi";
import IDB_Config_xiapi2 from "./IDB_Config_xiapi2";
import Vue from "vue";

Idb(IDB_Config).then(IDB => {
  Vue.prototype.$IDB = IDB;
});

Idb(IDB_Config_xiapi).then(IDB => {
  Vue.prototype.$IDBM = IDB;
});

Idb(IDB_Config_xiapi2).then(IDB => {
  Vue.prototype.$IDBM2 = IDB;
});

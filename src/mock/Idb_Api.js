import Idb from "idb-js"; //  引入Idb
import IDB_Config from "./IDB_Config";
import IDB_Config_xiapi from "./IDB_Config_xiapi";
import Vue from "vue";

Idb(IDB_Config).then(IDB => {
  Vue.prototype.$IDB = IDB;
});

Idb(IDB_Config_xiapi).then(IDB => {
  Vue.prototype.$IDBM = IDB;
});

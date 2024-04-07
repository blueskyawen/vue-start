import Idb from "idb-js"; //  引入Idb
import IDB_Config from "./IDB_Config";
import Vue from "vue";

Idb(IDB_Config).then(IDB => {
  Vue.prototype.$IDB = IDB;
});

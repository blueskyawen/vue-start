<template>
  <div class="App">
    <header>
      <div class="head-logo">
        <img src="./assets/logo.png" />
        <span class="logo-border"></span>
      </div>
      <div class="head-memu">
        <router-link
          class="menu-item"
          v-for="linkItem in menuOptions"
          :key="linkItem.value"
          :to="linkItem.url"
          v-show="selectMenus.includes(linkItem.value)"
          >{{ linkItem.name }}</router-link
        >
      </div>
      <span class="user-set">
        <span class="nav-set" @click="openMenuSet">显示菜单</span>
        <img src="./assets/user1.jpeg" />
      </span>
    </header>
    <article>
      <router-view></router-view>
    </article>
    <vc-dialog
      :header="'选择显示菜单'"
      :type="'normal'"
      v-model="showMenuSet"
      class="clear-product-conf"
      :width="'500px'"
    >
      <template v-slot:content>
        <vc-mutil-checkbox
          v-if="showMenuSet"
          :options="menuOptions"
          v-model="selectMenus"
        ></vc-mutil-checkbox>
      </template>
      <template v-slot:footer>
        <span class="form-btn-group">
          <vc-button
            @click.native="menuSetConfiem"
            :title="selectMenus.length ? '' : '至少选择一个'"
            :disabled="!selectMenus.length"
            >确定</vc-button
          >
        </span>
        <span class="form-btn-group" style="margin-left: 8px">
          <vc-button :type="'cancel'" @click="showMenuSet = false"
            >取消</vc-button
          >
        </span>
      </template>
    </vc-dialog>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showMenuSet: false,
      menuList: [
        "hello",
        "basic",
        "advance",
        "vuex",
        "markdownEditor",
        "richtextEditor",
        "priseEditor",
        "saleDairy",
        "xiapiPriseEditor",
      ],
      menuOptions: [
        { value: "hello", name: "hello", url: "/hello" },
        { value: "basic", name: "基础", url: "/basic" },
        { value: "advance", name: "进阶", url: "/advance" },
        { value: "vuex", name: "vuex", url: "/vuex" },
        { value: "markdownEditor", name: "MD编辑器", url: "/markdownEditor" },
        {
          value: "richtextEditor",
          name: "富文本编辑器",
          url: "/richtextEditor",
        },
        { value: "priseEditor", name: "价格计算器", url: "/priseEditor" },
        { value: "saleDairy", name: "电商日记", url: "/saleDairy" },
        {
          value: "xiapiPriseEditor",
          name: "虾皮价格计算器",
          url: "/xiapi",
        },
      ],
      selectMenus: [
        "markdownEditor",
        "richtextEditor",
        "priseEditor",
        "saleDairy",
        "xiapiPriseEditor",
      ],
      tableName: "select_menus",
    };
  },
  created() {
    setTimeout(() => {
      this.getMenus();
    }, 1000);
  },
  beforeDestroy() {
    if (this.$IDB) {
      this.$IDB.getDB().then((db) => {
        if (db && db.close) {
          db.close();
        }
      });
    }
    if (this.$IDBM) {
      this.$IDBM.getDB().then((db) => {
        if (db && db.close) {
          db.close();
        }
      });
    }
    if (this.$IDBM2) {
      this.$IDBM2.getDB().then((db) => {
        if (db && db.close) {
          db.close();
        }
      });
    }
  },
  methods: {
    getMenus() {
      let menusCoach = localStorage.getItem("menus-coach");
      if (menusCoach) {
        console.log("1111*******");
        this.selectMenus = JSON.parse(menusCoach);
      } else {
        console.log("22222*****");
        this.selectMenus = this.menuList;
      }
    },
    openMenuSet() {
      this.showMenuSet = true;
    },
    menuSetConfiem() {
      localStorage.setItem("menus-coach", JSON.stringify(this.selectMenus));
      this.showMenuSet = false;
    },
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  margin-left: -8px;
  margin-top: -8px;
}
header {
  display: flex;
  width: inherit;
  height: 60px;
  border-bottom: solid 1px #e6e6e6;
  box-shadow: -8px 0px 10px 2px #e6e6e6;
}
header .head-logo {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 64px;
  padding: 0 10px 0 30px;
}
header .head-logo img {
  width: 30px;
  height: 30px;
}
header .head-logo .logo-border {
  width: 2px;
  height: 24px;
  background-color: #999;
}
header .head-memu {
  display: inline-flex;
  align-items: center;
}
header .head-memu .menu-item {
  padding: 0 20px;
  font-size: 16px;
  color: #333;
  text-decoration: none;
}
header .head-memu .menu-item:hover {
  text-decoration: underline;
  color: #006600;
}
header .head-memu .menu-item.link-active {
  color: #006600;
  font-size: 18px;
  font-weight: 600;
}
article {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}
.user-set {
  position: absolute;
  top: 10px;
  right: 20px;
  display: inline-flex;
  align-items: center;
}
.user-set .nav-set {
  font-size: 13px;
  margin-right: 14px;
}
.user-set .nav-set:hover {
  cursor: pointer;
  color: hsl(221, 89%, 46%);
}
.user-set > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>

<template lang="pug">
block content
.sider 
  a-menu(
    theme="dark",
    mode="inline",
    v-model:selectedKeys="selectedKeys",
    :open-keys="openKeys",
    @openChange="onOpenChange"
  )
    template(v-for="item in menuDataList")
      template(v-if="item.children && item.children.length > 0")
        MenuItem(:menuData="item")
      template(v-else) 
        a-menu-item(:key="item.id", @click="jumpPage(item)")
          template(#icon)
            IconComponent(:iconName="item.meta.icon")
          span {{ item.meta.title }}
</template>

<script>
import { watch, onMounted, reactive, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import IconComponent from "./../../../views/permission/iconComponent";
import MenuItem from "./menuItem";
import { useStore } from "vuex";
export default {
  name: "sider",
  components: {
    MenuItem,
    IconComponent,
  },
  setup() {
    let router = useRouter();
    let route = useRoute();
    let store = useStore();
    let menuDataList = computed(() => {
      return store.state.router.sidebarRouters;
    });

    let jumpPage = (value) => {
      if (value.meta.link) {
        window.open(value.meta.link);
      } else {
        router.push(value.realyPath);
      }
    };
    let state = reactive({
      selectedKeys: [3],
      openKeys: [],
    });
    let rootSubmenuKeys = computed(() => {
      return store.state.router.sidebarRouters.map((item) => {
        return item.id;
      });
    });

    let onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      if (rootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    let setMenuSelectKeys = (path) => {
      let selectedId = state.selectedKeys[0],
        openKeys = state.openKeys;
      let mapSelf = (data, pArray) => {
        data.map((item) => {
          if (item.children && item.children.length > 0) {
            mapSelf(item.children, [...pArray, item.id]);
          } else {
            if (item.realyPath == path) {
              selectedId = item.id;
              openKeys = pArray;
              return;
            }
          }
        });
      };
      mapSelf(menuDataList.value, []);
      Object.assign(state, {
        selectedKeys: [selectedId],
        openKeys,
      });
    };

    watch(route, (val) => {
      setMenuSelectKeys(val.path);
    });
    watch(menuDataList, () => {
      setMenuSelectKeys(route.path);
    });

    onMounted(() => {
      setMenuSelectKeys(route.path);
    });

    return {
      ...toRefs(state),
      menuDataList,
      jumpPage,
      onOpenChange,
    };
  },
};
</script>

<style lang="less" scoped>
.sider {
  overflow: auto;
  height: calc(100% - 88px);
}
</style>

<template lang="pug">
block content
  .header_title
    .title_left
      .title_name {{ titleName }}
      .title_tips {{ tipsText }}
      //- a-breadcrumb
        a-breadcrumb-item(
          v-for="(item, index) in breadcrumbList",
          :key="index"
        ) {{ item }}
    .title_right
      img.screen(src="@/assets/screen.png", @click="toScreen")
      a-button(@click="returnPre", v-if="showReturn") 返回
        template(#icon)
          LeftOutlined
</template>

<script>
import { computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LeftOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
export default {
  name: "headerTitle",
  components: { LeftOutlined },
  setup() {
    let route = useRoute();
    let router = useRouter();
    let store = useStore();
    let titleName = computed(() => {
      return store.state.titleName;
    });
    let tipsText = computed(() => {
      return store.state.titleTips;
    });
    watch(route, () => {
      getBreadcrumb();
      setStoreData();
    });
    onMounted(() => {
      setStoreData();
    });

    let setStoreData = async () => {
      store.commit(
        "changeTitleName",
        route.meta.title ? route.meta.title : "页面"
      );
      store.commit("changeTitleTips", route.meta.tips ? route.meta.tips : "");
      store.commit("changeShowReturn", false);
    };

    let getBreadcrumb = () => {
      let list = store.state.router.topbarRouters.filter((item) => {
        return item.name == route.name;
      });
      store.commit("SET_BREADCRUMB", list.length > 0 ? list[0].titleList : []);
    };
    getBreadcrumb();
    let breadcrumbList = computed(() => {
      return store.state.user.breadcrumbData;
    });
    let showReturn = computed(() => {
      return store.state.isShowReturn;
    });

    let returnPre = () => {
      router.go(-1);
    };
    let toScreen = () => {
      router.push("/fullScreen/project");
    };
    return {
      toScreen,
      returnPre,
      tipsText,
      titleName,
      showReturn,
      breadcrumbList,
    };
  },
};
</script>

<style lang="less" scoped>
.header_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title_left {
    display: flex;
    .title_name {
      font-size: 18px;
      font-weight: 700;
      padding-right: 20px;
    }
    .title_tips {
      color: #ccc;
    }
  }
  .title_right {
    display: flex;
    align-items: center;
    .screen {
      margin-right: 20px;
      cursor: pointer;
      width: 25px;
      height: 25px;
    }
  }
}
</style>

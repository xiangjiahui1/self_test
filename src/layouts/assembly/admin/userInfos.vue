<template lang="pug">
block content
  a-dropdown(:getPopupContainer="(triggerNode) => triggerNode.parentNode")
    .user_infos(@click.prevent) 
      .name {{ userName }}
      DownOutlined 
    template(#overlay)
      a-menu
        a-menu-item(@click.stop="loginOut") 退出登录
        a-menu-item(@click.stop="updatePassWord") 重置密码
UpdatePassword(ref="pawModal")
</template>

<script >
import { defineComponent, computed, ref } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { clearAllStorage } from "@/utils/localStorage";
import { useRouter } from "vue-router";
import UpdatePassword from "@/components/updatePassword/updatePassword";
import { useStore } from "vuex";
export default defineComponent({
  name: "userInfos",
  components: {
    DownOutlined,
    UpdatePassword,
  },
  setup() {
    let router = useRouter();
    let store = useStore();
    let loginOut = () => {
      store.dispatch("LogOut").then(() => {
        clearAllStorage();
        router.push("/login");
      });
    };
    let userName = computed(() => {
      return store.state.user.name;
    });
    let pawModal = ref();
    let updatePassWord = () => {
      pawModal.value.showModal(store.state.user.userId);
    };

    return { userName, loginOut, pawModal, updatePassWord };
  },
});
</script>

<style lang="less" scoped>
.user_infos {
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  .name {
    padding: 0 8px;
  }
}
</style>
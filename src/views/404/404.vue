<template lang="pug">
block content
  .not_find 404
    //- a-result(
    //-     status="404" title="404" sub-title="很抱歉，您访问的页面不存在。"
    //- )
      
</template>

<script>
// import { message } from "ant-design-vue";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    // let router = useRouter();
    // onMounted(() => {
    //   message.warning("即将返回上一页面").then(() => {
    //     if(history.length > 2){
    //       router.go(-1);
    //     }else{
    //       router.replace(router.getRoutes()[0]);
    //     }
    //   });
    // });
    // return {};
  },
};
</script>

<style lang="less" scoped>
.not_find {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>

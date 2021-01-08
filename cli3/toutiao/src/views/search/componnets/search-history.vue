<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div>
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span >完成</span>
      </div>
      <van-icon name="delete"></van-icon>
    </van-cell>
    <van-cell title="hellow">
      <van-icon name="close" ></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  data() {
    return {
      // isDeleteShow: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onDelete() {},
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
</style>
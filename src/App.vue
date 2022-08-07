<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import { ElButton } from 'element-plus'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
    // ElButton
  },
  setup() {
    return {
      zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>

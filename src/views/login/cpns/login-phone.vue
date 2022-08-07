<template>
  <el-form :model="phone">
    <el-form-item label="手机号" label-width="60px" prop="num">
      <el-input v-model="phone.name"></el-input>
    </el-form-item>
    <el-form-item label="验证码" label-width="60px" prop="code">
      <div class="code-wrap">
        <el-input v-model="phone.password"></el-input>
        <el-button class="code-btn" type="primary">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    return {
      phone
    }
  }
})
</script>

<style scoped lang="less">
.code-wrap {
  display: flex;
  .code-btn {
    margin-left: 8px;
  }
}
</style>

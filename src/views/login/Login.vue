<template>
<div>
  <a-form name="custom-validation" :labelCol="labelCol" :wrapperCol="wrapperCol" :model="userModel" :rules="userRules" ref="userFormRef">
    <a-form-item label="用户名" name="username">
      <a-input v-model:value="userModel.username" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input v-model:value="userModel.password" type="password" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit" @click="clickLoginBtn">
        Login
      </a-button>
      <a-button style="margin-left: 10px" @click="clickResetBtn">
        Reset
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref
} from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    // 表单数据
    const userModel = reactive({
      username: '',
      password: ''
    })
    // 表单验证
    const userRules = reactive({
      username: [{
        required: true,
        message: 'Please input username',
        trigger: 'blur'
      }],
      password: [{
        required: true,
        message: 'Please input password',
        trigger: 'blur'
      }]
    })
    // 表单引用
    const userFormRef: any = ref(null)
    // 登录
    function clickLoginBtn() {
      console.log('user:', userModel)
    }

    // 重置
    function clickResetBtn() {
      userFormRef.value && userFormRef.value.resetFields()
    }
    return {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      },
      userModel,
      userRules,
      userFormRef,
      clickLoginBtn,
      clickResetBtn
    }
  }
})
</script>

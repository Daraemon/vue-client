<template>
<div>
  <a-form name="custom-validation" :labelCol="labelCol" :wrapperCol="wrapperCol" :model="userModel" :rules="userRules" ref="userFormRef">
    <a-form-item label="用户名" name="username">
      <a-input v-model:value="userModel.username" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input v-model:value="userModel.password" type="password" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item label="验证码" name="identityCode">
      <a-input v-model:value="userModel.identityCode" size="large" placeholder="请输入验证码">
        <template v-slot:suffix>
          <img class="captcha" :src="captchaSrc" @click="updateCaptchaTime" />
        </template>
      </a-input>
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
  <a-button type="primary" html-type="submit" @click="clickAboutBtn">
    About
  </a-button>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed
} from 'vue'
import {
  login
} from '../../network/loginApi'
import router from '../../router'
import {
  encrypto
} from '../../utils/crypto/crypto'

export default defineComponent({
  name: 'Home',
  setup() {
    // 表单数据
    const userModel = reactive({
      username: '',
      password: '',
      identityCode: ''
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
      }],
      identityCode: [{
        required: true,
        message: 'Please input identityCode',
        trigger: 'blur'
      }]
    })
    // 验证码
    const captchaTime = ref('')
    const baseUrl = '/auth/getCaptcha?'
    const captchaSrc = computed(() => baseUrl + captchaTime.value)
    // 表单引用
    const userFormRef: any = ref(null)
    // 更新时间
    function updateCaptchaTime() {
      captchaTime.value = '' + new Date().getTime()
    }
    // 登录
    function clickLoginBtn() {
      const data = {
        username: userModel.username,
        password: encrypto(userModel.password),
        identityCode: userModel.identityCode
      }
      console.log('user:', data)
      login(data)
        .then((data) => {
          console.log('data:', data)
        })
        .catch((err) => {
          console.log('err:', err)
        })
    }

    // 重置
    function clickResetBtn() {
      userFormRef.value && userFormRef.value.resetFields()
    }

    const clickAboutBtn = () => {
      router.push('about')
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
      captchaSrc,
      userFormRef,
      clickLoginBtn,
      clickResetBtn,
      clickAboutBtn,
      updateCaptchaTime
    }
  }
})
</script>

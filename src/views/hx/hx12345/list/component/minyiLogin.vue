<template>
  <el-dialog
    title="民意平台登录"
    v-model="visible"
    width="420px"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @closed="onClosed"
  >
    <el-form size="large" :model="form" ref="loginForm">
      <!-- <el-form-item prop="loginName">
        <el-input
          type="text"
          placeholder="民意平台账号"
          v-model="form.loginName"
          clearable autocomplete="off"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><ele-User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="loginPwd">
        <el-input
          :type="isShowPassword ? 'text' : 'password'"
          placeholder="民意平台密码"
          v-model="form.loginPwd"
          autocomplete="off"
          @keyup.enter="onSignIn"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><ele-Unlock /></el-icon>
          </template>
          <template #suffix>
            <i
              class="iconfont el-input__icon login-content-password"
              :class="isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
              @click="isShowPassword = !isShowPassword"
            >
            </i>
          </template>
        </el-input>
      </el-form-item> -->
      <el-form-item prop="code">
        <el-col :span="15">
          <el-input
            type="text"
            maxlength="4"
            placeholder="验证码"
            v-model="form.code"
            clearable
            autocomplete="off"
            @keyup.enter="onSignIn"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><ele-Position /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="8">
          <div class="login-content-code">
            <img
              v-if="captchaImg"
              class="login-content-code-img"
              @click="getCaptchaImg"
              width="130"
              height="38"
              :src="captchaImg"
              style="cursor: pointer;"
            />
            <span v-else style="font-size: 12px; color: #999;">加载中...</span>
          </div>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onSignIn" :loading="loading">
        登录民意平台
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { getCaptcha, minyiLogin,pageQuery } from '/@/api/hx/minyi';
import { Session, Local } from '/@/utils/storage';

defineOptions({ name: 'loginMinYi' })

const props = defineProps<{ show?: boolean }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'login-success'): void }>()

const loginForm = ref(null)
const isShowPassword = ref(false)
const visible = ref(false)

watch(() => props.show, (val) => {
  visible.value = !!val
  if (val) getCaptchaImg()
})

const state = reactive({
  loading: false,
  captchaImg: '',
  codeHash: '',
  form: {
    loginType: 'password',
    loginName: 'CS6316804',
    loginPwd: 'WYKJE98LJf1GFTEfCZpndUC6PUJCdXd10QpzSlr8A0MKoMOXTmZy2K08yphirMZXqmwUcqk444zvcsULXZORFGcErvxxQ6X0Mafldel4ZzPp5h/Jh7YTTkLjmcRJPBaJg1QxUuic5cPeV6zvAJKBWWVmGWBO6y1UWWlkH9GJoouRkrFAmVL8TCrbT9pk2KG0sLEQzqTr+MgGyY32J8KGS9a4VT35nPUDZrXTjQ+91r4uoWvADYE8Sxx1m706NJ17EGY00XSnaZcSPpSZTHlYsFnwwItPlnB4gFwHJP6MaVQRhNgZAcOUqtemiyXQa9vYC8rLL67VMnvNn4B/Aje/Aw==',
    codeHash: '',
    code: '',
  },
})

const { loading, captchaImg, form, codeHash } = toRefs(state)

// 获取验证码
const getCaptchaImg = async () => {
  try {
    const res = await getCaptcha()
    state.captchaImg = "data:image/png;base64,"+res.data.plaintext
    state.codeHash = res.data.key
  } catch (e) {
    console.error('获取验证码失败', e)
  }
}

const defaultpages={
      currentPage:1,
      pageSize:50,
      taskStatus:"2",
      isSuggest:"0",
}
// 登录
const onSignIn = async () => {
  if (state.loading) return
  if (!state.form.loginName || !state.form.loginPwd || !state.form.code) {
    ElMessage.warning('请填写完整信息')
    return
  }
  state.loading = true
  try {
    const res = await minyiLogin({
      loginName: state.form.loginName,
      loginPwd: state.form.loginPwd,
      code: state.form.code,
      codeHash: state.codeHash,
    })
    if (res.code == 0) {
      // 单独存民意平台 token
      console.log("res",res.data)
      const r=pageQuery(defaultpages,res.data.accessToken)
      console.log("r",r)
      Local.set('minyiToken', res.data || '')
      ElMessage.success('民意平台登录成功')
      visible.value = false
      emit('login-success')
    } else {
      ElMessage.error(res.msg || '登录失败')
      getCaptchaImg() // 刷新验证码
    }
  } catch (e: any) {
    ElMessage.error(e?.message || '登录失败')
    getCaptchaImg() // 刷新验证码
  } finally {
    state.loading = false
  }

}

const onClosed = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.login-content-password {
  display: inline-block;
  width: 20px;
  cursor: pointer;
  &:hover {
    color: #909399;
  }
}
.login-content-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .login-content-code-img {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    border: 1px solid rgb(220, 223, 230);
    cursor: pointer;
    transition: all ease 0.2s;
    border-radius: 4px;
    user-select: none;
    &:hover {
      border-color: #c0c4cc;
      transition: all ease 0.2s;
    }
  }
}
</style>

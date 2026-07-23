<template>
  <div class="login-page">
    <!-- 背景样式 -->
    <div class="login-bg">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="login-container">
      <!-- 左边 -->
      <div class="login-left">
        <div class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div>
            <h1>华新智慧社区</h1>
            <p>Smart Community Platform</p>
          </div>
        </div>

        <div class="features">
          <div class="feature-item">
            <div class="feature-icon">
              <el-icon><Calendar /></el-icon>
            </div>
            <div class="feature-text">
              <h4>丰富活动</h4>
              <p>参与社区精彩活动</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <el-icon><Tools /></el-icon>
            </div>
            <div class="feature-text">
              <h4>便民服务</h4>
              <p>租房、便捷生活触手可及</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <el-icon><Star /></el-icon>
            </div>
            <div class="feature-text">
              <h4>积分奖励</h4>
              <p>参与获取积分好礼</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右边 -->
      <div class="login-right">
        <div class="login-card">
          <h2 class="login-title">欢迎回来</h2>
          <p class="login-subtitle">登录您的账号</p>
          <Account />
        </div>
      </div>
    </div>

    <div class="login-footer">
      <div>Copyright © 2021-2024 华新智慧社区 版权所有</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Calendar, Tools, Star } from '@element-plus/icons-vue';
import { NextLoading } from '/@/utils/loading';
import Account from '/@/views/login/component/account.vue';

defineOptions({ name: 'loginIndex' });

// 页面加载时关闭 loading 动画
onMounted(() => {
  NextLoading.done();
});
</script>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
  animation: float 10s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: 20%;
  animation: float 8s ease-in-out infinite reverse;
}

.shape-3 {
  width: 200px;
  height: 200px;
  top: 40%;
  right: -50px;
  animation: float 12s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(30px, -30px) rotate(5deg); }
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.login-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  color: white;
}

.brand {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 60px;
}

.brand-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-icon svg {
  width: 32px;
  height: 32px;
}

.brand h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.brand p {
  font-size: 13px;
  // 副标题使用背景色（橙色），与背景融合，不再为蓝色/白色
  color: #f97316;
  margin: 4px 0 0;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(8px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.feature-text h4 {
  margin: 0;
  font-size: 16px;
}

.feature-text p {
  margin: 4px 0 0;
  font-size: 13px;
  opacity: 0.8;
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 8px;
  text-align: center;
}

.login-subtitle {
  font-size: 15px;
  color: var(--el-text-color-secondary);
  margin: 0 0 32px;
  text-align: center;
}

.login-footer {
  position: absolute;
  bottom: 16px;
  width: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  z-index: 1;
}

@media (max-width: 768px) {
  .login-left {
    display: none;
  }

  .login-right {
    padding: 24px;
  }

  .login-card {
    padding: 32px 24px;
  }
}
</style>

<template>
  <div class="hx-hxPartyActivitySignin-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>活动签到详情</h4>
      </template>
      <el-descriptions
              class="margin-top"
              :column="3"
              border
              style="margin: 8px;"
      >
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  序号
                </div>
              </template>
              {{ formData.id }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  关联活动
                </div>
              </template>
              {{ formData.activityName }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  签到党员
                </div>
              </template>
              {{ formData.memberName }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  签到时间
                </div>
              </template>
              {{ proxy.parseTime(formData.signinTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  签到方式
                </div>
              </template>
              {{ proxy.getOptionValue(formData.signinMethod, signinMethodOptions,'value','label') }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  是否迟到
                </div>
              </template>
              {{ formData.isLate == 1 ? '是' : '否' }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  是否早退
                </div>
              </template>
              {{ formData.isLeaveEarly == 1 ? '是' : '否' }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  备注
                </div>
              </template>
              {{ formData.remark }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                创建时间
              </div>
            </template>
            {{ proxy.parseTime(formData.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, ref, getCurrentInstance } from 'vue';
  import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
  import {
    getHxPartyActivitySignin,
  } from "/@/api/hx/hxPartyActivitySignin";
  defineOptions({ name: "ApiV1HxHxPartyActivitySigninDetail"})
  const props = defineProps({
    signinMethodOptions:{
      type:Array,
      default:()=>[]
    },
  })
  const {proxy} = <any>getCurrentInstance()
  const formRef = ref<HTMLElement | null>(null);
  interface HxPartyActivitySigninInfoData {
    id: number|undefined;
    activityId: number|undefined;
    activityName: string|undefined;
    memberId: number|undefined;
    memberName: string|undefined;
    signinTime: string|undefined;
    signinMethod: number|undefined;
    isLate: number|undefined;
    isLeaveEarly: number|undefined;
    remark: string|undefined;
    createdAt: string|undefined;
    updatedAt: string|undefined;
  }
  interface EditState{
    loading:boolean;
    isShowDialog: boolean;
    formData: HxPartyActivitySigninInfoData;
    rules: object;
  }
  const state = reactive<EditState>({
    loading:false,
    isShowDialog: false,
    formData: {
      id: undefined,
      activityId: undefined,
      activityName: undefined,
      memberId: undefined,
      memberName: undefined,
      signinTime: undefined,
      signinMethod: undefined,
      isLate: undefined,
      isLeaveEarly: undefined,
      remark: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    rules: {}
  });
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxPartyActivitySigninInfoData) => {
    resetForm();
    if(row) {
      getHxPartyActivitySignin(row.id!).then((res:any)=>{
        const data = res.data;
        state.formData = data;
      })
    }
    state.isShowDialog = true;
  };
  // 关闭弹窗
  const closeDialog = () => {
    state.isShowDialog = false;
  };
  defineExpose({
    openDialog,
  });
  // 取消
  const onCancel = () => {
    closeDialog();
  };
  const resetForm = ()=>{
    state.formData = {
      id: undefined,
      activityId: undefined,
      activityName: undefined,
      memberId: undefined,
      memberName: undefined,
      signinTime: undefined,
      signinMethod: undefined,
      isLate: undefined,
      isLeaveEarly: undefined,
      remark: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    }
  };
</script>
<style scoped>
  .hx-hxPartyActivitySignin-detail :deep(.el-form-item--large .el-form-item__label){
    font-weight: bolder;
  }
  .pic-block{
    margin-right: 8px;
  }
  .file-block{
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin-bottom: 5px;
    padding: 3px 6px;
  }
  .ml-2{margin-right: 5px;}
  .attr-table{margin: 10px;}
</style>

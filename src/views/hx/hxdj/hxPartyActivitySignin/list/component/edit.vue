<template>
  <div class="hx-hxPartyActivitySignin-edit">
    <el-dialog v-model="isShowDialog" width="600px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxPartyActivitySignin-edit .el-dialog', '.hx-hxPartyActivitySignin-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'活动签到'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="关联活动" prop="activityId">
          <el-select filterable remote :remote-method="searchActivity" v-model="formData.activityId" placeholder="搜索活动">
            <el-option
                v-for="item in activitySearchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="签到党员" prop="memberId">
          <MemberPicker v-model="formData.memberId" placeholder="搜索党员" />
        </el-form-item>
        <el-form-item label="签到时间" prop="signinTime">
          <el-date-picker
              clearable style="width: 100%"
              v-model="formData.signinTime"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetime"
              placeholder="选择签到时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="签到方式" prop="signinMethod">
          <el-select filterable clearable v-model="formData.signinMethod" placeholder="请选择签到方式">
            <el-option
                v-for="item in signinMethodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否迟到" prop="isLate">
          <el-radio-group v-model="formData.isLate">
            <el-radio :value="0">否</el-radio>
            <el-radio :value="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否早退" prop="isLeaveEarly">
          <el-radio-group v-model="formData.isLeaveEarly">
            <el-radio :value="0">否</el-radio>
            <el-radio :value="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSubmit" :disabled="loading">确 定</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, ref, unref, getCurrentInstance } from 'vue';
import {ElMessage, FormInstance} from 'element-plus';
import {
  getHxPartyActivitySignin,
  addHxPartyActivitySignin,
  updateHxPartyActivitySignin,
} from "/@/api/hx/hxPartyActivitySignin";
import { listHxPartyActivity } from "/@/api/hx/hxPartyActivity";
import MemberPicker from "/@/components/memberPicker/index.vue";
defineOptions({ name: "ApiV1HxHxPartyActivitySigninEdit"})
const emit = defineEmits(['hxPartyActivitySigninList'])
const props = defineProps({
  activityOptions:{
    type:Array,
    default:()=>[]
  },
  signinMethodOptions:{
    type:Array,
    default:()=>[]
  },
})
const {proxy} = <any>getCurrentInstance()
// 远程搜索活动选项
const activitySearchOptions = ref<{ label: string; value: number }[]>([])
// 远程搜索活动
const searchActivity = async (query: string) => {
  if (!query) {
    activitySearchOptions.value = []
    return
  }
  try {
    const res = await listHxPartyActivity({ pageNum: 1, pageSize: 20, activityTitle: query })
    const list = res.data.list ?? []
    activitySearchOptions.value = list.map((item: any) => ({
      label: item.activityTitle || `活动${item.id}`,
      value: item.id
    }))
  } catch (e) {
    console.error('搜索活动失败:', e)
  }
}
const formRef = ref<HTMLElement | null>(null);
interface HxPartyActivitySigninInfoData {
  id: number|undefined;
  activityId: number|undefined;
  memberId: number|undefined;
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
    memberId: undefined,
    signinTime: undefined,
    signinMethod: undefined,
    isLate: 0,
    isLeaveEarly: 0,
    remark: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  },
  rules: {
    activityId : [
        { required: true, message: "关联活动不能为空", trigger: "blur" }
    ],
    memberId : [
        { required: true, message: "签到党员不能为空", trigger: "blur" }
    ],
    signinMethod : [
        { required: true, message: "签到方式不能为空", trigger: "blur" }
    ],
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
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
// 提交
const onSubmit = () => {
  const formWrap = unref(formRef) as any;
  if (!formWrap) return;
  formWrap.validate((valid: boolean) => {
    if (valid) {
      state.loading = true;
      if(!state.formData.id || state.formData.id===0){
        //添加
      addHxPartyActivitySignin(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxPartyActivitySigninList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxPartyActivitySignin(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxPartyActivitySigninList')
        }).finally(()=>{
          state.loading = false;
        })
      }
    }
  });
};
const resetForm = ()=>{
  state.formData = {
    id: undefined,
    activityId: undefined,
    memberId: undefined,
    signinTime: undefined,
    signinMethod: undefined,
    isLate: 0,
    isLeaveEarly: 0,
    remark: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  }
};
</script>
<style scoped>
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>

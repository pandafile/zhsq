<template>
  <div class="hx-hxFocusFollow-edit">
    <!-- 添加或修改重点问题跟进记录表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxFocusFollow-edit .el-dialog', '.hx-hxFocusFollow-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'重点问题跟进记录表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="重点问题ID" prop="caseid">
          <el-input v-model="formData.caseid" placeholder="请输入重点问题ID" />
        </el-form-item>        
        <el-form-item label="跟进时间" prop="followTime">
          <el-date-picker clearable  style="width: 200px"
            v-model="formData.followTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择跟进时间">
          </el-date-picker>
        </el-form-item>        
        <el-form-item label="跟进内容" prop="content">
          <el-input v-model="formData.content" type="textarea" placeholder="请输入跟进内容" />
        </el-form-item>        
        <el-form-item label="诉求人意见" prop="feedbackContent">
          <el-input v-model="formData.feedbackContent" type="textarea" placeholder="请输入诉求人意见" />
        </el-form-item>          
        <el-form-item label="经办人" prop="handler">
          <el-select filterable clearable v-model="formData.handler" placeholder="请选择经办人" >
            <el-option
              v-for="dict in handlerOptions"
              :key="dict.value"
              :label="dict.label"              
                  :value="dict.value"              
            ></el-option>
          </el-select>
        </el-form-item>        
        <el-form-item label="记录图片" prop="attachImages">
          <el-input v-model="formData.attachImages" placeholder="请输入记录图片" />
        </el-form-item>        
        <el-form-item label="下一步工作计划" prop="nextPlan">
          <el-input v-model="formData.nextPlan" type="textarea" placeholder="请输入下一步工作计划" />
        </el-form-item>        
        <el-form-item label="办理进度" prop="followResult">
          <el-radio-group v-model="formData.followResult">
            <el-radio
              v-for="dict in followResultOptions"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>        
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker clearable  style="width: 200px"
            v-model="formData.createTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择创建时间">
          </el-date-picker>
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
import { reactive, toRefs, ref,unref,getCurrentInstance,computed } from 'vue';
import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';
import {
  listHxFocusFollow,
  getHxFocusFollow,
  delHxFocusFollow,
  addHxFocusFollow,
  updateHxFocusFollow,  
} from "/@/api/hx/hxFocusFollow";
import {
  HxFocusFollowTableColumns,
  HxFocusFollowInfoData,
  HxFocusFollowTableDataState,
  HxFocusFollowEditState
} from "/@/views/hx/hxFocusFollow/list/component/model"
defineOptions({ name: "ApiV1HxHxFocusFollowEdit"})
const emit = defineEmits(['hxFocusFollowList'])
  const props = defineProps({    
    caseidOptions:{
      type:Array,
      default:()=>[]
    },    
    handlerOptions:{
      type:Array,
      default:()=>[]
    },    
    followResultOptions:{
      type:Array,
      default:()=>[]
    },    
  })
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const menuRef = ref();
const state = reactive<HxFocusFollowEditState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    caseid: undefined,    
    followTime: undefined,    
    content: undefined,    
    feedbackContent: undefined,    
    handler: undefined,    
    attachImages: undefined,    
    nextPlan: undefined,    
    followResult: undefined,    
    createTime: undefined,    
    linkedHxFocusFollowHxFocusCase: {      
      id:undefined,    // 主键ID      
    },    
  },
  // 表单校验
  rules: {    
    id : [
        { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],    
    caseid : [
        { required: true, message: "重点问题ID不能为空", trigger: "blur" }
    ],    
    followTime : [
        { required: true, message: "跟进时间不能为空", trigger: "blur" }
    ],    
    content : [
        { required: true, message: "跟进内容不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxFocusFollowInfoData) => {
  resetForm();
  if(row) {
    getHxFocusFollow(row.id!).then((res:any)=>{
      const data = res.data;      
      data.handler = ''+data.handler      
      data.followResult = ''+data.followResult      
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
      addHxFocusFollow(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxFocusFollowList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxFocusFollow(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxFocusFollowList')
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
    caseid: undefined,    
    followTime: undefined,    
    content: undefined,    
    feedbackContent: undefined,    
    handler: undefined,    
    attachImages: undefined,    
    nextPlan: undefined,    
    followResult: '' ,    
    createTime: undefined,    
    linkedHxFocusFollowHxFocusCase: {      
      id:undefined,    // 主键ID      
    },    
  }  
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>
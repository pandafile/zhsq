<template>
  <div class="hx-hxFocusCase-edit">
    <!-- 添加或修改重点问题表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxFocusCase-edit .el-dialog', '.hx-hxFocusCase-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'重点问题表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="来源" prop="acceptChannel">
          <el-radio-group v-model="formData.acceptChannel">
            <el-radio
              v-for="dict in acceptChannelOptions"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>        
        <el-form-item label="问题类别" prop="focusType">
          <el-input v-model="formData.focusType" placeholder="请输入问题类别" />
        </el-form-item>        
        <el-form-item label="内容" prop="content">
          <el-input v-model="formData.content" type="textarea" placeholder="请输入内容" />
        </el-form-item>        
        <el-form-item label="反馈内容" prop="feedbackContent">
          <el-input v-model="formData.feedbackContent" type="textarea" placeholder="请输入反馈内容" />
        </el-form-item>        
        <el-form-item label="工作建议" prop="handleContent">
          <el-input v-model="formData.handleContent" type="textarea" placeholder="请输入工作建议" />
        </el-form-item>          
        <el-form-item label="主办人" prop="handler">
          <el-select filterable clearable v-model="formData.handler" placeholder="请选择主办人" >
            <el-option
              v-for="dict in handlerOptions"
              :key="dict.value"
              :label="dict.label"              
                  :value="dict.value"              
            ></el-option>
          </el-select>
        </el-form-item>        
        <el-form-item label="现场图片" prop="imgs" >
          <upload-img :action="baseURL+'api/v1/system/upload/singleImg'" v-model="formData.imgs" :limit="10"></upload-img>
        </el-form-item>        
        <el-form-item label="备注" prop="notes">
          <el-input v-model="formData.notes" type="textarea" placeholder="请输入备注" />
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
  listHxFocusCase,
  getHxFocusCase,
  delHxFocusCase,
  addHxFocusCase,
  updateHxFocusCase,  
} from "/@/api/hx/hxFocusCase";
import uploadImg from "/@/components/uploadImg/index.vue"
import {
  HxFocusCaseTableColumns,
  HxFocusCaseInfoData,
  HxFocusCaseTableDataState,
  HxFocusCaseEditState
} from "/@/views/hx/hxFocusCase/list/component/model"
defineOptions({ name: "ApiV1HxHxFocusCaseEdit"})
const emit = defineEmits(['hxFocusCaseList'])
  const props = defineProps({    
    acceptChannelOptions:{
      type:Array,
      default:()=>[]
    },    
    handlerOptions:{
      type:Array,
      default:()=>[]
    },    
  })
const baseURL:string|undefined|boolean = import.meta.env.VITE_API_URL
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const menuRef = ref();
const state = reactive<HxFocusCaseEditState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    acceptChannel: undefined,    
    focusType: undefined,    
    content: undefined,    
    feedbackContent: undefined,    
    handleContent: undefined,    
    handler: undefined,    
    imgs: [] ,    
    notes: undefined,    
  },
  // 表单校验
  rules: {    
    id : [
        { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],    
    content : [
        { required: true, message: "内容不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxFocusCaseInfoData) => {
  resetForm();
  if(row) {
    getHxFocusCase(row.id!).then((res:any)=>{
      const data = res.data;      
      data.acceptChannel = ''+data.acceptChannel      
      data.handler = ''+data.handler      
      data.imgs =data.imgs?JSON.parse(data.imgs) : []      
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
      addHxFocusCase(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxFocusCaseList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxFocusCase(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxFocusCaseList')
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
    acceptChannel: '' ,    
    focusType: undefined,    
    content: undefined,    
    feedbackContent: undefined,    
    handleContent: undefined,    
    handler: undefined,    
    imgs: [] ,    
    notes: undefined,    
  }  
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>
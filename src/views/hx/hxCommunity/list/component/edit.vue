<template>
  <div class="hx-hxCommunity-edit">
    <!-- 添加或修改小区/园区信息表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="false">
      <template #header>
        <div v-drag="['.hx-hxCommunity-edit .el-dialog', '.hx-hxCommunity-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'小区/园区信息表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="小区名称" prop="communityName">
          <el-input v-model="formData.communityName" placeholder="请输入小区名称" />
        </el-form-item>          
        <el-form-item label="小区类型" prop="communityType">
          <el-select filterable clearable v-model="formData.communityType" placeholder="请选择小区类型" >
            <el-option
              v-for="dict in communityTypeOptions"
              :key="dict.value"
              :label="dict.label"              
                  :value="dict.value"              
            ></el-option>
          </el-select>
        </el-form-item>        
        <el-form-item label="小区信息" prop="basicInfo">
          <el-input
          v-model="formData.basicInfo"
          type="textarea"
          :rows="4"
          placeholder="请输入小区信息（JSON格式）"
          />
        </el-form-item>
        
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入详细地址" />
        </el-form-item>        
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入备注" />
        </el-form-item>        
        <el-form-item label="排序" prop="sort">
          <el-input v-model="formData.sort" placeholder="请输入排序" />
        </el-form-item>        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label }}</el-radio>
          </el-radio-group>
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
import { reactive, toRefs, ref,unref,getCurrentInstance,computed, PropType } from 'vue';
import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';
import {
  listHxCommunity,
  getHxCommunity,
  delHxCommunity,
  addHxCommunity,
  updateHxCommunity,  
} from "/@/api/hx/hxCommunity";
import {
  HxCommunityTableColumns,
  HxCommunityInfoData,
  HxCommunityTableDataState,
  HxCommunityEditState
} from "/@/views/hx/hxCommunity/list/component/model"
defineOptions({ name: "ApiV1HxHxCommunityEdit"})
const emit = defineEmits(['hxCommunityList'])
const props = defineProps({    
  communityTypeOptions: {
    type: Array as PropType<Array<{value: string | number, label: string}>>,
    default: () => []
  },    
  statusOptions: {
    type: Array as PropType<Array<{value: string | number, label: string}>>,
    default: () => []
  },    
})
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const menuRef = ref();
const state = reactive<HxCommunityEditState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    communityName: undefined,    
    communityType: undefined,    
    basicInfo: undefined,    
    address: undefined,    
    remark: undefined,    
    sort: undefined,    
    status: undefined,    
    createdBy: undefined,    
    createdAt: undefined,    
    updatedBy: undefined,    
    updatedAt: undefined,    
  },
  // 表单校验
  rules: {    
    communityName : [
        { required: true, message: "小区名称不能为空", trigger: "blur" }
    ],    
    status : [
        { required: true, message: "状态不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxCommunityInfoData) => {
  resetForm();
  if(row) {
    getHxCommunity(row.id!).then((res:any)=>{
      const data = res.data;      
      data.communityType = ''+data.communityType      
      data.status = ''+data.status      
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
      addHxCommunity(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxCommunityList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxCommunity(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxCommunityList')
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
    communityName: undefined,    
    communityType: undefined,    
    basicInfo: undefined,    
    address: undefined,    
    remark: undefined,    
    sort: undefined,    
    status: undefined,    
    createdBy: undefined,    
    createdAt: undefined,    
    updatedBy: undefined,    
    updatedAt: undefined,    
  }  
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>
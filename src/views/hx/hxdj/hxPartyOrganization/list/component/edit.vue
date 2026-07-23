<template>
  <div class="hx-hxPartyOrganization-edit">
    <!-- 添加或修改组织架构对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxPartyOrganization-edit .el-dialog', '.hx-hxPartyOrganization-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'组织架构'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="formData.orgName" placeholder="请输入组织名称" />
        </el-form-item>        
        <el-form-item label="上级组织" prop="parentId">
          <el-tree-select
            v-model="formData.parentId"
            :data="treeOptions"
            :props="{ label: 'orgName', value: 'id', children: 'children' }"
            placeholder="请选择上级组织"
            check-strictly
            clearable
            filterable
            style="width: 100%;"
          />
        </el-form-item>          
        <el-form-item label="组织类型" prop="orgType">
          <el-select filterable clearable v-model="formData.orgType" placeholder="请选择组织类型" >
            <el-option
                v-for="item in orgTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>        
        <el-form-item label="所属小区" prop="communityId">
          <CommunityPicker v-model="formData.communityId" placeholder="请选择所属小区" />
        </el-form-item>        
        <el-form-item label="书记" prop="secretaryId">
          <PersonPicker v-model="formData.secretaryId" placeholder="搜索人员" />
        </el-form-item>        
        <el-form-item label="排序" prop="sort">
          <el-input v-model="formData.sort" placeholder="请输入排序" />
        </el-form-item>        
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入备注" />
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
import { reactive, toRefs, ref, unref, getCurrentInstance, computed, onMounted } from 'vue';
import {ElMessageBox, ElMessage, FormInstance, UploadProps} from 'element-plus';
import {
  listHxPartyOrganization,
  getHxPartyOrganization,
  delHxPartyOrganization,
  addHxPartyOrganization,
  updateHxPartyOrganization,  
} from "/@/api/hx/hxPartyOrganization";
import PersonPicker from "/@/components/personPicker/index.vue";
import CommunityPicker from "/@/components/communityPicker/index.vue";
import {
  HxPartyOrganizationTableColumns,
  HxPartyOrganizationInfoData,
  HxPartyOrganizationTableDataState,
  HxPartyOrganizationEditState
} from "/@/views/hx/hxdj/hxPartyOrganization/list/component/model"
defineOptions({ name: "ApiV1HxHxPartyOrganizationEdit"})
const emit = defineEmits(['hxPartyOrganizationList'])
const props = defineProps({    
  statusOptions:{
    type:Array,
    default:()=>[]
  },    
  orgTypeOptions:{
    type:Array,
    default:()=>[]
  },    
  treeOptions:{
    type:Array,
    default:()=>[]
  },    
})
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const state = reactive<HxPartyOrganizationEditState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    orgName: undefined,    
    parentId: undefined,    
    orgType: undefined,    
    communityId: undefined,    
    secretaryId: undefined,    
    sort: undefined,    
    remark: undefined,    
    status: undefined,    
    createdAt: undefined,    
    updatedAt: undefined,    
  },
  // 表单校验
  rules: {    
    orgName : [
        { required: true, message: "组织名称不能为空", trigger: "blur" }
    ],    
    orgType : [
        { required: true, message: "组织类型不能为空", trigger: "blur" }
    ],    
    status : [
        { required: true, message: "状态不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxPartyOrganizationInfoData) => {
  resetForm();
  if(row) {
    getHxPartyOrganization(row.id!).then((res:any)=>{
      const data = res.data;     
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
      addHxPartyOrganization(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxPartyOrganizationList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxPartyOrganization(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxPartyOrganizationList')
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
    orgName: undefined,    
    parentId: undefined,    
    orgType: undefined,    
    communityId: undefined,    
    secretaryId: undefined,    
    sort: undefined,    
    remark: undefined,    
    status: '' ,    
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

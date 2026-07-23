<template>
  <!-- 组织架构详情抽屉 -->  
  <div class="hx-hxPartyOrganization-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>组织架构详情</h4>
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
                  组织名称
                </div>
              </template>
              {{ formData.orgName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  上级组织
                </div>
              </template>
              {{ formData.parentName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  组织类型
                </div>
              </template>
              {{ proxy.getOptionValue(formData.orgType, orgTypeOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  所属小区
                </div>
              </template>
              {{ formData.communityName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  书记
                </div>
              </template>
              {{ formData.secretaryName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  排序
                </div>
              </template>
              {{ formData.sort }}            
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
                    状态
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.status, statusOptions,'value','label') }}            
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
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
  import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';  
  import {
    listHxPartyOrganization,
    getHxPartyOrganization,
    delHxPartyOrganization,
    addHxPartyOrganization,
    updateHxPartyOrganization,    
  } from "/@/api/hx/hxPartyOrganization";  
  import {
    HxPartyOrganizationTableColumns,
    HxPartyOrganizationInfoData,
    HxPartyOrganizationTableDataState,
    HxPartyOrganizationEditState
  } from "/@/views/hx/hxdj/hxPartyOrganization/list/component/model"
  defineOptions({ name: "ApiV1HxHxPartyOrganizationDetail"})  
  const props = defineProps({    
    statusOptions:{
      type:Array,
      default:()=>[]
    },    
    orgTypeOptions:{
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
      status: undefined ,      
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
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxPartyOrganizationInfoData) => {
    resetForm();
    if(row) {
      getHxPartyOrganization(row.id!).then((res:any)=>{
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
    }
  };  
</script>
<style scoped>  
  .hx-hxPartyOrganization-detail :deep(.el-form-item--large .el-form-item__label){
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

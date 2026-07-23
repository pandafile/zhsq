<template>
  <!-- 民主评议详情抽屉 -->  
  <div class="hx-hxPartyEvaluation-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>民主评议详情</h4>
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
          <el-descriptions-item :span="2">            
              <template #label>
                <div class="cell-item">
                  评议标题
                </div>
              </template>
              {{ formData.evaluationTitle }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  所属组织
                </div>
              </template>
              {{ formData.orgName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  评议类型
                </div>
              </template>
              {{ proxy.getOptionValue(formData.evaluationType, evaluationTypeOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  被评议人
                </div>
              </template>
              {{ formData.targetMemberName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  评议人
                </div>
              </template>
              {{ formData.evaluatorName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  评议人类型
                </div>
              </template>
              {{ proxy.getOptionValue(formData.evaluatorType, evaluatorTypeOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  总得分
                </div>
              </template>
              {{ formData.scoreTotal }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  评定等级
                </div>
              </template>
              {{ formData.grade }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  评议日期
                </div>
              </template>
              {{ formData.evaluationDate }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="3">            
              <template #label>
                <div class="cell-item">
                  评分项
                </div>
              </template>
              {{ formData.scoreItems }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="3">            
              <template #label>
                <div class="cell-item">
                  评议意见
                </div>
              </template>
              {{ formData.opinionText }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="3">            
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
  import { reactive, toRefs, ref,unref,getCurrentInstance } from 'vue';
  import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';  
  import {
    listHxPartyEvaluation,
    getHxPartyEvaluation,
    delHxPartyEvaluation,
    addHxPartyEvaluation,
    updateHxPartyEvaluation,    
  } from "/@/api/hx/hxPartyEvaluation";  
  import {
    HxPartyEvaluationTableColumns,
    HxPartyEvaluationInfoData,
    HxPartyEvaluationTableDataState,
    HxPartyEvaluationEditState
  } from "/@/views/hx/hxdj/hxPartyEvaluation/list/component/model"
  defineOptions({ name: "ApiV1HxHxPartyEvaluationDetail"})  
  const props = defineProps({    
    statusOptions:{
      type:Array,
      default:()=>[]
    },    
    evaluationTypeOptions:{
      type:Array,
      default:()=>[]
    },    
    evaluatorTypeOptions:{
      type:Array,
      default:()=>[]
    },    
  })  
  const {proxy} = <any>getCurrentInstance()
  const formRef = ref<HTMLElement | null>(null);
  const menuRef = ref();  
  const state = reactive<HxPartyEvaluationEditState>({
    loading:false,
    isShowDialog: false,
    formData: {      
      id: undefined,      
      evaluationTitle: undefined,      
      orgId: undefined,      
      evaluationType: undefined,      
      targetMemberId: undefined,      
      evaluatorId: undefined,      
      evaluatorType: undefined,      
      scoreTotal: undefined,      
      scoreItems: undefined,      
      opinionText: undefined,      
      grade: undefined,      
      evaluationDate: undefined,      
      remark: undefined,      
      status: false ,      
      createdAt: undefined,      
      updatedAt: undefined,      
    },
    rules: {}
  });
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxPartyEvaluationInfoData) => {
    resetForm();
    if(row) {
      getHxPartyEvaluation(row.id!).then((res:any)=>{
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
      evaluationTitle: undefined,      
      orgId: undefined,      
      evaluationType: undefined,      
      targetMemberId: undefined,      
      evaluatorId: undefined,      
      evaluatorType: undefined,      
      scoreTotal: undefined,      
      scoreItems: undefined,      
      opinionText: undefined,      
      grade: undefined,      
      evaluationDate: undefined,      
      remark: undefined,      
      status: false ,      
      createdAt: undefined,      
      updatedAt: undefined,      
    }
  };  
</script>
<style scoped>  
  .hx-hxPartyEvaluation-detail :deep(.el-form-item--large .el-form-item__label){
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

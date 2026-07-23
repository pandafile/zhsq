<template>
  <div class="hx-hxPartyEvaluation-edit">
    <!-- 添加或修改民主评议对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxPartyEvaluation-edit .el-dialog', '.hx-hxPartyEvaluation-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'民主评议'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="评议标题" prop="evaluationTitle">
          <el-input v-model="formData.evaluationTitle" placeholder="请输入评议标题" />
        </el-form-item>        
        <el-form-item label="所属组织" prop="orgId">
          <el-tree-select
            v-model="formData.orgId"
            :data="treeOptions"
            :props="{ label: 'orgName', value: 'id', children: 'children' }"
            placeholder="请选择所属组织"
            check-strictly
            clearable
            filterable
            style="width: 100%;"
          />
        </el-form-item>          
        <el-form-item label="评议类型" prop="evaluationType">
          <el-select filterable clearable v-model="formData.evaluationType" placeholder="请选择评议类型" >
            <el-option
                v-for="item in evaluationTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>        
        <el-form-item label="被评议人" prop="targetMemberId">
          <MemberPicker v-model="formData.targetMemberId" placeholder="搜索党员" />
        </el-form-item>        
        <el-form-item label="评议人" prop="evaluatorId">
          <MemberPicker v-model="formData.evaluatorId" placeholder="搜索党员" />
        </el-form-item>        
        <el-form-item label="评议人类型" prop="evaluatorType">
          <el-select filterable clearable v-model="formData.evaluatorType" placeholder="请选择评议人类型" >
            <el-option
                v-for="item in evaluatorTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>        
        <el-form-item label="总得分" prop="scoreTotal">
          <el-input-number v-model="formData.scoreTotal" :min="0" :max="100" placeholder="请输入总得分" />
        </el-form-item>        
        <el-form-item label="评分项" prop="scoreItems">
          <el-input v-model="formData.scoreItems" type="textarea" :rows="3" placeholder="请输入评分项（JSON格式）" />
        </el-form-item>        
        <el-form-item label="评议意见" prop="opinionText">
          <el-input v-model="formData.opinionText" type="textarea" :rows="3" placeholder="请输入评议意见" />
        </el-form-item>        
        <el-form-item label="评定等级" prop="grade">
          <el-select filterable clearable v-model="formData.grade" placeholder="请选择评定等级" >
            <el-option label="优秀" value="优秀" />
            <el-option label="合格" value="合格" />
            <el-option label="基本合格" value="基本合格" />
            <el-option label="不合格" value="不合格" />
          </el-select>
        </el-form-item>        
        <el-form-item label="评议日期" prop="evaluationDate">
          <el-date-picker
            v-model="formData.evaluationDate"
            type="date"
            placeholder="选择评议日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%;"
          />
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
import { reactive, toRefs, ref, unref, getCurrentInstance } from 'vue';
import {ElMessageBox, ElMessage, FormInstance, UploadProps} from 'element-plus';
import {
  listHxPartyEvaluation,
  getHxPartyEvaluation,
  delHxPartyEvaluation,
  addHxPartyEvaluation,
  updateHxPartyEvaluation,  
} from "/@/api/hx/hxPartyEvaluation";
import MemberPicker from "/@/components/memberPicker/index.vue";
import {
  HxPartyEvaluationTableColumns,
  HxPartyEvaluationInfoData,
  HxPartyEvaluationTableDataState,
  HxPartyEvaluationEditState
} from "/@/views/hx/hxdj/hxPartyEvaluation/list/component/model"
defineOptions({ name: "ApiV1HxHxPartyEvaluationEdit"})
const emit = defineEmits(['hxPartyEvaluationList'])
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
  treeOptions:{
    type:Array,
    default:()=>[]
  },    
})
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
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
    status: undefined,    
    createdAt: undefined,    
    updatedAt: undefined,    
  },
  // 表单校验
  rules: {    
    evaluationTitle : [
        { required: true, message: "评议标题不能为空", trigger: "blur" }
    ],    
    orgId : [
        { required: true, message: "所属组织不能为空", trigger: "blur" }
    ],    
    evaluationType : [
        { required: true, message: "评议类型不能为空", trigger: "blur" }
    ],    
    targetMemberId : [
        { required: true, message: "被评议人不能为空", trigger: "blur" }
    ],    
    status : [
        { required: true, message: "状态不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxPartyEvaluationInfoData) => {
  resetForm();
  if(row) {
    getHxPartyEvaluation(row.id!).then((res:any)=>{
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
      addHxPartyEvaluation(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxPartyEvaluationList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxPartyEvaluation(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxPartyEvaluationList')
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

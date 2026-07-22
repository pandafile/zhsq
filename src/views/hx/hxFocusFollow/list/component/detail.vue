<template>
  <!-- 重点问题跟进记录表详情抽屉 -->  
  <div class="hx-hxFocusFollow-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>重点问题跟进记录表详情</h4>
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
                  主键ID
                </div>
              </template>
              {{ formData.id }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">                  
                    <template #label>
                      <div class="cell-item">
                        重点问题ID
                      </div>
                    </template>
                    {{ formData.linkedCaseid?formData.linkedCaseid.id:'' }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                跟进时间
              </div>
            </template>
            {{ proxy.parseTime(formData.followTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  跟进内容
                </div>
              </template>
              {{ formData.content }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  诉求人意见
                </div>
              </template>
              {{ formData.feedbackContent }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">              
                <template #label>
                  <div class="cell-item">
                    经办人
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.handler, handlerOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  记录图片
                </div>
              </template>
              {{ formData.attachImages }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  下一步工作计划
                </div>
              </template>
              {{ formData.nextPlan }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">              
                <template #label>
                  <div class="cell-item">
                    办理进度
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.followResult, followResultOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                创建时间
              </div>
            </template>
            {{ proxy.parseTime(formData.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>        
      </el-descriptions>      
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
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
  defineOptions({ name: "ApiV1HxHxFocusFollowDetail"})  
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
      linkedCaseid:{id:undefined,id:undefined },      
      followTime: undefined,      
      content: undefined,      
      feedbackContent: undefined,      
      handler: undefined,      
      attachImages: undefined,      
      nextPlan: undefined,      
      followResult: false ,      
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
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxFocusFollowInfoData) => {
    resetForm();
    if(row) {
      getHxFocusFollow(row.id!).then((res:any)=>{
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
      caseid: undefined,      
      linkedCaseid:{id:undefined,id:undefined },      
      followTime: undefined,      
      content: undefined,      
      feedbackContent: undefined,      
      handler: undefined,      
      attachImages: undefined,      
      nextPlan: undefined,      
      followResult: false ,      
      createTime: undefined,      
      linkedHxFocusFollowHxFocusCase: {        
        id:undefined,    // 主键ID        
      },      
    }
  };  
  //关联hx_focus_case表选项
  const getHxFocusCaseItemsCaseid = () => {
    emit("getHxFocusCaseItemsCaseid")
  }
  const getCaseidOp = computed(()=>{
    getHxFocusCaseItemsCaseid()
    return props.caseidOptions
  })  
</script>
<style scoped>  
  .hx-hxFocusFollow-detail :deep(.el-form-item--large .el-form-item__label){
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
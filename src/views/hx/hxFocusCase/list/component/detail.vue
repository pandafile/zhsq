<template>
  <!-- 重点问题表详情抽屉 -->  
  <div class="hx-hxFocusCase-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>重点问题表详情</h4>
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
                    来源
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.acceptChannel, acceptChannelOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  问题类别
                </div>
              </template>
              {{ formData.focusType }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  内容
                </div>
              </template>
              {{ formData.content }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  反馈内容
                </div>
              </template>
              {{ formData.feedbackContent }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  工作建议
                </div>
              </template>
              {{ formData.handleContent }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">              
                <template #label>
                  <div class="cell-item">
                    主办人
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.handler, handlerOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                现场图片
              </div>
            </template>
            <div class="pic-block" v-for="(img,key) in formData.imgs" :key="'imgs-'+key">
              <el-image
                      style="width: 150px; height: 150px"
                      v-if="!proxy.isEmpty(img.url)"
                      :src="proxy.getUpFileUrl(img.url)"
                      fit="contain"></el-image>
            </div>
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  备注
                </div>
              </template>
              {{ formData.notes }}            
          </el-descriptions-item>        
      </el-descriptions>      
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
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
  defineOptions({ name: "ApiV1HxHxFocusCaseDetail"})  
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
      acceptChannel: false ,      
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
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxFocusCaseInfoData) => {
    resetForm();
    if(row) {
      getHxFocusCase(row.id!).then((res:any)=>{
        const data = res.data;        
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
  const resetForm = ()=>{
    state.formData = {      
      id: undefined,      
      acceptChannel: false ,      
      focusType: undefined,      
      content: undefined,      
      feedbackContent: undefined,      
      handleContent: undefined,      
      handler: undefined,      
      imgs: [] ,      
      notes: undefined,      
    }
  };  
  const setUpImgListImgs = (data:any)=>{
    state.formData.imgs = data
  }  
</script>
<style scoped>  
  .hx-hxFocusCase-detail :deep(.el-form-item--large .el-form-item__label){
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
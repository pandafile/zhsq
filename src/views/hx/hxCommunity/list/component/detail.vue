<template>
  <!-- 小区/园区信息表详情抽屉 -->  
  <div class="hx-hxCommunity-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>小区/园区信息表详情</h4>
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
                  小区名称
                </div>
              </template>
              {{ formData.communityName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">              
                <template #label>
                  <div class="cell-item">
                    小区类型
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.communityType, communityTypeOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="3">
            <template #label>小区信息</template>
            <el-descriptions v-if="formData.basicInfo" :column="1" border size="small">
              <el-descriptions-item v-for="(value, key) in parseJson(formData.basicInfo)" :key="key">
                <template #label>{{ key }}</template>
                {{ value }}
              </el-descriptions-item>
            </el-descriptions>
            <span v-else>暂无数据</span>
          </el-descriptions-item>

          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  详细地址
                </div>
              </template>
              {{ formData.address }}            
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
                  排序
                </div>
              </template>
              {{ formData.sort }}            
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
                  创建人
                </div>
              </template>
              {{ formData.createdBy }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                创建时间
              </div>
            </template>
            {{ proxy.parseTime(formData.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  更新人
                </div>
              </template>
              {{ formData.updatedBy }}            
          </el-descriptions-item>        
      </el-descriptions>      
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
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
  defineOptions({ name: "ApiV1HxHxCommunityDetail"})  
  const props = defineProps({    
    communityTypeOptions:{
      type:Array,
      default:()=>[]
    },    
    statusOptions:{
      type:Array,
      default:()=>[]
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
      status: undefined ,      
      createdBy: undefined,      
      createdAt: undefined,      
      updatedBy: undefined,      
      updatedAt: undefined,      
    },
    // 表单校验
    rules: {      
      id : [
          { required: true, message: "主键ID不能为空", trigger: "blur" }
      ],      
      communityName : [
          { required: true, message: "小区名称不能为空", trigger: "blur" }
      ],      
      status : [
          { required: true, message: "状态不能为空", trigger: "blur" }
      ],      
    }
  });
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxCommunityInfoData) => {
    resetForm();
    if(row) {
      getHxCommunity(row.id!).then((res:any)=>{
        const data = res.data;        
        data.createdBy = data.createdUser?.userNickname        
        data.updatedBy = data.updatedUser?.userNickname        
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
      communityName: undefined,      
      communityType: undefined,      
      basicInfo: undefined,      
      address: undefined,      
      remark: undefined,      
      sort: undefined,      
      status: undefined ,      
      createdBy: undefined,      
      createdAt: undefined,      
      updatedBy: undefined,      
      updatedAt: undefined,      
    }
  };  
  const parseJson = (str: string): Record<string, any> => {
  if (!str) return {};
  try {
    const obj = typeof str === 'string' ? JSON.parse(str) : str;
    return typeof obj === 'object' ? obj : {};
  } catch {
    return {};
  }
};

</script>
<style scoped>  
  .hx-hxCommunity-detail :deep(.el-form-item--large .el-form-item__label){
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
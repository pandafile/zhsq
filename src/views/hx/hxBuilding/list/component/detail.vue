<template>
  <!-- 楼栋信息表详情抽屉 -->  
  <div class="hx-hxBuilding-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>楼栋信息表详情</h4>
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
                  楼栋名称
                </div>
              </template>
              {{ formData.buildingName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  单元数
                </div>
              </template>
              {{ formData.unitCount }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  小区ID
                </div>
              </template>
              {{ formData.communityId }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  楼层数
                </div>
              </template>
              {{ formData.floorCount }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  物业公司
                </div>
              </template>
              {{ formData.propertyCompany }}            
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
                  是否叶子节点：0-否（有下级） 1-是（无下级）
                </div>
              </template>
              {{ formData.isLeaf }}            
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
    listHxBuilding,
    getHxBuilding,
    delHxBuilding,
    addHxBuilding,
    updateHxBuilding,    
  } from "/@/api/hx/hxBuilding";  
  import {
    HxBuildingTableColumns,
    HxBuildingInfoData,
    HxBuildingTableDataState,
    HxBuildingEditState
  } from "/@/views/hx/hxBuilding/list/component/model"
  defineOptions({ name: "ApiV1HxHxBuildingDetail"})  
  const props = defineProps({    
    statusOptions:{
      type:Array,
      default:()=>[]
    },    
  })  
  const {proxy} = <any>getCurrentInstance()
  const formRef = ref<HTMLElement | null>(null);
  const menuRef = ref();  
  const state = reactive<HxBuildingEditState>({
    loading:false,
    isShowDialog: false,
    formData: {      
      id: undefined,      
      buildingName: undefined,      
      unitCount: undefined,      
      communityId: undefined,      
      floorCount: undefined,      
      buildYear: undefined,      
      propertyCompany: undefined,      
      remark: undefined,      
      sort: undefined,      
      isLeaf: undefined,      
      status: false ,      
      createdAt: undefined,      
      updatedAt: undefined,      
    },
    // 表单校验
    rules: {      
      buildingName : [
          { required: true, message: "楼栋名称不能为空", trigger: "blur" }
      ],      
      communityId : [
          { required: true, message: "小区ID不能为空", trigger: "blur" }
      ],      
      floorCount : [
          { required: true, message: "楼层数不能为空", trigger: "blur" }
      ],      
      status : [
          { required: true, message: "状态不能为空", trigger: "blur" }
      ],      
    }
  });
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxBuildingInfoData) => {
    resetForm();
    if(row) {
      getHxBuilding(row.id!).then((res:any)=>{
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
      buildingName: undefined,      
      unitCount: undefined,      
      communityId: undefined,      
      floorCount: undefined,      
      buildYear: undefined,      
      propertyCompany: undefined,      
      remark: undefined,      
      sort: undefined,      
      isLeaf: undefined,      
      status: false ,      
      createdAt: undefined,      
      updatedAt: undefined,      
    }
  };  
</script>
<style scoped>  
  .hx-hxBuilding-detail :deep(.el-form-item--large .el-form-item__label){
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
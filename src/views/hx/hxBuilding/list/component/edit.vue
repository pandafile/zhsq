<template>
  <div class="hx-hxBuilding-edit">
    <!-- 添加或修改楼栋信息表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxBuilding-edit .el-dialog', '.hx-hxBuilding-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'楼栋信息表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="楼栋名称" prop="buildingName">
          <el-input v-model="formData.buildingName" placeholder="请输入楼栋名称" />
        </el-form-item>        
        <el-form-item label="单元数" prop="unitCount">
          <el-input v-model="formData.unitCount" placeholder="请输入单元数" />
        </el-form-item>          
        <el-form-item label="小区名称" prop="communityId">
          <el-select filterable clearable v-model="formData.communityId" placeholder="请选择小区" >
            <el-option
                v-for="item in communityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>        
        <el-form-item label="楼层数" prop="floorCount">
          <el-input v-model="formData.floorCount" placeholder="请输入楼层数" />
        </el-form-item>        
        <el-form-item label="物业公司" prop="propertyCompany">
          <el-input v-model="formData.propertyCompany" placeholder="请输入物业公司" />
        </el-form-item>        
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入备注" />
        </el-form-item>        
        <el-form-item label="排序" prop="sort">
          <el-input v-model="formData.sort" placeholder="请输入排序" />
        </el-form-item>        
        <el-form-item label="是否叶子节点：0-否（有下级） 1-是（无下级）" prop="isLeaf">
          <el-input v-model="formData.isLeaf" placeholder="请输入是否叶子节点：0-否（有下级） 1-是（无下级）" />
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
import { reactive, toRefs, ref,unref,getCurrentInstance,computed, onMounted } from 'vue';
import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';
import {
  listHxBuilding,
  getHxBuilding,
  delHxBuilding,
  addHxBuilding,
  updateHxBuilding,  
} from "/@/api/hx/hxBuilding";
import { listHxCommunity } from "/@/api/hx/hxCommunity";
import {
  HxBuildingTableColumns,
  HxBuildingInfoData,
  HxBuildingTableDataState,
  HxBuildingEditState
} from "/@/views/hx/hxBuilding/list/component/model"
defineOptions({ name: "ApiV1HxHxBuildingEdit"})
const emit = defineEmits(['hxBuildingList'])
  const props = defineProps({    
    statusOptions:{
      type:Array,
      default:()=>[]
    },    
  })
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const menuRef = ref();
// 小区下拉选项
const communityOptions = ref<{ label: string; value: number }[]>([])

// 加载小区下拉选项
const loadCommunityOptions = async () => {
  try {
    const res = await listHxCommunity({ pageNum: 1, pageSize: 9999 })
    const list = res.data.list ?? []
    communityOptions.value = list.map((item: any) => ({
      label: item.communityName || item.name || `小区${item.id}`,
      value: item.id
    }))
  } catch (e) {
    console.error('获取小区列表失败:', e)
  }
}

onMounted(() => {
  loadCommunityOptions()
})
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
    status: undefined,    
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
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxBuildingInfoData) => {
  resetForm();
  if(row) {
    getHxBuilding(row.id!).then((res:any)=>{
      const data = res.data;     
      console.log('API返回数据:', data)
      console.log('communityId:', data.communityId, '类型:', typeof data.communityId)
      data.communityId = parseInt(data.communityId)      
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
      addHxBuilding(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxBuildingList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxBuilding(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxBuildingList')
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
    buildingName: undefined,    
    unitCount: undefined,    
    communityId: undefined,    
    floorCount: undefined,    
    buildYear: undefined,    
    propertyCompany: undefined,    
    remark: undefined,    
    sort: undefined,    
    isLeaf: undefined,    
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
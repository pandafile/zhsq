<template>
  <div class="hx-hxRoom-edit">
    <!-- 添加或修改房屋信息表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxRoom-edit .el-dialog', '.hx-hxRoom-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'房屋信息表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="小区/楼栋" prop="buildingId">
          <el-cascader
            v-model="formData.buildingId"
            placeholder="请选择小区和楼栋"
            :props="{ label:'label', value:'id', children:'children', lazy: true, lazyLoad: cascadeLoad, checkStrictly: true, emitPath: false }"
            filterable
            clearable
          />
        </el-form-item>
        <el-form-item label="房号" prop="roomNo">
          <el-input v-model="formData.roomNo" placeholder="请输入房号" />
        </el-form-item>        
        <el-form-item label="面积(㎡)" prop="area">
          <el-input v-model="formData.area" placeholder="请输入面积(㎡)" />
        </el-form-item>        
        <el-form-item label="房屋标签" prop="roomTags">
          <el-input v-model="formData.roomTags" type="textarea" placeholder="请输入房屋标签" />
        </el-form-item>        
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入备注" />
        </el-form-item>        
        <el-form-item label="是否叶子节点：0-否 1-是（末级）" prop="isLeaf">
          <el-input v-model="formData.isLeaf" placeholder="请输入是否叶子节点：0-否 1-是（末级）" />
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
import { reactive, toRefs, ref,unref,getCurrentInstance,computed } from 'vue';
import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';
import {
  listHxRoom,
  getHxRoom,
  delHxRoom,
  addHxRoom,
  updateHxRoom,  
} from "/@/api/hx/hxRoom";
import { listHxBuilding } from "/@/api/hx/hxBuilding";
import { listHxCommunity } from "/@/api/hx/hxCommunity";
import {
  HxRoomTableColumns,
  HxRoomInfoData,
  HxRoomTableDataState,
  HxRoomEditState
} from "/@/views/hx/hxRoom/list/component/model"
defineOptions({ name: "ApiV1HxHxRoomEdit"})
const emit = defineEmits(['hxRoomList'])
  const props = defineProps({    
    buildingIdOptions:{
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
const state = reactive<HxRoomEditState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    buildingId: undefined,    
    buildingName: undefined,    
    roomNo: undefined,    
    area: undefined,    
    roomTags: undefined,    
    remark: undefined,    
    isLeaf: undefined,    
    sort: undefined,    
    status: undefined,    
    createdAt: undefined,    
    updatedAt: undefined,    
  },
  // 表单校验
  rules: {    
    id : [
        { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],    
    buildingId : [
        { required: true, message: "楼栋ID不能为空", trigger: "blur" }
    ],    
    roomNo : [
        { required: true, message: "房号不能为空", trigger: "blur" }
    ],    
    status : [
        { required: true, message: "状态不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxRoomInfoData) => {
  resetForm();
  if(row) {
    getHxRoom(row.id!).then((res:any)=>{
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
      addHxRoom(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxRoomList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxRoom(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxRoomList')
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
    buildingId: undefined,    
    buildingName: undefined,    
    roomNo: undefined,    
    area: undefined,    
    roomTags: undefined,    
    remark: undefined,    
    isLeaf: undefined,    
    sort: undefined,    
    status: undefined,    
    createdAt: undefined,
    updatedAt: undefined,
  }
};
// 级联懒加载：小区→楼栋
const cascadeLoad = (node: any, resolve: (nodes: any[]) => void) => {
  if (node.level === 0) {
    listHxCommunity({ pageSize: 9999 }).then((res: any) => {
      const communities = res?.data?.list ?? []
      resolve(communities.map((c: any) => ({
        id: `community_${c.id}`,
        label: c.communityName,
        isLeaf: false,
        _communityId: c.id,
      })))
    }).catch(() => resolve([]))
  } else if (node.level === 1) {
    const communityId = node.data._communityId
    listHxBuilding({ pageSize: 9999, communityId }).then((res: any) => {
      const buildings = res?.data?.list ?? []
      resolve(buildings.map((b: any) => ({
        id: b.id,
        label: b.buildingName,
        isLeaf: true,
      })))
    }).catch(() => resolve([]))
  } else {
    resolve([])
  }
}
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>
<template>
  <div class="hx-hxPerson-edit">
    <!-- 添加或修改人员信息表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxPerson-edit .el-dialog', '.hx-hxPerson-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'人员信息表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>          
        <el-form-item label="性别" prop="gender">
          <el-select filterable clearable v-model="formData.gender" placeholder="请选择性别" >
            <el-option
              v-for="dict in genderOptions"
              :key="dict.value"
              :label="dict.label"              
                  :value="dict.value"              
            ></el-option>
          </el-select>
        </el-form-item>          
        <el-form-item label="小区" prop="communityId">
          <el-select filterable clearable v-model="selectCommunityId" placeholder="请选择小区" @change="onCommunityChange">
            <el-option
              v-for="item in communityOptions"
              :key="item.id"
              :label="item.communityName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="建筑" prop="buildingId">
          <el-select filterable clearable v-model="selectBuildingId" placeholder="请选择建筑" @change="onBuildingChange">
            <el-option
              v-for="item in buildingOptions"
              :key="item.id"
              :label="item.buildingName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="房号" prop="roomId">
          <el-select filterable clearable v-model="formData.roomId" placeholder="请选择房号">
            <el-option
              v-for="item in roomOptions"
              :key="item.id"
              :label="item.roomNo"
              :value="item.id"
            />
          </el-select>
        </el-form-item>        
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="formData.idCard" placeholder="请输入身份证号" />
        </el-form-item>        
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>        
        <el-form-item label="居住类型" prop="personType">
          <el-radio-group v-model="formData.personType">
            <el-radio
              v-for="dict in personTypeOptions"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>        
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker clearable  style="width: 200px"
            v-model="formData.birthday"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择出生日期">
          </el-date-picker>
        </el-form-item>        
        <el-form-item label="民族" prop="nation">
          <el-input v-model="formData.nation" placeholder="请输入民族" />
        </el-form-item>        
        <el-form-item label="基础信息（JSON格式）" prop="basicInfo">
          <el-input v-model="formData.basicInfo" type="textarea" placeholder="请输入基础信息（JSON格式）" />
        </el-form-item>        
        <el-form-item label="特殊标签（JSON数组）" prop="specialTags">
          <el-input v-model="formData.specialTags" type="textarea" placeholder="请输入特殊标签（JSON数组）" />
        </el-form-item>        
        <el-form-item label="健康信息（JSON格式）" prop="healthInfo">
          <el-input v-model="formData.healthInfo" type="textarea" placeholder="请输入健康信息（JSON格式）" />
        </el-form-item>        
        <el-form-item label="家庭信息（JSON格式）" prop="familyInfo">
          <el-input v-model="formData.familyInfo" type="textarea" placeholder="请输入家庭信息（JSON格式）" />
        </el-form-item>        
        <el-form-item label="社保信息（JSON格式）" prop="socialInfo">
          <el-input v-model="formData.socialInfo" type="textarea" placeholder="请输入社保信息（JSON格式）" />
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
import { reactive, toRefs, ref,unref,getCurrentInstance,computed } from 'vue';
import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';
import {
  listHxPerson,
  getHxPerson,
  delHxPerson,
  addHxPerson,
  updateHxPerson,  
} from "/@/api/hx/hxPerson";
import {listHxCommunity} from "/@/api/hx/hxCommunity";
import {getHxBuilding, listHxBuilding} from "/@/api/hx/hxBuilding";
import {getHxRoom, listHxRoom} from "/@/api/hx/hxRoom";
import {
  HxPersonTableColumns,
  HxPersonInfoData,
  HxPersonTableDataState,
  HxPersonEditState
} from "/@/views/hx/hxPerson/list/component/model"
defineOptions({ name: "ApiV1HxHxPersonEdit"})
const emit = defineEmits(['hxPersonList'])
  const props = defineProps({    
    genderOptions:{
      type:Array,
      default:()=>[]
    },    
    roomIdOptions:{
      type:Array,
      default:()=>[]
    },    
    personTypeOptions:{
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
// 三级联级选择状态
const selectCommunityId = ref<number|undefined>(undefined)
const selectBuildingId = ref<number|undefined>(undefined)
const communityOptions = ref<Array<any>>([])
const buildingOptions = ref<Array<any>>([])
const roomOptions = ref<Array<any>>([])
const state = reactive<HxPersonEditState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    name: undefined,    
    gender: undefined,    
    roomId: undefined,    
    idCard: undefined,    
    phone: undefined,    
    personType: undefined,    
    birthday: undefined,    
    nation: undefined,    
    basicInfo: undefined,    
    specialTags: undefined,    
    healthInfo: undefined,    
    familyInfo: undefined,    
    socialInfo: undefined,    
    remark: undefined,    
    status: undefined,    
    createdBy: undefined,    
    createdAt: undefined,    
    updatedBy: undefined,    
    updatedAt: undefined,    
    linkedHxPersonHxRoom: {      
      id:undefined,    // 主键ID      
      roomNo:undefined,    // 房号      
    },    
  },
  // 表单校验
  rules: {    
    id : [
        { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],    
    name : [
        { required: true, message: "姓名不能为空", trigger: "blur" }
    ],    
    status : [
        { required: true, message: "状态不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 加载小区选项
const loadCommunities = () => {
  listHxCommunity({}).then((res: any) => {
    communityOptions.value = res.data.list ?? []
  })
}
// 小区切换 - 加载建筑
const onCommunityChange = (val: number|undefined) => {
  selectBuildingId.value = undefined
  roomOptions.value = []
  state.formData.roomId = undefined
  if (!val) {
    buildingOptions.value = []
    return
  }
  listHxBuilding({communityId: val}).then((res: any) => {
    buildingOptions.value = res.data.list ?? []
  })
}
// 建筑切换 - 加载房号
const onBuildingChange = (val: number|undefined) => {
  state.formData.roomId = undefined
  roomOptions.value = []
  if (!val) return
  listHxRoom({buildingId: val}).then((res: any) => {
    roomOptions.value = res.data.list ?? []
  })
}
// 打开弹窗
const openDialog = (row?: HxPersonInfoData) => {
  resetForm();
  loadCommunities()
  if(row) {
    getHxPerson(row.id!).then((res:any)=>{
      const data = res.data;      
      data.gender = ''+data.gender      
      data.roomId = ''+data.roomId      
      data.personType = ''+data.personType      
      data.status = ''+data.status      
      state.formData = data;
      // 级联回填：roomId → buildingId → communityId
      if (data.roomId) {
        getHxRoom(parseInt(data.roomId)).then((roomRes: any) => {
          const room = roomRes.data
          selectBuildingId.value = room.buildingId
          getHxBuilding(room.buildingId).then((buildingRes: any) => {
            const building = buildingRes.data
            selectCommunityId.value = building.communityId
            // 加载当前小区的建筑列表
            listHxBuilding({communityId: building.communityId}).then((bRes: any) => {
              buildingOptions.value = bRes.data.list ?? []
            })
            // 加载当前建筑的房号列表
            listHxRoom({buildingId: room.buildingId}).then((rRes: any) => {
              roomOptions.value = rRes.data.list ?? []
            })
          })
        })
      }
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
      addHxPerson(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxPersonList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxPerson(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxPersonList')
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
    name: undefined,    
    gender: undefined,    
    roomId: undefined,    
    idCard: undefined,    
    phone: undefined,    
    personType: '' ,    
    birthday: undefined,    
    nation: undefined,    
    basicInfo: undefined,    
    specialTags: undefined,    
    healthInfo: undefined,    
    familyInfo: undefined,    
    socialInfo: undefined,    
    remark: undefined,    
    status: '' ,    
    createdBy: undefined,    
    createdAt: undefined,    
    updatedBy: undefined,    
    updatedAt: undefined,    
    linkedHxPersonHxRoom: {      
      id:undefined,    // 主键ID      
      roomNo:undefined,    // 房号      
    },    
  }  
  // 重置级联选择状态
  selectCommunityId.value = undefined
  selectBuildingId.value = undefined
  communityOptions.value = []
  buildingOptions.value = []
  roomOptions.value = []
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>
<template>
  <!-- 人员信息表详情抽屉 -->  
  <div class="hx-hxPerson-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>人员信息表详情</h4>
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
                  姓名
                </div>
              </template>
              {{ formData.name }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">              
                <template #label>
                  <div class="cell-item">
                    性别
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.gender, genderOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">                  
                    <template #label>
                      <div class="cell-item">
                        房号
                      </div>
                    </template>
                    {{ formData.linkedRoomId?formData.linkedRoomId.roomNo:'' }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  身份证号
                </div>
              </template>
              {{ formData.idCard }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  手机号
                </div>
              </template>
              {{ formData.phone }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">              
                <template #label>
                  <div class="cell-item">
                    居住类型
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.personType, personTypeOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                出生日期
              </div>
            </template>
            {{ proxy.parseTime(formData.birthday, '{y}-{m}-{d}') }}
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  民族
                </div>
              </template>
              {{ formData.nation }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1" :contentStyle="{'max-height':'200px','overflow-y':'auto'}">            
              <template #label>
                <div class="cell-item">
                  基础信息
                </div>
              </template>
              <pre style="margin:0;white-space:pre-wrap;">{{ formatJSON(formData.basicInfo) }}</pre>            
          </el-descriptions-item>        
          <el-descriptions-item :span="1" :contentStyle="{'max-height':'200px','overflow-y':'auto'}">            
              <template #label>
                <div class="cell-item">
                  特殊标签
                </div>
              </template>
              <pre style="margin:0;white-space:pre-wrap;">{{ formatJSON(formData.specialTags) }}</pre>            
          </el-descriptions-item>        
          <el-descriptions-item :span="1" :contentStyle="{'max-height':'200px','overflow-y':'auto'}">            
              <template #label>
                <div class="cell-item">
                  健康信息
                </div>
              </template>
              <pre style="margin:0;white-space:pre-wrap;">{{ formatJSON(formData.healthInfo) }}</pre>            
          </el-descriptions-item>        
          <el-descriptions-item :span="1" :contentStyle="{'max-height':'200px','overflow-y':'auto'}">            
              <template #label>
                <div class="cell-item">
                  家庭信息
                </div>
              </template>
              <pre style="margin:0;white-space:pre-wrap;">{{ formatJSON(formData.familyInfo) }}</pre>            
          </el-descriptions-item>        
          <el-descriptions-item :span="1" :contentStyle="{'max-height':'200px','overflow-y':'auto'}">            
              <template #label>
                <div class="cell-item">
                  社保信息
                </div>
              </template>
              <pre style="margin:0;white-space:pre-wrap;">{{ formatJSON(formData.socialInfo) }}</pre>            
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
    listHxPerson,
    getHxPerson,
    delHxPerson,
    addHxPerson,
    updateHxPerson,    
  } from "/@/api/hx/hxPerson";  
  import {
    HxPersonTableColumns,
    HxPersonInfoData,
    HxPersonTableDataState,
    HxPersonEditState
  } from "/@/views/hx/hxPerson/list/component/model"
  defineOptions({ name: "ApiV1HxHxPersonDetail"})  
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
  const formatJSON = (val: string) => {
      if (!val) return ''
      try {
          return JSON.stringify(JSON.parse(val), null, 2)
      } catch {
          return val
      }
  }
  const formRef = ref<HTMLElement | null>(null);
  const menuRef = ref();  
  const state = reactive<HxPersonEditState>({
    loading:false,
    isShowDialog: false,
    formData: {      
      id: undefined,      
      name: undefined,      
      gender: undefined,      
      roomId: undefined,      
      linkedRoomId:{id:undefined,roomNo:undefined },      
      idCard: undefined,      
      phone: undefined,      
      personType: false ,      
      birthday: undefined,      
      nation: undefined,      
      basicInfo: undefined,      
      specialTags: undefined,      
      healthInfo: undefined,      
      familyInfo: undefined,      
      socialInfo: undefined,      
      remark: undefined,      
      status: false ,      
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
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxPersonInfoData) => {
    resetForm();
    if(row) {
      getHxPerson(row.id!).then((res:any)=>{
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
      name: undefined,      
      gender: undefined,      
      roomId: undefined,      
      linkedRoomId:{id:undefined,roomNo:undefined },      
      idCard: undefined,      
      phone: undefined,      
      personType: false ,      
      birthday: undefined,      
      nation: undefined,      
      basicInfo: undefined,      
      specialTags: undefined,      
      healthInfo: undefined,      
      familyInfo: undefined,      
      socialInfo: undefined,      
      remark: undefined,      
      status: false ,      
      createdBy: undefined,      
      createdAt: undefined,      
      updatedBy: undefined,      
      updatedAt: undefined,      
      linkedHxPersonHxRoom: {        
        id:undefined,    // 主键ID        
        roomNo:undefined,    // 房号        
      },      
    }
  };  
  //关联hx_room表选项
  const getHxRoomItemsRoomId = () => {
    emit("getHxRoomItemsRoomId")
  }
  const getRoomIdOp = computed(()=>{
    getHxRoomItemsRoomId()
    return props.roomIdOptions
  })  
</script>
<style scoped>  
  .hx-hxPerson-detail :deep(.el-form-item--large .el-form-item__label){
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
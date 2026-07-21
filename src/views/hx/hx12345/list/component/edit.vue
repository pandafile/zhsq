<template>
  <div class="hx-hx12345-edit">
    <!-- 添加或修改工单列表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hx12345-edit .el-dialog', '.hx-hx12345-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'工单列表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">        
        <el-form-item label="工单编号" prop="orderNo">
          <el-input v-model="formData.orderNo" placeholder="请输入工单编号" />
        </el-form-item>        
        <el-form-item label="受理时间" prop="acceptTime">
          <el-date-picker clearable  style="width: 200px"
            v-model="formData.acceptTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择受理时间">
          </el-date-picker>
        </el-form-item>        
        <el-form-item label="受理渠道" prop="acceptChannel">
          <el-input v-model="formData.acceptChannel" placeholder="请输入受理渠道" />
        </el-form-item>        
        <el-form-item label="诉求等级" prop="appealLevel">
          <el-input v-model="formData.appealLevel" placeholder="请输入诉求等级" />
        </el-form-item>          
        <el-form-item label="小区" prop="communityId">
          <el-select filterable clearable v-model="formData.communityId" placeholder="请选择小区"  >
              <el-option              
                  v-for="item in communityIdOptions"              
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
              ></el-option>
          </el-select>
        </el-form-item>          
        <el-form-item label="业务类型" prop="businessType">
          <el-select filterable clearable v-model="formData.businessType" placeholder="请选择业务类型" >
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>        
        <el-form-item label="诉求内容" prop="appealContent">
          <el-input v-model="formData.appealContent" placeholder="请输入诉求内容" />
        </el-form-item>        
        <el-form-item label="诉求分类" prop="appealCategory">
          <el-input v-model="formData.appealCategory" placeholder="请输入诉求分类" />
        </el-form-item>        
        <el-form-item label="事项状态" prop="itemStatus">
          <el-radio-group v-model="formData.itemStatus">
            <el-radio
              v-for="dict in itemStatusOptions"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>        
        <el-form-item label="办理时限" prop="handleLimit">
          <el-input v-model="formData.handleLimit" placeholder="请输入办理时限" />
        </el-form-item>        
        <el-form-item label="反馈内容" prop="feedbackContent">
          <el-input v-model="formData.feedbackContent" placeholder="请输入反馈内容" />
        </el-form-item>        
        <el-form-item label="回复图片" prop="feedbackImages" >
          <upload-img :action="baseURL+'api/v1/system/upload/singleImg'" v-model="formData.feedbackImages" :limit="10"></upload-img>
        </el-form-item>          
        <el-form-item label="办理人员" prop="handlePerson">
          <el-select filterable clearable v-model="formData.handlePerson" placeholder="请选择办理人员" >
            <el-option
              v-for="dict in handlePersonOptions"
              :key="dict.value"
              :label="dict.label"              
                  :value="dict.value"              
            ></el-option>
          </el-select>
        </el-form-item>        
        <el-form-item label="处理图片" prop="handleImages" >
          <upload-img :action="baseURL+'api/v1/system/upload/singleImg'" v-model="formData.handleImages" :limit="10"></upload-img>
        </el-form-item>        
        <el-form-item label="扬言内容" prop="yangyanContent">
          <el-input v-model="formData.yangyanContent" placeholder="请输入扬言内容" />
        </el-form-item>        
        <el-form-item label="诉求人姓名" prop="appealerName">
          <el-input v-model="formData.appealerName" placeholder="请输入诉求人姓名" />
        </el-form-item>        
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="formData.contactPhone" placeholder="请输入联系电话" />
        </el-form-item>        
        <el-form-item label="证件号码" prop="idCardNo">
          <el-input v-model="formData.idCardNo" placeholder="请输入证件号码" />
        </el-form-item>        
        <el-form-item label="事发地址详情" prop="incidentAddressDetail">
          <el-input v-model="formData.incidentAddressDetail" placeholder="请输入事发地址详情" />
        </el-form-item>        
        <el-form-item label="诉求标题" prop="appealTitle">
          <el-input v-model="formData.appealTitle" placeholder="请输入诉求标题" />
        </el-form-item>        
        <el-form-item label="诉求内容标签" prop="appealContentTag">
          <el-input v-model="formData.appealContentTag" placeholder="请输入诉求内容标签" />
        </el-form-item>        
        <el-form-item label="记录创建时间" prop="createTime">
          <el-date-picker clearable  style="width: 200px"
            v-model="formData.createTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择记录创建时间">
          </el-date-picker>
        </el-form-item>        
        <el-form-item label="记录更新时间" prop="updateTime">
          <el-date-picker clearable  style="width: 200px"
            v-model="formData.updateTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择记录更新时间">
          </el-date-picker>
        </el-form-item>        
        <el-form-item label="备注" prop="notes">
          <el-input v-model="formData.notes" type="textarea" placeholder="请输入备注" />
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
  listHx12345,
  getHx12345,
  delHx12345,
  addHx12345,
  updateHx12345,  
} from "/@/api/hx/hx12345";
import uploadImg from "/@/components/uploadImg/index.vue"
import {
  Hx12345TableColumns,
  Hx12345InfoData,
  Hx12345TableDataState,
  Hx12345EditState
} from "/@/views/hx/hx12345/list/component/model"
defineOptions({ name: "ApiV1HxHx12345Edit"})
const emit = defineEmits(['hx12345List'])
  const props = defineProps({    
    communityIdOptions:{
      type:Array,
      default:()=>[]
    },    
    itemStatusOptions:{
      type:Array,
      default:()=>[]
    },    
    handlePersonOptions:{
      type:Array,
      default:()=>[]
    },    
  })
const baseURL:string|undefined|boolean = import.meta.env.VITE_API_URL
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const menuRef = ref();
const state = reactive<Hx12345EditState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    orderNo: undefined,    
    acceptTime: undefined,    
    acceptChannel: undefined,    
    appealLevel: undefined,    
    communityId: undefined,    
    businessType: undefined,    
    appealContent: undefined,    
    appealCategory: undefined,    
    itemStatus: undefined,    
    handleLimit: undefined,    
    feedbackContent: undefined,    
    feedbackImages: [] ,    
    handlePerson: undefined,    
    handleImages: [] ,    
    yangyanContent: undefined,    
    appealerName: undefined,    
    contactPhone: undefined,    
    idCardNo: undefined,    
    incidentAddressDetail: undefined,    
    appealTitle: undefined,    
    appealContentTag: undefined,    
    createTime: undefined,    
    updateTime: undefined,    
    notes: undefined,    
    remark: undefined,    
    linkedHx12345HxCommunity: {      
      id:undefined,    // 主键ID      
      communityName:undefined,    // 小区名称      
    },    
  },
  // 表单校验
  rules: {    
    id : [
        { required: true, message: "序号不能为空", trigger: "blur" }
    ],    
    orderNo : [
        { required: true, message: "工单编号不能为空", trigger: "blur" }
    ],    
    acceptTime : [
        { required: true, message: "受理时间不能为空", trigger: "blur" }
    ],    
    acceptChannel : [
        { required: true, message: "受理渠道不能为空", trigger: "blur" }
    ],    
    appealLevel : [
        { required: true, message: "诉求等级不能为空", trigger: "blur" }
    ],    
    businessType : [
        { required: true, message: "业务类型不能为空", trigger: "blur" }
    ],    
    appealContent : [
        { required: true, message: "诉求内容不能为空", trigger: "blur" }
    ],    
    appealCategory : [
        { required: true, message: "诉求分类不能为空", trigger: "blur" }
    ],    
    itemStatus : [
        { required: true, message: "事项状态不能为空", trigger: "blur" }
    ],    
    handleLimit : [
        { required: true, message: "办理时限不能为空", trigger: "blur" }
    ],    
    appealerName : [
        { required: true, message: "诉求人姓名不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: Hx12345InfoData) => {
  resetForm();
  if(row) {
    getHx12345(row.id!).then((res:any)=>{
      const data = res.data;      
      data.communityId = parseInt(data.communityId)      
      data.businessType = ''+data.businessType      
      data.itemStatus = ''+data.itemStatus      
      data.feedbackImages =data.feedbackImages?JSON.parse(data.feedbackImages) : []      
      data.handlePerson = ''+data.handlePerson      
      data.handleImages =data.handleImages?JSON.parse(data.handleImages) : []      
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
      addHx12345(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hx12345List')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHx12345(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hx12345List')
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
    orderNo: undefined,    
    acceptTime: undefined,    
    acceptChannel: undefined,    
    appealLevel: undefined,    
    communityId: undefined,    
    businessType: undefined,    
    appealContent: undefined,    
    appealCategory: undefined,    
    itemStatus: '' ,    
    handleLimit: undefined,    
    feedbackContent: undefined,    
    feedbackImages: [] ,    
    handlePerson: undefined,    
    handleImages: [] ,    
    yangyanContent: undefined,    
    appealerName: undefined,    
    contactPhone: undefined,    
    idCardNo: undefined,    
    incidentAddressDetail: undefined,    
    appealTitle: undefined,    
    appealContentTag: undefined,    
    createTime: undefined,    
    updateTime: undefined,    
    notes: undefined,    
    remark: undefined,    
    linkedHx12345HxCommunity: {      
      id:undefined,    // 主键ID      
      communityName:undefined,    // 小区名称      
    },    
  }  
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>
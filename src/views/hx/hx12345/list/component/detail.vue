<template>
  <!-- 工单列表详情抽屉 -->  
  <div class="hx-hx12345-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>工单列表详情</h4>
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
                  工单编号
                </div>
              </template>
              {{ formData.orderNo }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                受理时间
              </div>
            </template>
            {{ proxy.parseTime(formData.acceptTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  受理渠道
                </div>
              </template>
              {{ formData.acceptChannel }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  诉求等级
                </div>
              </template>
              {{ formData.appealLevel }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">                  
                    <template #label>
                      <div class="cell-item">
                        小区
                      </div>
                    </template>
                    {{ formData.linkedCommunityId?formData.linkedCommunityId.communityName:'' }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  业务类型
                </div>
              </template>
              {{ formData.businessType }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  诉求内容
                </div>
              </template>
              {{ formData.appealContent }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  诉求分类
                </div>
              </template>
              {{ formData.appealCategory }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">              
                <template #label>
                  <div class="cell-item">
                    事项状态
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.itemStatus, itemStatusOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  办理时限
                </div>
              </template>
              {{ formData.handleLimit }}            
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
                回复图片
              </div>
            </template>
            <div class="pic-block" v-for="(img,key) in formData.feedbackImages" :key="'feedbackImages-'+key">
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
                    办理人员
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.handlePerson, handlePersonOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                处理图片
              </div>
            </template>
            <div class="pic-block" v-for="(img,key) in formData.handleImages" :key="'handleImages-'+key">
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
                  扬言内容
                </div>
              </template>
              {{ formData.yangyanContent }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  诉求人姓名
                </div>
              </template>
              {{ formData.appealerName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  联系电话
                </div>
              </template>
              {{ formData.contactPhone }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  证件号码
                </div>
              </template>
              {{ formData.idCardNo }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  事发地址详情
                </div>
              </template>
              {{ formData.incidentAddressDetail }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  诉求标题
                </div>
              </template>
              {{ formData.appealTitle }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  诉求内容标签
                </div>
              </template>
              {{ formData.appealContentTag }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                记录创建时间
              </div>
            </template>
            {{ proxy.parseTime(formData.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                记录更新时间
              </div>
            </template>
            {{ proxy.parseTime(formData.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  备注
                </div>
              </template>
              {{ formData.notes }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  备注2
                </div>
              </template>
              {{ formData.remark }}            
          </el-descriptions-item>        
      </el-descriptions>      
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
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
  defineOptions({ name: "ApiV1HxHx12345Detail"})  
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
      linkedCommunityId:{id:undefined,communityName:undefined },      
      businessType: undefined,      
      appealContent: undefined,      
      appealCategory: undefined,      
      itemStatus: false ,      
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
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: Hx12345InfoData) => {
    resetForm();
    if(row) {
      getHx12345(row.id!).then((res:any)=>{
        const data = res.data;        
        data.feedbackImages =data.feedbackImages?JSON.parse(data.feedbackImages) : []        
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
  const resetForm = ()=>{
    state.formData = {      
      id: undefined,      
      orderNo: undefined,      
      acceptTime: undefined,      
      acceptChannel: undefined,      
      appealLevel: undefined,      
      communityId: undefined,      
      linkedCommunityId:{id:undefined,communityName:undefined },      
      businessType: undefined,      
      appealContent: undefined,      
      appealCategory: undefined,      
      itemStatus: false ,      
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
  //关联hx_community表选项
  const getHxCommunityItemsCommunityId = () => {
    emit("getHxCommunityItemsCommunityId")
  }
  const getCommunityIdOp = computed(()=>{
    getHxCommunityItemsCommunityId()
    return props.communityIdOptions
  })  
  const setUpImgListFeedbackImages = (data:any)=>{
    state.formData.feedbackImages = data
  }  
  const setUpImgListHandleImages = (data:any)=>{
    state.formData.handleImages = data
  }  
</script>
<style scoped>  
  .hx-hx12345-detail :deep(.el-form-item--large .el-form-item__label){
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
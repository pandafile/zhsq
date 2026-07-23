<template>
  <div class="hx-hxPartyActivity-edit">
    <!-- 添加或修改党组织活动对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxPartyActivity-edit .el-dialog', '.hx-hxPartyActivity-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'党组织活动'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动标题" prop="activityTitle">
              <el-input v-model="formData.activityTitle" placeholder="请输入活动标题" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型" prop="activityType">
              <el-select filterable clearable v-model="formData.activityType" placeholder="请选择活动类型" style="width: 100%;">
                <el-option
                    v-for="item in activityTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属组织" prop="orgId">
              <el-tree-select
                v-model="formData.orgId"
                :data="treeOptions"
                :props="{ label: 'orgName', value: 'id', children: 'children' }"
                placeholder="请选择所属组织"
                check-strictly
                clearable
                filterable
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织人" prop="organizerId">
              <PersonPicker v-model="formData.organizerId" placeholder="搜索人员" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="formData.startTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择开始时间"
                clearable
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="formData.endTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择结束时间"
                clearable
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动地点" prop="location">
              <el-input v-model="formData.location" placeholder="请输入活动地点" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应到人数" prop="attendeeCount">
              <el-input v-model="formData.attendeeCount" placeholder="应到人数" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实到人数" prop="actualCount">
              <el-input v-model="formData.actualCount" placeholder="实到人数" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动内容" prop="content">
          <el-input v-model="formData.content" type="textarea" :rows="3" placeholder="请输入活动内容" />
        </el-form-item>
        <el-form-item label="活动总结" prop="summary">
          <el-input v-model="formData.summary" type="textarea" :rows="3" placeholder="请输入活动总结" />
        </el-form-item>
        <el-form-item label="附件图片" prop="attachmentUrls">
          <el-input v-model="formData.attachmentUrls" type="textarea" :rows="2" placeholder="请输入附件图片JSON数组" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" :rows="2" placeholder="请输入备注" />
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
import { reactive, toRefs, ref, unref, getCurrentInstance, computed, onMounted } from 'vue';
import {ElMessageBox, ElMessage, FormInstance, UploadProps} from 'element-plus';
import {
  listHxPartyActivity,
  getHxPartyActivity,
  delHxPartyActivity,
  addHxPartyActivity,
  updateHxPartyActivity,
} from "/@/api/hx/hxPartyActivity";
import PersonPicker from "/@/components/personPicker/index.vue";
import {
  HxPartyActivityTableColumns,
  HxPartyActivityInfoData,
  HxPartyActivityTableDataState,
  HxPartyActivityEditState
} from "/@/views/hx/hxdj/hxPartyActivity/list/component/model"
defineOptions({ name: "ApiV1HxHxPartyActivityEdit"})
const emit = defineEmits(['hxPartyActivityList'])
const props = defineProps({
  statusOptions:{
    type:Array,
    default:()=>[]
  },
  activityTypeOptions:{
    type:Array,
    default:()=>[]
  },
  treeOptions:{
    type:Array,
    default:()=>[]
  },
})
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const state = reactive<HxPartyActivityEditState>({
  loading:false,
  isShowDialog: false,
  formData: {
    id: undefined,
    activityTitle: undefined,
    activityType: undefined,
    orgId: undefined,
    organizerId: undefined,
    startTime: undefined,
    endTime: undefined,
    location: undefined,
    attendeeCount: undefined,
    actualCount: undefined,
    content: undefined,
    summary: undefined,
    attachmentUrls: undefined,
    remark: undefined,
    status: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  },
  // 表单校验
  rules: {
    activityTitle : [
        { required: true, message: "活动标题不能为空", trigger: "blur" }
    ],
    activityType : [
        { required: true, message: "活动类型不能为空", trigger: "change" }
    ],
    orgId : [
        { required: true, message: "所属组织不能为空", trigger: "change" }
    ],
    startTime : [
        { required: true, message: "开始时间不能为空", trigger: "change" }
    ],
    status : [
        { required: true, message: "状态不能为空", trigger: "blur" }
    ],
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxPartyActivityInfoData) => {
  resetForm();
  if(row) {
    getHxPartyActivity(row.id!).then((res:any)=>{
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
      addHxPartyActivity(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('hxPartyActivityList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateHxPartyActivity(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('hxPartyActivityList')
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
    activityTitle: undefined,
    activityType: undefined,
    orgId: undefined,
    organizerId: undefined,
    startTime: undefined,
    endTime: undefined,
    location: undefined,
    attendeeCount: undefined,
    actualCount: undefined,
    content: undefined,
    summary: undefined,
    attachmentUrls: undefined,
    remark: undefined,
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

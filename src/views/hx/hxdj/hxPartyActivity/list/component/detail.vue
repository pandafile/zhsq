<template>
  <!-- 党组织活动详情抽屉 -->
  <div class="hx-hxPartyActivity-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>党组织活动详情</h4>
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
                  活动标题
                </div>
              </template>
              {{ formData.activityTitle }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  活动类型
                </div>
              </template>
              {{ proxy.getOptionValue(formData.activityType, activityTypeOptions,'value','label') }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  所属组织
                </div>
              </template>
              {{ formData.orgId }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  组织人
                </div>
              </template>
              {{ formData.organizerId }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  开始时间
                </div>
              </template>
              {{ proxy.parseTime(formData.startTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  结束时间
                </div>
              </template>
              {{ proxy.parseTime(formData.endTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  活动地点
                </div>
              </template>
              {{ formData.location }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  应到人数
                </div>
              </template>
              {{ formData.attendeeCount }}
          </el-descriptions-item>
          <el-descriptions-item :span="1">
              <template #label>
                <div class="cell-item">
                  实到人数
                </div>
              </template>
              {{ formData.actualCount }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
              <template #label>
                <div class="cell-item">
                  活动内容
                </div>
              </template>
              {{ formData.content }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
              <template #label>
                <div class="cell-item">
                  活动总结
                </div>
              </template>
              {{ formData.summary }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
              <template #label>
                <div class="cell-item">
                  附件图片
                </div>
              </template>
              {{ formData.attachmentUrls }}
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
    listHxPartyActivity,
    getHxPartyActivity,
    delHxPartyActivity,
    addHxPartyActivity,
    updateHxPartyActivity,
  } from "/@/api/hx/hxPartyActivity";
  import {
    HxPartyActivityTableColumns,
    HxPartyActivityInfoData,
    HxPartyActivityTableDataState,
    HxPartyActivityEditState
  } from "/@/views/hx/hxdj/hxPartyActivity/list/component/model"
  defineOptions({ name: "ApiV1HxHxPartyActivityDetail"})
  const props = defineProps({
    statusOptions:{
      type:Array,
      default:()=>[]
    },
    activityTypeOptions:{
      type:Array,
      default:()=>[]
    },
  })
  const {proxy} = <any>getCurrentInstance()
  const formRef = ref<HTMLElement | null>(null);
  const menuRef = ref();
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
      status: '' ,
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
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: HxPartyActivityInfoData) => {
    resetForm();
    if(row) {
      getHxPartyActivity(row.id!).then((res:any)=>{
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
  .hx-hxPartyActivity-detail :deep(.el-form-item--large .el-form-item__label){
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

<template>
  <div class="hx-hxPartyMember-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>党员信息详情</h4>
      </template>
      <el-descriptions
        class="margin-top"
        :column="3"
        border
        style="margin: 8px;"
      >
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">序号</div>
          </template>
          {{ formData.id }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">人员</div>
          </template>
          {{ formData.personName }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">所属组织</div>
          </template>
          {{ formData.orgName }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">党员状态</div>
          </template>
          {{ proxy.getOptionValue(formData.partyStatus, partyStatusOptions, 'value', 'label') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">入党日期</div>
          </template>
          {{ proxy.parseTime(formData.joinPartyDate, '{y}-{m}-{d}') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">转正日期</div>
          </template>
          {{ proxy.parseTime(formData.becomeFormalDate, '{y}-{m}-{d}') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">党内职务</div>
          </template>
          {{ proxy.getOptionValue(formData.partyDuty, partyDutyOptions, 'value', 'label') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">文化程度</div>
          </template>
          {{ formData.partyEducation }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">党员来源</div>
          </template>
          {{ proxy.getOptionValue(formData.partySource, partySourceOptions, 'value', 'label') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">荣誉奖励</div>
          </template>
          {{ formData.honors }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">扩展信息</div>
          </template>
          {{ formData.extraInfo }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">备注</div>
          </template>
          {{ formData.remark }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">状态</div>
          </template>
          {{ proxy.getOptionValue(formData.status, statusOptions, 'value', 'label') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">创建时间</div>
          </template>
          {{ proxy.parseTime(formData.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, ref, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import {
  getHxPartyMember,
} from "/@/api/hx/hxPartyMember";
import {
  HxPartyMemberInfoData,
  HxPartyMemberEditState
} from "/@/views/hx/hxdj/hxPartyMember/list/component/model"
defineOptions({ name: "ApiV1HxHxPartyMemberDetail" })
const props = defineProps({
  statusOptions: {
    type: Array,
    default: () => []
  },
  partyStatusOptions: {
    type: Array,
    default: () => []
  },
  partyDutyOptions: {
    type: Array,
    default: () => []
  },
  partySourceOptions: {
    type: Array,
    default: () => []
  },
})
const { proxy } = <any>getCurrentInstance()
const state = reactive<HxPartyMemberEditState>({
  loading: false,
  isShowDialog: false,
  formData: {
    id: undefined,
    personId: undefined,
    orgId: undefined,
    partyStatus: undefined,
    joinPartyDate: undefined,
    becomeFormalDate: undefined,
    partyDuty: undefined,
    partyEducation: undefined,
    partySource: undefined,
    honors: undefined,
    extraInfo: undefined,
    remark: undefined,
    status: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  },
  rules: {}
});
const { isShowDialog, formData } = toRefs(state);
// 打开弹窗
const openDialog = (row?: HxPartyMemberInfoData) => {
  resetForm();
  if (row) {
    getHxPartyMember(row.id!).then((res: any) => {
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
const resetForm = () => {
  state.formData = {
    id: undefined,
    personId: undefined,
    orgId: undefined,
    partyStatus: undefined,
    joinPartyDate: undefined,
    becomeFormalDate: undefined,
    partyDuty: undefined,
    partyEducation: undefined,
    partySource: undefined,
    honors: undefined,
    extraInfo: undefined,
    remark: undefined,
    status: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  }
};
</script>
<style scoped>
.hx-hxPartyMember-detail :deep(.el-form-item--large .el-form-item__label) {
  font-weight: bolder;
}
</style>

<template>
  <div class="hx-hxPartyMember-edit">
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxPartyMember-edit .el-dialog', '.hx-hxPartyMember-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'党员信息'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="人员" prop="personId">
          <PersonPicker v-model="formData.personId" placeholder="搜索人员" />
        </el-form-item>
        <el-form-item label="所属组织" prop="orgId">
          <el-tree-select
            v-model="formData.orgId"
            :data="treeOptions"
            :props="{ label: 'label', value: 'key', children: 'children' }"
            placeholder="请选择组织"
            filterable
            clearable
            style="width:200px;"
            check-strictly
          />
        </el-form-item>
        <el-form-item label="党员状态" prop="partyStatus">
          <el-select filterable clearable v-model="formData.partyStatus" placeholder="请选择党员状态" style="width:200px;">
            <el-option
              v-for="dict in partyStatusOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入党日期" prop="joinPartyDate">
          <el-date-picker clearable style="width: 200px"
            v-model="formData.joinPartyDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="选择入党日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="转正日期" prop="becomeFormalDate">
          <el-date-picker clearable style="width: 200px"
            v-model="formData.becomeFormalDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="选择转正日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="党内职务" prop="partyDuty">
          <el-select filterable clearable v-model="formData.partyDuty" placeholder="请选择党内职务" style="width:200px;">
            <el-option
              v-for="dict in partyDutyOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文化程度" prop="partyEducation">
          <el-input v-model="formData.partyEducation" placeholder="请输入文化程度" />
        </el-form-item>
        <el-form-item label="党员来源" prop="partySource">
          <el-select filterable clearable v-model="formData.partySource" placeholder="请选择党员来源" style="width:200px;">
            <el-option
              v-for="dict in partySourceOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="荣誉奖励" prop="honors">
          <el-input v-model="formData.honors" type="textarea" placeholder="请输入荣誉奖励(JSON)" />
        </el-form-item>
        <el-form-item label="扩展信息" prop="extraInfo">
          <el-input v-model="formData.extraInfo" type="textarea" placeholder="请输入扩展信息(JSON)" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" />
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
import { reactive, toRefs, ref, unref, getCurrentInstance } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import {
  addHxPartyMember,
  updateHxPartyMember,
  getHxPartyMember,
} from "/@/api/hx/hxPartyMember";
import PersonPicker from "/@/components/personPicker/index.vue";
import {
  HxPartyMemberInfoData,
  HxPartyMemberEditState
} from "/@/views/hx/hxdj/hxPartyMember/list/component/model"
defineOptions({ name: "ApiV1HxHxPartyMemberEdit" })
const emit = defineEmits(['hxPartyMemberList'])
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
  treeOptions: {
    type: Array,
    default: () => []
  },
})
const { proxy } = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
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
  rules: {
    personId: [
      { required: true, message: "人员不能为空", trigger: "change" }
    ],
    orgId: [
      { required: true, message: "所属组织不能为空", trigger: "change" }
    ],
    partyStatus: [
      { required: true, message: "党员状态不能为空", trigger: "change" }
    ],
    status: [
      { required: true, message: "状态不能为空", trigger: "change" }
    ],
  }
});
const { loading, isShowDialog, formData, rules } = toRefs(state);
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
// 提交
const onSubmit = () => {
  const formWrap = unref(formRef) as any;
  if (!formWrap) return;
  formWrap.validate((valid: boolean) => {
    if (valid) {
      state.loading = true;
      if (!state.formData.id || state.formData.id === 0) {
        addHxPartyMember(state.formData).then(() => {
          ElMessage.success('添加成功');
          closeDialog();
          emit('hxPartyMemberList')
        }).finally(() => {
          state.loading = false;
        })
      } else {
        updateHxPartyMember(state.formData).then(() => {
          ElMessage.success('修改成功');
          closeDialog();
          emit('hxPartyMemberList')
        }).finally(() => {
          state.loading = false;
        })
      }
    }
  });
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
  .kv-label {margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon {margin: unset;}
  .kv-row {margin-bottom: 12px;}
</style>

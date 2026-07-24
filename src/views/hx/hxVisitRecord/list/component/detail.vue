<template>
  <div class="hx-hxVisitRecord-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>走访记录详情</h4>
      </template>
      <el-descriptions class="margin-top" :column="3" border style="margin: 8px;">
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">主键ID</div></template>
          {{ formData.id }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">走访类型</div></template>
          {{ proxy.getOptionValue(formData.visitType, visitTypeOptions, 'value', 'label') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">走访时间</div></template>
          {{ proxy.parseTime(formData.visitTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">走访对象</div></template>
          {{ personName }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">关联房屋</div></template>
          {{ roomName }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">走访地点</div></template>
          {{ formData.locationDesc }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label><div class="cell-item">走访人员</div></template>
          <span v-if="visitorNames.length > 0">
            <el-tag v-for="(name, idx) in visitorNames" :key="idx" style="margin: 2px 4px 2px 0;">{{ name }}</el-tag>
          </span>
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label><div class="cell-item">走访内容</div></template>
          {{ formData.content }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">走访结果</div></template>
          {{ formData.result }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">需要跟进</div></template>
          {{ proxy.getOptionValue(formData.followUp, followUpOptions, 'value', 'label') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1" v-if="formData.followUp == 1">
          <template #label><div class="cell-item">跟进截止日期</div></template>
          {{ formData.followUpDeadline }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">状态</div></template>
          <span :class="formData.hxStatus == 1 ? 'status-tag status-tag--success' : 'status-tag status-tag--danger'">
            {{ proxy.getOptionValue(formData.hxStatus, hxStatusOptions, 'value', 'label') }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">创建人</div></template>
          {{ formData.createdBy }}
        </el-descriptions-item>
        <el-descriptions-item :span="1">
          <template #label><div class="cell-item">创建时间</div></template>
          {{ proxy.parseTime(formData.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1" v-if="formData.remark">
          <template #label><div class="cell-item">备注</div></template>
          {{ formData.remark }}
        </el-descriptions-item>
        <el-descriptions-item :span="3" v-if="formData.attachmentUrls">
          <template #label><div class="cell-item">附件URL</div></template>
          {{ formData.attachmentUrls }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, getCurrentInstance } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  getHxVisitRecord,
} from '/@/api/hx/hxVisitRecord'
import {
  HxVisitRecordInfoData,
  HxVisitRecordEditState,
} from '/@/views/hx/hxVisitRecord/list/component/model'
import { getHxPerson } from '/@/api/hx/hxPerson'
import { getHxRoom } from '/@/api/hx/hxRoom'

defineOptions({ name: 'ApiV1HxHxVisitRecordDetail' })

const props = defineProps({
  visitTypeOptions: { type: Array, default: () => [] },
  followUpOptions: { type: Array, default: () => [] },
  hxStatusOptions: { type: Array, default: () => [] },
})

const { proxy } = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null)

const state = reactive<HxVisitRecordEditState>({
  loading: false,
  isShowDialog: false,
  formData: {
    id: undefined,
    visitType: undefined,
    visitorIds: undefined,
    visitTime: undefined,
    locationDesc: undefined,
    personId: undefined,
    roomId: undefined,
    content: undefined,
    result: undefined,
    followUp: undefined,
    followUpDeadline: undefined,
    attachmentUrls: undefined,
    remark: undefined,
    hxStatus: undefined,
    createdBy: undefined,
    createdAt: undefined,
    updatedBy: undefined,
    updatedAt: undefined,
  },
  rules: {},
})

const { isShowDialog, formData } = toRefs(state)
const personName = ref('')
const roomName = ref('')
const visitorNames = ref<string[]>([])

// 打开弹窗
const openDialog = (row?: HxVisitRecordInfoData) => {
  resetForm()
  if (row) {
    getHxVisitRecord(row.id!).then(async (res: any) => {
      const data = res.data
      state.formData = data

      // 加载走访对象姓名
      if (data.personId) {
        try {
          const personRes = await getHxPerson(data.personId)
          personName.value = personRes.data?.name || `人员${data.personId}`
        } catch {
          personName.value = `人员${data.personId}`
        }
      }

      // 加载房屋信息
      if (data.roomId) {
        try {
          const roomRes = await getHxRoom(data.roomId)
          roomName.value = roomRes.data?.roomNo || `房屋${data.roomId}`
        } catch {
          roomName.value = `房屋${data.roomId}`
        }
      }

      // 加载走访人员姓名
      visitorNames.value = []
      if (data.visitorIds) {
        const ids = data.visitorIds.split(',').map(Number).filter(Boolean)
        for (const id of ids) {
          try {
            const pRes = await getHxPerson(id)
            visitorNames.value.push(pRes.data?.name || `人员${id}`)
          } catch {
            visitorNames.value.push(`人员${id}`)
          }
        }
      }
    })
  }
  state.isShowDialog = true
}

// 关闭弹窗
const closeDialog = () => {
  state.isShowDialog = false
}

defineExpose({ openDialog })

// 取消
const onCancel = () => {
  closeDialog()
}

const resetForm = () => {
  state.formData = {
    id: undefined,
    visitType: undefined,
    visitorIds: undefined,
    visitTime: undefined,
    locationDesc: undefined,
    personId: undefined,
    roomId: undefined,
    content: undefined,
    result: undefined,
    followUp: undefined,
    followUpDeadline: undefined,
    attachmentUrls: undefined,
    remark: undefined,
    hxStatus: undefined,
    createdBy: undefined,
    createdAt: undefined,
    updatedBy: undefined,
    updatedAt: undefined,
  }
  personName.value = ''
  roomName.value = ''
  visitorNames.value = []
}
</script>

<style scoped>
.hx-hxVisitRecord-detail :deep(.el-form-item--large .el-form-item__label) {
  font-weight: bolder;
}
.pic-block {
  margin-right: 8px;
}
.file-block {
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
.ml-2 {
  margin-right: 5px;
}
.attr-table {
  margin: 10px;
}
</style>

<template>
  <div class="hx-hxVisitRecord-edit">
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxVisitRecord-edit .el-dialog', '.hx-hxVisitRecord-edit .el-dialog__header']">{{ (!formData.id || formData.id == 0 ? '添加' : '修改') + '走访记录' }}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="走访类型" prop="visitType">
              <el-select filterable clearable v-model="formData.visitType" placeholder="请选择走访类型" style="width:100%;">
                <el-option v-for="dict in visitTypeOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="走访时间" prop="visitTime">
              <el-date-picker clearable style="width:100%;" v-model="formData.visitTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择走访时间" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="走访对象" prop="personId">
              <PersonPicker v-model="formData.personId" placeholder="搜索选择走访对象" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联房屋" prop="roomId">
              <el-select filterable clearable remote :remote-method="remoteSearchRoom" v-model="formData.roomId" placeholder="搜索房屋" style="width:100%;" :loading="roomLoading">
                <el-option v-for="item in roomOptions" :key="item.id" :label="item.roomNo || item.id" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="走访人员" prop="visitorIds">
              <div class="visitor-picker">
                <div class="visitor-tags" v-if="selectedVisitors.length > 0">
                  <el-tag v-for="(v, idx) in selectedVisitors" :key="idx" closable @close="removeVisitor(idx)" style="margin: 2px 4px 2px 0;">
                    {{ v.name }}
                  </el-tag>
                </div>
                <el-button type="primary" size="small" @click="openVisitorDialog">选择人员</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="走访地点" prop="locationDesc">
              <el-input v-model="formData.locationDesc" placeholder="请输入走访地点/门牌号" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="走访内容" prop="content">
          <el-input v-model="formData.content" type="textarea" :rows="3" placeholder="请输入走访内容/记录" />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="走访结果" prop="result">
              <el-input v-model="formData.result" placeholder="如：已解决、待跟进、上报等" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需要跟进" prop="followUp">
              <el-radio-group v-model="formData.followUp">
                <el-radio v-for="dict in followUpOptions" :key="dict.value" :value="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="formData.followUp == 1">
          <el-col :span="12">
            <el-form-item label="跟进截止日期" prop="followUpDeadline">
              <el-date-picker clearable style="width:100%;" v-model="formData.followUpDeadline" type="date" value-format="YYYY-MM-DD" placeholder="选择跟进截止日期" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="附件URL" prop="attachmentUrls">
          <el-input v-model="formData.attachmentUrls" placeholder="JSON数组格式，如 [\"url1\",\"url2\"]" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" :rows="2" placeholder="请输入备注" />
        </el-form-item>

        <el-form-item label="状态" prop="hxStatus">
          <el-radio-group v-model="formData.hxStatus">
            <el-radio v-for="dict in hxStatusOptions" :key="dict.value" :value="dict.value">{{ dict.label }}</el-radio>
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

    <!-- 走访人员选择弹窗 -->
    <el-dialog v-model="visitorDialogVisible" title="选择走访人员（可多选）" width="70%" append-to-body top="5vh" :close-on-click-modal="false">
      <div class="visitor-dialog">
        <el-form :inline="true" class="visitor-search">
          <el-form-item label="姓名">
            <el-input v-model="visitorKeyword" placeholder="请输入姓名" clearable style="width: 260px;" @keyup.enter="searchVisitorList" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchVisitorList"><el-icon><ele-Search /></el-icon>搜索</el-button>
            <el-button @click="resetVisitorSearch"><el-icon><ele-Refresh /></el-icon>重置</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="visitorTableRef" :data="visitorTableData.data" v-loading="visitorLoading" @selection-change="handleVisitorSelection" border style="width:100%;">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column label="姓名" prop="name" min-width="120" />
          <el-table-column label="手机号" prop="phone" min-width="140" />
          <el-table-column label="身份证号" prop="idCard" min-width="200" />
          <el-table-column label="性别" prop="gender" width="80" align="center">
            <template #default="scope">{{ scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : '-' }}</template>
          </el-table-column>
        </el-table>
        <pagination v-show="visitorTableData.total > 0" :total="visitorTableData.total" v-model:page="visitorTableData.param.pageNum" v-model:limit="visitorTableData.param.pageSize" @pagination="searchVisitorList" />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirmVisitorSelect">确 定</el-button>
          <el-button @click="visitorDialogVisible = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, unref, getCurrentInstance, computed, nextTick } from 'vue'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import {
  listHxVisitRecord,
  getHxVisitRecord,
  delHxVisitRecord,
  addHxVisitRecord,
  updateHxVisitRecord,
} from '/@/api/hx/hxVisitRecord'
import {
  HxVisitRecordTableColumns,
  HxVisitRecordInfoData,
  HxVisitRecordTableDataState,
  HxVisitRecordEditState,
} from '/@/views/hx/hxVisitRecord/list/component/model'
import PersonPicker from '/@/components/personPicker/index.vue'
import { listHxRoom } from '/@/api/hx/hxRoom'
import { listHxPerson } from '/@/api/hx/hxPerson'
import Pagination from '/@/components/pagination/index.vue'

defineOptions({ name: 'ApiV1HxHxVisitRecordEdit' })
const emit = defineEmits(['hxVisitRecordList'])

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
    followUp: 0,
    followUpDeadline: undefined,
    attachmentUrls: undefined,
    remark: undefined,
    hxStatus: 1,
    createdBy: undefined,
    createdAt: undefined,
    updatedBy: undefined,
    updatedAt: undefined,
  },
  rules: {
    visitType: [{ required: true, message: '走访类型不能为空', trigger: 'change' }],
    visitTime: [{ required: true, message: '走访时间不能为空', trigger: 'blur' }],
  },
})

const { loading, isShowDialog, formData, rules } = toRefs(state)

// 房屋远程搜索
const roomLoading = ref(false)
const roomOptions = ref<any[]>([])

const remoteSearchRoom = async (keyword: string) => {
  if (!keyword || keyword.trim() === '') {
    roomOptions.value = []
    return
  }
  roomLoading.value = true
  try {
    const res = await listHxRoom({ pageNum: 1, pageSize: 20, roomNo: keyword })
    roomOptions.value = res.data.list ?? []
  } catch {
    roomOptions.value = []
  } finally {
    roomLoading.value = false
  }
}

// 走访人员（多选）
const visitorDialogVisible = ref(false)
const visitorKeyword = ref('')
const visitorLoading = ref(false)
const visitorTableRef = ref()
const visitorTableData = reactive({
  data: [] as any[],
  total: 0,
  param: { pageNum: 1, pageSize: 10, name: undefined as string | undefined },
})
const selectedVisitors = ref<Array<{ id: number; name: string }>>([])
const tempSelectedVisitors = ref<Array<{ id: number; name: string }>>([])

const openVisitorDialog = () => {
  tempSelectedVisitors.value = [...selectedVisitors.value]
  visitorDialogVisible.value = true
  nextTick(() => {
    searchVisitorList()
  })
}

const searchVisitorList = async () => {
  visitorLoading.value = true
  const keyword = visitorKeyword.value?.trim()
  const params: any = { pageNum: visitorTableData.param.pageNum, pageSize: visitorTableData.param.pageSize }
  if (keyword) {
    params.name = keyword
  }
  try {
    const res = await listHxPerson(params)
    visitorTableData.data = res.data.list ?? []
    visitorTableData.total = res.data.total ?? 0
    // 回勾选中已有人员
    nextTick(() => {
      if (visitorTableRef.value) {
        const ids = tempSelectedVisitors.value.map((v) => v.id)
        visitorTableData.data.forEach((row: any) => {
          if (ids.includes(row.id)) {
            visitorTableRef.value.toggleRowSelection(row, true)
          }
        })
      }
    })
  } catch {
    ElMessage.error('搜索人员失败')
  } finally {
    visitorLoading.value = false
  }
}

const resetVisitorSearch = () => {
  visitorKeyword.value = ''
  visitorTableData.param.pageNum = 1
  visitorTableData.param.pageSize = 10
  searchVisitorList()
}

const handleVisitorSelection = (selection: any[]) => {
  tempSelectedVisitors.value = selection.map((row: any) => ({ id: row.id, name: row.name }))
}

const confirmVisitorSelect = () => {
  selectedVisitors.value = [...tempSelectedVisitors.value]
  state.formData.visitorIds = selectedVisitors.value.map((v) => v.id).join(',')
  visitorDialogVisible.value = false
}

const removeVisitor = (idx: number) => {
  selectedVisitors.value.splice(idx, 1)
  state.formData.visitorIds = selectedVisitors.value.map((v) => v.id).join(',')
}

// 弹窗控制
const openDialog = (row?: HxVisitRecordInfoData) => {
  resetForm()
  if (row) {
    getHxVisitRecord(row.id!).then((res: any) => {
      const data = res.data
      // 数值类型转换
      if (data.visitType !== undefined) data.visitType = '' + data.visitType
      if (data.followUp !== undefined) data.followUp = '' + data.followUp
      if (data.hxStatus !== undefined) data.hxStatus = '' + data.hxStatus
      state.formData = data
      // 回填走访人员标签
      if (data.visitorIds) {
        const ids = data.visitorIds.split(',').map(Number).filter(Boolean)
        if (ids.length > 0) {
          Promise.all(ids.map((id: number) => proxy.$api.getHxPerson?.(id).catch(() => null))).then((results) => {
            selectedVisitors.value = results.filter(Boolean).map((r: any) => ({ id: r.data.id, name: r.data.name }))
          })
        }
      }
    })
  }
  state.isShowDialog = true
}

const closeDialog = () => {
  state.isShowDialog = false
}

defineExpose({ openDialog })

const onCancel = () => {
  closeDialog()
}

const onSubmit = () => {
  const formWrap = unref(formRef) as any
  if (!formWrap) return
  formWrap.validate((valid: boolean) => {
    if (valid) {
      state.loading = true
      // 确保走访人员ID串已写入
      state.formData.visitorIds = selectedVisitors.value.map((v) => v.id).join(',')
      if (!state.formData.id || state.formData.id === 0) {
        addHxVisitRecord(state.formData)
          .then(() => {
            ElMessage.success('添加成功')
            closeDialog()
            emit('hxVisitRecordList')
          })
          .finally(() => {
            state.loading = false
          })
      } else {
        updateHxVisitRecord(state.formData)
          .then(() => {
            ElMessage.success('修改成功')
            closeDialog()
            emit('hxVisitRecordList')
          })
          .finally(() => {
            state.loading = false
          })
      }
    }
  })
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
    followUp: 0,
    followUpDeadline: undefined,
    attachmentUrls: undefined,
    remark: undefined,
    hxStatus: 1,
    createdBy: undefined,
    createdAt: undefined,
    updatedBy: undefined,
    updatedAt: undefined,
  }
  selectedVisitors.value = []
  roomOptions.value = []
}
</script>

<style scoped>
.visitor-picker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-height: 32px;
  padding: 2px 0;
  border: 1px dashed var(--el-border-color);
  border-radius: 4px;
  padding: 4px 8px;
}
.visitor-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
}
</style>

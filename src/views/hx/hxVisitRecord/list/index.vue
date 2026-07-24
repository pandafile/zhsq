<template>
  <div class="hx-hxVisitRecord-container">
    <el-card shadow="hover">
      <div class="hx-card-header">
        <span class="hx-card-header__bar"></span>
        <span class="hx-card-header__title">走访记录管理</span>
      </div>
      <div class="hx-hxVisitRecord-search mb15">
        <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
          <el-row>
            <el-col :span="8" class="colBlock">
              <el-form-item label="走访类型" prop="visitType">
                <el-select filterable clearable v-model="tableData.param.visitType" placeholder="请选择走访类型" style="width:200px;">
                  <el-option v-for="dict in visitTypeOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="colBlock">
              <el-form-item label="走访时间" prop="visitTime">
                <el-date-picker clearable style="width:200px;" v-model="tableData.param.visitTime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" type="datetime" placeholder="选择走访时间" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
              <el-form-item>
                <el-button type="primary" @click="hxVisitRecordList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                <el-button @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                <el-button type="primary" link @click="toggleSearch">
                  {{ word }}
                  <el-icon v-show="showAll"><ele-ArrowUp /></el-icon>
                  <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="走访地点" prop="locationDesc">
                <el-input v-model="tableData.param.locationDesc" placeholder="请输入走访地点" clearable @keyup.enter.native="hxVisitRecordList" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="走访结果" prop="result">
                <el-input v-model="tableData.param.result" placeholder="请输入走访结果" clearable @keyup.enter.native="hxVisitRecordList" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="需要跟进" prop="followUp">
                <el-select filterable clearable v-model="tableData.param.followUp" placeholder="请选择" style="width:200px;">
                  <el-option v-for="dict in followUpOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="状态" prop="hxStatus">
                <el-select filterable clearable v-model="tableData.param.hxStatus" placeholder="请选择状态" style="width:200px;">
                  <el-option v-for="dict in hxStatusOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item>
                <el-button type="primary" @click="hxVisitRecordList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                <el-button @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                <el-button type="primary" link @click="toggleSearch">
                  {{ word }}
                  <el-icon v-show="showAll"><ele-ArrowUp /></el-icon>
                  <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" @click="handleAdd" v-auth="'api/v1/hx/hxVisitRecord/add'"><el-icon><ele-Plus /></el-icon>新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" :disabled="single" @click="handleUpdate(null)" v-auth="'api/v1/hx/hxVisitRecord/edit'"><el-icon><ele-Edit /></el-icon>修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" :disabled="multiple" @click="handleDelete(null)" v-auth="'api/v1/hx/hxVisitRecord/delete'"><el-icon><ele-Delete /></el-icon>删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" @click="handleExport()" v-auth="'api/v1/hx/hxVisitRecord/export'"><el-icon><ele-Download /></el-icon>导出Excel</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" @click="handleImport()" v-auth="'api/v1/hx/hxVisitRecord/import'"><el-icon><ele-Upload /></el-icon>导入Excel</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="走访类型" align="center" prop="visitType" min-width="120" :formatter="visitTypeFormat" />
        <el-table-column label="走访时间" align="center" prop="visitTime" min-width="160">
          <template #default="scope">
            <span>{{ proxy.parseTime(scope.row.visitTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="走访地点" align="center" prop="locationDesc" min-width="160" />
        <el-table-column label="走访对象ID" align="center" prop="personId" min-width="100" />
        <el-table-column label="房屋ID" align="center" prop="roomId" min-width="100" />
        <el-table-column label="走访结果" align="center" prop="result" min-width="140" />
        <el-table-column label="需要跟进" align="center" prop="followUp" min-width="100" :formatter="followUpFormat" />
        <el-table-column label="状态" align="center" prop="hxStatus" min-width="100">
          <template #default="scope">
            <span :class="scope.row.hxStatus == 1 ? 'status-tag status-tag--success' : 'status-tag status-tag--danger'">
              {{ proxy.selectDictLabel(hxStatusOptions.value, scope.row.hxStatus) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center" prop="createdBy" min-width="120" />
        <el-table-column label="创建时间" align="center" prop="createdAt" min-width="160">
          <template #default="scope">
            <span>{{ proxy.parseTime(scope.row.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding" min-width="200px" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleView(scope.row)" v-auth="'api/v1/hx/hxVisitRecord/get'"><el-icon><ele-View /></el-icon>详情</el-button>
            <el-button type="primary" link @click="handleUpdate(scope.row)" v-auth="'api/v1/hx/hxVisitRecord/edit'"><el-icon><ele-EditPen /></el-icon>修改</el-button>
            <el-button type="primary" link @click="handleDelete(scope.row)" v-auth="'api/v1/hx/hxVisitRecord/delete'"><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.total > 0" :total="tableData.total" v-model:page="tableData.param.pageNum" v-model:limit="tableData.param.pageSize" @pagination="hxVisitRecordList" />
    </el-card>
    <ApiV1HxHxVisitRecordEdit
      ref="editRef"
      :visitTypeOptions="visitTypeOptions"
      :followUpOptions="followUpOptions"
      :hxStatusOptions="hxStatusOptions"
      @hxVisitRecordList="hxVisitRecordList"
    />
    <ApiV1HxHxVisitRecordDetail
      ref="detailRef"
      :visitTypeOptions="visitTypeOptions"
      :followUpOptions="followUpOptions"
      :hxStatusOptions="hxStatusOptions"
      @hxVisitRecordList="hxVisitRecordList"
    />
    <loadExcel ref="loadExcelHxVisitRecordRef" @getList="hxVisitRecordList" upUrl="api/v1/hx/hxVisitRecord/import" tplUrl="/api/v1/hx/hxVisitRecord/excelTemplate" />
  </div>
</template>

<script setup lang="ts">
import { toRefs, reactive, onMounted, ref, computed, getCurrentInstance, toRaw } from 'vue'
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus'
import {
  listHxVisitRecord,
  getHxVisitRecord,
  delHxVisitRecord,
  addHxVisitRecord,
  updateHxVisitRecord,
  linkedDataSearch,
} from '/@/api/hx/hxVisitRecord'
import {
  HxVisitRecordTableColumns,
  HxVisitRecordInfoData,
  HxVisitRecordTableDataState,
} from '/@/views/hx/hxVisitRecord/list/component/model'
import ApiV1HxHxVisitRecordEdit from '/@/views/hx/hxVisitRecord/list/component/edit.vue'
import ApiV1HxHxVisitRecordDetail from '/@/views/hx/hxVisitRecord/list/component/detail.vue'
import { downLoadXml } from '/@/utils/zipdownload'
import loadExcel from '/@/components/loadExcel/index.vue'

defineOptions({ name: 'apiV1HxHxVisitRecordList' })

const { proxy } = <any>getCurrentInstance()
const loading = ref(false)
const queryRef = ref()
const editRef = ref()
const detailRef = ref()
const loadExcelHxVisitRecordRef = ref()

// 是否显示所有搜索选项
const showAll = ref(false)
// 非单个禁用
const single = ref(true)
// 非多个禁用
const multiple = ref(true)
const word = computed(() => {
  return showAll.value === false ? '展开搜索' : '收起搜索'
})

// 字典选项数据
const { visitTypeOptions, followUpOptions, hxStatusOptions } = proxy.useDict('visit_type', 'follow_up', 'hx_status')

const state = reactive<HxVisitRecordTableDataState>({
  ids: [],
  tableData: {
    data: [],
    total: 0,
    loading: false,
    param: {
      pageNum: 1,
      pageSize: 10,
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
      remark: undefined,
      hxStatus: undefined,
      createdBy: undefined,
      createdAt: undefined,
      dateRange: [],
    },
  },
})

const { tableData } = toRefs(state)

// 页面加载时
onMounted(() => {
  initTableData()
})

// 初始化表格数据
const initTableData = () => {
  hxVisitRecordList()
}

/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  hxVisitRecordList()
}

// 获取列表数据
const hxVisitRecordList = () => {
  loading.value = true
  listHxVisitRecord(state.tableData.param).then((res: any) => {
    const list = res.data.list ?? []
    state.tableData.data = list
    state.tableData.total = res.data.total
    loading.value = false
  })
}

const toggleSearch = () => {
  showAll.value = !showAll.value
}

// 走访类型字典翻译
const visitTypeFormat = (row: HxVisitRecordTableColumns) => {
  return proxy.selectDictLabel(visitTypeOptions.value, row.visitType)
}
// 跟进标记字典翻译
const followUpFormat = (row: HxVisitRecordTableColumns) => {
  return proxy.selectDictLabel(followUpOptions.value, row.followUp)
}

// 多选框选中数据
const handleSelectionChange = (selection: Array<HxVisitRecordInfoData>) => {
  state.ids = selection.map((item) => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}

const handleAdd = () => {
  editRef.value.openDialog()
}

const handleUpdate = (row: HxVisitRecordTableColumns | null) => {
  if (!row) {
    row = state.tableData.data.find((item: HxVisitRecordTableColumns) => {
      return item.id === state.ids[0]
    }) as HxVisitRecordTableColumns
  }
  editRef.value.openDialog(toRaw(row))
}

const handleDelete = (row: HxVisitRecordTableColumns | null) => {
  let msg = '你确定要删除所选数据？'
  let id: number[] = []
  if (row) {
    msg = `此操作将永久删除数据，是否继续?`
    id = [row.id]
  } else {
    id = state.ids
  }
  if (id.length === 0) {
    ElMessage.error('请选择要删除的数据。')
    return
  }
  ElMessageBox.confirm(msg, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      delHxVisitRecord(id).then(() => {
        ElMessage.success('删除成功')
        hxVisitRecordList()
      })
    })
    .catch(() => {})
}

const handleView = (row: HxVisitRecordTableColumns) => {
  detailRef.value.openDialog(toRaw(row))
}

// 导出excel
const handleExport = () => {
  downLoadXml('/api/v1/hx/hxVisitRecord/export', state.tableData.param, 'get')
}

const handleImport = () => {
  loadExcelHxVisitRecordRef.value.open()
}
</script>

<style lang="scss" scoped>
.colBlock {
  display: block;
}
.colNone {
  display: none;
}
.ml-2 {
  margin: 3px;
}
</style>

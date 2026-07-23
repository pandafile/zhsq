<template>
  <div class="hx-hxzhdj-container">
    <el-card shadow="hover">
      <div class="hx-card-header">
        <span class="hx-card-header__bar"></span>
        <span class="hx-card-header__title">智慧党建人员管理</span>
      </div>
      <div class="hx-hxzhdj-search mb15">
        <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
          <el-row>
            <el-col :span="8" class="colBlock">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="tableData.param.name"
                  placeholder="请输入姓名"
                  clearable
                  @keyup.enter.native="hxPersonList"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
              <el-form-item>
                <el-button type="primary" @click="hxPersonList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                <el-button @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                <el-button type="primary" link @click="toggleSearch">
                  {{ word }}
                  <el-icon v-show="showAll"><ele-ArrowUp /></el-icon>
                  <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="性别" prop="gender">
                <el-select filterable v-model="tableData.param.gender" placeholder="请选择性别" clearable style="width:200px;">
                  <el-option
                    v-for="dict in sys_user_sex"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="房屋地址">
                <el-cascader
                  v-model="tableData.param.roomId"
                  :props="{ label:'label', value:'id', children:'children', lazy: true, lazyLoad: cascadeLoad, checkStrictly: true, emitPath: false }"
                  placeholder="请选择房屋地址"
                  filterable
                  clearable
                  style="width:200px;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="身份证号" prop="idCard">
                <el-input
                  v-model="tableData.param.idCard"
                  placeholder="请输入身份证号"
                  clearable
                  @keyup.enter.native="hxPersonList"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="手机号" prop="phone">
                <el-input
                  v-model="tableData.param.phone"
                  placeholder="请输入手机号"
                  clearable
                  @keyup.enter.native="hxPersonList"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="居住类型" prop="persontype">
                <el-select filterable v-model="tableData.param.persontype" placeholder="请选择居住类型" clearable style="width:200px;">
                  <el-option
                    v-for="dict in personType"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker
                  clearable style="width: 200px"
                  v-model="tableData.param.birthday"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  type="date"
                  placeholder="选择出生日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="身份标签" prop="specialTags">
                <el-select filterable v-model="tagFilter" placeholder="按身份标签筛选" clearable style="width:200px;">
                  <el-option
                    v-for="tag in partyIdentityTags"
                    :key="tag"
                    :label="tag"
                    :value="tag"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item label="状态" prop="status">
                <el-select filterable v-model="tableData.param.status" placeholder="请选择状态" clearable style="width:200px;">
                  <el-option
                    v-for="dict in hx_status"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
              <el-form-item>
                <el-button type="primary" @click="hxPersonList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
            <el-button
              type="primary"
              @click="handleAdd"
              v-auth="'api/v1/hx/hxPerson/add'"
            ><el-icon><ele-Plus /></el-icon>新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              :disabled="single"
              @click="handleUpdate(null)"
              v-auth="'api/v1/hx/hxPerson/edit'"
            ><el-icon><ele-Edit /></el-icon>修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              :disabled="multiple"
              @click="handleDelete(null)"
              v-auth="'api/v1/hx/hxPerson/delete'"
            ><el-icon><ele-Delete /></el-icon>删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="warning"
              @click="handleExport()"
              v-auth="'api/v1/hx/hxPerson/export'"
            ><el-icon><ele-Download /></el-icon>导出Excel</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              @click="handleImport()"
              v-auth="'api/v1/hx/hxPerson/import'"
            ><el-icon><ele-Upload /></el-icon>导入Excel</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-switch
              v-model="showAllPeople"
              active-text="显示全部"
              inactive-text="仅已标记"
              @change="onShowAllChange"
              style="margin-left: 12px;"
            />
          </el-col>
        </el-row>
      </div>
      <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="姓名" align="center" prop="name" min-width="120px" />
        <el-table-column label="性别" align="center" prop="gender" :formatter="genderFormat" min-width="80px" />
        <el-table-column label="房屋地址" align="center" min-width="150px">
          <template #default="scope">
            <span>{{ [scope.row.linkedRoomId?.buildingName, scope.row.linkedRoomId?.roomNo].filter(Boolean).join('') || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号" align="center" prop="idCard" min-width="150px" />
        <el-table-column label="手机号" align="center" prop="phone" min-width="120px" />
        <el-table-column label="居住类型" align="center" prop="persontype" :formatter="persontypeFormat" min-width="100px" />
        <el-table-column label="出生日期" align="center" prop="birthday" min-width="120px">
          <template #default="scope">
            <span>{{ proxy.parseTime(scope.row.birthday, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份标签" align="left" prop="specialTags" min-width="220px">
          <template #default="scope">
            <div v-if="scope.row.specialTags">
              <el-tag
                v-for="(tag, idx) in parseTags(scope.row.specialTags)"
                :key="idx"
                size="small"
                style="margin: 2px"
              >{{ tag }}</el-tag>
            </div>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" min-width="80px" />
        <el-table-column label="创建时间" align="center" prop="createdAt" min-width="160px">
          <template #default="scope">
            <span>{{ proxy.parseTime(scope.row.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding" min-width="200px" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleView(scope.row)" v-auth="'api/v1/hx/hxPerson/get'">
              <el-icon><ele-View /></el-icon>详情
            </el-button>
            <el-button type="primary" link @click="handleUpdate(scope.row)" v-auth="'api/v1/hx/hxPerson/edit'">
              <el-icon><ele-EditPen /></el-icon>修改
            </el-button>
            <el-button type="primary" link @click="handleDelete(scope.row)" v-auth="'api/v1/hx/hxPerson/delete'">
              <el-icon><ele-DeleteFilled /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="tableData.total > 0"
        :total="tableData.total"
        v-model:page="tableData.param.pageNum"
        v-model:limit="tableData.param.pageSize"
        @pagination="hxPersonList"
      />
    </el-card>
    <ApiV1HxHxzhdjEdit
      ref="editRef"
      :genderOptions="sys_user_sex"
      :persontypeOptions="personType"
      :statusOptions="hx_status"
      @hxPersonList="hxPersonList"
    ></ApiV1HxHxzhdjEdit>
    <ApiV1HxHxzhdjDetail
      ref="detailRef"
      :genderOptions="sys_user_sex"
      :roomIdOptions="roomIdOptions"
      :persontypeOptions="personType"
      :statusOptions="hx_status"
      @hxPersonList="hxPersonList"
    ></ApiV1HxHxzhdjDetail>
    <loadExcel ref="loadExcelHxzhdjRef" @getList="hxPersonList"
               upUrl="api/v1/hx/hxPerson/import"
               tplUrl="/api/v1/hx/hxPerson/excelTemplate"></loadExcel>
  </div>
</template>
<script setup lang="ts">
import { ItemOptions } from "/@/api/items";
import { toRefs, reactive, onMounted, ref, computed, getCurrentInstance, toRaw } from 'vue';
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus';
import {
  listHxPerson,
  delHxPerson,
  linkedDataSearch,
} from "/@/api/hx/hxPerson";
import { listHxCommunity } from "/@/api/hx/hxCommunity";
import { listHxBuilding } from "/@/api/hx/hxBuilding";
import { listHxRoom } from "/@/api/hx/hxRoom";
import {
  HxPersonTableColumns,
  HxPersonInfoData,
  HxPersonTableDataState,
} from "/@/views/hx/hxPerson/list/component/model"
import {
  partyIdentityTags,
  parseSpecialTags,
} from "/@/views/hx/hxzhdj/list/component/model"
import ApiV1HxHxzhdjEdit from "/@/views/hx/hxzhdj/list/component/edit.vue"
import ApiV1HxHxzhdjDetail from "/@/views/hx/hxzhdj/list/component/detail.vue"
import { downLoadXml } from "/@/utils/zipdownload";
import loadExcel from "/@/components/loadExcel/index.vue"
defineOptions({ name: "apiV1HxHxzhdjList" })
const { proxy } = <any>getCurrentInstance()
const loading = ref(false)
const queryRef = ref()
const editRef = ref();
const detailRef = ref();
const loadExcelHxzhdjRef = ref();
// 是否显示所有搜索选项
const showAll = ref(false)
// 非单个禁用
const single = ref(true)
// 非多个禁用
const multiple = ref(true)
const word = computed(() => {
  return showAll.value ? "收起搜索" : "展开搜索";
})
// 是否显示全部人员（默认仅已标记）
const showAllPeople = ref(false)
// 身份标签筛选（前端过滤）
const tagFilter = ref<string | undefined>(undefined)

// 字典选项数据
const {
  sys_user_sex,
  personType,
  hx_status,
} = proxy.useDict(
  'sys_user_sex',
  'personType',
  'hx_status',
)
// roomIdOptions 关联表数据
const roomIdOptions = ref<Array<ItemOptions>>([])
const state = reactive<HxPersonTableDataState>({
  ids: [],
  tableData: {
    data: [],
    total: 0,
    loading: false,
    param: {
      pageNum: 1,
      pageSize: 10,
      id: undefined,
      name: undefined,
      gender: undefined,
      roomId: undefined,
      idCard: undefined,
      phone: undefined,
      persontype: undefined,
      birthday: undefined,
      nation: undefined,
      basicInfo: undefined,
      specialTags: undefined,
      healthInfo: undefined,
      familyInfo: undefined,
      socialInfo: undefined,
      status: undefined,
      createdBy: undefined,
      createdAt: undefined,
      dateRange: [],
    },
  },
});
const { tableData } = toRefs(state);

onMounted(() => {
  initTableData();
});

const initTableData = () => {
  linkedData()
  hxPersonList()
};

const linkedData = async () => {
  linkedDataSearch().then((res: any) => {
    roomIdOptions.value = proxy.setItems(res, 'id', 'roomNo', 'linkedHxPersonHxRoom')
  })
}

// 级联懒加载
const cascadeLoad = (node: any, resolve: (nodes: any[]) => void) => {
  if (node.level === 0) {
    listHxCommunity({ pageSize: 9999 }).then((res: any) => {
      const communities = res?.data?.list ?? []
      resolve(communities.map((c: any) => ({
        id: `community_${c.id}`,
        label: c.communityName,
        isLeaf: false,
        _communityId: c.id,
      })))
    }).catch(() => resolve([]))
  } else if (node.level === 1) {
    const communityId = node.data._communityId
    listHxBuilding({ pageSize: 9999, communityId }).then((res: any) => {
      const buildings = res?.data?.list ?? []
      resolve(buildings.map((b: any) => ({
        id: `building_${b.id}`,
        label: b.buildingName,
        isLeaf: false,
        _buildingId: b.id,
      })))
    }).catch(() => resolve([]))
  } else if (node.level === 2) {
    const buildingId = node.data._buildingId
    listHxRoom({ pageSize: 9999, buildingId }).then((res: any) => {
      const rooms = res?.data?.list ?? []
      resolve(rooms.map((r: any) => ({
        id: r.id,
        label: r.roomNo,
        isLeaf: true,
      })))
    }).catch(() => resolve([]))
  } else {
    resolve([])
  }
}

/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  tagFilter.value = undefined
  hxPersonList()
};

// 获取列表数据
const hxPersonList = () => {
  loading.value = true
  listHxPerson(state.tableData.param).then((res: any) => {
    let list = res.data.list ?? [];
    list.map((item: any) => {
      item.createdBy = item.createdUser?.userNickname
    })
    // 默认仅显示已标记人员（specialTags 非空）
    if (!showAllPeople.value) {
      list = list.filter((item: any) => {
        return item.specialTags && item.specialTags !== 'null' && item.specialTags !== '[]'
      })
    }
    // 前端身份标签筛选
    if (tagFilter.value) {
      list = list.filter((item: any) => {
        const tags = parseSpecialTags(item.specialTags)
        return tags.includes(tagFilter.value!)
      })
    }
    state.tableData.data = list;
    state.tableData.total = list.length;
    loading.value = false
  })
};

const toggleSearch = () => {
  showAll.value = !showAll.value;
}

const onShowAllChange = () => {
  hxPersonList()
}

// 性别字典翻译
const genderFormat = (row: HxPersonTableColumns) => {
  return proxy.selectDictLabel(sys_user_sex.value, row.gender);
}
// 居住类型字典翻译
const persontypeFormat = (row: HxPersonTableColumns) => {
  return proxy.selectDictLabel(personType.value, row.persontype);
}
// 状态字典翻译
const statusFormat = (row: HxPersonTableColumns) => {
  return proxy.selectDictLabel(hx_status.value, row.status);
}

// 多选框选中数据
const handleSelectionChange = (selection: Array<HxPersonInfoData>) => {
  state.ids = selection.map(item => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}

const handleAdd = () => {
  editRef.value.openDialog()
}

const handleUpdate = (row: HxPersonTableColumns | null) => {
  if (!row) {
    row = state.tableData.data.find((item: HxPersonTableColumns) => {
      return item.id === state.ids[0]
    }) as HxPersonTableColumns
  }
  editRef.value.openDialog(toRaw(row));
};

const handleDelete = (row: HxPersonTableColumns | null) => {
  let msg = '你确定要删除所选数据？';
  let id: number[] = [];
  if (row) {
    msg = `此操作将永久删除数据，是否继续?`
    id = [row.id]
  } else {
    id = state.ids
  }
  if (id.length === 0) {
    ElMessage.error('请选择要删除的数据。');
    return
  }
  ElMessageBox.confirm(msg, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      delHxPerson(id).then(() => {
        ElMessage.success('删除成功');
        hxPersonList();
      })
    })
    .catch(() => { });
}

const handleView = (row: HxPersonTableColumns) => {
  detailRef.value.openDialog(toRaw(row));
}

// 导出excel
const handleExport = () => {
  downLoadXml('/api/v1/hx/hxPerson/export', state.tableData.param, 'get')
}

const handleImport = () => {
  loadExcelHxzhdjRef.value.open()
}

// 解析 specialTags 用于列表展示
const parseTags = (specialTags: string): string[] => {
  return parseSpecialTags(specialTags)
}
</script>
<style lang="scss" scoped>
.colBlock {
  display: block;
}
.colNone {
  display: none;
}
.ml-2 { margin: 3px; }
</style>

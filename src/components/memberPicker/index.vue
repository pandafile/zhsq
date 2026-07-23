<template>
  <div class="member-picker">
    <el-input
      v-model="displayName"
      :placeholder="placeholder"
      readonly
      clearable
      @click="openDialog"
      @clear="handleClear"
      class="member-picker-input"
    >
      <template #append>
        <el-button @click.stop="openDialog">选择</el-button>
      </template>
    </el-input>

    <el-dialog v-model="visible" title="选择党员" width="70%" append-to-body top="5vh" :close-on-click-modal="false">
      <div class="member-picker-dialog">
        <el-form :inline="true" class="member-picker-search">
          <el-form-item label="关键字">
            <el-input
              v-model="searchKeyword"
              placeholder="姓名/手机号"
              clearable
              style="width: 260px"
              @keyup.enter="searchMemberList"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchMemberList">
              <el-icon><ele-Search /></el-icon>搜索
            </el-button>
            <el-button @click="resetSearch">
              <el-icon><ele-Refresh /></el-icon>重置
            </el-button>
          </el-form-item>
        </el-form>

        <el-table
          ref="tableRef"
          :data="tableData.data"
          v-loading="loading"
          @row-click="handleRowClick"
          highlight-current-row
          border
          style="width: 100%;"
          :row-class-name="getRowClassName"
        >
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column label="姓名" min-width="120">
            <template #default="scope">
              {{ scope.row.personName || scope.row.name || `党员${scope.row.id}` }}
            </template>
          </el-table-column>
          <el-table-column label="所属组织" min-width="160">
            <template #default="scope">
              {{ scope.row.orgName || '-' }}
            </template>
          </el-table-column>
          <el-table-column label="党员状态" width="100" align="center">
            <template #default="scope">
              {{ formatPartyStatus(scope.row.partyStatus) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template #default="scope">
              <el-button type="primary" link @click="handleRowClick(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="tableData.total > 0"
          :total="tableData.total"
          v-model:page="tableData.param.pageNum"
          v-model:limit="tableData.param.pageSize"
          @pagination="searchMemberList"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { listHxPartyMember, getHxPartyMember } from '/@/api/hx/hxPartyMember';
import Pagination from '/@/components/pagination/index.vue';

interface MemberInfo {
  id: number;
  personId?: number;
  personName?: string;
  name?: string;
  orgName?: string;
  partyStatus?: number;
  [key: string]: any;
}

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: '请选择党员',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void;
  (e: 'change', value: number | undefined, row: MemberInfo | null): void;
}>();

const visible = ref(false);
const loading = ref(false);
const displayName = ref('');
const searchKeyword = ref('');
const tableRef = ref();

const tableData = reactive({
  data: [] as MemberInfo[],
  total: 0,
  param: {
    pageNum: 1,
    pageSize: 10,
    personName: undefined as string | undefined,
  },
});

// 加载显示名称
const loadDisplayName = async (id: number | undefined) => {
  if (!id) {
    displayName.value = '';
    return;
  }
  try {
    const res = await getHxPartyMember(id);
    const data = res.data;
    if (data) {
      displayName.value = data.personName || data.name || `党员${data.id}`;
    }
  } catch {
    displayName.value = '';
  }
};

// 监听 modelValue
watch(() => props.modelValue, (newVal) => {
  loadDisplayName(newVal);
}, { immediate: true });

// 格式化党员状态
const formatPartyStatus = (status: number | undefined) => {
  if (status === undefined || status === null) return '-';
  const statusMap: Record<number, string> = {
    0: '非党员',
    1: '正式党员',
    2: '预备党员',
  };
  return statusMap[status] || '未知';
};

// 行样式
const getRowClassName = ({ row }: { row: MemberInfo }) => {
  return row.id === props.modelValue ? 'current-row' : '';
};

// 打开弹窗
const openDialog = () => {
  visible.value = true;
  searchMemberList();
};

// 搜索党员
const searchMemberList = async () => {
  loading.value = true;
  const keyword = searchKeyword.value?.trim();
  const params: any = {
    pageNum: tableData.param.pageNum,
    pageSize: tableData.param.pageSize,
  };
  if (keyword) {
    params.personName = keyword;
  }
  try {
    const res = await listHxPartyMember(params);
    const list = res.data.list ?? [];
    tableData.total = res.data.total ?? 0;
    tableData.data = list;
  } catch (e) {
    console.error('搜索党员失败:', e);
    ElMessage.error('搜索党员失败');
  } finally {
    loading.value = false;
  }
};

// 重置
const resetSearch = () => {
  searchKeyword.value = '';
  tableData.param.pageNum = 1;
  tableData.param.pageSize = 10;
  searchMemberList();
};

// 行点击选择
const handleRowClick = (row: MemberInfo) => {
  displayName.value = row.personName || row.name || `党员${row.id}`;
  emit('update:modelValue', row.id);
  emit('change', row.id, row);
  visible.value = false;
};

// 清除
const handleClear = () => {
  displayName.value = '';
  emit('update:modelValue', undefined);
  emit('change', undefined, null);
};
</script>

<style scoped>
.member-picker {
  display: inline-block;
  width: 100%;
}
.member-picker-input {
  cursor: pointer;
}
.member-picker-dialog {
  min-height: 400px;
}
.member-picker-search {
  margin-bottom: 15px;
}
:deep(.el-table .current-row) {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}
</style>

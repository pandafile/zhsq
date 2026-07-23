<template>
  <div class="community-picker">
    <el-input
      v-model="displayName"
      :placeholder="placeholder"
      readonly
      clearable
      @click="openDialog"
      @clear="handleClear"
      class="community-picker-input"
    >
      <template #append>
        <el-button @click.stop="openDialog">选择</el-button>
      </template>
    </el-input>

    <el-dialog v-model="visible" title="选择小区" width="70%" append-to-body top="5vh" :close-on-click-modal="false">
      <div class="community-picker-dialog">
        <el-form :inline="true" class="community-picker-search">
          <el-form-item label="小区名称">
            <el-input
              v-model="searchKeyword"
              placeholder="请输入小区名称"
              clearable
              style="width: 260px"
              @keyup.enter="searchCommunityList"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchCommunityList">
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
          <el-table-column label="小区名称" min-width="200">
            <template #default="scope">
              {{ scope.row.communityName || scope.row.name || `小区${scope.row.id}` }}
            </template>
          </el-table-column>
          <el-table-column label="小区地址" prop="address" min-width="240" show-overflow-tooltip />
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
          @pagination="searchCommunityList"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { listHxCommunity, getHxCommunity } from '/@/api/hx/hxCommunity';
import Pagination from '/@/components/pagination/index.vue';

interface CommunityInfo {
  id: number;
  communityName?: string;
  name?: string;
  address?: string;
  [key: string]: any;
}

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: '请选择小区',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void;
  (e: 'change', value: number | undefined, row: CommunityInfo | null): void;
}>();

const visible = ref(false);
const loading = ref(false);
const displayName = ref('');
const searchKeyword = ref('');
const tableRef = ref();

const tableData = reactive({
  data: [] as CommunityInfo[],
  total: 0,
  param: {
    pageNum: 1,
    pageSize: 10,
    communityName: undefined as string | undefined,
  },
});

// 加载显示名称
const loadDisplayName = async (id: number | undefined) => {
  if (!id) {
    displayName.value = '';
    return;
  }
  try {
    const res = await getHxCommunity(id);
    const data = res.data;
    if (data) {
      displayName.value = data.communityName || data.name || `小区${data.id}`;
    }
  } catch {
    displayName.value = '';
  }
};

// 监听 modelValue
watch(() => props.modelValue, (newVal) => {
  loadDisplayName(newVal);
}, { immediate: true });

// 行样式
const getRowClassName = ({ row }: { row: CommunityInfo }) => {
  return row.id === props.modelValue ? 'current-row' : '';
};

// 打开弹窗
const openDialog = () => {
  visible.value = true;
  searchCommunityList();
};

// 搜索小区
const searchCommunityList = async () => {
  loading.value = true;
  const keyword = searchKeyword.value?.trim();
  const params: any = {
    pageNum: tableData.param.pageNum,
    pageSize: tableData.param.pageSize,
  };
  if (keyword) {
    params.communityName = keyword;
  }
  try {
    const res = await listHxCommunity(params);
    const list = res.data.list ?? [];
    tableData.total = res.data.total ?? 0;
    tableData.data = list;
  } catch (e) {
    console.error('搜索小区失败:', e);
    ElMessage.error('搜索小区失败');
  } finally {
    loading.value = false;
  }
};

// 重置
const resetSearch = () => {
  searchKeyword.value = '';
  tableData.param.pageNum = 1;
  tableData.param.pageSize = 10;
  searchCommunityList();
};

// 行点击选择
const handleRowClick = (row: CommunityInfo) => {
  displayName.value = row.communityName || row.name || `小区${row.id}`;
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
.community-picker {
  display: inline-block;
  width: 100%;
}
.community-picker-input {
  cursor: pointer;
}
.community-picker-dialog {
  min-height: 400px;
}
.community-picker-search {
  margin-bottom: 15px;
}
:deep(.el-table .current-row) {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}
</style>
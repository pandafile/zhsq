<template>
  <div class="person-picker">
    <el-input
      v-model="displayName"
      :placeholder="placeholder"
      readonly
      clearable
      @click="openDialog"
      @clear="handleClear"
      class="person-picker-input"
    >
      <template #append>
        <el-button @click.stop="openDialog">选择</el-button>
      </template>
    </el-input>

    <el-dialog v-model="visible" title="选择人员" width="70%" append-to-body top="5vh" :close-on-click-modal="false">
      <div class="person-picker-dialog">
        <el-form :inline="true" class="person-picker-search">
          <el-form-item label="姓名">
            <el-input
              v-model="searchKeyword"
              placeholder="请输入姓名"
              clearable
              style="width: 260px"
              @keyup.enter="searchPersonList"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPersonList">
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
          <el-table-column label="姓名" prop="name" min-width="120" />
          <el-table-column label="手机号" prop="phone" min-width="140" />
          <el-table-column label="身份证号" prop="idCard" min-width="200" />
          <el-table-column label="性别" prop="gender" width="80" align="center">
            <template #default="scope">
              {{ formatGender(scope.row.gender) }}
            </template>
          </el-table-column>
          <el-table-column label="房号" min-width="120">
            <template #default="scope">
              {{ scope.row.linkedHxPersonHxRoom?.roomNo || scope.row.linkedRoomId?.roomNo || '-' }}
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
          @pagination="searchPersonList"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, watch, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { listHxPerson, getHxPerson } from '/@/api/hx/hxPerson';
import Pagination from '/@/components/pagination/index.vue';

interface PersonInfo {
  id: number;
  name: string;
  phone?: string;
  idCard?: string;
  gender?: number;
  linkedHxPersonHxRoom?: { roomNo?: string };
  linkedRoomId?: { roomNo?: string };
}

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: '请选择人员',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | undefined): void;
  (e: 'change', value: number | undefined, row: PersonInfo | null): void;
}>();

const visible = ref(false);
const loading = ref(false);
const displayName = ref('');
const searchKeyword = ref('');
const tableRef = ref();

const tableData = reactive({
  data: [] as PersonInfo[],
  total: 0,
  param: {
    pageNum: 1,
    pageSize: 10,
    name: undefined as string | undefined,
    phone: undefined as string | undefined,
    idCard: undefined as string | undefined,
  },
});

// 加载显示名称
const loadDisplayName = async (id: number | undefined) => {
  if (!id) {
    displayName.value = '';
    return;
  }
  try {
    const res = await getHxPerson(id);
    const data = res.data;
    if (data) {
      displayName.value = data.name || `人员${data.id}`;
    }
  } catch {
    displayName.value = '';
  }
};

// 监听 modelValue 变化，更新显示名称
watch(() => props.modelValue, (newVal) => {
  loadDisplayName(newVal);
}, { immediate: true });

// 格式化性别
const formatGender = (gender: number | undefined) => {
  if (gender === undefined || gender === null) return '-';
  const genderMap: Record<number, string> = {
    0: '未知',
    1: '男',
    2: '女',
  };
  return genderMap[gender] || '未知';
};

// 获取行样式
const getRowClassName = ({ row }: { row: PersonInfo }) => {
  return row.id === props.modelValue ? 'current-row' : '';
};

// 打开弹窗并加载数据
const openDialog = () => {
  visible.value = true;
  searchPersonList();
};

// 搜索人员
const searchPersonList = async () => {
  loading.value = true;
  const keyword = searchKeyword.value?.trim();
  const params: any = {
    pageNum: tableData.param.pageNum,
    pageSize: tableData.param.pageSize,
  };
  // 后端 list 接口按字段精确匹配，AND 拼接所有非空字段
  // 因此只能用一个字段，避免 name/phone/idCard 同时传同一个值导致查询为空
  if (keyword) {
    params.name = keyword;
  }
  try {
    const res = await listHxPerson(params);
    const list = res.data.list ?? [];
    tableData.total = res.data.total ?? 0;
    tableData.data = list;
  } catch (e) {
    console.error('搜索人员失败:', e);
    ElMessage.error('搜索人员失败');
  } finally {
    loading.value = false;
  }
};

// 重置搜索
const resetSearch = () => {
  searchKeyword.value = '';
  tableData.param.pageNum = 1;
  tableData.param.pageSize = 10;
  searchPersonList();
};

// 行点击选择
const handleRowClick = (row: PersonInfo) => {
  displayName.value = row.name || `人员${row.id}`;
  emit('update:modelValue', row.id);
  emit('change', row.id, row);
  visible.value = false;
};

// 清除选择
const handleClear = () => {
  displayName.value = '';
  emit('update:modelValue', undefined);
  emit('change', undefined, null);
};
</script>

<style scoped>
.person-picker {
  display: inline-block;
  width: 100%;
}
.person-picker-input {
  cursor: pointer;
}
.person-picker-dialog {
  min-height: 400px;
}
.person-picker-search {
  margin-bottom: 15px;
}
:deep(.el-table .current-row) {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}
</style>

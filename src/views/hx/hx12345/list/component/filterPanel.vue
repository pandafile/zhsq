<template>
  <div class="hx-filter-panel">
    <el-card shadow="never" class="filter-card">
      <div class="filter-title">
        <el-icon><ele-Filter /></el-icon>
        <span>过滤筛选</span>
        <el-button
          v-if="hasFilter"
          type="primary"
          link
          size="small"
          @click="resetFilter"
        >清空筛选</el-button>
      </div>
      <el-form label-width="80px" class="filter-form">
        <el-form-item label="小区">
          <el-radio-group v-model="localFilter.communityId" @change="onChange">
            <el-radio :label="undefined">不限</el-radio>
            <el-radio
                v-for="item in communityIdOptions"
                :key="item.key"
                :label="item.key"
            >{{ item.value }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="办理人员">
          <el-radio-group v-model="localFilter.handlePerson" @change="onChange">
            <el-radio :label="undefined">不限</el-radio>
            <el-radio
                v-for="dict in WokerList"
                :key="dict.value"
                :label="dict.value"
            >{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="事项状态">
          <el-radio-group v-model="localFilter.itemStatus" @change="onChange">
            <el-radio :label="undefined">不限</el-radio>
            <el-radio
                v-for="dict in WorkType"
                :key="dict.value"
                :label="dict.value"
            >{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ItemOptions } from "/@/api/items";

interface FilterModel {
  communityId: number | undefined | string;
  handlePerson: string | undefined;
  itemStatus: string | undefined;
}

const props = defineProps<{
  modelValue: FilterModel;
  communityIdOptions: Array<ItemOptions>;
  WokerList: Array<{ value: string; label: string }>;
  WorkType: Array<{ value: string; label: string }>;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: FilterModel): void;
  (e: 'change', val: FilterModel): void;
}>();

// 本地过滤值
const localFilter = ref<FilterModel>({
  communityId: props.modelValue?.communityId,
  handlePerson: props.modelValue?.handlePerson,
  itemStatus: props.modelValue?.itemStatus,
});



// 父组件外部值变化时同步
watch(
  () => props.modelValue,
  (val) => {

    localFilter.value = {
      communityId: val?.communityId,
      handlePerson: val?.handlePerson,
      itemStatus: val?.itemStatus,
    };
  },
  { deep: true }
);

const hasFilter = computed(() => {
  return (
    localFilter.value.communityId !== undefined ||
    localFilter.value.handlePerson !== undefined ||
    localFilter.value.itemStatus !== undefined
  );
});

const onChange = () => {
  emit('update:modelValue', { ...localFilter.value });
  emit('change', { ...localFilter.value });
};

const resetFilter = () => {
  localFilter.value = {
    communityId: undefined,
    handlePerson: undefined,
    itemStatus: undefined,
  };
  emit('update:modelValue', { ...localFilter.value });
  emit('change', { ...localFilter.value });
};
</script>

<style lang="scss" scoped>
.hx-filter-panel {
  margin-bottom: 12px;

  .filter-card {
    background: #f5f7fa;
    border: 1px dashed #dcdfe6;
  }

  .filter-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ebeef5;
  }

  .filter-form {
    display: flex;
    flex-direction: column;
    gap: 4px;

    :deep(.el-form-item) {
      display: flex;
      margin-bottom: 4px;
      margin-right: 0;
      align-items: flex-start;

      .el-form-item__label {
        width: 80px;
        text-align: right;
        padding-right: 12px;
        line-height: 28px;
        flex-shrink: 0;
      }

      .el-form-item__content {
        flex: 1;
        line-height: 28px;
      }
    }
  }
}
</style>

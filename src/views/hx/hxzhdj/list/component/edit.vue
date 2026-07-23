<template>
  <div class="hx-hxzhdj-edit">
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.hx-hxzhdj-edit .el-dialog', '.hx-hxzhdj-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'党员/特殊人员信息'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select filterable clearable v-model="formData.gender" placeholder="请选择性别">
            <el-option
              v-for="dict in genderOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋地址" prop="roomId">
          <el-cascader
            v-model="formData.roomId"
            :props="{ label:'label', value:'id', children:'children', lazy: true, lazyLoad: cascadeLoad, checkStrictly: true, emitPath: false }"
            placeholder="请选择房屋地址"
            filterable
            clearable
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="formData.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="居住类型" prop="persontype">
          <el-select filterable clearable v-model="formData.persontype" placeholder="请选择居住类型">
            <el-option
              v-for="dict in persontypeOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker clearable style="width: 200px"
            v-model="formData.birthday"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="formData.nation" placeholder="请输入民族" />
        </el-form-item>
        <el-form-item label="身份标签" prop="specialTags">
          <el-checkbox-group v-model="selectedTags">
            <el-checkbox v-for="tag in partyIdentityTags" :key="tag" :label="tag" :value="tag" />
          </el-checkbox-group>
          <div v-if="selectedTags.length === 0" style="color:#999;font-size:12px;margin-top:4px;">请勾选该人员的党员/特殊身份标签</div>
        </el-form-item>
        <el-form-item label="基础信息" prop="basicInfo">
          <el-input v-model="formData.basicInfo" type="textarea" placeholder="请输入基础信息" />
        </el-form-item>
        <el-form-item label="健康信息" prop="healthInfo">
          <el-input v-model="formData.healthInfo" type="textarea" placeholder="请输入健康信息" />
        </el-form-item>
        <el-form-item label="家庭信息" prop="familyInfo">
          <el-input v-model="formData.familyInfo" type="textarea" placeholder="请输入家庭信息" />
        </el-form-item>
        <el-form-item label="社保信息" prop="socialInfo">
          <el-input v-model="formData.socialInfo" type="textarea" placeholder="请输入社保信息" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入备注" />
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
import { reactive, toRefs, ref, unref, getCurrentInstance, computed, watch } from 'vue';
import { ElMessageBox, ElMessage, FormInstance, UploadProps } from 'element-plus';
import {
  listHxPerson,
  getHxPerson,
  delHxPerson,
  addHxPerson,
  updateHxPerson,
} from "/@/api/hx/hxPerson";
import { listHxCommunity } from "/@/api/hx/hxCommunity";
import { listHxBuilding } from "/@/api/hx/hxBuilding";
import { listHxRoom } from "/@/api/hx/hxRoom";
import {
  HxPersonTableColumns,
  HxPersonInfoData,
  HxPersonTableDataState,
  HxPersonEditState,
} from "/@/views/hx/hxPerson/list/component/model"
import {
  partyIdentityTags,
  parseSpecialTags,
  stringifyTags,
} from "/@/views/hx/hxzhdj/list/component/model"
defineOptions({ name: "ApiV1HxHxzhdjEdit" })
const emit = defineEmits(['hxPersonList'])
const props = defineProps({
  genderOptions: {
    type: Array,
    default: () => []
  },
  roomIdOptions: {
    type: Array,
    default: () => []
  },
  persontypeOptions: {
    type: Array,
    default: () => []
  },
  statusOptions: {
    type: Array,
    default: () => []
  },
})
const { proxy } = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const menuRef = ref();
// 标签多选绑定（与 formData.specialTags 联动）
const selectedTags = ref<string[]>([])

const state = reactive<HxPersonEditState>({
  loading: false,
  isShowDialog: false,
  formData: {
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
    remark: undefined,
    status: undefined,
    createdBy: undefined,
    createdAt: undefined,
    updatedBy: undefined,
    updatedAt: undefined,
    linkedHxPersonHxRoom: {
      id: undefined,
      roomNo: undefined,
    },
  },
  rules: {},
});
const { loading, isShowDialog, formData, rules } = toRefs(state);

// 当 formData.specialTags 变化时，同步到 selectedTags
watch(() => state.formData.specialTags, (val) => {
  if (val) {
    selectedTags.value = parseSpecialTags(val)
  } else {
    selectedTags.value = []
  }
})
// 当 selectedTags 变化时，同步到 formData.specialTags
watch(selectedTags, (tags) => {
  state.formData.specialTags = stringifyTags(tags)
})

// 打开弹窗
const openDialog = (row?: HxPersonInfoData) => {
  resetForm();
  if (row) {
    getHxPerson(row.id!).then((res: any) => {
      const data = res.data;
      data.gender = '' + data.gender
      data.roomId = '' + data.roomId
      data.persontype = '' + data.persontype
      data.status = '' + data.status
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
      // 提交前确保 specialTags 是最新的
      state.formData.specialTags = stringifyTags(selectedTags.value)
      if (!state.formData.id || state.formData.id === 0) {
        addHxPerson(state.formData).then(() => {
          ElMessage.success('添加成功');
          closeDialog();
          emit('hxPersonList')
        }).finally(() => {
          state.loading = false;
        })
      } else {
        updateHxPerson(state.formData).then(() => {
          ElMessage.success('修改成功');
          closeDialog();
          emit('hxPersonList')
        }).finally(() => {
          state.loading = false;
        })
      }
    }
  });
};
const resetForm = () => {
  selectedTags.value = []
  state.formData = {
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
    remark: undefined,
    status: '',
    createdBy: undefined,
    createdAt: undefined,
    updatedBy: undefined,
    updatedAt: undefined,
    linkedHxPersonHxRoom: {
      id: undefined,
      roomNo: undefined,
    },
  }
};
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
</script>
<style scoped>
.kv-label { margin-bottom: 15px; font-size: 14px; }
.mini-btn i.el-icon { margin: unset; }
.kv-row { margin-bottom: 12px; }
</style>

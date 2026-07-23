<template>
  <div class="hx-hxPartyEvaluation-container">
    <el-card shadow="hover">
        <div class="hx-card-header">
          <span class="hx-card-header__bar"></span>
          <span class="hx-card-header__title">民主评议管理</span>
        </div>
        <div class="hx-hxPartyEvaluation-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="序号" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入序号"
                        clearable                        
                        @keyup.enter.native="hxPartyEvaluationList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="评议标题" prop="evaluationTitle">
                    <el-input
                        v-model="tableData.param.evaluationTitle"
                        placeholder="请输入评议标题"
                        clearable                        
                        @keyup.enter.native="hxPartyEvaluationList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyEvaluationList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="评议类型" prop="evaluationType">
                    <el-select filterable v-model="tableData.param.evaluationType" placeholder="请选择评议类型" clearable style="width:200px;">
                        <el-option
                            v-for="dict in evaluation_type"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="被评议人" prop="targetMemberId">
                    <el-select filterable remote :remote-method="searchMember" v-model="tableData.param.targetMemberId" placeholder="搜索党员" clearable style="width:200px;">
                        <el-option
                            v-for="item in memberOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
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
                  <el-form-item label="所属组织" prop="orgId">
                    <el-tree-select
                      v-model="tableData.param.orgId"
                      :data="treeOptions"
                      :props="{ label: 'orgName', value: 'id', children: 'children' }"
                      placeholder="请选择所属组织"
                      check-strictly
                      clearable
                      filterable
                      style="width: 200px;"
                    />
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="评议人" prop="evaluatorId">
                    <el-select filterable remote :remote-method="searchMember" v-model="tableData.param.evaluatorId" placeholder="搜索党员" clearable style="width:200px;">
                        <el-option
                            v-for="item in memberOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="评议人类型" prop="evaluatorType">
                    <el-select filterable v-model="tableData.param.evaluatorType" placeholder="请选择评议人类型" clearable style="width:200px;">
                        <el-option
                            v-for="dict in evaluator_type"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="评定等级" prop="grade">
                    <el-select filterable v-model="tableData.param.grade" placeholder="请选择等级" clearable style="width:200px;">
                        <el-option label="优秀" value="优秀" />
                        <el-option label="合格" value="合格" />
                        <el-option label="基本合格" value="基本合格" />
                        <el-option label="不合格" value="不合格" />
                    </el-select>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyEvaluationList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                        {{ word }}
                        <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
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
                  v-auth="'api/v1/hx/hxPartyEvaluation/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxPartyEvaluation/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxPartyEvaluation/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="序号" align="center" prop="id"
            min-width="80px"            
             />          
          <el-table-column label="评议标题" align="center" prop="evaluationTitle"
            min-width="200px"            
             />          
          <el-table-column label="所属组织" align="center" prop="orgName"
            min-width="150px"            
             />          
          <el-table-column label="评议类型" align="center" prop="evaluationType" :formatter="evaluationTypeFormat"
            min-width="120px"            
             />          
          <el-table-column label="被评议人" align="center" prop="targetMemberName"
            min-width="120px"            
             />          
          <el-table-column label="评议人" align="center" prop="evaluatorName"
            min-width="120px"            
             />          
          <el-table-column label="评议人类型" align="center" prop="evaluatorType" :formatter="evaluatorTypeFormat"
            min-width="100px"            
             />          
          <el-table-column label="总得分" align="center" prop="scoreTotal"
            min-width="80px"            
             />          
          <el-table-column label="等级" align="center" prop="grade"
            min-width="80px"            
             />          
          <el-table-column label="评议日期" align="center" prop="evaluationDate"
            min-width="120px"            
             />          
          <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"
            min-width="80px"            
             />          
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="200px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleView(scope.row)"
                v-auth="'api/v1/hx/hxPartyEvaluation/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxPartyEvaluation/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxPartyEvaluation/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxPartyEvaluationList"
        />
    </el-card>
    <ApiV1HxHxPartyEvaluationEdit
       ref="editRef"       
       :statusOptions="hx_status"
       :evaluationTypeOptions="evaluation_type"
       :evaluatorTypeOptions="evaluator_type"
       :treeOptions="treeOptions"
       @hxPartyEvaluationList="hxPartyEvaluationList"
    ></ApiV1HxHxPartyEvaluationEdit>
    <ApiV1HxHxPartyEvaluationDetail
      ref="detailRef"      
      :statusOptions="hx_status"
      :evaluationTypeOptions="evaluation_type"
      :evaluatorTypeOptions="evaluator_type"
      @hxPartyEvaluationList="hxPartyEvaluationList"
    ></ApiV1HxHxPartyEvaluationDetail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxPartyEvaluation,
    getHxPartyEvaluation,
    delHxPartyEvaluation,
    addHxPartyEvaluation,
    updateHxPartyEvaluation,    
} from "/@/api/hx/hxPartyEvaluation";
import {
    HxPartyEvaluationTableColumns,
    HxPartyEvaluationInfoData,
    HxPartyEvaluationTableDataState,    
} from "/@/views/hx/hxdj/hxPartyEvaluation/list/component/model"
import ApiV1HxHxPartyEvaluationEdit from "/@/views/hx/hxdj/hxPartyEvaluation/list/component/edit.vue"
import ApiV1HxHxPartyEvaluationDetail from "/@/views/hx/hxdj/hxPartyEvaluation/list/component/detail.vue"
import { listHxPartyOrganization, getHxPartyOrganization } from "/@/api/hx/hxPartyOrganization"
import { listHxPartyMember, getHxPartyMember } from "/@/api/hx/hxPartyMember"
defineOptions({ name: "apiV1HxHxPartyEvaluationList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
// 党员下拉选项
const memberOptions = ref<{ label: string; value: number }[]>([])
// 树形组织选项
const treeOptions = ref<any[]>([])
const queryRef = ref()
const editRef = ref();
const detailRef = ref();
// 是否显示所有搜索选项
const showAll =  ref(false)
// 非单个禁用
const single = ref(true)
// 非多个禁用
const multiple =ref(true)
const word = computed(()=>{
    if(showAll.value === false) {
        return "展开搜索";
    } else {
        return "收起搜索";
    }
})
// 字典选项数据
const {    
    hx_status,
    evaluation_type,
    evaluator_type,
} = proxy.useDict(    
    'hx_status',
    'evaluation_type',
    'evaluator_type',
)
const state = reactive<HxPartyEvaluationTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            evaluationTitle: undefined,            
            orgId: undefined,            
            evaluationType: undefined,            
            targetMemberId: undefined,            
            evaluatorId: undefined,            
            evaluatorType: undefined,            
            grade: undefined,            
            status: undefined,            
            dateRange: []
        },
    },
});
const { tableData } = toRefs(state);
// 页面加载时
onMounted(() => {
    initTableData();
    loadTreeOptions();
});
// 初始化表格数据
const initTableData = () => {    
    hxPartyEvaluationList()
};
// 远程搜索党员
const searchMember = async (query: string) => {
  if (!query) {
    memberOptions.value = []
    return
  }
  try {
    const res = await listHxPartyMember({ pageNum: 1, pageSize: 20, personName: query })
    const list = res.data.list ?? []
    memberOptions.value = list.map((item: any) => ({
      label: item.personName || item.name || `党员${item.id}`,
      value: item.id
    }))
  } catch (e) {
    console.error('搜索党员失败:', e)
  }
}
// 加载树形组织选项
const loadTreeOptions = async () => {
  try {
    const res = await listHxPartyOrganization({ pageNum: 1, pageSize: 200 })
    const list = res.data.list ?? []
    treeOptions.value = list
  } catch (e) {
    console.error('获取组织列表失败:', e)
  }
}
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    hxPartyEvaluationList()
};
// 获取列表数据
const hxPartyEvaluationList = () => {
  loading.value = true
  listHxPartyEvaluation(state.tableData.param).then(async (res: any) => {
    const list = res.data.list ?? [];
    // 收集关联ID
    const uniqueOrgIds: number[] = [...new Set(list.map((item: any) => item.orgId).filter((id: number) => id))] as number[];
    const uniqueTargetIds: number[] = [...new Set(list.map((item: any) => item.targetMemberId).filter((id: number) => id))] as number[];
    const uniqueEvaluatorIds: number[] = [...new Set(list.map((item: any) => item.evaluatorId).filter((id: number) => id))] as number[];

    try {
      // 请求组织名称
      const orgMap: Record<number, string> = {};
      if (uniqueOrgIds.length > 0) {
        const orgResults = await Promise.all(
          uniqueOrgIds.map((id: number) => getHxPartyOrganization(id))
        );
        orgResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            orgMap[data.id] = data.orgName || `组织${data.id}`;
          }
        });
      }
      // 请求被评议人姓名
      const targetMap: Record<number, string> = {};
      if (uniqueTargetIds.length > 0) {
        const targetResults = await Promise.all(
          uniqueTargetIds.map((id: number) => getHxPartyMember(id))
        );
        targetResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            targetMap[data.id] = data.personName || data.name || `党员${data.id}`;
          }
        });
      }
      // 请求评议人姓名
      const evaluatorMap: Record<number, string> = {};
      if (uniqueEvaluatorIds.length > 0) {
        const evaluatorResults = await Promise.all(
          uniqueEvaluatorIds.map((id: number) => getHxPartyMember(id))
        );
        evaluatorResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            evaluatorMap[data.id] = data.personName || data.name || `党员${data.id}`;
          }
        });
      }
      // 填充名称
      list.forEach((item: any) => {
        item.orgName = orgMap[item.orgId] || `组织${item.orgId}`;
        item.targetMemberName = targetMap[item.targetMemberId] || `党员${item.targetMemberId}`;
        item.evaluatorName = evaluatorMap[item.evaluatorId] || `党员${item.evaluatorId}`;
      });
    } catch (e) {
      console.error('获取关联数据失败:', e);
    }

    state.tableData.data = list;
    state.tableData.total = res.data.total;
    loading.value = false
  })
};

const toggleSearch = () => {
    showAll.value = !showAll.value;
}
// 评议类型字典翻译
const evaluationTypeFormat = (row:HxPartyEvaluationTableColumns) => {
    return proxy.selectDictLabel(evaluation_type.value, row.evaluationType);
}
// 评议人类型字典翻译
const evaluatorTypeFormat = (row:HxPartyEvaluationTableColumns) => {
    return proxy.selectDictLabel(evaluator_type.value, row.evaluatorType);
}
// 状态字典翻译
const statusFormat = (row:HxPartyEvaluationTableColumns) => {
    return proxy.selectDictLabel(hx_status.value, row.status);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxPartyEvaluationInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxPartyEvaluationTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxPartyEvaluationTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxPartyEvaluationTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxPartyEvaluationTableColumns|null) => {
    let msg = '你确定要删除所选数据？';
    let id:number[] = [] ;
    if(row){
    msg = `此操作将永久删除数据，是否继续?`
    id = [row.id]
    }else{
    id = state.ids
    }
    if(id.length===0){
        ElMessage.error('请选择要删除的数据。');
        return
    }
    ElMessageBox.confirm(msg, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            delHxPartyEvaluation(id).then(()=>{
                ElMessage.success('删除成功');
                hxPartyEvaluationList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxPartyEvaluationTableColumns)=>{
    detailRef.value.openDialog(toRaw(row));
}
</script>
<style lang="scss" scoped>
    .colBlock {
        display: block;
    }
    .colNone {
        display: none;
    }
    .ml-2{margin: 3px;}
</style>

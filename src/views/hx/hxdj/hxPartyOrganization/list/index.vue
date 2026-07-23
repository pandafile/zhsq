<template>
  <div class="hx-hxPartyOrganization-container">
    <el-card shadow="hover">
        <div class="hx-card-header">
          <span class="hx-card-header__bar"></span>
          <span class="hx-card-header__title">组织架构管理</span>
        </div>
        <div class="hx-hxPartyOrganization-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="序号" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入序号"
                        clearable                        
                        @keyup.enter.native="hxPartyOrganizationList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="组织名称" prop="orgName">
                    <el-input
                        v-model="tableData.param.orgName"
                        placeholder="请输入组织名称"
                        clearable                        
                        @keyup.enter.native="hxPartyOrganizationList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyOrganizationList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="组织类型" prop="orgType">
                    <el-select filterable v-model="tableData.param.orgType" placeholder="请选择组织类型" clearable style="width:200px;">
                        <el-option
                            v-for="dict in org_type"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="所属小区" prop="communityId">
                    <el-select filterable remote :remote-method="searchCommunity" v-model="tableData.param.communityId" placeholder="搜索小区" clearable style="width:200px;">
                        <el-option
                            v-for="item in communityOptions"
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
                  <el-form-item label="上级组织" prop="parentId">
                    <el-tree-select
                      v-model="tableData.param.parentId"
                      :data="treeOptions"
                      :props="{ label: 'orgName', value: 'id', children: 'children' }"
                      placeholder="请选择上级组织"
                      check-strictly
                      clearable
                      filterable
                      style="width: 200px;"
                    />
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="书记" prop="secretaryId">
                    <el-select filterable remote :remote-method="searchPerson" v-model="tableData.param.secretaryId" placeholder="搜索人员" clearable style="width:200px;">
                        <el-option
                            v-for="item in personOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="排序" prop="sort">
                    <el-input
                        v-model="tableData.param.sort"
                        placeholder="请输入排序"
                        clearable                        
                        @keyup.enter.native="hxPartyOrganizationList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="备注" prop="remark">
                    <el-input
                        v-model="tableData.param.remark"
                        placeholder="请输入备注"
                        clearable                        
                        @keyup.enter.native="hxPartyOrganizationList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="创建时间" prop="createdAt">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.createdAt"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择创建时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyOrganizationList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  v-auth="'api/v1/hx/hxPartyOrganization/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxPartyOrganization/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxPartyOrganization/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>
                          
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="序号" align="center" prop="id"
            min-width="150px"            
             />          
          <el-table-column label="组织名称" align="center" prop="orgName"
            min-width="180px"            
             />          
          <el-table-column label="上级组织" align="center" prop="parentName"
            min-width="150px"            
             />          
          <el-table-column label="组织类型" align="center" prop="orgType" :formatter="orgTypeFormat"
            min-width="120px"            
             />          
          <el-table-column label="所属小区" align="center" prop="communityName"
            min-width="150px"            
             />          
          <el-table-column label="书记" align="center" prop="secretaryName"
            min-width="150px"            
             />          
          <el-table-column label="排序" align="center" prop="sort"
            min-width="100px"            
             />          
          <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"
            min-width="100px"            
             />          
          <el-table-column label="创建时间" align="center" prop="createdAt"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>        
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="200px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleView(scope.row)"
                v-auth="'api/v1/hx/hxPartyOrganization/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxPartyOrganization/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxPartyOrganization/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxPartyOrganizationList"
        />
    </el-card>
    <ApiV1HxHxPartyOrganizationEdit
       ref="editRef"       
       :statusOptions="hx_status"
       :orgTypeOptions="org_type"
       :treeOptions="treeOptions"
       @hxPartyOrganizationList="hxPartyOrganizationList"
    ></ApiV1HxHxPartyOrganizationEdit>
    <ApiV1HxHxPartyOrganizationDetail
      ref="detailRef"      
      :statusOptions="hx_status"
      :orgTypeOptions="org_type"
      @hxPartyOrganizationList="hxPartyOrganizationList"
    ></ApiV1HxHxPartyOrganizationDetail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxPartyOrganization,
    getHxPartyOrganization,
    delHxPartyOrganization,
    addHxPartyOrganization,
    updateHxPartyOrganization,    
} from "/@/api/hx/hxPartyOrganization";
import {
    HxPartyOrganizationTableColumns,
    HxPartyOrganizationInfoData,
    HxPartyOrganizationTableDataState,    
} from "/@/views/hx/hxdj/hxPartyOrganization/list/component/model"
import ApiV1HxHxPartyOrganizationEdit from "/@/views/hx/hxdj/hxPartyOrganization/list/component/edit.vue"
import ApiV1HxHxPartyOrganizationDetail from "/@/views/hx/hxdj/hxPartyOrganization/list/component/detail.vue"
import { listHxCommunity, getHxCommunity } from "/@/api/hx/hxCommunity"
import { listHxPerson, getHxPerson } from "/@/api/hx/hxPerson"
defineOptions({ name: "apiV1HxHxPartyOrganizationList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
// 小区下拉选项
const communityOptions = ref<{ label: string; value: number }[]>([])
// 人员下拉选项
const personOptions = ref<{ label: string; value: number }[]>([])
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
        //对文字进行处理
        return "展开搜索";
    } else {
        return "收起搜索";
    }
})
// 字典选项数据
const {    
    hx_status,
    org_type,
} = proxy.useDict(    
    'hx_status',
    'org_type',
)
const state = reactive<HxPartyOrganizationTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            orgName: undefined,            
            parentId: undefined,            
            orgType: undefined,            
            communityId: undefined,   
            secretaryId: undefined,
            sort: undefined,            
            remark: undefined,            
            status: undefined,            
            createdAt: undefined,            
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
    hxPartyOrganizationList()
};
// 远程搜索小区
const searchCommunity = async (query: string) => {
  if (!query) {
    communityOptions.value = []
    return
  }
  try {
    const res = await listHxCommunity({ pageNum: 1, pageSize: 20, communityName: query })
    const list = res.data.list ?? []
    communityOptions.value = list.map((item: any) => ({
      label: item.communityName || item.name || `小区${item.id}`,
      value: item.id
    }))
  } catch (e) {
    console.error('搜索小区失败:', e)
  }
}
// 远程搜索人员
const searchPerson = async (query: string) => {
  if (!query) {
    personOptions.value = []
    return
  }
  try {
    const res = await listHxPerson({ pageNum: 1, pageSize: 20, personName: query })
    const list = res.data.list ?? []
    personOptions.value = list.map((item: any) => ({
      label: item.personName || item.name || `人员${item.id}`,
      value: item.id
    }))
  } catch (e) {
    console.error('搜索人员失败:', e)
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
    hxPartyOrganizationList()
};
// 获取列表数据
const hxPartyOrganizationList = () => {
  loading.value = true
  listHxPartyOrganization(state.tableData.param).then(async (res: any) => {
    const list = res.data.list ?? [];

    // 收集所有唯一的 communityId
    const uniqueCommunityIds: number[] = [...new Set(list.map((item: any) => item.communityId).filter((id: number) => id))] as number[];
    // 收集所有唯一的 secretaryId
    const uniqueSecretaryIds: number[] = [...new Set(list.map((item: any) => item.secretaryId).filter((id: number) => id))] as number[];
    // 收集所有唯一的 parentId
    const uniqueParentIds: number[] = [...new Set(list.map((item: any) => item.parentId).filter((id: number) => id))] as number[];

    try {
      // 并行请求所有小区信息
      const communityMap: Record<number, string> = {};
      if (uniqueCommunityIds.length > 0) {
        const communityResults = await Promise.all(
          uniqueCommunityIds.map((id: number) => getHxCommunity(id))
        );
        communityResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            communityMap[data.id] = data.communityName || data.name || `小区${data.id}`;
          }
        });
      }

      // 并行请求所有人员信息
      const personMap: Record<number, string> = {};
      if (uniqueSecretaryIds.length > 0) {
        const personResults = await Promise.all(
          uniqueSecretaryIds.map((id: number) => getHxPerson(id))
        );
        personResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            personMap[data.id] = data.personName || data.name || `人员${data.id}`;
          }
        });
      }

      // 获取上级组织名称映射
      const parentMap: Record<number, string> = {};
      if (uniqueParentIds.length > 0) {
        const parentResults = await Promise.all(
          uniqueParentIds.map((id: number) => getHxPartyOrganization(id))
        );
        parentResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            parentMap[data.id] = data.orgName || `组织${data.id}`;
          }
        });
      }

      // 给列表每行赋值名称
      list.forEach((item: any) => {
        item.communityName = communityMap[item.communityId] || `小区${item.communityId}`;
        item.secretaryName = personMap[item.secretaryId] || `人员${item.secretaryId}`;
        item.parentName = parentMap[item.parentId] || (item.parentId === 0 ? '顶级' : `组织${item.parentId}`);
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
// 状态字典翻译
const statusFormat = (row:HxPartyOrganizationTableColumns) => {
    return proxy.selectDictLabel(hx_status.value, row.status);
}
// 组织类型字典翻译
const orgTypeFormat = (row:HxPartyOrganizationTableColumns) => {
    return proxy.selectDictLabel(org_type.value, row.orgType);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxPartyOrganizationInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxPartyOrganizationTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxPartyOrganizationTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxPartyOrganizationTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxPartyOrganizationTableColumns|null) => {
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
            delHxPartyOrganization(id).then(()=>{
                ElMessage.success('删除成功');
                hxPartyOrganizationList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxPartyOrganizationTableColumns)=>{
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

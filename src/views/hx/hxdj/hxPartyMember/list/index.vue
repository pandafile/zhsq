<template>
  <div class="hx-hxPartyMember-container">
    <el-card shadow="hover">
        <div class="hx-card-header">
          <span class="hx-card-header__bar"></span>
          <span class="hx-card-header__title">党员信息管理</span>
        </div>
        <div class="hx-hxPartyMember-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="序号" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入序号"
                        clearable                        
                        @keyup.enter.native="hxPartyMemberList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="人员" prop="personId">
                    <el-select filterable remote :remote-method="searchPerson" v-model="tableData.param.personId" placeholder="搜索人员" clearable style="width:200px;">
                        <el-option
                            v-for="item in personOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
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
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyMemberList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="党员状态" prop="partyStatus">
                    <el-select filterable v-model="tableData.param.partyStatus" placeholder="请选择党员状态" clearable style="width:200px;">
                        <el-option
                            v-for="dict in party_status"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="党内职务" prop="partyDuty">
                    <el-select filterable v-model="tableData.param.partyDuty" placeholder="请选择党内职务" clearable style="width:200px;">
                        <el-option
                            v-for="dict in party_duty"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="党员来源" prop="partySource">
                    <el-select filterable v-model="tableData.param.partySource" placeholder="请选择党员来源" clearable style="width:200px;">
                        <el-option
                            v-for="dict in party_source"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="文化程度" prop="partyEducation">
                    <el-input
                        v-model="tableData.param.partyEducation"
                        placeholder="请输入文化程度"
                        clearable                        
                        @keyup.enter.native="hxPartyMemberList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="入党日期" prop="joinPartyDate">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.joinPartyDate"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"                    
                        type="date"
                        placeholder="选择入党日期"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="转正日期" prop="becomeFormalDate">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.becomeFormalDate"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"                    
                        type="date"
                        placeholder="选择转正日期"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="备注" prop="remark">
                    <el-input
                        v-model="tableData.param.remark"
                        placeholder="请输入备注"
                        clearable                        
                        @keyup.enter.native="hxPartyMemberList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyMemberList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  v-auth="'api/v1/hx/hxPartyMember/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxPartyMember/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxPartyMember/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>
                          
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="序号" align="center" prop="id"
            min-width="150px"            
             />          
          <el-table-column label="人员" align="center" prop="personName"
            min-width="150px"            
             />          
          <el-table-column label="所属组织" align="center" prop="orgName"
            min-width="180px"            
             />          
          <el-table-column label="党员状态" align="center" prop="partyStatus" :formatter="partyStatusFormat"
            min-width="120px"            
             />          
          <el-table-column label="党内职务" align="center" prop="partyDuty" :formatter="partyDutyFormat"
            min-width="120px"            
             />          
          <el-table-column label="入党日期" align="center" prop="joinPartyDate"
            min-width="120px"            
             />          
          <el-table-column label="转正日期" align="center" prop="becomeFormalDate"
            min-width="120px"            
             />          
          <el-table-column label="党员来源" align="center" prop="partySource" :formatter="partySourceFormat"
            min-width="120px"            
             />          
          <el-table-column label="文化程度" align="center" prop="partyEducation"
            min-width="120px"            
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
                v-auth="'api/v1/hx/hxPartyMember/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxPartyMember/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxPartyMember/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxPartyMemberList"
        />
    </el-card>
    <ApiV1HxHxPartyMemberEdit
       ref="editRef"       
       :statusOptions="hx_status"
       :partyStatusOptions="party_status"
       :partyDutyOptions="party_duty"
       :partySourceOptions="party_source"
       :treeOptions="treeOptions"
       @hxPartyMemberList="hxPartyMemberList"
    ></ApiV1HxHxPartyMemberEdit>
    <ApiV1HxHxPartyMemberDetail
      ref="detailRef"      
      :statusOptions="hx_status"
      :partyStatusOptions="party_status"
      :partyDutyOptions="party_duty"
      :partySourceOptions="party_source"
      @hxPartyMemberList="hxPartyMemberList"
    ></ApiV1HxHxPartyMemberDetail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxPartyMember,
    getHxPartyMember,
    delHxPartyMember,
    addHxPartyMember,
    updateHxPartyMember,    
} from "/@/api/hx/hxPartyMember";
import {
    HxPartyMemberTableColumns,
    HxPartyMemberInfoData,
    HxPartyMemberTableDataState,    
} from "/@/views/hx/hxdj/hxPartyMember/list/component/model"
import ApiV1HxHxPartyMemberEdit from "/@/views/hx/hxdj/hxPartyMember/list/component/edit.vue"
import ApiV1HxHxPartyMemberDetail from "/@/views/hx/hxdj/hxPartyMember/list/component/detail.vue"
import { listHxPerson, getHxPerson } from "/@/api/hx/hxPerson"
import { listHxPartyOrganization, getHxPartyOrganization } from "/@/api/hx/hxPartyOrganization"
defineOptions({ name: "apiV1HxHxPartyMemberList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
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
    party_status,
    party_duty,
    party_source,
} = proxy.useDict(    
    'hx_status',
    'party_status',
    'party_duty',
    'party_source',
)
const state = reactive<HxPartyMemberTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            personId: undefined,            
            orgId: undefined,            
            partyStatus: undefined,            
            joinPartyDate: undefined,            
            becomeFormalDate: undefined,            
            partyDuty: undefined,            
            partyEducation: undefined,            
            partySource: undefined,            
            honors: undefined,            
            extraInfo: undefined,            
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
    hxPartyMemberList()
};
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
    hxPartyMemberList()
};
// 获取列表数据
const hxPartyMemberList = () => {
  loading.value = true
  listHxPartyMember(state.tableData.param).then(async (res: any) => {
    const list = res.data.list ?? [];

    // 收集所有唯一的 personId
    const uniquePersonIds: number[] = [...new Set(list.map((item: any) => item.personId).filter((id: number) => id))] as number[];
    // 收集所有唯一的 orgId
    const uniqueOrgIds: number[] = [...new Set(list.map((item: any) => item.orgId).filter((id: number) => id))] as number[];

    try {
      // 并行请求所有人员信息
      const personMap: Record<number, string> = {};
      if (uniquePersonIds.length > 0) {
        const personResults = await Promise.all(
          uniquePersonIds.map((id: number) => getHxPerson(id))
        );
        personResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            personMap[data.id] = data.personName || data.name || `人员${data.id}`;
          }
        });
      }

      // 并行请求所有组织信息
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

      // 给列表每行赋值名称
      list.forEach((item: any) => {
        item.personName = personMap[item.personId] || `人员${item.personId}`;
        item.orgName = orgMap[item.orgId] || `组织${item.orgId}`;
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
const statusFormat = (row:HxPartyMemberTableColumns) => {
    return proxy.selectDictLabel(hx_status.value, row.status);
}
// 党员状态字典翻译
const partyStatusFormat = (row:HxPartyMemberTableColumns) => {
    return proxy.selectDictLabel(party_status.value, row.partyStatus);
}
// 党内职务字典翻译
const partyDutyFormat = (row:HxPartyMemberTableColumns) => {
    return proxy.selectDictLabel(party_duty.value, row.partyDuty);
}
// 党员来源字典翻译
const partySourceFormat = (row:HxPartyMemberTableColumns) => {
    return proxy.selectDictLabel(party_source.value, row.partySource);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxPartyMemberInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxPartyMemberTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxPartyMemberTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxPartyMemberTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxPartyMemberTableColumns|null) => {
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
            delHxPartyMember(id).then(()=>{
                ElMessage.success('删除成功');
                hxPartyMemberList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxPartyMemberTableColumns)=>{
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

<template>
  <div class="hx-hxPartyActivity-container">
    <el-card shadow="hover">
        <div class="hx-card-header">
          <span class="hx-card-header__bar"></span>
          <span class="hx-card-header__title">党组织活动管理</span>
        </div>
        <div class="hx-hxPartyActivity-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="序号" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入序号"
                        clearable                        
                        @keyup.enter.native="hxPartyActivityList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="活动标题" prop="activityTitle">
                    <el-input
                        v-model="tableData.param.activityTitle"
                        placeholder="请输入活动标题"
                        clearable                        
                        @keyup.enter.native="hxPartyActivityList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyActivityList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="活动类型" prop="activityType">
                    <el-select filterable v-model="tableData.param.activityType" placeholder="请选择活动类型" clearable style="width:200px;">
                        <el-option
                            v-for="dict in activity_type"
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
                  <el-form-item label="状态" prop="status">
                    <el-select filterable v-model="tableData.param.status" placeholder="请选择状态" clearable style="width:200px;">
                        <el-option
                            v-for="dict in party_activity_status"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="组织人" prop="organizerId">
                    <el-select filterable remote :remote-method="searchPerson" v-model="tableData.param.organizerId" placeholder="搜索人员" clearable style="width:200px;">
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
                  <el-form-item label="活动地点" prop="location">
                    <el-input
                        v-model="tableData.param.location"
                        placeholder="请输入活动地点"
                        clearable                        
                        @keyup.enter.native="hxPartyActivityList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="开始时间" prop="startTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.startTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择开始时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.endTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择结束时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyActivityList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  v-auth="'api/v1/hx/hxPartyActivity/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxPartyActivity/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxPartyActivity/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>
                          
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="序号" align="center" prop="id"
            min-width="80px"            
             />          
          <el-table-column label="活动标题" align="center" prop="activityTitle"
            min-width="200px"            
             />          
          <el-table-column label="活动类型" align="center" prop="activityType" :formatter="activityTypeFormat"
            min-width="120px"            
             />          
          <el-table-column label="所属组织" align="center" prop="orgName"
            min-width="150px"            
             />          
          <el-table-column label="组织人" align="center" prop="organizerName"
            min-width="120px"            
             />          
          <el-table-column label="开始时间" align="center" prop="startTime"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.startTime, '{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>        
          <el-table-column label="结束时间" align="center" prop="endTime"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.endTime, '{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>        
          <el-table-column label="地点" align="center" prop="location"
            min-width="120px"            
             />          
          <el-table-column label="应到/实到" align="center" min-width="100px"            
             >
            <template #default="scope">
                <span>{{ scope.row.attendeeCount || 0 }}/{{ scope.row.actualCount || 0 }}</span>
            </template>
          </el-table-column>        
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
                v-auth="'api/v1/hx/hxPartyActivity/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxPartyActivity/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxPartyActivity/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxPartyActivityList"
        />
    </el-card>
    <ApiV1HxHxPartyActivityEdit
       ref="editRef"       
       :statusOptions="party_activity_status"
       :activityTypeOptions="activity_type"
       :treeOptions="treeOptions"
       @hxPartyActivityList="hxPartyActivityList"
    ></ApiV1HxHxPartyActivityEdit>
    <ApiV1HxHxPartyActivityDetail
      ref="detailRef"      
      :statusOptions="party_activity_status"
      :activityTypeOptions="activity_type"
      @hxPartyActivityList="hxPartyActivityList"
    ></ApiV1HxHxPartyActivityDetail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxPartyActivity,
    getHxPartyActivity,
    delHxPartyActivity,
    addHxPartyActivity,
    updateHxPartyActivity,    
} from "/@/api/hx/hxPartyActivity";
import {
    HxPartyActivityTableColumns,
    HxPartyActivityInfoData,
    HxPartyActivityTableDataState,    
} from "/@/views/hx/hxdj/hxPartyActivity/list/component/model"
import ApiV1HxHxPartyActivityEdit from "/@/views/hx/hxdj/hxPartyActivity/list/component/edit.vue"
import ApiV1HxHxPartyActivityDetail from "/@/views/hx/hxdj/hxPartyActivity/list/component/detail.vue"
import { listHxPerson, getHxPerson } from "/@/api/hx/hxPerson"
import { listHxPartyOrganization, getHxPartyOrganization } from "/@/api/hx/hxPartyOrganization"
defineOptions({ name: "apiV1HxHxPartyActivityList"})
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
        return "展开搜索";
    } else {
        return "收起搜索";
    }
})
// 字典选项数据
const {    
    hx_status,
    activity_type,
    party_activity_status,
} = proxy.useDict(    
    'hx_status',
    'activity_type',
    'party_activity_status',
)
const state = reactive<HxPartyActivityTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            activityTitle: undefined,            
            activityType: undefined,            
            orgId: undefined,   
            organizerId: undefined,
            startTime: undefined,            
            endTime: undefined,            
            location: undefined,            
            attendeeCount: undefined,            
            actualCount: undefined,            
            content: undefined,            
            summary: undefined,            
            attachmentUrls: undefined,            
            remark: undefined,            
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
    hxPartyActivityList()
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
    hxPartyActivityList()
};
// 获取列表数据
const hxPartyActivityList = () => {
  loading.value = true
  listHxPartyActivity(state.tableData.param).then(async (res: any) => {
    const list = res.data.list ?? [];
    // 收集关联ID
    const uniqueOrgIds: number[] = [...new Set(list.map((item: any) => item.orgId).filter((id: number) => id))] as number[];
    const uniquePersonIds: number[] = [...new Set(list.map((item: any) => item.organizerId).filter((id: number) => id))] as number[];

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
      // 请求人员姓名
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
      // 填充名称
      list.forEach((item: any) => {
        item.orgName = orgMap[item.orgId] || `组织${item.orgId}`;
        item.organizerName = personMap[item.organizerId] || `人员${item.organizerId}`;
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
// 活动类型字典翻译
const activityTypeFormat = (row:HxPartyActivityTableColumns) => {
    return proxy.selectDictLabel(activity_type.value, row.activityType);
}
// 状态字典翻译
const statusFormat = (row:HxPartyActivityTableColumns) => {
    return proxy.selectDictLabel(party_activity_status.value, row.status);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxPartyActivityInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxPartyActivityTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxPartyActivityTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxPartyActivityTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxPartyActivityTableColumns|null) => {
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
            delHxPartyActivity(id).then(()=>{
                ElMessage.success('删除成功');
                hxPartyActivityList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxPartyActivityTableColumns)=>{
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

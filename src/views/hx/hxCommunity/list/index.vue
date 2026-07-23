<template>
  <div class="hx-hxCommunity-container">
    <el-card shadow="hover">
        <div class="hx-card-header">
          <span class="hx-card-header__bar"></span>
          <span class="hx-card-header__title">小区管理</span>
        </div>
        <div class="hx-hxCommunity-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="主键ID" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入主键ID"
                        clearable                        
                        @keyup.enter.native="hxCommunityList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="小区名称" prop="communityName">
                    <el-input
                        v-model="tableData.param.communityName"
                        placeholder="请输入小区名称"
                        clearable                        
                        @keyup.enter.native="hxCommunityList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxCommunityList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="小区类型" prop="communityType">
                    <el-select filterable v-model="tableData.param.communityType" placeholder="请选择小区类型" clearable style="width:200px;">
                        <el-option
                            v-for="dict in hx_communityType"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="小区信息" prop="basicInfo">
                    <el-input
                        v-model="tableData.param.basicInfo"
                        placeholder="请输入小区信息"
                        clearable                        
                        @keyup.enter.native="hxCommunityList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="详细地址" prop="address">
                    <el-input
                        v-model="tableData.param.address"
                        placeholder="请输入详细地址"
                        clearable                        
                        @keyup.enter.native="hxCommunityList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="排序" prop="sort">
                    <el-input
                        v-model="tableData.param.sort"
                        placeholder="请输入排序"
                        clearable                        
                        @keyup.enter.native="hxCommunityList"
                    />                    
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
                    <el-button type="primary"  @click="hxCommunityList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  v-auth="'api/v1/hx/hxCommunity/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxCommunity/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxCommunity/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>            
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="主键ID" align="center" prop="id"
            min-width="150px"            
             />          
          <el-table-column label="小区名称" align="center" prop="communityName"
            min-width="150px"            
             />          
          <el-table-column label="小区类型" align="center" prop="communityType" :formatter="communityTypeFormat"
            min-width="150px"            
             />          
          <el-table-column label="小区信息" align="left" prop="basicInfo" min-width="280px">
            <template #default="scope">
              <div v-if="scope.row.basicInfo">
                <el-tag
                  v-for="(value, key) in parseJson(scope.row.basicInfo)"
                  :key="key"
                  size="small"
                  style="margin: 2px"
                >
                  {{ key }}: {{ value }}
                </el-tag> 
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>

          <el-table-column label="详细地址" align="center" prop="address"
            min-width="150px"            
             />          
          <el-table-column label="备注" align="center" prop="remark"
            min-width="150px"            
             />          
          <el-table-column label="排序" align="center" prop="sort"
            min-width="150px"            
             />          
          <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"
            min-width="150px"            
             />          
          <el-table-column label="创建人" align="center" prop="createdBy"
            min-width="150px"            
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
                v-auth="'api/v1/hx/hxCommunity/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxCommunity/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxCommunity/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxCommunityList"
        />
    </el-card>
    <ApiV1HxHxCommunityEdit
       ref="editRef"       
       :communityTypeOptions="hx_communityType"       
       :statusOptions="hx_status"       
       @hxCommunityList="hxCommunityList"
    ></ApiV1HxHxCommunityEdit>
    <ApiV1HxHxCommunityDetail
      ref="detailRef"      
      :communityTypeOptions="hx_communityType"      
      :statusOptions="hx_status"      
      @hxCommunityList="hxCommunityList"
    ></ApiV1HxHxCommunityDetail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxCommunity,
    getHxCommunity,
    delHxCommunity,
    addHxCommunity,
    updateHxCommunity,    
} from "/@/api/hx/hxCommunity";
import {
    HxCommunityTableColumns,
    HxCommunityInfoData,
    HxCommunityTableDataState,    
} from "/@/views/hx/hxCommunity/list/component/model"
import ApiV1HxHxCommunityEdit from "/@/views/hx/hxCommunity/list/component/edit.vue"
import ApiV1HxHxCommunityDetail from "/@/views/hx/hxCommunity/list/component/detail.vue"
defineOptions({ name: "apiV1HxHxCommunityList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
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
    hx_communityType,    
    hx_status,    
} = proxy.useDict(    
    'hx_communityType',    
    'hx_status',    
)
const state = reactive<HxCommunityTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            communityName: undefined,            
            communityType: undefined,            
            basicInfo: undefined,            
            address: undefined,            
            sort: undefined,            
            status: undefined,            
            createdBy: undefined,            
            createdAt: undefined,            
            dateRange: []
        },
    },
});
const { tableData } = toRefs(state);
// 页面加载时
onMounted(() => {
    initTableData();
});
// 初始化表格数据
const initTableData = () => {    
    hxCommunityList()
};
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    hxCommunityList()
};
// 获取列表数据
const hxCommunityList = ()=>{
  loading.value = true
  listHxCommunity(state.tableData.param).then((res:any)=>{
    let list = res.data.list??[];    
    list.map((item:any)=>{        
        item.createdBy = item.createdUser?.userNickname        
    })    
    state.tableData.data = list;
    state.tableData.total = res.data.total;
    loading.value = false
  })
};
const toggleSearch = () => {
    showAll.value = !showAll.value;
}
// 小区类型字典翻译
const communityTypeFormat = (row:HxCommunityTableColumns) => {
    return proxy.selectDictLabel(hx_communityType.value, row.communityType);
}
// 状态字典翻译
const statusFormat = (row:HxCommunityTableColumns) => {
    return proxy.selectDictLabel(hx_status.value, row.status);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxCommunityInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxCommunityTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxCommunityTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxCommunityTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxCommunityTableColumns|null) => {
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
            delHxCommunity(id).then(()=>{
                ElMessage.success('删除成功');
                hxCommunityList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxCommunityTableColumns)=>{
    detailRef.value.openDialog(toRaw(row));
}
const parseJson = (str: string): Record<string, any> => {
  if (!str) return {};
  try {
    const obj = typeof str === 'string' ? JSON.parse(str) : str;
    return typeof obj === 'object' ? obj : {};
  } catch {
    return {};
  }
};

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
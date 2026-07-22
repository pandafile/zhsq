<template>
  <div class="hx-hxFocusFollow-container">
    <el-card shadow="hover">
        <div class="hx-hxFocusFollow-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="主键ID" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入主键ID"
                        clearable                        
                        @keyup.enter.native="hxFocusFollowList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="重点问题ID" prop="caseid">
                    <el-input
                        v-model="tableData.param.caseid"
                        placeholder="请输入重点问题ID"
                        clearable                        
                        @keyup.enter.native="hxFocusFollowList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxFocusFollowList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="跟进时间" prop="followTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.followTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择跟进时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="跟进内容" prop="content">
                    <el-input
                        v-model="tableData.param.content"
                        placeholder="请输入跟进内容"
                        clearable                        
                        @keyup.enter.native="hxFocusFollowList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="诉求人意见" prop="feedbackContent">
                    <el-input
                        v-model="tableData.param.feedbackContent"
                        placeholder="请输入诉求人意见"
                        clearable                        
                        @keyup.enter.native="hxFocusFollowList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="经办人" prop="handler">
                    <el-select filterable v-model="tableData.param.handler" placeholder="请选择经办人" clearable style="width:200px;">
                        <el-option
                            v-for="dict in WokerList"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="记录图片" prop="attachImages">
                    <el-input
                        v-model="tableData.param.attachImages"
                        placeholder="请输入记录图片"
                        clearable                        
                        @keyup.enter.native="hxFocusFollowList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="下一步工作计划" prop="nextPlan">
                    <el-input
                        v-model="tableData.param.nextPlan"
                        placeholder="请输入下一步工作计划"
                        clearable                        
                        @keyup.enter.native="hxFocusFollowList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="办理进度" prop="followResult">
                    <el-select filterable v-model="tableData.param.followResult" placeholder="请选择办理进度" clearable style="width:200px;">
                        <el-option
                            v-for="dict in WorkType"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="创建时间" prop="createTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.createTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择创建时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxFocusFollowList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  v-auth="'api/v1/hx/hxFocusFollow/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxFocusFollow/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxFocusFollow/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>             
             <el-col :span="1.5">
                <el-button
                        type="warning"
                        @click="handleExport()"
                        v-auth="'api/v1/hx/hxFocusFollow/export'"
                ><el-icon><ele-Download /></el-icon>导出Excel</el-button>
             </el-col>            
                <el-col :span="1.5">
                    <el-button
                            type="success"
                            @click="handleImport()"
                            v-auth="'api/v1/hx/hxFocusFollow/import'"
                    ><el-icon><ele-Upload /></el-icon>导入Excel</el-button>
                </el-col>            
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="主键ID" align="center" prop="id"
            min-width="150px"            
             />          
          <el-table-column label="重点问题ID" align="center" prop="linkedCaseid.id"
            min-width="150px"            
             />          
          <el-table-column label="跟进时间" align="center" prop="followTime"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.followTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>          
          <el-table-column label="跟进内容" align="center" prop="content"
            min-width="150px"            
             />          
          <el-table-column label="诉求人意见" align="center" prop="feedbackContent"
            min-width="150px"            
             />          
          <el-table-column label="经办人" align="center" prop="handler" :formatter="handlerFormat"
            min-width="150px"            
             />          
          <el-table-column label="记录图片" align="center" prop="attachImages"
            min-width="150px"            
             />          
          <el-table-column label="下一步工作计划" align="center" prop="nextPlan"
            min-width="150px"            
             />          
          <el-table-column label="办理进度" align="center" prop="followResult" :formatter="followResultFormat"
            min-width="150px"            
             />          
          <el-table-column label="创建时间" align="center" prop="createTime"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>        
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="200px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleView(scope.row)"
                v-auth="'api/v1/hx/hxFocusFollow/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxFocusFollow/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxFocusFollow/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxFocusFollowList"
        />
    </el-card>
    <ApiV1HxHxFocusFollowEdit
       ref="editRef"       
       :caseidOptions="caseidOptions"       
       :handlerOptions="WokerList"       
       :followResultOptions="WorkType"       
       @hxFocusFollowList="hxFocusFollowList"
    ></ApiV1HxHxFocusFollowEdit>
    <ApiV1HxHxFocusFollowDetail
      ref="detailRef"      
      :caseidOptions="caseidOptions"      
      :handlerOptions="WokerList"      
      :followResultOptions="WorkType"      
      @hxFocusFollowList="hxFocusFollowList"
    ></ApiV1HxHxFocusFollowDetail>    
    <loadExcel ref="loadExcelHxFocusFollowRef" @getList="hxFocusFollowList"
               upUrl="api/v1/hx/hxFocusFollow/import"
               tplUrl="/api/v1/hx/hxFocusFollow/excelTemplate"></loadExcel>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxFocusFollow,
    getHxFocusFollow,
    delHxFocusFollow,
    addHxFocusFollow,
    updateHxFocusFollow,    
    linkedDataSearch    
} from "/@/api/hx/hxFocusFollow";
import {
    HxFocusFollowTableColumns,
    HxFocusFollowInfoData,
    HxFocusFollowTableDataState,    
    LinkedHxFocusFollowHxFocusCase,    
} from "/@/views/hx/hxFocusFollow/list/component/model"
import ApiV1HxHxFocusFollowEdit from "/@/views/hx/hxFocusFollow/list/component/edit.vue"
import ApiV1HxHxFocusFollowDetail from "/@/views/hx/hxFocusFollow/list/component/detail.vue"
import {downLoadXml} from "/@/utils/zipdownload";
import loadExcel from "/@/components/loadExcel/index.vue"
defineOptions({ name: "apiV1HxHxFocusFollowList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
const queryRef = ref()
const editRef = ref();
const detailRef = ref();
const loadExcelHxFocusFollowRef = ref();
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
    WokerList,    
    WorkType,    
} = proxy.useDict(    
    'WokerList',    
    'WorkType',    
)
// caseidOptions关联表数据
const caseidOptions = ref<Array<ItemOptions>>([])
const state = reactive<HxFocusFollowTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            caseid: undefined,            
            followTime: undefined,            
            content: undefined,            
            feedbackContent: undefined,            
            handler: undefined,            
            attachImages: undefined,            
            nextPlan: undefined,            
            followResult: undefined,            
            createTime: undefined,            
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
    linkedData()    
    hxFocusFollowList()
};
const linkedData = ()=>{
    linkedDataSearch().then((res:any)=>{        
        //关联hx_focus_case表选项        
        caseidOptions.value = proxy.setItems(res, 'id', 'id','linkedHxFocusFollowHxFocusCase')        
    })
}
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    hxFocusFollowList()
};
// 获取列表数据
const hxFocusFollowList = ()=>{
  loading.value = true
  listHxFocusFollow(state.tableData.param).then((res:any)=>{
    let list = res.data.list??[];    
    state.tableData.data = list;
    state.tableData.total = res.data.total;
    loading.value = false
  })
};
const toggleSearch = () => {
    showAll.value = !showAll.value;
}
// 经办人字典翻译
const handlerFormat = (row:HxFocusFollowTableColumns) => {
    return proxy.selectDictLabel(WokerList.value, row.handler);
}
// 办理进度字典翻译
const followResultFormat = (row:HxFocusFollowTableColumns) => {
    return proxy.selectDictLabel(WorkType.value, row.followResult);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxFocusFollowInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxFocusFollowTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxFocusFollowTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxFocusFollowTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxFocusFollowTableColumns|null) => {
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
            delHxFocusFollow(id).then(()=>{
                ElMessage.success('删除成功');
                hxFocusFollowList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxFocusFollowTableColumns)=>{
    detailRef.value.openDialog(toRaw(row));
}
//导出excel
const handleExport = ()=>{
    downLoadXml('/api/v1/hx/hxFocusFollow/export',state.tableData.param,'get')
}
const handleImport=()=>{
    loadExcelHxFocusFollowRef.value.open()
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
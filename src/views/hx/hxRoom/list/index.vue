<template>
  <div class="hx-hxRoom-container">
    <el-card shadow="hover">
        <div class="hx-hxRoom-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="主键ID" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入主键ID"
                        clearable                        
                        @keyup.enter.native="hxRoomList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="房号" prop="roomNo">
                    <el-input
                        v-model="tableData.param.roomNo"
                        placeholder="请输入房号"
                        clearable                        
                        @keyup.enter.native="hxRoomList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="小区/楼栋" prop="BuildingId">
                    <el-cascader
                      v-model="tableData.param.BuildingId"
                      placeholder="请选择小区和楼栋"
                      :props="{ label:'label', value:'id', children:'children', lazy: true, lazyLoad: cascadeLoad, checkStrictly: true, emitPath: false }"
                      filterable
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxRoomList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="面积(㎡)" prop="area">
                    <el-input
                        v-model="tableData.param.area"
                        placeholder="请输入面积(㎡)"
                        clearable                        
                        @keyup.enter.native="hxRoomList"
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
                    <el-button type="primary"  @click="hxRoomList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  v-auth="'api/v1/hx/hxRoom/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxRoom/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxRoom/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>             
             <el-col :span="1.5">
                <el-button
                        type="warning"
                        @click="handleExport()"
                        v-auth="'api/v1/hx/hxRoom/export'"
                ><el-icon><ele-Download /></el-icon>导出Excel</el-button>
             </el-col>            
                <el-col :span="1.5">
                    <el-button
                            type="success"
                            @click="handleImport()"
                            v-auth="'api/v1/hx/hxRoom/import'"
                    ><el-icon><ele-Upload /></el-icon>导入Excel</el-button>
                </el-col>            
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="主键ID" align="center" prop="id"
            min-width="150px"            
             />          
          <el-table-column label="房号" align="center" prop="roomNo"
            min-width="150px"            
             />          
          <el-table-column label="楼栋" align="center" prop="buildingName"
            min-width="150px"            
             />   
          <el-table-column label="面积(㎡)" align="center" prop="area"
            min-width="150px"            
             />          
<el-table-column label="房屋标签" align="left" prop="roomTags" min-width="200px">
    <template #default="scope">
        <div v-if="scope.row.roomTags">
            <el-tag
                    v-for="(value, key) in parseJson(scope.row.roomTags)"
                    :key="key"
                    size="small"
                    style="margin: 2px"
                    >
                {{ value }}
            </el-tag> 
        </div>
        <span v-else>-</span>
    </template>
</el-table-column>
          <el-table-column label="备注" align="center" prop="remark"
            min-width="150px"            
             />                
          <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"
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
                v-auth="'api/v1/hx/hxRoom/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxRoom/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxRoom/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxRoomList"
        />
    </el-card>
    <ApiV1HxHxRoomEdit
       ref="editRef"       
       :buildingIdOptions="buildingIdOptions"       
       :statusOptions="hx_status"       
       @hxRoomList="hxRoomList"
    ></ApiV1HxHxRoomEdit>
    <ApiV1HxHxRoomDetail
      ref="detailRef"      
      :buildingIdOptions="buildingIdOptions"      
      :statusOptions="hx_status"      
      @hxRoomList="hxRoomList"
    ></ApiV1HxHxRoomDetail>    
    <loadExcel ref="loadExcelHxRoomRef" @getList="hxRoomList"
               upUrl="api/v1/hx/hxRoom/import"
               tplUrl="/api/v1/hx/hxRoom/excelTemplate"></loadExcel>    
  </div>
</template>
<script setup lang="ts">
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxRoom,
    getHxRoom,
    delHxRoom,
    addHxRoom,
    updateHxRoom,        
} from "/@/api/hx/hxRoom";
import {listHxBuilding} from "/@/api/hx/hxBuilding";
import {listHxCommunity} from "/@/api/hx/hxCommunity";
import {
    HxRoomTableColumns,
    HxRoomInfoData,
    HxRoomTableDataState,        
} from "/@/views/hx/hxRoom/list/component/model"
import ApiV1HxHxRoomEdit from "/@/views/hx/hxRoom/list/component/edit.vue"
import ApiV1HxHxRoomDetail from "/@/views/hx/hxRoom/list/component/detail.vue"
import {downLoadXml} from "/@/utils/zipdownload";
import loadExcel from "/@/components/loadExcel/index.vue"
defineOptions({ name: "apiV1HxHxRoomList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
const queryRef = ref()
const editRef = ref();
const detailRef = ref();
const loadExcelHxRoomRef = ref();
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
} = proxy.useDict(    
    'hx_status',    
)
// buildingIdOptions关联表数据
const buildingIdOptions = ref<Array<any>>([])
const state = reactive<HxRoomTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            roomNo: undefined,
            BuildingId:undefined,          
            area: undefined,            
            roomTags: undefined,            
            isLeaf: undefined,            
            sort: undefined,            
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
});
// 初始化表格数据
const initTableData = () => {    
    linkedData()    
    hxRoomList()
};
const linkedData = ()=>{
    // 懒加载模式下不需要预填 options
}
// 级联懒加载：小区→楼栋
const cascadeLoad = (node: any, resolve: (nodes: any[]) => void) => {
  if (node.level === 0) {
    // 加载小区
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
    // 加载楼栋
    const communityId = node.data._communityId
    listHxBuilding({ pageSize: 9999, communityId }).then((res: any) => {
      const buildings = res?.data?.list ?? []
      resolve(buildings.map((b: any) => ({
        id: b.id,
        label: b.buildingName,
        isLeaf: true,
      })))
    }).catch(() => resolve([]))
  } else {
    resolve([])
  }
}
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    hxRoomList()
};
// 获取列表数据
const hxRoomList = ()=>{
  loading.value = true
  listHxRoom(state.tableData.param).then((res:any)=>{
    let list = res.data.list??[];    
    state.tableData.data = list;
    state.tableData.total = res.data.total;
    loading.value = false
  })
};
const toggleSearch = () => {
    showAll.value = !showAll.value;
}
// 状态字典翻译
const statusFormat = (row:HxRoomTableColumns) => {
    return proxy.selectDictLabel(hx_status.value, row.status);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxRoomInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxRoomTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxRoomTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxRoomTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxRoomTableColumns|null) => {
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
            delHxRoom(id).then(()=>{
                ElMessage.success('删除成功');
                hxRoomList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxRoomTableColumns)=>{
    detailRef.value.openDialog(toRaw(row));
}
//导出excel
const handleExport = ()=>{
    downLoadXml('/api/v1/hx/hxRoom/export',state.tableData.param,'get')
}
const handleImport=()=>{
    loadExcelHxRoomRef.value.open()
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
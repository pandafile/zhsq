<template>
  <div class="hx-hxBuilding-container">
    <el-card shadow="hover">
        <div class="hx-card-header">
          <span class="hx-card-header__bar"></span>
          <span class="hx-card-header__title">楼栋管理</span>
        </div>
        <div class="hx-hxBuilding-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="序号" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入序号"
                        clearable                        
                        @keyup.enter.native="hxBuildingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="楼栋名称" prop="buildingName">
                    <el-input
                        v-model="tableData.param.buildingName"
                        placeholder="请输入楼栋名称"
                        clearable                        
                        @keyup.enter.native="hxBuildingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxBuildingList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="单元数" prop="unitCount">
                    <el-input
                        v-model="tableData.param.unitCount"
                        placeholder="请输入单元数"
                        clearable                        
                        @keyup.enter.native="hxBuildingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="小区名称" prop="communityId">
                    <el-select filterable v-model="tableData.param.communityId" placeholder="请选择小区" clearable style="width:200px;">
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
                  <el-form-item label="楼层数" prop="floorCount">
                    <el-input
                        v-model="tableData.param.floorCount"
                        placeholder="请输入楼层数"
                        clearable                        
                        @keyup.enter.native="hxBuildingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="建造年份" prop="buildYear">
                    <el-select filterable v-model="tableData.param.buildYear" placeholder="请选择建造年份" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="物业公司" prop="propertyCompany">
                    <el-input
                        v-model="tableData.param.propertyCompany"
                        placeholder="请输入物业公司"
                        clearable                        
                        @keyup.enter.native="hxBuildingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="排序" prop="sort">
                    <el-input
                        v-model="tableData.param.sort"
                        placeholder="请输入排序"
                        clearable                        
                        @keyup.enter.native="hxBuildingList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="是否叶子节点：0-否（有下级） 1-是（无下级）" prop="isLeaf">
                    <el-input
                        v-model="tableData.param.isLeaf"
                        placeholder="请输入是否叶子节点：0-否（有下级） 1-是（无下级）"
                        clearable                        
                        @keyup.enter.native="hxBuildingList"
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
                    <el-button type="primary"  @click="hxBuildingList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  v-auth="'api/v1/hx/hxBuilding/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxBuilding/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxBuilding/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>
                          
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="序号" align="center" prop="id"
            min-width="150px"            
             />          
          <el-table-column label="楼栋名称" align="center" prop="buildingName"
            min-width="180px"            
             />          
          <el-table-column label="单元数" align="center" prop="unitCount"
            min-width="150px"            
             />          
          <el-table-column label="小区名称" align="center" prop="communityName"
            min-width="150px"            
             />          
          <el-table-column label="楼层数" align="center" prop="floorCount"
            min-width="150px"            
             />          
          <el-table-column label="建造年份" align="center" prop="buildYear"
            min-width="150px"            
             />          
          <el-table-column label="物业公司" align="center" prop="propertyCompany"
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
                v-auth="'api/v1/hx/hxBuilding/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxBuilding/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxBuilding/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxBuildingList"
        />
    </el-card>
    <ApiV1HxHxBuildingEdit
       ref="editRef"       
       :statusOptions="hx_status"       
       @hxBuildingList="hxBuildingList"
    ></ApiV1HxHxBuildingEdit>
    <ApiV1HxHxBuildingDetail
      ref="detailRef"      
      :statusOptions="hx_status"      
      @hxBuildingList="hxBuildingList"
    ></ApiV1HxHxBuildingDetail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxBuilding,
    getHxBuilding,
    delHxBuilding,
    addHxBuilding,
    updateHxBuilding,    
} from "/@/api/hx/hxBuilding";
import {
    HxBuildingTableColumns,
    HxBuildingInfoData,
    HxBuildingTableDataState,    
} from "/@/views/hx/hxBuilding/list/component/model"
import ApiV1HxHxBuildingEdit from "/@/views/hx/hxBuilding/list/component/edit.vue"
import ApiV1HxHxBuildingDetail from "/@/views/hx/hxBuilding/list/component/detail.vue"
import { getHxCommunity, listHxCommunity } from "/@/api/hx/hxCommunity"
defineOptions({ name: "apiV1HxHxBuildingList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
// 小区下拉选项
const communityOptions = ref<{ label: string; value: number }[]>([])
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
} = proxy.useDict(    
    'hx_status',    
)
const state = reactive<HxBuildingTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            buildingName: undefined,            
            unitCount: undefined,            
            communityId: undefined,   
            communityName: undefined,
            floorCount: undefined,            
            buildYear: undefined,            
            propertyCompany: undefined,            
            sort: undefined,            
            isLeaf: undefined,            
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
    loadCommunityOptions();
});
// 初始化表格数据
const initTableData = () => {    
    hxBuildingList()
};
// 加载小区下拉选项
const loadCommunityOptions = async () => {
  try {
    const res = await listHxCommunity({ pageNum: 1, pageSize: 9999 })
    const list = res.data.list ?? []
    communityOptions.value = list.map((item: any) => ({
      label: item.communityName || item.name || `小区${item.id}`,
      value: item.id
    }))
  } catch (e) {
    console.error('获取小区列表失败:', e)
  }
}
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    hxBuildingList()
};
// 获取列表数据
// 获取列表数据
const hxBuildingList = () => {
  loading.value = true
  listHxBuilding(state.tableData.param).then(async (res: any) => {
    const list = res.data.list ?? [];

    // 收集所有唯一的 communityId
    const uniqueIds: number[] = [...new Set(list.map((item: any) => item.communityId).filter((id: number) => id))] as number[];

    if (uniqueIds.length > 0) {
      try {
        // 并行请求所有小区信息
        const communityResults = await Promise.all(
          uniqueIds.map((id: number) => getHxCommunity(id))
        );
        // 构建 id -> communityName 映射
        const communityMap: Record<number, string> = {};
        communityResults.forEach((res: any) => {
          const data = res.data;
          console.log(data)
          if (data && data.id) {
            communityMap[data.id] = data.communityName || data.name || `小区${data.id}`;
          }
        });
        // 给列表每行赋值小区名称
        list.forEach((item: any) => {
          item.communityName = communityMap[item.communityId] || `小区${item.communityId}`;
        });
      } catch (e) {
        console.error('获取小区名称失败:', e);
      }
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
const statusFormat = (row:HxBuildingTableColumns) => {
    return proxy.selectDictLabel(hx_status.value, row.status);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxBuildingInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxBuildingTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxBuildingTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxBuildingTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxBuildingTableColumns|null) => {
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
            delHxBuilding(id).then(()=>{
                ElMessage.success('删除成功');
                hxBuildingList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxBuildingTableColumns)=>{
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
<template>
  <div class="hx-hxPartyActivitySignin-container">
    <el-card shadow="hover">
        <div class="hx-card-header">
          <span class="hx-card-header__bar"></span>
          <span class="hx-card-header__title">活动签到管理</span>
        </div>
        <div class="hx-hxPartyActivitySignin-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="序号" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入序号"
                        clearable                        
                        @keyup.enter.native="hxPartyActivitySigninList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="签到活动" prop="activityId">
                    <el-select filterable remote :remote-method="searchActivity" v-model="tableData.param.activityId" placeholder="搜索活动" clearable style="width:200px;">
                        <el-option
                            v-for="item in activityOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyActivitySigninList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="签到党员" prop="memberId">
                    <el-select filterable remote :remote-method="searchMember" v-model="tableData.param.memberId" placeholder="搜索党员" clearable style="width:200px;">
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
                  <el-form-item label="签到方式" prop="signinMethod">
                    <el-select filterable v-model="tableData.param.signinMethod" placeholder="请选择签到方式" clearable style="width:200px;">
                        <el-option
                            v-for="dict in signin_method"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="签到时间" prop="signinTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.signinTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择签到时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hxPartyActivitySigninList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  v-auth="'api/v1/hx/hxPartyActivitySignin/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hxPartyActivitySignin/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hxPartyActivitySignin/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="序号" align="center" prop="id"
            min-width="80px"            
             />          
          <el-table-column label="活动名称" align="center" prop="activityName"
            min-width="180px"            
             />          
          <el-table-column label="党员姓名" align="center" prop="memberName"
            min-width="120px"            
             />          
          <el-table-column label="签到时间" align="center" prop="signinTime"
            min-width="150px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.signinTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>        
          <el-table-column label="签到方式" align="center" prop="signinMethod" :formatter="signinMethodFormat"
            min-width="120px"            
             />          
          <el-table-column label="迟到" align="center" prop="isLate" min-width="60px"  
            :formatter="isLateFormat"           
             />          
          <el-table-column label="早退" align="center" prop="isLeaveEarly" min-width="60px"            
            :formatter="isLeaveEarlyFormat"           
             />          
          <el-table-column label="备注" align="center" prop="remark"
            min-width="150px"            
             />          
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="200px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleView(scope.row)"
                v-auth="'api/v1/hx/hxPartyActivitySignin/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hxPartyActivitySignin/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hxPartyActivitySignin/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hxPartyActivitySigninList"
        />
    </el-card>
    <ApiV1HxHxPartyActivitySigninEdit
       ref="editRef"       
       :signinMethodOptions="signin_method"
       @hxPartyActivitySigninList="hxPartyActivitySigninList"
    ></ApiV1HxHxPartyActivitySigninEdit>
    <ApiV1HxHxPartyActivitySigninDetail
      ref="detailRef"      
      :signinMethodOptions="signin_method"
      @hxPartyActivitySigninList="hxPartyActivitySigninList"
    ></ApiV1HxHxPartyActivitySigninDetail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHxPartyActivitySignin,
    getHxPartyActivitySignin,
    delHxPartyActivitySignin,
    addHxPartyActivitySignin,
    updateHxPartyActivitySignin,    
} from "/@/api/hx/hxPartyActivitySignin";
import {
    HxPartyActivitySigninTableColumns,
    HxPartyActivitySigninInfoData,
    HxPartyActivitySigninTableDataState,    
} from "/@/views/hx/hxdj/hxPartyActivitySignin/list/component/model"
import ApiV1HxHxPartyActivitySigninEdit from "/@/views/hx/hxdj/hxPartyActivitySignin/list/component/edit.vue"
import ApiV1HxHxPartyActivitySigninDetail from "/@/views/hx/hxdj/hxPartyActivitySignin/list/component/detail.vue"
import { listHxPartyActivity, getHxPartyActivity } from "/@/api/hx/hxPartyActivity"
import { listHxPartyMember, getHxPartyMember } from "/@/api/hx/hxPartyMember"
defineOptions({ name: "apiV1HxHxPartyActivitySigninList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
// 活动下拉选项
const activityOptions = ref<{ label: string; value: number }[]>([])
// 党员下拉选项
const memberOptions = ref<{ label: string; value: number }[]>([])
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
    signin_method,
} = proxy.useDict(    
    'hx_status',
    'signin_method',
)
const state = reactive<HxPartyActivitySigninTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            activityId: undefined,            
            memberId: undefined,     
            signinMethod: undefined,
            signinTime: undefined,
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
    hxPartyActivitySigninList()
};
// 远程搜索活动
const searchActivity = async (query: string) => {
  if (!query) {
    activityOptions.value = []
    return
  }
  try {
    const res = await listHxPartyActivity({ pageNum: 1, pageSize: 20, activityTitle: query })
    const list = res.data.list ?? []
    activityOptions.value = list.map((item: any) => ({
      label: item.activityTitle || `活动${item.id}`,
      value: item.id
    }))
  } catch (e) {
    console.error('搜索活动失败:', e)
  }
}
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
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    hxPartyActivitySigninList()
};
// 获取列表数据
const hxPartyActivitySigninList = () => {
  loading.value = true
  listHxPartyActivitySignin(state.tableData.param).then(async (res: any) => {
    const list = res.data.list ?? [];
    // 收集关联ID
    const uniqueActivityIds: number[] = [...new Set(list.map((item: any) => item.activityId).filter((id: number) => id))] as number[];
    const uniqueMemberIds: number[] = [...new Set(list.map((item: any) => item.memberId).filter((id: number) => id))] as number[];

    try {
      // 请求活动名称
      const activityMap: Record<number, string> = {};
      if (uniqueActivityIds.length > 0) {
        const activityResults = await Promise.all(
          uniqueActivityIds.map((id: number) => getHxPartyActivity(id))
        );
        activityResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            activityMap[data.id] = data.activityTitle || `活动${data.id}`;
          }
        });
      }
      // 请求党员姓名
      const memberMap: Record<number, string> = {};
      if (uniqueMemberIds.length > 0) {
        const memberResults = await Promise.all(
          uniqueMemberIds.map((id: number) => getHxPartyMember(id))
        );
        memberResults.forEach((res: any) => {
          const data = res.data;
          if (data && data.id) {
            memberMap[data.id] = data.personName || data.name || `党员${data.id}`;
          }
        });
      }
      // 填充名称
      list.forEach((item: any) => {
        item.activityName = activityMap[item.activityId] || `活动${item.activityId}`;
        item.memberName = memberMap[item.memberId] || `党员${item.memberId}`;
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
// 签到方式字典翻译
const signinMethodFormat = (row:HxPartyActivitySigninTableColumns) => {
    return proxy.selectDictLabel(signin_method.value, row.signinMethod);
}
// 是否迟到
const isLateFormat = (row: any) => {
    return row.isLate == 1 ? '是' : '否';
}
// 是否早退
const isLeaveEarlyFormat = (row: any) => {
    return row.isLeaveEarly == 1 ? '是' : '否';
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<HxPartyActivitySigninInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: HxPartyActivitySigninTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:HxPartyActivitySigninTableColumns)=>{
            return item.id ===state.ids[0]
        }) as HxPartyActivitySigninTableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: HxPartyActivitySigninTableColumns|null) => {
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
            delHxPartyActivitySignin(id).then(()=>{
                ElMessage.success('删除成功');
                hxPartyActivitySigninList();
            })
        })
        .catch(() => {});
}
const handleView = (row:HxPartyActivitySigninTableColumns)=>{
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

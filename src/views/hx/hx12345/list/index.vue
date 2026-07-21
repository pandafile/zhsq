<template>
  <div class="hx-hx12345-container">
    <el-card shadow="hover">
        <div class="hx-hx12345-search mb15">            
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="序号" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入序号"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="工单编号" prop="orderNo">
                    <el-input
                        v-model="tableData.param.orderNo"
                        placeholder="请输入工单编号"
                        clearable
                        @keyup.enter.native="hx12345List"
                    />
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8" class="colBlock">
                  <el-form-item label="小区" prop="communityId">
                    <el-select filterable v-model="tableData.param.communityId" placeholder="请选择小区" clearable style="width:200px;">
                      <el-option
                          v-for="item in communityIdOptions"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" class="colBlock">
                  <el-form-item label="办理人员" prop="handlePerson">
                    <el-select filterable v-model="tableData.param.handlePerson" placeholder="请选择办理人员" clearable style="width:200px;">
                        <el-option
                            v-for="dict in WokerList"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                        />
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hx12345List"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="受理时间" prop="acceptTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.acceptTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择受理时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="受理渠道" prop="acceptChannel">
                    <el-input
                        v-model="tableData.param.acceptChannel"
                        placeholder="请输入受理渠道"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="诉求等级" prop="appealLevel">
                    <el-input
                        v-model="tableData.param.appealLevel"
                        placeholder="请输入诉求等级"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="业务类型" prop="businessType">
                    <el-select filterable v-model="tableData.param.businessType" placeholder="请选择业务类型" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="诉求内容" prop="appealContent">
                    <el-input
                        v-model="tableData.param.appealContent"
                        placeholder="请输入诉求内容"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="诉求分类" prop="appealCategory">
                    <el-input
                        v-model="tableData.param.appealCategory"
                        placeholder="请输入诉求分类"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="事项状态" prop="itemStatus">
                    <el-select filterable v-model="tableData.param.itemStatus" placeholder="请选择事项状态" clearable style="width:200px;">
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
                  <el-form-item label="办理时限" prop="handleLimit">
                    <el-input
                        v-model="tableData.param.handleLimit"
                        placeholder="请输入办理时限"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="反馈内容" prop="feedbackContent">
                    <el-input
                        v-model="tableData.param.feedbackContent"
                        placeholder="请输入反馈内容"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="回复图片" prop="feedbackImages">
                    <el-select filterable v-model="tableData.param.feedbackImages" placeholder="请选择回复图片" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="处理图片" prop="handleImages">
                    <el-select filterable v-model="tableData.param.handleImages" placeholder="请选择处理图片" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="扬言内容" prop="yangyanContent">
                    <el-input
                        v-model="tableData.param.yangyanContent"
                        placeholder="请输入扬言内容"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="诉求人姓名" prop="appealerName">
                    <el-input
                        v-model="tableData.param.appealerName"
                        placeholder="请输入诉求人姓名"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="联系电话" prop="contactPhone">
                    <el-input
                        v-model="tableData.param.contactPhone"
                        placeholder="请输入联系电话"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="证件号码" prop="idCardNo">
                    <el-input
                        v-model="tableData.param.idCardNo"
                        placeholder="请输入证件号码"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="事发地址详情" prop="incidentAddressDetail">
                    <el-input
                        v-model="tableData.param.incidentAddressDetail"
                        placeholder="请输入事发地址详情"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="诉求标题" prop="appealTitle">
                    <el-input
                        v-model="tableData.param.appealTitle"
                        placeholder="请输入诉求标题"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="诉求内容标签" prop="appealContentTag">
                    <el-input
                        v-model="tableData.param.appealContentTag"
                        placeholder="请输入诉求内容标签"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="记录创建时间" prop="createTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.createTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择记录创建时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="记录更新时间" prop="updateTime">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.updateTime"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择记录更新时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="备注" prop="notes">
                    <el-input
                        v-model="tableData.param.notes"
                        placeholder="请输入备注"
                        clearable                        
                        @keyup.enter.native="hx12345List"
                    />                    
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="hx12345List"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
            <Hx12345FilterPanel
              v-model="filterModel"
              :communityIdOptions="communityIdOptions"
              :WokerList="WokerList"
              :WorkType="WorkType"
              @change="onFilterChange"
            />
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  @click="handleAdd"
                  v-auth="'api/v1/hx/hx12345/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/hx/hx12345/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/hx/hx12345/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>             
             <el-col :span="1.5">
                <el-button
                        type="warning"
                        @click="handleExport()"
                        v-auth="'api/v1/hx/hx12345/export'"
                ><el-icon><ele-Download /></el-icon>导出Excel</el-button>
             </el-col>      
                          <el-col :span="1.5">
                <el-button
                        type="warning"
                        @click="handleExport()"
                        v-auth="'api/v1/hx/hx12345/export'"
                ><el-icon><ele-Download /></el-icon>导出Excel</el-button>
             </el-col>
             <el-col :span="1.5">
                <el-button type="info" @click="handleMinyiLogin">
                  <el-icon><ele-User /></el-icon>{{ miyiStaus }}
                </el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button type="primary" @click="handleViewUpdate">
                  <el-icon><ele-User /></el-icon>数据同步
                </el-button>
              </el-col>
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="序号" align="center" prop="id"
            min-width="60px"            
             />          
          <el-table-column label="工单编号" align="center" prop="orderNo"
            min-width="100px"            
             />          
    
          <el-table-column label="小区" align="center" prop="linkedCommunityId.communityName"
            min-width="100px"            
             />          
                    <el-table-column label="事发地址详情" align="center" prop="incidentAddressDetail"
            min-width="120px"            
             />        
          <el-table-column label="诉求内容" align="center" prop="appealContent"
            min-width="350px"            
             />          
    
          <el-table-column label="事项状态" align="center" min-width="100px">
            <template #default="scope">
              <span style="color: #409EFF">{{ itemStatusFormat(scope.row) }}</span>
            </template>
          </el-table-column>          
          <el-table-column label="办理时限" align="center" prop="handleLimit"
            min-width="150px"            
             />          
          <el-table-column label="诉求标题" align="center" prop="appealTitle"
            min-width="100px"            
             />      
          <el-table-column label="诉求内容标注" align="center" prop="remark"
            min-width="200px"            
             />     
          <el-table-column label="反馈内容" align="center" prop="feedbackContent"
            min-width="300px"            
             />          
          <el-table-column label="回复图片" align="center" prop="feedbackImages"
            min-width="150px"            
             />          
          <el-table-column label="办理人员" align="center" min-width="80px">
            <template #default="scope">
              <span style="color: #409EFF">{{ handlePersonFormat(scope.row) }}</span>
            </template>
          </el-table-column>          
           
          <el-table-column label="诉求人姓名" align="center" prop="appealerName"
            min-width="100px"            
             />          
          <el-table-column label="联系电话" align="center" prop="contactPhone"
            min-width="150px"            
             />          
          <el-table-column label="备注" align="center" prop="notes"
            min-width="150px"            
             />        
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="200px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleView(scope.row)"
                v-auth="'api/v1/hx/hx12345/get'"
              ><el-icon><ele-View /></el-icon>详情</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/hx/hx12345/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/hx/hx12345/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="hx12345List"
        />
    </el-card>
    <!-- 民意平台登录弹窗 -->
    <MinYiLogin :show="showMinYiLogin" @close="showMinYiLogin = false" @login-success="onMinYiLoginSuccess" />
    <ApiV1HxHx12345Edit
       ref="editRef"       
       :communityIdOptions="communityIdOptions"       
       :itemStatusOptions="WorkType"       
       :handlePersonOptions="WokerList"       
       @hx12345List="hx12345List"
    ></ApiV1HxHx12345Edit>
    <ApiV1HxHx12345Detail
      ref="detailRef"      
      :communityIdOptions="communityIdOptions"      
      :itemStatusOptions="WorkType"      
      :handlePersonOptions="WokerList"      
      @hx12345List="hx12345List"
    ></ApiV1HxHx12345Detail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listHx12345,
    getHx12345,
    delHx12345,
    addHx12345,
    updateHx12345,    
    linkedDataSearch,
    getImages    
} from "/@/api/hx/hx12345";
import {
    Hx12345TableColumns,
    Hx12345InfoData,
    Hx12345TableDataState,    
    LinkedHx12345HxCommunity,    
} from "/@/views/hx/hx12345/list/component/model"
import ApiV1HxHx12345Edit from "/@/views/hx/hx12345/list/component/edit.vue"
import ApiV1HxHx12345Detail from "/@/views/hx/hx12345/list/component/detail.vue"
import Hx12345FilterPanel from "/@/views/hx/hx12345/list/component/filterPanel.vue"
import {downLoadXml} from "/@/utils/zipdownload";
import MinYiLogin from '/@/views/hx/hx12345/list/component/minyiLogin.vue';
import { isMinyiTokenValid, pageQuery, mapPlatformToDb, pageQueryList } from '/@/api/hx/minyi';
import { Session, Local } from '/@/utils/storage';
import { number } from "echarts";
defineOptions({ name: "apiV1HxHx12345List"})
const {proxy} = <any>getCurrentInstance()

// 检查民意 token 状态并更新按钮文字
const checkMinyiTokenStatus = () => {
  miyiStaus.value = isMinyiTokenValid() ? '已登录' : '民意登录'
}

const miyiStaus = ref('民意登录')
const showMinYiLogin = ref(false)

// 民意平台登录成功回调
const onMinYiLoginSuccess = () => {
  miyiStaus.value = '已登录'
}

// 按钮点击 - token 有效时不弹出登录框
const handleMinyiLogin = () => {
  if (isMinyiTokenValid()) {
    ElMessage.info('民意平台已登录，token 仍有效')
    return
  }
  showMinYiLogin.value = true
}

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
    WorkType,    
    WokerList,    
} = proxy.useDict(    
    'WorkType',    
    'WokerList',    
)
// communityIdOptions关联表数据
const communityIdOptions = ref<Array<ItemOptions>>([])
const state = reactive<Hx12345TableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
            id: undefined,            
            orderNo: undefined,            
            acceptTime: undefined,            
            acceptChannel: undefined,            
            appealLevel: undefined,            
            communityId: undefined,            
            businessType: undefined,            
            appealContent: undefined,            
            appealCategory: undefined,            
            itemStatus: undefined,            
            handleLimit: undefined,            
            feedbackContent: undefined,            
            feedbackImages: undefined,            
            handlePerson: undefined,            
            handleImages: undefined,            
            yangyanContent: undefined,            
            appealerName: undefined,            
            contactPhone: undefined,            
            idCardNo: undefined,            
            incidentAddressDetail: undefined,            
            appealTitle: undefined,            
            appealContentTag: undefined,            
            createTime: undefined,            
            updateTime: undefined,            
            notes: undefined,            
            dateRange: []
        },
    },
});
const { tableData } = toRefs(state);
// 过滤筛选组件数据模型
const filterModel = ref<{ communityId: any; handlePerson: any; itemStatus: any }>({
  communityId: undefined,
  handlePerson: undefined,
  itemStatus: undefined,
});
// 过滤条件变化时自动触发查询
const onFilterChange = (val: { communityId: any; handlePerson: any; itemStatus: any }) => {
  state.tableData.param.communityId = val.communityId;
  state.tableData.param.handlePerson = val.handlePerson;
  state.tableData.param.itemStatus = val.itemStatus;
  hx12345List();
};
// 页面加载时
onMounted(() => {
    initTableData();
    checkMinyiTokenStatus();
});
// 初始化表格数据
const initTableData = () => {    
    linkedData()    
    hx12345List()
};
const linkedData = ()=>{
    linkedDataSearch().then((res:any)=>{        
        //关联hx_community表选项        
        communityIdOptions.value = proxy.setItems(res, 'id', 'communityName','linkedHx12345HxCommunity')        
    })
}

/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    hx12345List()
};
// 获取列表数据
const hx12345List = ()=>{
  loading.value = true
  listHx12345(state.tableData.param).then((res:any)=>{
    let list = res.data.list??[];    
    state.tableData.data = list;
    state.tableData.total = res.data.total;
    loading.value = false
  })
};
const toggleSearch = () => {
    showAll.value = !showAll.value;
}
// 事项状态字典翻译
const itemStatusFormat = (row:Hx12345TableColumns) => {
    return proxy.selectDictLabel(WorkType.value, row.itemStatus);
}
// 办理人员字典翻译
const handlePersonFormat = (row:Hx12345TableColumns) => {
    return proxy.selectDictLabel(WokerList.value, row.handlePerson);
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<Hx12345InfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: Hx12345TableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:Hx12345TableColumns)=>{
            return item.id ===state.ids[0]
        }) as Hx12345TableColumns
    }    
    editRef.value.openDialog(toRaw(row));    
};
const handleDelete = (row: Hx12345TableColumns|null) => {
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
            delHx12345(id).then(()=>{
                ElMessage.success('删除成功');
                hx12345List();
            })
        })
        .catch(() => {});
}
const handleView = (row:Hx12345TableColumns)=>{
    detailRef.value.openDialog(toRaw(row));
}
// 导出excel
const handleExport = ()=>{
    downLoadXml('/api/v1/hx/hx12345/export',state.tableData.param,'get')
}

const handledata={
  currentPage:1,
  pageSize:300,
  taskStatus:"",
  isSuggest:"0",
}
const handleViewUpdate = async () => {
  const token = Local.get('minyiToken')
  if (!token?.accessToken) {
    ElMessage.warning('未登录民意平台')
    return
  }

  loading.value = true
  try {
    // 1) 取本地数据库现有 orderNo
    const localRes: any = await listHx12345({ pageNum: 1, pageSize: 99999 })
    const existingOrderNos = new Set(
      (localRes.data.list || []).map((item: any) => item.orderNo)
    )

    // 2) 并行拉取平台 5 个状态
    const statuses = ['1', '2', '3', '4', '5']
    const results = await Promise.all(
      statuses.map(s => pageQuery({ ...handledata, taskStatus: s }, token.accessToken))
    )

    // 3) 合并 + 过滤，带上对应的 taskStatus
    const platformList = results
      .flatMap((r, i) => (r?.data?.records ?? []).map((record: any) => ({
        ...record,
        _taskStatus: statuses[i]
      })))
      .filter((it: any) => it.petitionNumber && !existingOrderNos.has(it.petitionNumber))

    if (platformList.length === 0) {
      ElMessage.info('没有新数据需要同步')
      return
    }

    // 4) 用 pageQueryList 按 petitionNumber 逐一补充详细字段
    for (const item of platformList) {
      try {
        const detailRes = await pageQueryList({
          currentPage: 1,
          pageSize: 10,
          petitionLocationAddress: '',
          petitionClassification: '',
          petitionTagLabels: [],
          petitionFlagLabels: [],
          petitionStatusLabels: [],
          petitionProcessLabels: [],
          petitionNumber: item.petitionNumber,
          petitionContent: null,
          nextOrgId: '',
          areaCode: '',
          overdueStatus: '',
          overdueType: '',
          reportFlag: '',
          areaDataSwitch: '1'
        }, token.accessToken)
        const detail = detailRes?.data?.records?.[0]
        if (detail) {
          
          // 把 pageQuery 可能缺失的字段补上
          item.feedbackContent = item.feedbackContent || detail.reportContent

        }
      } catch (e) {
        console.warn('补充详情失败，跳过:', item.petitionNumber, e)
      }
      // 留白字段，供手动填写
      item._communityId = undefined
      item._handlePerson = undefined
    }
    console.log("platformList",platformList)
    // 5) 逐条插入
    let ok = 0, fail = 0
    for (const item of platformList) {
      try {
        await addHx12345(mapPlatformToDb(item))
        ok++
      } catch (e) {
        console.error('同步失败:', item.petitionNumber, e)
        fail++
      }
    }

    ElMessage.success(`同步完成：成功 ${ok} 条，失败 ${fail} 条`)
    hx12345List() // 刷新本地表格
  } finally {
    loading.value = false
  }
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
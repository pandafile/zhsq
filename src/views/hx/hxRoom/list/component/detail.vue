<template>
  <!-- 房屋信息表详情抽屉 -->  
  <div class="hx-hxRoom-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>房屋信息表详情</h4>
      </template>
      <el-descriptions
              class="margin-top"
              :column="3"
              border
              style="margin: 8px;"
      >        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  主键ID
                </div>
              </template>
              {{ formData.id }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">                  
                    <template #label>
                      <div class="cell-item">
                        楼栋ID
                      </div>
                    </template>
                    {{ formData.buildingName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  房号
                </div>
              </template>
              {{ formData.roomNo }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  面积(㎡)
                </div>
              </template>
              {{ formData.area }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  房屋标签
                </div>
              </template>
              {{ formData.roomTags }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  备注
                </div>
              </template>
              {{ formData.remark }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  是否叶子节点：0-否 1-是（末级）
                </div>
              </template>
              {{ formData.isLeaf }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  排序
                </div>
              </template>
              {{ formData.sort }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">              
                <template #label>
                  <div class="cell-item">
                    状态
                  </div>
                </template>
                {{ proxy.getOptionValue(formData.status, statusOptions,'value','label') }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                创建时间
              </div>
            </template>
            {{ proxy.parseTime(formData.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>
      </el-descriptions>

      <!-- 居住人员信息 -->
      <el-card shadow="hover" class="attr-table">
        <template #header>
          <div class="clearfix">
            <span>居住人员信息（共 {{ personList.length }} 人）</span>
          </div>
        </template>
        <el-table v-loading="personLoading" :data="personList" border stripe>
          <el-table-column label="姓名" align="center" prop="name" min-width="100px" />
    
          <el-table-column label="身份证号" align="center" prop="idCard" min-width="170px" />
          <el-table-column label="手机号" align="center" prop="phone" min-width="130px" />
          <el-table-column label="居住类型" align="center" prop="personType" min-width="100px">
            <template #default="scope">
              <el-tag v-if="scope.row.personType === '1'" type="success" disable-transitions>业主</el-tag>
              <el-tag v-else-if="scope.row.personType === '2'" type="info" disable-transitions>家属</el-tag>
              <el-tag v-else-if="scope.row.personType === '3'" type="warning" disable-transitions>租客</el-tag>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="出生日期" align="center" prop="birthday" min-width="120px">
            <template #default="scope">
              <span>{{ proxy.parseTime(scope.row.birthday, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="民族" align="center" prop="nation" min-width="100px" />
          <el-table-column label="状态" align="center" prop="status" min-width="80px">
            <template #default="scope">
              <el-tag v-if="scope.row.status === '1'" type="success" disable-transitions>正常</el-tag>
              <el-tag v-else type="info" disable-transitions>禁用</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-if="!personLoading && personList.length === 0" description="暂无居住人员" />
      </el-card>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
  import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';  
  import {
    listHxRoom,
    getHxRoom,
    delHxRoom,
    addHxRoom,
    updateHxRoom,    
  } from "/@/api/hx/hxRoom";  
  import { listHxPerson } from "/@/api/hx/hxPerson";
  import {
    HxRoomTableColumns,
    HxRoomInfoData,
    HxRoomTableDataState,
    HxRoomEditState
  } from "/@/views/hx/hxRoom/list/component/model"
  defineOptions({ name: "ApiV1HxHxRoomDetail"})  
  const props = defineProps({    
    buildingIdOptions:{
      type:Array,
      default:()=>[]
    },    
    statusOptions:{
      type:Array,
      default:()=>[]
    },    
  })  
  const {proxy} = <any>getCurrentInstance()
  const formRef = ref<HTMLElement | null>(null);
  const menuRef = ref();  
  const state = reactive<HxRoomEditState>({
    loading:false,
    isShowDialog: false,
    formData: {      
      id: undefined,      
      buildingId: undefined,      
      buildingName: undefined,      
      roomNo: undefined,      
      area: undefined,      
      roomTags: undefined,      
      remark: undefined,      
      isLeaf: undefined,      
      sort: undefined,      
      status: undefined,      
      createdAt: undefined,      
      updatedAt: undefined,      
    },
    // 表单校验
    rules: {      
      id : [
          { required: true, message: "主键ID不能为空", trigger: "blur" }
      ],      
      buildingId : [
          { required: true, message: "楼栋ID不能为空", trigger: "blur" }
      ],      
      roomNo : [
          { required: true, message: "房号不能为空", trigger: "blur" }
      ],      
      status : [
          { required: true, message: "状态不能为空", trigger: "blur" }
      ],      
    }
  });
  const { isShowDialog,formData } = toRefs(state);
  // 居住人员列表
  const personList = ref<Array<any>>([])
  const personLoading = ref(false)
  // 加载该房屋的居住人员
  const loadRoomPersons = (roomId: number) => {
    personLoading.value = true
    listHxPerson({ roomId: roomId } as any).then((res: any) => {
      personList.value = res.data?.list ?? []
    }).finally(() => {
      personLoading.value = false
    })
  }
  // 打开弹窗
  const openDialog = (row?: HxRoomInfoData) => {
    resetForm();
    personList.value = []
    if(row) {
      getHxRoom(row.id!).then((res:any)=>{
        const data = res.data;
        state.formData = data;
        // 加载该房屋的居住人员
        if (data.id) {
          loadRoomPersons(data.id)
        }
      })
    }
    state.isShowDialog = true;
  };
  // 关闭弹窗
  const closeDialog = () => {
    state.isShowDialog = false;
  };
  defineExpose({
    openDialog,
  });
  // 取消
  const onCancel = () => {
    closeDialog();
  };
  const resetForm = ()=>{
    state.formData = {      
      id: undefined,      
      buildingId: undefined,      
      buildingName: undefined,      
      roomNo: undefined,      
      area: undefined,      
      roomTags: undefined,      
      remark: undefined,      
      isLeaf: undefined,      
      sort: undefined,      
      status: undefined,      
      createdAt: undefined,      
      updatedAt: undefined,      
    }
  };  
  //关联hx_building表选项
  const getHxBuildingItemsBuildingId = () => {
    emit("getHxBuildingItemsBuildingId")
  }
  const getBuildingIdOp = computed(()=>{
    getHxBuildingItemsBuildingId()
    return props.buildingIdOptions
  })  
</script>
<style scoped>  
  .hx-hxRoom-detail :deep(.el-form-item--large .el-form-item__label){
    font-weight: bolder;
  }
  .pic-block{
    margin-right: 8px;
  }
  .file-block{
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin-bottom: 5px;
    padding: 3px 6px;
  }
  .ml-2{margin-right: 5px;}
  .attr-table{margin: 10px;}
</style>
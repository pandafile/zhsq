// 走访记录表列定义
export interface HxVisitRecordTableColumns {
  id: number // 主键ID
  visitType: number // 走访类型
  visitorIds: string // 走访人员ID列表
  visitTime: string // 走访时间
  locationDesc: string // 走访地点
  personId: number // 走访对象ID
  roomId: number // 房屋ID
  content: string // 走访内容
  result: string // 走访结果
  followUp: number // 是否跟进
  followUpDeadline: string // 跟进截止日期
  attachmentUrls: string // 附件URLs
  remark: string // 备注
  hxStatus: number // 状态
  createdBy: string // 创建人
  createdAt: string // 创建时间
  updatedBy: string // 更新人
  updatedAt: string // 更新时间
}

// 走访记录详情数据
export interface HxVisitRecordInfoData {
  id: number | undefined // 主键ID
  visitType: number | undefined // 走访类型
  visitorIds: string | undefined // 走访人员ID列表（逗号分隔）
  visitTime: string | undefined // 走访时间
  locationDesc: string | undefined // 走访地点
  personId: number | undefined // 走访对象ID
  roomId: number | undefined // 房屋ID
  content: string | undefined // 走访内容
  result: string | undefined // 走访结果
  followUp: number | undefined // 是否跟进
  followUpDeadline: string | undefined // 跟进截止日期
  attachmentUrls: string | undefined // 附件URLs
  remark: string | undefined // 备注
  hxStatus: number | undefined // 状态
  createdBy: string | undefined // 创建人
  createdAt: string | undefined // 创建时间
  updatedBy: string | undefined // 更新人
  updatedAt: string | undefined // 更新时间
}

// 走访记录列表数据状态
export interface HxVisitRecordTableDataState {
  ids: any[]
  tableData: {
    data: Array<HxVisitRecordTableColumns>
    total: number
    loading: boolean
    param: {
      pageNum: number
      pageSize: number
      id: number | undefined
      visitType: number | undefined
      visitorIds: string | undefined
      visitTime: string | undefined
      locationDesc: string | undefined
      personId: number | undefined
      roomId: number | undefined
      content: string | undefined
      result: string | undefined
      followUp: number | undefined
      followUpDeadline: string | undefined
      remark: string | undefined
      hxStatus: number | undefined
      createdBy: string | undefined
      createdAt: string | undefined
      dateRange: string[]
    }
  }
}

// 编辑弹窗状态
export interface HxVisitRecordEditState {
  loading: boolean
  isShowDialog: boolean
  formData: HxVisitRecordInfoData
  rules: object
}

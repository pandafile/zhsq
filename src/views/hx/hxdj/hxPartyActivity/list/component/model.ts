export interface HxPartyActivityTableColumns {    
    id:number;  // 序号    
    activityTitle:string;  // 活动标题    
    activityType:number;  // 活动类型    
    orgId:number;  // 所属组织    
    organizerId:number;  // 组织人    
    startTime:string;  // 开始时间    
    endTime:string;  // 结束时间    
    location:string;  // 活动地点    
    attendeeCount:number;  // 应到人数    
    actualCount:number;  // 实到人数    
    content:string;  // 活动内容    
    summary:string;  // 活动总结    
    attachmentUrls:string;  // 附件图片    
    remark:string;  // 备注    
    status:number;  // 状态    
    createdAt:string;  // 创建时间    
}


export interface HxPartyActivityInfoData {    
    id:number|undefined;        // 序号    
    activityTitle:string|undefined; // 活动标题    
    activityType:number|undefined; // 活动类型    
    orgId:number|undefined; // 所属组织    
    organizerId:number|undefined; // 组织人    
    startTime:string|undefined; // 开始时间    
    endTime:string|undefined; // 结束时间    
    location:string|undefined; // 活动地点    
    attendeeCount:number|undefined; // 应到人数    
    actualCount:number|undefined; // 实到人数    
    content:string|undefined; // 活动内容    
    summary:string|undefined; // 活动总结    
    attachmentUrls:string|undefined; // 附件图片    
    remark:string|undefined; // 备注    
    status:number|undefined; // 状态    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
}


export interface HxPartyActivityTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxPartyActivityTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            activityTitle: string|undefined;            
            activityType: number|undefined;            
            orgId: number|undefined;     
            organizerId: number|undefined;       
            startTime: string|undefined;            
            endTime: string|undefined;            
            location: string|undefined;            
            attendeeCount: number|undefined;            
            actualCount: number|undefined;            
            content: string|undefined;            
            summary: string|undefined;            
            attachmentUrls: string|undefined;            
            remark: string|undefined;            
            status: number|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxPartyActivityEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxPartyActivityInfoData;
    rules: object;
}

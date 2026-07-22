export interface HxFocusFollowTableColumns {    
    id:number;  // 主键ID    
    caseid:string;  // 重点问题ID    
    linkedCaseid?:LinkedHxFocusFollowHxFocusCase; // 重点问题ID    
    followTime:string;  // 跟进时间    
    content:string;  // 跟进内容    
    feedbackContent:string;  // 诉求人意见    
    handler:string;  // 经办人    
    attachImages:string;  // 记录图片    
    nextPlan:string;  // 下一步工作计划    
    followResult:string;  // 办理进度    
    createTime:string;  // 创建时间    
    linkedHxFocusFollowHxFocusCase:LinkedHxFocusFollowHxFocusCase;    
}


export interface HxFocusFollowInfoData {    
    id:number|undefined;        // 主键ID    
    caseid:string|undefined; // 重点问题ID    
    linkedCaseid?:LinkedHxFocusFollowHxFocusCase; // 重点问题ID    
    followTime:string|undefined; // 跟进时间    
    content:string|undefined; // 跟进内容    
    feedbackContent:string|undefined; // 诉求人意见    
    handler:string|undefined; // 经办人    
    attachImages:string|undefined; // 记录图片    
    nextPlan:string|undefined; // 下一步工作计划    
    followResult:string|undefined; // 办理进度    
    createTime:string|undefined; // 创建时间    
    linkedHxFocusFollowHxFocusCase?:LinkedHxFocusFollowHxFocusCase;    
}


export interface LinkedHxFocusFollowHxFocusCase {	
    id:number|undefined;    // 主键ID	
}


export interface HxFocusFollowTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxFocusFollowTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            caseid: string|undefined;            
            followTime: string|undefined;            
            content: string|undefined;            
            feedbackContent: string|undefined;            
            handler: string|undefined;            
            attachImages: string|undefined;            
            nextPlan: string|undefined;            
            followResult: string|undefined;            
            createTime: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxFocusFollowEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxFocusFollowInfoData;
    rules: object;
}
export interface HxPartyActivitySigninTableColumns {    
    id:number;  // 序号    
    activityId:number;  // 活动ID    
    memberId:number;  // 签到党员ID    
    signinTime:string;  // 签到时间    
    signinMethod:number;  // 签到方式    
    isLate:number;  // 是否迟到    
    isLeaveEarly:number;  // 是否早退    
    remark:string;  // 备注    
}


export interface HxPartyActivitySigninInfoData {    
    id:number|undefined;        // 序号    
    activityId:number|undefined; // 活动ID    
    memberId:number|undefined; // 签到党员ID    
    signinTime:string|undefined; // 签到时间    
    signinMethod:number|undefined; // 签到方式    
    isLate:number|undefined; // 是否迟到    
    isLeaveEarly:number|undefined; // 是否早退    
    remark:string|undefined; // 备注    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
}


export interface HxPartyActivitySigninTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxPartyActivitySigninTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            activityId: number|undefined;            
            memberId: number|undefined;     
            signinMethod: number|undefined;       
            signinTime: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxPartyActivitySigninEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxPartyActivitySigninInfoData;
    rules: object;
}

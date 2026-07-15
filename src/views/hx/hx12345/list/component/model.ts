export interface Hx12345TableColumns {    
    id:number;  // 序号    
    orderNo:string;  // 工单编号    
    acceptTime:string;  // 受理时间    
    acceptChannel:string;  // 受理渠道    
    appealLevel:string;  // 诉求等级    
    communityId:number;  // 小区    
    linkedCommunityId?:LinkedHx12345HxCommunity; // 小区    
    businessType:string;  // 业务类型    
    appealContent:string;  // 诉求内容    
    appealCategory:string;  // 诉求分类    
    itemStatus:number;  // 事项状态    
    handleLimit:string;  // 办理时限    
    feedbackContent:string;  // 反馈内容    
    feedbackImages:any[];  // 回复图片    
    handlePerson:number;  // 办理人员    
    handleImages:any[];  // 处理图片    
    yangyanContent:string;  // 扬言内容    
    appealerName:string;  // 诉求人姓名    
    contactPhone:string;  // 联系电话    
    idCardNo:string;  // 证件号码    
    incidentAddressDetail:string;  // 事发地址详情    
    appealTitle:string;  // 诉求标题    
    appealContentTag:string;  // 诉求内容标签    
    createTime:string;  // 记录创建时间    
    updateTime:string;  // 记录更新时间    
    notes:string;  // 备注    
    linkedHx12345HxCommunity:LinkedHx12345HxCommunity;    
}


export interface Hx12345InfoData {    
    id:number|undefined;        // 序号    
    orderNo:string|undefined; // 工单编号    
    acceptTime:string|undefined; // 受理时间    
    acceptChannel:string|undefined; // 受理渠道    
    appealLevel:string|undefined; // 诉求等级    
    communityId:number|undefined; // 小区    
    linkedCommunityId?:LinkedHx12345HxCommunity; // 小区    
    businessType:string|undefined; // 业务类型    
    appealContent:string|undefined; // 诉求内容    
    appealCategory:string|undefined; // 诉求分类    
    itemStatus:number|undefined; // 事项状态    
    handleLimit:string|undefined; // 办理时限    
    feedbackContent:string|undefined; // 反馈内容    
    feedbackImages:any[]; // 回复图片    
    handlePerson:number|undefined; // 办理人员    
    handleImages:any[]; // 处理图片    
    yangyanContent:string|undefined; // 扬言内容    
    appealerName:string|undefined; // 诉求人姓名    
    contactPhone:string|undefined; // 联系电话    
    idCardNo:string|undefined; // 证件号码    
    incidentAddressDetail:string|undefined; // 事发地址详情    
    appealTitle:string|undefined; // 诉求标题    
    appealContentTag:string|undefined; // 诉求内容标签    
    createTime:string|undefined; // 记录创建时间    
    updateTime:string|undefined; // 记录更新时间    
    notes:string|undefined; // 备注    
    linkedHx12345HxCommunity?:LinkedHx12345HxCommunity;    
}


export interface LinkedHx12345HxCommunity {	
    id:number|undefined;    // 主键ID	
    communityName:string|undefined;    // 小区名称	
}


export interface Hx12345TableDataState {
    ids:any[];
    tableData: {
        data: Array<Hx12345TableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            orderNo: string|undefined;            
            acceptTime: string|undefined;            
            acceptChannel: string|undefined;            
            appealLevel: string|undefined;            
            communityId: number|undefined;            
            businessType: string|undefined;            
            appealContent: string|undefined;            
            appealCategory: string|undefined;            
            itemStatus: number|undefined;            
            handleLimit: string|undefined;            
            feedbackContent: string|undefined;            
            feedbackImages: string|undefined;            
            handlePerson: number|undefined;            
            handleImages: string|undefined;            
            yangyanContent: string|undefined;            
            appealerName: string|undefined;            
            contactPhone: string|undefined;            
            idCardNo: string|undefined;            
            incidentAddressDetail: string|undefined;            
            appealTitle: string|undefined;            
            appealContentTag: string|undefined;            
            createTime: string|undefined;            
            updateTime: string|undefined;            
            notes: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface Hx12345EditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:Hx12345InfoData;
    rules: object;
}
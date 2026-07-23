export interface HxPartyOrganizationTableColumns {    
    id:number;  // 序号    
    orgName:string;  // 组织名称    
    parentId:number;  // 上级组织    
    orgType:number;  // 组织类型    
    communityId:number;  // 所属小区    
    secretaryId:number;  // 书记    
    sort:number;  // 排序    
    remark:string;  // 备注    
    status:number;  // 状态    
    createdAt:string;  // 创建时间    
}


export interface HxPartyOrganizationInfoData {    
    id:number|undefined;        // 序号    
    orgName:string|undefined; // 组织名称    
    parentId:number|undefined; // 上级组织    
    orgType:number|undefined; // 组织类型    
    communityId:number|undefined; // 所属小区    
    secretaryId:number|undefined; // 书记    
    sort:number|undefined; // 排序    
    remark:string|undefined; // 备注    
    status:number|undefined; // 状态    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
}


export interface HxPartyOrganizationTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxPartyOrganizationTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            orgName: string|undefined;            
            parentId: number|undefined;            
            orgType: number|undefined;            
            communityId: number|undefined;     
            secretaryId: number|undefined;       
            sort: number|undefined;            
            remark: string|undefined;            
            status: number|undefined;            
            createdAt: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxPartyOrganizationEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxPartyOrganizationInfoData;
    rules: object;
}

export interface HxCommunityTableColumns {    
    id:number;  // 主键ID    
    communityName:string;  // 小区名称    
    communityType:number;  // 小区类型    
    basicInfo:string;  // 小区信息    
    address:string;  // 详细地址    
    remark:string;  // 备注    
    sort:number;  // 排序    
    status:number;  // 状态    
    createdBy:string;  // 创建人    
    createdAt:string;  // 创建时间    
}


export interface HxCommunityInfoData {    
    id:number|undefined;        // 主键ID    
    communityName:string|undefined; // 小区名称    
    communityType:number|undefined; // 小区类型    
    basicInfo:string|undefined; // 小区信息    
    address:string|undefined; // 详细地址    
    remark:string|undefined; // 备注    
    sort:number|undefined; // 排序    
    status:number|undefined; // 状态    
    createdBy:string|undefined; // 创建人    
    createdAt:string|undefined; // 创建时间    
    updatedBy:string|undefined; // 更新人    
    updatedAt:string|undefined; // 更新时间    
}


export interface HxCommunityTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxCommunityTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            communityName: string|undefined;            
            communityType: number|undefined;            
            basicInfo: string|undefined;            
            address: string|undefined;            
            sort: number|undefined;            
            status: number|undefined;            
            createdBy: string|undefined;            
            createdAt: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxCommunityEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxCommunityInfoData;
    rules: object;
}
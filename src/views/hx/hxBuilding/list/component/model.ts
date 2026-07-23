export interface HxBuildingTableColumns {    
    id:number;  // 序号    
    buildingName:string;  // 楼栋名称    
    unitCount:number;  // 单元数    
    communityId:number;  // 小区ID    
    floorCount:number;  // 楼层数    
    buildYear:;  // 建造年份    
    propertyCompany:string;  // 物业公司    
    remark:string;  // 备注    
    sort:number;  // 排序    
    isLeaf:number;  // 是否叶子节点：0-否（有下级） 1-是（无下级）    
    status:number;  // 状态    
    createdAt:string;  // 创建时间    
}


export interface HxBuildingInfoData {    
    id:number|undefined;        // 序号    
    buildingName:string|undefined; // 楼栋名称    
    unitCount:number|undefined; // 单元数    
    communityId:number|undefined; // 小区ID    
    floorCount:number|undefined; // 楼层数    
    buildYear:|undefined; // 建造年份    
    propertyCompany:string|undefined; // 物业公司    
    remark:string|undefined; // 备注    
    sort:number|undefined; // 排序    
    isLeaf:number|undefined; // 是否叶子节点：0-否（有下级） 1-是（无下级）    
    status:number|undefined; // 状态    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
}


export interface HxBuildingTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxBuildingTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            buildingName: string|undefined;            
            unitCount: number|undefined;            
            communityId: number|undefined;     
            communityName:string|undefined;       
            floorCount: number|undefined;            
            buildYear: |undefined;            
            propertyCompany: string|undefined;            
            sort: number|undefined;            
            isLeaf: number|undefined;            
            status: number|undefined;            
            createdAt: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxBuildingEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxBuildingInfoData;
    rules: object;
}
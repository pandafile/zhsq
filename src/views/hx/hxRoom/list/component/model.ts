export interface HxRoomTableColumns {    
    id:number;  // 主键ID    
    buildingId:number;  // 楼栋ID    
    buildingName:string;  // 楼栋名称    
    roomNo:string;  // 房号    
    area:number;  // 面积(㎡)    
    roomTags:string;  // 房屋标签    
    remark:string;  // 备注    
    isLeaf:number;  // 是否叶子节点：0-否 1-是（末级）    
    sort:number;  // 排序    
    status:number;  // 状态    
    createdAt:string;  // 创建时间    
}


export interface HxRoomInfoData {    
    id:number|undefined;        // 主键ID    
    buildingId:number|undefined; // 楼栋ID    
    buildingName:string|undefined; // 楼栋名称    
    roomNo:string|undefined; // 房号    
    area:number|undefined; // 面积(㎡)    
    roomTags:string|undefined; // 房屋标签    
    remark:string|undefined; // 备注    
    isLeaf:number|undefined; // 是否叶子节点：0-否 1-是（末级）    
    sort:number|undefined; // 排序    
    status:number|undefined; // 状态    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
}


export interface HxRoomTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxRoomTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;    
            BuildingId: number|undefined        
            roomNo: string|undefined;            
            area: number|undefined;            
            roomTags: string|undefined;            
            isLeaf: number|undefined;            
            sort: number|undefined;            
            status: number|undefined;            
            createdAt: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxRoomEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxRoomInfoData;
    rules: object;
}
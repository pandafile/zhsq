export interface HxPersonTableColumns {    
    id:number;  // 主键ID    
    name:string;  // 姓名    
    gender:number;  // 性别    
    roomId:string;  // 房屋ID    
    linkedRoomId?:LinkedHxPersonHxRoom; // 房屋ID    
    idCard:string;  // 身份证号    
    phone:string;  // 手机号    
    persontype:number;  // 居住类型    
    birthday:string;  // 出生日期    
    nation:string;  // 民族    
    basicInfo:string;  // 基础信息    
    specialTags:string;  // 特殊标签    
    healthInfo:string;  // 健康信息    
    familyInfo:string;  // 家庭信息    
    socialInfo:string;  // 社保信息    
    remark:string;  // 备注    
    status:number;  // 状态    
    createdBy:string;  // 创建人    
    createdAt:string;  // 创建时间    
    linkedHxPersonHxRoom:LinkedHxPersonHxRoom;    
}


export interface HxPersonInfoData {    
    id:number|undefined;        // 主键ID    
    name:string|undefined; // 姓名    
    gender:number|undefined; // 性别    
    roomId:string|undefined; // 房屋ID    
    linkedRoomId?:LinkedHxPersonHxRoom; // 房屋ID    
    idCard:string|undefined; // 身份证号    
    phone:string|undefined; // 手机号    
    persontype:number|undefined; // 居住类型    
    birthday:string|undefined; // 出生日期    
    nation:string|undefined; // 民族    
    basicInfo:string|undefined; // 基础信息    
    specialTags:string|undefined; // 特殊标签    
    healthInfo:string|undefined; // 健康信息    
    familyInfo:string|undefined; // 家庭信息    
    socialInfo:string|undefined; // 社保信息    
    remark:string|undefined; // 备注    
    status:number|undefined; // 状态    
    createdBy:string|undefined; // 创建人    
    createdAt:string|undefined; // 创建时间    
    updatedBy:string|undefined; // 更新人    
    updatedAt:string|undefined; // 更新时间    
    linkedHxPersonHxRoom?:LinkedHxPersonHxRoom;    
}


export interface LinkedHxPersonHxRoom {	
    id:number|undefined;    // 主键ID	
    roomNo:string|undefined;    // 房号	
}


export interface HxPersonTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxPersonTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            name: string|undefined;            
            gender: number|undefined;            
            roomId: string|undefined;            
            idCard: string|undefined;            
            phone: string|undefined;            
            persontype: number|undefined;            
            birthday: string|undefined;            
            nation: string|undefined;            
            basicInfo: string|undefined;            
            specialTags: string|undefined;            
            healthInfo: string|undefined;            
            familyInfo: string|undefined;            
            socialInfo: string|undefined;            
            status: number|undefined;            
            createdBy: string|undefined;            
            createdAt: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxPersonEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxPersonInfoData;
    rules: object;
}
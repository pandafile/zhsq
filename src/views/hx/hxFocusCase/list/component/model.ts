export interface HxFocusCaseTableColumns {    
    id:number;  // 主键ID    
    acceptChannel:string;  // 来源    
    focusType:number;  // 问题类别    
    content:string;  // 内容    
    feedbackContent:string;  // 反馈内容    
    handleContent:string;  // 工作建议    
    handler:number;  // 主办人    
    imgs:any[];  // 现场图片    
    notes:string;  // 备注    
}


export interface HxFocusCaseInfoData {    
    id:number|undefined;        // 主键ID    
    acceptChannel:string|undefined; // 来源    
    focusType:number|undefined; // 问题类别    
    content:string|undefined; // 内容    
    feedbackContent:string|undefined; // 反馈内容    
    handleContent:string|undefined; // 工作建议    
    handler:number|undefined; // 主办人    
    imgs:any[]; // 现场图片    
    notes:string|undefined; // 备注    
}


export interface HxFocusCaseTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxFocusCaseTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            acceptChannel: string|undefined;            
            focusType: number|undefined;            
            content: string|undefined;            
            feedbackContent: string|undefined;            
            handleContent: string|undefined;            
            handler: number|undefined;            
            imgs: string|undefined;            
            notes: string|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxFocusCaseEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxFocusCaseInfoData;
    rules: object;
}
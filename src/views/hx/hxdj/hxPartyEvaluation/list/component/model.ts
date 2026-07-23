export interface HxPartyEvaluationTableColumns {    
    id:number;  // 序号    
    evaluationTitle:string;  // 评议标题    
    orgId:number;  // 所属组织    
    orgName:string;  // 所属组织名称    
    evaluationType:number;  // 评议类型    
    targetMemberId:number;  // 被评议人    
    targetMemberName:string;  // 被评议人姓名    
    evaluatorId:number;  // 评议人    
    evaluatorName:string;  // 评议人姓名    
    evaluatorType:number;  // 评议人类型    
    scoreTotal:number;  // 总得分    
    scoreItems:string;  // 评分项    
    opinionText:string;  // 评议意见    
    grade:string;  // 评定等级    
    evaluationDate:string;  // 评议日期    
    remark:string;  // 备注    
    status:number;  // 状态    
    createdAt:string;  // 创建时间    
}


export interface HxPartyEvaluationInfoData {    
    id:number|undefined;        // 序号    
    evaluationTitle:string|undefined; // 评议标题    
    orgId:number|undefined; // 所属组织    
    evaluationType:number|undefined; // 评议类型    
    targetMemberId:number|undefined; // 被评议人    
    evaluatorId:number|undefined; // 评议人    
    evaluatorType:number|undefined; // 评议人类型    
    scoreTotal:number|undefined; // 总得分    
    scoreItems:string|undefined; // 评分项    
    opinionText:string|undefined; // 评议意见    
    grade:string|undefined; // 评定等级    
    evaluationDate:string|undefined; // 评议日期    
    remark:string|undefined; // 备注    
    status:number|undefined; // 状态    
    createdAt:string|undefined; // 创建时间    
    updatedAt:string|undefined; // 更新时间    
}


export interface HxPartyEvaluationTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxPartyEvaluationTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: number|undefined;            
            evaluationTitle: string|undefined;            
            orgId: number|undefined;            
            evaluationType: number|undefined;            
            targetMemberId: number|undefined;            
            evaluatorId: number|undefined;            
            evaluatorType: number|undefined;            
            grade: string|undefined;            
            status: number|undefined;            
            dateRange: string[];
        };
    };
}


export interface HxPartyEvaluationEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxPartyEvaluationInfoData;
    rules: object;
}

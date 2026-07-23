export interface HxPartyMemberTableColumns {
    id:number;  // 序号
    personId:number;  // 人员
    orgId:number;  // 所属组织
    partyStatus:number;  // 党员状态
    joinPartyDate:string;  // 入党日期
    becomeFormalDate:string;  // 转正日期
    partyDuty:number;  // 党内职务
    partyEducation:string;  // 文化程度
    partySource:number;  // 党员来源
    honors:string;  // 荣誉奖励
    extraInfo:string;  // 扩展信息
    remark:string;  // 备注
    status:number;  // 状态
    createdAt:string;  // 创建时间
}


export interface HxPartyMemberInfoData {
    id:number|undefined;        // 序号
    personId:number|undefined; // 人员
    orgId:number|undefined; // 所属组织
    partyStatus:number|undefined; // 党员状态
    joinPartyDate:string|undefined; // 入党日期
    becomeFormalDate:string|undefined; // 转正日期
    partyDuty:number|undefined; // 党内职务
    partyEducation:string|undefined; // 文化程度
    partySource:number|undefined; // 党员来源
    honors:string|undefined; // 荣誉奖励
    extraInfo:string|undefined; // 扩展信息
    remark:string|undefined; // 备注
    status:number|undefined; // 状态
    createdAt:string|undefined; // 创建时间
    updatedAt:string|undefined; // 更新时间
}


export interface HxPartyMemberTableDataState {
    ids:any[];
    tableData: {
        data: Array<HxPartyMemberTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;
            id: number|undefined;
            personId: number|undefined;
            orgId: number|undefined;
            partyStatus: number|undefined;
            joinPartyDate: string|undefined;
            becomeFormalDate: string|undefined;
            partyDuty: number|undefined;
            partyEducation: string|undefined;
            partySource: number|undefined;
            honors: string|undefined;
            extraInfo: string|undefined;
            remark: string|undefined;
            status: number|undefined;
            createdAt: string|undefined;
            dateRange: string[];
        };
    };
}


export interface HxPartyMemberEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:HxPartyMemberInfoData;
    rules: object;
}

import axios from 'axios';
import { Local } from '/@/utils/storage';

const BASE_URL = 'http://59.232.0.17:28080/api/hnyth-auth/auth'

// 解码 JWT payload（base64 -> JSON）
function parseJwt(token: string): any {
  try {
    const payload = token.split('.')[1]
    const decoded = atob(payload)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

// 检查民意平台 token 是否有效（未过期）
export function isMinyiTokenValid(): boolean {
  const data = Local.get('minyiToken')
  if (!data?.accessToken) return false

  const payload = parseJwt(data.accessToken)
  if (!payload?.exp) return false

  // JWT 的 exp 是秒级时间戳，Date.now() 是毫秒级
  return Date.now() < payload.exp * 1000
}

// 获取验证码图片 + codeHash
export async function getCaptcha() {
  const response = await axios.get('http://59.232.0.17:28080/api/hnyth-auth/auth/login/validCode', {
    params: { size: '100x40' },
  });

  return response.data  // { key: "...", img: "data:image/png;base64,..." }
}

// 民意平台登录
export async function minyiLogin(data: {
  loginName: string,
  loginPwd: string,
  code: string,
  codeHash: string
}) {
  const response = await axios.post(`${BASE_URL}/login`, {
    loginType: 'password',
    ...data
  });
  return response.data  // 返回 token 等信息
}

//事项办理API
export async function pageQuery(data:{
  currentPage:number,
  pageSize:number,
  taskStatus:string,
  isSuggest:string,
},token:string) {
  const response = await axios.post('http://59.232.0.17:28080/api/hnyth-handle/tPetitionOrder/pageQuery',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
  );
  return response.data
}



export async function pageQueryList(data:{
    currentPage: 1,
    pageSize: 10,
    petitionLocationAddress: '',
    petitionClassification: '',
    petitionTagLabels: [],
    petitionFlagLabels: [],
    petitionStatusLabels: [],
    petitionProcessLabels: [],
    petitionNumber:'',
    petitionContent: null,
    nextOrgId: '',
    areaCode: '',
    overdueStatus: '',
    overdueType: '',
    reportFlag: '',
    areaDataSwitch: '1'
},token:string){
    const response = await axios.post('http://59.232.0.17:28080/api/hnyth-handle/tPetitionOrder/pageQueryList/es',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
  );
  return response.data  
}

export function mapPlatformToDb(p: any) {
  return {
    orderNo: p.petitionNumber,
    acceptChannel: p.petitionSource,
    acceptTime: p.registerTime?.replace(/\//g, '-'),
    appealCategory: p.contentClassification,
    communityId: parseCommunity(p.petitionLocationSupplement),
    appealerName: p.petitionUserName,
    appealLevel: p.isUrgent,
    businessType: p.petitionAmi,
    appealContent: p.petitionContent,
    itemStatus: p._taskStatus,
    contactPhone: p.petitionUserPhone,
    incidentAddressDetail: [p.petitionLocationAddress, p.petitionLocationSupplement]
      .filter(Boolean).join(' '),
    feedbackContent: p.petitionFeedback,
    yangyanContent: p.petitionYangyan,
    appealTitle: p.petitionTitle,
    appealContentTag: p.petitionAml,
    handleLimit: p.limitedProcessingDeadline?.replace(/\//g, '-'),
    notes: '',

  }

}
        // api_item = {
        //     "orderNo": row["工单编号"],
        //     "acceptChannel": row["受理渠道"],
        //     "acceptTime": str(row["受理时间"]),
        //     "appealCategory": row["诉求分类"],
        //     "communityId": parse_community(row["事发地址详情"]),
        //     "appealerName": row["诉求人姓名"],
        //     "appealLevel": row["诉求等级"],
        //     "businessType": row["业务类型"],
        //     "appealContent": row["诉求内容"],
        //     "itemStatus":decodeType(row["事项状态"]),
        //     "idCardNo": row["证件号码"],
        //     "contactPhone": row["联系电话"],
        //     "incidentAddressDetail": row["事发地址详情"],
        //     "feedbackContent": row["反馈内容"],
        //     "yangyanContent": row["扬言内容"],
        //     "appealTitle": row["诉求标题"],
        //     "appealContentTag": row["诉求内容标签"],
        //     "handleLimit": str(row["办理时限"])
        // }

function petitionStatusToNumber(status: string): number | undefined {
  // 如果已经是数字码（'1'~'5'），直接转数字
  if (/^[1-5]$/.test(status)) {
    return Number(status)
  }
  // 中文名映射
  const map: Record<string, number> = {
    '待办理': 1,
    '办理中': 2,
    '已办结': 3,
    '已超期': 4,
    '已退回': 5,
  }
  return map[status]
}


function parseCommunity(incidentAddressDetail:string) {
  if (!incidentAddressDetail) return ""
  const map = { "保利": 1, "清控": 2, "美的": 3, "长房": 4 }
  for (const [key, val] of Object.entries(map)) {
    if (incidentAddressDetail.includes(key)) return val
  }
  return ""
}



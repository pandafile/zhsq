import type {
  HxPersonTableColumns,
  HxPersonInfoData,
  HxPersonTableDataState,
  HxPersonEditState,
} from "/@/views/hx/hxPerson/list/component/model"

// 复用 hxPerson 的所有类型
export type {
  HxPersonTableColumns,
  HxPersonInfoData,
  HxPersonTableDataState,
  HxPersonEditState,
}

// 身份标签常量（写死一组，前端维护，后台不可改）
export const partyIdentityTags = [
  '直管党员',
  '流动党员',
  '预备党员',
  '入党积极分子',
  '残疾人',
  '低保户',
  '退役军人',
  '空巢老人',
  '留守儿童',
] as const

export type PartyIdentityTag = (typeof partyIdentityTags)[number]

/**
 * 解析 specialTags 字符串，兼容数组和对象两种 JSON 格式
 * 返回字符串数组
 */
export const parseSpecialTags = (specialTags: string | null | undefined): string[] => {
  if (!specialTags) return []
  try {
    const parsed = JSON.parse(specialTags)
    if (Array.isArray(parsed)) {
      return parsed
    }
    if (typeof parsed === 'object' && parsed !== null) {
      // 对象格式兼容：取所有值
      return Object.values(parsed).filter((v): v is string => typeof v === 'string')
    }
    return []
  } catch {
    return []
  }
}

/**
 * 将标签数组转为 JSON 字符串存储
 */
export const stringifyTags = (tags: string[]): string => {
  return JSON.stringify(tags)
}

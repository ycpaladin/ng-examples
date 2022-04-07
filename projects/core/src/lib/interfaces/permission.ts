
/**
 * 每个功能模块下的4种操作权限
 * 其值范围为view(查看), change(修改), approve(审批), operate(操作)
 */
export type PermType = 'operate' | 'change' | 'view' | 'approve';

/**
 * 判断当前用户是所有数据权限，还是所有者数据权限
 * 每个功能模块下的4种操作权限
 */
export type Perm = {
  [K in PermType]?: PermIndex[];
};

/**
 * 每个功能模块下的3种数据权限对应的索引
 * 0: 所有数据权限
 * 1: 创建者数据权限
 * 2: 所有者数据权限
 */
export type PermIndex = 0 | 1 | 2;

/**
 * 用户权限
 */
export type PermList = {
  [key: string]: Perm;
};


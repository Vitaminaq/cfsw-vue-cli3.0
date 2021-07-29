// 获取url后面参数
export const getQueryParams = (
  params: string | (string | null)[] | null
): string | null => {
  return Array.isArray(params) ? params[0] : params;
};
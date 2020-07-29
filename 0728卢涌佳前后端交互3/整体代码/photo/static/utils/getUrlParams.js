/**
 * stringParam  : like '?xxx=xxx'
 * searchParam  : the field you want to search
 */
function getPramsByString(stringParam, searchParam) {
  let value = "";
  const arr = stringParam.substring(1).split("=");
  let index = arr.findIndex((ele) => ele == searchParam);
  value = arr[index + 1];
  return value;
}

export default { getPramsByString };

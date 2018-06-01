/**
 * 辅助函数，判断边界条件
 * @author carroll
*/

// 深拷贝，不支持expReg，function等类型
Object.cloneDeep = (obj) => {
  if (typeof obj !== 'object') return obj;

  if (typeof window !== 'undefined' && window.JSON) {
    return JSON.parse(JSON.stringify(obj));
  } else {
    let newObj = obj.constructor === Array ? [] : {};
    for (var key in obj) {
      newObj[key] = typeof obj[key] !== 'object' ? Object.cloneDeep(obj[key]) : obj[key];
    }
    return newObj[key];
  }
};

Object.isNullArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0;
};

Object.isExistArray = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

/* obj is null, undefined, {} */
Object.isEmptyObject = (obj) => {
  return obj === null ||
         obj === undefined ||
         (Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && Object.keys(obj).length === 0);
};

/* is a object ,exclude array */
Object.isObject = (obj) => {
  return typeof obj === 'object' &&
         !obj.length &&
         Object.prototype.toString.call(obj).toLowerCase() === '[object object]';
};
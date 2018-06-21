/**
 * 公共方法
 * @author carroll
 */

/**
 * @export 数组里的对象类型是否有重复
 * @param {Array} arr
 * @param {String} key
 * @returns
 */
export function isRepeat(arr, key) {
  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    for (let j = i; j < arr.length; j++) {
      if (String(arr[i][key]) === String(arr[j][key])) {
        count++;
        if (count > 1) {
          return true;
        }
      }
    }
  }
};

// 判断多个规则校验是否都通过
export function checkMultRules(ref) {
  let count = 0;
  if (ref.length) {
    ref.forEach(val => {
      val.validate(valid => valid && count++);
    });

    return Boolean(count === ref.length);
  } else {
    ref.validate(valid => valid && count++);

    return Boolean(count);
  }
};

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

// 当表单为Array，判断多个规则校验是否都通过
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

/*
* 将json对象转成FormData对象
* 只支持对象，暂不支持数组和多层嵌套。
*/
export function jsonToFormData(json) {
  if (Array.isArray(json)) throw new Error('jsonToFormData dont support Array');
  let formData = new FormData();
  for (let x in json) {
    if (Array.isArray(json[x])) {
      json[x].forEach(val => {
        formData.append(`${x}`, val);
      });
    } else {
      formData.append(`${x}`, json[x]);
    }
  }
  return formData;
}

/**
 * 去除type=number的滚动
 */
export function cancelNumberScroll(evt) {
  evt = evt || window.event;
  if (evt.preventDefault) {
    // Firefox
    evt.preventDefault();
    evt.stopPropagation();
  } else {
    // IE
    evt.cancelBubble = true;
    evt.returnValue = false;
  }
  return false;
}

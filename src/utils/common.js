/**
 * @author carroll
 * @description 公共方法
 */

import { FILE_ACCEPT, FILE_MAX_SIZE, FILE_ERROR_TIP, FILE_MAX_COUNT } from '@/config/index.js';
import moment from 'moment';

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

/**
 * 当表单为Array，判断多个规则校验是否都通过
 * @export
 * @param {*} ref
 * @returns
 */
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

/**
 * 去除所有string字段的首尾空格
 * @param {Object} obj
 */
export function toTrim(obj = {}) {
  if (Object.isObject(obj)) {
    for (let x in obj) {
      if (typeof obj[x] === 'string') {
        obj[x] = obj[x].trim();
      } else if (Array.isArray(x)) {
        x.forEach(val => {
          toTrim(val);
        });
      } else {
        toTrim(x);
      }
    }
  }
}

/**
 * @export
 * @param {*} file
 * @param {*} fileList
 * @returns
 */
export function fileBeforeUpload(file, fileList) {
  const isOverLimit = file.size > (FILE_MAX_SIZE * 1024 * 1024);
  const isFormat = !isFileAcceptable(file.name);
  const isOverNum = fileList.length > FILE_MAX_COUNT;
  let index = fileList.findIndex(val => val.uid === file.raw.uid);
  if (isFormat) {
    this.$message.error(FILE_ERROR_TIP);
    fileList.splice(index, 1);
  }
  if (isOverLimit) {
    this.$message.error(`上传文件不能超过${FILE_MAX_SIZE}MB!`);
    fileList.splice(index, 1);
  }
  if (isOverNum) {
    this.$message.error(`文件上传数量不能超过${FILE_MAX_COUNT}个`);
    fileList.splice(index, 1);
  }
  return isOverLimit || isFormat || isOverNum;
};

function isFileAcceptable(fileName) {
  for (let accept of FILE_ACCEPT) {
    if (fileName.toLowerCase().endsWith(accept)) return true;
  }
  return false;
};

export function convertNull(data) {
  return data === null ? '-' : data;
};

export function chinaDatetransformDate(vals = '') {
  let dates = vals.split('-');
  if (dates.length) {
    if (dates.length === 2) {
      return vals;
    }
    return `${dates[1]} -${dates[2]} `;
  } else {
    return '';
  }
};

/**
 * @description 将`2018-08`转换成`2018-08-01`
 * @export
 * @param {*} val
 * @returns
 */
export function addFirstDayinMonth(val) {
  return moment(val).format('YYYY-MM') + '-01';
}

export function validateChartData(list, fields) {
  for (let item of list) {
    for (let field of fields) {
      if (item[field] !== null) {
        return list;
      }
    }
  }

  return [];
}

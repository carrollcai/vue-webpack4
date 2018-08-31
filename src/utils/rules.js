/**
 * element-ui表单验证的规则
 * @author carroll
 */

import {
  INPUT_BIG_WORD_MAX,
  DATE_LIMIT,
  MONTH_LIMIT,
  INPUT_TEXT_LIMIT,
  INPUT_ACCOUNT_LIMIT,
  INPUT_TEXTAREA_LIMIT,
  FILE_MAX_COUNT,
  INPUT_TEXTAREA_MAX_LIMIT,
  EMAIL_MAX_LENGTH,
  INPUT_LENGTH_TWENTY,
  INPUT_NUMBER_LIMIT,
  INPUT_MONTH_MAX_LIMIT,
} from '@/config/index.js';
import moment from 'moment';

// 输入内容不能为空格
export const isEmpty = (rule, value, callback) => {
  if (value && !String(value).trim()) {
    callback(new Error('输入内容不能全为空格'));
  } else {
    callback();
  }
};

// 非负数，需要先经过非空检验（isEmpty）
export const isNonnegative = (rule, value, callback) => {
  const reg = /^[1-9]\d*$/; // 为什么不用/^\d+$/，因为它也支持0001
  if (reg.test(value) || value.toString() === '0') {
    callback();
  } else {
    callback(new Error('请输入正确数字类型'));
  }
};

// 正整数，需要先经过非空检验（isEmpty）
export const isPositive = (rule, value, callback) => {
  const reg = /^[1-9]\d*$/;
  if (value === '' || value === null) {
    callback();
  } else if (value > INPUT_NUMBER_LIMIT) {
    callback(new Error(`不得超过${INPUT_NUMBER_LIMIT}`));
  } else if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确数字类型'));
  }
};

// 月份限制在两位正整数
export const isOverMonth = (rule, value, callback) => {
  const reg = /^[1-9]\d*$/;
  if (value === '' || value === null) {
    callback();
  } else if (value >= INPUT_MONTH_MAX_LIMIT) {
    callback(new Error(`月份不得超过${INPUT_MONTH_MAX_LIMIT}`));
  } else if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确数字类型'));
  }
};

// 文本最大数量校验
export const maxLimit = (rule, value, callback) => {
  if (Number(value) > INPUT_BIG_WORD_MAX) {
    callback(new Error(`输入内容不能超过${INPUT_BIG_WORD_MAX}`));
  } else {
    callback();
  }
};

// 时间段校校验
// 两种形式，日时间段和月时间段，日时间段不得超过1个月，月时间段不得超过12个月
export const dateRange = (rule, value, callback) => {
  // 按日
  const startDate = value[0].getTime();
  const endDate = value[1].getTime();
  const delta = parseInt(endDate - startDate) / 1000 / 60 / 60 / 24;
  if (delta > DATE_LIMIT - 1) {
    callback(new Error(`时间跨度不能超过${DATE_LIMIT}天`));
  } else {
    callback();
  }
};

// 月时间校验
export const monthRange = (startDate, endDate, callback) => {
  const startDatefFormat = moment(startDate).format('YYYY-MM');
  const endDatefFormat = moment(endDate).format('YYYY-MM');
  const startArr = startDatefFormat.split('-');
  const endArr = endDatefFormat.split('-');

  if (parseInt(endArr[0] - startArr[0]) > 1) {
    callback(new Error(`时间跨度不能超过${MONTH_LIMIT}月`));
  } else if (parseInt(endArr[0] - startArr[0]) === 1) {
    if (parseInt(endArr[1] - startArr[1]) > 0) {
      callback(new Error(`时间跨度不能超过${MONTH_LIMIT}月`));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

// input account最大15字符校验
export const textLimit = (rule, value, callback) => {
  if (String(value).trim() === '') {
    callback(new Error('输入内容不能为空'));
  } else if (String(value).trim().length > INPUT_TEXT_LIMIT) {
    callback(new Error(`输入内容字符不能超过${INPUT_TEXT_LIMIT}`));
  } else {
    callback();
  }
};
// input 常规最大20字符校验
export const inputLengthTwenty = (rule, value, callback) => {
  if (String(value).trim() === '') {
    callback(new Error('输入内容不能为空'));
  } else if (String(value).trim().length > INPUT_LENGTH_TWENTY) {
    callback(new Error(`输入内容字符不能超过${INPUT_LENGTH_TWENTY}`));
  } else {
    callback();
  }
};

//  input 常规最大25字符校验
export const textAccountLimit = (rule, value, callback) => {
  if (String(value).trim() === '') {
    callback(new Error('输入内容不能为空'));
  } else if (String(value).trim().length > INPUT_ACCOUNT_LIMIT) {
    callback(new Error(`输入内容字符不能超过${INPUT_ACCOUNT_LIMIT}`));
  } else {
    callback();
  }
};

// textarea 50字符校验
export const textareaLimit = (rule, value, callback) => {
  if (String(value).trim() === '') {
    callback(new Error('输入内容不能为空'));
  } else if (String(value).trim().length > INPUT_TEXTAREA_LIMIT) {
    callback(new Error(`输入内容字符不能超过${INPUT_TEXTAREA_LIMIT}`));
  } else {
    callback();
  }
};

// textarea 最大500字符校验
export const textareaMaxLimit = (rule, value, callback) => {
  if (String(value).trim() === '') {
    callback(new Error('输入内容不能为空'));
  } else if (String(value).trim().length > INPUT_TEXTAREA_MAX_LIMIT) {
    callback(new Error(`输入内容字符不能超过${INPUT_TEXTAREA_MAX_LIMIT}`));
  } else {
    callback();
  }
};

/**
* 时间验证
* @param {String} effectiveDate
* @param {String} expireDate
* @param {Function} callback
*/
export const startDateBeforeEndDate = (effectiveDate, expireDate, callback) => {
  if (effectiveDate && expireDate) {
    const at = new Date(effectiveDate);
    const et = new Date(expireDate);
    if (at.getTime() > et.getTime()) {
      callback(new Error('开始时间不能大于结束时间'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

// 手机号校验
export const checkPhone = (rule, value, callback) => {
  const reg = /^1[23456789]\d{9}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入11位正确手机号'));
  }
};

// 邮箱验证
// 修改20180720，邮箱可以不是必填
export const emailCheck = (rule, value, callback) => {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  if (String(value).trim() === '' || value === null) {
    callback();
  } else if (value.length > EMAIL_MAX_LENGTH) {
    callback(new Error(`邮箱长度不得超过${EMAIL_MAX_LENGTH}`));
  } else if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确邮箱'));
  }
};

// 整数部分最多8位，小数部分最多2位
export const inte8Deci2 = (rule, value, callback) => {
  const reg = /^\d{1,8}(?:\.\d{1,2})?$/;
  if (String(value).trim() === '' || value === null) {
    callback();
  } else if (reg.test(value) && value.toString().indexOf('.') !== value.length - 1) {
    callback();
  } else {
    callback(new Error('整数部分最多8位，小数部分最多2位'));
  }
};
export const nointe8Deci2 = (rule, value, callback) => {
  const reg = /^\d{1,8}(?:\.\d{1,2})?$/;
  let flag = !value ? '0' : '1';
  if (flag === '1') {
    if (String(value).trim() === '' || value === null) {
      // callback();
    } else if (reg.test(value) && value.toString().indexOf('.') !== value.length - 1) {
      callback();
    } else {
      callback(new Error('整数部分最多8位，小数部分最多2位'));
    }
  }
};

// 多文件校验
export const multFileValid = (files, callback) => {
  if (!files.length) {
    callback(new Error('请上传文件'));
  } else if (files.length > FILE_MAX_COUNT) {
    callback(new Error(`文件上传数量不能超过${FILE_MAX_COUNT}个`));
  } else {
    callback();
  }
};

// 非必填
export const fileValidLen = (files, callback) => {
  if (files.length && files.length > FILE_MAX_COUNT) {
    callback(new Error(`文件上传数量不能超过${FILE_MAX_COUNT}个`));
  } else {
    callback();
  }
};

// 头尾空格校验，必须为字符串
export const checkLeftRightSpace = (rule, value, callback) => {
  if (value.indexOf(' ') === 0) {
    callback(new Error('开头不能有空格'));
  } else if (value.indexOf(' ') === value.length - 1) {
    callback(new Error('结尾不能有空格'));
  } else {
    callback();
  }
};

// 密码验证
export const passworReg = (rule, value, callback) => {
  const reg = /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('密码至少包含数字、字母（大小写）、特殊字符中的两个'));
  }
};

import { INPUT_NUM_MAX } from '../config';

/**
 * element-ui表单验证的规则
 * @author carroll
 */

// 输入内容不能为空格
export const isEmpty = (rule, value, callback) => {
  if (String(value).trim() && value !== null) {
    callback();
  } else {
    callback(new Error('输入内容不能为空'));
  }
};

// 非负数，需要先经过非空检验（isEmpty）
export const isNonnegative = (rule, value, callback) => {
  const reg = /^[1-9]\d*$/; // 为什么不用/^\d+$/，因为这样也支持0001
  if (reg.test(value) || value.toString() === '0') {
    callback();
  } else {
    callback(new Error('请输入正确数字类型'));
  }
};

// 正整数，需要先经过非空检验（isEmpty）
export const isPositive = (rule, value, callback) => {
  const reg = /^[1-9]\d*$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确数字类型'));
  }
};

// 最大数量校验
export const maxLimit = (rule, value, callback) => {
  if (Number(value) > INPUT_NUM_MAX) {
    callback(new Error(`输入内容不能超过${INPUT_NUM_MAX}`));
  } else {
    callback();
  }
};

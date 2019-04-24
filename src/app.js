import angular from 'angular';

import InputIPWithMask from './input-ip-with-mask/input-ip-with-mask'
const MODULE_NAME = 'app';

let app = angular.module(MODULE_NAME, [])
  .directive('inputIpWithMask', InputIPWithMask)

export default app

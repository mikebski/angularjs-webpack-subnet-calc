import template from './input-ip-with-mask.html'
import css from './input-ip-with-mask.css'; // This makes webpack pack this file!

let InputIPWithMask = function() {
  const IP_SUBNET_FORMAT_REGEX = /\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\/([0-9]?[0-9])\b/;

  const formatNumber = num => {
    const n = String(num),
      p = n.indexOf('.')
    return n.replace(
      /\d(?=(?:\d{3})+(?:\.|$))/g,
      (m, i) => p < 0 || i < p ? `${m}` : m
    )
  }

  const validate = (inputValue, scope) => {
    if (inputValue == null || inputValue == undefined) {
      return
    }
    var formatResult = inputValue.match(IP_SUBNET_FORMAT_REGEX)
    scope.formattedResult = formatResult
    return !(formatResult == null)
  }

  return {
    template: template,
    scope: true,
    link: function (scope, element, attr) {
      scope.value = ""
      scope.isValid = false
      scope.ipInt = null
      scope.netMask = null
      scope.netBits = null
      scope.addressCount = null
      scope.firstAddress = null
      scope.lastAddress = null
      scope.networkAddress = null
      scope.broadcastAddress = null

      function int2ip (ipInt) {
        let ret = ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) )
        return ret;
      }

      scope.keyup = (event) => {
        event.preventDefault();
        scope.isValid = validate(event.target.value, scope)
        if (scope.isValid) {

          let ipInt = parseInt(scope.formattedResult[4]) +
            parseInt(scope.formattedResult[3] * 256) +
            parseInt(scope.formattedResult[2] * (256 << 8)) +
            parseInt(scope.formattedResult[1] * (256 << 16))

          scope.netMask = parseInt(scope.formattedResult[5])
          scope.netBits = 32 - scope.netMask
          scope.addressCount = formatNumber(2 ** scope.netBits - 2)
          scope.firstAddress = int2ip(ipInt + 1)
          scope.lastAddress = int2ip(parseInt(ipInt) + parseInt(scope.addressCount))
          scope.networkAddress = int2ip(ipInt)
          scope.broadcastAddress = int2ip(parseInt(ipInt) + parseInt(scope.addressCount) + 1)
          scope.ipInt = ipInt
        }
      };
    }
  }
};

export default InputIPWithMask

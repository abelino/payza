var qs = require('querystring');

module.exports.parse = function(service, body) {
  body = qs.parse(body);

  switch (service) {
    case 'GetBalance':
      return _getBalance(body);

    case 'ExecuteMassPay':
    case 'CancelSubscription':
    case 'RefundTransaction':
    case 'SendMoney':
      return _sendMoney(body);

    case 'GetTransactionInfo':
    case 'TransactionHistory':
      return _transactionHistory(body);

    default:
      return null;
  }
};

function _getBalance(opts) {
  var res = {
    'code': +opts.RETURNCODE,
    'description': opts.DESCRIPTION || null,
    'balances': []
  };

  if (res.code >= 200) {
    delete res.balances;
    return res;
  }

  var regex = /(AVAILABLEBALANCE|CURRENCY)_(\d+)/;
  var bal = res.balances;

  for (var field in opts) {
    var val = opts[field];
    var match = field.match(regex);

    if (!match) continue;

    var i = match[2] - 1;
    var key = match[1] == 'CURRENCY' ? 'currency' : 'balance';

    if (key == 'balance') val = +val;

    if (bal[i] === undefined) {
      bal[i] = {};
      bal[i][key] = val;
    } else {
      bal[i][key] = val;
    }
  }

  return res;
}

function _sendMoney(opts) {
  var res = {
    'code': +opts.RETURNCODE,
    'referenceNumber': opts.REFERENCENUMBER || null,
    'description': opts.DESCRIPTION || null,
    'testMode': opts.TESTMODE
  };

  return res;
}

function _transactionHistory(opts) {
  var res = {
    'code': +opts.RETURNCODE,
    'description': opts.DESCRIPTION || null,
    'transactions': []
  };

  if (res.code >= 200) {
    delete res.transactions;
    return res;
  }

  var trans = res.transactions;
  var varMap = {
    'REFERENCENUMBER': 'referenceNumber',
    'EMAIL': 'email',
    'CURRENCY': 'currency',
    'TRANSACTIONTYPE': 'transactionType',
    'TRANSACTIONSTATE': 'transactionState',
    'NOTE': 'note',
    'DATE': 'date',
    'TIME': 'time',
    'GROSSAMOUNT': 'grossAmount',
    'FEESAMOUNT': 'feesAmount',
    'NETAMOUNT': 'netAmount',
    'SUBSCRIPTIONNUMBER': 'subscriptionNumber'
  };

  for (var field in opts) {
    var components = field.split('_');
    if (components.length == 1) continue;

    var name = components[0];
    var i = +components[1];
    var actualName = varMap[name];
    if (!actualName) continue;

    var val = opts[field];
    val = !isNaN(+val) ? +val : val;

    if (trans[i] === undefined) {
      trans[i] = {};
      trans[i][actualName] = val;
    } else {
      trans[i][actualName] = val;
    }
  }

  return res;
}

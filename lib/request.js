module.exports.stringify = function(service, opts) {
  switch(service) {
    case 'ExecuteMassPay':
      return _executeMassPay(opts);

    case 'GetBalance':
      return _getBalance(opts);

    case 'SendMoney':
      return _sendMoney(opts);

    case 'RefundTransaction':
      return _refundTransaction(opts);

    case 'CancelSubscription':
      return _cancelSubscription(opts);

    case 'TransactionHistory':
      return _transactionHistory(opts);

    case 'GetTransactionInfo':
      return _getTransactionInfo(opts);

    default:
      return null;
  }
};

function _urlencode(opts) {
  var params = [];
  for (var field in opts) {
    var val = opts[field];
    if (val === undefined) continue;

    params.push(field + '=' + encodeURIComponent(val));
  }
  return params.join('&');
}

function _executeMassPay(opts) {
  var req = {
    'USER': opts.user,
    'PASSWORD': opts.password,
    'CURRENCY': opts.currency || 'USD',
    'SENDEREMAIL': opts.senderEmail,
    'TESTMODE': opts.testMode
  };

  var payments = opts.payments;
  var counter = 0;
  for (var len = payments.length, i = 0; i < len; i++) {
    var payment = payments[i];
    var receiverEmail = payment.receiverEmail;
    var amount = payment.amount;
    var note = payment.note;
    var custom = payment.custom;

    if (!receiverEmail || !amount) continue;

    var j = ++counter;
    req['RECEIVEREMAIL_' + j] = receiverEmail;
    req['AMOUNT_' + j] = amount;
    req['NOTE_' + j] = note;
    req['MPCUSTOM_' + j] = custom;
  }

  return _urlencode(req);
}

function _sendMoney(opts) {
  var req = {
    'USER': opts.user,
    'PASSWORD': opts.password,
    'AMOUNT': opts.amount,
    'CURRENCY': opts.currency,
    'RECEIVEREMAIL': opts.receiverEmail,
    'SENDEREMAIL': opts.senderEmail,
    'PURCHASETYPE': opts.purchaseType || 0,
    'NOTE': opts.note,
    'TESTMODE': opts.testMode
  };

  return _urlencode(req);
}

function _getBalance(opts) {
  var req = {
    'USER': opts.user,
    'PASSWORD': opts.password,
    'CURRENCY': opts.currency || 'USD'
  };

  return _urlencode(req);
}

function _refundTransaction(opts) {
  var req = {
    'USER': opts.user,
    'PASSWORD': opts.password,
    'TRANSACTIONREFERENCE': opts.referenceNumber,
    'TESTMODE': opts.testMode
  };

  return _urlencode(req);
}

function _cancelSubscription(opts) {
  var req = {
    'USER': opts.user,
    'PASSWORD': opts.password,
    'SUBSCRIPTIONREFERENCE': opts.referenceNumber,
    'NOTE': opts.note,
    'TESTMODE': opts.testMode
  };

  return _urlencode(req);
}

function _transactionHistory(opts) {
  var req = {
    'USER': opts.user,
    'PASSWORD': opts.password,
    'STARTDATE': opts.startDate,
    'ENDDATE': opts.endDate,
    'EMAIL': opts.email,
    'TRANSACTIONREFERENCE': opts.transactionNumber,
    'AMOUNT': opts.amount,
    'CURRENCY': opts.currency,
    'TRANSACTIONTYPE': opts.transactionType,
    'TRANSACTIONSTATE': opts.transactionState
  };

  return _urlencode(req);
}

function _getTransactionInfo(opts) {
  var req = {
    'USER': opts.user,
    'PASSWORD': opts.password,
    'TRANSACTIONREFERENCE': opts.transactionNumber
  };

  return _urlencode(req);
}

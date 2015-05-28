# payza

I tried to make it so that the module source code reads easily and is efficient as well. If you have any questions, concerns, comments, please drop a line in the form of an issue on the github page.

### How to use
##### NOTE: default path and host are production path and host
# 
```js
var payza = require('payza')({
  'user': 'example@gmail.com',
  'password': 'api_password_pcdTEmc4aYH',
  'host': 'sandbox.payza.com', //override default host
  'path': '/api/api.svc/' //override default path
});
```

### Get Balance
This api only has a single optional property: "currency" however if nothing is supplied then the default value of 'USD' will be used. Both examples below are identical.
```js
payza.getBalance(null, function(err, data) {
  console.log(err || data);
});

payza.getBalance({'currency': 'USD'}, function(err, data) {
  console.log(err || data);
});
```

### Get Transaction Info

```js
var opts = {
  'transactionNumber': '17EF4-FDCF1-61583'
};

payza.getTransactionInfo(opts, function(err, data) {
  console.log(err || data);
});
```

### Get Transaction History

```js
var opts = {
  'startDate': '2011/04/11', //format YYYY/MM/DD
  'endDate': '2011/04/22',
  'email': 'example@gmail.com', //The email contained in the transaction
  'transactionNumber': 'BD998-85C6D-6947E',
  'amount': 88.88,
  'currency': 'USD',
  'transactionType': 2,
  'transactionState': 2
};

payza.getTransactionHistory(opts, function(err, data) {
  console.log(err || data);
});
```

### Execute Mass Pay

```js
var opts = {
  'currency': 'USD', //default is USD
  'senderEmail': 'example@gmail.com',
  'testMode': 0, //0 or 1
  'payments': [{
    'receiverEmail': 'receiver.example@gmail.com',
    'amount': 1.00,
    'note': 'receiver will see this',
    'custom': 'receiver will not see this'
  }]
};

payza.executeMassPay(opts, function(err, data) {
  console.log(err || data);
});
```

### Send Money

```js
var opts = {
  'amount': 1.00,
  'currency': 'USD', //default is USD
  'receiverEmail': 'example.receiver@gmail.com',
  'senderEmail': 'example.sender@gmail.com',
  'purchaseType': 0, //default is 0
  'note': 'receiver will see this',
  'testMode': 0
};

payza.sendMoney(opts, function(err, data) {
  console.log(err || data);
});
```

### Refund Transaction

```js
var opts = {
  'referenceNumber': 'BD998-85C6D-6947E',
  'testMode': 0
};

payza.refundTransaction(opts, function(err, data) {
  console.log(err || data);
});
```

### Cancel Subscription
```js
var opts = {
  'referenceNumber': 'BD998-85C6D-6947E',
  'note': 'some note here',
  'testMode': 0
};

payza.cancelSubscription(opts, function(err, data) {
  console.log(err || data);
});
```

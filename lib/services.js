var https = require('https');
var qs = require('querystring');
var request = require('./request');
var response = require('./response');

module.exports = Services;

function Services(opts) {
  opts = opts || {};

  this.protocol = 'https:';
  this.host = opts.host || 'api.payza.com';
  this.path = opts.path || '/svc/api.svc/';
  this.user = opts.user;
  this.password = opts.password;

  if (!this.user || !this.password) throw 'credentials missing';
}

Services.prototype.getTransactionInfo = function(opts, cb) {
  this._post('GetTransactionInfo', opts, cb);
};

Services.prototype.getTransactionHistory = function(opts, cb) {
  this._post('TransactionHistory', opts, cb);
};

Services.prototype.getBalance = function(opts, cb) {
  this._post('GetBalance', opts, cb);
};

Services.prototype.executeMassPay = function(opts, cb) {
  this._post('ExecuteMassPay', opts, cb);
};

Services.prototype.sendMoney = function(opts, cb) {
  this._post('SendMoney', opts, cb);
};

Services.prototype.refundTransaction = function(opts, cb) {
  this._post('RefundTransaction', opts, cb);
};

Services.prototype.calcelSubscription = function(opts, cb) {
  this._post('CancelSubscription', opts, cb);
};

Services.prototype._post = function(service, opts, cb) {
  opts = opts || {};
  opts.user = this.user;
  opts.password = this.password;

  var body = request.stringify(service, opts);

  var reqOpts = {
    'port': 443,
    'method': 'POST',
    'path': this.path + service,
    'host': this.host,
    'headers': {
      'Host': this.host,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
      'User-Agent': 'Mozilla/5.0 payza-node'
    }
  };

  var req = https.request(reqOpts, function(res) {
    if (res.statusCode != 200) {
      res.destroy();
      var err = 'server returned unknown response ' + res.statusCode;
      return cb(new Error(err));
    }

    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      cb(null, response.parse(service, body));
    });
  });

  req.end(body);
};

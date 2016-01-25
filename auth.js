var auth = exports;
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcrypt');
var users = {};

var getUsers = function getUsers(cb) {
  fs.readFile('/var/games/minecraft/users.json', function(err, results) {
    if (err) {
      console.error("error reading file: ", err);
      return cb(null);
    }
    cb(JSON.parse(results));
  });
};

auth.authenticate_shadow = function(username, plaintext, callback) {
  getUsers(function(users) {
    if (!users[username]) {
      /* Not a real user */
      return callback(false);
    }
    bcrypt.compare(plaintext, users[username].hash, function(err, res) {
      if (err) {
        console.error("error comparing password: ", err);
        return callback(false);
      }
      if (res === false) { return callback(false); }
      callback(username);
    });
  });
};

auth.test_membership = function(username, group, callback) {
  // true is a member of group
  // false is nto a member of group
  callback(true);
};

auth.verify_ids = function(uid, gid, callback) {
  cb(); // uid and gid exist on the system
  //cb("Message"); // doesn't or other error
};

auth.generate = function generate(username, password) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.log(JSON.stringify({
        username: username,
        salt: salt,
        hash: hash
      }));
    });
  });
};

if (require.main === module) {
  if (process.argv[2] === 'generate' && process.argv.length == 5) {
    auth.generate(process.argv[3], process.argv[4]);
  } else if (process.argv[2] === 'check' && process.argv.length == 5) {
    auth.authenticate_shadow(process.argv[3], process.argv[4], function(res) {
      if (res === false) { console.log("bad"); }
      else { console.log("good"); }
    });
  } else {
    console.log('auth.js [check|generate] username password');
  }
}

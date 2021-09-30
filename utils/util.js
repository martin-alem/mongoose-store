const crypto = require('crypto');
const { createHash } = require("crypto");

function signCookie(rawCookie) {
  const sign = crypto.createSign('SHA256');
  sign.update(rawCookie);
  sign.end();
  const signature = sign.sign(process.env.PRIVATE_KEY);
  return signature;
}

function verifyCookie(cookie, signature) {
  const verify = crypto.createVerify('SHA256');
  verify.update(cookie);
  verify.end();
  return verify.verify(process.env.PUBLIC_KEY, signature);
}

function hashData(data) {
  const hash = createHash("sha256");

  hash.update(data);
  return hash.digest("hex");
}

module.exports = { signCookie, verifyCookie, hashData };

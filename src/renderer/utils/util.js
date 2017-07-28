const url = require('url');
const crypto = require('crypto');

/**
 * Util module to implement the safe strategy.
 */
export default class Util {
  /**
   * Hmac-sha1 Crypt and return value already encoded with base64.
   * @param encodedFlags    flag used to encode the key.
   * @param secretKey       Qiniu secret key, you can get it in
   *                        "https://portal.qiniu.com/user/key"
   */
  static hmacSha1(encodedFlags, secretKey) {
    const hmac = crypto.createHmac('sha1', secretKey);
    hmac.update(encodedFlags);
    return hmac.digest('base64');
  }

  /**
   * base64 to url safe with Qiniu standard.
   * @param v    base64 string
   */
  static base64ToUrlSafe(v) {
    return v.replace(/\//g, '_').replace(/\+/g, '-');
  }

  /**
   * UrlSafe Base64 Decode.
   * @param jsonFlag
   */
  static urlsafeBase64Encode(jsonFlags) {
    const encoded = new Buffer(jsonFlags).toString('base64');
    return this.base64ToUrlSafe(encoded);
  }

  /**
   * generate AccessToken to manage the QBox.
   * @param mac         AK&SK object
   * @param requestURI  callback requestURI
   * @param reqBody     requst body, needed while ContentType be
   *                    application/x-www-form-urlencoded
   */
  static generateAccessToken(mac, requestURI, reqBody) {
    const u = url.parse(requestURI);
    const path = u.path;
    let access = `${path}\n`;

    if (reqBody) {
      access += reqBody;
    }

    const digest = this.hmacSha1(access, mac.secretKey);
    const safeDigest = this.base64ToUrlSafe(digest);
    return `QBox ${mac.accessKey}:${safeDigest}`;
  }
}

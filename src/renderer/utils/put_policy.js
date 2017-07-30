/**
 *  @module   : Module to generate put policy and upload token 
 *  @author   : Gin (gin.lance.inside@hotmail.com)
 */
import Util from './util';

export default class PutPolicy {
  /**
   * Generate put policy class.
   *
   * @param scope       must have this attr.
   *                    the other option could find in 
   *                    https://developer.qiniu.com/kodo/manual/1206/put-policy
   *
   * @return PutPolicy
   */
  constructor(options) {
    if (typeof options !== 'object') {
      throw new Error('invalid putpolicy options');
    }

    this.scope = options.scope || null;
    this.isPrefixalScope = options.isPrefixalScope || null;
    this.expires = options.expires || 3600;
    this.insertOnly = options.insertOnly || null;

    this.saveKey = options.saveKey || null;
    this.endUser = options.endUser || null;

    this.returnUrl = options.returnUrl || null;
    this.returnBody = options.returnBody || null;

    this.callbackUrl = options.callbackUrl || null;
    this.callbackHost = options.callbackHost || null;
    this.callbackBody = options.callbackBody || null;
    this.callbackBodyType = options.callbackBodyType || null;
    this.callbackFetchKey = options.callbackFetchKey || null;

    this.persistentOps = options.persistentOps || null;
    this.persistentNotifyUrl = options.persistentNotifyUrl || null;
    this.persistentPipeline = options.persistentPipeline || null;

    this.fsizeLimit = options.fsizeLimit || null;
    this.fsizeMin = options.fsizeMin || null;
    this.mimeLimit = options.mimeLimit || null;

    this.detectMime = options.detectMime || null;
    this.deleteAfterDays = options.deleteAfterDays || null;
    this.fileType = options.fileType || null;
  }

  /**
   * make the PutPolicy to json string
   *
   * @return string
   */
  getFlags() {
    let flags = {};
    const attrs = ['scope', 'isPrefixalScope', 'insertOnly', 'saveKey', 'endUser',
      'returnUrl', 'returnBody', 'callbackUrl', 'callbackHost',
      'callbackBody', 'callbackBodyType', 'callbackFetchKey', 'persistentOps',
      'persistentNotifyUrl', 'persistentPipeline', 'fsizeLimit', 'fsizeMin',
      'detectMime', 'mimeLimit', 'deleteAfterDays', 'fileType'
    ];

    for (let i = attrs.length - 1; i >= 0; i--) {
      if (this[attrs[i]] !== null) {
        flags[attrs[i]] = this[attrs[i]];
      }
    }

    flags['deadline'] = this.expires + Math.floor(Date.now() / 1000);

    return flags;
  }

  /**
   * generate upload token
   *
   * @param mac      an object contain sk and ak
   *
   * @return string
   */
  uploadToken(mac) {
    const flags = this.getFlags();
    const encodedFlags = Util.urlsafeBase64Encode(JSON.stringify(flags));
    const encoded = Util.hmacSha1(encodedFlags, mac.secretKey);
    const encodedSign = Util.base64ToUrlSafe(encoded);
    const uploadToken = mac.accessKey + ':' + encodedSign + ':' + encodedFlags;
    return uploadToken; 
  }
}
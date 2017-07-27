// load Util class
import Util from './util';

// commonJs load modules
const rp = require('request-promise');
const qiniuHost = 'http://rs.qbox.me';

/**
 * Qiniu module to implement all apis.
 */
export default class Qiniu {
  /**
   * list all buckets
   * @param ak   accessKey
   * @param sk   secretKey
   */
  static async buckets(ak, sk) {
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };
    const requestURI = `${qiniuHost}/buckets`;
    const reqBody = '';
    const accessToken = Util.generateAccessToken(mac, requestURI, reqBody);

    const options = {
      uri: requestURI,
      headers: {
        Authorization: accessToken,
      },
      json: true,
    };

    return rp(options);
  }
}

// load Util class
import Util from './util';

// commonJs load modules
const request = require('request');
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
  static buckets(ak, sk) {
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };
    const requestURI = `${qiniuHost}/buckets`;
    const reqBody = '';
    const accessToken = Util.generateAccessToken(mac, requestURI, reqBody);
    const options = {
      url: requestURI,
      headers: {
        Authorization: accessToken,
      },
    };
    request(options, (err, res, body) => {
      return JSON.parse(body);
    });
  }
}

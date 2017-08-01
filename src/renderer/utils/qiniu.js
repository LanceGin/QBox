// load Util class
import Util from './util';

// commonJs load modules
const rp = require('request-promise');

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
    const requestURI = 'http://rs.qbox.me/buckets';
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

  /**
   * list all files in a bucket
   * @param ak     accessKey
   * @param sk     secretKey
   * @param bucket bucket name
   */
  static async list(ak, sk, bucket) {
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };
    const requestURI = `http://rsf.qbox.me/list?bucket=${bucket}`;
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

  /**
   * list the domain of a bucket
   * @param ak     accessKey
   * @param sk     secretKey
   * @param bucket bucket name
   */
  static async domain(ak, sk, bucket) {
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };
    const requestURI = `http://api.qiniu.com/v6/domain/list?tbl=${bucket}`;
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

  /**
   * delete a file from a bucket
   * @param ak     accessKey
   * @param sk     secretKey
   * @param bucket bucket name
   * @patam key    item key
   */
  static async delete(ak, sk, bucket, key) {
    const entry = `${bucket}:${key}`;
    const encodedEntryURI = Util.urlsafeBase64Encode(entry);
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };
    const requestURI = `http://rs.qiniu.com/delete/${encodedEntryURI}`;
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

  /**
   *  batch management, delete, download etc.
   *
   */
  static async batchDelete(ak, sk, bucket, items) {
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };

    let query = '';
    items.forEach((item) => {
      const entry = `${bucket}:${item.key}`;
      const encodedEntryURI = Util.urlsafeBase64Encode(entry);
      query += `op=/delete/${encodedEntryURI}&`;
    });
    query = query.substring(0, query.length - 1);

    const requestURI = `http://rs.qiniu.com/batch?${query}`;
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

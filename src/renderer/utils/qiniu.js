// load Util class
import Util from './util';

// commonJs load modules
const rp = require('request-promise');

/**
 * Qiniu module to implement all apis.
 */
export default class Qiniu {
  /**
   * auto get the bucket zone
   * @param ak       accessKey
   * @param bucket   bucket name
   */
  static async autoZone(ak, bucket) {
    const requestURI = `https://uc.qbox.me/v2/query?ak=${ak}&bucket=${bucket}`;
    const options = {
      uri: requestURI,
      json: true,
    };

    return rp(options);
  }

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
   * drop an exist bucket
   * @param ak      accessKey
   * @param sk      secretKey
   * @param name    bucket name
   */
  static async drop(ak, sk, name) {
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };
    const requestURI = `http://rs.qiniu.com/drop/${name}`;
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
   * create new bucket
   * @param ak      accessKey
   * @param sk      secretKey
   * @param name    bucket name
   * @param region  bucket region
   */
  static async mkbucket(ak, sk, name, region) {
    const encodedBucketName = Util.urlsafeBase64Encode(name);
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };
    const requestURI = `http://rs.qiniu.com/mkbucketv2/${encodedBucketName}/region/${region}`;
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
  static async list(ak, sk, bucket, marker = '', prefix = '') {
    const mac = {
      accessKey: ak,
      secretKey: sk,
    };
    const requestURI = `http://rsf.qbox.me/list?bucket=${bucket}&limit=100&marker=${marker}&prefix=${prefix}`;
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

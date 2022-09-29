const crypto = require("node:crypto");
const base64 = require("base-64");
const axios = require("axios");
const siteModel = require("../models/site");
const settingModel = require("../models/setting");

const decodeSess = (sess) => {
    let [signature, timeBase64, dataBase64] = sess.split("#");
    let timeBuffer = Buffer.from(timeBase64, "base64");
    let dataBuffer = Buffer.from(dataBase64, "base64");
    let data = JSON.parse(base64.decode(dataBase64));
    return {
        signature,
        timeBuffer,
        dataBuffer,
        data
    }
}
const sign = (timeSignedBuffer, dataBuffer, userAgent, ipAddr) => {
    const signature = crypto
      .createHmac("sha1", process.env.PRIVATE_KEY)
      .update(`${userAgent}\n${ipAddr}`)
      .update(timeSignedBuffer)
      .update(dataBuffer)
      .digest("base64");
    return signature;
}
const isValidSess = (sess, userAgent, ipAddr) => {
    let { timeBuffer, dataBuffer, signature } = decodeSess(sess);
    let signedResult = sign(timeBuffer, dataBuffer, userAgent, ipAddr);
    return signedResult === signature;
}
const getMainDomain = (subDomain) => {
    let segments = subDomain.split(".");
    let domain = "";
    for(let i = 0; i < segments.length; i++) {
        if (i > 0) {
            domain += `.${segments[i]}`;
        }
    }
    return domain;
}
const getFormQueryStr = (data) => {
    let items = [];
    Object.keys(data).forEach((key, idx) => {
        if (Array.isArray(data[key])) {
            for (let item of data[key]) {
                items.push(key + "[]" + "=" + encodeURIComponent(item));
            }
        } else {
            items.push(key + "=" + encodeURIComponent(data[key]));
        }
    });
    let dataQuery = items.join("&");
    return dataQuery;
}
const genSess = (dataBuffer, userAgent, ipAddr) => {
    let now = new Date().getTime();
    let timeSignedBuffer = Buffer.alloc(4);
    timeSignedBuffer.writeInt32LE(parseInt(now / 1000), 0);
    let signature = sign(timeSignedBuffer, dataBuffer, userAgent, ipAddr);
    return `${signature}#${timeSignedBuffer.toString("base64")}#${dataBuffer.toString("base64")}`;
}
const getMembership = async (uid, lid, siteUrl) => {
    try {
        let site = await siteModel.findOne({url: siteUrl});
        // serverLog.error(`Missing config for ${siteUrl}`);
        let { data } = await axios.get(`${siteUrl}/wp-content/plugins/indeed-membership-pro/apigate.php?ihch=${site.membershipApiKey}&action=verify_user_level&uid=${uid}&lid=${lid}`);
        return data.response;
    } catch (err) {
        return false;
    }
}
const isAccessable = async (uid, site) => {
    let setting = await settingModel.findOne();
    let check = false;
    for(let i = 0; i < setting.membershipLids.length; i++) {
        let lid = setting.membershipLids[i];
        let result = await getMembership(uid, lid, site);
        if (result != 0) {
            check = true;
            break;
        }
    }
    return check;
}

module.exports = {
    decodeSess,
    isValidSess,
    genSess,
    isAccessable,
    getMainDomain,
    getFormQueryStr
}
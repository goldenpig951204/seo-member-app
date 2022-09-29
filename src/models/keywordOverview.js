const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const keywordOverViewSchema = new Schema({
    username: String,
    userId: Number,
    site: String,
    proxyType: String,
    phases: [String],
    time: {
      type: Date,
      default: Date.now,
      required: true,
    }
});

keywordOverViewSchema.statics.countRequests = async function(userId, username, site, proxyType) {
    const todayEnd = moment().endOf("d").utc();
    const todayStart = moment().startOf("d").utc();
    return await this.count({
        userId,
        username,
        site,
        proxyType,
        time: {
            $gte: todayStart,
            $lte: todayEnd,
        }
    });
}

const keywordOverview = mongoose.model("keywordoverview", keywordOverViewSchema);

module.exports = keywordOverview;
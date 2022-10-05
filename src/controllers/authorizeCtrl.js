const proxyModel = require("../models/proxy");
const index = async (req, res) => {
    let domain = req.headers["host"];
    let proxy = await proxyModel.findOne({domain});
    
    if (proxy.type == "seolyze") {
        res.status(301).redirect("/EPS-KF/");
    } else {
        res.status(301).redirect("/");
    }
}

module.exports = {
    index
}
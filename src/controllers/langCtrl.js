const { getMainDomain } = require("../services/utils");

const semrush = (req, res) => {
    let domain = req.headers["host"];
    let { prefix } = req.query;
    prefix = prefix.split("/")[0];
    res.cookie("prefix", prefix, {
        path: "/",
        domain: process.env.NODE_ENV === "development" ? undefined : getMainDomain(domain)
    });
    res.status(301).redirect("/projects");
}


const spyfu = (req, res) => {
    let domain = req.headers["host"];
    let { prefix, prev_url } = req.query;
    res.cookie("prefix", prefix, {
        path: "/",
        domain: process.env.NODE_ENV === "development" ? undefined : getMainDomain(domain)
    });
    res.status(301).redirect(prev_url);
}

module.exports = {
    semrush,
    spyfu
}
const index = async (req, res) => {
    res.status(301).redirect("/");
}

module.exports = {
    index
}
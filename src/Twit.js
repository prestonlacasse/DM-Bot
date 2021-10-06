import Twit from "twit";

const config = require("../config");
const T = new Twit(config.twitterApp);

module.exports = T;

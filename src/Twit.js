import Twit from "twit";
import config from "../config"

export const T = new Twit(config.twitterApp);

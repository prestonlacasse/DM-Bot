import Twit from "twit";
import { config } from "../config.js";

export const T = new Twit(config.twitterApp);

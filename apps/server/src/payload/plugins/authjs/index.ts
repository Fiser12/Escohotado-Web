import { authjsPlugin } from "payload-authjs";
import { authConfig } from "./auth.config";

const config = authjsPlugin({ authjsConfig: authConfig })

export default config;
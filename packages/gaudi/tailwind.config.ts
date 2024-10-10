import type { Config } from "tailwindcss"
import sharedConfig from "config"

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./src/**/*.svelte"],
  presets: [sharedConfig],
}

export default config
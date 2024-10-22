/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss"
import sharedConfig from "config/tailwind.config"

const config: Pick<Config, "prefix" | "presets"> = {
  presets: [sharedConfig],
}

export default config

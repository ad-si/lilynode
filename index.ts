import * as fs from "fs/promises"
import temp from "temp"
import { execFile } from "child_process"
import { promisify } from "util"

const execFileAsync = promisify(execFile)

export type ConfigOptions = {
  format?: "midi" | "pdf" | "ps" | "png" | "svg" | "eps"
  resolution?: number // In ppcm
  binaryPath?: string
}

export const defaultOptions: ConfigOptions = {
  format: "png",
  resolution: 50,
  binaryPath: "lilypond",
}

export async function render(lilypond: string, options: ConfigOptions) {
  const tempPath = temp.path({ suffix: ".ly" })
  await fs.writeFile(tempPath, lilypond, { encoding: "utf8" })
  return await renderFile(tempPath, options)
}

export async function renderFile(
  filePath: string, // Path to the .ly file
  options: ConfigOptions = defaultOptions
) {
  const optionsNorm = Object.assign({}, defaultOptions, options)
  const formatMap = {
    midi: "",
    pdf: "--pdf",
    png: "--png",
    ps: "--ps",
    svg: "--svg",
    eps: "--eps",
  }
  const isSupportedFormat = Boolean(
    optionsNorm.format &&
      typeof formatMap[optionsNorm.format] !== "undefined" &&
      formatMap[optionsNorm.format] !== null
  )

  if (!isSupportedFormat) {
    throw new Error(optionsNorm.format + " is not a supported export format")
  }

  const tempName = temp.path()
  const tempFile = tempName + "." + optionsNorm.format
  const binaryPath = optionsNorm.binaryPath || "lilypond"

  const result = await execFileAsync(
    binaryPath,
    [
      optionsNorm.format ? formatMap[optionsNorm.format] || "" : "",
      [
        "--define-default",
        "resolution=" + (optionsNorm.resolution || 1) * 2.54,
      ],
      ["--define-default", "no-point-and-click"],
      "--silent",
      ["--output", tempName],
      filePath,
    ].flat()
  )

  if (result.stderr) {
    throw new Error(result.stderr)
  } //
  else {
    return await fs.readFile(tempFile, {})
  }
}

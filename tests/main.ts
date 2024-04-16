import * as fs from "fs/promises"
import path from "path"
import { render, renderFile, ConfigOptions } from "../index"
import assert from "assert"

const testFile = path.join(__dirname, "fixtures/test.ly")
const tests: { name: string; options: ConfigOptions }[] = [
  {
    name: "midiTest",
    options: {
      format: "midi",
    },
  },
  {
    name: "pdfTest",
    options: {
      format: "pdf",
    },
  },
  {
    name: "pngTest",
    options: {
      format: "png",
      resolution: 30,
    },
  },
  {
    name: "psTest",
    options: {
      format: "ps",
    },
  },
  {
    name: "svgTest",
    options: {
      format: "svg",
    },
  },
]

async function renderTestFile(name: string, options: ConfigOptions) {
  const pdf = await renderFile(testFile, options)

  console.info("✅ Rendered " + name)

  await fs.writeFile(
    path.join(__dirname, "build", name + "." + options.format),
    pdf,
    { encoding: "binary" }
  )
}

async function main() {
  await fs.mkdir(path.join(__dirname, "build")).catch((errMsg) => {
    if (errMsg.code !== "EEXIST") {
      throw errMsg
    }
  })

  for (const test of tests) {
    renderTestFile(test.name, test.options)
  }

  // Test rendering from string
  const lilypondString = `
\\version "2.18.2"

\\score {
  \\relative c {
    \\clef bass
    \\key c \\minor
    \\time 3/4

    c <c e a> d8 e <f a> g a b c4 d2 e4
  }

  \\midi {}
  \\layout { }
}
`

  const svg = await render(lilypondString, { format: "svg" })
  assert.equal(String(svg).slice(0, 11), "<svg xmlns=")
  console.info("✅ Rendered SVG from LilyPond string")
}

main()

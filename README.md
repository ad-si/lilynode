# LilyNode

LilyNode is a Node.js wrapper for [LilyPond](https://lilypond.org/).


## Installation

```sh
npm install lilynode
```


## Usage

```js
import { renderFile } from "lilynode"

const pdf = await renderFile(
  filePath, // Path to LilyPond file
  options,  // Options object to configure the rendering
)

// or

const pdf = await render(
  "…", // Content of a LilyPond file
  options,
)
```


### Available Options

`format: "midi" | "pdf" | "ps" | "png" | "svg"` - File format of output file \
Default value: `png`

`resolution: number` - Resolution of output in ppcm (only available for PNGs) \
Default value: `50`

`binaryPath: string` - Path to lilypond binary \
Default value: `lilypond`


## Development

Check out the [makefile](./makefile) for all available commands.

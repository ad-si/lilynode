# LilyNode

## Installation

```
$ npm install lilynode
```


## Usage

### Require

Require LilyNode in your programs:

```
var lilynode = require('lilynode')
```


### Interface

```
lilynode.renderFile(filePath, options, callback)
```


#### filePath

Path to LilyPond file to get rendered


#### options

Options object to configure the rendering

##### Available properties

`format`: File format of output file  
Type: String  
Possible values:

- midi
- pdf
- ps
- png
- svg

Default value: png

`resolution`: Resolution of output in ppcm (only available for png format)  
Type: Number  
Default value: 50


#### callback

Callback is a function which gets the two arguments `error` and `output` passed.
`output` is a buffer containing the rendered file which can then for example be saved to a file.

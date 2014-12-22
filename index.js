var path = require('path'),
	fs = require('fs'),
	temp = require('temp'),
	childProcess = require('child_process')


// TODO: Return promise when no callback is given

module.exports.render = function (lilypondString, options, callback) {
	// TODO
}

module.exports.renderSync = function (lilypondString, options) {
	// TODO
	return
}


module.exports.renderFile = function (filePath, options, callback) {

	var defaults = {
			format: 'png',
			resolution: 50 // ppcm
		},
		formatMap = {
			png: '--png',
			pdf: '--pdf',
			svg: '-d backend=svg'
		},
		isSupportedFormat,
		tempName,
		tempFile,
		shellCommand,
		key


	// Set defaults
	for (key in defaults)
		if (defaults.hasOwnProperty(key))
			options[key] = options[key] || defaults[key]

	isSupportedFormat = formatMap[options.format]

	if (!isSupportedFormat) {
		callback(new Error(options.format + ' is no supported export format.'))
		return
	}

	tempName = temp.path()
	tempFile = tempName + '.' + options.format


	shellCommand = [
		'lilypond',
		formatMap[options.format] || '',
		'-d resolution=' + (options.resolution * 2.54),
		'-d no-point-and-click',
		'--silent',
		'--output ' + tempName,
		filePath
	]

	childProcess.exec(
		shellCommand.join(' '),
		function (error, stdout, stderr) {

			if (error) {
				callback(error)
				return
			}

			fs.readFile(tempFile, {}, function (error, data) {

				if (error) {
					callback(error)
					return
				}
				else
					callback(null, data)


				fs.unlink(tempFile, function (error) {
					if (error && error.code !== 'ENOENT')
						throw error
				})
				fs.unlink(tempName + '.midi', function (error) {
					if (error && error.code !== 'ENOENT')
						throw error
				})
			})
		}
	)
}

module.exports.renderFileSync = function (filePath, options) {
	// TODO
	return
}

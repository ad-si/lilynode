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

	var tempName,
		tempFile,
		shellCommand


	tempName = temp.path()
	tempFile = tempName + '.png'

	shellCommand = 'lilypond --png --silent ' +
	               '--output ' + tempName + ' ' +
	               filePath

	childProcess.exec(shellCommand, function (error, stdout, stderr) {

		if (error)
			callback(error)

		fs.readFile(tempFile, {}, function (error, data) {

			error = error || null

			callback(error, data)
		})

		fs.unlink(tempFile, function (error) {
			if (error && error.code !== 'ENOENT') throw error
		})
		fs.unlink(tempName + '.midi', function (error) {
			if (error && error.code !== 'ENOENT') throw error
		})
	})
}

module.exports.renderFileSync = function (filePath, options) {
	// TODO
	return
}

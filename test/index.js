var fs = require('fs'),
	path = require('path'),
	lilynode = require('../index'),
	testFile = path.join(__dirname, 'fixtures/test.ly'),
	tests = [
		{
			name: 'midiTest',
			format: 'midi'
		},
		{
			name: 'pdfTest',
			format: 'pdf'
		},
		{
			name: 'pngTest',
			format: 'png',
			resolution: '30'
		},
		{
			name: 'psTest',
			format: 'ps'
		},
		{
			name: 'svgTest',
			format: 'svg'
		}
	]


function renderFile (options) {

	lilynode.renderFile(
		testFile,
		options,
		function (error, output) {

			if (error)
				throw error

			else {

				console.log('Rendered ' + options.name)

				fs.writeFileSync(
					'build/' + options.name + '.' + options.format,
					output,
					{encoding: 'binary'}
				)
			}
		}
	)
}


tests.forEach(function (options) {
	renderFile(options)
})

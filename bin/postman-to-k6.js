#!/usr/bin/env node

var program = require('commander')
var fs = require('fs')
var convertFile = require('../lib/convert/file')

// describe the options and usage instruction for the `convert` command
program
  .version(require('../package.json').version)
  .usage('<filePath> [options]')
  .description('Convert a Postman collection to k6 script')
  .option(
    '-j --input-version <version>',
    'Input version. Options `2.0.0` or `1.0.0`. Default `2.0.0`.', /^(2\.0\.0|1\.0\.0)$/,
    '2.0.0'
  )
  .option(
    '-o --output <path>',
    'Output file path. If not specified writes to stdout.'
  )
  .action(run)

program.parse(process.argv)

function run (path, options) {
  // Convert
  const version = options.inputVersion
  let result
  try {
    result = convertFile(path, version)
  } catch (e) {
    console.error(e.message)
    return
  }

  // Output
  if (options.output) {
    fs.writeFile(options.output, result, function (error) {
      if (error) {
        console.error('could not create output ' + options.output)
        console.error(error)
      }
    })
  } else {
    console.log(result)
  }
}

'use strict'

var fs = require('fs')
const exec = require('child_process').exec
const mv = requre('mv') // not using yet
const tempy = require('tempy')
const fs = require('fs-extra')
const globby = require('globby')

class AudioToolkit {
  constructor() {
    // in case we need some instantiated object data
  }

  // resolves to an array of converted files
  convertFormat = function(srcFiles, destFormat) {
    // TODO, check that all extensions in srcFiles match
    if (!destFormat) destFormat = 'flac' // default format
    const tmpSrcDir = tempy.directory()
    const tmpDestDir = tempy.directory()
    // copy files to tmp directory, process entire folder, resolve array of converted files
    return copyFiles(srcFiles, tmpSrcDir).then(
      audioProcess(tmpSrcDir, 'convertFormat', destFormat, tmpDestDir).then(
        globby(tmpDestDir+'*.'+destFormat).then((paths) => paths);
      )
    )
  }

  // joins files, resolves to destFile
  mergeFiles = function(srcFiles, destFile) {
    if (!destFile) destFile = tempy.file() // if no dest specified, returns tmp
    const tmpSrcDir = tempy.directory()
    const tmpDestDir = tempy.directory()
    const tmpDestFileName =  path.basename(destFile)
    return copyFiles(srcFiles, tmpSrcDir).then(
      audioProcess(tmpSrcDir, 'mergeFiles', tmpDestDir, tmpDestFileName).then(
        fs.copy(tmpDestDir+tmpDestFileName, destFile).then(
          () => destFile
        )
      )
    )
  }

  // insert one file into another, resolves to destFile
  insertFragment = function(srcFile, fragmentFile, position, destFile) {
    if (!srcFile||!fragmentFile||!position)
     throw "InsertFragment warning: srcFile, fragmentFile and position are required fields"
    if (!destFile) destFile = tempy.file() // if no dest specified, returns tmp
    const tmpDir = tempy.directory()
    const tmpSrc = tmpDir + 'sourceAudio.'+ path.extname(srcFile)
    const tmpFrag = tmpDir + 'fragAudio.'+ path.extname(srcFile)
    const tmpDest = tmpDir + 'destAudio.'+ path.extname(srcFile)
    return fs.copy(srcFile, tmpSrc).then(
      fs.copy(fragementFile, tmpFrag).then(
        audioProcess(tmpDir, 'insertFragment', fileName(tmpSrc), fileName(tmpFrag), position, fileName(tmpDest)).done(
          fs.copy(tmpDest, destFile).then(
            () => destFile
          )
        )
      )
    )


    copyFiles([srcFile], tmpDir).then(
      audioProcess(tmpDir, 'insertFragment', fragmentFile, pos, destFile)
    )
  }

  module.exports.deleteAudio = function(inputFile, fromPos, toPos, outputFile) {
    let inputFileName = inputFile.split('/').pop();
    createTempFolder(inputFile)
    .then((folderPath) => {
      audioProcess(folderPath, 'deleteAudio', inputFileName, fromPos, toPos)
      .then((output) => {
        // Copy the temporary output file to outputFile location

        // Remove the temporary folder

      })
      .catch((err) => {
        reject(err);
      })
    })
    .catch((err) => {
      reject(err)
    })
  }

  // deletes section, resolves to destFile
  deleteSection(srcFile, pos, len, [destFile]) {
    if (!destFile) destFile = tempy.file() // if no dest specified, returns tmp
    return copyFiles([srcFile], tmpDir).then(
      audioProcess(tmpDir, 'insertFragment', fragmentFile, pos, destFile)
    )


    audioProcess(folderPath, 'deleteAudio', inputFileName, fromPos, toPos)
  }


  // - replaceSection(srcFile, fragmentFile, pos, len) // replaces section, resolves to destFile
  // - splitFile(srcFile, pos, [destFiles]) // splits audio at pos
  // - audioMetaData(srcFile) // returns file size, audio length, format, bitrate etc.
  // - normalizeLevels(srcFile, [destFile], [options]) // adjust volume levels
  // - normalizeWhiteSpace(srcFile, [destFile], [options]) // time between words and start/stop



}

module.exports = AudioToolkit


/*
   Internal utilities, not exported
*/

function

function changeExt(fp, ext) {
  let parts = fp.split('.')
  parts[parts.length-1] = ext
  return parts.join('.')
}
function fileName(fp, ext) {
  let fn = path.basename(fp)
  if (ext) fn = changeExt(fp, ext)
  return fn
}

function fileExt(fp) {
  return path.extname(fp)
}

// resolves to a new temp directory unless tmpDir already exists
getTmpDir(tmpDir) {
  return new Promise(function(resolve, reject) {
    try {
      fs.access(tmpDir, () => resolve true);
    } catch (e) {
      resolve tempy.directory()
    }
  })
}

// copy array of files to folder returns a promise
copyFiles(srcFiles, destDir) {
  return Promise.All( srcFiles.map((src) => fs.copy(src, destDir)) )
}









/*


module.exports.deleteAudio = function(inputFile, fromPos, toPos, outputFile) {
  let inputFileName = inputFile.split('/').pop();
  createTempFolder(inputFile)
  .then((folderPath) => {
    audioProcess(folderPath, 'deleteAudio', inputFileName, fromPos, toPos)
    .then((output) => {
      // Copy the temporary output file to outputFile location

      // Remove the temporary folder

    })
    .catch((err) => {
      reject(err);
    })
  })
  .catch((err) => {
    reject(err)
  })
}

module.exports.replaceAudio = function(inputFile, segmentFile, fromPos, toPos, outputFile) {
  let inputFileName = inputFile.split('/').pop();
  let segmentFileName = segmentFile.split('/').pop();
  createTempFolder(inputFile, segmentFile)
  .then((folderPath) => {
    audioProcess(folderPath, 'replaceAudio', inputFileName, segmentFileName, fromPos, toPos)
    .then((output) => {
      // Copy the temporary output file to outputFile location

      // Remove the temporary folder

    })
    .catch((err) => {
      reject(err);
    })
  })
}

module.exports.extractFile = function(inputFile, fromPos, toPos, outputFile) {

}

module.exports.splitFile = function(inputFile, atPos, outputFile1, outputFile2) {
  let inputFileName = inputFile.split('/').pop();
  createTempFolder(inputFile)
  .then((folderPath) => {
    audioProcess(folderPath, 'splitFile', inputFileName, atPos)
    .then((output) => {
      // Copy the temporary output files to outputFile1 and outputFile2

      // Remove the temporary folder

    })
    .catch((err) => {
      reject(err);
    })
  })
}

module.exports.joinFiles = function(outputFile, ...inputFiles) {
  let extension = inputFiles[0].split('.').pop();
  // Throw an error if the inputFiles are not all the same extension


  createTempFolder(inputFiles...)
  .then((folderPath) => {
    return audioProcess(folderPath, 'combineAllFiles', extension)
  })
  .catch((err) => {
    reject(err);
  })
}

prepEnvironment = function(){
  return new Promise(function(resolve, reject) {
    let docker = exec('"eval $(docker-machine env default)"')
    docker.stdout.on('close', code => {
      resolve($(code))
    })
    docker.stdout.on('exit', code => {
      resolve($(exit))
    })
    docker.stdout.on('error', err => {
      reject(err)
    })
  }
}

function audioProcess(folderPath, taskName, ...args){
  return new Promise(function(resolve, reject) {
    fs.ensureDir(folderPath, function(err){
      if(err) reject(err)
      else {
        let prep = prepEnvironment()
        prep.then(function(result){
          let docker = exec("'docker' run --rm -d -v " + folderPath + ":/data /app/" + taskName + ".sh " + join(' ', args))
          docker.stdout.on('close', code => {
            resolve($(code))
          })
          docker.stdout.on('exit', code => {
            resolve($(exit))
          })
          docker.stdout.on('error', err =>{
            reject(err)
          })
        },
        function(err) {
          reject(err)
        })
      }
    }
  }
}

function createTempFolder(...files) {
  return new Promise(function(resolve, reject){
    // create a new temporary folder

    // copy all ...files into temporary folder

    // ensure that the files were properly copied to the folder

    // resolve with name of the temporary folder

  })
}

*/

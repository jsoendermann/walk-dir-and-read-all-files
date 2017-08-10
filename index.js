const Walker = require('walker')
const fs = require('fs')

module.exports = (dir, filetype = '') =>
  new Promise((resolve, reject) => {
    let ret = []
    Walker(dir)
      .on('file', fileName => {
        if (!fileName.endsWith(filetype)) {
          return
        }
        const fileContents = fs.readFileSync(fileName, 'utf-8')
        ret.push(fileContents)
      })
      .on('error', error => reject(error))
      .on('end', () => resolve(ret))
  })

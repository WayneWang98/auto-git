const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const path = require('path')
const fs = require('fs')
const childProcess = require('child_process');
const { updateFiles } = require('./config/index')

// const dir = path.join(process.cwd(), 'test-clone')
// git.clone({ fs, http, dir, url: 'https://github.com/isomorphic-git/lightning-fs' }).then(console.log)

const runService = (version) => {
  const message = 'upgrade app to ' + version
  const fileAdd = updateFiles.map(item => path.join(__dirname, item.path)).join(' ')
  const cmd = `git add ${fileAdd} && git commit -m "${message}" && git log`

  console.log(fileAdd, 'fileAdd', cmd)
  childProcess.execSync(cmd)
}

module.exports = {
  runService
}
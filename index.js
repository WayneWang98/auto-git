const fs = require('fs')
const path = require('path')
const { updateFiles } = require('./config/index')
const { runService } = require('./service')

const UTF8 = 'utf-8'
let packageVersion = ''

const getNewVersion = (versionStr, level) => {
  const versionArr = versionStr.split('.').map(item => parseInt(item))
  switch (level) {
    case 'main': {
      versionArr[0] ++
      versionArr[1] = 0
      versionArr[2] = 0
      break
    }
    case 'feature': {
      versionArr[1] ++
      versionArr[2] = 0
      break
    }
    case 'bugfix': {
      versionArr[2] ++
      break
    }
    default: {
      throw new Error('You must have a uprade level param!')
    }
  }
  return versionArr.join('.')
}

const updateSingleFileVersion = (content, path, fields) => {
  let fileStr = content
  for (const key in fields) {
    const field = fields[key]
    const { reg } = field
    
    const matchStr = fileStr.match(reg)[0]
    
    reg.test(fileStr)
    const versionStr = RegExp.$1
    const [, , scriptParam] = process.argv
    const newVersion = getNewVersion(versionStr, scriptParam)
    packageVersion = newVersion
    fileStr = fileStr.replace(reg, matchStr.replace(versionStr, newVersion))
  }
  
  
  fs.writeFileSync(path, fileStr, 'utf-8')
}

const main = () => {
  updateFiles.forEach(item => {
    let { path: filePath, fields } = item
    filePath = path.join(__dirname, filePath)
    const fileContent =  fs.readFileSync(filePath, UTF8)
    updateSingleFileVersion(fileContent, filePath, fields)
  })

  runService(packageVersion)
}

// run upgrade code
main()






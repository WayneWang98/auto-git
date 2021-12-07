const path = require('path')

const updateFiles = [
  {
    path: '/files/build.gradle',
    fields: {
      appVersion: {
        reg: /appVersion = "(\d+\.\d+\.\d+)"/g
      },
      sdkVersion: {
        reg: /sdkVersion = "(\d+\.\d+\.\d+)"/g
      }
    }
  },
  {
    path: '/files/test.json',
    fields: {
      version: {
        reg: /"version": "(\d+\.\d+\.\d+)"/g
      }
    }
  }
]

const upradeLevel = {
  main: 0,
  feature: 1,
  bugfix: 2
}

module.exports = {
  updateFiles
}
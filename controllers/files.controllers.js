const {
  getFileData,
  getFiles,
  getLinesFile
} = require('../services/files.service')

const getData = async (req, res, next) => {
  try {
    const fileName = req.query.fileName
    const response = []

    const { files } = await getFiles()
    for (const file of files) {
      try {
        const data = await getFileData(file)
        const finalFile = getLinesFile({ file, data })
        finalFile.lines.length && response.push(getLinesFile({ file, data }))
      } catch (error) {
        console.log({
          status: error.response.status,
          message: error.response.data.message,
          code: error.response.data.code
        })
      }
    }
    if (fileName) {
      const file = response.filter((file) => file.file === fileName)
      return res.status(200).json(file)
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const getFilesData = async (req, res, next) => {
  try {
    const { files } = await getFiles()
    res.status(200).json(files)
  } catch (error) {
    next(error)
  }
}

module.exports = { getData, getFilesData }

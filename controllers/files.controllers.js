const {
  getFileData,
  getFiles,
  getLinesFile,
} = require('../services/files.service');

const getData = async (req, res, next) => {
  try {
    const response = [];

    const { files } = await getFiles();
    for (const file of files) {
      try {
        const data = await getFileData(file);
        const finalFile = getLinesFile({ file, data });
        finalFile.lines.length && response.push(getLinesFile({ file, data }));
      } catch (error) {
        console.log({
          status: error.response.status,
          message: error.response.data.message,
          code: error.response.data.code,
        });
      }
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { getData };

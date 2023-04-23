const axios = require('axios');

const getFiles = async () => {
  const config = {
    method: 'GET',
    url: `https://echo-serv.tbxnet.com/v1/secret/files`,
    headers: {
      Authorization: `Bearer aSuperSecretKey`,
    },
  };
  const { data } = await axios(config);
  return data;
};
const getFileData = async (filename) => {
  const config = {
    method: 'GET',
    url: `https://echo-serv.tbxnet.com/v1/secret/file/${filename}`,
    headers: {
      Authorization: `Bearer aSuperSecretKey`,
    },
  };
  const { data } = await axios(config);
  return data;
};

const getLinesFile = ({ file, data }) => {
  const dataToReturn = { file };
  const lines = [];
  const linesToProcess = data.split('\n');
  const headers = linesToProcess.shift().split(',');

  for (const lineToProcess of linesToProcess) {
    const contentLine = lineToProcess.split(',');
    if (contentLine.length === headers.length) {
      const finalLine = {};
      let isFormatted = true;
      contentLine.shift();
      contentLine.forEach((content, index) => {
        if (content == '') {
          isFormatted = false;
        }
        finalLine[headers[index + 1]] = +content ? +content : content;
      });
      if (isFormatted) lines.push(finalLine);
    }
  }
  return { ...dataToReturn, lines };
};

module.exports = { getFiles, getFileData, getLinesFile };

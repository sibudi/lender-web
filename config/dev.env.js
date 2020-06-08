'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  UPLOAD_IMAGE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/image"',
  UPLOAD_FILE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/file"',
  BASE_URL:'"https://lender-uat.doitglotech.co.id/"',
  SHOW_IMAGE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/showImage"',
  DOWNLOAD_ATTACHMENT :'"https://lender-uat.doitglotech.co.id/api-upload/upload/downloadAttachment"',
  AFPI_URL:'"https://afpi.or.id/secure/certificates/member.min.js?key=0676dc6e740ded85b58aac6c4f59836a"'
})

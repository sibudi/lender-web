'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  UPLOAD_IMAGE:'"https://lender-api-uat.doitglotech.co.id/public/api-upload/upload/image"',
  UPLOAD_FILE:'"https://lender-api-uat.doitglotech.co.id/public/api-upload/upload/file"',
  BASE_URL:'"https://lender-api-uat.doitglotech.co.id/public/"',
  SHOW_IMAGE:'"https://lender-api-uat.doitglotech.co.id/api-upload/upload/showImage"',
  DOWNLOAD_ATTACHMENT :'"https://lender-api-uat.doitglotech.co.id/public/api-upload/upload/downloadAttachment"',
  AFPI_URL:'"https://afpi.or.id/secure/certificates/member.min.js?key=0676dc6e740ded85b58aac6c4f59836a"',
  AUTHORIZATION_API:'"APPCODE d2a25dc5e5b1416a851ace560e625be4"'
})

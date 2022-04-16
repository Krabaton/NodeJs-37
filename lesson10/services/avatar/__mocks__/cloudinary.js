module.exports = {
  v2: {
    config: () => {},
    uploader: {
      upload: (filepath, options, cb) => {
        cb(null, { public_id: 'cloudId', secure_url: 'urlOfAvatar' })
      },
    },
  },
}

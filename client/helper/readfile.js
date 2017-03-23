export const encode = str => new Buffer(str).toString('base64')

export const decode = str => new Buffer(str, 'base64').toString('utf8')

const { readdirSync, statSync, createWriteStream } = require('fs')
const { join } = require('path')
const path = require('path')
var lambdaPackager = require('lambda-packager')
const here = path.resolve(__dirname)
const dirs = (p) => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
dirs(here).map((e) => {
    console.log(e)
    if (e != 'node_modules') {
        console.log('Building: ' + e)
        lambdaPackager.build({
            from: './' + e,
            to: '../zips/' + e + '.zip'
        }).catch(e => { throw e })
    }
})

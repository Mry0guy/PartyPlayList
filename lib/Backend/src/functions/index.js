const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const path = require('path')
const easyZ = require('easy-zip').EasyZip
const here = path.resolve(__dirname) 
const dirs = (p) => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
dirs(here).map((e) => {
    let Zip = new easyZ()
    Zip.zipFolder(e, () => {
        let name = '../zips/'+ e + '.zip'
        Zip.writeToFile(name, () => {})
    })
})
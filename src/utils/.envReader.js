const fs = require('fs')
const path = require('path')

let envData = []

const env = fs.readFileSync(path.join(__dirname, "..", "..", ".env"))
const envString = env.toString()
const envArray = envString.split(/\r?\n/)
for (const property of envArray) {
  const propertySplitter = property.split('=')
  const propertyObject = {}
  propertyObject.key = propertySplitter[0]
  propertySplitter.shift()
  propertyObject.value = propertySplitter.join('=')
  envData.push(propertyObject)
}

module.exports = envData
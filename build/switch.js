const path = require('path')
const assert = require('assert')
const fs = require('fs-extra')
const { selectVersion } = require('./selectVersion')

const srcDir = path.resolve(__dirname, '../src')

async function backupApi () {
  await fs.copyFile(
    path.join(srcDir, 'api.ts'),
    path.join(srcDir, 'api.backup.ts'),
  )
}

async function restoreApi () {
  await fs.copyFile(
    path.join(srcDir, 'api.backup.ts'),
    path.join(srcDir, 'api.ts'),
  )
  await fs.remove(
    path.join(srcDir, 'api.backup.ts'),
  )
}

async function switchApi (version) {
  assert([2, 3].includes(version))

  await fs.copyFile(
    path.join(srcDir, `api.${version}.ts`),
    path.join(srcDir, 'api.ts'),
  )
}

async function cli () {
  const version = await selectVersion()

  if (version) {
    console.log(`Switch api to ${version}.x`)
    await switchApi(version)
  }
}

module.exports = {
  switchApi,
  backupApi,
  restoreApi,
}

if (require.main === module)
  cli()

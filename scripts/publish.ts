import { execSync } from 'child_process'
import path from 'path'
import { activePackages } from './packages'

execSync('npm run build', { stdio: 'inherit' })

for (const { name } of activePackages)
  execSync('npm publish', { stdio: 'inherit', cwd: path.join('packages', name) })

#!/usr/bin/env node

import { readFile, rm, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import degit from 'degit'

const args = process.argv.slice(2)
const projectName = args.find((arg) => !arg.startsWith('--'))
const shouldInstall = !args.includes('--no-install')

if (args.includes('--help') || args.includes('-h')) {
  printUsage()
  process.exit(0)
}

if (!projectName) {
  printUsage()
  process.exit(1)
}

if (!/^[a-z0-9][a-z0-9._-]*$/.test(projectName)) {
  fail(
    'Le nom doit être compatible avec npm : minuscules, chiffres, tirets, points ou underscores.',
  )
}

const destinationDirectory = path.resolve(process.cwd(), projectName)

console.log(`Création de "${projectName}" avec Boilerkwak...`)

try {
  const emitter = degit('MaximeSeignovert/boilerplate', {
    cache: false,
    force: false,
    verbose: false,
  })

  await emitter.clone(destinationDirectory)
  await personalizeProject(destinationDirectory, projectName)

  if (shouldInstall) {
    console.log('Installation des dépendances...')
    await runCommand('npm', ['install'], destinationDirectory)
  }

  console.log(`\nProjet "${projectName}" prêt.`)
  console.log(`cd ${projectName}`)
  if (!shouldInstall) {
    console.log('npm install')
  }
  console.log('npm run dev')
} catch (error) {
  await rm(destinationDirectory, { recursive: true, force: true })
  fail(error.message)
}

async function personalizeProject(directory, name) {
  await Promise.all([
    rm(path.join(directory, 'packages'), { recursive: true, force: true }),
    rm(path.join(directory, 'scripts'), { recursive: true, force: true }),
  ])

  const packageJsonPath = path.join(directory, 'package.json')
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))
  packageJson.name = name
  delete packageJson.scripts?.create
  await writeJson(packageJsonPath, packageJson)

  const packageLockPath = path.join(directory, 'package-lock.json')
  const packageLock = JSON.parse(await readFile(packageLockPath, 'utf8'))
  packageLock.name = name
  if (packageLock.packages?.['']) {
    packageLock.packages[''].name = name
  }
  await writeJson(packageLockPath, packageLock)

  const indexPath = path.join(directory, 'index.html')
  const indexHtml = await readFile(indexPath, 'utf8')
  await writeFile(
    indexPath,
    indexHtml.replace(/<title>.*?<\/title>/, `<title>${name}</title>`),
    'utf8',
  )
}

function writeJson(filePath, value) {
  return writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function runCommand(command, commandArgs, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      cwd,
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })

    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} a quitté avec le code ${code}`))
      }
    })
  })
}

function printUsage() {
  console.log(`
Usage:
  npm create boilerkwak@latest <nom-du-projet>

Options:
  --no-install  Crée le projet sans installer les dépendances
  -h, --help    Affiche cette aide
`.trim())
}

function fail(message) {
  console.error(`\nErreur : ${message}`)
  process.exit(1)
}

import * as scriptsRecord from './scripts'

const args = process.argv.slice(2)

if (args.length === 0) throw new Error('No arguments provided')

const [target] = args

const scripts = Object.entries(scriptsRecord).map(([key, value]) => ({ name: key, ...value }))

const script = scripts.find((fn) => fn.name === target)

if (!script) throw new Error(`No script found for ${target}`)

script.fn()

import { watch } from 'fs'
import path from 'path'
import { main } from './main'

const options = { persistent: true }
const currentDir = path.dirname(__dirname)

watch(`${currentDir}/router/routes`, options, () => {
  main()
})

import fs from 'fs/promises'
import path from 'path'
import { generateLinkTypes } from '../src'
import { routeManifestExample } from '../assets/routeManifest.example'

async function typeEmitter() {
  await fs.writeFile(
    path.join(__dirname, '../types/router.d.ts'),
    await generateLinkTypes({
      routesDirPath: path.join(__dirname, '../assets/routes'),
      routeManifest: routeManifestExample,
    })
  )
}

typeEmitter()

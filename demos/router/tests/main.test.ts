import { describe, test } from '~/utils'
import { main } from '../main'
import path from 'path'
import { routeManifestExample } from '../routeManifest.example'

describe('Router file type generation: main script', () => {
  test('Progression', () => {
    main({
      routesDirPath: path.join(__dirname, '../routes'),
      routeManifest: routeManifestExample,
    })
  })
})

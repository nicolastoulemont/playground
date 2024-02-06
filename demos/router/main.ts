import { parser } from './parser'
import { getRoutesFileName } from './getRoutesFileName'
import { typeEmitter } from './typeEmitter'
import { computeType } from './computeType'

export async function main() {
  await typeEmitter(computeType(parser(await getRoutesFileName('routes'))))
}

main()

/**
 * Rework to remove one loop
 */

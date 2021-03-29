import { NexeOptions, readOpts } from './options.js'
import { getLogger, gray, green, red } from './logger.js'
import { Readable } from 'node:stream'

export async function nexe(nexeOptions?: Partial<NexeOptions>): Promise<void> {
  const start = Date.now(),
    log = getLogger(nexeOptions)
  log.start()
  let hadError = false
  try {
    const options = await readOpts(nexeOptions)
    await compile(options, await bundle(options), build(options))
  } catch (error) {
    hadError = true
    log.fail(gray(error.nexe || error.stack || error.code || error))
  } finally {
    const duration = Math.abs((start - Date.now()) / 1000)
    log.stopAndPersist({
      text: (hadError ? red : green)(`Finished in ${duration.toFixed(3)}s`),
      symbol: hadError ? red('✖') : green('✔️'),
    })
  }
}

export async function* build(options: NexeOptions): AsyncGenerator<Readable> {
  void options
}

export function bundle(options: NexeOptions): Promise<Readable> {
  void options
  return Promise.resolve(new Readable())
}

export async function compile(
  options: NexeOptions,
  app: Readable,
  builds: AsyncGenerator<Readable>
): Promise<void> {
  for await (const build of builds) {
    void build
  }
}

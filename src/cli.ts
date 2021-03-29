import { NexeOptions } from './options.js'
import c from 'chalk'
import meow from 'meow'

const id = (x: string) => x
let h = id,
  p = id

if (c.supportsColor) {
  h = c.cyanBright
  p = c.gray
}

export const cli = (): Partial<NexeOptions> => {
  const entryText = `${p('[')}entry${p(']')}`
  const opts = meow(
    `
    ${h('Usage')}
      ${p('$')} nexe ${entryText} ${p('[')}options${p(']')}
    
    ${h('Options')}
      --input,      -i     Alternative to ${entryText}
      --target,     -t     Specify a target (can be used more than once)
      --outFile,    -o     Specify the output filename(s)
      --outDir,     -d     Specify a directory to write the output file(s) to.
      --resource,   -r     Specify additional file resources
      
      --cwd,               Relative directory to perform operations
      --no-input,          Do not bundle an entry file (produces empty binaries based on target)
      --help,              Show this help message
      --version,           Show the nexe version

    ${h('Build Options')}
      see https://github.com/nodejs/node/blob/master/BUILDING.md for setup or troubleshooting
      
      --make,       -m     Specify make options
      --vcbuild,    -v     Specify vcbuild options
      --configure,  -c     Specify configure options
      --v8-flag,           Specify a bundled v8-flag for build-time
      --v8-snapshot,       Specify a bundled v8-snapshot for warmup

    ${h('Examples')}
      ${p('$')} nexe app.js -t nexe://14.16.0
`,
    {
      flags: {
        input: {
          alias: 'i',
          type: 'string',
        },
        target: {
          alias: 't',
          isMultiple: true,
          type: 'string',
        },
        outFile: {
          alias: 'o',
          type: 'string',
        },
        outDir: {
          alias: 'd',
          type: 'string',
        },
        resource: {
          isMultiple: true,
          type: 'string',
          alias: 'r',
        },
        cwd: {
          type: 'string',
        },
        make: {
          alias: 'm',
          type: 'string',
          isMultiple: true,
        },
        vcbuild: {
          alias: 'v',
          type: 'string',
          isMultiple: true,
        },
        configure: {
          alias: 'c',
          type: 'string',
          isMultiple: true,
        },
        v8Flag: {
          type: 'string',
          isMultiple: true,
        },
        v8Snapshot: {
          type: 'string',
        },
      },
    }
  )
  const [input] = opts.input
  const target = opts.flags.target?.map((x) => new URL(x)) || []
  return input
    ? Object.assign({}, opts.flags, { input, target })
    : Object.assign({}, opts.flags, { target })
}

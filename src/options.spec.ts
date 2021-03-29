import { cli } from './cli.js'
import { expect } from 'chai'
import { readOpts } from './options.js'
import { resolve } from 'path'

describe('Options', () => {
  describe('cli defaults (arrays)', () => {
    it('allow multiple values for some options', () => {
      const opts = cli()
      expect(opts.configure).to.eql([])
      expect(opts.make).to.eql([])
      expect(opts.target).to.eql([])
      expect(opts.v8Flag).to.eql([])
      expect(opts.vcbuild).to.eql([])
      expect(opts.resource).to.eql([])
    })
  })
  describe('normalized defaults', () => {
    it('path defaults are resolved relative to cwd option', async () => {
      const opts = await readOpts({ input: './somefile', cwd: './somedir' })
      expect(opts.input).to.equal(resolve('./somedir/somefile'))
    })

    it('input', () => {
      void 0
    })
    it('target', () => {
      void 0
    })
    it('outFile', () => {
      void 0
    })
    describe('outDir', () => {
      void 0
    })
    describe('resource', () => {
      void 0
    })
  })

  describe('configuration flags', () => {
    describe('cwd', () => {
      void 0
    })
    describe('no-input', () => {
      void 0
    })
  })

  describe('build options', () => {
    describe('make', () => {
      void 0
    })
    describe('vcbuild', () => {
      void 0
    })
    describe('configure', () => {
      void 0
    })
    describe('v8-flags', () => {
      void 0
    })
    describe('v8-snapshot', () => {
      void 0
    })
  })
})

import { padRight, isWindows } from '../src/util'
import { expect } from 'chai'
import chalk from 'chalk'
import { getTarget, NexeTarget } from '../src/target'
const b = chalk.blue
const arch = process.arch === 'ia32' ? 'x86' : process.arch

describe('dummy', () => {
  ;
  it('Dummy-test-suite-1', () => {
    
    expect(JSON.stringify(getTarget(process))).to.equal(`"${getTarget(process)}"`)
  })
  
  
   it('Dummy-test-suite-2', () => {
    
    expect(JSON.stringify(getTarget(process))).to.equal(`"${getTarget(process)}"`)
  })
  
  it('Dummy-test-suite-3', () => {
    
    expect(JSON.stringify(getTarget(process))).to.equal(`"${getTarget(process)}"`)
  })
})

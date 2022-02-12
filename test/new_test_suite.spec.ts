import { padRight, isWindows } from '../src/util'
import { expect } from 'chai'
import chalk from 'chalk'
import { getTarget, NexeTarget } from '../src/target'
const b = chalk.blue
const arch = process.arch === 'ia32' ? 'x86' : process.arch

describe('new suite 1', () => {
  ;
  
  it('new-test-1', () => {
    
    expect(JSON.stringify(getTarget(process))).to.equal(`"${getTarget(process)}"`)
  })
   
  
   it('new-test-2', () => {
    
    expect(JSON.stringify(getTarget(process))).to.equal(`"${getTarget(process)}"`)
  })
  it('new-test-2.24', () => {
    
    expect(JSON.stringify(getTarget(process))).to.equal(`"${getTarget(process)}"`)
  })
  
  
})


describe('new suite 2', () => {
  ;
  
  it('new-test-3', () => {
    
    expect(JSON.stringify(getTarget(process))).to.equal(`"${getTarget(process)}"`)
  })
   
  
  
   it('new-test-4', () => {
    
    expect(JSON.stringify(getTarget(process))).to.equal(`"${getTarget(process)}"`)
  })
  
  
})

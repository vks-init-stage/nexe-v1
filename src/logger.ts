import chalk from 'chalk'
import ora from 'ora'

export const red = chalk.red
export const green = chalk.green
export const gray = chalk.gray

export function getLogger(opts?: { logLevel?: string }): ora.Ora {
  const log = ora({
    prefixText: 'nexe v5',
    text: red('starting...'),
    isSilent: opts?.logLevel === 'silent',
  })
  return log
}

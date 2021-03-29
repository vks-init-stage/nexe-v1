#!/usr/bin/env node
import { nexe } from './lib/esm/nexe.js'
import { cli } from './lib/esm/cli.js'
import meow from 'meow'
nexe(cli(meow))

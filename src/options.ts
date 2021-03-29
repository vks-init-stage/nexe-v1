import { Agent as HttpAgent, globalAgent as httpAgent } from 'http'
import { Agent as HttpsAgent, globalAgent as httpsAgent } from 'https'
import path from 'path'
import tunnel from 'tunnel'

type Agent = HttpAgent | HttpsAgent

type TunnelInit = (opts: { proxy: { host: string; port: number } }) => Agent

const { httpsOverHttp, httpsOverHttps, httpOverHttp, httpOverHttps } = tunnel

export type NexeOptions = {
  /**
   * Root path for operations
   * All paths resolved in options are relative to this directory
   */
  cwd: string
  /**
   * URLs representing file or remote resources
   */
  target: URL[]
  /**
   * Main entry point
   */
  input: string
  /**
   * Output filename
   * If more than one target is provided the target basename will be postfixed
   */
  outFile: string
  /**
   * Output file directory
   * defaults to cwd
   */
  outDir: string
  /**
   * Additional resource globs to include with the binary
   */
  resource: string[]
  /**
   * Log level
   */
  logLevel: 'silent' | 'verbose' | 'info'
  /**
   * Alias for logLevel=silent
   */
  silent?: true
  /**
   * Alias for logLevel=verbose
   */
  verbose?: true
  /**
   * make options for node source build
   */
  make: string[]
  /**
   * v8 flags for node source build
   */
  v8Flag: string[]
  /**
   * v8 snapshot for node build
   */
  v8Snapshot: string
  /**
   * vcbuild options for node source on windows
   */
  vcbuild: string[]
  /**
   * configure options for node source build
   */
  configure: string[]
  /**
   * Configure proxy agents for requests made by nexe
   */
  agent: {
    http: Agent
    https: Agent
  }
}

export function readOpts(
  overrides: Partial<NexeOptions> = {}
): Promise<NexeOptions> {
  const options: Partial<NexeOptions> = { ...overrides }
  options.agent = setAgent(overrides)
  let cwd = path.resolve(overrides.cwd || process.cwd())
  if (!path.isAbsolute(cwd)) {
    cwd = `.${path.sep}` + cwd
  }

  options.input = path.resolve(cwd, overrides.input || '')

  return Promise.resolve(options as NexeOptions)
}

/**
 * Produce an agent option for got client
 * @param opts
 */
function setAgent(opts: Partial<NexeOptions>): NexeOptions['agent'] {
  const [https, http] = [process.env.HTTPS_PROXY, process.env.HTTP_PROXY],
    agent: Required<NexeOptions>['agent'] = {
      http: httpAgent,
      https: httpsAgent,
    }

  if (opts?.agent?.http || opts?.agent?.https) {
    agent.http = opts.agent.http || agent.http
    agent.https = opts.agent.https || agent.https
    return agent
  }

  if (https) return makeAgentOpts(httpsOverHttps, httpOverHttps, https)
  if (http) return makeAgentOpts(httpsOverHttp, httpOverHttp, http)

  return agent

  function makeAgentOpts(https: TunnelInit, http: TunnelInit, proxy: string) {
    const url = new URL(proxy),
      options = {
        proxy: {
          host: url.host,
          port: Number(url.port),
        },
      }
    agent.http = http(options)
    agent.https = https(options)
    return agent
  }
}

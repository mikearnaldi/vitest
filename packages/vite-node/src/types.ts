import type { ModuleCacheMap } from './client'

export interface DepsHandlingOptions {
  external?: (string | RegExp)[]
  inline?: (string | RegExp)[]
  /**
   * Try to guess the CJS version of a package when it's invalid ESM
   * @default false
   */
  fallbackCJS?: boolean
}

export interface StartOfSourceMap {
  file?: string
  sourceRoot?: string
}

export interface RawSourceMap extends StartOfSourceMap {
  version: string
  sources: string[]
  names: string[]
  sourcesContent?: string[]
  mappings: string
}

export interface FetchResult {
  code?: string
  externalize?: string
  map?: RawSourceMap
}

export type FetchFunction = (id: string) => Promise<FetchResult>

export type ResolveIdFunction = (id: string, importer?: string) => Promise<ViteNodeResolveId | null>

export interface ModuleCache {
  promise?: Promise<any>
  exports?: any
  code?: string
}

export interface ViteNodeRunnerOptions {
  root: string
  fetchModule: FetchFunction
  resolveId?: ResolveIdFunction
  base?: string
  moduleCache?: ModuleCacheMap
  interopDefault?: boolean
  requestStubs?: Record<string, any>
}

export interface ViteNodeResolveId {
  external?: boolean | 'absolute' | 'relative'
  id: string
  meta?: Record<string, any> | null
  moduleSideEffects?: boolean | 'no-treeshake' | null
  syntheticNamedExports?: boolean | string | null
}

export interface ViteNodeServerOptions {
  /**
   * Inject inline sourcemap to modules
   * @default 'inline'
   */
  sourcemap?: 'inline' | boolean
  /**
   * Deps handling
   */
  deps?: DepsHandlingOptions
  /**
   * Transform method for modules
   */
  transformMode?: {
    ssr?: RegExp[]
    web?: RegExp[]
  }
}

export type { ModuleCacheMap }

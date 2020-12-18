export declare type PaginatorFunction<X> = (
  key: any,
  docId: string | null,
  limit: number | undefined
) => Promise<PaginatorResponse<X>>
export declare type PaginatorExecutor<X> = (
  latestPaginatorFunctionResult: PaginatorResponse<X>,
  acc: any[],
  limit: number | undefined
) => Promise<PaginatorResponse<X>>
export interface PaginatorResponse<X> {
  rows: Array<X>
  nextKey: any | null | undefined
  nextDocId: string | null | undefined
  done: boolean
}
export interface RowsChunk<X> {
  startIdx: number
  endIdx: number
  rows: Array<X>
  nextKey: any | null
  nextDocId: string | null
}
export interface MissingRowsChunk<X> {
  missing: [number, number]
  lastEndIdx: number
  lastKey: any | null
  lastDocId: string | null
  rows?: Array<X>
}
export declare function sleep(ms: number): Promise<any>
export declare function retry<P>(
  fn: () => Promise<P>,
  retryCount?: number,
  sleepTime?: number,
  exponentialFactor?: number
): Promise<P>
export declare function getRowsUsingPagination<X>(
  paginator: PaginatorFunction<X>,
  filter?: (value: X, idx: number, array: Array<X>) => boolean,
  startIdx?: number,
  endIdx?: number,
  cache?: Array<RowsChunk<X>>
): Promise<Array<X>>

"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, "__esModule", { value: true })
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
exports.sleep = sleep
function retry(fn, retryCount = 3, sleepTime = 1000, exponentialFactor = 1) {
  let retry = 0
  const doFn = () => {
    return fn().catch(
      e =>
        retry++ < retryCount
          ? (sleepTime && sleep((sleepTime *= exponentialFactor)).then(() => doFn())) || doFn()
          : Promise.reject(e)
    )
  }
  return doFn()
}
exports.retry = retry
function getRowsUsingPagination(paginator, filter, startIdx, endIdx, cache) {
  return __awaiter(this, void 0, void 0, function*() {
    const executePaginator = (latestResult, acc, limit) =>
      __awaiter(this, void 0, void 0, function*() {
        const newResult = yield paginator(
          latestResult.nextKey || null,
          latestResult.nextDocId || null,
          endIdx && startIdx ? endIdx - startIdx : undefined
        )
        const rows =
          (filter ? newResult.rows && newResult.rows.filter(filter) : newResult.rows) || []
        acc.push(...rows)
        if (newResult.done || (limit && acc.length >= limit)) {
          return {
            rows: acc,
            nextKey: newResult.nextKey,
            nextDocId: newResult.nextDocId,
            done: false
          }
        } else {
          return executePaginator(newResult, acc, limit)
        }
      })
    if (cache && startIdx && endIdx) {
      // Go through cache and build a list of existing rows (RowsChunks) and missing rows (MissingRowChunks)
      // The cache is a sparse structure sorted by index
      // At first, the cache is empty rows is going to be equal to [] and everything will be missing (see empty rows situation below)
      const [rows, lastKey, lastDocId, lastEndIdx] = cache.reduce(
        ([rows, lastKey, lastDocId, lastEndIdx, lastTreatedIdx], chunk) => {
          const startOfZoi = lastTreatedIdx
          const endOfZoi = endIdx
          if (chunk.endIdx <= startOfZoi) {
            //           [--zoi--] // Zone of interest starts at startOfZoi, ends at endIdx
            // [-chunk-]
            // Doesn't look like anything to me
          } else if (chunk.startIdx >= endIdx) {
            // [--zoi--]
            //           [-chunk-]
            if (startOfZoi < endIdx) {
              rows.push({
                missing: [startOfZoi, endIdx],
                lastEndIdx,
                lastKey,
                lastDocId
              })
              lastTreatedIdx = endOfZoi
            }
          } else {
            if (chunk.startIdx <= lastTreatedIdx) {
              if (chunk.endIdx <= endIdx) {
                //       [--zoi--]
                // [-chunk-]
                rows.push({
                  startIdx: startOfZoi,
                  endIdx: chunk.endIdx,
                  rows: chunk.rows.slice(
                    startOfZoi - chunk.startIdx,
                    chunk.endIdx - chunk.startIdx
                  ),
                  nextKey: null,
                  nextDocId: null
                })
                lastTreatedIdx = chunk.endIdx
              } else {
                //       [--zoi--]
                // [------chunk------]
                rows.push({
                  startIdx: startOfZoi,
                  endIdx: endOfZoi,
                  rows: chunk.rows.slice(startOfZoi - chunk.startIdx, endOfZoi - chunk.startIdx),
                  nextKey: null,
                  nextDocId: null
                })
                lastTreatedIdx = endOfZoi
              }
            } else {
              //  [--zoi--]
              //        [-chunk-]
              if (chunk.endIdx >= endOfZoi) {
                rows.push({
                  missing: [startOfZoi, chunk.startIdx],
                  lastEndIdx,
                  lastKey,
                  lastDocId
                })
                rows.push({
                  startIdx: chunk.startIdx,
                  endIdx: endOfZoi,
                  rows: chunk.rows.slice(0, endOfZoi - chunk.startIdx),
                  nextKey: null,
                  nextDocId: null
                })
                lastTreatedIdx = endOfZoi
              } else {
                //  [-------zoi-------]
                //       [-chunk-]
                rows.push({
                  missing: [startOfZoi, chunk.startIdx],
                  lastEndIdx,
                  lastKey,
                  lastDocId
                })
                rows.push({
                  startIdx: chunk.startIdx,
                  endIdx: chunk.endIdx,
                  rows: chunk.rows.slice(0, chunk.endIdx - chunk.startIdx),
                  nextKey: null,
                  nextDocId: null
                })
                lastTreatedIdx = chunk.endIdx
              }
            }
          }
          return [rows, chunk.nextKey, chunk.nextDocId, chunk.endIdx, lastTreatedIdx]
        },
        [[], null, null, 0, startIdx || 0]
      )
      if (!rows.length) {
        rows.push({
          missing: [startIdx, endIdx],
          lastKey: lastKey,
          lastDocId: lastDocId,
          lastEndIdx: lastEndIdx
        })
      } else {
        const lastRow = rows.length ? rows[rows.length - 1] : undefined
        if (lastRow && lastRow.rows && lastRow.startIdx + lastRow.rows.length < endIdx) {
          rows.push({
            missing: [lastRow.startIdx + lastRow.rows.length, endIdx],
            lastKey: lastKey,
            lastDocId: lastDocId,
            lastEndIdx: lastEndIdx
          })
        }
      }
      // Once we we have determined which where the missing chunks. Go fetch them based on the lastKey/lastDocId + the limit computed with the lastEndIndex
      yield Promise.all(
        rows.filter(r => r.missing).map(r =>
          __awaiter(this, void 0, void 0, function*() {
            const missing = r
            const { rows, nextKey, nextDocId } = yield executePaginator(
              {
                nextKey: missing.lastKey,
                nextDocId: missing.lastDocId,
                rows: [],
                done: false
              },
              [],
              missing.missing[1] - missing.lastEndIdx
            )
            missing.rows = rows.slice(
              missing.missing[0] - missing.lastEndIdx,
              missing.missing[1] - missing.lastEndIdx
            )
            cache[missing.lastEndIdx] = {
              rows,
              startIdx: missing.missing[0],
              endIdx: missing.missing[1],
              nextKey: nextKey || null,
              nextDocId: nextDocId || null
            }
          })
        )
      )
      return (rows || []).reduce(
        (acc, r) =>
          r.rows
            ? r.rows.reduce((acc, r) => {
                acc.push(r)
                return acc
              }, acc)
            : acc,
        []
      )
    } else {
      const { rows } = yield executePaginator(
        {
          nextKey: null,
          nextDocId: null,
          rows: [],
          done: false
        },
        [],
        undefined
      )
      return rows
    }
  })
}
exports.getRowsUsingPagination = getRowsUsingPagination
//# sourceMappingURL=net-utils.js.map

import axios from 'axios'
import sourceMap from 'source-map-js'
const getSourceMap = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}


const findCodeBySourceMap = async (stackFrame: any) => {
  const sourceData = await getSourceMap(`${stackFrame.fileName}.map`)
  const fileContent = sourceData
  const consumer = await new sourceMap.SourceMapConsumer(fileContent)
  const originalPosition = consumer.originalPositionFor({
    line: stackFrame.lineNumber || 1,
    column: stackFrame.columnNumber || 1,
  })
  // 后续使用 originalPosition 处理代码
  const code = consumer.sourceContentFor(originalPosition.source)
  console.log('%c [ code ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', code)
}

export default findCodeBySourceMap

import { Request } from 'express'

const headersString = (req: Request): string => {
  const headerMap: Record<string, string | string[]> = {}

  for (const [key, value] of Object.entries(req.headers)) {
    headerMap[key] = value
  }

  return JSON.stringify(headerMap, null, 2)
}

export default headersString

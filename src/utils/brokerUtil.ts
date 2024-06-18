import { Request } from 'express'
import { Base64 } from 'js-base64'
import logger from './logger'

interface IAMIdentity {
  iam_id: string
}

class BrokerUtil {
  static PLATFORM = 'platform'
  static IBM_CLOUD = 'ibmcloud'
  static ORIGINATING_IDENTITY_HEADER = 'x-broker-api-originating-identity'
  static BLUEMIX_REGION_HEADER = 'x-bluemix-region'
  static DESCRIPTION = 'description'
  static ERROR = 'error'
  static DASHBOARD_URL = 'dashboard_url'
  static IBM_IUID_PREFIX = 'IBMid-'

  static getIamId(req: Request): string | null {
    try {
      const originatingIdentity = req.header(this.ORIGINATING_IDENTITY_HEADER)

      if (originatingIdentity) {
        const strings = originatingIdentity.split(' ')
        const decoded = Base64.decode(strings[1])
        const iam: IAMIdentity = JSON.parse(decoded)

        if (iam && iam.iam_id) {
          return iam.iam_id
        }
      }

      return null
    } catch (error) {
      logger.error(`Error parsing IAM identity: ${error}`)
      return null
    }
  }

  static getHeaderValue(req: Request, headerName: string): string | undefined {
    return req.header(headerName)
  }
}

export default BrokerUtil

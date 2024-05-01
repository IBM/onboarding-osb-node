import axios, { AxiosError, AxiosResponse } from 'axios'
import { MeteringPayload } from '../../models/metering-payload.interface'
import { UsageService } from '../usage.service'

export class UsageServiceImpl implements UsageService {
  private usageEndpoint: string = process.env.USAGE_ENDPOINT || ''
  private iamEndpoint: string = process.env.IAM_ENDPOINT || ''
  private apiKey: string = process.env.METERING_API_KEY || ''

  async sendUsageData(
    resourceId: string,
    meteringPayload: MeteringPayload,
  ): Promise<string> {
    if (!meteringPayload.startTime) {
      // meteringPayload.startTime = Date.now() - 3600000 // Set start time to 1 hour ago if not provided
    }
    if (!meteringPayload.endTime) {
      // meteringPayload.endTime = Date.now() // Set end time to current time if not provided
    }

    const iamAccessToken = await this.getIamAccessToken()
    const usageApiUrl = `${this.usageEndpoint}/v4/metering/resources/${resourceId}/usage`

    try {
      const response = await this.sendUsageDataToApi(
        usageApiUrl,
        iamAccessToken,
        [meteringPayload],
      )
      return JSON.stringify(response.data)
    } catch (error) {
      console.error('Error sending usage data:', error)
      throw new Error('Error sending usage data')
    }
  }

  private async sendUsageDataToApi(
    url: string,
    token: string,
    data: MeteringPayload[],
  ): Promise<AxiosResponse> {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      console.log('Usage Metering response:', response.data)
      return response
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        console.error('Failed with status:', axiosError.response.status)
        console.error('Failed with response:', axiosError.response.data)
      }
      throw error
    }
  }

  private async getIamAccessToken(): Promise<string> {
    const data = `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${this.apiKey}`
    const response = await axios.post(
      `${this.iamEndpoint}/identity/token`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    if (response.data && response.data.access_token) {
      return response.data.access_token
    } else {
      throw new Error('Failed to retrieve IAM access token')
    }
  }
}

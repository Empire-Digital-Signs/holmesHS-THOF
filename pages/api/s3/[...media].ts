import {
  createMediaHandler,
} from 'next-tinacms-s3/dist/handlers'

import { isAuthorized } from '@tinacms/auth'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default createMediaHandler(
  {
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
      },
      region: process.env.S3_REGION,
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true,
    },
    bucket: process.env.S3_BUCKET || '',
    authorized: async (req, _res) => {
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      try {
        const user = await isAuthorized(req)

        // Force boolean return value, prevent undefined
        return !!user && user.verified === true
      }
      catch (e) {
        console.error(e)
        return false
      }
    },
  },
  {
    cdnUrl: process.env.SUPABASE_PUBLIC_URL,
  },
)

import { Client } from 'minio'

export const s3 = new Client({
  secretKey: process.env.STORJ_SECRET_KEY as string,
  accessKey: process.env.STORJ_ACCESS_KEY as string,
  endPoint: process.env.STORJ_ENDPOINT as string
})

export const getList = (bucket: string, prefix?: string): Promise<Object[]> => {
  return new Promise((resolve, reject) => {
    const list = s3.listObjectsV2(bucket, prefix, true, '')
    let listObject: Object[] = []
    list.on('data', (item) => {
      if (!item.name.includes('/.file_placeholder')) {
        listObject.push(item)
      }
    })
    list.on('end', () => {
      resolve(listObject)
    })
    list.on('error', (err) => {
      reject(err)
    })
  })
}

// export const getObject = (
//   bucket: string,
//   objectName: string
// ): Promise<Buffer> => {
//   return new Promise(async (resolve, reject) => {
//     let buffer: any[] = []

//     const object = await s3.getObject(bucket, objectName)

//     object.on('data', (chunk) => {
//       buffer.push(chunk)
//     })

//     object.on('end', () => {
//       resolve(Buffer.concat(buffer))
//     })
//     object.on('error', (err) => {
//       reject(err)
//     })
//   })
// }

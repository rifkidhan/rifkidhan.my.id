const { GHOST_CONTENT_KEY, API_URL } = process.env

export const ghostApi = async (endpoint: string) => {
  const res = await fetch(
    `${API_URL}/ghost/api/content/${endpoint}?key=${GHOST_CONTENT_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Version': 'v5.0'
      }
    }
  )

  try {
    const result = await res.json()

    return result
  } catch (error: any) {
    throw {
      code: error.status
    }
  }
}

import useSWR from 'swr'

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getSession = () => {
  const { data, isLoading, isValidating } = useSWR('/api/auth/session', fetcher)

  const convertData =
    data !== undefined && Object.keys(data).length > 0 ? data : null
  return {
    session: convertData,
    isLoading,
    isValidating
  }
}

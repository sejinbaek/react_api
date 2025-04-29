import { useQuery } from '@tanstack/react-query'
import { getWordData } from './getDictionaryApi'

export const useDictionary = (q, start = 1) => {
  return useQuery({
    queryKey: ['word', q, start],
    queryFn: () => getWordData(q, start),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  })
}

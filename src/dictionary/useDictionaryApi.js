import { useQuery } from '@tanstack/react-query'
import { getWordData } from './getDictionaryApi'

export const useDictionary = q => {
  return useQuery({
    queryKey: ['word', q],
    queryFn: () => getWordData(q),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  })
}

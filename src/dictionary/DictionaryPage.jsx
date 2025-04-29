import React from 'react'
import { useDictionary } from './useDictionaryApi'

const DictionaryPage = () => {
  const { data, isLoading, isError } = useDictionary('나무')
  console.log(data)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>에러 발생</div>

  return <div>DictionaryPage</div>
}

export default DictionaryPage

import React, { useState } from 'react'
import { useDictionary } from './useDictionaryApi'
import Pagination from '../camping/Pagination.jsx'

const DictionaryPage = () => {
  const [query, setQuery] = useState('')
  const [searchWord, setSearchWord] = useState(null)
  const [page, setPage] = useState(1)
  const perPage = 10

  const { data, isLoading, isError } = useDictionary(searchWord, page)
  const wordData = data?.channel
  const words = Array.isArray(wordData?.item)
    ? wordData.item
    : wordData?.item
      ? [wordData.item]
      : []

  console.log('wordData', wordData)
  console.log('words', words)

  const handleOnChange = e => {
    setQuery(e.target.value)
  }

  const handleWordSearch = () => {
    setPage(1)
    setSearchWord(query)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>에러 발생</div>

  const totalCount = wordData?.total ?? 0

  return (
    <div>
      <h2>DictionaryPage</h2>
      <input
        type="search"
        name={query}
        value={query}
        placeholder="검색어를 입력하세요"
        onChange={handleOnChange}
      />
      <button type="submit" onClick={handleWordSearch}>
        검색
      </button>
      <p>총 검색 개수: {totalCount}</p>
      <div>
        <ul>
          {words.map(word => (
            <li key={word.target_code}>
              <p>{word?.word}</p>
              <p>{word?.pos}</p>
              {Array.isArray(word.sense) ? (
                word.sense.map((senseItem, senseIdx) => (
                  <p key={senseIdx}>{senseItem.definition}</p>
                ))
              ) : (
                <div>
                  <p>의미: {word.sense?.definition}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {wordData && (
        <Pagination
          totalCount={wordData?.total ?? 0}
          page={page}
          perPage={perPage}
          handleChangePage={setPage}
        />
      )}
    </div>
  )
}

export default DictionaryPage

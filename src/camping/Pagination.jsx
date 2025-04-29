import React from 'react'
import css from './Pagination.module.css'

const Pagination = ({ totalCount, page, perPage, handleChangePage }) => {
  const totalPages = Math.ceil(totalCount / perPage)

  const getpageNumbers = () => {
    const maxpageNumbers = 10
    if (totalPages <= maxpageNumbers) {
      return Array.from({ length: totalPages }, i => i + 1)
    }

    let startPage = Math.max(1, page - Math.floor(maxpageNumbers / 2))
    let endPage = Math.min(totalPages, startPage + maxpageNumbers - 1)
    startPage = Math.max(1, endPage - maxpageNumbers + 1)

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const pageNumbers = getpageNumbers()
  console.log('pageNumbers', pageNumbers)

  return (
    <div className={css.paginationArea}>
      <button
        onClick={() => {
          handleChangePage(1)
        }}
      >
        처음
      </button>
      <button
        onClick={() => {
          handleChangePage(Math.max(1, page - 1))
        }}
      >
        이전
      </button>
      {pageNumbers.map(num => (
        <button
          key={num}
          onClick={() => {
            handleChangePage(num)
          }}
          className={num === page ? `${css.active}` : ''}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => {
          handleChangePage(Math.min(totalPages, page + 1))
        }}
      >
        다음
      </button>
      <button
        onClick={() => {
          handleChangePage(totalPages)
        }}
      >
        끝
      </button>
    </div>
  )
}

export default Pagination

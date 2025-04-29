import React from 'react'
import css from './Pagination.module.css'

const Pagination = ({ totalCount, page, perPage, handleChangePage }) => {
  // 총 페이지 수 (endPage 및 마지막 버튼에 이용)
  // Math.ceil을 사용해 소수점이 있으면 무조건 올림
  const totalPages = Math.ceil(totalCount / perPage)
  // 한 번에 보여줄 페이지네이션 버튼 수를 구하는 함수
  const getpageNumbers = () => {
    // 한번에 보여주는 최대 페이지 수
    const maxpageNumbers = 10
    // 전체 페이지가 10보다 작으면 모든 페이지 번호 표시
    if (totalPages <= maxpageNumbers) {
      return Array.from({ length: totalPages }, i => i + 1)
    }
    // 페이지가 많을 경우
    // 현재 페이지를 가운데에 위치시키기 위해 왼쪽으로 5칸 이동
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
        마지막
      </button>
    </div>
  )
}

export default Pagination

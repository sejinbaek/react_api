import React, { useState } from 'react'
import { useCamping } from './useCampingApi'
import css from './CampingPage.module.css'
import DetailModal from './DetailModal'
import Pagination from './Pagination'
import { useSearchParams } from 'react-router-dom'

const CampingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const perPage = Number(searchParams.get('perPage')) || 10

  const { data, isLoading, isError } = useCamping(page, perPage)

  // 데이터를 가져오는 중에는 undefined이기 때문에 쿼리스크링으로 오류 방지
  const campingData = data?.data
  const totalCount = data?.totalCount

  //   console.log('캠핑 데이터', data)

  // 모달 여는 함수
  const handleCampingClick = list => {
    setIsModalOpen(true)
    setSelected(list)
  }
  // 모달 닫는 함수
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // 페이지 이동 처리 함수
  const handleChangePage = newpage => {
    setSearchParams({ page: newpage, perPage })
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

  return (
    <main>
      <h2></h2>
      <div>
        <p>
          총 {totalCount}개 중 {perPage}개 표시 / 현재 {page}페이지에 있음
        </p>
        <ul className={css.list}>
          {campingData?.map((list, i) => (
            <li key={list['야영장명'] + i} onClick={() => handleCampingClick(list)}>
              <p>야영장명: {list['야영장명']}</p>
              <p>주소: {list['주소']}</p>
              <p>
                {list['연락처 앞자리']
                  ? `연락처: ${list['연락처 앞자리']}-${list['연락처 중간자리']}${list['연락처 끝자리'] ? `-${list['연락처 끝자리']}` : ''}`
                  : ''}
              </p>
            </li>
          ))}
        </ul>
        <Pagination
          totalCount={totalCount}
          page={page}
          perPage={perPage}
          handleChangePage={handleChangePage}
        />
      </div>
      {isModalOpen && <DetailModal selected={selected} handleCloseModal={handleCloseModal} />}
    </main>
  )
}

export default CampingPage

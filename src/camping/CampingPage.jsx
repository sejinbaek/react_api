import React, { useState } from 'react'
import { useCamping } from './useCampingApi'
import css from './CampingPage.module.css'
import DetailModal from './DetailModal'

const CampingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const { data, isLoading, isError } = useCamping(1, 10)
  const campingData = data?.data
  const totalCount = data?.totalCount
  const page = data?.page
  const perPage = data?.perPage

  console.log('캠핑 데이터', data)

  const handleCampingClick = list => {
    setIsModalOpen(true)
    setSelected(list)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  isLoading && <div>Loading...</div>
  isError && <div>Error</div>

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
                연락처:{' '}
                {`${list['연락처 앞자리']}-${list['연락처 중간자리']}${list['연락처 끝자리'] ? `-${list['연락처 끝자리']}` : ''}`}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && <DetailModal selected={selected} handleCloseModal={handleCloseModal} />}
    </main>
  )
}

export default CampingPage

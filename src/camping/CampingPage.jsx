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
  const perPage = Number(searchParams.get('perPage')) || 12

  const { data, isLoading, isError } = useCamping(page, perPage)

  const campingData = data?.data
  const totalCount = data?.totalCount

  //   console.log('캠핑 데이터', data)

  const handleCampingClick = list => {
    setIsModalOpen(true)
    setSelected(list)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleChangePage = newpage => {
    setSearchParams({ page: newpage, perPage })
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

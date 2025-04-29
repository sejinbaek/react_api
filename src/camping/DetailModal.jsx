import React from 'react'
import css from './DetailModal.module.css'

const DetailModal = ({ selected, handleCloseModal }) => {
  console.log('selected', selected)
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <h2>{selected['야영장명']}</h2>
        <p>{selected['시군구']}</p>
        <p>{selected['주소']}</p>
        <p>{selected['인허가일자']}</p>
        <p>반려동물출입: {selected['반려동물출입']}</p>
        <button onClick={handleCloseModal}>닫기</button>
      </div>
    </div>
  )
}

export default DetailModal

import axios from 'axios'

const CAMPING_API_KEY = import.meta.env.VITE_CAMPING_API_KEY
const BASE_URL = 'https://api.odcloud.kr/api/15037499/v1/uddi:adf7c061-042d-4965-9b7c-87585251862b'

// const url = 'https://api.odcloud.kr/api/15037499/v1/uddi:adf7c061-042d-4965-9b7c-87585251862b?page=1&perPage=8&serviceKey=h9rT05ZnyZ2tCmHxyoht1WXaVa%2BhcEXsJIXoAY7E2Olfn%2BibjTAXQy7Mw58uH%2FN4A9kI%2FM%2FXLj%2BMP43tBzF%2BaQ%3D%3D'

export const getCampingData = async ({ page = 1, perPage = 12 }) => {
  try {
    const res = await axios.get(
      `${BASE_URL}?page=${page}&perPage=${perPage}&serviceKey=${CAMPING_API_KEY}`
    )
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

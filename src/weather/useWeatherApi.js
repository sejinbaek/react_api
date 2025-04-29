import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// 위도와 경도를 받아서 해당하는 위치의 날씨 가져오기
export const getWeatherByCurrentLocation = async (lat, lon) => {
  try {
    // API 요청하고 받기
    const response = await axios.get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`
    )
    return response.data
  } catch (err) {
    console.log('좌표로 날씨 정보 가져오기 실패', err)
  }
}

// 현재 좌표를 가져오고 getWeatherByCurrentLocation에서 날씨 가져오기
export const getCurrentWeather = async () => {
  return new Promise((resolve, reject) => {
    // 현재 위치를 알려주는 메서드
    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          // console.log('position', position)
          const { latitude, longitude } = position.coords
          // 현재 위치를 getWeatherByCurrentLocation에 넘겨주고 날씨 정보 받기
          const response = await getWeatherByCurrentLocation(latitude, longitude)
          resolve(response)
        } catch (err) {
          console.log('좌표로 날씨 정보 가져오기 실패', err)
          reject(err)
        }
      },
      err => {
        console.log('좌표 가져오기 실패', err)
        reject(err)
      }
    )
  })
}

// https://api.openweathermap.org/data/2.5/weather?appid=e6b15e20777148e67708cebb40337b4a&q=seoul

// 도시명으로 날씨 가져오기
export const getWeatherByCity = async city => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&lang=kr&units=metric`)
    return response.data
  } catch (err) {
    console.log('도시명으로 날씨 정보 가져오기 실패', err)
  }
}

// 리액트 쿼리에서 데이터를 가져오는 형태
export const useWeather = city => {
  console.log('useWeather', city)
  return useQuery({
    queryKey: ['weather', city],
    queryFn: async () => {
      try {
        const data = city ? await getWeatherByCity(city) : await getCurrentWeather()
        return data
      } catch (err) {
        console.log('err', err)
      }
    },
    staleTime: 1000 * 3, // fresh 상태 유지 시간
    retry: 1, // 실패 시 한 번만 재시도
  })
}

import React, { useEffect, useState } from 'react'
import css from './WeatherPage.module.css'
import { getCurrentWeather, getWeatherByCity } from './useWeatherApi'
import Button from './Button'
import { useSearchParams } from 'react-router-dom'

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const city = searchParams.get('city')

  const cityButtons = [
    { id: 'current', label: '현재위치' },
    { id: 'seoul', label: '서울' },
    { id: 'tokyo', label: '도교' },
    { id: 'rome', label: '로마' },
    { id: 'paris', label: '파리' },
  ]
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let data
        {
          city ? (data = await getWeatherByCity(city)) : (data = await getCurrentWeather())
        }
        console.log('날씨 데이터', data)
        setWeatherData(data)
      } catch (err) {
        console.log('날씨 데이터 가져오기 실패', err)
      }
    }
    fetchWeatherData()
  }, [city])

  console.log('날씨 데이터:', weatherData?.cod)

  const handleChangeCity = city => {
    console.log('버튼 클릭', city)
    {
      city === 'current' ? setSearchParams({}) : setSearchParams({ city })
    }
  }

  return (
    <main className={css.weatherMain}>
      <h2>WeatherPage</h2>
      <div className={css.weatherInfo}>
        <p className={css.location}>
          {weatherData?.sys.country} / {weatherData?.name}
        </p>
        <div className={css.temperature}>
          <p> {weatherData?.main.temp}&#8451; /</p>
          <p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`}
              alt={weatherData?.weather[0].description}
            />
          </p>
        </div>
      </div>
      <div className={css.btnList}>
        {cityButtons.map(button => (
          <Button
            key={button.id}
            city={button.id}
            label={button.label}
            onClick={() => handleChangeCity(button.id)}
          />
        ))}
      </div>
    </main>
  )
}

export default WeatherPage

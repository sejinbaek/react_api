import React from 'react'
import css from './WeatherPage.module.css'
import { useWeather } from './useWeatherApi'
import Button from './Button'
import { useSearchParams } from 'react-router-dom'

const WeatherPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const city = searchParams.get('city')

  const cityButtons = [
    { id: 'current', label: '현재위치' },
    { id: 'seoul', label: '서울' },
    { id: 'tokyo', label: '도교' },
    { id: 'rome', label: '로마' },
    { id: 'paris', label: '파리' },
  ]

  const { data: weatherData, isLoading, isError } = useWeather(city) // 컴포넌트가 마운트되면 항상 city 데이터가 생긴다.

  const handleChangeCity = city => {
    console.log('버튼 클릭', city)
    {
      city === 'current' ? setSearchParams({}) : setSearchParams({ city })
    }
  }

  isLoading && <div>Loading..</div>
  isError && <div>Error...</div>

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

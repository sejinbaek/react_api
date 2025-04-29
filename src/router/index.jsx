import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/mainLayout'
import WeatherPage from '../weather/WeatherPage'
import CampingPage from '../camping/CampingPage'
import DictionaryPage from '../dictionary/DictionaryPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        element: <WeatherPage />,
      },
      {
        path: '/camping',
        element: <CampingPage />,
      },
      {
        path: '/dictionary',
        element: <DictionaryPage />,
      },
    ],
  },
])

import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/mainLayout'
import WeatherPage from '../weather/WeatherPage'

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
    ],
  },
])

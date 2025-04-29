import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const DICTIONARY_API_KEY = import.meta.env.VITE_DICTIONARY_API_KEY
const BASE_URL = 'https://krdict.korean.go.kr/api/search'

// const url = 'https://krdict.korean.go.kr/api/search?key=F0B7A804DC8620B21165D6B8A50595C5&q=무'

export const xmlAsJson = async q => {
  try {
    const response = await axios.get(`${BASE_URL}?key=${DICTIONARY_API_KEY}&q=${q}`, {
      responseType: 'text',
    })
    const parser = new XMLParser()
    const json = parser.parse(response.data)
    return json
  } catch (err) {
    console.log('Error fetching XML:', err)
    throw err
  }
}

export const getWordData = async q => {
  try {
    const res = await xmlAsJson(q)
    return res
  } catch (error) {
    console.log(error)
    throw err
  }
}

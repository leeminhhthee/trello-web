import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/** Boards */
export const fetchBoardDetailsAPI = async (boardId) => {
  const respone = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // Axios sẽ trả kết quả về qua property của nó là data
  return respone.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const respone = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return respone.data
}

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const respone = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return respone.data
}

/** Cards */
export const createNewCardAPI = async (newCardData) => {
  const respone = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return respone.data
}
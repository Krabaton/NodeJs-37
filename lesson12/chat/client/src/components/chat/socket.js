import io from 'socket.io-client'
const URL = process.env.REACT_APP_URL || 'localhost:5000'

export const socket = io(URL)

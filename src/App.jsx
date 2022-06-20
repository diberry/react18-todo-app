import { Route, Routes } from 'react-router-dom'
import { TodoApp } from './containers/TodoApp'
import './styles.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />} />
      <Route path="/:status" element={<TodoApp />} />
    </Routes>
  )
}

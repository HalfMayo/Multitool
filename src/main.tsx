import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import Homepage from './pages/Homepage'
import Todo from './pages/Todo'
import Splitter from './pages/Splitter'
import Calc from './pages/Calc'
import Pomodoro from './pages/Pomodoro'
import Tracker from './pages/Tracker'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Homepage />}/>
      <Route path="todo" element={<Todo/>}/>
      <Route path="splitter" element={<Splitter/>}/>
      <Route path="calc" element={<Calc/>}/>
      <Route path="pomodoro" element={<Pomodoro/>}/>
      <Route path="tracker" element={<Tracker/>}/>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

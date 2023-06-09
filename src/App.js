import React from 'react'
import Header from './components/Header'
import Cart from './pages/Cart'

import { Route, Routes } from 'react-router-dom'
import FullPizza from './pages/FullPizza'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './scss/app.scss'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/pizza/:id' element={<FullPizza />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App

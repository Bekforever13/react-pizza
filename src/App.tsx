import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
// import Cart from './pages/Cart'
import Home from './pages/Home'
import './scss/app.scss'

const Cart = React.lazy(() => import('./pages/Cart'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const FullPizza = React.lazy(() => import('./pages/FullPizza'))

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route
							path='/cart'
							element={
								<React.Suspense fallback={<div>Loading...</div>}>
									<Cart />
								</React.Suspense>
							}
						/>
						<Route
							path='/pizza/:id'
							element={
								<React.Suspense fallback={<div>Loading...</div>}>
									<FullPizza />
								</React.Suspense>
							}
						/>
						<Route
							path='*'
							element={
								<React.Suspense fallback={<div>Loading...</div>}>
									<NotFound />
								</React.Suspense>
							}
						/>
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App

import React from 'react'
import { Link } from 'react-router-dom'

const CartEmpty: React.FC = () => {
	return (
		<>
			<div className='cart cart--empty'>
				<h2>
					Корзина пустая <span>😕</span>
				</h2>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img
					src='https://img.freepik.com/premium-vector/young-man-with-shopping-cart_24908-64263.jpg?w=740'
					alt='Empty cart'
				/>
				<Link className='button button--black' to='/'>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</>
	)
}

export default CartEmpty

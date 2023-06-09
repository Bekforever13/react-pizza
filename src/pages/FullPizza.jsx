import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FullPizza = () => {
	const { id } = useParams()
  const [pizza, setPizza] = useState({})

	useEffect(() => {
		axios
			.get(`https://646a90977d3c1cae4ce2a8b4.mockapi.io/items/${id}`)
			.then(res => setPizza(res.data))
	}, [])

	return (
		<div>
			<img src={pizza.imageUrl} alt='' />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} P</h4>
		</div>
	)
}

export default FullPizza

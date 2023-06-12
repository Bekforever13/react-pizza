import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
	return (
		<div className={styles.root}>
			<h1>
				<b>Ничего не найдено</b>
				<br />
				<span>:(</span>
			</h1>
			<p className={styles.description}>
				К сожалению данная страница отсуствует в нашем сервере
			</p>
		</div>
	)
}

export default NotFoundBlock

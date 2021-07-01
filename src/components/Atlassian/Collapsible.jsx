import React, { useEffect } from 'react';
import styles from '../../styles/Collapsible.module.css'
import backendData from './page-tree/data.json'

export default function Collapsible ( props ) {

	console.log( backendData )
	const recurse = ( data ) => {
		const w = data.forEach( obj => {
			if ( !obj.children ) {
				return <>..{ obj.name }</>
			}
		} );
		console.log( w )
		return w
	}



	return (
		<>
			<div className={ styles.centered }>
				{ recurse( backendData ) }
			</div>
		</>
	)
}

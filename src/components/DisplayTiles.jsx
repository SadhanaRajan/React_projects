/**
 * OUTDOORSY onsite
 * 1. Get data from API https://jsonplaceholder.typicode.com/photos
 * 2. Display top ten objects in tiles in responsive resizable grid
 * 3. Filter with user input
 */

import { useState, useEffect } from "react";
import styles from '../styles/DisplayTiles.module.css'

function DisplayTiles () {
	const [ topTen, setTopTen ] = useState( [] );
	const [ filteredData, setFilteredData ] = useState( [] );
	const [ filterValue, setFilter ] = useState( '' );

	useEffect( () => {
		fetch( "https://jsonplaceholder.typicode.com/photos" )
			.then( res => res.json() )
			.then(
				( records ) => {
					setTopTen( records.splice( 0, 10 ) );
				},
				( error ) => {
					setTopTen( [] )
				}
			)
	}, [] )

	const handleChange = ( evt ) => {
		setFilter( evt.target.value );
		setFilteredData( topTen.filter( x => x.title.includes( evt.target.value ) ) )
	}

	const renderCards = ( data ) => {
		return (
			<div className={ styles.DisplayTiles }>
				{ data.map( item => (
					<div key={ item.id } className={ styles.item }>
						<img src={ item.thumbnailUrl } alt={ item.id }></img>
						<br />
						{ item.title }
					</div>
				) ) }
			</div>
		);
	}

	return (
		<>
			<h1 style={ { textAlign: "center" } }>My Albums</h1>
			<div style={ { textAlign: "center" } }>
				<label>Filter Input:&nbsp;
					<input type={ 'text' } autoFocus value={ filterValue } onChange={ handleChange } />
				</label>
			</div>
			{ filterValue ? renderCards( filteredData ) : renderCards( topTen ) }
		</>
	);
}

export default DisplayTiles
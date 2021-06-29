import React from 'react'

export function Columnfilter ( { column } ) {

	const { filterValue, setFilter } = column

	return (
		<>
			<span>
				Filter:{ ' ' }
				<input value={ filterValue || '' }
					onChange={ evt => setFilter( evt.target.value ) }
				/>
			</span>
		</>
	)
}
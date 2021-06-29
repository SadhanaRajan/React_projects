import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

function GlobalFilterInput ( { filter, setFilter } ) {

	const [ value, setValue ] = useState( filter );

	const onChange = useAsyncDebounce( value => {
		setFilter( value || undefined )
	}, 500 )

	return (
		<>
			<span>
				Global Filter:{ ' ' }
				<input value={ value || '' }
					onChange={ evt => {
						setValue( evt.target.value )
						onChange( evt.target.value )
					} }
				/>
			</span>
		</>
	)
}

export default GlobalFilterInput
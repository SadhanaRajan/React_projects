import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import mockData from '../../data/MOCK_DATA.json'
import {
	COLUMNS,
} from '../../data/tableColumns'
import '../../styles/ReactTable.module.css'

function BasicTable () {

	const columns = useMemo( () => COLUMNS, [] );
	const data = useMemo( () => mockData, [] );

	const tableInstance = useTable( {
		columns,
		data,
	} );

	// console.log( tableInstance )

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance;


	return (
		<>
			<table { ...getTableProps() }>
				<thead>
					{ headerGroups.map( headerGroup => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map( column => (
								<th { ...column.getHeaderProps() }>
									{ column.render( 'Header' ) }
									<span>
										{ column.isSorted ? ( column.isSortedDesc ? ' ▼' : ' ▲' ) : '' }
									</span>
									<div>{ column.canFilter ? column.render( 'Filter' ) : null }</div>
								</th>
							) ) }
						</tr>
					) ) }
				</thead>
				<tbody { ...getTableBodyProps() }>
					{ rows.map( row => {
						prepareRow( row );
						return (
							<tr { ...row.getRowProps() }>
								{
									row.cells.map( cell => {
										return ( <td { ...cell.getCellProps() }>
											{ cell.render( 'Cell' ) }
										</td> )
									} )
								}
							</tr>
						)
					} ) }
				</tbody>
			</table>
		</>
	)
}

export default BasicTable
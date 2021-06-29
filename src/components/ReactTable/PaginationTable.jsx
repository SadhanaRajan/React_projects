import React, { useMemo } from 'react'
import { useTable, usePagination, useRowSelect } from 'react-table'
import mockData from '../../data/MOCK_DATA.json'
import {
	COLUMNS,
} from '../../data/tableColumns'
import '../../styles/ReactTable.module.css'

function PaginationTable () {

	const columns = useMemo( () => COLUMNS, [] );
	const data = useMemo( () => mockData, [] );

	const tableInstance = useTable( {
		columns,
		data
	}, usePagination );

	// console.log( tableInstance )

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		// rows,
		prepareRow,
		//pagination
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
		state,
	} = tableInstance;

	const { pageIndex, pageSize } = state

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
					{ page.map( row => {
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
			<br />
			<div style={ { textAlign: 'center' } }>
				<span>
					Page{ ' ' }
					<strong>
						{ pageIndex + 1 } of { pageOptions.length }
					</strong>{ ' ' }
				</span>
				<span>
					| Go to page: { ' ' }
					<input type='number' defaultValue={ pageIndex + 1 }
						onChange={ evt => {
							const pageNumber = evt.target.value ? Number( evt.target.value ) - 1 : 0
							gotoPage( pageNumber )
						} }
						style={ { width: '50px' } }
					/>
				</span>{ ' ' }
				<select value={ pageSize } onChange={ e => setPageSize( Number( e.target.value ) ) }>
					{
						[ 10, 25, 50 ].map( pageSize =>
							<option key={ pageSize } value={ pageSize }>
								Show { pageSize }
							</option>
						)
					}
				</select>{ ' ' }
				<button onClick={ () => gotoPage( 0 ) } disabled={ !canPreviousPage }>{ '<<' }</button>
				<button onClick={ () => previousPage() } disabled={ !canPreviousPage }>Previous</button>
				<button onClick={ () => nextPage() } disabled={ !canNextPage }>Next</button>
				<button onClick={ () => gotoPage( pageCount - 1 ) } disabled={ !canNextPage }>{ '>>' }</button>
			</div>
		</>
	)
}

export default PaginationTable
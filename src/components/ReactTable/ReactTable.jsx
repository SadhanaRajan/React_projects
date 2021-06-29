import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import mockData from '../../data/MOCK_DATA.json'
import {
	COLUMNS,
	// GROUPED_COLUMNS
} from '../../data/tableColumns'
import GlobalFilterInput from './GlobalFilterInput'
import '../../styles/ReactTable.module.css'
import { Columnfilter } from './ColumnFilter'

function ReactTable () {

	// const columns = useMemo( () => GROUPED_COLUMNS, [] );
	const columns = useMemo( () => COLUMNS, [] );
	const data = useMemo( () => mockData, [] );

	const defaultColumn = useMemo( () => {
		return {
			Filter: Columnfilter
		}
	}, [] );

	const tableInstance = useTable( {
		columns,
		data,
		defaultColumn
	}, useFilters, useGlobalFilter, useSortBy );

	// console.log( tableInstance )

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
		//global filter
		state,
		setGlobalFilter
	} = tableInstance;

	const { globalFilter } = state;

	return (
		<>
			<GlobalFilterInput
				filter={ globalFilter }
				setFilter={ setGlobalFilter }
			/>
			<table { ...getTableProps() }>
				<thead>
					{ headerGroups.map( headerGroup => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map( column => (
								<th { ...column.getHeaderProps( column.getSortByToggleProps() ) }>
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
				<tfoot>
					{ footerGroups.map( footerGroup => (
						<tr { ...footerGroup.getFooterGroupProps() }>
							{ footerGroup.headers.map( column => (
								<td { ...column.getFooterProps() }>
									{ column.render( 'Footer' ) }
								</td>
							) ) }
						</tr>
					) ) }
				</tfoot>
			</table>
		</>
	)
}

export default ReactTable
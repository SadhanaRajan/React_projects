import React, { useContext, useMemo } from 'react'
import { useTable, useRowSelect, useColumnOrder } from 'react-table'
import mockData from '../../data/MOCK_DATA.json'
import {
	COLUMNS,
} from '../../data/tableColumns'
import Checkbox from './Checkbox'
import ColorContext from '../ColorContext'
import '../../styles/ReactTable.module.css'

function RowColumnTable ( props ) {
	const columns = useMemo( () => COLUMNS, [] );
	const data = useMemo( () => mockData, [] );

	const tableInstance = useTable( {
		columns,
		data,
	}, useColumnOrder, useRowSelect,
		( hooks ) => {
			hooks.visibleColumns.push( ( columns ) => {
				return [
					{
						id: 'selection',
						Header: ( { getToggleAllRowsSelectedProps } ) => (
							<Checkbox { ...getToggleAllRowsSelectedProps() } />
						),
						Cell: ( { row } ) => (
							<Checkbox { ...row.getToggleRowSelectedProps() } />
						)
					},
					...columns
				]
			} )
		} );

	// console.log( tableInstance )

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows, //flat array of selected rows
		setColumnOrder,
		allColumns, //array of all cols supplied to the table
		getToggleHideAllColumnsProps, //lets you hide or show all columns at once
	} = tableInstance;

	const tenRows = rows.slice( 0, 10 )

	const changeOrder = () => {
		setColumnOrder( [ 'id',
			'first_name',
			'last_name',
			'phone',
			'country',
			'date_of_birth',
		] )
	}

	const getColumnOrderButton = () => {
		return (
			<>
				<button onClick={ changeOrder }>Change column order</button>
				<br />
			</>
		);
	};

	const getColumnHideToggles = () => {
		return (
			<>
				<div>
					<div>
						<Checkbox { ...getToggleHideAllColumnsProps() } /> Toggle All
					</div>
					{ allColumns.map( column => (
						<div key={ column.id }>
							<label>
								<input type="checkbox" { ...column.getToggleHiddenProps() } />
								{ column.Header }
							</label>
						</div>
					) ) }
				</div>
				<br />
			</>
		);
	};

	const renderSelectedRows = () => {
		return (
			<>
				<pre>
					<code>
						{ JSON.stringify(
							{
								selectedFlatRows: selectedFlatRows.map( row => row.original.id )
							}, null, 2
						) }
					</code>
				</pre>
			</>
		)
	};

	const { color, changeToGreen } = useContext( ColorContext )


	return (
		<>
			{/* { getColumnOrderButton() } */ }
			{/* { getColumnHideToggles() } */ }
			<table { ...getTableProps() }>
				{/* <ColorContext.Consumer>
					{ ( { } ) => ( */}
				<thead style={ { backgroundColor: color } }>
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
				{/* ) }
				</ColorContext.Consumer> */}
				<tbody { ...getTableBodyProps() }>
					{ tenRows.map( row => {
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
			<button onClick={ changeToGreen }>Change Header to Green</button>
			{/* { renderSelectedRows() } */ }
		</>
	)
}

export default RowColumnTable
import React, { useState, useEffect, useMemo } from 'react';

const COLUMNS = [ 'Name', 'Airline ID', 'Airline Name' ];

const USERS_URL = 'https://api.instantwebtools.net/v1/passenger';

export default function TablePaginationMemo () {

	const columnHeadings = useMemo( () => COLUMNS, [] );

	const pageSize = 10; //Assumption made in this problem
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ items, setItems ] = useState( [] );
	const [ pageNumber, setPageNumber ] = useState( 0 );
	const [ totalPageCount, setTotalPageCount ] = useState( null );
	const [ canPrevious, setCanPrevious ] = useState( false );
	const [ canNext, setCanNext ] = useState( true );

	/**
	 * Get number of pages from total records
	 * Example: for 33 records, there will be 4 pages
	 * pageSize is 10 ; Assumption made in this problem
	 */
	const calculateTotalPages = ( totalRecords, pageSize = 10 ) => {
		return Math.ceil( totalRecords / pageSize );
	}


	//fetch data when component mounts, and when pageNumber state changes
	useEffect( () => {
		fetch( `${ USERS_URL }?size=${ pageSize }&page=0` )
			.then( res => res.json() )
			.then(
				( response ) => {
					setButtons( response.totalPassengers );
					setIsLoaded( true );
					setTotalPageCount( calculateTotalPages( response.totalPassengers ) );
					setItems( response.data );
				} );
	}, [] );

	const getData = async ( pageNumber ) => {
		const res = await fetch( `${ USERS_URL }?size=${ pageSize }&page=${ pageNumber }` );
		const response = await res.json();
		return response;
	}
	const memoizedValue = useMemo( async () => {
		await getData( pageNumber );
	}, [ pageNumber ] );

	/**
	 * set the disabled state for all 4 buttons
	 */
	const setButtons = ( totalRecords, pageSize = 10 ) => {
		//if all records can fit in 1 page, or zero records
		if ( totalRecords <= pageSize ) {
			setCanPrevious( false );
			setCanNext( false );
		} else {
			//if first page, disable first and prev buttons
			setCanPrevious( pageNumber !== 0 );

			// if last page, disable next and last buttons
			setCanNext( pageNumber !== totalPageCount - 1 );
		}
	}

	const handleFirst = () => {
		setIsLoaded( false );
		setPageNumber( 0 );

	};
	const handlePrevious = () => {
		setIsLoaded( false );
		setPageNumber( pageNumber - 1 );

	};
	const handleNext = () => {
		setIsLoaded( false );
		setPageNumber( pageNumber + 1 );

	};
	const handleLast = () => {
		setIsLoaded( false );
		setPageNumber( totalPageCount - 1 );

	};

	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						{ columnHeadings.map( heading => <th key={ heading }>{ heading }</th> ) }
					</tr>
				</thead>
				<tbody>
					{ items.map( ( item, index ) => {
						return (
							<tr key={ index }>
								<td>{ item.name }</td>
								<td>{ item.airline.id }</td>
								<td>{ item.airline.name }</td>
							</tr>
						)
					} ) }
				</tbody>
			</table>
			<section className="pagination">
				<button className="first-page-btn" disabled={ !isLoaded || !canPrevious }
					onClick={ handleFirst }>first</button>
				<button className="previous-page-btn" disabled={ !isLoaded || !canPrevious }
					onClick={ handlePrevious }>previous</button>
				<button className="next-page-btn" disabled={ !isLoaded || !canNext }
					onClick={ handleNext }>next</button>
				<button className="last-page-btn" disabled={ !isLoaded || !canNext }
					onClick={ handleLast }>last</button>
			</section>
			{ pageNumber + 1 } of { totalPageCount }
		</div>
	);

}

/**
 * Template Literal in URL
 * setButtons could be renames - doesnt set any state
 * useMemo for column headings
 * map in render - each item should have unique ID
 */

import React, { useState, useEffect } from 'react';
import mock from '../../data/MOCK_DATA.json'

const USERS_URL = 'https://example.com/api/users';

export default function TablePagination () {

	// const pageSize = 10; //Assumption made in this problem
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
		/**
		 * Interview test Code
		 */
		// fetch( USERS_URL + '?page=' + pageNumber )
		// 	.then( res => res.json() )
		// 	.then(
		// 		( response ) => {
		// 			setButtons( response.count );
		// 			setIsLoaded( true );
		// 			setTotalPageCount( calculateTotalPages( response.count ) );
		// 			setItems( response.results );
		// 		} );


		/**
		 * mock code (API wont work; CORS)
		 */
		console.log( mock )
		setButtons( mock.length );
		setIsLoaded( true );
		setTotalPageCount( calculateTotalPages( mock.length ) );
		setItems( mock.slice( pageNumber * 10, ( pageNumber * 10 ) + 10 ) );
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
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>
					{ items.map( item => {
						return (
							<tr key={ item.id }>
								<td>{ item.id }</td>
								<td>{ item.first_name }</td>
								<td>{ item.last_name }</td>
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

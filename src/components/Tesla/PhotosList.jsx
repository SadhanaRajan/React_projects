import React, { useContext, useState } from "react";

// import PhotosContext from "./PhotosContext";
// import ThemeContext from "./ThemeContext";

// Use functional or class component based on your preference.
// Make it a default export.

export default function PhotosList () {

	// const { photos, fetchPhotos } = useContext( PhotosContext.Context );
	// const { theme } = useContext( ThemeContext.Context );

	const [ theme, setTheme ] = useState( 'light' )
	const photos = [
		{
			title: 'pic1',
			imgSrc: ''
		}
	];
	const fetchPhotos = () => {
		setTheme( theme === 'light' ? 'dark' : 'light' )
	}

	let bgColor = 'white';
	let textColor = 'black';


	if ( theme === 'light' ) {
		bgColor = 'white';
		textColor = 'black';
	} else {
		bgColor = 'black';
		textColor = 'white';
	}

	return (
		<>
			<div id='photos-list-container'
				style={ {
					backgroundColor: bgColor,
					color: textColor
				} }
			>
				<ul id='photos-list'>
					{
						photos.map( ( photo, index ) => {
							return ( <li key={ index }>
								<h3 style={ { color: textColor } }>
									{ photo.title }
								</h3>
								<img src={ photo.imgSrc } />
							</li> )
						} )
					}
				</ul>
			</div>
			<button
				id='fetch-photos'
				onClick={ fetchPhotos }
			> Fetch Photos</button>
		</>
	);
}

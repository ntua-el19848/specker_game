/* Not Found Page */

/* Imports */
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

/* Not Found Page */
export default function notFound() {

	function handleBackHome() {
		window.location.href = '/'; // Replace '/' with the URL of your home page
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Typography variant="h1" style={{ color: 'black' }}>
				404
			</Typography>
			<Typography variant="h6" style={{ color: 'black' }}>
				The page you’re looking for doesn’t exist.
			</Typography>
			<br></br>
			<Button variant="contained" onClick={handleBackHome}>
				Back Home
			</Button>
		</Box>
	);
}
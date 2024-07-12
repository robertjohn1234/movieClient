import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Movies() {
	const { user } = useContext(UserContext);
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState('');

	const fetchData = () => {
		fetch(`https://movie-catalog-system-api.onrender.com/movies/getMovies`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (typeof data.movies !== 'string') {
				setMovies(data.movies);
			} else { 
				setMovies([]);
			}
		})
		.catch(err => setError('Error fetching movies.'));
	}

	useEffect(() => {
		fetch('https://movie-catalog-system-api.onrender.com/movies/getMovies', {
			headers: { 
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if (data.movies && Array.isArray(data.movies)) {
				setMovies(data.movies);
			} else {
				setMovies([]);
			}
		})
		.catch(err => setError('Error fetching movies.'));
	}, []);

	return (
		<>
			{error && <p>{error}</p>}
			{user.isAdmin ? (
				<AdminView moviesData={movies} fetchData={fetchData} />
                
			) : (
				<UserView moviesData={movies} />
			)}
		</>
	);
}

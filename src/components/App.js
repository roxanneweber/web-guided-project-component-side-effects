import React, { useState, useEffect } from 'react';
// 👉 TASK 1 - import the axios lib from node_modules
import axios from 'axios';

// 👉 TASK 2 - import the contants from constants/index.js
import { BASE_URL, API_KEY } from '../constants';

import Details from './Details';
import Friend from './Friend';

export default function App() {
	const [friends, setFriends] = useState([]);
	const [currentFriendId, setCurrentFriendId] = useState(null);

	const openDetails = (id) => {
		setCurrentFriendId(id);
	};

	const closeDetails = () => {
		setCurrentFriendId(null);
	};

	// 👉 TASK 3 - make an effect that runs after FIRST DOM surgery
	// caused by the first render only. You'll need `useEffect` from React.
	// The effect should consist of a call to the API using axios.
	// On success, set the array of friend objects from the API into state.

	// how this works -- react will watch the info inside here, and it will 'run' every time react see that something here has changed
	// this will run once specifically AFTER it runs the return
	// everything in the curly brackets will run when react see something in the array change
	useEffect(() => {
		axios
			.get(`${BASE_URL}/friends?api_key=${API_KEY}`)
			.then((res) => {
				console.log(res.data);

				setFriends(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	/**
	 * ENDPOINTS
	 * GET -> url/friends/api_key
	 * POST ->
	 */

	// the return statement here is the first time the user sees anything on the page
	return (
		<div className='container'>
			<h1>Some of my friends:</h1>
			{
				// If the initial value of `friends` state weren't an empty array,
				// this would crash due to invoking `map` method on non-array.
				// We'd need a guard against this.

				// to map 1) array comes first + .map (make sure this is within curly braces so it knows it  is a JS function)
				// then 2) create a function that holds value (here it is info)
				// then 3) return the component and pass in the variables we need for child component Friend
				// remember that this Component also needs to define an index key

				friends.map((info) => {
					return (
						<Friend key={info.id} info={info} openDetails={openDetails} />
					);
				})
			}
			{currentFriendId && (
				<Details friendId={currentFriendId} close={closeDetails} />
			)}
		</div>
	);
}

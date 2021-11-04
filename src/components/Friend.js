import React from 'react';

const Friend = (props) => {
	//const {info} = props; -- alternate way you may see this so you don't need the props. in front of all the key/value names

	return (
		<div className='friend'>
			{props.info.name}
			<button onClick={() => props.openDetails(props.info.id)}>
				See details
			</button>
		</div>
	);
};

export default Friend;

/**
 * Dynamic Dropdown for customers.
 *
 * @author Lena Ara <aralena7@gmail.com>
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, withRouter } from 'react-router-dom';
import Select from './Select';

class SelectReact extends Component {
	constructor() {
		super();
		this.state = {
			dropdowns: [],
		};
	}

	componentDidMount() {
		let initialdropdowns = [];
		fetch('customer/psiApp')

		.then(response => {
		return response.json();
		}).then(data => {
		initialdropdowns = data.map((dropdown) => {
			return dropdown
		});

		//console.log(initialdropdowns);
		this.setState({
			dropdowns: initialdropdowns,
			});
		});
	}

	render() {
		return (
			<Select
				state={this.state}
			/>
		)
	}
}

export default SelectReact;



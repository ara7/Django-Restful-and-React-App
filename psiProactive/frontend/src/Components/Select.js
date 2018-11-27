/**
 * Dynamic Dropdown for customers.
 *
 * @author Lena Ara <aralena7@gmail.com>
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import Table from './Table';
import $ from 'jquery';
import Tasks from "./Tasks";
import MetricsTable from "./MetricsTable";

class Select extends React.Component {
	static propTypes = {
		onChange: PropTypes.func,
		name: PropTypes.string,
		value: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			availOptions: [],
			error: false,
			value: props.default,
			displayPopup: false,
			metric: []

		};

		this.handleChange = this.handleChange.bind(this);
		this.customerTable = this.customerTable.bind(this);
		this.showWindow = this.showWindow.bind(this);
		this.gotoMetrics = this.gotoMetrics(this);
	}


	handleChange(event) {
		this.setState({value: event.target.value});
		this.customerTable(event.target.value);// For rendering the table according to the customer selected
	}

	customerTable(value) {
		$.ajax({
		url: 'api/psiApp',
		dataType: 'json',
		type: 'get',
		data: {
			'customer_id': value
		},
		success: (returndata) => {
			if (returndata.returndata.length > 0) {

				ReactDOM.render(
				<div>
					<div className='filter'><Tasks customerID={value} /></div>
					<Table
						data={returndata.returndata}
						customerID={value}
					/>
				</div>, document.getElementById('customer-table')
				)
			}
			else {
				alert ('No results for this combination !');
			}
			}
		});
	}



	showWindow() { //Function if Adding New Customers option is needed in future
		this.setState({
			displayPopup: !this.state.displayPopup
		});
		ReactDOM.render(
			<Popup
				closePopup={this.showWindow.bind(null)}
			/>, document.getElementById('popWindow')
		)
	}

	gotoMetrics() {
		let metricsdata = [];
		fetch('metrics/psiApp')

		.then(response => {
		return response.json();
		}).then(data => {
		metricsdata = data.map((dropdown) => {
			return dropdown
		});

			ReactDOM.render(
				<div>
					<MetricsTable
						data={metricsdata}
					/>
					</div>, document.getElementById('customer-table')
				)
		});
	}

	render() {
		let dropdowns = this.props.state.dropdowns;
		let optionitems = dropdowns.map((dropdown) => {
			return(
				<option key={dropdown.auto_increment_id} value={dropdown.auto_increment_id}>
					{dropdown.customerName}
				</option>
			);
		});

	return (
		<div>
			<select value={this.state.value} onChange={this.handleChange}>
				<option value=''>Select Customer Name</option>
				{optionitems}
			</select>
			{' '}<a href='http://127.0.0.1:8000/'>See Metrics </a>
		</div>
		);
	}
}

export default Select;

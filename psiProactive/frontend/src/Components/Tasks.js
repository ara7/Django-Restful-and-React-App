/**
 * Tasks for customers.
 *
 * @author Lena Ara <aralena7@gmail.com>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Table from "./Table";


class Tasks extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		customerID: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			dropdowns: [],
			datafromkid: null,
			availOptions: [],
			selectedTask: '',
			customerState: '',
		};
		this.handleChangeTasks = this.handleChangeTasks.bind(this);
		this.handleSubmitTask = this.handleSubmitTask.bind(this);
		this.clearFilter = this.clearFilter.bind(this);
	}
	componentDidMount() {
		this.renderDropdown()
	}


	renderDropdown() {
		const { customerID } = this.props;

		this.setState({
					availOptions: [],
				});
		$.ajax({
			url: 'tasks/psiApp',
			dataType: 'json',
			type: 'get',
			data: {
				'customer_id': customerID
			},
			success:  (returndata) => {
				console.log('Returend', returndata.returndata);
				const availOptions = returndata.returndata.map((v, i) => {
					return <option key={v} value={v}>{v}</option>;
				});
				console.log('Updated', availOptions);
				this.setState({
					availOptions: availOptions,

				});
				console.log('state', availOptions);
			}
		});
	}

	handleChangeTasks(event) {
		const { customerID } = this.props;
		console.log('here', customerID);
		this.setState({selectedTask: event.target.value},
			()=> {
			this.state.selectedTask
		});
	}

	handleSubmitTask() {
		const { customerID } = this.props;
		if ($("#startVal").val() !== '' && $("#endVal").val() !== '' && this.state.selectedTask !== '') {
			console.log('Hello start', $("#startVal").val());
			console.log('Hello End', $("#endVal").val());

			let endValue = []
			if ($("#endVal").val() < $("#startVal").val()) {
				endValue = $("#startVal").val();
			}
			else {
				endValue = $("#endVal").val();
			}
			$.ajax({
				url: 'filter/psiapp',
				dataType: 'json',
				type: 'get',
				data: {
					'customer_id': customerID,
					'task': this.state.selectedTask,
					'start_date': $("#startVal").val(),
					'end_date': endValue,
				},
				success: function(returndata) {
					console.log('length', returndata.returndata.length);
					if (returndata.returndata.length > 0) {
						ReactDOM.render(
						<div>
							<div className='filter'><Tasks customerID={customerID}/></div>
								<Table
									data={returndata.returndata}
									customerID={customerID}
								/>
						</div>, document.getElementById('customer-table')
						)
					}
					else {
						alert('No results');
					}
				}
			});
		}
	}
	clearFilter() {
		const { customerID } = this.props;
		this.setState({selectedTask: ''})
		$('#startVal').val('Start Date');
		$('#endVal').val('End Date');
				$.ajax({
				url: 'clearfilter/psiapp',
				dataType: 'json',
				type: 'get',
				data: {
					'customer_id': customerID,
				},
				success: function(returndata) {
					console.log('length', returndata.returndata.length);
					if (returndata.returndata.length > 0) {
						ReactDOM.render(
						<div>
							<div className='filter'><Tasks customerID={customerID}/></div>
								<Table
									data={returndata.returndata}
									customerID={customerID}
								/>
						</div>, document.getElementById('customer-table')
						)
					}
					else {
						alert('No results');
					}
				}
			});
	}



	render() {
		const { customerID } = this.props;
		//console.log('Working', this.state.availOptions);
		return (
			<div>
				<form>
				<table>
					<thead>
					<tr>
						<td>
							<select type='text' placeholder='Start Date' id='startVal'>
								<option value='Start Date'>--Start Month--</option>
								<option value='1' id='jan'>January</option>
								<option value='2' id='feb'>February</option>
								<option value='3' id='mar'>March</option>
								<option value='4' id='apr'>April</option>
								<option value='5' id='may'>May</option>
								<option value='6' id='jun'>June</option>
								<option value='7' id='jul'>July</option>
								<option value='8' id='aug'>August</option>
								<option value='9' id='sep'>September</option>
								<option value='10' id='oct'>October</option>
								<option value='11' id='nov'>November</option>
								<option value='12' id='dec'>December</option>
							</select>
						</td>
						<td>
							<select type='text' placeholder='Start Date' id='endVal'>
								<option value='End Date'>--End Month--</option>
								<option value='1' id='janEnd'>January</option>
								<option value='2' id='febEnd'>February</option>
								<option value='3' id='marEnd'>March</option>
								<option value='4' id='aprEnd'>April</option>
								<option value='5' id='mayEnd'>May</option>
								<option value='6' id='junEnd'>June</option>
								<option value='7' id='julEnd'>July</option>
								<option value='8' id='augEnd'>August</option>
								<option value='9' id='sepEnd'>September</option>
								<option value='10' id='octEnd'>October</option>
								<option value='11' id='novEnd'>November</option>
								<option value='12' id='decEnd'>December</option>
							</select>
						</td>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td><select id="list" className='listnew' value={this.state.selectedTask} onChange={this.handleChangeTasks}>
							<option>Select Task </option>
							{this.state.availOptions}
						</select></td>
					</tr>
					<tr>
						<td><a className="button is-success is-rounded" type='button' onClick={this.handleSubmitTask}>Search</a>{' '}<a className="button is-danger is-rounded" type='button' onClick={this.clearFilter}>Clear</a> </td>
					</tr>
					</tbody>
				</table>
			</form>
			</div>
		)
	}
}

export default Tasks;



/**
 * Render table based on customer and filters and pagination.
 *
 * @author Lena Ara <aralena7@gmail.com>
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import key from 'weak-key';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Pagination from 'react-paginating';
import Tasks from "./Tasks";

class Table extends Component {


	constructor(props) {
		super(props);

		this.state = {
			popInfo: false,
			taskValue: '',
			monthValue: '',
			dateValue: '',
			checkedByValue: '',
			statusValue: '',
			notesValue: '',
			currentPage: 1
		};

	//Efficient early binding
		this.addInfoPopup = this.addInfoPopup.bind(this);
		this.updateTask = this.updateTask.bind(this);
		this.updateMonth = this.updateMonth.bind(this);
		this.updateDate = this.updateDate.bind(this);
		this.updateCheckedBy = this.updateCheckedBy.bind(this);
		this.updateStatus = this.updateStatus.bind(this);
		this.updateNotes = this.updateNotes.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeRow = this.removeRow.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange = page => {
		this.setState({
			currentPage: page
		});
	};
	addInfoPopup() {
		this.setState({
		popInfo: !this.state.popInfo
	});


	ReactDOM.render(
		<PopWindow
		/>, document.getElementById('pop-Info')
		)
	}

	updateTask(event) {
		this.setState({taskValue: event.target.value});
	}

	updateMonth(event) {
		this.setState({monthValue: event.target.value});
	}

	updateDate(event) {
		this.setState({dateValue: event.target.value});
	}

	updateCheckedBy(event) {
		this.setState({checkedByValue: event.target.value});
	}

	updateStatus(event) {
		this.setState({statusValue: event.target.value});
	}

	updateNotes(event) {
		this.setState({notesValue: event.target.value});
	}

	handleSubmit(customerID) {
		if (this.state.taskValue !== '' && this.state.monthValue !== '' && this.state.dateValue !== '' && this.state.checkedByValue !== '' && this.state.statusValue !== '' && this.state.notesValue !== '') {
			$.ajax({
				url: 'newInfo/psiApp',
				dataType: 'json',
				type: 'get',
				data: {
					'customer_id': customerID,
					'task': this.state.taskValue,
					'month': this.state.monthValue,
					'date': this.state.dateValue,
					'checkedBy': this.state.checkedByValue,
					'status': this.state.statusValue,
					'notes': this.state.notesValue,
				},
				success: function(returndata) {
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
			});
			let payload = new FormData();
			//{"Tasks": "Verify all credentials work", "Month": "August", "Date": "2018-03-31", "CheckedBy": "Nam", "Status": "Valid", "Notes": "SASINSTALL PSIADMIN"}
			payload.append('Tasks', this.state.taskValue);
			payload.append('Month', this.state.monthValue);
			payload.append('Date', this.state.dateValue);
			payload.append('CheckedBy', this.state.checkedByValue);
			payload.append('Status', this.state.statusValue);
			payload.append('Notes', this.state.notesValue);

			$.ajax({
				type: "POST",
				url: "connect.py",
				data: { param: text}
			}).done(function( o ) {
				console.log(o.status);
		});
		}
		else {
			alert('Please fill all the input fields.');
		}
	}

	removeRow(customerID, e) {
		let id_value = e.target.id;

		$.ajax({
			url: 'remove/psiApp',
			dataType: 'json',
			type: 'get',
			data: {
				'customer_id': customerID,
				'row_id': id_value
			},
			success: function(returndata) {
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
		});
	}

	render() {
		const { data } = this.props;

		const { customerID } = this.props;

		const limit = 3;
		const pageCount = 3;
		const total = data.length * limit;
		console.log('checking' + total);
		const { currentPage } = this.state;

		return (
			<div className='column'>
			<h2 className='subtitle'>
			Showing {data.length} items
			</h2>
				<div>
				<form>
				<table className='table is-striped loadTable' align='center'>
					<thead>
						<tr>
							<td>Action</td>
							{Object.entries(data[0]).map(el => <th key={key(el)}>{el[0]}</th>)}
						</tr>
					</thead>
					<tbody>
						{data.map((el) => (
							<tr key={el.auto_increment_id}>
								<td><a className="button is-info is-outlined" id={el.auto_increment_id} onClick={(e) => this.removeRow(customerID, e)}>x</a></td>
								{Object.entries(el).map(el => <td key={key(el)}>{el[1]}</td>)}
							</tr>
						))}
						<tr>
							<td>
								{' '}<a className="button is-info is-outlined" onClick={(e) => this.handleSubmit(customerID, e)}>Add</a>
							</td>
							<td>
							<input
								type='text'
								id='task'
								value={this.state.taskValue}
								onChange={this.updateTask}
							/>
						</td>
						<td>
							<input
								type='text'
								id='month'
								value={this.state.monthValue}
								onChange={this.updateMonth}
							/>
						</td>
						<td>
							<input
								type='text'
								id='date'
								value={this.state.dateValue}
								onChange={this.updateDate}
							/>
						</td>
						<td>
							<input
								type='text'
								id='checkedBy'
								value={this.state.checkedByValue}
								onChange={this.updateCheckedBy}
							/>
						</td>
						<td>
							<input
								type='text'
								id='status'
								value={this.state.statusValue}
								onChange={this.updateStatus}
							/>
						</td>
						<td>
							<input
								type='text'
								id='notes'
								value={this.state.notesValue}
								onChange={this.updateNotes}
							/>
						</td>
						</tr>
					</tbody>
				</table>
			</form>
				<Pagination
					total={total}
					limit={limit}
					pageCount={pageCount}
					currentPage={currentPage}
					count={Math.ceil(total / 2)}
				>
				{({
					pages,
					currentPage,
					hasNextPage,
					hasPreviousPage,
					previousPage,
					nextPage,
					totalPages,
					getPageItemProps
				}) => (
				<div>
					<Button outline color='primary'
						{...getPageItemProps({
							pageValue: 2,
							onPageChange: this.handlePageChange,
						})}
					>
						first
					</Button>

					{hasPreviousPage && (
						<Button outline color='primary'
							{...getPageItemProps({
							pageValue: previousPage,
							onPageChange: this.handlePageChange
						})}
						>
							{"<"}
						</Button>
					)}

					{pages.map(page => {
						let activePage = null;
						if (currentPage === page) {
							activePage = { backgroundColor: "#fdce09" };
						}
						return (
							<Button outline color='primary'
								key={page}
								style={activePage}
								{...getPageItemProps({
								pageValue: page,
								onPageChange: this.handlePageChange
								})}
							 >
								{page}
							</Button>
						);
					})}

					{hasNextPage && (
						<Button outline color='primary'
							{...getPageItemProps({
								pageValue: nextPage,
								onPageChange: this.handlePageChange
							})}
						 >
							{">"}
						</Button>
					)}

						<Button outline color='primary'
							{...getPageItemProps({
								pageValue: totalPages,
								onPageChange: this.handlePageChange
							})}
						>
							last
						</Button>
				</div>
				)}
				</Pagination>
				</div>

			</div>
		);

	}
}

export default Table;

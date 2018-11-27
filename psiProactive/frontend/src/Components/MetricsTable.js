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

class MetricsTable extends Component {


	constructor(props) {
		super(props);

		this.state = {
			currentPage: 1
		};

	//Efficient early binding
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange = page => {
		this.setState({
			currentPage: page
		});
	};


	render() {
		const { data } = this.props;

		const limit = 3;
		const pageCount = 3;
		const total = data.length * limit;
		console.log('checking' + total);
		const { currentPage } = this.state;

		return (
			<div className='column'>
			<h2 className='subtitle'>
			Showing {data.length} items of Metrics Table. Select the Customer to see 2018 data.
			</h2>
				<div>
				<form>
				<table className='table is-striped loadTable' align='center'>
					<thead>
						<tr>
							{Object.entries(data[0]).map(el => <th key={key(el)}>{el[0]}</th>)}
						</tr>
					</thead>
					<tbody>
						{data.map((el) => (
							<tr key={el.auto_increment_id}>
								{Object.entries(el).map(el => <td key={key(el)}>{el[1]}</td>)}
							</tr>
						))}
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

export default MetricsTable;

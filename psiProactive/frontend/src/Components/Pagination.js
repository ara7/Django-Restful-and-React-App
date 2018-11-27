import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class Pagination extends Component {
	constructor (props, context) {
		super(props, context);
		this.state = {
			currentPage: null,
			pageCount: null
		}
	}

	componentWillMount() {
		const startingPage = this.props.startingPage
			? this.props.startingPage
			: 1;
		const data = this.props.data;
		const pageSize = this.props.pageSize;
		let pageCount = parseInt(data.length / pageSize);
		if (data.length % pageSize > 0) {
			pageCount++;
		}
		this.setState({
			currentPage: startingPage,
			pageCount: pageCount
		});
	}

	setCurrentPage(num) {
		this.setState({currentPage: num});
	}

	createControls() {
		let controls = [];
		const pageCount = this.state.pageCount;
		for (let i = 1; i <= pageCount; i++) {
			const baseClassName = 'pagination-controls_button';
			const activeClassName = i === this.state.currentPage ? `${baseClassName}--active` : '';
			controls.push(
				<div
					className={`${baseClassName} ${activeClassName}`}
					onClick={() => this.setCurrentPage(i)}
				>
					{i}
				</div>
			);
		}
		return controls;
	}

	createPaginateData() {
		const data = this.props.data;
		const pageSize = this.props.pageSize;
		const currentPage = this.state.currentPage;
		const upperLimit = currentPage * pageSize;
		const dataSlice = data.slice((upperLimit - pageSize), upperLimit);
		return dataSlice;
	}

	render() {
		return (
			<div className='pagination'>
				<div className='pagination-controls'>
					{this.createControls()}
				</div>
				<div className='pagination-results'>
					{React.cloneElement(this.props.children, {data: this.createPaginateData()})}
				</div>
			</div>
		);
	}
}

Pagination.propTypes = {
	//data: React.PropTypes.string,
	//pageSize: React.PropTypes.number,
	//startingPage: React.PropTypes.number
};

Pagination.defaultProps = {
	pageSize: 25,
	startingPage: 1
}


export default Pagination;

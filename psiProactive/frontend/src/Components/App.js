import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './DataProvider';
import SelectReact from './SelectReact';
import logo from './favicon.ico';


const wrapper = document.getElementById('app');
	wrapper ? ReactDOM.render(

		<div>
			<nav className="navbar is-primary">
			<div className="navbar-brand">
				<div className="navbar-item">
						<img src={logo} alt='logo' />
				</div>
			</div>
			</nav>
			<h2 className="title">
				Pinnacle Proactive Support
			</h2>

				<div className='loadTable'>
				</div>
		</div>,
	wrapper) : null;

	ReactDOM.render(
		<SelectReact
		/>, document.getElementById('react-search')
	);

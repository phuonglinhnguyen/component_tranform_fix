import React, { useState } from 'react';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../store/actions/tranform_configuration';
import { filter, isEmpty } from 'lodash';
import { getTimeByCronValue } from '@dgtx/core-component-ui';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormLabel from '@material-ui/core/FormLabel';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import { AddDialog, EditDialog, DeleteDialog } from './Dialogs';
import Config from './Models/Config';

const styles: any = (theme: any) => {
	return {
		container: {
			maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
			margin: `${theme.spacing.unit * 8}px 0px 0px 0px`
		},
		top: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'baseline',
			marginBottom: '10px',
			marginRight: '10px'
		},
		table: {
			fontSize: '17px',
			fontWeight: '700',
			width: '25%'
		},
		tableConfig: {
			height: '200px',
			overflowY: 'scroll'
		},
		tableItem: {
			fontSize: '15px'
		},
		titleField: {
			fontWeight: 'bold',
			margin: `${theme.spacing.unit * 3}px 0px 0px 0px`,
			fontSize: '20px',
			paddingLeft: '20px'
		},
		selectRow: {
			cursor: 'pointer',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: 'lightgray'
			}
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginRight: theme.spacing.unit * 2,
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing.unit * 3,
				width: 'auto'
			}
		},
		searchIcon: {
			width: theme.spacing.unit * 9,
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		inputRoot: {
			color: 'inherit',
			width: '100%'
		},
		inputInput: {
			background: '#d3d3d375',
			borderRadius: '50px',
			paddingTop: theme.spacing.unit,
			paddingRight: theme.spacing.unit,
			paddingBottom: theme.spacing.unit,
			paddingLeft: theme.spacing.unit * 10,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: 200
			}
		},
		iconProgress: {
			position: 'absolute',
			padding: `${theme.spacing.unit}px`,
			color: theme.palette.primary.contrastText,
			top: '0px',
			right: '0px'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any,
	data?: any,
	getData?: any,
	pending?: any,
	success?: any,
	createData?: any,
	updateData?: any,
	deleteData?: any,
	refreshPage?: any,
	keyTranlate?: any
}
export interface IDefautState {
	isOpenAddModal?: any,
	setIsOpenAddModal?: any,
	selectedConfig?: any,
	setSelectedConfig?: any,
	strSearch?: any,
	setStrSearch?: any
}
const WapperComponent: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		data,
		createData,
		updateData,
		pending,
		success,
		refreshPage,
		setSelectedConfig,
		isOpenAdd,
		isOpenEdit,
		isOpenDel,
		setIsOpenAddDialog,
		setIsOpenEditDialog,
		setIsOpenDelDialog,
		setConfig
	} = props;

	const configs = data.data || [];
	const [ selectedConfig ] = useState(null);
	const [ strSearch, setStrSearch ] = useState(null);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
	const [ configDel, setConfigDel ] = React.useState('');

	// =====Search
	let searchTimeout = null;

	const onChangeSearch = (e) => {
		const value = e.target.value;
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		searchTimeout = setTimeout(() => {
			setStrSearch(value);
		}, 500);
	};
	//==Rows Per Page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	//===Filter Data
	const configData = filter(configs, (config) => {
		if (isEmpty(strSearch)) {
			return true;
		}
		const strToSearch = config.name.toLowerCase();
		return strToSearch.indexOf(strSearch.toLowerCase()) + 1;
	});

	return (
		<div className={classes.container}>
			<div className={classes.top}>
				<FormLabel className={classes.titleField}>
					<Translate value={`${KEY_TRANSLATE}.title_wrapper`} />
				</FormLabel>
				<div className={classes.top}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							onChange={onChangeSearch}
						/>
					</div>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => {
							let project_id = props.history.location.pathname
								.replace('/projects/', '')
								.replace('/tranform-config', '');
							let new_config = new Config();
							new_config.project_id = project_id;
							setConfig(new_config);
							setIsOpenAddDialog(true);
						}}
					>
						<Translate value={`${KEY_TRANSLATE}.add_config`} />
					</Button>
				</div>
			</div>
			<Paper style={{ overflow: 'auto', width: 'calc(100vw - 20px)' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className={classes.table}>
								<Translate value={`${KEY_TRANSLATE}.name`} />
							</TableCell>
							<TableCell className={classes.table} align="right">
								<Translate value={`${KEY_TRANSLATE}.cron_trigger`} />
							</TableCell>
							<TableCell className={classes.table} align="right">
								<Translate value={`${KEY_TRANSLATE}.version`} />
							</TableCell>
							<TableCell className={classes.table} align="right">
								<Translate value={`${KEY_TRANSLATE}.actions`} />
							</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</Paper>
			<Paper style={{ overflowY: 'auto', height: '730px', width: 'calc(100vw - 20px)' }}>
				<Table style={{ tableLayout: 'fixed' }}>
					<TableBody className={classes.tableConfig}>
						{configData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((config, index) => (
							<TableRow
								key={config.name}
								className={classes.selectRow}
								onClick={() => {
									setSelectedConfig(config);
									setIsOpenEditDialog(true);
								}}
							>
								<TableCell component="th" scope="row" className={classes.tableItem}>
									{config.name}
								</TableCell>
								<TableCell align="right" className={classes.tableItem}>
									{config.cron_trigger ? getTimeByCronValue(config.cron_trigger) : 'No Update'}
								</TableCell>
								<TableCell align="right" className={classes.tableItem}>
									{config.version ? config.version : 'Version updating...'}
								</TableCell>
								<TableCell align="right" className={classes.tableItem}>
									<IconButton
										aria-label="Delete"
										onClick={(e) => {
											e.stopPropagation();
											setConfigDel(config.name);
											setSelectedConfig(config);
											setIsOpenDelDialog(true);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
			<TablePagination
				rowsPerPageOptions={[ 5, 10, 25 ]}
				component="Paper"
				count={configData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			<AddDialog
				isOpen={isOpenAdd}
				setIsOpen={setIsOpenAddDialog}
				createData={createData}
				pending={pending}
				success={success}
				refreshPage={refreshPage}
				{...props}
			/>
			<EditDialog
				isOpen={isOpenEdit}
				setIsOpen={setIsOpenEditDialog}
				config={selectedConfig}
				setConfig={setSelectedConfig}
				selectedList={selectedConfig}
				setSelectedList={setSelectedConfig}
				updateData={updateData}
				pending={pending}
				success={success}
				refreshPage={refreshPage}
				{...props}
			/>
			<DeleteDialog
				isOpen={isOpenDel}
				setIsOpen={setIsOpenDelDialog}
				config={selectedConfig}
				setConfig={setSelectedConfig}
				selectedList={selectedConfig}
				setSelectedList={setSelectedConfig}
				updateData={updateData}
				pending={pending}
				success={success}
				refreshPage={refreshPage}
				configDel={configDel}
				{...props}
			/>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(WapperComponent);

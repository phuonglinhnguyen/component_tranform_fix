import React, { useState } from 'react';
import { Translate } from 'react-redux-i18n';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { KEY_TRANSLATE } from '../../../store/actions/export_configuration ';
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
import TablePagination from '@material-ui/core/TablePagination';
import { getTimeByCronValue } from '@dgtx/core-component-ui';
// import AddDialog from './DialogExport/AddDialog';
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
		titleField: {
			fontWeight: 'bold',
			margin: `${theme.spacing.unit * 3}px 0px 0px 0px`,
			fontSize: '20px'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any,
	data?: any
}
export interface IDefautState {}
const ExportComponent: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, data, setIsOpenAddDialog, setIsCloseDialog, isOpenAdd } = props;
	const exportData = data.data || [];
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

	console.log({ exportData });

	//==Rows Per Page
	const handleChangePage = (newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	return (
		<div className={classes.container}>
			<div className={classes.top}>
				<FormLabel className={classes.titleField}>
					<Translate value={`${KEY_TRANSLATE}.title_export`} />
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
							// onChange={onChangeSearch}
						/>
					</div>
					<Button
						variant="outlined"
						color="primary"
						onClick={async () => {
							setIsOpenAddDialog(true);
						}}
					>
						<Translate value={`${KEY_TRANSLATE}.add_config`} />
					</Button>
				</div>
			</div>
			<div style={{ overflow: 'auto' }}>
				<Table>
					<TableHead className={classes.headTab}>
						<TableRow>
							<TableCell className={classes.table}>
								{/* <Translate value={`${KEY_TRANSLATE}.name`} /> */}
								Name
							</TableCell>
							<TableCell className={classes.table} align="right">
								{/* <Translate value={`${KEY_TRANSLATE}.cron_trigger`} /> */}
								Cron Trigger
							</TableCell>
							<TableCell className={classes.table} align="right">
								{/* <Translate value={`${KEY_TRANSLATE}.version`} /> */}
								Type
							</TableCell>
							<TableCell className={classes.table} align="right">
								{/* <Translate value={`${KEY_TRANSLATE}.actions`} /> */}
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</div>
			<div style={{ overflowY: 'auto', height: '730px' }}>
				<Table style={{ tableLayout: 'fixed' }}>
					<TableBody className={classes.tableConfig}>
						{/* {exportData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((config) => (
							<TableRow key={config.name} className={classes.selectRow}>
								<TableCell component="th" scope="row" className={classes.tableItem}>
									{config.name}
								</TableCell>
								<TableCell align="right" className={classes.tableItem}>
									{config.cron_trigger ? getTimeByCronValue(config.cron_trigger) : 'No Update'}
								</TableCell>
								<TableCell align="right" className={classes.tableItem}>
									{config.version}
								</TableCell>
								<TableCell align="right" className={classes.tableItem}>
									<IconButton aria-label="Delete">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))} */}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				className={classes.rowPerPage}
				rowsPerPageOptions={[ 5, 10, 25 ]}
				component="div"
				count={exportData.length}
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
			{/* <AddDialog isOpen={isOpenAdd} setIsOpen={setIsOpenAddDialog} {...props} /> */}
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(ExportComponent);

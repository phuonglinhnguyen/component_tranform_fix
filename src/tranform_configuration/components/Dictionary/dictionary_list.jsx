import React, { useState } from 'react';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/tranform_configuration';
import FormLabel from '@material-ui/core/FormLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles: any = (theme: any) => {
	return {
		titleField: {
			fontWeight: 'bold',
		},
		demo: {
			backgroundColor: theme.palette.background.paper,
			overflowY: 'auto',
			height: '300px'
		},
		customSearch: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'baseline',
			paddingBottom: '20px',
			borderBottom: '2px solid lavender'
		},
		selectList: {
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
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any,
	dictionary?: any,
	setSelectedDictItem?: any,
	setMode?: any,
	config?: any,
	setConfig?: any,
	setConfigValidator?: any
}
export interface IDefautState {
	dense?: any,
	strSearch?: any,
	setStrSearch?: any,
	isOpen?: any,
	setIsOpen?: any
}

const DictionaryList: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, dictionary, setSelectedDictItem, setMode, setConfig, config, setConfigValidator } = props;

	const [ dense ] = useState(false);
	const [ strSearch, setStrSearch ] = useState(null);
	const [ isOpen, setIsOpen ] = useState(false);

	const deleteDict = (fieldKey) => {
		const newDict = dictionary.filter((dict_item) => dict_item.fieldKey !== fieldKey);
		const updateConfig = { ...config, dictionary: newDict };
		setConfig(updateConfig);
	};

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

	const dictData = filter(dictionary, (dictItem) => {
		if (isEmpty(strSearch)) {
			return true;
		}
		const strToSearch = dictItem.fieldKey.toLowerCase();
		return strToSearch.indexOf(strSearch.toLowerCase()) + 1;
  });
  
	const setNull = () => {
		setConfigValidator('fieldKey', false);
		setConfigValidator('host', false);
		setConfigValidator('port', false);
		setConfigValidator('username', false);
		setConfigValidator('password', false);
		setConfigValidator('database_name', false);
		setConfigValidator('schema_name', false);
  };
  
	return (
		<React.Fragment>
			<div className={classes.customSearch}>
				<FormLabel className={classes.titleField}>List Dictionary</FormLabel>
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
			</div>

			<div className={classes.demo}>
				<List dense={dense}>
					{dictData.map((dict_item) => {
						return (
							<ListItem
								key={dict_item.id}
								className={classes.selectList}
								onClick={() => {
									setSelectedDictItem(dict_item);
									setNull();
									setMode('edit');
								}}
							>
								<ListItemIcon>
									<FolderIcon />
								</ListItemIcon>
								<ListItemText primary={dict_item.fieldKey} secondary={dict_item.username} />
								<ListItemSecondaryAction>
									<IconButton aria-label="Delete" onClick={() => setIsOpen(true)}>
										<DeleteIcon />
									</IconButton>
									<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
										<DialogContent>Delete Dict? </DialogContent>

										<DialogActions>
											<Button onClick={() => setIsOpen(false)} color="primary">
												<Translate value={`${KEY_TRANSLATE}.disagree`} />
											</Button>
											<Button
												onClick={(e) => {
													e.stopPropagation();
													deleteDict(dict_item.fieldKey);
													setIsOpen(false);
												}}
												color="primary"
												autoFocus
											>
												<Translate value={`${KEY_TRANSLATE}.ok_delete`} />
											</Button>
										</DialogActions>
									</Dialog>
								</ListItemSecondaryAction>
							</ListItem>
						);
					})}
				</List>
			</div>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(DictionaryList);

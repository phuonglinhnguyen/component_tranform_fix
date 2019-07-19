import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import ChipInput from '@harshitpant/material-ui-chip-input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { isRequired } from '../../services';

const styles: any = (theme: any) => {
	return {
		dictionary: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '20px'
		},
		titleField: {
			fontWeight: 'bold'
		},
		textField: {
			width: '95%'
		},
		textField1: {
			width: '70%'
		},
		add: {
			background: '#3f51b5',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#1a237e'
			}
		},
		save: {
			background: '#689f38',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#1b5e20'
			}
		},
		formInput: {
			margin: '24px 0'
		},
		query: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		hidden: {
			display: 'none'
		},
		cancel: {
			marginRight: '10px',
			background: '#ff9800',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#e65100'
			}
		},
		error: {
			color: 'red',
			opacity: '0.8'
		},
		helper: {
			opacity: '0.5'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any,
	config?: any,
	setConfig?: any,
	dictItem?: any,
	setDictItem?: any,
	mode?: any,
	setMode?: any,
	dictionary?: any,
	configValidators?: any,
	setConfigValidator?: any
}
export interface IDefautState {
	chips?: any,
	setChips?: any
}

const DictionaryComponent: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		config,
		setConfig,
		dictItem,
		setDictItem,
		mode,
		dictionary,
		setMode,
		setConfigValidator,
		configValidators
	} = props;
	const query = get(dictItem, 'query', {});
	const queryArray = Object.keys(query);
	const [ chips, setChips ] = useState([]);
	const valDB = [ { label: 'MongoDB', value: 'MongoDB' }, { label: 'PostgresSQL', value: 'PostgresSQL' } ];

	useEffect(
		() => {
			setChips(queryArray);
		},
		[ dictItem ]
	);

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (configValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else if (configValidators[name]) {
			setConfigValidator(name, false);
		}
		setDictItem({
			...dictItem,
			[name]: value
		});
	};

	const checkIsEmpty = (newDictItem) => {
		let result = true;
		if (isEmpty(newDictItem.fieldKey)) {
			result = false;
			setConfigValidator('fieldKey', true);
		} else {
			setConfigValidator('fieldKey', false);
		}

		if (isEmpty(newDictItem.host)) {
			result = false;
			setConfigValidator('host', true);
		} else {
			setConfigValidator('host', false);
		}

		if (isEmpty(newDictItem.port)) {
			result = false;
			setConfigValidator('port', true);
		} else {
			setConfigValidator('port', false);
		}

		if (isEmpty(newDictItem.username)) {
			result = false;
			setConfigValidator('username', true);
		} else {
			setConfigValidator('username', false);
		}
		if (isEmpty(newDictItem.password)) {
			result = false;
			setConfigValidator('password', true);
		} else {
			setConfigValidator('password', false);
		}

		if (isEmpty(newDictItem.database_name)) {
			result = false;
			setConfigValidator('database_name', true);
		} else {
			setConfigValidator('database_name', false);
		}

		if (isEmpty(newDictItem.schema_name)) {
			result = false;
			setConfigValidator('schema_name', true);
		} else {
			setConfigValidator('schema_name', false);
		}

		return result;
	};

	const setNull = () => {
		setConfigValidator('fieldKey', false);
		setConfigValidator('host', false);
		setConfigValidator('port', false);
		setConfigValidator('username', false);
		setConfigValidator('password', false);
		setConfigValidator('database_name', false);
		setConfigValidator('schema_name', false);
	};

	const onAddDictionary = () => {
		if (mode === 'add') {
			const newDictItem = { ...dictItem };
			const checkEmpty = checkIsEmpty(newDictItem);
			if (checkEmpty) {
				setConfig({
					...config,
					dictionary: [ ...config.dictionary, newDictItem ]
				});
				setDictItem(null);
			}
		} else if (mode === 'edit') {
			const newDictionary = dictionary.map((_dictItem) => {
				if (_dictItem.fieldKey === dictItem.fieldKey) {
					return { ...dictItem };
				}
				return _dictItem;
			});

			const checkEmptyEdit = checkIsEmpty(dictItem);
			if (checkEmptyEdit) {
				setConfig({
					...config,
					dictionary: newDictionary
				});
				setMode('add');
				setDictItem(null);
				setNull();
			}
		}
	};

	const onCancel = () => {
		setMode('add');
		setDictItem(null);
		setNull();
	};

	const onChangeQuery = (chip) => {
		const newQuery = { ...query, [chip]: null };

		setDictItem({
			...dictItem,
			query: newQuery
		});
	};

	const onDeleteQuery = (chip) => {
		const newQuery = { ...query };
		delete newQuery[chip];
		setDictItem({
			...dictItem,
			query: newQuery
		});
	};

	return (
		<React.Fragment>
			<div className={classes.dictionary}>
				<FormLabel className={classes.titleField}>Dictionary</FormLabel>
				<div className={classes.actions}>
					<Fab
						size="small"
						className={mode === 'add' ? classes.hidden : classes.cancel}
						aria-label="Cancel"
						onClick={onCancel}
					>
						{mode === 'add' ? '' : <CancelIcon />}
					</Fab>
					<Fab
						size="small"
						aria-label="Add"
						className={mode === 'add' ? classes.add : classes.save}
						onClick={onAddDictionary}
					>
						{mode === 'add' ? <AddIcon /> : <DoneIcon />}
					</Fab>
				</div>
			</div>

			<div className={classes.formInput}>
				<Grid container spacing={12} alignItems="flex-end">
					<Grid item xs={6}>
						<TextField
							required
							label="Field Key"
							className={classes.textField}
							error={configValidators['fieldKey'].error}
							name="fieldKey"
							margin="dense"
							variant="outlined"
							onChange={onChangeText}
							value={dictItem && dictItem.fieldKey ? dictItem.fieldKey : ''}
							disabled={mode === 'edit'}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['fieldKey'].error ? configValidators['fieldKey'].message : ''}
						</FormHelperText>
					</Grid>
					<Grid item xs={6}>
						<TextField
							select
							name="database_type"
							className={classes.textField}
							variant="outlined"
							label="Database Type"
							margin="dense"
							value={dictItem && dictItem.database_type ? dictItem.database_type : ''}
							onChange={onChangeText}
						>
							{valDB.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<FormHelperText className={classes.helper}>Choose MongoDB/PostgresSQL</FormHelperText>
					</Grid>
				</Grid>
				<Grid container spacing={12} alignItems="flex-end">
					<Grid item xs={6}>
						<TextField
							required
							name="host"
							label="Host"
							error={configValidators['host'].error}
							className={classes.textField}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.host ? dictItem.host : ''}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['host'].error ? configValidators['host'].message : ''}
						</FormHelperText>
					</Grid>
					<Grid item xs={6}>
						<TextField
							required
							type="number"
							name="port"
							label="Port"
							error={configValidators['port'].error}
							className={classes.textField}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.port ? dictItem.port : ''}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['port'].error ? configValidators['port'].message : ''}
						</FormHelperText>
					</Grid>
				</Grid>
				<Grid container spacing={12} alignItems="flex-end">
					<Grid item xs={6}>
						<TextField
							required
							name="username"
							label="Username"
							className={classes.textField}
							error={configValidators['username'].error}
							type="text"
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.username ? dictItem.username : ''}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['username'].error ? configValidators['username'].message : ''}
						</FormHelperText>
					</Grid>
					<Grid item xs={6}>
						<TextField
							required
							name="password"
							placeHolder="Password"
							label="Password"
							type="password"
							error={configValidators['password'].error}
							className={classes.textField}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.password ? dictItem.password : ''}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['password'].error ? configValidators['password'].message : ''}
						</FormHelperText>
					</Grid>
				</Grid>
				<Grid container spacing={12} alignItems="flex-end">
					<Grid item xs={6}>
						<TextField
							required
							name="database_name"
							label="Database Name"
							className={classes.textField}
							type="text"
							error={configValidators['database_name'].error}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.database_name ? dictItem.database_name : ''}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['database_name'].error ? configValidators['database_name'].message : ''}
						</FormHelperText>
					</Grid>
					<Grid item xs={6}>
						<TextField
							required
							name="schema_name"
							error={configValidators['schema_name'].error}
							label="Schema Name"
							type="text"
							className={classes.textField}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.schema_name ? dictItem.schema_name : ''}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['schema_name'].error ? configValidators['schema_name'].message : ''}
						</FormHelperText>
					</Grid>
				</Grid>
				<Grid container spacing={12} alignItems="flex-end">
					<ChipInput
						defaultValue={queryArray}
						name="query"
						label="Query"
						fullWidth
						value={chips || []}
						onAdd={(chip) => onChangeQuery(chip)}
						onDelete={(chip) => onDeleteQuery(chip)}
					/>
				</Grid>
			</div>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(DictionaryComponent);

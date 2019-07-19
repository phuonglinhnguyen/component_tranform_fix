import React, { useState } from 'react';
import { Translate } from 'react-redux-i18n';
import { CronTriggerQuartz } from '@dgtx/core-component-ui';
import { getDataObject } from '@dgtx/coreui';
import { KEY_TRANSLATE } from '../../../store/actions/tranform_configuration';
import get from 'lodash/get';
import Form from 'react-validation/build/form';

import { withStyles } from '@material-ui/core/styles';
import { TextField, Switch } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import TransformDialog from './Dialogs/TranformDialog';
import Dictionary from './Dictionary';
import Rules from './Rules';
import { isRequired } from '../services';
import { getTimeByCronValue } from '@dgtx/core-component-ui';
const styles: any = (theme: any) => {
	return {
		container: {
			width: '100vw',
			maxWidth: '100%',
			align: 'center'
		},
		wrapp1: {
			display: 'flex',
			width: '100%'
		},
		wrapForm: {
			display: 'flex',
			justifyContent: 'space-around',
			marginTop:'20px'
		},
		textField: {
			marginRight: theme.spacing.unit
		},
		group: {
			margin: '24px auto'
		},
		formControl: {
			boxShadow: '-4px 3px 33px -10px rgba(0,0,0,0.75)',
			margin: `${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px 0px`,
			padding: '20px',
			minHeight: '200px'
		},
		radioGroup: {
			flexDirection: 'row',
			flexWrap: 'initial'
		},
		titleField: {
			fontWeight: 'bold',
			margin: '20px'
		},
		contentField: {
			fontSize: '14px',
			fontWeight: '200'
		},
		showPattern: {
			background: 'black',
			color: 'white',
			padding: '10px',
			marginTop: '10px',
			overflowWrap: 'break-word',
			height: '70px',
			overflowY: 'auto'
		},
		demo: {
			backgroundColor: theme.palette.background.paper
		},
		error: {
			color: 'red',
			opacity: '0.8'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any,
	config?: any,
	setConfig?: any,
	isOpen?: any,
	setIsOpen?: any,
	setConfigValidator?: any,
	configValidators?: any
}
export interface IDefautState {
	isOpenTransformModal?: any,
	setIsOpenTransformModal?: any
}
const InputComponent: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, config, setConfig, isOpen, setIsOpen, setConfigValidator, configValidators } = props;
	const [ isOpenTransformModal, setIsOpenTransformModal ] = useState(false);
	const [ statusCron, setStatusCron ] = useState('');
	const cronTrigger = config ? config.cron_trigger : '';

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (configValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else if (configValidators[name]) {
			setConfigValidator(name, false);
		}
		setConfig({
			...config,
			[name]: value
		});
	};

	const onChangeActive = (e) => {
		const name = e.target.name;
		const checked = e.target.checked;
		if (name === '') {
			alert('name must be filled out');
		}
		setConfig({
			...config,
			[name]: checked
		});
	};

	const onChangeRadio = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const collector = get(config, 'filter.collector', {});
		let newCollector = {};

		for (const key in collector) {
			if (key === value) {
				newCollector[key] = '350';
			} else {
				newCollector[key] = '';
			}
		}
		setConfig({
			...config,
			filter: {
				...config.filter,
				collector: newCollector
			}
		});
	};

	const collectorValue = () => {
		let value = '';
		const collector = get(config, 'filter.collector', {});
		for (const key in collector) {
			const final = collector[key]; // final = '350'
			if (final === '350') {
				value = key; // value = doc_status
			}
		}
		return value;
	};

	const handleChangeCron = (cronValue) => {
		setConfig({
			...config,
			cron_trigger: cronValue
		});
		let status = getTimeByCronValue(cronValue);
		setStatusCron(status);
	};

	return (
		<React.Fragment>
				<Grid className={classes.wrapForm} spacing={24}>
					<Grid item xs={12} md={6}>
						<FormLabel className={classes.titleField}>Config</FormLabel>

						<Form className={classes.formControl}>
							<div style={{ display: 'flex' }}>
								<TextField
									required
									defaultValue={config ? config.name : ''}
									name="name"
									label="Name"
									className={classes.textField}
									error={configValidators['name'].error}
									onChange={onChangeText}
								/>
								<FormHelperText className={classes.error}>
									{configValidators['name'].error ? configValidators['name'].message : ''}
								</FormHelperText>
								<TextField
									name="version"
									value={config ? config.version : 'Vesion updating...'}
									label="Version"
									className={classes.textField}
									onChange={(e) => {
										onChangeText(e);
									}}
									disabled
								/>
							</div>

							<FormGroup>
								<FormControlLabel
									label="Active"
									control={
										<Switch
											aria-label="Active"
											name="active"
											checked={config ? config.active : true}
											onChange={onChangeActive}
											color="primary"
										/>
									}
								/>
							</FormGroup>
						</Form>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormLabel className={classes.titleField}>Filter</FormLabel>
						<div className={classes.formControl}>
							<FormControl className={classes.formCollector}>
								<FormLabel className={classes.contentField}>Collector</FormLabel>
								<RadioGroup
									aria-label="Collector"
									name="collector"
									className={classes.radioGroup}
									value={collectorValue()}
									onChange={onChangeRadio}
								>
									<FormControlLabel value="doc_status" control={<Radio />} label="Doc_status" />
									<FormControlLabel value="batch_status" control={<Radio />} label="Batch_status" />
									<FormControlLabel value="doc_set_status" control={<Radio />} label="Doc_set_status" />
								</RadioGroup>
							</FormControl>
							<br />
							<Button variant="outlined" color="primary" onClick={() => setIsOpenTransformModal(true)}>
								<Translate value={`${KEY_TRANSLATE}.add_tranform`} />
							</Button>
							<TransformDialog
								isOpen={isOpenTransformModal}
								setIsOpen={setIsOpenTransformModal}
								config={config}
								setConfig={setConfig}
							/>
							<div className={classes.showPattern}>{getDataObject('filter.transform.pattern', config) || ''}</div>
						</div>
					</Grid>
				</Grid>

				<FormLabel className={classes.titleField}>Cron Trigger</FormLabel>
				<CronTriggerQuartz
					className={classes.group}
					cronValue={cronTrigger}
					tabs={[ 'minutes', 'hourly', 'daily', 'weekly' ]}
					onChange={handleChangeCron}
				/>
				<span>Cron value: {statusCron}</span>
				<Dictionary
					config={config}
					setConfig={setConfig}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					setConfigValidator={setConfigValidator}
					configValidators={configValidators}
				/>
				<FormLabel className={classes.titleField}>Rules</FormLabel>
				<Rules
					config={config}
					setConfig={setConfig}
					setConfigValidator={setConfigValidator}
					configValidators={configValidators}
				/>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(InputComponent);

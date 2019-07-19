import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { isEmpty, isFunction } from 'lodash';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import TestIcon from '@material-ui/icons/KeyboardArrowRight';
import { TextField } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import AceEditor from 'react-ace';
import FormHelperText from '@material-ui/core/FormHelperText';
import { isRequired } from '../../../services';
const styles: any = (theme: any) => {
	return {
		formContentItem: {
			boxShadow: '-4px 3px 33px -10px rgba(0,0,0,0.75)',
			padding: theme.spacing.unit * 3,
			display: 'flex',
			flexDirection: 'column'
		},
		titleField: {
			fontWeight: 'bold'
		},
		content: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '10px'
		},
		formContent: {
			textAlign: 'center'
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
		titleContent: {
			fontSize: '18px',
			margin: '10px 0'
		},
		error: {
			color: 'red',
			opacity: '0.8'
		},
		test: {
			display: 'flex',
			justifyContent: ' center',
			alignItems: 'center'
		},
		btnTest: {
			margin: theme.spacing.unit,
			fontSize: '12px',
			fontWeight: 'bold',
			'&:hover': {
				background: '#1a237e'
			}
		},
		extendedIcon: {
			marginRight: theme.spacing.unit
		},
		result: {
			width: '100%',
			background: 'lightgray',
			borderRadius: '30px',
			padding: '8px',
			border: 'none',
			fontSize: '15px'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any,
	config?: any,
	setConfig?: any,
	setContentItem?: any,
	content?: any,
	contentItem?: any,
	contentName?: any,
	setContentName?: any,
	contentArray?: any,
	setContentArray?: any,
	mode?: any,
	setMode?: any
}
const ContentItem: React.FC<IDefautProps> = (props) => {
	const {
		classes,
		config,
		setConfig,
		setContentItem,
		contentItem,
		contentName,
		contentArray,
		setContentName,
		setContentArray,
		mode,
		setMode,
		configValidators,
		setConfigValidator
	} = props;
	const [ contentTest, setContentTest ] = useState(null);
	const [ testContent, setTestContent ] = useState('');

	const setNull = () => {
		setConfigValidator('contentName', false);
		setConfigValidator('dataKey', false);
	};

	const checkIsEmpty = (contentName) => {
		let result = true;
		if (isEmpty(contentName)) {
			result = false;
			setConfigValidator('contentName', true);
		} else {
			setConfigValidator('contentName', false);
		}
		return result;
	};

	const checkIsEmptyItem = (contentItem) => {
		let result = true;
		if (isEmpty(contentItem)) {
			result = false;
			setConfigValidator('dataKey', true);
		} else {
			setConfigValidator('dataKey', false);
		}
		return result;
	};

	const onChangeText = (name, value) => {
		if (configValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else {
			setConfigValidator(name, false);
		}
		if (mode === 'add') {
			setContentItem({
				...contentItem,
				[name]: value
			});
		} else if (mode === 'edit') {
			setContentItem({
				contentName,
				contentItem: {
					...contentItem,
					[name]: value
				}
			});
		}
	};

	const onChangeContentName = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (configValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else {
			setConfigValidator(name, false);
		}
		if (mode === 'add') {
			setContentName(value);
		} else if (mode === 'edit') {
			setContentItem({
				contentName: value,
				contentItem
			});
		}
	};

	const onAddContentItem = () => {
		if (mode === 'add') {
			const newContentArray = [ ...contentArray ];
			const checkEmptyName = checkIsEmpty(contentName);
			const checkEmptyItem = checkIsEmptyItem(contentItem);
			if (checkEmptyName && checkEmptyItem) {
				newContentArray.unshift({
					contentName,
					contentItem
				});
				setConfig({
					...config,
					rules: {
						...config.rules,
						content: {
							...config.rules.content,
							[contentName]: contentItem
						}
					}
				});
				setContentArray(newContentArray);
				setContentItem(null);
				setContentName(null);
				setContentTest(null);
			}
		} else if (mode === 'edit') {
			const newContentArray = contentArray.map((_contentItem) => {
				if (_contentItem.contentItem.dataKey === contentItem.dataKey) {
					return { contentItem: { ...contentItem }, contentName };
				}
				return _contentItem;
			});
			console.log({newContentArray});
			console.log(newContentArray.contentName);
			const checkEmptyNameEdit = checkIsEmpty(newContentArray.contentName);
			setConfig({
				...config,
				rules: {
					...config.rules,
					content: {
						...config.rules.content,
						[contentName]: contentItem
					}
				}
			});
			setMode('add');
			setContentArray(newContentArray);
			setContentItem(null);
			setContentTest(null);
		}
	};

	const onCancel = () => {
		setMode('add');
		setContentItem(null);
		setContentTest(null);
		setNull();
	};

	const onTestContent = () => {
		try {
			window.eval(contentItem.defaultContent);
			const resultDefault = window.eval(contentTest);
			const checkFuncDefautt = window.eval(`(${contentItem.defaultContent})`);
			if (isFunction(checkFuncDefautt)) {
				setTestContent(resultDefault);
			} else {
				setTestContent('Funct default undefined');
			}
		} catch (error) {
			setTestContent('Funct default undefined');
		}
	};

	const onTestContentValue = () => {
		try {
			window.eval(contentItem.value);
			const resultValue = window.eval(contentTest);
			const checkFuncValue = window.eval(`(${contentItem.value})`);
			if (isFunction(checkFuncValue)) {
				setTestContent(resultValue);
			} else {
				setTestContent('Funct value undefined');
			}
		} catch (error) {
			setTestContent('Funct value undefined');
		}
	};

	return (
		<React.Fragment>
			<div className={classes.content}>
				<FormLabel className={classes.titleField}>Content</FormLabel>
				<div className={classes.actions}>
					<Fab
						size="small"
						className={mode === 'add' ? classes.hidden : classes.cancel}
						aria-label="Cancel"
						onClick={onCancel}
						hiddenCancel
					>
						{mode === 'add' ? '' : <CancelIcon />}
					</Fab>
					<Fab
						size="small"
						className={mode === 'add' ? classes.add : classes.save}
						aria-label="Add"
						onClick={onAddContentItem}
					>
						{mode === 'add' ? <AddIcon /> : <SaveIcon />}
					</Fab>
				</div>
			</div>
			<TextField
				required
				name="contentName"
				label="Name"
				className={classes.heading}
				error={configValidators['contentName'].error}
				onChange={onChangeContentName}
				value={contentName ? contentName : ''}
			/>
			<FormHelperText className={classes.error}>
				{configValidators['contentName'].error ? configValidators['contentName'].message : ''}
			</FormHelperText>
			<div className={classes.formContentItem}>
				<TextField
					required
					name="dataKey"
					label="DataKey"
					error={configValidators['dataKey'].error}
					onChange={(e) => onChangeText(e.target.name, e.target.value)}
					value={contentItem && contentItem.dataKey ? contentItem.dataKey : ''}
					disabled={mode === 'edit'}
				/>
				<FormHelperText className={classes.error}>
					{configValidators['dataKey'].error ? configValidators['dataKey'].message : ''}
				</FormHelperText>
				<label className={classes.titleContent}>Default</label>
				<AceEditor
					name="defaultContent"
					editorProps={{ $blockScrolling: 'Infinity' }}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
					enableSnippets={true}
					highlightActiveLine={true}
					width="100%"
					height="200px"
					fontSize="15px"
					mode="javascript"
					onChange={(e) => {
						onChangeText('defaultContent', e);
					}}
					showGutter={true}
					showPrintMargin={false}
					theme="solarized_dark"
					value={contentItem && contentItem.defaultContent ? contentItem.defaultContent : ''}
					width="100%"
				/>
				<label className={classes.titleContent}>Value</label>
				<AceEditor
					name="value"
					editorProps={{ $blockScrolling: 'Infinity' }}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
					enableSnippets={true}
					highlightActiveLine={true}
					width="100%"
					height="200px"
					mode="javascript"
					fontSize="15px"
					onChange={(e) => {
						onChangeText('value', e);
					}}
					showGutter={true}
					showPrintMargin={false}
					theme="solarized_dark"
					value={contentItem && contentItem.value ? contentItem.value : ''}
				/>
				<label className={classes.titleContent}>Input Test</label>
				<AceEditor
					name="contentTest"
					className={classes.ace}
					editorProps={{ $blockScrolling: 'Infinity' }}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
					enableSnippets={true}
					highlightActiveLine={true}
					width="100%"
					height="100px"
					mode="javascript"
					fontSize="15px"
					showGutter={true}
					showPrintMargin={false}
					onChange={(contentTest) => setContentTest(contentTest)}
					value={contentTest || ''}
				/>
				<div className={classes.test}>
					<Fab
						variant="extended"
						name="btnTestFunct"
						size="small"
						color="primary"
						aria-label="Test"
						className={classes.btnTest}
						onClick={onTestContent}
					>
						<TestIcon className={classes.extendedIcon} />
						Test Default
					</Fab>
					<Fab
						variant="extended"
						name="btnTestFunct"
						size="small"
						color="primary"
						aria-label="Test"
						className={classes.btnTest}
						onClick={onTestContentValue}
					>
						<TestIcon className={classes.extendedIcon} />
						Test Value
					</Fab>
				</div>
				<input
					name="testContent"
					className={classes.result}
					margin="normal"
					value={testContent || ''}
					onChange={(testContent) => setTestContent(testContent)}
					placeholder="Test Content Result"
					disabled
				/>
			</div>
		</React.Fragment>
	);
};

export default withStyles(styles, { withTheme: true })(ContentItem);

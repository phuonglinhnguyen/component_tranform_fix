import React, { useState } from 'react';
import get from 'lodash/get';

import { withStyles } from '@material-ui/core/styles';
import CommonInput from './common_input';
import CommonList from './common_list';
import Grid from '@material-ui/core/Grid';
const styles: any = (theme: any) => {
	return {
		wrapForm: {
			display: 'flex',
			justifyContent: 'space-around'
		},
		formControl: {
			boxShadow: '-4px 3px 33px -10px rgba(0,0,0,0.75)',
			margin: `${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px 0px`,
			padding: theme.spacing.unit * 2,
			minHeight: '200px'
		}
	};
};

export interface IDefautProps {
	styles?: any,
	theme?: any,
	setConfig?: any,
	config?: any
}
export interface IDefautState {
	common?: any,
	mode?: any,
	setMode?: any,
	commonValue?: any,
	setCommonValue?: any,
	commonName?: any,
	setCommonName?: any,
	selectedCommonValue?: any,
	setSelectedCommonValue?: any
}
const Common: React.FC<IDefautProps> = (props) => {
	const {classes, config, setConfig } = props;

	const common = get(config, 'rules.common', []);
	const [ mode, setMode ] = useState('add');
	const [ commonValue, setCommonValue ] = useState(null);
	const [ commonName, setCommonName ] = useState(null);
	const [ selectedCommonName, setSelectedCommonName ] = useState('');
	const [ selectedCommonValue, setSelectedCommonValue ] = useState(null);
  const [selectedCommonNameConstant, setSelectedCommonNameConstant] = useState('null');
	return (
		<Grid className={classes.wrapForm} spacing={24}>
			<Grid item xs={12} md={6} className={classes.formControl}>
			<CommonInput
				{...props}
				config={config}
				setConfig={setConfig}
				commonValue={selectedCommonValue ? selectedCommonValue : commonValue}
				setCommonValue={selectedCommonValue ? setSelectedCommonValue : setCommonValue}
				mode={mode}
				setMode={setMode}
				common={common}
				commonName={selectedCommonName ? selectedCommonName : commonName}
				setCommonName={selectedCommonName ? setSelectedCommonName : setCommonName}
				selectedCommonNameConstant={selectedCommonNameConstant}
			/>
			</Grid>
			<Grid item xs={12} md={6} className={classes.formControl}>
			<CommonList
				{...props}
				setMode={setMode}
				common={common}
				config={config}
				setConfig={setConfig}
				setSelectedCommonValue={setSelectedCommonValue}
				setSelectedCommonName={setSelectedCommonName}
				setSelectedCommonNameConstant={setSelectedCommonNameConstant}
			/>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles, { withTheme: true })(Common);

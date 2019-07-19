import React, { useState } from 'react';

import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/tranform_configuration';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputComponent from '../input_component';
import './dialog.css';

const styles: any = (theme: any) => {
	return {};
};
export interface IDefautProps {
	classes?: any,
	styles?: any,
	theme?: any,
	setIsCloseDialog?: any
}
export interface IDefautState {
	cronValue?: any,
	setCronValue?: any
}
const AddDialog: React.FC<IDefautProps, IDefautState> = (props) => {
	const { isOpen, classes, setIsCloseDialog } = props;
	const [ cronValue, setCronValue ] = useState(' ');

	const onAgree = () => {
		// createData(config);
	};

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsCloseDialog(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth="lg"
		>
			<DialogTitle className="tilte-dialog">
				{'Add Transform Config'}
				{/* {pending ? (
					<div className={classes.iconProgress}>
						<CircularProgress color="secondary" size={40} />
					</div>
				) : (
					''
				)} */}
			</DialogTitle>
			<DialogContent>
			hihihi
				{/* <InputComponent
					config={config}
					setConfig={setConfig}
					cronValue={cronValue}
					setCronValue={setCronValue}
					{...props}
				/> */}
			</DialogContent>

			<DialogActions>
				<Button onClick={() => setIsCloseDialog(false)} color="primary">
					{/* <Translate value={`${KEY_TRANSLATE}.disagree`} /> */}
					Close
				</Button>
				<Button onClick={onAgree} color="primary" >
					{/* <Translate value={`${KEY_TRANSLATE}.agree`} /> */}
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(AddDialog);

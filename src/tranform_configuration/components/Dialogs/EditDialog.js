import React from 'react';
import { Translate } from 'react-redux-i18n';
import { KEY_TRANSLATE } from '../../../../store/actions/tranform_configuration';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import './dialog.css';

import InputComponent from '../input_component';
const styles: any = (theme: any) => {
	return {
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
	styles?: any,
	theme?: any,
	config?: any,
	setConfig?: any,
	isOpen?: any,
	setIsOpen?: any,
	pending?: any,
	updateData?: any,
	refreshPage?: any,
	setIsCloseDialog?: any
}

const EditDialog: React.FC<IDefautProps> = (props) => {
	const { classes, isOpen, config, setConfig, updateData, pending, refreshPage, setIsCloseDialog } = props;

	const onAgree = () => {
		updateData(config);
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
				{'Edit Transform Config'}
				{pending ? (
					<div className={classes.iconProgress}>
						<CircularProgress color="secondary" size={40} />
					</div>
				) : (
					''
				)}
			</DialogTitle>
			<DialogContent>
				<InputComponent config={config} setConfig={setConfig} editable={true} {...props} />
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsCloseDialog(false)} color="primary">
					<Translate value={`${KEY_TRANSLATE}.disagree`} />
				</Button>
				<Button onClick={onAgree} color="primary" disabled={pending ? pending : refreshPage}>
					<Translate value={`${KEY_TRANSLATE}.agree`} />
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles, { withTheme: true })(EditDialog);

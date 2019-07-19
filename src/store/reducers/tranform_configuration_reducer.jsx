import * as actions from '../actions/tranform_configuration';
import { cloneDeep } from 'lodash';
import Config from '../../views/tranform_configuration/components/Models/Config';

export const configValidators = {
	name: {
		error: false,
		message: `The field name is required!`
	},
	fieldKey: {
		error: false,
		message: `The field fieldKey is required!`
	},
	host: {
		error: false,
		message: `The field host is required!`
	},
	port: {
		error: false,
		message: `The field port is required!`
	},
	username: {
		error: false,
		message: `The field username is required!`
	},
	password: {
		error: false,
		message: `The field password is required!`
	},
	database_name: {
		error: false,
		message: `The field database name is required!`
	},
	schema_name: {
		error: false,
		message: `The field scheme name is required!`
	},
	commonName: {
		error: false,
		message: `The field common Name is required!`
	},
	contentName: {
		error: false,
		message: `The field content Name is required!`
	},
	dataKey: {
		error: false,
		message: `The field dataKey is required!`
	}
};

const initialState = {
	pending: false,
	error: false,
	success: false,
	data: [],
	refreshPage: false,
	config: new Config(),
	isOpenAdd: false,
	isOpenEdit: false,
	isOpenDel: false,
	configValidators
};

export default {
	name: actions.NAME_REDUCER,
	reducer: (state = { ...cloneDeep(initialState) }, { type, payload }: any): any => {
		switch (type) {
			case actions.TRANFORM_CONFIGURATION_GET_DATA:
			case actions.TRANFORM_CONFIGURATION_UPDATE_DATA:
			case actions.TRANFORM_CONFIGURATION_CREATE_DATA:
			case actions.TRANFORM_CONFIGURATION_DELETE_DATA:
			case actions.PENDING:
			case actions.RESET:
			case actions.ERROR:
			case actions.SUCCESS:
			case actions.SET_CONFIG:
			case actions.SET_SELECTED_CONFIG:
			case actions.SET_IS_OPEN_ADD_DIALOG:
			case actions.SET_IS_OPEN_EDIT_DIALOG:
			case actions.SET_IS_OPEN_DEL_DIALOG:
			case actions.SET_IS_CLOSE_DIALOG:
			case actions.SET_CONFIG_VALIDATOR:
				return {
					...state,
					...payload
				};
			case actions.TRANFORM_CONFIGURATION_UNMOUNT:
				return cloneDeep(initialState);
			default:
				return state;
		}
	}
};

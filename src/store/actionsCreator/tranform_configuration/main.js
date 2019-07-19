import * as actions from '../../actions/tranform_configuration';
import { getDataObject } from '@dgtx/coreui';
import { callAPIGetData, callAPICreateData, callAPIDeleteData, callAPIUpdateData } from './call_api';
import { cloneDeep, isEmpty } from 'lodash';
import { showNotification } from '@dgtx/coreui';
import Config from '../../../views/tranform_configuration/components/Models/Config';
import { configValidators as default_configValidator } from '../../reducers/tranform_configuration_reducer';

export const getData = (projectId: any) => async (dispatch: any) => {
	dispatch(resetStateAPI());
	dispatch(setPending());
	dispatch(getDataTranform(projectId));
};

//get all list data tranform
export const getDataTranform = (projectId: any) => async (dispatch: any) => {
	const data = await dispatch(callAPIGetData({ projectId }));
	if (data.code) {
		dispatch({
			type: actions.TRANFORM_CONFIGURATION_GET_DATA,
			payload: {
				data: [],
				refreshPage: false
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
		dispatch(setSuccess());
	} else {
		dispatch({
			type: actions.TRANFORM_CONFIGURATION_GET_DATA,
			payload: {
				data: data,
				refreshPage: false
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
		dispatch(setSuccess());
	}
};

// createDataTransform
export const createData = (config: any) => async (dispatch: any) => {
	const checkConfigResult = await dispatch(checkConfigValidator(config));
	if (checkConfigResult) {
		const projectId = config.project_id;
		dispatch(
			callAPICreateData({
				data: config,
				projectId: projectId
			})
		);
		dispatch(getDataTranform(projectId));
		dispatch({
			type: actions.TRANFORM_CONFIGURATION_CREATE_DATA,
			payload: {
				config
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
	}
};

// updateDataTransform
export const updateData = (config: any) => async (dispatch: any) => {
	const checkConfigResult = await dispatch(checkConfigValidator(config));
	if (checkConfigResult) {
		const projectId = cloneDeep(config.project_id);
		delete config.project_id;
		await dispatch(
			callAPIUpdateData({
				data: config,
				projectId: projectId,
				id: config.id
			})
		);
		await dispatch(getDataTranform(projectId));
		dispatch({
			type: actions.TRANFORM_CONFIGURATION_UPDATE_DATA,
			payload: {
				config
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
	}
};

// deleteDataTransform
export const deleteData = (config: any) => async (dispatch: any) => {
	const projectId = config.project_id;
	await dispatch(
		callAPIDeleteData({
			id: config.id,
			projectId: projectId
		})
	);
	await dispatch(getDataTranform(projectId));
	dispatch({
		type: actions.TRANFORM_CONFIGURATION_DELETE_DATA,
		payload: {
			config
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

export const unmount = () => async (dispatch: any) => {
	dispatch({
		type: actions.TRANFORM_CONFIGURATION_UNMOUNT,
		payload: {},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

export const setPending = () => {
	return {
		type: actions.PENDING,
		payload: {
			success: false,
			pending: true,
			error: false
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setSuccess = () => {
	return {
		type: actions.SUCCESS,
		payload: {
			success: true,
			pending: false,
			error: false
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setError = () => {
	return {
		type: actions.ERROR,
		payload: {
			success: false,
			pending: false,
			error: true
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsOpenAddDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_ADD_DIALOG,
		payload: {
			isOpenAdd: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsOpenEditDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_EDIT_DIALOG,
		payload: {
			isOpenEdit: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsOpenDelDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_DEL_DIALOG,
		payload: {
			isOpenDel: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsCloseDialog = (value) => {
	return {
		type: actions.SET_IS_CLOSE_DIALOG,
		payload: {
			isOpenAdd: value,
			isOpenEdit: value,
			config: new Config(),
			configValidators: default_configValidator
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const resetStateAPI = () => {
	return {
		type: actions.RESET,
		payload: {
			success: false,
			pending: false,
			error: false
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setConfig = (config: any) => async (dispatch: any) => {
	dispatch({
		type: actions.SET_CONFIG,
		payload: {
			config
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

export const setSelectedConfig = (config: any) => async (dispatch: any) => {
	dispatch({
		type: actions.SET_SELECTED_CONFIG,
		payload: {
			config
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

const checkConfigValidator = (config: any) => async (dispatch: any) => {
	let result = true;
	if (config) {
		if (isEmpty(config.name)) {
			await dispatch(setConfigValidator('name', true));
			result = false;
		}
	} else {
		result = false;
	}
	return result;
};

export const setConfigValidator = (name, value) => async (dispatch: any, getState: any) => {
	const { core } = cloneDeep(getState());
	let configValidators = getDataObject(`resources.${actions.NAME_REDUCER}.data.configValidators`, core);
	configValidators[name].error = value;

	await dispatch({
		type: actions.SET_CONFIG_VALIDATOR,
		payload: {
			configValidators
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

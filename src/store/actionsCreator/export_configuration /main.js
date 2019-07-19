import * as actions from '../../actions/export_configuration ';
import { getDataObject } from '@dgtx/coreui';
import { callAPIGetDataExport, callAPICreateData, callAPIDeleteData, callAPIUpdateData } from './call_api';
import { cloneDeep, isEmpty } from 'lodash';
import { showNotification } from '@dgtx/coreui';

export const getDataExport = (projectId: any) => async (dispatch: any) => {
	const data = await dispatch(callAPIGetDataExport({ projectId }));
		dispatch({
			type: actions.EXPORT_CONFIGURATION_GET_DATA,
			payload: {
				data: data,
				refreshPage: false
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
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
export const setIsCloseDialog = (value) => {
	return {
		type: actions.SET_IS_CLOSE_DIALOG,
		payload: {
			isOpenAdd: value,
			// isOpenEdit: value,
			// config: new Config(),
			// configValidators: default_configValidator
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};
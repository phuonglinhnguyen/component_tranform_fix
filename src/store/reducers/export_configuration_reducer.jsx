import * as actions from '../actions/export_configuration ';
import { cloneDeep } from 'lodash';

const initialState = {
	isOpenAdd: false,
};

export default {
	name: actions.NAME_REDUCER,
	reducer: (state = { ...cloneDeep(initialState) }, { type, payload }: any): any => {
		switch (type) {
			case actions.EXPORT_CONFIGURATION_GET_DATA:
				return {
					...state,
					...payload
				};
			case actions.EXPORT_CONFIGURATION_UNMOUNT:
				return cloneDeep(initialState);
			default:
				return state;
		}
	}
};

import * as actions from '../actions/general_configuration';
import {cloneDeep} from 'lodash'
const initialState = {
    pending: false,
    error: false,
    success: false,
    [`${actions.FIELD_EXPORT_FORMAT}`]: [],
    [`${actions.STRUCTURES}`]: {},
    [`${actions.FIELD_GENERAL}`]: {},
    dataParent: [],
    dataItem: {},
    dataItemParent: {},
    edit: true,
    add: false,
    refreshPage: false,
}
export default {
    name: actions.NAME_REDUCER,
    reducer: (state = { ...cloneDeep(initialState) }, { type, payload }: any): any => {
        switch (type) {
            case actions.GENERAL_CONFIGURATION_GET_DATA_GENERAL_CONFIGURATION:
            case actions.GENERAL_CONFIGURATION_GET_DATA_EXPORT_FORMAT:
            case actions.GENERAL_CONFIGURATION_GET_DATA:
            case actions.GENERAL_CONFIGURATION_CLICK_ITEM:
            case actions.GENERAL_CONFIGURATION_MONDIFY_DATA:
            case actions.GENERAL_CONFIGURATION_UPDATE_ITEM:
            case actions.GENERAL_CONFIGURATION_ADD_NEW_ITEM:
            case actions.GENERAL_CONFIGURATION_CRUD_ITEM_SUCCESS:
            case actions.RESET:
            case actions.PENDING:
            case actions.ERROR:
            case actions.SUCCESS:
                return {
                    ...state,
                    ...payload
                }
            case actions.GENERAL_CONFIGURATION_UNMOUNT:
                return cloneDeep(initialState);
            default:
                return state;
        }
    }
}
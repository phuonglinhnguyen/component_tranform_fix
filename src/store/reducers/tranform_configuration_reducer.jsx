import * as actions from "../actions/tranform_configuration";
import { cloneDeep } from "lodash";
import Config from "../../views/tranform_configuration/components/Models/Config";
const configValidators = {
  'name': {
    error: false,
    message: `The field name is wrong!`
  },
  'fieldKey': {
    error: false,
    message: `The field fieldKey is required!`
  },
  'commonName': {
    error: false,
    message: `The field commonName is required!`
  },
  'contentName': {
    error: false,
    message: `The field contentName is required!`
  },
  'dataKey': {
    error: false,
    message: `The field dataKey is required!`
  }
}
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
  isErrorsConfig: true,
  configValidators
};

export default {
  name: actions.NAME_REDUCER,
  reducer: (
    state = { ...cloneDeep(initialState) },
    { type, payload }: any
  ): any => {
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
      case actions.SET_ERRORS_CONFIG:
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

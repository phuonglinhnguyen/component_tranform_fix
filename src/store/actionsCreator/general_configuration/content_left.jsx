import * as actions from '../../actions/general_configuration';
import { getDataObject } from '@dgtx/coreui';
import {
    ConstantRender,
    ManagerRules,
    ManagerData,
} from '@dgtx/core-component-ui'
import {
    crudUpdate,
    crudCreate,
    crudDelete,
    showNotification
} from '@dgtx/coreui';
import { getDataGeneralConfiguration, resetStateAPI, setPending, setSuccess, setError } from './general_configuration_actions_creator_main';
import { cloneDeep } from 'lodash'
export const clickItem = (item: any) => async (dispatch: any, getState: any) => {
    const { core } = cloneDeep(getState());
    const dataParent = getDataObject(`resources.${actions.NAME_REDUCER}.data.dataParent`, core);
    const structure = cloneDeep(actions.STRUCTURES_FIELD);
    const dataGeneral = getDataObject(`resources.${actions.NAME_REDUCER}.data.${actions.FIELD_GENERAL}`, core);
    const dataExportFormat = getDataObject(`resources.${actions.NAME_REDUCER}.data.${actions.FIELD_EXPORT_FORMAT}`, core);
    const datas = dataParent.filter((i: any) => i[`${actions.FIELD_ID}`] === item[`${actions.FIELD_ID}`]);
    const data = datas[0];
    delete data.id;
    delete data.last_modified;
    delete data.created_date;
    const input: any = {
        data,
        dataGeneral,
        [`${actions.FIELD_EXPORT_FORMAT}`]: dataExportFormat,
        ConstantRender,
        structure,
    }
    const { dataGeneralU, structureU } = ManagerData.convertDataforStructure(input);
    dispatch({
        type: actions.GENERAL_CONFIGURATION_CLICK_ITEM,
        payload: {
            dataItem: dataGeneralU,
            edit: false,
            add: false,
            [`${actions.STRUCTURES}`]: structureU,
            dataItemParent: data,
        },
        meta: {
            resource: actions.NAME_REDUCER
        }
    });
}

export const clickUpdate = (projectId: any) => async (dispatch: any, getState: any) => {
    const { core } = cloneDeep(getState());
    const dataItem = getDataObject(`resources.${actions.NAME_REDUCER}.data.dataItem`, core);
    const dataItemParent = getDataObject(`resources.${actions.NAME_REDUCER}.data.dataItemParent`, core);
    const add = getDataObject(`resources.${actions.NAME_REDUCER}.data.add`, core);
    const structure = getDataObject(`resources.${actions.NAME_REDUCER}.data.${actions.STRUCTURES}`, core);
    const { data, check } = ManagerRules.checkRulesAllField(dataItem, structure, actions.KEY_TRANSLATE);
    if (check) {
        dispatch({
            type: actions.GENERAL_CONFIGURATION_UPDATE_ITEM,
            payload: {
                dataItem: data,
                edit: false,
            },
            meta: {
                resource: actions.NAME_REDUCER
            }
        });
    }
    else {
        if (add) {
            dispatch(addItem(dataItemParent))
        }
        else {
            dispatch(editItem(dataItemParent))
        }
    }
}

export const clickAdd = (projectId: any, projectName: any) => async (dispatch: any, getState: any) => {
    const dataInsert = {
        [actions.FIELD_PROJECT_ID]: projectId,
        [actions.FIELD_PROJECT_NAME]: projectName
    }
    dispatch(resetData(actions.GENERAL_CONFIGURATION_ADD_NEW_ITEM, dataInsert));
}

export const clickDelete = (item: any) => async (dispatch: any, getState: any) => {
    const id = item[actions.FIELD_ID];
    const projectId = item[`${actions.FIELD_PROJECT_ID}`];
    const dataInsert = {
        [actions.FIELD_PROJECT_ID]: projectId,
        [actions.FIELD_PROJECT_NAME]: item[`${actions.FIELD_PROJECT_NAME}`]
    }
    dispatch(resetStateAPI());
    dispatch(setPending());
    dispatch(crudDelete("general_configuration", { data: { id }, projectId }, {
        onSuccess: async () => {
            dispatch(resetData(null, dataInsert));
            dispatch(setSuccess());
            dispatch(showNotification(`${actions.KEY_TRANSLATE}.delete_success`, 'success', { i18n: true, duration: 1500 }));
        },
        onFailure: () => {
            dispatch(setError());
            dispatch(showNotification(`${actions.KEY_TRANSLATE}.delete_error`, 'error', { i18n: true, duration: 1500 }));
        }
    }))
}

const addItem = (item: any) => async (dispatch: any, getState: any) => {
    delete item[`${actions.FIELD_ID}`];
    const projectId = item[`${actions.FIELD_PROJECT_ID}`];
    const dataInsert = {
        [actions.FIELD_PROJECT_ID]: projectId,
        [actions.FIELD_PROJECT_NAME]: item[`${actions.FIELD_PROJECT_NAME}`]
    }
    dispatch(resetStateAPI());
    dispatch(setPending());
    dispatch(crudCreate("general_configuration", { data: item, projectId }, {
        onSuccess: async () => {
            dispatch(resetData(null, dataInsert));
            dispatch(setSuccess());
            dispatch(showNotification(`${actions.KEY_TRANSLATE}.add_success`, 'success', { i18n: true, duration: 1500 }));
        },
        onFailure: () => {
            dispatch(setError());
            dispatch(showNotification(`${actions.KEY_TRANSLATE}.add_error`, 'error', { i18n: true, duration: 1500 }));
        }
    }))
}

const editItem = (item: any) => async (dispatch: any, getState: any) => {
    const projectId = item[`${actions.FIELD_PROJECT_ID}`];
    const dataInsert = {
        [actions.FIELD_PROJECT_ID]: projectId,
        [actions.FIELD_PROJECT_NAME]: item[`${actions.FIELD_PROJECT_NAME}`]
    }
    dispatch(resetStateAPI());
    dispatch(setPending());
    dispatch(crudUpdate("general_configuration", { data: item, projectId }, {
        onSuccess: async () => {
            dispatch(resetData(null, dataInsert));
            dispatch(setSuccess());
            dispatch(showNotification(`${actions.KEY_TRANSLATE}.edit_success`, 'success', { i18n: true, duration: 1500 }));
        },
        onFailure: () => {
            dispatch(setError());
            dispatch(showNotification(`${actions.KEY_TRANSLATE}.edit_error`, 'error', { i18n: true, duration: 1500 }));
        }
    }))
}

const resetData = (type?: any, dataInsert?: any) => async (dispatch: any, getState: any) => {
    const { core } = cloneDeep(getState());
    const dataGeneral = cloneDeep(actions.FIELD_ATRRIBUTES_GENERAL);
    const structure = cloneDeep(actions.STRUCTURES_FIELD);
    const jsonField = cloneDeep(actions[actions.JSON]);
    const dataExportFormat = getDataObject(`resources.${actions.NAME_REDUCER}.data.${actions.FIELD_EXPORT_FORMAT}`, core);
    dataGeneral[actions.FIELD_EXPORT_FORMAT][ConstantRender.KEY_FIELD_VALUES_LIST] = dataExportFormat;
    const payload = {
        dataItem: {},
        edit: true,
        dataItemParent: {},
        [`${actions.STRUCTURES}`]: structure,
        [`${actions.FIELD_GENERAL}`]: dataGeneral,
    }
    if (type) {// add
        jsonField[actions.FIELD_PROJECT_ID] = dataInsert[actions.FIELD_PROJECT_ID];
        jsonField[actions.FIELD_PROJECT_NAME] = dataInsert[actions.FIELD_PROJECT_NAME];
        dataGeneral[actions.FIELD_PROJECT_ID][ConstantRender.KEY_FIELD_VALUE] = dataInsert[actions.FIELD_PROJECT_ID];
        dataGeneral[actions.FIELD_PROJECT_NAME][ConstantRender.KEY_FIELD_VALUE] = dataInsert[actions.FIELD_PROJECT_NAME];
        payload[`edit`] = false;
        payload[`add`] = true;
        payload[`dataItem`] = dataGeneral;
        payload[`dataItemParent`] = jsonField;
        dispatch({
            type,
            payload,
            meta: {
                resource: actions.NAME_REDUCER
            }
        });
    }
    else { // edit delete 
        dispatch(getDataGeneralConfiguration(dataInsert[actions.FIELD_PROJECT_ID]));
    }
}
import * as actions from '../../actions/general_configuration';
import { ConstantRender, ManagerRules, ManagerData } from '@dgtx/core-component-ui'
import { getDataObject, } from '@dgtx/coreui';
import { isEmpty, cloneDeep } from 'lodash'
export const mondifyData = (input: any) => async (dispatch: any, getState: any) => {
    const { core } = cloneDeep(getState());
    const dataItem = getDataObject(`resources.${actions.NAME_REDUCER}.data.dataItem`, core);
    const dataItemParent = getDataObject(`resources.${actions.NAME_REDUCER}.data.dataItemParent`, core);
    const { value } = input;
    const item = ManagerRules.getItemThreeLevel(input, dataItem).data;
    item[`${ConstantRender.KEY_FIELD_VALUE}`] = value || '';
    const itemChecked = ManagerRules.checkRulesOneField(item, dataItem);
    let dataUpdate: any = null;
    let dataItemParentUpdate: any = dataItemParent;
    const { dataModify, dataItemParentModify } = ManagerData.getDataByType(input, dataItem, dataItemParent);
        dataUpdate = dataModify;
        dataItemParentUpdate = dataItemParentModify;
    if (!isEmpty(itemChecked[`${ConstantRender.KEY_FIELD_ERROR}`])) {
        dataUpdate = ManagerRules.modifyItemThreeLevel(input, dataItem, itemChecked)
    }
    dispatch({
        type: actions.GENERAL_CONFIGURATION_MONDIFY_DATA,
        payload: {
            dataItem: dataUpdate,
            dataItemParent: dataItemParentUpdate
        },
        meta: {
            resource: actions.NAME_REDUCER
        }
    });
}
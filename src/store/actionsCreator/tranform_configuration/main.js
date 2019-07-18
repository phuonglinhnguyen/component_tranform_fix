import * as actions from "../../actions/tranform_configuration";
import {
  callAPIGetData,
  callAPICreateData,
  callAPIDeleteData,
  callAPIUpdateData
} from "./call_api";
import { cloneDeep, isEmpty, isNumber } from 'lodash';
import { showNotification } from "@dgtx/coreui";
import { isNumberLiteral } from "@babel/types";

export const getData = (projectId: any) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(resetStateAPI());
  dispatch(setPending());
  dispatch(getDataTranform(projectId));
};
//get all list data tranform
export const getDataTranform = (projectId: any) => async (
  dispatch: any,
  getState: any
) => {
  const data = await dispatch(callAPIGetData({ projectId }));
  if (data.code) {
    dispatch(setError());
    if (!isEmpty(projectId) && isEmpty(data)) {
      dispatch({
        type: actions.TRANFORM_CONFIGURATION_GET_DATA_ERROR,
        payload: {
          data: [],
          refreshPage: true
        },
        meta: {
          resource: actions.NAME_REDUCER
        }
      });
    } else {
      dispatch(
        showNotification(`${actions.KEY_TRANSLATE}.get_error`, "error", {
          i18n: true,
          duration: 1500
        })
      );
    }
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
    dispatch(setSuccess())
  }
};

// createDataTransform
export const createData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  const checkConfigResult = checkConfigValidator(config)

  if (checkConfigResult) {
    const projectId = config.project_id;
    await dispatch(
      callAPICreateData({
        data: config,
        projectId: projectId
      })
    );
    await dispatch(getDataTranform(projectId));
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
export const updateData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
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
};

// deleteDataTransform
export const deleteData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
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

export const unmount = () => async (dispatch: any, getState: any) => {
  dispatch({
    type: actions.TRANFORM_CONFIGURATION_UNMOUNT,
    payload: {
       
    },
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
}
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
}
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
}
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
}
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
export const setConfig = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({
    type: actions.SET_CONFIG,
    payload: {
      config
    },
    meta: {
      resource: actions.NAME_REDUCER
    }
  })

};

export const setSelectedConfig = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  checkErrorsConfig(config)
  dispatch({
    type: actions.SET_SELECTED_CONFIG,
    payload: {
      config
    },
    meta: {
      resource: actions.NAME_REDUCER
    }
  })

};

const checkConfigValidator = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  let result = true;

  // if (config && isEmpty(config.name)) {
  //   setConfigValidator('name', true)
  //   result = false
  // }
  if (config) {
    if (isEmpty(config.name)) {
      setConfigValidator('name', true)
      result = false
    } else if(ddsd){
      setConfigValidator('name', true)
      result = false
    }

  }
  if (config && isEmpty(config.dictionary.fieldKey)) {
    result = false
  }
  if (config && isEmpty(config.dictionary.port) || isNumber(config.dictionary.port)) {
    result = false
  }

  return result
};

const setConfigValidator = (name, value) => async (
  dispatch: any,
  getState: any
) => {
  const { core } = cloneDeep(getState());
  const configValidators = getDataObject(`resources.${actions.NAME_REDUCER}.data.configValidators`, core);
  configValidators[name].error = value
  // dispatch
  dispatch({
    type: actions.SET_CONFIG_VALIDATOR,
    payload: {
      configValidators
    },
    meta: {
      resource: actions.NAME_REDUCER
    }
  })
}
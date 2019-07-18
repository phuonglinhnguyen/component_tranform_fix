import * as actions from "../../actions/general_configuration";
import { crudGetList, showNotification } from "@dgtx/coreui";
import { ConstantRender } from "@dgtx/core-component-ui";
import { cloneDeep, isEmpty } from "lodash";

export const getData = (projectId: any) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(resetStateAPI());
  dispatch(setPending());
  dispatch(getDataExportFormat(projectId));
};

export const getDataExportFormat = (projectId: any) => async (
  dispatch: any,
  getState: any
) => {
  return dispatch(
    crudGetList(
      "export_format_and_transformation",
      { projectId },
      {
        onSuccess: ({ result: { data } }: any) => {
          if (
            data.exportFormat.status === 200 &&
            data.exportTransformation.status === 200
          ) {
            const dataExportFormat = data.exportFormat.json.map((item: any) =>
              createItemCBBorCKL(item)
            );
            const structure = cloneDeep(actions.STRUCTURES_FIELD);
            const dataGeneral = cloneDeep(actions.FIELD_ATRRIBUTES_GENERAL);
            dataGeneral[`${actions.FIELD_EXPORT_FORMAT}`][
              `${ConstantRender.KEY_FIELD_VALUES_LIST}`
            ] = dataExportFormat;
            dispatch({
              type: actions.GENERAL_CONFIGURATION_GET_DATA,
              payload: {
                [actions.STRUCTURES]: structure,
                [`${actions.FIELD_GENERAL}`]: dataGeneral,
                [actions.FIELD_EXPORT_FORMAT]: dataExportFormat,
                refreshPage: false
              },
              meta: {
                resource: actions.NAME_REDUCER
              }
            });
            dispatch(getDataGeneralConfiguration(projectId));
          } else {
            dispatch({
              type: actions.GENERAL_CONFIGURATION_GET_DATA_ERROR,
              payload: {
                [actions.FIELD_EXPORT_FORMAT]: [],
                refreshPage: true
              },
              meta: {
                resource: actions.NAME_REDUCER
              }
            });
            dispatch(
              showNotification(`${actions.KEY_TRANSLATE}.get_error`, "error", {
                i18n: true,
                duration: 1500
              })
            );
          }
        },
        onFailure: ({ result: { data } }: any) => {
          dispatch({
            type: actions.GENERAL_CONFIGURATION_GET_DATA_ERROR,
            payload: {
              [actions.FIELD_EXPORT_FORMAT]: []
            },
            meta: {
              resource: actions.NAME_REDUCER
            }
          });
          dispatch(
            showNotification(`${actions.KEY_TRANSLATE}.get_error`, "error", {
              i18n: true,
              duration: 1500
            })
          );
        }
      }
    )
  );
};

export const getDataGeneralConfiguration = (projectId: any) => async (
  dispatch: any,
  getState: any
) => {
  return dispatch(
    crudGetList(
      "general_configuration",
      { projectId },
      {
        onSuccess: ({ result: { data } }: any) => {
          dispatch({
            type: actions.GENERAL_CONFIGURATION_GET_DATA,
            payload: {
              dataParent: data,
              dataItem: {},
              edit: true,
              add: false,
              refreshPage: false
            },
            meta: {
              resource: actions.NAME_REDUCER
            }
          });
          dispatch(setSuccess());
        },
        onFailure: ({ result: { data } }: any) => {
          dispatch(setError());
          if (!isEmpty(projectId) && isEmpty(data)) {
            dispatch({
              type: actions.GENERAL_CONFIGURATION_GET_DATA_ERROR,
              payload: {
                dataParent: [],
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
        }
      }
    )
  );
};

export const unmount = () => async (dispatch: any, getState: any) => {
  dispatch({
    type: actions.GENERAL_CONFIGURATION_UNMOUNT,
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

function createItemCBBorCKL(item: any) {
  return {
    id: item.id,
    name: item.name
  };
}

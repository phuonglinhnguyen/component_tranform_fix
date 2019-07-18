export const callAPITask = (input: any) => async (dispatch: any, getState: any) => {
    const { projectId, processKey, taskDefinitionKey, maxResult, userName } = input;
    let data = await new Promise((resolve, reject) => {
        dispatch(crudGetList("tasks", { projectId, processKey, taskDefinitionKey, maxResult, userName }, {
            onSuccess: ({ result: { data } }: any) => {
                resolve(data)
            },
            onFailure: (data: any) => {
                const code = getDataObject('result.body.Code', data) || 404
                const message = getDataObject('result.body.Error', data) || 'get_task_error';
                resolve({ code, message });
            }
        }))
    })
    return data
}
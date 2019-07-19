import { crudGetList, crudUpdate, crudDelete, crudCreate, getDataObject } from '@dgtx/coreui';
import { showNotification } from '@dgtx/coreui';

import * as actions from '../../actions/export_configuration ';

export const callAPIGetDataExport = (input: any) => async (dispatch: any) => {
	const { projectId } = input;
	console.log({ projectId });

	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'export_configuration',
				{ projectId },
				{
					onSuccess: ({ result: { data } }: any) => {
						resolve(data);
					},
					onFailure: (data: any) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

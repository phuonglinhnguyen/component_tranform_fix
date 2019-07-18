import {
    GET_LIST,
 } from '@dgtx/coreui';
 // import { APP_NAME, TRAINING_ENDPOINT } from '../../constants'
 import { dataExportFormat, dataExportTransformation } from '../faKedata'
 const dataFormtat = dataExportFormat();
 const dataTransformation = dataExportTransformation();
 export default (type: string, resource: string, params: any) => {
    switch (type) {
       case GET_LIST: {
           const excute = async () => { 
            // const { projectId } = params; 
                // const exportFormatCalled = fetchJson(`${UAC_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/export-format`, { method: 'GET' });
                const exportFormatCalled = Promise.resolve(
                    {
                       status: 200,
                       headers: {},
                       json: dataFormtat,
                    }
                 )
                let exportTransformationCalled:any = null;
                try {
                    // exportTransformationCalled = await fetchJson(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/export-transformation`, { method: 'GET' });
                    exportTransformationCalled = await Promise.resolve({
                           status: 200,
                           headers: {},
                           json: dataTransformation,
                        })
                } catch (error) {
                   console.log(error)
                }
                const exportFormat = await exportFormatCalled;
                return {... exportFormat,json:{exportFormat,exportTransformation:exportTransformationCalled} }
            }
        return excute()
       }
       default:
          break;
    }
    return Promise.reject(`Provider ${resource} method:${type} not yet supported!`)
 };
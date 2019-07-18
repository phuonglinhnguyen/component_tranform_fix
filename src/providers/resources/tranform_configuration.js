import {
   GET_LIST,
   UPDATE,
   CREATE,
   DELETE,
   fetchJson,
} from '@dgtx/coreui';
import {
   APP_NAME,
   API_ENDPOINT
} from '../../constants'
import { getDataTranform } from '../faKedata'
const data = getDataTranform();
export default (type: string, resource: string, params: any) => {
   switch (type) {
      //  GET : /api/apps/:app_name/projects/:project_id/transform-configuration
      case GET_LIST: {
         const { projectId } = params;
         console.log(projectId)
         return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/transform-configuration`, { method: 'GET' })
      }

      // POST : /api/apps/:app_name/projects/:project_id/transform-configuration ( body: { object } )
      case CREATE: {
         const {
            projectId,
            data } = params;
         return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/transform-configuration`,
            { method: 'POST', body: JSON.stringify(data) })
      }
      // UPDATE : /api/apps/:app_name/projects/:project_id/transform-configuration/:id
      case UPDATE: {
         const {
            projectId, id, data } = params;
         return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/transform-configuration/${id}`, { method: 'PUT', body: JSON.stringify(data) })
      }
      // DELETE : /api/apps/:app_name/projects/:project_id/transform-configuration/:id
      case DELETE: {
         const {
            projectId,
            data } = params;
         return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/transform-configuration/${id}`, { method: 'DELETE' })
         // return Promise.resolve({
         //    status: 200,
         //    headers: {},
         //    json: data,
         // })
      }
      default:
         break;
   }
   return Promise.reject(`Provider ${resource} method:${type} not yet supported!`)
};



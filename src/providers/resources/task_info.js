import { GET_LIST, GET_ONE, fetchJson } from '@dgtx/coreui';
import { API_ENDPOINT } from '../../constants'
export default (type, resource, params) => {
    let uri = '';
    let option = {};
    if (type === GET_ONE) {
        option['headers'] = new Headers({ method: 'GET' })
        uri = `${API_ENDPOINT}/workflow/definitions/${params.project_id}/user_task_statistic`
    }
    return fetchJson(uri, option)
};


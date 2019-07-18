import {
    GET_LIST,
    GET_ONE,
    UPDATE,
    CREATE,
    fetchJson
} from '@dgtx/coreui';
import {
    API_ENDPOINT,
    APP_NAME
} from '../../constants'
export default (type, resource, params) => {
    let uri = '';
    let option = {};
    if (type === GET_ONE) {
        return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${params.id}`, {method:'GET'})
    }
    else if (type === GET_LIST) {
        option.method = 'GET'
        if (params.group_id === 'all') {
            uri = `${API_ENDPOINT}/apps/${APP_NAME}/projects`
        } else {
            uri = `${API_ENDPOINT}/apps/${APP_NAME}/projects?group_id=${params.group_id}`
        }
        return fetchJson(uri, option)
    }
    else if (type === UPDATE) {
        option.method = 'PATCH'
        uri = `${API_ENDPOINT}/apps/${APP_NAME}/projects/${params.id}`
        params.data.id = undefined
        option.body = JSON.stringify(params.data)
        return fetchJson(uri, option)
    }
    else if (type === CREATE) {
        option.method = 'POST'
        uri = `${API_ENDPOINT}/apps/${APP_NAME}/projects`;
            option.body = JSON.stringify(params.data)
        return fetchJson(uri, option)
    }
    return Promise.reject(`projectProvider Not support ${type}`)
};


import {
    PROJECT_FUNCTIONS,
    group,
    project,
    user,
    task_info,
    user_role_management,
    users,
    projectFunction,
    general_configuration,
    export_format_and_transformation,
    tranform_configuration
} from './resources'

export default {
    group,
    project,
    user,
    users,
    task_info,
    user_role_management,
    [PROJECT_FUNCTIONS]: projectFunction,
    general_configuration,
    export_format_and_transformation,
    tranform_configuration
};
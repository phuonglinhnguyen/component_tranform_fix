import ErrorDefinitions from './error_definitions';
import LookupDefinitions from './lookup_definitions';
import PatternDefinitions from './pattern_definitions';
import TransformRuleDefinitions from './transform_rule_definitions';
import UserRoleManagement from './user_role_management';
import ValidationDefinitions from './validation_definitions';

export default {
    user_role_management: UserRoleManagement,
    error_definitions: ErrorDefinitions.en,
    validation_definitions: ValidationDefinitions,
    pattern_definitions: PatternDefinitions,
    lookup_definitions: LookupDefinitions,
    transform_rule_definitions: TransformRuleDefinitions
};

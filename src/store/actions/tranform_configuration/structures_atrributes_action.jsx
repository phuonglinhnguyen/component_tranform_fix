export const NAME_REDUCER = "tranform_config";
export const KEY_TRANSLATE = "tranform_config";
export const FIELD_NAME = "name";
export const FIELD_CRON_TRIGGER = "cron_trigger";
export const FIELD_ACTIVE = "active";
export const FIELD_PROJECT_ID = "project_id";
export const FIELD_VERSION = "version";
export const FIELD_FILTER = "filter";
export const FIELD_COLLECTOR = "collector";
export const FIELD_DOC_STATUS = "doc_status";
export const FIELD_BATCH_STATUS = "batch_status";
export const FIELD_DOC_SET_STATUS = "doc_set_status";
export const FIELD_TRANFORM = "transform";
export const FIELD_PATTERN = "pattern";
export const FIELD_RULES = "rules";
export const FIELD_COMMON = "common";
export const FIELD_COMMON_NAME = "";
export const FIELD_CONTENT = "content";
export const FIELD_CONTENT_NAME = "";
export const FIELD_DATAKEY = "dataKey";
export const FIELD_DEFAULT = "default";
export const FIELD_VALUE = "value";
export const FIELD_DICTIONARY = "dictionary";
export const FIELD_FIELDKEY = "fieldKey";
export const FIELD_DATABASE_TYPE = "database_type";
export const FIELD_HOST = "host";
export const FIELD_PORT = "port";
export const FIELD_USERNAME = "username";
export const FIELD_PASSWORD = "password";
export const FIELD_DATABASE_NAME = "database_name";
export const FIELD_SCHEMA_NAME = "schema_name";
export const FIELD_QUERY = "query";
export const FIELD_KEY_QUERY = "";

export const STRUCTURES_FIELD_TRANFORM = {
  [FIELD_NAME]: "",
  [FIELD_ACTIVE]: "",
  [FIELD_VERSION]: "",
  [FIELD_CRON_TRIGGER]: "",
  [FIELD_PROJECT_ID]: "",
  [FIELD_FILTER]: [
    {
      [FIELD_COLLECTOR]: {
        [FIELD_DOC_STATUS]: "",
        [FIELD_BATCH_STATUS]: "",
        [FIELD_DOC_SET_STATUS]: ""
      }
    },
    {
      [FIELD_TRANFORM]: {
        [FIELD_PATTERN]: ""
      }
    }
  ],
  [FIELD_RULES]: [
    {
      [FIELD_COMMON]: [
        {
          [FIELD_COMMON_NAME]: ""
        }
      ],
      [FIELD_CONTENT]: {
        [FIELD_CONTENT_NAME]: {
          [FIELD_DATAKEY]: "",
          [FIELD_DEFAULT]: "",
          [FIELD_VALUE]: ""
        }
      }
    }
  ],
  [FIELD_DICTIONARY]: [
    {
      [FIELD_FIELDKEY]: "",
      [FIELD_DATABASE_TYPE]: "",
      [FIELD_HOST]: "",
      [FIELD_PORT]: "",
      [FIELD_USERNAME]: "",
      [FIELD_PASSWORD]: "",
      [FIELD_DATABASE_NAME]: "",
      [FIELD_SCHEMA_NAME]: "",
      [FIELD_QUERY]: {
        [FIELD_KEY_QUERY]: null
      }
    }
  ]
};

export const FIELD_ATTRIBUTES_TRANFORM = {
  [FIELD_NAME]: {},
  [FIELD_ACTIVE]: {},
  [FIELD_CRON_TRIGGER]: {},
  [FIELD_VERSION]: {},
  [FIELD_FILTER]: {
    [FIELD_COLLECTOR]: {
      [FIELD_DOC_STATUS]: {},
      [FIELD_BATCH_STATUS]: {},
      [FIELD_DOC_SET_STATUS]: {}
    },
    [FIELD_TRANFORM]: {
      [FIELD_PATTERN]: {}
    }
  },
  [FIELD_RULES]: {
    [FIELD_COMMON]: [
      {
        [FIELD_COMMON_NAME]: {}
      }
    ],
    [FIELD_CONTENT]: {
      [FIELD_CONTENT_NAME]: {
        [FIELD_DATAKEY]: {},
        [FIELD_DEFAULT]: {},
        [FIELD_VALUE]: {}
      }
    }
  }
};

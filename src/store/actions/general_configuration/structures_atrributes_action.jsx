import { ConstantRender } from "@dgtx/core-component-ui";

export const NAME_REDUCER = "general_configuration";
export const FIELD_ACTIVE = "active";
export const FIELD_COLLECT_EXPORT_OPTION = "collect_export_option";
export const FIELD_TYPE = "type";
export const FIELD_CRON_TRIGGER = "cron_trigger";
export const FIELD_EXPORT_DESTINATION = "export_destination";
export const FIELD_EXPORT_FORMAT = "export_format";
export const FIELD_ID = "_id";
export const FIELD_NAME = "name";
export const FIELD_PRIORITY = "priority";
export const FIELD_PROJECT_ID = "project_id";
export const FIELD_PROJECT_NAME = "project_name";

export const STRUCTURES = "STRUCTURES_FIELD";
export const FIELD_GENERAL = "FIELD_ATRRIBUTES_GENERAL";
export const JSON = "JSON_FIELD";
export const KEY_TRANSLATE = "general_configuration";

export const FIELD_TYPE_COLLECT_EXPORT_OPTION_LIST = [
  { id: "BATCH", name: "BATCH" },
  { id: "DOC", name: "DOC" }
];

export const STRUCTURES_FIELD = {
  [FIELD_ACTIVE]: "",
  [FIELD_NAME]: "",
  [FIELD_COLLECT_EXPORT_OPTION]: [{ [FIELD_TYPE]: "" }],
  [FIELD_CRON_TRIGGER]: "",
  [FIELD_EXPORT_DESTINATION]: "",
  [FIELD_EXPORT_FORMAT]: "",
  [FIELD_ID]: "",
  [FIELD_PRIORITY]: "",
  [FIELD_PROJECT_ID]: "",
  [FIELD_PROJECT_NAME]: ""
};

export const FIELD_ATRRIBUTES_GENERAL = {
  [FIELD_ACTIVE]: {
    [ConstantRender.KEY_FIELD_VALUE]: false,
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: true,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 80,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_BOOLEAN,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: [ConstantRender.KEY_FIELD_RULE_EMPTY]
  },
  [FIELD_NAME]: {
    [ConstantRender.KEY_FIELD_VALUE]: "",
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: true,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 255,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_TEXT,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: [ConstantRender.KEY_FIELD_RULE_EMPTY]
  },

  [FIELD_COLLECT_EXPORT_OPTION]: {
    [FIELD_TYPE]: {
      [ConstantRender.KEY_FIELD_VALUE]: "",
      [ConstantRender.KEY_FIELD_ERROR]: "",
      [ConstantRender.KEY_FIELD_AUTO_RENDER]: true,
      [ConstantRender.KEY_FIELD_MAX_LENGTH]: 80,
      [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
      [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_COMBOBOX,
      [ConstantRender.KEY_FIELD_VALUES_LIST]: FIELD_TYPE_COLLECT_EXPORT_OPTION_LIST,
      [ConstantRender.KEY_FIELD_RULES]: [ConstantRender.KEY_FIELD_RULE_EMPTY]
    }
  },

  [FIELD_CRON_TRIGGER]: {
    [ConstantRender.KEY_FIELD_VALUE]: "",
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: true,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 80,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_CRON_TRIGGER,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: [],
    [ConstantRender.KEY_FIELD_VIEW_CRON_VALUE]: true,
    [ConstantRender.KEY_FIELD_LIST_CRON_TRIGGER]: [
      "minutes",
      "hourly",
      "daily",
      "weekly"
    ] // ['seconds', 'minutes', 'hourly', 'daily', 'weekly', 'monthly']
  },

  [FIELD_EXPORT_DESTINATION]: {
    [ConstantRender.KEY_FIELD_VALUE]: "",
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: true,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 255,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_TEXT,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: [ConstantRender.KEY_FIELD_RULE_EMPTY]
  },

  [FIELD_EXPORT_FORMAT]: {
    [ConstantRender.KEY_FIELD_VALUE]: [],
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: true,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 80,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]:
      ConstantRender.KEY_FIELD_TYPE_CHECKBOX_LIST,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: [ConstantRender.KEY_FIELD_RULE_EMPTY]
  },

  [FIELD_ID]: {
    [ConstantRender.KEY_FIELD_VALUE]: "",
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: false,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 0,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_TEXT,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: []
  },

  [FIELD_PRIORITY]: {
    [ConstantRender.KEY_FIELD_VALUE]: 0,
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: true,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 80,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_NUMBER_INT,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: []
  },

  [FIELD_PROJECT_ID]: {
    [ConstantRender.KEY_FIELD_VALUE]: "",
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: false,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 80,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_TEXT,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: []
  },

  [FIELD_PROJECT_NAME]: {
    [ConstantRender.KEY_FIELD_VALUE]: "",
    [ConstantRender.KEY_FIELD_ERROR]: "",
    [ConstantRender.KEY_FIELD_AUTO_RENDER]: false,
    [ConstantRender.KEY_FIELD_MAX_LENGTH]: 80,
    [ConstantRender.KEY_FIELD_AUTO_FOCUS]: false,
    [ConstantRender.KEY_FIELD_TYPE]: ConstantRender.KEY_FIELD_TYPE_TEXT,
    [ConstantRender.KEY_FIELD_VALUES_LIST]: [],
    [ConstantRender.KEY_FIELD_RULES]: []
  }
};

export const JSON_FIELD = {
  [FIELD_ACTIVE]: false,
  [FIELD_COLLECT_EXPORT_OPTION]: { [FIELD_TYPE]: "" },
  [FIELD_CRON_TRIGGER]: "",
  [FIELD_EXPORT_FORMAT]: [],
  [FIELD_ID]: "",
  [FIELD_NAME]: "",
  [FIELD_PRIORITY]: "",
  [FIELD_PROJECT_ID]: "",
  [FIELD_PROJECT_NAME]: ""
};

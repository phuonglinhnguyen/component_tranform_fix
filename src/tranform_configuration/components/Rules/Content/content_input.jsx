import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";

import { TextField } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import AceEditor from "react-ace";
import FormHelperText from "@material-ui/core/FormHelperText";
import { isRequired, configValidators, setConfigValidator } from "../../../services";
const styles: any = (theme: any) => {
  return {
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: "20px 0",
      padding: theme.spacing.unit * 3,
      display: "flex",
      flexDirection: "column"
    },
    titleField: {
      fontWeight: "bold"
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    formContent: {
      textAlign: "center"
    },
    add: {
      background: "#3f51b5",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#1a237e"
      }
    },
    save: {
      background: "#689f38",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#1b5e20"
      }
    },
    hidden: {
      display: "none"
    },
    cancel: {
      marginRight: "10px",
      background: "#ff9800",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#e65100"
      }
    },
    titleContent: {
      fontSize: "18px",
      margin: "10px 0"
    },
    error: {
      color: "red",
      opacity: "0.8"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
  setContentItem?: any;
  content?: any;
  contentItem?: any;
  contentName?: any;
  setContentName?: any;
  contentArray?: any;
  setContentArray?: any;
  mode?: any;
  setMode?: any;
}
const ContentItem: React.FC<IDefautProps> = props => {
  const {
    classes,
    config,
    setConfig,
    setContentItem,
    contentItem,
    contentName,
    contentArray,
    setContentName,
    setContentArray,
    mode,
    setMode
  } = props;

  const onChangeText = (name, value) => {
    if (mode === "add") {
      setContentItem({
        ...contentItem,
        [name]: value
      });
    } else if (mode === "edit") {
      setContentItem({
        contentName,
        contentItem: {
          ...contentItem,
          [name]: value
        }
      });
    }
  };
  const onChangeContentName = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (configValidators[name] && isRequired(value)) {
      setConfigValidator(name, true)
      // setIsError(true)
    } else {
      setConfigValidator(name, false)
      // setIsError(false)
    }

    setContentName(value)
  }
  const onAddContentItem = () => {
    if (
      configValidators['contentName'].error || configValidators['dataKey'].error ||
      isEmpty(contentItem) || isEmpty(contentName) || isEmpty(contentItem.dataKey)
    ) {
      return
    }
    if (mode === "add") {
      const newContentArray = [...contentArray];
      newContentArray.unshift({
        contentName,
        contentItem
      });
      setConfig({
        ...config,
        rules: {
          ...config.rules,
          content: {
            ...config.rules.content,
            [contentName]: contentItem
          }
        }
      });
      setContentArray(newContentArray);
      setContentItem(null);
      setContentName(null);
    } else if (mode === "edit") {
      const newContentArray = contentArray.map(_contentItem => {
        if (_contentItem.contentItem.dataKey === contentItem.dataKey) {
          return { contentItem: { ...contentItem }, contentName };
        }
        return _contentItem;
      });

      setConfig({
        ...config,
        rules: {
          ...config.rules,
          content: {
            ...config.rules.content,
            [contentName]: contentItem
          }
        }
      });
      setMode("add");
      setContentArray(newContentArray);
      setContentItem(null);
    }
  };
  const onCancel = () => {
    setMode("add");
    setContentItem(null);
  };

  return (
    <React.Fragment>
      <div className={classes.content}>
        <FormLabel className={classes.titleField}>Content</FormLabel>
        <div className={classes.actions}>
          <Fab
            size="small"
            className={mode === "add" ? classes.hidden : classes.cancel}
            aria-label="Cancel"
            onClick={onCancel}
            hiddenCancel
          >
            {mode === "add" ? "" : <CancelIcon />}
          </Fab>
          <Fab
            size="small"
            className={mode === "add" ? classes.add : classes.save}
            aria-label="Add"
            onClick={onAddContentItem}
          >
            {mode === "add" ? <AddIcon /> : <SaveIcon />}
          </Fab>
        </div>
      </div>
      <TextField
        required
        name="contentName"
        label="Name"
        className={classes.heading}
        error={configValidators['contentName'].error}
        onChange={onChangeContentName}
        value={contentName ? contentName : ""}
        disabled={mode === "edit"}
      />
      <FormHelperText className={classes.error}>
        {configValidators['contentName'].error ? configValidators['contentName'].message : ''}
      </FormHelperText>
      <div className={classes.formControl}>
        <TextField
          required
          name="dataKey"
          label="DataKey"
          error={configValidators['dataKey'].error}
          margin="dense"
          onChange={e => onChangeText(e.target.name, e.target.value)}

          value={
            contentItem && contentItem.dataKey ? contentItem.dataKey : ""
          }
          disabled={mode === "edit"}
        />
        <FormHelperText className={classes.error}>
          {configValidators['dataKey'].error ? configValidators['dataKey'].message : ''}
        </FormHelperText>
        <label className={classes.titleContent}>Default</label>
        <AceEditor
          name="default"
          editorProps={{ $blockScrolling: "Infinity" }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          highlightActiveLine={true}
          width="100%"
          height="200px"
          fontSize="15px"
          mode="javascript"
          onChange={e => {
            onChangeText("default", e);
          }}
          showGutter={true}
          showPrintMargin={false}
          theme="solarized_dark"
          value={
            contentItem && contentItem.default ? contentItem.default : ""
          }
          width="100%"
        />
        <label className={classes.titleContent}>Value</label>
        <AceEditor
          name="value"
          editorProps={{ $blockScrolling: "Infinity" }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          highlightActiveLine={true}
          width="100%"
          height="200px"
          mode="javascript"
          fontSize="15px"
          onChange={e => {
            onChangeText("value", e);
          }}
          showGutter={true}
          showPrintMargin={false}
          theme="solarized_dark"
          value={
            contentItem && contentItem.value ? contentItem.value : ""
          }
          width="100%"
        />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ContentItem);

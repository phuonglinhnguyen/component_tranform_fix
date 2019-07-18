import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, FormLabel } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";

import AceEditor from "react-ace";
import { isEmpty } from "lodash";
import FormHelperText from "@material-ui/core/FormHelperText";
import { isRequired, configValidators, setConfigValidator } from "../../../services";
const styles: any = (theme: any) => {
  return {
    formControl: {
      display: "inherit",
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    },
    formCommon: {
      margin: `0px ${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px`
    },
    titleField: {
      fontWeight: "bold"
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
    common: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    titleCommon: {
      margin: "20px 0 40px 0"
    },
    ace: {
      fontSize: "16px",
      height: "250px",
      margin: "20px 0"
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
    error: {
      color: "red",
      opacity: "0.8"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  common?: any;
  mode?: any;
  setMode?: any;
  config?: any;
  setConfig?: any;
  commonName?: any;
  setCommonName?: any;
  commonValue?: any;
  setCommonValue?: any;
}

const Common: React.FC<IDefautProps> = props => {
  const {
    classes,
    common,
    mode,
    setMode,
    config,
    setConfig,
    commonName,
    setCommonName,
    commonValue,
    setCommonValue
  } = props;

  const onAddCommon = () => {
    if (mode === "add") {
      const newConmonItem = { [commonName]: commonValue };
      const newCommon = [...common];
      newCommon.unshift(newConmonItem);

      setConfig({
        ...config,
        rules: {
          ...config.rules,
          common: newCommon
        }
      });
      setCommonName(null);
      setCommonValue(null);
    } else if (mode === "edit") {
      const newCommons = common.map(newItem => {
        const key = Object.keys(newItem)[0];
        if (key === commonName) {
          return { ...{ [commonName]: commonValue } };
        }
        return newItem;
      });

      setConfig({
        ...config,
        rules: {
          ...config.rules,
          common: newCommons
        }
      });
      setMode("add");
      setCommonName(null);
      setCommonValue(null);
    }
  };
  const onCancel = () => {
    setMode("add");
    setCommonName(null);
    setCommonValue(null);
  };

  const onChangeCommonName = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (configValidators[name] && isRequired(value)) {
      setConfigValidator(name, true)
    } else {
      setConfigValidator(name, false)
    }

    setCommonName(value)
  }

  return (
    <React.Fragment>
      <div className={classes.common}>
        <FormLabel className={classes.titleField}>Common </FormLabel>
        <div className={classes.actions}>
          <Fab
            size="small"
            className={mode === "add" ? classes.hidden : classes.cancel}
            aria-label="Cancel"
            onClick={onCancel}
          >
            {mode === "add" ? "" : <CancelIcon />}
          </Fab>
          <Fab
            size="small"
            className={mode === "add" ? classes.add : classes.save}
            aria-label="Add"
            onClick={onAddCommon}
          >
            {mode === "add" ? <AddIcon /> : <DoneIcon />}
          </Fab>
        </div>
      </div>
      <TextField
        required
        name="commonName"
        label="Name"
        error={configValidators['commonName'].error}
        margin="normal"
        value={commonName ? commonName : ""}
        onChange={onChangeCommonName}
        disabled={mode === "edit"}
      />
      <FormHelperText className={classes.error}>{configValidators['commonName'].error ? configValidators['commonName'].message : '' }</FormHelperText>
      <AceEditor
        name="commonValue"
        className={classes.ace}
        editorProps={{ $blockScrolling: "Infinity" }}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        highlightActiveLine={true}
        width="100%"
        height="250px"
        mode="javascript"
        onChange={commonValue => setCommonValue(commonValue)}
        showGutter={true}
        showPrintMargin={false}
        theme="solarized_dark"
        value={commonValue || ""}
        width="100%"
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);

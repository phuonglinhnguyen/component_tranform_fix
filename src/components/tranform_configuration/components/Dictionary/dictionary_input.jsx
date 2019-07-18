import React, { useState } from "react";
import { isEmpty, toArray, get } from "lodash";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import ChipInput from "@harshitpant/material-ui-chip-input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { isRequired, configValidators, setConfigValidator } from "../../services";

const styles: any = (theme: any) => {
  return {
    dictionary: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    titleField: {
      fontWeight: "bold"
    },
    textField: {
      width: "95%",
    },
    textField1: {
      width: "70%"
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
    formInput: {
      margin: "20px 0"
    },
    query: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
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
    },
    helper: {
      opacity: "0.5"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
  dictItem?: any;
  setDictItem?: any;
  mode?: any;
  setMode?: any;
  dictionary?: any;
}
const DictionaryComponent: React.FC<IDefautProps> = props => {
  const {
    classes,
    config,
    setConfig,
    dictItem,
    setDictItem,
    mode,
    dictionary,
    setMode,
    // setIsError
  } = props;
  
  const query = get(dictItem, "query", {});
  const queryArray = Object.keys(query)
  console.log(dictItem);
  console.log(queryArray);
  
  const [errorMessage, setErrorMessage] = useState(null);

  const valDB = [
    { label: "MongoDB", value: "MongoDB" },
    { label: "PostgresSQL", value: "PostgresSQL" }
  ];

  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;

    if (configValidators[name] && isRequired(value)) {
      setConfigValidator(name, true)
      // setIsError(true)
    } else if (configValidators[name]) {
      setConfigValidator(name, false)
      // setIsError(false)
    }

    setDictItem({
      ...dictItem,
      [name]: value
    });
  };

  const check_input = e => {
    const value = e.target.value;
    let good = !isEmpty(value);

    if (good) {
      return { message: "valid" };
    } else {
      return { message: "invalid", detail: "it's empty" };
    }
  };

  const onAddDictionary = (e) => {
    const message = check_input(e);
    if (message.message !== "valid") {
      setErrorMessage(message.detail);
    } else {

      setErrorMessage(null);
    }
    if (mode === "add") {

      const newDictItem = { ...dictItem };
      setConfig({
        ...config,
        dictionary: [...config.dictionary, newDictItem]
      });
      setDictItem(null);
    } else if (mode === "edit") {
      const newDictionary = dictionary.map(_dictItem => {
        if (_dictItem.fieldKey === dictItem.fieldKey) {
          return { ...dictItem };
        }
        return _dictItem;
      });

      setConfig({
        ...config,
        dictionary: newDictionary
      });
      setMode("add");
      setDictItem(null);
      // console.log(newDictionary);
    }

  };

  const onCancel = () => {
    setMode("add");
    setDictItem(null);
  };

  const onChangeQuery = (chips) => {
    const newQuery = {...query}

    for (const chip of chips) {
      newQuery[chip] = null
    }
    console.log(newQuery);

    setDictItem({
      ...dictItem,
      query: newQuery
    });
  }

  const onDeleteQuery = (chip) => {
    const newQuery = {...query}

    delete newQuery[chip]
    setDictItem({
      ...dictItem,
      query: newQuery
    });
  }

  return (
    <React.Fragment>
      <div className={classes.dictionary}>
        <FormLabel className={classes.titleField}>Dictionary</FormLabel>
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
            aria-label="Add"
            className={mode === "add" ? classes.add : classes.save}
            onClick={onAddDictionary}
          >
            {mode === "add" ? <AddIcon /> : <DoneIcon />}
          </Fab>
        </div>
      </div>

      <div className={classes.formInput}>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              label="Field Key"
              className={classes.textField}
              error={configValidators['fieldKey'].error}
              name="fieldKey"
              margin="dense"
              variant="outlined"
              onChange={onChangeText}
              value={dictItem && dictItem.fieldKey ? dictItem.fieldKey : ""}
              disabled={mode === "edit"}
            />
            <FormHelperText className={classes.error}>
              {configValidators['fieldKey'].error ? configValidators['fieldKey'].message : ''}
            </FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              name="database_type"
              className={classes.textField}
              variant="outlined"
              label="Database Type"
              margin="dense"
              value={
                dictItem && dictItem.database_type ? dictItem.database_type : ""
              }
              onChange={onChangeText}
            >
              {valDB.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText className={classes.helper}>
              Choose MongoDB/PostgresSQL
            </FormHelperText>
          </Grid>
        </Grid>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              name="host"
              label="Host"
              className={classes.textField}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={dictItem && dictItem.host ? dictItem.host : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="port"
              label="Port"
              className={classes.textField}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={dictItem && dictItem.port ? dictItem.port : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              name="username"
              label="Username"
              className={classes.textField}
              type="text"
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={dictItem && dictItem.username ? dictItem.username : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="password"
              placeHolder="Password"
              label="Password"
              type="password"
              className={classes.textField}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={dictItem && dictItem.password ? dictItem.password : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              name="database_name"
              label="Database Name"
              className={classes.textField}
              type="text"
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={
                dictItem && dictItem.database_name ? dictItem.database_name : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="schema_name"
              label="Schema Name"
              type="text"
              className={classes.textField}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={
                dictItem && dictItem.schema_name ? dictItem.schema_name : ""
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={12} alignItems="flex-end">
          <ChipInput
            defaultValue={queryArray}
            name="query"
            label="Query"
            fullWidth
            value={queryArray || []}
            onChange={(chips) => onChangeQuery(chips)}
            onDelete={(chip) => onDeleteQuery(chip)}
          />
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(DictionaryComponent);

import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
const styles: any = (theme: any) => {
  return {
    titleField: {
      fontWeight: "bold"
    },
    textField: {
      width: "95%",
      marginRight: theme.spacing.unit
    },
    add: {
      background: "#3f51b5",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#1a237e"
      }
    },
    save:{
      background: "#689f38",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#1b5e20"
      }
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  project?: any;
  setProject?: any;
  dictItem?: any;
  setDictItem?: any;
  mode?: any;
  dictionary?: any;
}
const DictionaryComponent: React.FC<IDefautProps> = props => {
  const {
    classes,
    project,
    setProject,
    dictItem,
    setDictItem,
    mode,
    dictionary,
    setMode
  } = props;

  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;

    setDictItem({
      ...dictItem,
      [name]: value
    });
  };

  const onAddDictionary = () => {
    if (mode === "add") {
      const newDictItem = { ...dictItem };
      setProject({
        ...project,
        dictionary: [...project.dictionary, newDictItem]
      });
      setDictItem(null);
    } else if (mode === "edit") {
      const newDictionary = dictionary.map(_dictItem => {
        if (_dictItem.fieldKey === dictItem.fieldKey) {
          return { ...dictItem };
        }
        return _dictItem;
      });

      setProject({
        ...project,
        dictionary: newDictionary
      });
      setMode("add");
      setDictItem(null);
      console.log(newDictionary);
    }
  };

  return (
    <React.Fragment>
      <FormLabel className={classes.titleField}>Dictionary</FormLabel>
      <Grid container spacing={12} alignItems="flex-end">
        <Grid item xs={6}>
          <TextField
            label="Field Key"
            className={classes.textField}
            name="fieldKey"
            margin="normal"
            variant="outlined"
            onChange={onChangeText}
            value={dictItem && dictItem.fieldKey ? dictItem.fieldKey : ""}
            disabled={mode === "edit"}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Database Type"
            className={classes.textField}
            name="database_type"
            margin="normal"
            onChange={onChangeText}
            variant="outlined"
            value={
              dictItem && dictItem.database_type ? dictItem.database_type : ""
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={12} alignItems="flex-end">
        <Grid item xs={6}>
          <TextField
            name="host"
            label="Host"
            className={classes.textField}
            margin="normal"
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
            margin="normal"
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
            margin="normal"
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
            margin="normal"
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
            margin="normal"
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
            margin="normal"
            onChange={onChangeText}
            variant="outlined"
            value={dictItem && dictItem.schema_name ? dictItem.schema_name : ""}
          />
        </Grid>
      </Grid>
      <Fab
        size="small"
        aria-label="Add"
        className={mode === "add" ? classes.add : classes.save}
        onClick={onAddDictionary}
      >
        {mode === "add" ? <AddIcon /> : <DoneIcon />}
      </Fab>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(DictionaryComponent);

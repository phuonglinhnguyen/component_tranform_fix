import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import get from "lodash/get";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";

const styles: any = (theme: any) => {
  return {
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: "20px 0",
      padding: theme.spacing.unit * 3,
      textAlign: "center"
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
    delete: {
      background: "#e57373",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#b71c1c"
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
    contentItem: {
      background: "#843d8b45"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
}
const ContentItem: React.FC<IDefautProps> = props => {
  const {
    classes,
    project,
    setProject,
    setContentItem,
    content,
    contentItem,
    contentArray,
    contentName,
    setContentName,
    setContentArray,
    mode,
    setMode
  } = props;

  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("aaaa", name, value);

    setContentItem({
      ...contentItem,
      [name]: value
    });
  };

  const onAddContentItem = () => {
    if (mode === "add") {
      const newContentArray = [...contentArray];
      newContentArray.unshift({
        contentName,
        contentItem
      });
      console.log(newContentArray);
      setContentArray(newContentArray);
    } else if (mode === "edit") {
      const newContent = contentArray.map(_contentItem => {
        if (_contentItem.dataKey === contentItem.dataKey) {
          return { ...contentItem };
        }
        return _contentItem;
      });

      setProject({
        ...project,
        rules: {
          ...project.rules,
          content: {
            ...project.rules.content,
            [contentName]: contentItem
          }
        }
      });
      setMode("add");
      setContentArray(null);
    }
  };

  console.log(contentItem);
  console.log(contentItem ? contentItem.dataKey : '');

  return (
    <React.Fragment>
      <div className={classes.content}>
        <FormLabel className={classes.titleField}>Content</FormLabel>

        <Fab
          size="small"
          className={classes.add}
          aria-label="Add"
          onClick={onAddContentItem}
        >
          <AddIcon />
        </Fab>
      </div>
      <TextField
        name="contentName"
        label="Name"
        className={classes.heading}
        onChange={(e) => setContentName(e.target.value)}
        value={contentName ? contentName : ""}
      />
      <div className={classes.formControl}>
        <Grid container spacing={16} alignItems="flex-end">
          <Grid item sm={4}>
            <TextField
              name="dataKey"
              label="DataKey"
              onChange={onChangeText}
              value={contentItem ? contentItem.dataKey : ""}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              name="default"
              label="Default"
              onChange={onChangeText}
              value={contentItem ? contentItem.default : ""}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              name="value"
              label="Value"
              onChange={onChangeText}
              value={contentItem ? contentItem.value : ""}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ContentItem);

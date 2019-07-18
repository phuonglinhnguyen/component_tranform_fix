import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import FormLabel from "@material-ui/core/FormLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Project from "../../Models/Project";

const styles: any = (theme: any) => {
  return {
    titleField: {
      fontWeight: "bold",
      margin: `${theme.spacing.unit * 3}px 0px 0px 0px`
    },
    demo: {
      backgroundColor: theme.palette.background.paper
    },
    selectList: {
      cursor: "pointer",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "lightgray",
      }
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  dictionary?: any;
  setSelectedDictItem?: any;
  setMode?: any;
}
const CommonList: React.FC<IDefautProps> = props => {
  const {
    classes,
    dictionary,
    setSelectedDictItem,
    setMode,
    setProject,
    project
  } = props;
  const [dense] = useState(false);

  const deleteDict = (e, fieldKey) => {
    e.stopPropagation();
    const newDict = dictionary.filter(
      dict_item => dict_item.fieldKey !== fieldKey
    );

    const updateProject = { ...project, dictionary: newDict };
    setProject(updateProject);
  };

  return (
    <React.Fragment>
      <FormLabel className={classes.titleField}>Common List</FormLabel>
      <div className={classes.demo}>
        <List dense={dense}>
          {/* {dictionary.map(dict_item => {
            return ( */}
              <ListItem
                // key={dict_item.id}
                className={classes.selectList}
                // onClick={() => {
                //   setSelectedDictItem(dict_item);
                //   setMode("edit");
                // }}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                
                //   primary={dict_item.username}
                //   secondary={dict_item.database_name}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    // onClick={e => {
                    //   deleteDict(e, dict_item.fieldKey);
                    // }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            {/* ); */}
          {/* })} */}
        </List>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(CommonList);

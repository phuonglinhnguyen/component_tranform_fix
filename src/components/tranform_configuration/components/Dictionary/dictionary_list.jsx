import React, { useState } from "react";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
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
import { fade } from "@material-ui/core/styles/colorManipulator";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
const styles: any = (theme: any) => {
  return {
    titleField: {
      fontWeight: "bold",
      margin: `${theme.spacing.unit * 3}px 0px 0px 0px`
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      overflowY: "auto",
      height: "300px"
    },
    customSearch: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      paddingBottom: "20px",
      borderBottom: "2px solid lavender"
    },
    selectList: {
      cursor: "pointer",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "lightgray"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3,
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      background: "#d3d3d375",
      borderRadius: "50px",
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
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
const DictionaryList: React.FC<IDefautProps> = props => {
  const {
    classes,
    dictionary,
    setSelectedDictItem,
    setMode,
    setConfig,
    config
  } = props;
  const [dense] = useState(false);
  const [strSearch, setStrSearch] = useState(null);
  const deleteDict = (e, fieldKey) => {
    e.stopPropagation();
    const newDict = dictionary.filter(
      dict_item => dict_item.fieldKey !== fieldKey
    );

    const updateConfig = { ...config, dictionary: newDict };
    setConfig(updateConfig);
  };
  let searchTimeout = null;

  const onChangeSearch = e => {
    const value = e.target.value;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
      setStrSearch(value);
    }, 500);
  };
  const dictData = filter(dictionary, dictItem => {
    if (isEmpty(strSearch)) {
      return true;
    }
    const strToSearch = dictItem.fieldKey.toLowerCase();
    console.log("dictsearch", strToSearch, strSearch);
    console.log(strToSearch.indexOf(strSearch.toLowerCase()));
    return strToSearch.indexOf(strSearch.toLowerCase()) + 1;
  });

  return (
    <React.Fragment>
      <div className={classes.customSearch}>
        <FormLabel className={classes.titleField}>List Dictionary</FormLabel>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={onChangeSearch}
          />
        </div>
      </div>

      <div className={classes.demo}>
        <List dense={dense}>
          {dictData.map(dict_item => {
            return (
              <ListItem
                key={dict_item.id}
                className={classes.selectList}
                onClick={() => {
                  setSelectedDictItem(dict_item);
                  setMode("edit");
                }}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary={dict_item.fieldKey}
                  secondary={dict_item.username}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    onClick={e => {
                      deleteDict(e, dict_item.fieldKey);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(DictionaryList);

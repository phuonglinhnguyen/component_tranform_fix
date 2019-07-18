import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../../store/actions/tranform_configuration";
import FormLabel from "@material-ui/core/FormLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

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
    selectList: {
      cursor: "pointer",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "lightgray"
      }
    },
    customSearch: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      paddingBottom: "20px",
      borderBottom: "2px solid lavender"
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
  common?: any;
  setConfig?: any;
  config?: any;
  setSelectedCommonValue?: any;
  setSelectedCommonValue?: any;
  setMode?: any;
}
export interface IDefautState {
  dense?: any;
  strSearch?: any;
  setStrSearch?: any;
}
const CommonList: React.FC<IDefautProps, IDefautState> = props => {
  const {
    classes,
    common,
    setMode,
    setConfig,
    config,
    setSelectedCommonValue,
    setSelectedCommonName
  } = props;

  const [dense] = useState(false);
  const [strSearch, setStrSearch] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const deleteCommon = (commonName) => {
    const newCommon = common.filter(newItem => {
      const key = Object.keys(newItem)[0];
      return key !== commonName;
    });
    setConfig({
      ...config,
      rules: {
        ...config.rules.common,
        common: newCommon
      }
    });
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

  const commonData = filter(common, commonItem => {
    const key = Object.keys(commonItem)[0];
    if (isEmpty(strSearch)) {
      return true;
    }
    const strToSearch = key.toLowerCase();
    return strToSearch.indexOf(strSearch.toLowerCase()) + 1;
  });

  return (
    <React.Fragment>
      <div className={classes.customSearch}>
        <FormLabel className={classes.titleField}>Common List</FormLabel>
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
          {commonData.map(commonItem => {
            const key = Object.keys(commonItem)[0];
            return (
              <ListItem
                key={commonItem.id}
                className={classes.selectList}
                onClick={() => {
                  setSelectedCommonName(key);
                  setSelectedCommonValue(commonItem[key]);
                  setMode("edit");
                }}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={key} secondary={commonItem[key]} />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => setIsOpen(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                  >
                    <DialogContent>Delete CommonItem? </DialogContent>

                    <DialogActions>
                      <Button
                        onClick={() => setIsOpen(false)}
                        color="primary"
                      >
                        <Translate value={`${KEY_TRANSLATE}.disagree`} />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCommon(key)
                          setIsOpen(false);
                        }}
                        color="primary"
                        autoFocus
                      >
                        <Translate value={`${KEY_TRANSLATE}.ok_delete`} />
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(CommonList);

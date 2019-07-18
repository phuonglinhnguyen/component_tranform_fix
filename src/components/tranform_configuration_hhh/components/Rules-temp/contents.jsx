import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import get from 'lodash/get'
import toArray from 'lodash/toArray'

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

import { TextField } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import ContentItem from "./content_item";

const styles: any = (theme: any) => {
  return {
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    column: {
      flexBasis: "33.33%"
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
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
const ContentComponent: React.FC<IDefautProps> = props => {
  const {
    classes,
    setMode,
    mode,
    project,
    setProject,
  } = props;

  const content = get(project, 'rules.content', {})

  const [contentArray, setContentArray] = useState(() => {
    let temp = []
    for (const convertName in content) {
      const contentItem = content[convertName]
      temp.push({ id: Date.now(), convertName, contentItem })
    }
    return temp
  });

  if (contentArray.length === 0) {
    setContentArray([{
      id: Date.now(),
      contentName: '',
      contentItem: { status: 'new' },
    }])
  }

  const onAddContent = (id, contentName, contentItem) => {
    setProject({
      ...project,
      rules: {
        ...project.rules,
        content: {
          ...project.rules.content,
          [contentName]: contentItem
        }
      }
    })

    let newContentArray = contentArray.map(content => {
      if (content.id === id) {
        return {id, contentName, contentItem}
      }
      return content
    })
    console.log('newContentArray');
    
    console.log(newContentArray);
    
    setContentArray(newContentArray)
  };

  const onAddContentItem = () => {
    const newContentArray = [...contentArray]
    newContentArray.unshift({id: Date.now(), contentName: '', contentItem: { status: 'new' }})
    console.log(newContentArray);
    setContentArray(newContentArray)
  }

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
      <div>
        {
          contentArray.map((contentItemData) => {
            return <ContentItem
              key={contentItemData.id}
              contentItemData={contentItemData}
              onAddContent={onAddContent}
            />
          })
        }
      </div>

    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ContentComponent);

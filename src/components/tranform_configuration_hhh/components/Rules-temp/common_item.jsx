import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

const styles: any = (theme: any) => {
  return {
    formControl: {
      display: "inherit",
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    },
    column: {
      flexBasis: "33.33%"
    },
    formCommon: {
      margin: `0px ${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px`
    },
    titleField: {
      fontWeight: "bold"
    },
    common: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    delete: {
      background: "#e57373",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#b71c1c"
      }
    },
    edit: {
      background: "#ec407a",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#ad1457"
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
  editCommon?: any;
  setEditCommon?: any;
}

const Common: React.FC<IDefautProps> = props => {
  const { classes, mode, setMode } = props;
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
// const changeEditToSave=()=>{
//   if(mode==="edit"){

//   }
// }
  return (
    <React.Fragment>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          className={classes.contentItem}
        >
          <Typography className={classes.heading}>Common1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>chuoi</Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Fab
            size="small"
            className={classes.edit}
            aria-label="Edit"
            onclick={() => {
              setMode("edit");
            }}
          >
            <EditIcon />
          </Fab>
          <Fab size="small" aria-label="Delete" className={classes.delete}>
            <DeleteIcon />
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          className={classes.contentItem}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
        >
          <Typography className={classes.heading}>Common2</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Fab size="small" className={classes.edit} aria-label="Edit">
            <EditIcon />
          </Fab>
          <Fab size="small" aria-label="Delete" className={classes.delete}>
            <DeleteIcon />
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);

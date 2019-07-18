import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Common from "./common";
import Content from "./contents";

const styles: any = (theme: any) => {
  return {
    wrapForm: {
      display: "flex",
      justifyContent: "space-around"
    },
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: `${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px 0px`,
      padding: theme.spacing.unit * 2,
      minHeight: "200px"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  project?: any;
  setProject?: any;
}
const Rules: React.FC<IDefautProps> = props => {
  const { classes, project, setProject } = props;
  const content = project && project.rules.content ? project.rules.content : [];
  const common = project && project.rules.common ? project.rules.common : [];
  const [mode, setMode] = useState("add");
  const [editCommon, setEditCommon] = useState(null);
  const [commonItem, setCommonItem] = useState(null);

  return (
    <Grid className={classes.wrapForm} spacing={24}>
      <Grid item xs={12} md={7} className={classes.formControl}>
        <Common
          common={common}
          mode={mode}
          setMode={setMode}
          project={project}
          setProject={setProject}
          setEditCommon={setEditCommon}
          commonItem={editCommon ? editCommon : commonItem}
          setCommonItem={editCommon ? editCommon : setCommonItem}
        />
      </Grid>
      <Grid item xs={12} md={5} className={classes.formControl}>
        <Content
          project={project}
          setProject={setProject}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(Rules);

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Common from "./Common";
import Content from "./Content";

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
  config?: any;
  setConfig?: any;
}

const Rules: React.FC<IDefautProps> = props => {
  const { classes, config, setConfig } = props;
  return (
    <React.Fragment>
      <Grid className={classes.wrapForm} spacing={24}>
        <Grid item xs={12} md={6} className={classes.formControl}>
          <Common
            config={config}
            setConfig={setConfig}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.formControl}>
          <Content
            config={config}
            setConfig={setConfig}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Rules);

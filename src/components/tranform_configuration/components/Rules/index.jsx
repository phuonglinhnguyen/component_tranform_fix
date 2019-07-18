import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Common from "./Common";
import Content from "./Content";

const styles: any = (theme: any) => {
  return {
   
  };
};

export interface IDefautProps {
  styles?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
}

const Rules: React.FC<IDefautProps> = props => {
  const { config, setConfig } = props;
  return (
    <React.Fragment>
      <Common
        config={config}
        setConfig={setConfig}
      />
      <Content
        config={config}
        setConfig={setConfig}
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Rules);

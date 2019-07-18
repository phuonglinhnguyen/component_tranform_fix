import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import CommonInput from "./common_input";
import CommonList from "./common_list";
import get from "lodash/get";
const styles: any = (theme: any) => {
  return {};
};

export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  commonName?: any;
}
const Common: React.FC<IDefautProps> = props => {
  const { classes, mode, setMode, project, setProject } = props;
  const common = get(project, "rules.common", []);

  const [commonItem, setCommonItem] = useState(null);
  const [commonName, setCommonName] = useState(null);
  

  return (
    <React.Fragment>
      <CommonInput
        project={project}
        setProject={setProject}
        commonItem={commonItem}
        setCommonItem={setCommonItem}
        mode={mode}
        setMode={setMode}
        common={common}
        setCommonName={setCommonName}
      />
      <CommonList />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);

import React, { useState } from "react";
import get from "lodash/get";

import { withStyles } from "@material-ui/core/styles";
import CommonInput from "./common_input";
import CommonList from "./common_list";

const styles: any = (theme: any) => {
  return {};
};

export interface IDefautProps {
  styles?: any;
  theme?: any;
  setConfig?: any;
  config?: any;
}
export interface IDefautState {
  common?: any;
  mode?: any;
  setMode?: any;
  commonValue?: any;
  setCommonValue?: any;
  commonName?: any;
  setCommonName?: any;
  selectedCommonValue?: any;
  setSelectedCommonValue?: any;
}
const Common: React.FC<IDefautProps> = props => {
  const { config, setConfig } = props;

  const common = get(config, "rules.common", []);
  const [mode, setMode] = useState("add");
  const [commonValue, setCommonValue] = useState(null);
  const [commonName, setCommonName] = useState(null);
  const [selectedCommonName, setSelectedCommonName] = useState(null);
  const [selectedCommonValue, setSelectedCommonValue] = useState(null);

  return (
    <React.Fragment>
      <CommonInput
        config={config}
        setConfig={setConfig}
        commonValue={selectedCommonValue ? selectedCommonValue : commonValue}
        setCommonValue={
          selectedCommonValue ? setSelectedCommonValue : setCommonValue
        }
        mode={mode}
        setMode={setMode}
        common={common}
        commonName={selectedCommonName ? selectedCommonName : commonName}
        setCommonName={
          selectedCommonName ? setSelectedCommonName : setCommonName
        }
      />
      <CommonList
        setMode={setMode}
        common={common}
        config={config}
        setConfig={setConfig}
        setSelectedCommonValue={setSelectedCommonValue}
        setSelectedCommonName={setSelectedCommonName}
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);

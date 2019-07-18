import React, { useState } from "react";

import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";
import { withStyles } from "@material-ui/core/styles";
// import * as constants from '../../../store/actions/tranform_configuration'
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from '@material-ui/core/CircularProgress';

import InputComponent from "../input_component";
import Config from "../Models/Config";

import "./dialog.css";

const styles: any = (theme: any) => {
  return {
    showDialog: {
      maxWidth: "1200px"
    },
    iconProgress: {
      position: "absolute",
      padding: `${theme.spacing.unit}px`,
      color: theme.palette.primary.contrastText,
      top: '0px',
      right: "0px"
    }
  };
};
export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  isOpen?: any;
  setIsOpen?: any;
  pending?: any;
  success?: any;
  refreshPage?: any;
}
export interface IDefautState {
  config?: any;
  setConfig?: any;
  cronValue?: any;
  setCronValue?: any;
}
const AddDialog: React.FC<IDefautProps, IDefautState> = props => {
  const {
    isOpen,
    setIsOpen,
    classes,
    createData,
    config,
    setConfig,
    isErrorsConfig
  } = props;
  const [cronValue, setCronValue] = useState(" ");

  const onAgree = () => {
    createData(config);
  };
  console.log({ pending });

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={classes.test}
    >
      <DialogTitle className="tilte-dialog">
        {"Add Transform Config"}
      </DialogTitle>
      <DialogContent>
        <InputComponent
          config={config}
          setConfig={setConfig}
          cronValue={cronValue}
          setCronValue={setCronValue}
          {...props}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => setIsOpen(false)}
          color="primary"
        >
          <Translate value={`${KEY_TRANSLATE}.disagree`} />
        </Button>
        <Button
          onClick={onAgree}
          color="primary"
          autoFocus
          disabled={pending || refreshPage || isErrorsConfig}
        // 
        >
          <Translate value={`${KEY_TRANSLATE}.agree`} />
        </Button>
        {/* {pending ?
          <div className={classes.iconProgress}>
            <CircularProgress
              color="primary"
              size={40}
            />
          </div>
          :
          ""
        } */}
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(AddDialog);

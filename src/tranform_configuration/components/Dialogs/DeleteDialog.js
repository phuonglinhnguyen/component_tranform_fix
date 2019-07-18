
import React from 'react'
import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";
import { withStyles } from "@material-ui/core/styles";
// import * as constants from '../../../store/actions/tranform_configuration'
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";


import "./dialog.css";

const styles: any = (theme: any) => {
  return {
  };
};
export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  isOpen?: any;
  setIsOpen?: any;
}
const DeleteDialog: React.FC<IDefautProps> = props => {
  const {
    isOpen,
    setIsOpen,
    classes,
    deleteData,
    config } = props;

  const onOK = () => {
    deleteData(config)
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={classes.test}
    >
      <DialogContent>
        Delete?
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => setIsOpen(false)}
          color="primary"
        >
          <Translate value={`${KEY_TRANSLATE}.disagree`} />
        </Button>
        <Button
          onClick={onOK}
          color="primary"
          autoFocus
        >
          <Translate value={`${KEY_TRANSLATE}.ok_delete`} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(DeleteDialog);

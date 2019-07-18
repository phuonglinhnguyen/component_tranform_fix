import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

// import InputComponent from "../input_component";
// import { Translate } from "react-redux-i18n";
// import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";

const TransformDialog = props => {
  const { isOpen, setIsOpen, project, setProject } = props;
  const [pattern, setTransform] = useState({})

  const _onAgree = () => {
    console.log(pattern);
    console.log();
    setIsOpen(false);
    setProject({
      ...project,
      filter: {
        ...project.filter,
        transform:{
          pattern: JSON.stringify(pattern)
        }
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Test Transform"}</DialogTitle>
      <DialogContent>
        <JSONInput
          id='a_unique_id'
          placeholder={pattern}
          locale={locale}
          height='550px'
          onChange={(e) => {
            setTransform(e.jsObject)
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => setIsOpen(false)}
          color="primary"
        >
          No
        {/* <Translate value={`${KEY_TRANSLATE}.disagree`} /> */}
        </Button>

        <Button
          onClick={_onAgree}
          color="primary"
          autoFocus
        > Yes
        {/* <Translate value={`${KEY_TRANSLATE}.agree`} /> */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransformDialog;

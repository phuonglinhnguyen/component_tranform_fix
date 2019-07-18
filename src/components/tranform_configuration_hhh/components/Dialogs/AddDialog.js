import React, { useState } from 'react'
import { TextField, Button } from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputComponent from "../input_component";
import Project from '../Models/Project';

const AddDialog = props => {
  const { isOpen, setIsOpen, projects, setProjects } = props
  const [project, setProject] = useState(() => {
    return new Project()
  })

  console.log(project);

  const _onAgree = () => {
    const newProjects = [...projects, project]
    setProjects(newProjects)
    setIsOpen(false)
    setProject(new Project())
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      
    >
      <DialogTitle id="alert-dialog-title">{"Transform Config"}</DialogTitle>
      <DialogContent style={{maxWidth: '800px !important'}}>
        <InputComponent
          project={project}
          setProject={setProject}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          Disagree
            </Button>
        <Button onClick={_onAgree} color="primary" autoFocus>
          Agree
            </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDialog
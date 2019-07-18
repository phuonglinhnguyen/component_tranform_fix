import React, { useState } from 'react'
import { TextField, Button } from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputComponent from "../input_component";
import Project from '../Models/Project';

const EditDialog = props => {
  const { isOpen, setIsOpen, projects, setProjects, project, setProject ,editable} = props
  //console.log(projects);
  
  const _onAgree = () => {
    const newProjects = projects.map(_project => {
        if (_project.project_id === project.project_id) {
            return {...project}
        }
        return _project
    })
    setProjects(newProjects)
    setIsOpen(false)
    setProject(null)
  }
  

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Transform Config"}</DialogTitle>
      <DialogContent>
        <InputComponent
          project={project}
          setProject={setProject}
          editable={true}
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

export default EditDialog
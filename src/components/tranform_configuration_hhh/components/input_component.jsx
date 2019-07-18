import React, { useState } from "react";

// import { CronTriggerQuartz } from "@dgtx/core-component-ui";

import get from "lodash/get";

import { withStyles } from "@material-ui/core/styles";
import { TextField, Switch } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";

import "./Dialogs/main.css";
import TransformDialog from "./Dialogs/TranformDialog";
import Rules from "./Rules";
import Dictionary from "./Dictionary";

const styles: any = (theme: any) => {
  return {
    container: {
      width: "100vw",
      maxWidth: "100%",
      align: "center"
    },
    wrapp1: {
      display: "flex",
      width: "100%"
    },
    wrapForm: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px"
    },
    textField: {
      marginRight: theme.spacing.unit
    },
    group: {
      margin: "20px auto"
    },
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: `${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px 0px`,
      padding: theme.spacing.unit * 2,
      minHeight: "200px"
    },
    radioGroup: {
      flexDirection: "row",
      flexWrap: "initial"
    },
    titleField: {
      fontWeight: "bold",
      margin: `${theme.spacing.unit * 3}px 0px 0px 0px`
    },
    contentField: {
      fontSize: "14px",
      fontWeight: "200"
    },
    showPattern: {
      background: "black",
      color: "white",
      padding: "10px",
      marginTop: "10px",
      width: "400px",
      overflowWrap: "break-word"
    },
    demo: {
      backgroundColor: theme.palette.background.paper
    }
  };
};

const PROJECT_NAME = "Project Name";

export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  project?: any;
  setProject?: any;
}
const InputComponent: React.FC<IDefautProps> = props => {
  const { classes, project, setProject } = props;
  // console.log(project);

  const [isOpenTransformModal, setIsOpenTransformModal] = useState(false);


  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;
    setProject({
      ...project,
      [name]: value
    });
  };

  const onChangeActive = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    // console.log(checked);

    setProject({
      ...project,
      [name]: checked
    });
  };

  const onChangeRadio = e => {
    const name = e.target.name;
    const value = e.target.value;
    const collector = get(project, "filter.collector", {});
    let newCollector = {};

    for (const key in collector) {
      if (key === value) {
        newCollector[key] = "final";
      } else {
        newCollector[key] = "";
      }
    }

    setProject({
      ...project,
      filter: {
        ...project.filter,
        collector: newCollector
      }
    });
  };

  const collectorValue = () => {
    let value = "";
    const collector = get(project, "filter.collector", {});
    for (const key in collector) {
      const final = collector[key]; // final = 'final'
      if (final === "final") {
        value = key; // value = doc_status
      }
    }
    return value;
  };

  const handleChangeCron = cronValue => {
    setProject({
      ...project,
      cron_trigger: cronValue
    });
  };

  const generate = element => {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value
      })
    );
  };

  return (
    <React.Fragment>
      <div>
        <div className={classes.wrapp1}>
          <div>
            <FormLabel className={classes.titleField}>
              Project Informations
          </FormLabel>

            <form className={classes.formControl}>
              <TextField
                required
                value={project ? project.name : ""}
                name="name"
                label={PROJECT_NAME}
                className={classes.textField}
                onChange={onChangeText}
              />
              <TextField
                name="version"
                value={project ? project.version : "test version"}
                label="Version"
                className={classes.textField}
                onChange={onChangeText}
                disabled
              />
              <FormGroup>
                <FormControlLabel
                  label="Active"
                  control={
                    <Switch
                      aria-label="Active"
                      name="active"
                      checked={project ? project.active : true}
                      onChange={onChangeActive}
                      color="primary"
                    />
                  }
                />
              </FormGroup>
            </form>
          </div>
          <div>
            <FormLabel className={classes.titleField}>Filter</FormLabel>
            <div className={classes.formControl}>
              <FormControl className={classes.formCollector}>
                <FormLabel className={classes.contentField}>
                  Collector
              </FormLabel>
                <RadioGroup
                  aria-label="Collector"
                  name="collector"
                  className={classes.radioGroup}
                  value={collectorValue()}
                  onChange={onChangeRadio}
                >
                  <FormControlLabel
                    value="doc_status"
                    control={<Radio />}
                    label="Doc_status"
                  />
                  <FormControlLabel
                    value="batch_status"
                    control={<Radio />}
                    label="Batch_status"
                  />
                  <FormControlLabel
                    value="doc_set_status"
                    control={<Radio />}
                    label="Doc_set_status"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsOpenTransformModal(true)}
              >
                Transform
            </Button>
              <TransformDialog
                isOpen={isOpenTransformModal}
                setIsOpen={setIsOpenTransformModal}
                project={project}
                setProject={setProject}
              />
              <div className={classes.showPattern}>

                {/* {getDataObject("filter.transform.pattern", project) || ""} */}
              </div>
            </div>
          </div>
        </div>

        <FormLabel className={classes.titleField}>CronTriggerQuartz</FormLabel>
        {/* <CronTriggerQuartz
          className={classes.group}
          cronValue={"0/10 * * * * ? *"}
          viewCronValue={true}
          tabs={["minutes", "hourly", "daily", "weekly"]}
          onChange={handleChangeCron}
        /> */}

        {/* Dictionary */}
        <Dictionary
          project={project}
          setProject={setProject}
        />

        <FormLabel className={classes.titleField}>Rules</FormLabel>
        <Rules project={project} setProject={setProject} />
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(InputComponent);

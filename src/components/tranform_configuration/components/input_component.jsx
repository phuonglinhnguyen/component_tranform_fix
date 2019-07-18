import React, { useState, useContext, useRef } from "react";
// import { CronTriggerQuartz } from "@dgtx/core-component-ui";
// import { getDataObject } from "@dgtx/coreui";

import get from "lodash/get";
import { isEmpty } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { TextField, Switch } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import TransformDialog from "./Dialogs/TranformDialog";
import Dictionary from "./Dictionary";
import Rules from "./Rules";
import { isRequired, configValidators, setConfigValidator } from "../services";

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
    },
    error: {
      color: "red",
      opacity: "0.8"
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
const InputComponent: React.FC<IDefautProps> = props => {
  const { classes, config, setConfig } = props;
  const [isOpenTransformModal, setIsOpenTransformModal] = useState(false);
  const name = useState("");

  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;

    if (configValidators[name] && isRequired(value)) {
      setConfigValidator(name, true)
      // setIsError(true)
    } else if (configValidators[name]) {
      setConfigValidator(name, false)
      // setIsError(false)
    }

    setConfig({
      ...config,
      [name]: value
    });
  };

  const onChangeActive = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    setConfig({
      ...config,
      [name]: checked
    });
  };

  const onChangeRadio = e => {
    const name = e.target.name;
    const value = e.target.value;
    const collector = get(config, "filter.collector", {});
    let newCollector = {};

    for (const key in collector) {
      if (key === value) {
        newCollector[key] = "final";
      } else {
        newCollector[key] = "";
      }
    }

    setConfig({
      ...config,
      filter: {
        ...config.filter,
        collector: newCollector
      }
    });
  };

  const collectorValue = () => {
    let value = "";
    const collector = get(config, "filter.collector", {});
    for (const key in collector) {
      const final = collector[key]; // final = 'final'
      if (final === "final") {
        value = key; // value = doc_status
      }
    }
    return value;
  };
  
  const handleChangeCron = cronValue => {
    setConfig({
      ...config,
      cron_trigger: cronValue
    });
  };
  
  const check_name = e => {
    const value = e.target.value;
    let good = !isEmpty(value);

    if (good) {
      return { message: "valid" };
    } else {
      return { message: "invalid", detail: "it's empty" };
    }
  };

  return (
    <React.Fragment>
      <div>
        <Grid className={classes.wrapForm} spacing={24}>
          <Grid item xs={12} md={6}>
            <FormLabel className={classes.titleField}>Config</FormLabel>

            <form className={classes.formControl} >
              <div>
                <TextField
                  required
                  defaultValue={config ? config.name : ""}
                  name="name"
                  label="Name"
                  className={classes.textField}
                  error={configValidators['name'].error}
                  onChange={onChangeText}
                />
                <FormHelperText className={classes.error}>
                  {configValidators['name'].error ? configValidators['name'].message : ''}
                </FormHelperText>
              </div>

              <TextField
                name="version"
                value={config ? config.version : "test version"}
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
                      checked={config ? config.active : true}
                      onChange={onChangeActive}
                      color="primary"
                    />
                  }
                />
              </FormGroup>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
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
                config={config}
                setConfig={setConfig}
              />
              <div className={classes.showPattern}>
                {/* {getDataObject("filter.transform.pattern", config) || ""} */}
              </div>
            </div>
          </Grid>
        </Grid>

        <FormLabel className={classes.titleField}>Cron Trigger</FormLabel>
        {/* <CronTriggerQuartz
          className={classes.group}
          input={true}
          cronValue={cronTrigger}
          viewCronValue={true}
          tabs={["minutes", "hourly", "daily", "weekly"]}
          onChange={handleChangeCron}
        /> */}
        {/* input: cronTrigger from config.cron_trigger
            output: get from handleChangeCron
            ------: dung setConfig de update
        */}
        <Dictionary config={config} setConfig={setConfig} />
        <FormLabel className={classes.titleField}>Rules</FormLabel>
        <Rules config={config} setConfig={setConfig} />
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(InputComponent);

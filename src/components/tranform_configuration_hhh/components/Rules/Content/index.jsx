import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ContentInput from "./content_input";
import ContentList from "./content_list";
import get from "lodash/get";
import toArray from "lodash/toArray";

const styles: any = (theme: any) => {
  return {};
};

export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
}
const Content: React.FC<IDefautProps> = props => {
  const { classes, project, setProject, mode, setMode } = props;
  const content = get(project, "rules.content", {});
  const [selectedContentItem, setSelectedContentItem] = useState(null);

  const [contentName, setContentName] = useState(null);
  const [contentItem, setContentItem] = useState(null);

  const [contentArray, setContentArray] = useState(() => {
    let temp = [];
    for (const contentName in content) {
      const contentItem = content[contentName];
      temp.push({ contentName, contentItem });
    }
    console.log("contentName:", contentName);
    return temp;
  });

  return (
    <React.Fragment>
      <ContentInput
        content={content}
        project={project}
        setProject={setProject}
        contentItem={selectedContentItem ? selectedContentItem.contentItem : contentItem}
        setContentItem={
          selectedContentItem ? selectedContentItem : setContentItem
        }
        setSelectedContentItem={setSelectedContentItem}
        contentArray={contentArray}
        setContentArray={setContentArray}
        contentName={selectedContentItem ? selectedContentItem.contentName : contentName}
        setContentName={selectedContentItem ? selectedContentItem : setContentName}
        mode={mode}
        setMode={setMode}
      />
      <ContentList
        content={content}
        contentName={contentName}
        contentItem={contentItem}
        project={project}
        setProject={setProject}
        setSelectedContentItem={setSelectedContentItem}
        contentArray={contentArray}
        setContentArray={setContentArray}
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Content);

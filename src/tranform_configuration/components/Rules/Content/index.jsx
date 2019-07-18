import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentInput from "./content_input";
import ContentList from "./content_list";
import get from "lodash/get";

const styles: any = (theme: any) => {
  return {};
};

export interface IDefautProps {
  styles?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
}
export interface IDefautState {
  selectedContentItem?: any;
  setSelectedContentItem?: any;
  mode?: any;
  setMode?: any;
  contentName?: any;
  setContentName?: any;
  contentItem?: any;
  setContentName?: any;
  contentArray?: any;
  setContentArray?: any;
}

const Content: React.FC<IDefautProps,IDefautState> = props => {
  const { config, setConfig} = props;

  const content = get(config, "rules.content", {});
  const [selectedContentItem, setSelectedContentItem] = useState(null);
  const [mode, setMode] = useState("add");
  const [contentName, setContentName] = useState(null);
  const [contentItem, setContentItem] = useState(null);

  const [contentArray, setContentArray] = useState(() => {
    let temp = [];
    for (const contentName in content) {
      const contentItem = content[contentName];
      temp.push({ contentName, contentItem });
    }
    return temp;
  });

  return (
    <React.Fragment>
      <ContentInput
        content={content}
        config={config}
        setConfig={setConfig}
        contentItem={
          selectedContentItem ? selectedContentItem.contentItem : contentItem
        }
        setContentItem={
          selectedContentItem ? setSelectedContentItem : setContentItem
        }
        setSelectedContentItem={setSelectedContentItem}
        contentArray={contentArray}
        setContentArray={setContentArray}
        contentName={
          selectedContentItem ? selectedContentItem.contentName : contentName
        }
        setContentName={
          selectedContentItem ? selectedContentItem : setContentName
        }
        mode={mode}
        setMode={setMode}
      />
      <ContentList
        setMode={setMode}
        content={content}
        contentName={contentName}
        contentItem={contentItem}
        config={config}
        setConfig={setConfig}
        setSelectedContentItem={setSelectedContentItem}
        contentArray={contentArray}
        setContentArray={setContentArray}
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Content);

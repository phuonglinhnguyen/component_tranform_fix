import * as React from "react";
import { PageDecorator, getDataObject } from "@dgtx/coreui";
import { compose } from "recompose";
import WapperComponent from "../components/wapper_component";
import { getDataTranform } from "../../../store/actionsCreator/tranform_configuration";
import Reducer from "../../../store/reducers/tranform_configuration";
import * as constant from "../../../store/actions/tranform_configuration";
interface LayoutDefautProps {
  classes?: any;
  theme?: any;
  getDataTranform?: any;
}
class TranformConfigurationPage extends React.Component<LayoutDefautProps,any> {
  componentWillMount = () => {
    const { getDataTranform = () => null, match, actions } = this.props;
    const projectId = getDataObject("params.projectid", match);
    getDataTranform(projectId);
  };

  componentWillUnmount = () => {
    // const { unmount = () => null } = this.props;
    // unmount()
  };

  render() {
    const { data, match, getDataTranform = () => null,  } = this.props;
    const projectId = getDataObject("params.projectid", match);
    return (
      <WapperComponent data={data} 
      projectId={projectId} 
      constant={constant} 
      getDataTranform={getDataTranform} 
      />
    );
  }
}

const resources = [
  // { name: 'project_training' },
  Reducer
];
export default compose(
  PageDecorator({
    resources,
    actions: {
      getDataTranform
    },
    mapState: (state: any) => ({
      data: getDataObject(`resources.${constant.NAME_REDUCER}.data`, state.core) || [],
    })
  })
)(TranformConfigurationPage);
// data: {
//   item1: {
//     item2: ''
//   }
// }
// dataParent: getDataObject('item1.item2', data) || [],
, em
import * as React from 'react';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import { compose } from 'recompose';
import WapperComponent from '../components/wapper_component';
import {
	getData,
	deleteData,
	createData,
	unmount,
	updateData,
	setConfig,
	setSelectedConfig,
	setIsOpenAddDialog,
	setIsOpenEditDialog,
	setIsOpenDelDialog,
	setIsCloseDialog,
	setConfigValidator
} from '../../../store/actionsCreator/tranform_configuration';
import Reducer from '../../../store/reducers/tranform_configuration_reducer';
import * as constant from '../../../store/actions/tranform_configuration';
interface LayoutDefautProps {
	classes?: any,
	theme?: any,
	getData?: any,
	deleteData?: any,
	createData?: any,
	updateData?: any,
	pending?: any,
	success?: any,
	refreshPage?: any,
	keyTranslate?: any,
	match?: any
}
class TranformConfigurationPage extends React.Component<LayoutDefautProps, any> {
	componentWillMount = () => {
		const { getData, match } = this.props;
		const projectId = getDataObject('params.projectid', match);
		getData(projectId);
	};

	componentWillUnmount = () => {
		const { unmount = () => null } = this.props;
		unmount();
	};

	render() {
		const { match } = this.props;
		const projectId = getDataObject('params.projectid', match);

		return (
			<React.Fragment>
				<WapperComponent projectId={projectId} constant={constant} {...this.props} />
			</React.Fragment>
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
			getData,
			unmount,
			deleteData,
			createData,
			updateData,
			setConfig,
			setSelectedConfig,
			setIsOpenAddDialog,
			setIsOpenEditDialog,
			setIsOpenDelDialog,
			setIsCloseDialog,
			setConfigValidator
		},
		mapState: (state: any) => ({
			data: getDataObject(`resources.${constant.NAME_REDUCER}.data`, state.core) || [],
			pending: getDataObject(`resources.${constant.NAME_REDUCER}.data.pending`, state.core),
			success: getDataObject(`resources.${constant.NAME_REDUCER}.data.success`, state.core),
			refreshPage: getDataObject(`resources.${constant.NAME_REDUCER}.data.refreshPage`, state.core),
			keyTranslate: constant.KEY_TRANSLATE,
			config: getDataObject(`resources.${constant.NAME_REDUCER}.data.config`, state.core),
			selectedConfig: getDataObject(`resources.${constant.NAME_REDUCER}.data.selectedConfig`, state.core),
			isOpenAdd: getDataObject(`resources.${constant.NAME_REDUCER}.data.isOpenAdd`, state.core),
			isOpenEdit: getDataObject(`resources.${constant.NAME_REDUCER}.data.isOpenEdit`, state.core),
			isOpenDel: getDataObject(`resources.${constant.NAME_REDUCER}.data.isOpenDel`, state.core),
			configValidators: getDataObject(`resources.${constant.NAME_REDUCER}.data.configValidators`, state.core)
		})
	})
)(TranformConfigurationPage);

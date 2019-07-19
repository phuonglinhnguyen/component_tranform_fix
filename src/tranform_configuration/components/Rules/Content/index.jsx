import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ContentInput from './content_input';
import ContentList from './content_list';
import Grid from '@material-ui/core/Grid';
import get from 'lodash/get';

const styles: any = (theme: any) => {
	return {
		wrapForm: {
			display: 'flex',
			justifyContent: 'space-around'
		},
		formControl: {
			boxShadow: '-4px 3px 33px -10px rgba(0,0,0,0.75)',
			margin: `${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px 0px`,
			padding: theme.spacing.unit * 2,
			minHeight: '200px'
		}
	};
};

export interface IDefautProps {
	styles?: any,
	theme?: any,
	classes?: any,
	config?: any,
	setConfig?: any
}
export interface IDefautState {
	selectedContentItem?: any,
	setSelectedContentItem?: any,
	mode?: any,
	setMode?: any,
	contentName?: any,
	setContentName?: any,
	contentItem?: any,
	setContentName?: any,
	contentArray?: any,
	setContentArray?: any
}

const Content: React.FC<IDefautProps, IDefautState> = (props) => {
	const { classes, config, setConfig } = props;

	const content = get(config, 'rules.content', {});
	const [ selectedContentItem, setSelectedContentItem ] = useState(null);
	const [ mode, setMode ] = useState('add');
	const [ contentName, setContentName ] = useState(null);
	const [ contentItem, setContentItem ] = useState(null);

	const [ contentArray, setContentArray ] = useState(() => {
		let temp = [];
		for (const contentName in content) {
			const contentItem = content[contentName];
			temp.push({ contentName, contentItem });
		}
		return temp;
	});

	return (
		<Grid className={classes.wrapForm} spacing={24}>
			<Grid item xs={12} md={6} className={classes.formControl}>
				<ContentInput
					{...props}
					content={content}
					config={config}
					setConfig={setConfig}
					contentItem={selectedContentItem ? selectedContentItem.contentItem : contentItem}
					setContentItem={selectedContentItem ? setSelectedContentItem : setContentItem}
					setSelectedContentItem={setSelectedContentItem}
					contentArray={contentArray}
					setContentArray={setContentArray}
					contentName={selectedContentItem ? selectedContentItem.contentName : contentName}
					setContentName={selectedContentItem ? selectedContentItem : setContentName}
					mode={mode}
					setMode={setMode}
				/>
			</Grid>
			<Grid item xs={12} md={6} className={classes.formControl}>
				<ContentList
					{...props}
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
			</Grid>
		</Grid>
	);
};

export default withStyles(styles, { withTheme: true })(Content);

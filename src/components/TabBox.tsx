import React, { Component, ReactElement } from "react";
import { Tabs, Tab } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import TabPanel, { TabPanelProps } from './TabPanel';

const styles = createStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    horizontal: {
        '& $tabs': {
            borderBottom: `1px solid ${theme.palette.divider}`,
        }
    },
    vertical: {
        display: 'flex',
        minHeight: 224,
        '& $tabs': {
            borderRight: `1px solid ${theme.palette.divider}`,
        },
        '& $tabpanel': {
            flex: 1,
        }
    },
    tabs: null,
    tabpanel: null,
}));

interface TabBoxProps {
    children?: ReactElement<TabPanelProps>[],
    orientation?: 'vertical'|'horizontal',
    label?: string,
    value?: number,
}
interface TabBoxState {
    value: number
}
class TabBox extends Component<TabBoxProps & WithStyles, TabBoxState> {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || 0
        };
    }
    render() {
        const { label, classes, children } = this.props;
        const { value } = this.state;

        const orientation = this.props.orientation || 'horizontal';

        return (
            <div className={classes.root + ' ' + classes[orientation]}>
                <Tabs
                    orientation={orientation}
                    variant="scrollable"
                    value={value}
                    onChange={(e, value) => this.setState({value})}
                    aria-label={label}
                    className={classes.tabs}
                >
                    {children.map((tab, index) => (
                        <Tab
                            key={index}
                            icon={tab.props.icon}
                            label={tab.props.label}
                            id={`vertical-tab-${index}`}
                            // ariaControls={`vertical-tabpanel-${index}`}
                        />
                    ))}
                </Tabs>
                {children.map((tab, index) => (
                    //@ts-ignore
                    <TabPanel key={index} value={value} index={index} {...tab.props} className={classes.tabpanel} />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(TabBox);

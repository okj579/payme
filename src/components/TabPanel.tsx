import React, { Component } from "react";
import {Box} from "@material-ui/core";

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface TabPanelProps extends DivProps {
    index?: any;
    value?: any;
    icon?: string | React.ReactElement;
    label?: React.ReactNode;
}

export default class TabPanel extends Component<TabPanelProps> {
    render() {
        const { children, value, index, ...other } = this.props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }
}

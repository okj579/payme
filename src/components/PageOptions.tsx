import React, {Component} from "react";
import {createStyles, withStyles, WithStyles} from "@material-ui/core/styles";
import {WithRouterProps} from "next/dist/client/with-router";
import {withTranslation, WithTranslation} from "../i18n";
import {PageOptions} from "../pages/[page]";
import {withRouter} from "next/router";
import {Box, MenuItem, Select, TextField} from "@material-ui/core";
import {currencies} from "../types";

const styles = createStyles({
    root: {
        marginBottom: 10,
        '& .MuiTextField-root': {
            marginRight: 10,
            marginBottom: 10
        }
    },
    optionsValue: {
        textAlign: 'right',
        paddingRight: '.5em',
        appearance: 'textfield',
        '&::input::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            appearance: 'none'
        }
    },
});


interface Props {
    value: PageOptions
}

class PageOptionsComponent extends Component<Props & WithStyles & WithRouterProps & WithTranslation, PageOptions> {
    constructor(props) {
        super(props);
        this.state = props.value;
    }
    render() {
        const { classes, t } = this.props;
        return (
            <Box className={classes.root}>
                <TextField
                    label={t('options.amount')}
                    size="small"
                    {...this.bind('amount', 'number')}
                    InputProps={{
                        type: 'number',
                        inputProps: {
                            className: classes.optionsValue,
                            step: 0.01
                        },
                        endAdornment: (
                            <Select {...this.bind('currency')}>
                                {currencies.map(currency => <MenuItem value={currency}>{currency}</MenuItem>)}
                            </Select>
                        )
                    }} />
                <TextField
                    label={t('options.purpose')}
                    size="small"
                    {...this.bind('purpose')} />
            </Box>
        );
    }

    bind(field: keyof PageOptions, type: 'string'|'number' = 'string') {
        return {
            value: this.state[field],
            onChange: event => {
                let value = event.target.value;
                if (type === 'number') {
                    value = parseFloat(value);
                    if (isNaN(value)) value = null;
                }
                if (value == '') value = null;
                this.setState({
                    [field]: value
                })
                this.props.onChange()
            }
        }
    }
}

export default withRouter(withTranslation('common')(withStyles(styles)(PageOptionsComponent)));

import React, {Component} from "react";
import {Box, IconButton, InputAdornment, TextField, Tooltip} from "@material-ui/core";
import {WithTranslation, withTranslation} from '../i18n';
import {StandardTextFieldProps} from "@material-ui/core/TextField/TextField";
import {FileCopy} from "@material-ui/icons";
import Clipboard from 'react-clipboard.js';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

const styles = createStyles({
    root: {
        marginBottom: 5,
        '& .MuiInputLabel-root': {
            // fontWeight: 'bold',
            color: 'inherit',
        }
    }
});

class CopyField extends Component<StandardTextFieldProps & WithTranslation & WithStyles> {
    render() {
        const { t, classes, value } = this.props;

        return (
            <Box className={classes.root}>
                <TextField {...this.props} fullWidth={true} InputProps={{
                    ...this.props.InputProps,
                    readOnly: true,
                    disableUnderline: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title={t('copy.title')}>
                                <Clipboard
                                    component={IconButton}
                                    data-clipboard-text={value}
                                    onSuccess={this.onSuccess.bind(this)}
                                    onError={this.onSuccess.bind(this)}
                                >
                                    <FileCopy/>
                                </Clipboard>
                            </Tooltip>
                        </InputAdornment>
                    )
                }} />
            </Box>
        );
    }

    onSuccess() {
        const {t} = this.props;
        console.log(t('copy.success'));
    }
    onError() {
        const {t} = this.props;
        alert(t('copy.error'))
    }

}
export default withTranslation('common')(withStyles(styles)(CopyField));

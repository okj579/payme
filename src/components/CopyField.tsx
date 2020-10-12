import React, {Component, ReactChildren, ReactNode, Ref} from "react";
import {Box, IconButton, InputAdornment, TextField, Tooltip} from "@material-ui/core";
import {i18n, Link, WithTranslation, withTranslation} from '../i18n';
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import {Visibility, FileCopy} from "@material-ui/icons";
import Clipboard from 'react-clipboard.js';
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";

const styles = createStyles({
    root: {
        marginBottom: 10,
        '& .MuiInputLabel-root': {
            // fontWeight: 'bold',
            color: 'inherit',
        }
    }
});

class CopyField extends Component<TextFieldProps & WithTranslation & WithStyles> {
    render() {
        const { t, tReady, i18n, classes, value, ...others } = this.props;

        const events = {
            onSuccess: this.onSuccess.bind(this),
            onError: this.onError.bind(this),
        };

        return (
            <Box className={classes.root}>
                <TextField {...others} value={value} InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title={t('copy.title')}>
                                <Clipboard component={IconButton} data-clipboard-text={value} {...events}>
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

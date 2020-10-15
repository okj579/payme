import React, {Component} from "react";
import {Box, Button, Grid, IconButton, TextField} from "@material-ui/core";
import {IPaymentMethod, keyofPaymentMethod, PaymentMethodTypes} from "../types";
import {WithTranslation, withTranslation} from '../i18n';
import CopyField from "./CopyField";
import {PageOptions} from "../pages/[page]";
import GiroCode from "./GiroCode";
import {createStyles, withStyles, WithStyles} from "@material-ui/core/styles";
import {StandardTextFieldProps} from "@material-ui/core/TextField/TextField";
import QrCode from "react-qr-code";

export interface PaymentMethodProps {
    paymentMethod?: IPaymentMethod;
    options?: PageOptions;
}

const styles = createStyles((theme) => ({
    figure: {
        textAlign: 'center',
    }
}));

class PaymentMethodDisplay extends Component<PaymentMethodProps & WithTranslation & WithStyles> {
    render() {
        let callback = `render${this.props.paymentMethod.type}`;
        if (!this[callback]) {
            throw new Error('Unknown payment method type');
        }
        return this[callback]();
    }

    BoundCopyField = ({ field, ...props }: {field: keyofPaymentMethod} & StandardTextFieldProps) => {
        const { t, paymentMethod } = this.props;
        props.value = paymentMethod[field];
        props.label = t(`paymentMethods.${paymentMethod.type}.${field}`);
        return props.value ? <CopyField {...props}/> : null;
    }

    renderBankEu() {
        const {BoundCopyField, props: { paymentMethod, options, t, classes }} = this;
        if (paymentMethod.type !== PaymentMethodTypes.BANK_EU) throw new Error('Wrong payment method type');


        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <BoundCopyField field="iban"/>
                    <BoundCopyField field="bic"/>
                    <BoundCopyField field="accountHolder"/>
                    <BoundCopyField field="bankName"/>
                </Grid>
                <Grid item xs={6}>
                    {paymentMethod.accountHolder && paymentMethod.iban && (
                        <figure className={classes.figure}>
                            <GiroCode
                                bic={paymentMethod.bic}
                                name={paymentMethod.accountHolder}
                                iban={paymentMethod.iban}
                                currency={options.currency}
                                amount={options.amount}
                                unstructuredReference={options.purpose}
                            />
                            <figcaption>{t('paymentMethods.BankEu.qr.description')}</figcaption>
                        </figure>
                    )}
                </Grid>
            </Grid>
        );
    }

    renderBankUs() {
        const {BoundCopyField, props: { paymentMethod, options, t, classes }} = this;
        if (paymentMethod.type !== PaymentMethodTypes.BANK_US) throw new Error('Wrong payment method type');

        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <BoundCopyField field="accountHolder"/>
                    <BoundCopyField field="accountNo"/>
                    <CopyField
                        label={t(`paymentMethods.${paymentMethod.type}.accountType`)}
                        value={t(`paymentMethods.${paymentMethod.type}.accountTypes.${paymentMethod.accountType}`)}
                    />
                    <BoundCopyField field="achRoutingNo"/>
                    <BoundCopyField field="wireRoutingNo"/>
                    <BoundCopyField field="bankName"/>
                </Grid>
            </Grid>
        );
    }

    renderPaypal() {
        const {BoundCopyField, props: { paymentMethod, options, t, classes }} = this;
        if (paymentMethod.type !== PaymentMethodTypes.PAYPAL) throw new Error('Wrong payment method type');

        const paramString = (obj, glue1 = '&', glue2 = '=') =>
                Object.entries(obj).filter(([k,v]) => v).map(x => x.join(glue2)).join(glue1)

        const url = 'https://www.paypal.com/cgi-bin/webscr?' + paramString({
            rm: 1,
            return: window.location.href,
            cancel_return: window.location.href,
            cmd: '_xclick', // '_donations'
            business: paymentMethod.id,
            amount: options.amount,
            currency_code: options.currency,
            item_name: options.purpose,
        })

        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <BoundCopyField field="id"/>
                    <Button component="a" href={url} variant="contained" color="primary">
                        {t(`paymentMethods.${paymentMethod.type}.buttonText`)}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <figure className={classes.figure}>
                        <QrCode value={url} size={128}/>
                        <figcaption>{t(`paymentMethods.${paymentMethod.type}.qr.description`)}</figcaption>
                    </figure>
                </Grid>
            </Grid>
        );
    }

    renderPaypalMe() {
        const { paymentMethod, options, t, classes } = this.props;
        if (paymentMethod.type !== PaymentMethodTypes.PAYPAL_ME) throw new Error('Wrong payment method type');

        const baseUrl = 'https://paypal.me/' + paymentMethod.id;
        const url = `${baseUrl}/${options.amount}${options.currency}?purpose=${options.purpose}`;

        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CopyField label={t(`paymentMethods.${paymentMethod.type}.baseUrl`)} value={baseUrl}/>
                    <Button component="a" href={url} variant="contained" color="primary">
                        {t(`paymentMethods.${paymentMethod.type}.buttonText`)}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <figure className={classes.figure}>
                        <QrCode value={url} size={128}/>
                        <figcaption>{t(`paymentMethods.${paymentMethod.type}.qr.description`)}</figcaption>
                    </figure>
                </Grid>
            </Grid>
        );
    }
}
export default withTranslation('common')(withStyles(styles)(PaymentMethodDisplay));

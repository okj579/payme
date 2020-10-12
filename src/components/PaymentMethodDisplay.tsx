import React, {Component} from "react";
import {Box, Grid, TextField} from "@material-ui/core";
import {IPaymentMethod, PaymentMethods} from "../models";
import {WithTranslation, withTranslation} from '../i18n';
import CopyField from "./CopyField";
import {PageState} from "../pages/[page]";
import GiroCode from "./GiroCode";
import {createStyles, withStyles, WithStyles} from "@material-ui/core/styles";

export interface PaymentMethodProps {
    paymentMethod?: IPaymentMethod;
    options?: PageState;
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

    renderBankEu() {
        const { paymentMethod, options, t, classes } = this.props;
        if (paymentMethod.type !== PaymentMethods.BANK_EU) throw new Error('Wrong payment method type');

        let fields = ['iban', 'bic', 'accountHolder', 'bankName']
            .filter(field => paymentMethod[field] && paymentMethod[field].length)
            .map(field => <CopyField label={t(`paymentMethods.BankEu.${field}`)} value={paymentMethod[field]} fullWidth={true}/>);

        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {fields}
                </Grid>
                <Grid item xs={6}>
                    <figure className={classes.figure}>
                        <GiroCode
                            bic={paymentMethod.bic}
                            name={paymentMethod.accountHolder}
                            iban={paymentMethod.iban}
                            currency={options.currency}
                            amount={options.value || 1}
                            reference={options.reason}
                        />
                        {/*<img src={g.svg_data_url()} alt={t('paymentMethods.BankEu.qr.alt')}/>*/}
                        <figcaption>{t('paymentMethods.BankEu.qr.description')}</figcaption>
                    </figure>
                </Grid>
            </Grid>
        );
    }

    renderBankUs() {
        const { paymentMethod, options, t } = this.props;
        if (paymentMethod.type !== PaymentMethods.BANK_US) throw new Error('Wrong payment method type');

        let fields = ['account_no', 'account_type', 'ach_routing_no', 'wire_routing_no', 'bank_name']
            .filter(field => paymentMethod[field] && paymentMethod[field].length)
            .map(field => <CopyField label={t(`paymentMethods.BankEu.${field}`)} value={paymentMethod[field]}/>);

        return <Box>{fields}</Box>;
    }

    renderPaypal() {
        const { paymentMethod, options, t } = this.props;
        if (paymentMethod.type !== PaymentMethods.PAYPAL) throw new Error('Wrong payment method type');

        let fields = ['id']
            .filter(field => paymentMethod[field] && paymentMethod[field].length)
            .map(field => <CopyField label={t(`paymentMethods.BankEu.${field}`)} value={paymentMethod[field]}/>);

        return <Box/>;
    }
}
export default withTranslation('common')(withStyles(styles)(PaymentMethodDisplay));

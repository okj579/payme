import React, {Component} from "react";
import {GetServerSideProps} from "next";
import Layout from "../components/Layout";
import {PaymentPage} from '../models';
import {IPaymentPage, PaymentMethodTypes} from '../types';
import {ParsedUrlQuery} from "querystring";
import ErrorPage, {ErrorPageProps} from './_error';
import {withRouter} from "next/router";
import {createStyles, WithStyles, withStyles} from "@material-ui/core/styles";
import {WithRouterProps} from "next/dist/client/with-router";
import {Box, MenuItem, Select, TextField} from "@material-ui/core";
import TabBox from "../components/TabBox";
import TabPanel from "../components/TabPanel";
import {withTranslation, WithTranslation} from '../i18n';
import PaymentMethodDisplay from "../components/PaymentMethodDisplay";

import {AccountBalanceOutlined as BankIcon} from "@material-ui/icons";
import PaypalIcon from "../components/icons/PaypalIcon";
import { CircleFlag } from 'react-circle-flags';
import StackedIcon from "../components/icons/StackedIcon";

interface PaymentPageParams extends ParsedUrlQuery {
    page: string,
    options: string[],
}
interface PaymentPageProps {
    slug: string,
    page: IPaymentPage,
    error?: ErrorPageProps,
    namespacesRequired?: string[]
}

export const getServerSideProps: GetServerSideProps<PaymentPageProps, PaymentPageParams> = async ({ params, res }) => {
    const slug = params.page;
    const page = await PaymentPage.findOne({ slug }).exec();

    if (!page) {
        res.statusCode = 404;
        return {props: { error: {statusCode: 404} }};
    }

    const props: PaymentPageProps = {slug, page, namespacesRequired: ['common']};
    return JSON.parse(JSON.stringify({props}));
}

export interface PageOptions {
    amount?: number,
    currency?: string,
    purpose?: string,
}

function parseQueryPathOptions(queryPath): PageOptions  {
    if (!queryPath) return {};

    const parts = queryPath.split('/').filter(x => x.length);

    let options: PageOptions = {};
    let matches = parts[0].match(/^([0-9.,]+)([A-Z]{3})?$/);
    if (matches && matches[1]) {
        options.amount = parseFloat(matches[1]);
    }
    if (matches && matches[2]) {
        options.currency = matches[2];
    }
    if (parts[1]) {
        options.purpose = parts[1];
    }

    return options;
}

const styles = createStyles({
    root: {},
    options: {
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
    }
});

const currencies = ['EUR','CHF','USD'];

class Page extends Component<PaymentPageProps & WithStyles & WithRouterProps & WithTranslation, PageOptions> {

    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            currency: 'EUR',
            purpose: null,
        }
        const options = parseQueryPathOptions(props.router.query.queryPath);
        Object.assign(this.state, options);
    }

    render() {
        const { page, error, classes, t } = this.props;
        if (error) return <ErrorPage {...error}/>;

        const paymentMethods = page.paymentMethods.sort((a,b)=> a.sort - b.sort);

        function getIcon(type: PaymentMethodTypes) {
            switch (type) {
                case PaymentMethodTypes.PAYPAL:
                case PaymentMethodTypes.PAYPAL_ME:
                    return <PaypalIcon/>;

                case PaymentMethodTypes.BANK_EU:
                    return (
                        <StackedIcon>
                            <BankIcon/>
                            <CircleFlag countryCode="european_union" height="24"/>
                        </StackedIcon>
                    );
                case PaymentMethodTypes.BANK_US:
                    return (
                        <StackedIcon>
                            <BankIcon/>
                            <CircleFlag countryCode="us" height="24"/>
                        </StackedIcon>
                    );
            }
        }

        return (
            <Layout>
                <h1>{page.title}</h1>
                <Box className={classes.options}>
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
                <TabBox orientation="vertical">
                    {paymentMethods.map((paymentMethod, index) => (
                        <TabPanel key={index} label={[
                            getIcon(paymentMethod.type),
                            t(`paymentMethods.${paymentMethod.type}.title`)
                        ]}>
                            <h2>{t(`paymentMethods.${paymentMethod.type}.title`)}</h2>
                            <PaymentMethodDisplay paymentMethod={paymentMethod} options={this.state}/>
                        </TabPanel>
                    ))}
                </TabBox>
            </Layout>
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
            }
        }
    }
}

export default withRouter(withTranslation('common')(withStyles(styles)(Page)));

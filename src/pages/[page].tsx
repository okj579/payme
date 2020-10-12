import React, { Component } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { IPaymentPage, PaymentPage } from '../models';
import { ParsedUrlQuery } from "querystring";
import ErrorPage, { ErrorPageProps } from './_error';
import { withRouter } from "next/router";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { WithRouterProps } from "next/dist/client/with-router";
import {Box, FormControl, MenuItem, Select, Tab, Tabs, TextField} from "@material-ui/core";
import TabBox from "../components/TabBox";
import TabPanel from "../components/TabPanel";
import SepaIcon from "@material-ui/icons/AccountBalance";
import {withTranslation, WithTranslation} from '../i18n';
import PaymentMethodDisplay from "../components/PaymentMethodDisplay";
import SelectInput from "@material-ui/core/Select/SelectInput";

interface PaymentPageParams extends ParsedUrlQuery {
    page: string,
    options: string[],
}
interface PaymentPageProps {
    slug: string,
    page: IPaymentPage,
    error?: ErrorPageProps
}

export const getServerSideProps: GetServerSideProps<PaymentPageProps, PaymentPageParams> = async ({ params, res }) => {
    const slug = params.page;
    const page = await PaymentPage.findOne({ slug }).exec();

    if (!page) {
        res.statusCode = 404;
        return {props: { error: {statusCode: 404} }};
    }

    const props: PaymentPageProps = {slug, page};
    return JSON.parse(JSON.stringify({props}));
}

export interface PageState {
    value?: number,
    currency?: string,
    reason?: string,
}
type QueryPathOptions = PageState;


function parseQueryPathOptions(queryPath): QueryPathOptions  {
    if (!queryPath) return {};

    const parts = queryPath.split('/').filter(x => x.length);

    let options: QueryPathOptions = {};
    let matches = parts[0].match(/^([0-9.,]+)([A-Z]{3})?$/);
    if (matches && matches[1]) {
        options.value = parseFloat(matches[1]);
    }
    if (matches && matches[2]) {
        options.currency = matches[2];
    }
    if (parts[1]) {
        options.reason = parts[1];
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
        '& .MuiInput-input': {
            textAlign: 'right'
        }
    },
});

class Page extends Component<PaymentPageProps & WithStyles & WithRouterProps & WithTranslation, PageState> {
    getInitialProps = async () => ({
      namespacesRequired: ['common'],
    })

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            currency: 'EUR',
            reason: null,
        }
        const options = parseQueryPathOptions(props.router.query.queryPath);
        Object.assign(this.state, options);
    }

    render() {
        const { page, error, classes, t } = this.props;
        if (error) return <ErrorPage {...error}/>;

        const paymentMethods = page.paymentMethods.sort((a,b)=> a.sort - b.sort);
        const currencies = ['EUR', 'CHF', 'USD'];

        return (
            <Layout>
                <h1>{page.title}</h1>
                <Box className={classes.options}>
                    <TextField
                        label={t('options.value')}
                        className={classes.optionsValue}
                        {...this.bind('value', 'number')}
                        InputProps={{
                            type: 'number',
                            inputProps: {step: 0.01},
                            endAdornment: (
                                <Select {...this.bind('currency')}>
                                    {currencies.map(currency => <MenuItem value={currency}>{currency}</MenuItem>)}
                                </Select>
                            )
                        }} />
                    <TextField
                        label={t('options.reason')}
                        {...this.bind('reason')} />
                </Box>
                <TabBox orientation="vertical">
                    {paymentMethods.map((paymentMethod, index) => (
                        <TabPanel key={index} label={t(`paymentMethods.${paymentMethod.type}.title`)}>
                            <h2>{t(`paymentMethods.${paymentMethod.type}.title`)}</h2>
                            <PaymentMethodDisplay paymentMethod={paymentMethod} options={this.state}/>
                        </TabPanel>
                    ))}
                </TabBox>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </Layout>
        );
    }

    bind(field: keyof PageState, type: 'string'|'number' = 'string') {
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

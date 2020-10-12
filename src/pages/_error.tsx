import NextErrorPage, { ErrorProps } from 'next/error';
import Layout from "../components/Layout";
import React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Head from "next/head";

const statusCodes = {
    400: 'Bad Request',
    404: 'This page could not be found',
    405: 'Method Not Allowed',
    500: 'Internal Server Error'
};

const styles = createStyles({
    error: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        borderRight: '1px solid rgba(0, 0, 0,.3)',
        margin: 0,
        marginRight: '20px',
        padding: '10px 23px 10px 0',
        fontSize: '24px',
        fontWeight: 500,
        verticalAlign: 'top',
    },
    h2: {
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: 'inherit',
        margin: 0,
        padding: 0,
    }
});


export type ErrorPageProps = {} & ErrorProps;

class ErrorPage extends NextErrorPage<ErrorPageProps & WithStyles> {
    render() {
        const { statusCode, classes } = this.props;
        const title = this.props.title || statusCodes[statusCode] || 'An unexpected error has occurred';

        return (
            <Layout noContainer centerContent>
                <Head>
                    <title>{statusCode}: {title}</title>
                </Head>
                <div className={classes.error}>
                    {statusCode && <h1 className={classes.h1}>{statusCode}</h1>}
                    <h2 className={classes.h2}>{title}.</h2>
                </div>
            </Layout>
        );
    }
}

export default withStyles(styles)(ErrorPage);

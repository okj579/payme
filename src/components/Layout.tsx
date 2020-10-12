import React, { Component, ComponentProps, ComponentState } from "react";
import Head from 'next/head';
import { AppBar, Container, CssBaseline, IconButton, Theme, Toolbar, Typography } from "@material-ui/core";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { AccountBalanceWallet as LogoIcon } from "@material-ui/icons";
import Link from "next/link";

const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

const styles = createStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    header: {
        '& a': {
            color: 'inherit',
            textDecoration: 'inherit',
        },
    },
    icon: {
        display: 'inline-block',
        marginRight: theme.spacing(2),
    },
    main: {
        flex: '1 0 auto',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 2),
    },
    centerContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
    },
}));

type LayoutProps = {
    noContainer?: boolean,
    centerContent?: boolean,
} & WithStyles;

class Layout extends Component<LayoutProps, {}> {
    render() {
        const { children, classes, noContainer, centerContent } = this.props;

        let mainClass = classes.main;
        if (centerContent) {
            mainClass += ' ' + classes.centerContent;
        }
        return (
            <div className={classes.container}>
                <Head>
                    <title>{siteTitle}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="description" content="Learn how to build a personal website using Next.js"/>
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>

                <AppBar position="relative" className={classes.header} component="header">
                    <Toolbar>
                        <Link href="/">
                            <IconButton edge="start" color="inherit">
                                <span className={classes.icon}><LogoIcon /></span>
                                <Typography variant="h6" color="inherit" noWrap>{siteTitle}</Typography>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>

                <main className={mainClass}>
                    { noContainer ? children : (
                        <Container maxWidth="md">{children}</Container>
                    ) }
                </main>

                <footer className={classes.footer}>
                    <Typography variant="subtitle1" align="right" color="textSecondary" component="p">
                        <Link href="/impressum"><a>Impressum</a></Link>
                    </Typography>
                </footer>
            </div>
        );
    }
}
export default withStyles(styles)(Layout);

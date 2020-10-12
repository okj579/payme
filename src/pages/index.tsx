import React from "react";
import Layout from '../components/Layout'
import { Button, Container, Grid, Theme, Typography, makeStyles } from "@material-ui/core";
import Link from "next/link";
import ButtonLink from "../components/ButtonLink";
import {GetServerSideProps} from "next";
import {PaymentPage} from "../models";
import Waterline from 'waterline';

const useStyles = makeStyles((theme: Theme) => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
}));


export const getServerSideProps: GetServerSideProps = async ({  res }) => {


    let props = {};
    return JSON.parse(JSON.stringify({props}));
}


export default function Home() {
    const classes = useStyles();
    return (
        <Layout>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Album layout
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                <Button variant="contained" color="primary">Main call to action</Button>
                            </Grid>
                            <Grid item>
                                <Button component={ButtonLink} href="/:page/:queryPath*" as="/test/10EUR" variant="outlined" color="primary">Test-Seite</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </Layout>
    )
}

import React from 'react';
import { Box, Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import { Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { object, mixed, number } from 'yup'
import { FormikStepper } from './FormikStepper';
import { FormikStep } from './utils';

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: '#FA8BFF',
        backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)'
    },
    card: {
        backgroundColor: '#FA8BFF',
        backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)'
    }
}))
export default function Home() {
    const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));
    const classes = useStyles();

    return (
        <Grid className={classes.container} container justify="center" style={{marginTop: 80}} >
            <Grid item lg={6} md={6} sm={12} xs={12}>
        <Card >
            <CardContent>
                <FormikStepper 
                initialValues={{
                    firstName: '',
                    lastName: '',
                    millionaire: false,
                    money: 0,
                    description: '',
                }} onSubmit={ async (values) => {
                    await sleep(3000);
                    console.log('values', values);
                }}>
                        <FormikStep label="Personel Data">
                            <Box paddingBottom={2}>
                                <Field fullWidth
                                
                                name="firstName" 
                                component={ TextField } 
                                label="First Name" />
                            </Box>
                            <Box paddingBottom={2}>
                                <Field fullWidth 
                                name="lastName" 
                                component={ TextField } 
                                label="Last Name" />
                            </Box>
                            <Box paddingBottom={2}>
                                <Field 
                                name="millionaire" 
                                type="checkbox" 
                                component={ CheckboxWithLabel } 
                                Label={{ label: 'I am a millionaire' }} />
                            </Box>
                        </FormikStep>
                        <FormikStep
                            label="Bank Accounts"
                            validationSchema={object({
                                money: mixed().when('millionaire',{
                                    is: true,
                                    then: number()
                                    .required()
                                    .min (1_000_000, 
                                        'Because you said you are a millionaire you need to have 1 million'),
                                    otherwise: number().required(),
                                }),
                            })}
                        >
                            <Box paddingBottom={2}>
                                <Field fullWidth 
                                name="money" 
                                type="number" 
                                component={ TextField } 
                                label="All the money I have" />
                            </Box>
                        </FormikStep>
                        <FormikStep label="More Info">
                        <Box paddingBottom={2}>
                            <Field fullWidth 
                            name="description" 
                            component={ TextField } 
                            label="Description" />
                        </Box>
                        </FormikStep>
                </FormikStepper>
            </CardContent>
        </Card>
        </Grid>

        </Grid>
    )
}


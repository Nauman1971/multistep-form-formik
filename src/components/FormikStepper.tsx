import { Button, CircularProgress, Grid, makeStyles, Step, StepLabel, Stepper } from "@material-ui/core";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useState } from "react";
import { FormikStepProps } from "./utils";

const useStyles = makeStyles(() => ({
    card: {
        backgroundColor: '#FA8BFF',
        backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)'
    },
}));

export function FormikStepper({children, ...props}: FormikConfig<FormikValues>) {
    const classes = useStyles();
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step]
    const [completed, setCompleted] = useState(false);


    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    return (
            <Formik
                {...props}
                validationSchema={ currentChild.props.validationSchema }
                onSubmit={async (values, helpers) => {
                    if(isLastStep()) {
                        await props.onSubmit(values, helpers);
                        setCompleted(true);
                        helpers.resetForm();
                        setStep(0);
                    }
                    else {
                        setStep(s => s + 1);
                        helpers.setTouched({});
                    }
                } }
            >
                {({ isSubmitting }) => (
                    <Form 
                    autoComplete="off">
                        <Stepper className={classes.card} alternativeLabel 
                        activeStep={step}>
                            {childrenArray.map((child, idx) => (
                                <Step key={idx} completed={ step > idx || completed }>
                                    { child.props.label }
                                <StepLabel>{ child.props.label }</StepLabel>
                                </Step>
                            ))}

                        </Stepper>
                    { currentChild }
                    <Grid container spacing={2}>
                    { step > 0 ? 
                    <Grid item>
                    <Button disabled={ isSubmitting } color="primary" 
                    variant="contained" 
                    onClick={ () => setStep(s => s - 1) }>
                        Back</Button></Grid>: null 
                    }
                    <Grid item>
                    <Button 
                    startIcon={ isSubmitting ? 
                    <CircularProgress size="1rem" />
                    : null }
                    disabled={ isSubmitting } 
                    color="primary" 
                    variant="contained" 
                    type="submit">
                        { isSubmitting ? 'Submitting' : isLastStep() ? 'Submit': 'Next' }
                    </Button></Grid>
                    </Grid>
                    </Form>
                )}
            </Formik>
    )
}


import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header } from 'semantic-ui-react';
import ErrorMessages from '../../app/common/form/ErrorMessages';
import TextInput from '../../app/common/form/TextInput';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators({
    email: isRequired('email'),
    username: isRequired('username'),
    displayName: isRequired('displayName'),
    password: isRequired('password'),
})

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {register} = rootStore.userStore;
    return (
        <FinalForm onSubmit={(values: IUserFormValues) => register(values).catch(error => ({[FORM_ERROR] : error}))} 
            validate={validate}
            render={({handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
            <Form onSubmit={handleSubmit} error>
                <Header as='h2' content='Sign up to reactivites' color='teal' textAlign='center'/>
                <Field name='email' component={TextInput} placeholder='Email'/>
                <Field name='username' component={TextInput} placeholder='User name'/>
                <Field name='displayName' component={TextInput} placeholder='Display Name'/>
                <Field name='password' component={TextInput} placeholder='Password' type='password'/>
                {submitError && !dirtySinceLastSubmit && <ErrorMessages error={submitError}/>} <br/>
                <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine} loading={submitting} color='teal' content='Register' fluid/>
            </Form>
        )}>

        </FinalForm>
    )
}

export default RegisterForm

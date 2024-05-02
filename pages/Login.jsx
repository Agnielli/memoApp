import React from "react";
import { Formik, useField } from "formik";
import { StyleSheet, View, Button } from "react-native";
import StyledTextInput from "../components/StyledTextInput";
import StyledText from "../components/StyledText";
import {loginValidationSchema} from "../validationSchemas/login";

const initialValues = {
  email: '',
  password: '',
}

const styles = StyleSheet.create({
  form: {
    margin: 12
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: -5,
  }
})

const FormikInputValue = ({ name, ...props }) => {
  const [ field, meta, helpers ] = useField(name)
  return (
    <>
      <StyledTextInput 
        error={meta.error}
        value={field.value}
        onChangeText={value => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  )
}

export default function LogInPage () {
    return (
        <Formik 
          validationSchema={loginValidationSchema}
          initialValues={initialValues}
          onSubmit={values => console.log(values)}
        >
          {({ handleSubmit }) => {
            return (
              <View style={styles.form}> 
                <FormikInputValue 
                  placeholder='E-mail'
                  name='email'
                />
                <FormikInputValue 
                  placeholder='Password'
                  name='password'
                  secureTextEntry
                />
                <Button onPress={handleSubmit} title='Log In' />
              </View>
            )
          }}
        </Formik>
    )
}
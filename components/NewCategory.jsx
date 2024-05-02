import React, {useState} from "react";
import { Formik, useField } from "formik";
import { StyleSheet, View, Button } from "react-native";
import { useNavigate } from 'react-router-native';
import StyledTextInput from "../components/StyledTextInput";
import StyledText from "../components/StyledText";
import {categoryValidationSchema} from "../validationSchemas/category";
import axios from "axios";

const initialValues = {
  categoryName: '',
  itemTitle: '',
  itemText: '',
}

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

export default function AddCategory () {
  const [validateOnChange, setValidateOnChange] = useState(false);
  const lineHeight = 20;
  const totalHeight = lineHeight * 6

  const navigate = useNavigate()

  const insertData = async (values) => {
    axios
      .post('http://localhost:3000/text/newcategory', values)
      .then(response => {
        navigate('/')
      })
      .catch(error => {
        console.error('Error al realizar la solicitud HTTP:', error);
      })
  }

    return (
        <Formik 
          validationSchema={categoryValidationSchema}
          initialValues={initialValues}
          onSubmit={values => {
            console.log(values);
            insertData(values)
          }}
          validateOnChange={validateOnChange}
        >
          {({ handleSubmit }) => {
            return (
              <View style={styles.form}> 
                <FormikInputValue 
                  placeholder='Category name'
                  name='categoryName'
                />
                <FormikInputValue 
                  placeholder='Text title'
                  name='itemTitle'
                />
                <FormikInputValue 
                  placeholder='Text'
                  name='itemText'
                  multiline
                  numberOfLines={4}
                  style={{ height: totalHeight }}
                />
                <Button onPress={()=>{handleSubmit(); setValidateOnChange(true)}} title='Add' />
              </View>
            )
          }}
        </Formik>
    )
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
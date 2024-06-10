import React, { useEffect, useState } from "react";
import { Formik, useField } from "formik";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import { useNavigate, useParams } from 'react-router-native';
import StyledTextInput from "./StyledTextInput";
import StyledText from "./StyledText";
import {itemValidationSchema} from "../validationSchemas/item";
import axios from "axios";
import { Accept } from "../images/accept";

const initialValues = {
  itemTitle: '',
}

const FormikInputValue = ({ name, ...props }) => {
  const [ field, meta, helpers ] = useField(name)
 

  return (
    <>
      <TextInput 
        error={meta.error}
        value={field.value}
        onChangeText={value => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  )
}

export default function UpdateTitle ({ editing, setEditing }) {
  const { itemId } = useParams();
  const [updateItem, setUpdateItem] = useState([]);
  const [validateOnChange, setValidateOnChange] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/text/edit/${itemId}`)
    .then(response => {
      setUpdateItem(response.data)
    })
    .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const insertData = async (values) => {
    axios
      .put(`http://localhost:3000/text/edit/${itemId}`, values)
      .then(response => {
        setEditing(false)
      })
      .catch(error => {
        console.error('Error al realizar la solicitud HTTP:', error);
      })
  }

    return (
        <Formik 
          validationSchema={itemValidationSchema}
          initialValues={{
            itemTitle: updateItem.name || '',
          }}
          onSubmit={values => {
            console.log(values);
            insertData(values)
          }}
          validateOnChange={validateOnChange}
        >
          {({ handleSubmit, setFieldValue }) => {
            useEffect(() => {
              setFieldValue('itemTitle', updateItem.name);
            }, [updateItem]);
            
            return (
              <View style={styles.form}> 
                <FormikInputValue 
                  placeholder='Text title'
                  name='itemTitle'
                  
                />

                <View onPress={()=>{handleSubmit(); setValidateOnChange(true)}} style={styles.imgAccept}>
                  <Accept />
                </View>
              </View>
            )
          }}
        </Formik>
    )
}

const styles = StyleSheet.create({
  form: {
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: -5,
  },
  imgAccept: {
    marginBottom: -4,
    marginStart: 5,
    width: 24, 
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
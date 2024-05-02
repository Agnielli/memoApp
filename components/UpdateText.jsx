import React, { useEffect, useState } from "react";
import { Formik, useField } from "formik";
import { StyleSheet, View, Button } from "react-native";
import { useNavigate, useParams } from 'react-router-native';
import StyledTextInput from "../components/StyledTextInput";
import StyledText from "../components/StyledText";
import {itemValidationSchema} from "../validationSchemas/item";
import axios from "axios";

const initialValues = {
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

export default function UpdateOneItem () {
  const { itemId } = useParams();
  console.log("itemId: ", itemId);
  const [updateItem, setUpdateItem] = useState([]);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const lineHeight = 20;
  const totalHeight = lineHeight * 6

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
        navigate('/')
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
            itemText: updateItem.text || '',
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
              setFieldValue('itemText', updateItem.text);
            }, [updateItem]);
            
            return (
              <View style={styles.form}> 
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
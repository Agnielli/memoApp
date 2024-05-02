import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import { useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-native";
import axios from 'axios';
import StyledText from './StyledText';
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import useCreateNote from "../hooks/useCreateNote";
import Record from "./Record";
import ModalDeleteText from './ModalDeleteText';
import homophoneGroups from '../homofoneOrShame';

const screenHeight = Dimensions.get('window').height;
const containerHeight = 0.85 * screenHeight;

const ItemDetail = () => {
  const [speechText, setSpeechText] = useState("");
  const [matchingCategory, setMatchingCategory] = useState(null);
  const [matchingItem, setMatchingItem] = useState(null);
  const [proved, setProved] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [borderColor, setBorderColor] = useState("black");
  const [testValidated, setTestValidated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const { isSuccess } = useCreateNote();
  const { categoryId, itemId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/text');
        setMatchingCategory(response.data);
        const categoryIds = response.data.map(category => category._id);
        const itemsIds = response.data.map(category => {
          return category.items.map(item => item._id);
        });
        console.log("itemsIds en itemDetail: ", itemsIds);
        
        if (categoryId && itemId && response.data) {
          const category = response.data.find(cat => cat._id === categoryId);
          
          if (category) {
            const item = category.items.find(item => item._id === itemId);
            setMatchingItem(item);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };  
    fetchData();
  }, [categoryId, itemId]);
  console.log("matchingItem en ItemDetail: ", matchingItem);

  useEffect(() => {
    if (isSuccess) {
      setSpeechText("");
      queryClient.invalidateQueries(["notes"]);
    }
  }, [isSuccess]);

  const handleDelete = (itemId) => {
      axios
      .delete(`http://localhost:3000/text/delete/cat/${itemId}`)
      .then((res)=>{
        navigate('/')
        setModalVisible(false);
      })
      .catch((err)=>{})
  };

  const test = (matchingItem?.text.trim() === speechText.trim()) && proved;
  // Función para encontrar un homófono correspondiente a una palabra
  const findHomophoneForWord = (word) => {
    for (const group of homophoneGroups) {
      const matchingHomophone = group.find(homophone => homophone === word);
      if (matchingHomophone) {
        return matchingHomophone;
      }
    }
    return null;
  };
  // Función para comparar una palabra con sus homófonos
const compareWordWithHomophones = (word) => {
  const homophoneMatch = findHomophoneForWord(word);
  return homophoneMatch ? homophoneMatch : word;
};

// Evento que se ejecuta al recibir resultados parciales del reconocimiento de voz
const onSpeechPartialResults = (partialResults) => {
  // Dividir el texto en palabras
  const words = partialResults.split(' ');
  
  // Comparar cada palabra con sus homófonos
  const correctedWords = words.map(compareWordWithHomophones);
  
  // Unir las palabras corregidas para formar el texto corregido
  const correctedText = correctedWords.join(' ');
}

  useEffect(() => {
    if (proved) {
      setTestValidated(true);
    }
    if (isPressed && speechText !== ("")) {
      setBorderColor(test ? "#007AFF" : "red");
    } else {
      setBorderColor("black");
    }
  }, [proved, matchingItem, borderColor, isPressed, test, speechText]);
  
  return (
    <View style={styles.margin}>
      {matchingCategory && matchingItem && (
        <> 
          <StyledText style={styles.marginBottom}>
            {matchingItem.name}
          </StyledText>
          <TouchableOpacity 
               
                style={[
                  styles.text,
                  { 
                    borderColor: borderColor,
                    borderWidth: speechText !== ("") ? 3 : 1 
                  }
                ]} >
            {isPressed || isPressing ? (
              <TextInput
                multiline
                numberOfLines={6}
                value={speechText}
                maxLength={700}
                
              />
            ) : (
              <View>
                <StyledText>{matchingItem.text}</StyledText>
              </View>
            )}
          </TouchableOpacity>
            {testValidated && (
              test ? (
                <Text style={[styles.label2, { color: "#007AFF" }]}>👏🎊Done Hurra!!🎉🥳</Text>
              ) : (
                <Text style={[styles.label2, { color: "red" }]}>😱😳Keep Practicing🫣🤓</Text>
              )
            )}    

          <View style={styles.containerButton}>
            <Button
              title="Test your knowledge"
              color="black"
            />
            
            <View style={styles.voiceContainer}>
              <Record
                onSpeechStart={() => {
                  setSpeechText("");
                  setIsPressing(true);
                  setTestValidated(false)
                  setBorderColor('black')
                }}
                // onSpeechEnd={(value) => {
                //   setSpeechText(value[0]);
                //   setProved(true);
                //   setIsPressed(true);
                //   setIsPressing(false);
                // }}
                onSpeechPartialResults={(value) => {
                  setSpeechText(value[0]);
                  setProved(true);
                  setIsPressed(true);
                  setIsPressing(false);
                }}
              />
            </View>

            <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setItemIdToDelete(itemId);
              }}
            >
              <View style={styles.imgBin}>
                <AntDesign name="delete" size={24} color="red" />
              </View>
            </TouchableOpacity>
                         
              <TouchableOpacity style={styles.button} onPress={()=> navigate(`/${itemId}/update`)}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={()=> navigate("/")}>
                  <AntDesign name="back" size={24} color="black"/>
              </TouchableOpacity>
            </View>
            <View>
                <ModalDeleteText 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                itemIdToDelete={itemIdToDelete}
                handleDelete={handleDelete}
              />
            </View>
          </View>
          
        </>
      )}
     
                
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: '#FFFBDA',
    height: containerHeight,
    flexGrow: 1,
  },
  marginBottom: {
    marginBottom: 20,
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
  containerButton: {
    flex: 1,
    marginBottom: -90,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    textAlign: 'justify',
    width: "90%",
    padding: 15,
    borderColor: "black",
    borderWidth: 1,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#FFBB70',
  },
  imgBack: {
    paddingBottom: 10,
    width: 30, 
    height: 30,
    marginBottom: 10,
  },
  container: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  voiceContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  label2: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 40,
    marginBottom: -70,
  },
   
})


export default ItemDetail;

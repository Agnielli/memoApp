import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  Button, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView
} from "react-native";
import axios from "axios";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import { Garbage } from "../images/garbage";
import { Edit } from "../images/edit-pen";
import { Accept } from "../images/accept";
import ModalDelete from "./ModalDelete";
import { AntDesign } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const containerWidth = 0.9 * screenWidth;
const screenHeight = Dimensions.get('window').height;
const containerHeight = 0.85 * screenHeight;
const itemWidth = screenWidth * 0.75;

const aspectRatio = 940 / 530;

const logoWidth = screenWidth * 0.6; // 80% del ancho de la pantalla
const logoHeight = logoWidth / aspectRatio;

const NestedListComponent = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryNameMap, setCategoryNameMap] = useState({});
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = () => {
      axios.get('http://localhost:3000/text')
      .then(response => {
        setCategories(response.data);
        const nameMap = {};
        response.data.forEach(category => {
          nameMap[category._id] = category.name;
        });
        setCategoryNameMap(nameMap);
      })
      .catch(error => console.error('Error fetching categories:', error))
    };

    fetchCategories();
  }, [fetchTrigger]);


  const categoryIds = categories.map(category => category._id);

  const insertData = async (categoryId) => {
    const values = { name: categoryNameMap[categoryId] };
    axios
      .put(`http://localhost:3000/text/edit/cat/${categoryId}`, values)
      .then(response => {
        setEditingCategory(null);
        setFetchTrigger(prev => !prev);
      })
      .catch(error => {
        console.error('Error al realizar la solicitud HTTP:', error);
      })
  }

  const handleDelete = async (categoryId) => {
    axios
      .delete(`http://localhost:3000/text/delete/${categoryId}`)
      .then(response => {
        setModalVisible(false);
        setFetchTrigger(prev => !prev);
      })
      .catch(error => {
        console.error('Error delete category:', error);
      })
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={theme.container}>
    <View style={theme.center}>
      <Image
        source={require('../images/logoMemoApp.png')}
        style={styles.logo}
      />
    </View>
      {categories.map((category) => (
        <View key={category._id} style={styles.categories}>
        {editingCategory === category._id ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1.4 }}>
              <TextInput
              style={theme.category}
              value={categoryNameMap[category._id]}
              onChangeText={(text) => {
                setCategoryNameMap(prevState => ({
                  ...prevState,
                  [category._id]: text
                }));
              }}
              onSubmitEditing={() => {
                insertData(category._id);
              }}
              />
              <TouchableOpacity
                  onPress={() => {
                    insertData(category._id);
                  }}
                >
              <View style={styles.imgAccept}>
                <Accept />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={theme.category}>{category.name}
            <TouchableOpacity
              onPress={() => {
                setCategoryName(category.name);
                setEditingCategory(category._id);
              }}>
              <View style={styles.imgPencil}>
                <Edit />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true)
                setCategoryIdToDelete(category._id);}
                }>
              <View style={styles.imgBin}>
                <Garbage />
              </View>
            </TouchableOpacity>            
            <View>
              <ModalDelete 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                categoryIdToDelete={categoryIdToDelete}
                handleDelete={handleDelete}
              />

          </View>
          </Text>
          
          )}
          {category.items.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.item}
              onPress={() => {
                navigate(`/itemDetail/${category._id}/${item._id}`);
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.button} onPress={() => navigate(`/${category._id}/newItem`)}>
              <AntDesign name="addfile" size={19} color="#333333" /> 
              <Text style={{color:"#333333"}}>Add File</Text> 
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => navigate('/newCategory')}>
        <AntDesign name="addfolder" size={19} color="#333333" />  
        <Text style={styles.end}>Add Category</Text>
      </TouchableOpacity>
      
    </ScrollView>
    </SafeAreaView>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFBDA',
    height: containerHeight,
  },
  logo: {
    width: logoWidth,
    height: logoHeight,
    marginTop: -12,
  },
  categories: {
    marginTop: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: containerWidth,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: '#333333',
    backgroundColor: "#FFEC9E",
  },
    imgBin: {
    marginBottom: -4,
    width: 24, 
    height: 24,
    justifyContent: 'center',
  },
    imgPencil: {
    marginBottom: -4,
    marginStart: 5,
    width: 24, 
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgAccept: {
    marginBottom: -4,
    marginStart: 5,
    width: 24, 
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 7,
    flexDirection: 'column',
    alignItems: 'center',
  },
  end: {
    marginBottom: 15,
    color: "#333333",
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#333333",
    backgroundColor: "#FFBB70",
    color: '#333333',
    marginVertical: 5,
    width: itemWidth,
  },
})

export default NestedListComponent;
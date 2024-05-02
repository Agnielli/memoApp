import { useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
            
            const ModalDeleteText =({modalVisible, setModalVisible, itemIdToDelete, handleDelete})=>{
            return (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Are you sure you want to delete category?</Text>
        
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    style={styles.openButton}
                    onPress={()=>handleDelete(itemIdToDelete)}
                  >
                    <Text style={styles.textStyle}>Yes</Text>
                  </TouchableOpacity>
        
                  <TouchableOpacity
                    style={styles.openButton}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>No</Text>
                  </TouchableOpacity></View>
                </View>
              </View>
            </Modal>
            ) 
          };

          const styles = StyleSheet.create({
            centeredView: {
              width: '80%',
              height: '25%',
              justifyContent: "center",
              alignItems: "center",
              marginTop: '80%',
              marginLeft: '10%',
              marginRight: '10%',
              backgroundColor: "#FFFBDA",
              borderRadius: 20,
              padding: 35,
              borderWidth: 1,
              borderColor: "black",
            },
            modalView: {
              backgroundColor: "#FFFBDA",
              color: "black",
              borderRadius: 20,
              shadowColor: "#000",
            },
            openButton: {
              backgroundColor: "#EC9456",
              borderRadius: 10,
              padding: 8,
              elevation: 2
            },
            textStyle: {
              color: "black",
              fontWeight: "bold",
              textAlign: "center"
            },
            modalText: {
              color: "black",
              marginBottom: 15,
              textAlign: "center"
            },
            buttonContainer: {
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          })

          export default ModalDeleteText;
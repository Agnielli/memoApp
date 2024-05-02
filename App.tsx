import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, StyleSheet, Text, Dimensions } from "react-native";
import { NativeRouter, Route, Routes } from 'react-router-native'; 
import { QueryClient, QueryClientProvider } from "react-query";
import "react-native-reanimated";
import NestedListComponent from "./components/NestedListComponents";
import AppBar from './components/AppBar'
import LogInPage from "./pages/Login";
import ItemDetail from "./components/ItemDetail";
import NewCategory from "./components/NewCategory";
import NewText from "./components/NewText";
import UpdateText from "./components/UpdateText";

const queryClient = new QueryClient();
const screenHeight = Dimensions.get('window').height;
const containerHeight = 0.85 * screenHeight;

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <NativeRouter>
        <SafeAreaView style={styles.container}>
          <Routes>
            <Route path="/" element={<NestedListComponent />} />
            <Route path="/signin" element={<LogInPage />} />
            <Route path="/itemDetail/:categoryId/:itemId" element={<ItemDetail />} />
            <Route path="/newCategory" element={<NewCategory />} />
            <Route path="/:categoryId/newItem" element={<NewText />} />
            <Route path="/:itemId/update" element={<UpdateText />} />
          </Routes> 
          <View style={styles.appBar}>
            <Text><AppBar /></Text>
          </View>
          </SafeAreaView>
        </NativeRouter>
      </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBDA',
  },
  appBar: {
    alignItems: 'center',   
  },
})
import React from "react";
import { View, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLocation, useNavigate } from "react-router-native";
import theme from "../theme";
import Constants from "expo-constants";

const { width } = Dimensions.get('window');

const AppBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigate('/')}>
              <AntDesign name="addfolder" size={19}  color={pathname === '/' ? 'white' : '#333333'} />
              <Text style={[styles.end, {color: pathname === '/' ? 'white' : '#333333'}]}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('/signin')}>
              <Ionicons name="people-circle-sharp" size={19} marginTop={-2}  color={pathname === '/signin' ? 'white' : '#333333'} />
              <Text style={[styles.end, {color: pathname === '/signin' ? 'white' : '#333333'}]}>SignIn</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
)};

export default AppBar;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.appBar.primary,
    paddingTop: Constants.statusBarHeight - 40,
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: 15,
    paddingHorizontal: 25,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * (17/100),
  },
  text: {
    color: theme.appBar.textSecondary,
    paddingHorizontal: 5,
  },
  end: {
    marginBottom: 15,
    color: "#333333",
    fontWeight: "bold",
  },
  button: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
});

// const AppBarTap = ({ children, to }) => {
//   const { pathname } = useLocation();
//   const active = pathname === to;

//   const texStyles = [
//     styles.text,
//     active && styles.active
//   ]

//   return (
//     <Link to={to} component={TouchableOpacity} activeOpacity={1}>
//       <StyledText fontWeight="bold" style={texStyles}>
//         {children}
//       </StyledText>
//     </Link>
//   );
// };
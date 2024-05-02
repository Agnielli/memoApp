import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from "react-native";
import StyledText from "./StyledText";
import Constants from "expo-constants";
import theme from "../theme";
import { Link, useLocation } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBar.primary,
    paddingTop: Constants.statusBarHeight - 40,
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: 15,
  },
  contentContainer: {
    flexDirection: 'row',
    marginHorizontal: 100,
  },
  text: {
    color: theme.appBar.textSecondary,
    paddingHorizontal: 20,
  },
  active: {
    color: theme.appBar.textPrimary
  }
});


const AppBarTap = ({ children, to }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  // const backgroundColor = active ? 'transparent' : 'black';

  const texStyles = [
    styles.text,
    active && styles.active
  ]

  return (
    <Link to={to} component={TouchableOpacity} activeOpacity={1}>
      <StyledText fontWeight="bold" style={texStyles}>
        {children}
      </StyledText>
    </Link>
  );
};

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <View style={styles.contentContainer}>
          <AppBarTap to="/">Categories</AppBarTap>
          <AppBarTap to="/signin">Sign In</AppBarTap>
        </View>
    </ScrollView>
  </View>
)};

export default AppBar;

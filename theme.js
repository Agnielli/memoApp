import { Platform } from 'react-native'

const theme = {
  appBar: {
    primary:'#ED9455',
    textSecondary: '#586069',
    textPrimary: '#fff'
  },
  colors: {
    textPrimary : '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#f5f5f5'
  },
  fontSizes: {
    body: 14,
    subheading: 16
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System'
      })
  },
  fontWeights: {
    normal: '400',
    bold: '700'
  },
  center: {
    alignItems: 'center',
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    color: '#333333'
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginVertical: 5
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    backgroundColor: '#FFFBDA',
    flexGrow: 1,
  },
}

export default theme
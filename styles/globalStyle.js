import { Dimensions, StyleSheet } from 'react-native';

const win = Dimensions.get('window');
const globalStyle = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    backgroundColor: '#009688',
    flex: 1,
    padding: 20,
    margin: 10,
  },
  container: {
    display: 'flex',
    marginHorizontal: 20,
    marginTop: 10,
  },
  homeStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 5,
    // marginVertical: 8,
    // marginHorizontal: 16,
    flex: 1,

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  menuContainer: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  menuLogo: {
    height: win.width / 2,
    maxHeight: '300px',
    maxWidth: '300px',
    width: win.width / 2,
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  nameButton: {
    backgroundColor: 'green',
  },
  tabViewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
  },
});

export default globalStyle;

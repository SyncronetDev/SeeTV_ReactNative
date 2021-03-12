import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  liveStreamButton: {
    backgroundColor: '#A60402',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 15,
  },
  textButton: {
    color: 'white',
    fontSize: 25,
  },
  input: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    fontSize: 23,
    fontWeight: '600',
  },
  flatList: {
    marginHorizontal: 15,
  },
  welcomeText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 25,
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: '700',
    marginLeft: 20,
    marginVertical: 25,
  },
});

export default styles;

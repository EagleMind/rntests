export default Logout = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    alert(e);
  }
};

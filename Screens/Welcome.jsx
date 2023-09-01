import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Home from './Home'

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={{backgroundColor: "#D2E9E9", width: 350, height: 350, alignItems: "center", justifyContent: "center", flexDirection: "row", borderRadius: 175}}>
          <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: "#E3F4F4", height: 300, width: 300, borderRadius: 150}}>
            <Image 
              source={require("../assets/Kitchen.jpg")}
              style={{resizeMode: "contain",height: 250, width: 250, borderRadius: 125}}
            />
          </View>
          </Animated.View>
        <Text style={[tw`text-center mt-4`, styles.title]}>Foody</Text>
        <Text style={[tw`text-center mt-1 -mb-10`, styles.design]}>DESIGN YOUR MEAL</Text>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F3D3E",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#100F0F",
    fontWeight: "900",
    fontSize: 58,
  },
  design: {
    fontSize: 20,
    color: "#D2E9E9"
  }
})
import { Image, SafeAreaView, Text, StyleSheet, TextInput, View, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import tw from 'tailwind-react-native-classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeals } from '../redux/mealsSlice';
import { FlatGrid } from 'react-native-super-grid';
import { fetchByCategory } from '../redux/categorySlice';
import { useNavigation } from '@react-navigation/native';
import Details from './Details';

const Home = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.meals.data.categories);
  const loading = useSelector((state) => state.meals.loading);
  const error = useSelector((state) => state.meals.error);

  const categories2 = useSelector((state) => state.categories.categories.meals);
  const loading2 = useSelector((state) => state.categories.loading);
  const error2 = useSelector((state) => state.categories.error);

  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [id, selectId] = useState('');
  
  useEffect(() => {
    dispatch(fetchMeals());
  }, []);

  useEffect(() => {
    dispatch(fetchByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectedMeal = (id) => {
    selectId(id);
    navigation.navigate('Details');
  };

  if (error) {
    alert("Error1 geting meals")
  }

  if (error2) {
    alert("Error2 geting meals")
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{borderRadius: 19, height: 40, width: 40, backgroundColor: "#337CCF", alignItems: "center", justifyContent: "center"}}>
          <Icon
            name="user"
            size={32}
            color="black"
            />
        </View>
        <View>
          <Icon 
            name='bell'
            size={36}
            />
        </View>
      </View>

      
      <View style={[tw`mt-5 h-14`, styles.inputBar]}>
        <TextInput style={[tw`h-10`, styles.input]} label="Search for meal"  />
        <Icon name='search' size={32} color='white' strokewidth={2}/>
      </View>
      <View style={{marginHorizontal: 10, marginTop: 10}}>
      {loading === false ? <ActivityIndicator size={32} color='#0000ff' /> : (
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategorySelect(item.strCategory)}>
            <View style={{ margin: 4, padding: 8, borderRadius: "50%", backgroundColor: "transparent" }}>
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
                />
            </View>
            <Text style={{textAlign: "center"}}>{item.strCategory}</Text>
          </TouchableOpacity>
        )}
        />
      )}
    </View>

    <ScrollView showsVerticalScrollIndicator={false} style={[tw`mt-4 rounded-md`]}>
      <View>

      {loading2 ? (
        <ActivityIndicator size={40} color="#0000ff" />
        ) : (
          <FlatGrid
          itemDimension={130}
          style={styles.gridView}          
          data={categories2}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectedMeal(item.idMeal)}>
              <View style={[tw`rounded-lg bg-blue-200`, styles.card]}>
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={{ width: "100%", height: 120, borderRadius: 10}}
                  />
                <Text style={[tw`m-1 text-lg font-semibold`]} numberOfLines={1}>{item.strMeal}</Text>
              </View>
            </TouchableOpacity>
          )}
          />
          )}
      </View>
    </ScrollView>


    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginHorizontal: wp(5),
    marginTop: 10,
  },
  inputBar: {
    marginHorizontal: wp(4.5),
    backgroundColor: "#0F3D3E",
    borderRadius: wp(5.5),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    marginBottom: 5
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: wp(4)
  },
  view: {
    width: wp(90),
    height: hp(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(45),
  },
  gridView: {
    marginHorizontal: 10,
  },
})
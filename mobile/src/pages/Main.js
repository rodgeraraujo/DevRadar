import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    async function loadInitialPostiion() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadInitialPostiion();

    Keyboard.addListener('keyboardDidShow', ()=>setKeyboardShown(true));
    Keyboard.addListener('keyboardDidHide', ()=>setKeyboardShown(false));
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -6.890072, longitude: -38.57384 }}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://avatars0.githubusercontent.com/u/20842252?v=4"
            }}
          />
          <Callout
            onPress={() => {
              // navegação
              navigation.navigate("Profile", {
                github_username: "rodgeraraujo"
              });
            }}
          >
            <View style={styles.callout}>
              <Text style={styles.devName}>Rogério Araújo</Text>
              <Text style={styles.devBio}>
                Analysis and Systems Development Student at @ifpb-cajazeiras.
                Co-founder of @pyro-code.
              </Text>
              <Text style={styles.devTechs}>VueJS, NodeJS, JavaScript</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color={'#FFF'}/>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderColor: "#FFF"
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      zIndex: 5,
      flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
        width: 4,
        height: 4,
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8E4DFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  }
});

export default Main;

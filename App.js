import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Provider as PaperProvider, DefaultTheme, Appbar, Button, Card, Text, List } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Customize the theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#ffffff',
    text: '#000000',
  },
};

/* --------------------------
   WARDROBE SCREEN
-------------------------- */
function WardrobeScreen({
  clothingItems,
  pickImage,
  selectedImage,
  selectedCategory,
  setSelectedCategory,
  addClothingItem,
}) {
  // Use Paper's List.Accordion for dropdowns
  const [expandedTops, setExpandedTops] = useState(false);
  const [expandedBottoms, setExpandedBottoms] = useState(false);
  const [expandedShoes, setExpandedShoes] = useState(false);

  // Render each clothing item as an image
  const renderClothingItem = ({ item }) => (
    <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Wardrobe" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={{ marginVertical: 10, width: '100%' }}>
          <Card.Title title="Upload Your Clothing" />
          <Card.Content>
            <Text>Select an image and choose a category below.</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={pickImage}>
              Upload Image
            </Button>
          </Card.Actions>
        </Card>

        {selectedImage && (
          <Card style={{ marginVertical: 10, width: '100%' }}>
            <Card.Cover source={{ uri: selectedImage }} />
            <Card.Content>
              <Text>Select Category:</Text>
              <View style={styles.categoryContainer}>
                <Button
                  mode={selectedCategory === 'tops' ? 'contained' : 'outlined'}
                  onPress={() => setSelectedCategory('tops')}
                  style={styles.categoryButton}
                >
                  Tops
                </Button>
                <Button
                  mode={selectedCategory === 'bottoms' ? 'contained' : 'outlined'}
                  onPress={() => setSelectedCategory('bottoms')}
                  style={styles.categoryButton}
                >
                  Bottoms
                </Button>
                <Button
                  mode={selectedCategory === 'shoes' ? 'contained' : 'outlined'}
                  onPress={() => setSelectedCategory('shoes')}
                  style={styles.categoryButton}
                >
                  Shoes
                </Button>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={addClothingItem}>
                Add to Wardrobe
              </Button>
            </Card.Actions>
          </Card>
        )}

        <List.Section>
          <List.Accordion
            title="Tops"
            left={props => <List.Icon {...props} icon="tshirt-crew" />}
            expanded={expandedTops}
            onPress={() => setExpandedTops(!expandedTops)}
          >
            <FlatList
              horizontal
              data={clothingItems.filter(item => item.category === 'tops')}
              renderItem={renderClothingItem}
              keyExtractor={item => item.id}
              style={styles.list}
            />
          </List.Accordion>

          <List.Accordion
            title="Bottoms"
            left={props => <List.Icon {...props} icon="hanger" />}
            expanded={expandedBottoms}
            onPress={() => setExpandedBottoms(!expandedBottoms)}
          >
            <FlatList
              horizontal
              data={clothingItems.filter(item => item.category === 'bottoms')}
              renderItem={renderClothingItem}
              keyExtractor={item => item.id}
              style={styles.list}
            />
          </List.Accordion>

          <List.Accordion
            title="Shoes"
            left={props => <List.Icon {...props} icon="shoe-print" />}
            expanded={expandedShoes}
            onPress={() => setExpandedShoes(!expandedShoes)}
          >
            <FlatList
              horizontal
              data={clothingItems.filter(item => item.category === 'shoes')}
              renderItem={renderClothingItem}
              keyExtractor={item => item.id}
              style={styles.list}
            />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </>
  );
}

/* --------------------------
   CANVAS SCREEN
-------------------------- */
function CanvasScreen({ clothingItems }) {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedShoes, setSelectedShoes] = useState(null);

  const [expandedTops, setExpandedTops] = useState(false);
  const [expandedBottoms, setExpandedBottoms] = useState(false);
  const [expandedShoes, setExpandedShoes] = useState(false);

  // Shuffle outfit logic
  const shuffleOutfit = () => {
    const tops = clothingItems.filter(item => item.category === 'tops');
    const bottoms = clothingItems.filter(item => item.category === 'bottoms');
    const shoes = clothingItems.filter(item => item.category === 'shoes');

    if (tops.length > 0)
      setSelectedTop(tops[Math.floor(Math.random() * tops.length)]);
    if (bottoms.length > 0)
      setSelectedBottom(bottoms[Math.floor(Math.random() * bottoms.length)]);
    if (shoes.length > 0)
      setSelectedShoes(shoes[Math.floor(Math.random() * shoes.length)]);
  };

  // Render each clothing item in the Canvas
  const renderClothingItem = ({ item }, onSelect, selectedItem) => (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <Image
        source={{ uri: item.imageUri }}
        style={[
          styles.canvasItemImage,
          selectedItem?.id === item.id && styles.selectedCanvasItem,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Canvas" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.canvasContainer}>
        {/* Display current outfit at the top */}
        <Text style={styles.canvasTitle}>Your Canvas Outfit:</Text>
        <View style={styles.canvasOutfitContainer}>
          {selectedTop && (
            <Image source={{ uri: selectedTop.imageUri }} style={styles.canvasOutfitImage} />
          )}
          {selectedBottom && (
            <Image source={{ uri: selectedBottom.imageUri }} style={styles.canvasOutfitImage} />
          )}
          {selectedShoes && (
            <Image source={{ uri: selectedShoes.imageUri }} style={styles.canvasOutfitImage} />
          )}
        </View>

        <Button mode="contained" onPress={shuffleOutfit} style={{ marginVertical: 10 }}>
          Shuffle Outfit
        </Button>

        <List.Section>
          <List.Accordion
            title="Select a Top"
            left={props => <List.Icon {...props} icon="tshirt-crew" />}
            expanded={expandedTops}
            onPress={() => setExpandedTops(!expandedTops)}
          >
            <FlatList
              horizontal
              data={clothingItems.filter(item => item.category === 'tops')}
              renderItem={({ item }) => renderClothingItem({ item }, setSelectedTop, selectedTop)}
              keyExtractor={item => item.id}
              style={styles.canvasList}
            />
          </List.Accordion>

          <List.Accordion
            title="Select a Bottom"
            left={props => <List.Icon {...props} icon="hanger" />}
            expanded={expandedBottoms}
            onPress={() => setExpandedBottoms(!expandedBottoms)}
          >
            <FlatList
              horizontal
              data={clothingItems.filter(item => item.category === 'bottoms')}
              renderItem={({ item }) => renderClothingItem({ item }, setSelectedBottom, selectedBottom)}
              keyExtractor={item => item.id}
              style={styles.canvasList}
            />
          </List.Accordion>

          <List.Accordion
            title="Select Shoes"
            left={props => <List.Icon {...props} icon="shoe-print" />}
            expanded={expandedShoes}
            onPress={() => setExpandedShoes(!expandedShoes)}
          >
            <FlatList
              horizontal
              data={clothingItems.filter(item => item.category === 'shoes')}
              renderItem={({ item }) => renderClothingItem({ item }, setSelectedShoes, selectedShoes)}
              keyExtractor={item => item.id}
              style={styles.canvasList}
            />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </>
  );
}

/* --------------------------
   MAIN APP (Shared State & Tabs)
-------------------------- */
export default function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Function to add a clothing item
  const addClothingItem = async () => {
    if (!selectedImage || !selectedCategory) {
      alert('Please select an image and a category.');
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      category: selectedCategory,
      imageUri: selectedImage,
    };
    setClothingItems([...clothingItems, newItem]);
    setSelectedImage(null);
    setSelectedCategory(null);
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: '#fff' },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Wardrobe"
            options={{
              tabBarLabel: 'Wardrobe',
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('./assets/WardrobeButton.png')}
                  style={{ width: size, height: size, tintColor: color }}
                />
              ),
            }}
          >
            {() => (
              <WardrobeScreen
                clothingItems={clothingItems}
                pickImage={pickImage}
                selectedImage={selectedImage}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                addClothingItem={addClothingItem}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Canvas"
            options={{
              tabBarLabel: 'Canvas',
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('./assets/CanvasButton.png')}
                  style={{ width: size, height: size, tintColor: color }}
                />
              ),
            }}
          >
            {() => <CanvasScreen clothingItems={clothingItems} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  canvasContainer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  previewContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  categoryButton: {
    marginHorizontal: 5,
  },
  categorySelected: {},
  dropdownSection: {
    width: '100%',
    marginVertical: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  dropdownArrow: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  canvasSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  canvasList: {
    marginVertical: 10,
  },
  canvasItemImage: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedCanvasItem: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  canvasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  canvasOutfitContainer: {
    flexDirection: 'column', // Stack vertically
    marginTop: 10,
    alignItems: 'center',
  },
  canvasOutfitImage: {
    width: 120,
    height: 120,
    marginVertical: 5,
    borderRadius: 5,
  },
});

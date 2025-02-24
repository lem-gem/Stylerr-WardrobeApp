# Wardrobe App Stylerr

Stylerr is a mobile application built with React Native (Expo) that allows users to upload clothing images, assign them to categories (Tops, Bottoms, Shoes), and create outfits by either manually selecting items or shuffling to generate a random combination. The app features two main screens accessed via bottom tab navigation: **Wardrobe** and **Canvas**.

## Features

- **Image Upload:** Select images from your device gallery using Expo's Image Picker.
- **Categorization:** Assign images to predefined categories (Tops, Bottoms, Shoes).
- **Dynamic Dropdowns:** View clothing items within expandable sections.
- **Outfit Creation:** Manually select clothing items or use the shuffle feature to create an outfit.
- **Professional UI:** Enhanced using React Native Paper with custom themes and polished components.
- **Custom Tab Icons:** Bottom tab navigation displays custom icons (exported from Figma).

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (You can run commands using `npx expo` without installing it globally)
- A smartphone with Expo Go installed or an emulator (iOS/Android)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/lem-gem/Stylerr-WardrobeApp
   cd Stylerr

2. **Install Dependencies:**

bash

npm install
npx expo install expo-image-picker expo-image-manipulator
npm install @react-navigation/native @react-navigation/bottom-tabs
expo install react-native-screens react-native-safe-area-context
npm install react-native-paper
expo install react-native-vector-icons

3. **Start the app with**

npx expo start -c

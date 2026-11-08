# Car Model Explorer

Car Model Explorer is a React Native app built with Expo that lets you browse car makes and their models using the free [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/). You can search for a car brand, filter its models by vehicle type and model year, and then open a model to see its details and which recent years it was sold.

## How to run

```bash
npm install
npx expo start
```

Then scan the QR code with the Expo Go app on your phone.

## Screens

1. **Makes** – a searchable list of every make that builds passenger cars, grouped A–Z, with shortcut chips for popular brands.
2. **Make** – shows the models for one make. Filter chips let you pick the vehicle type (car, truck, SUV, etc.) and the model year.
3. **Model** – shows details about one model and a grid of the last 12 model years showing which years it was offered.

## API calls

All API code is in `src/api/vpic.ts`. No API key is needed.

| Endpoint | Used for |
| --- | --- |
| `GetMakesForVehicleType/car` | List of car makes on the home screen |
| `GetVehicleTypesForMake/{make}` | Vehicle type filter chips on the make screen |
| `GetModelsForMakeIdYear/makeId/{id}/modelyear/{year}/vehicletype/{type}` | Models list on the make screen, and checking which years a model was sold on the model screen |

## Project structure

```
src/
  app/            screens (Expo Router)
    index.tsx         Makes screen
    make/[makeId].tsx Make screen
    model/[modelId].tsx Model screen
  api/            fetch calls to the vPIC API
  components/     reusable UI components
  constants/      Material 3 theme colors and spacing
  hooks/          useApiData hook (data, loading, error, reload)
  utils/          small helper functions
```

## Human Interface Guidelines

For this app I followed Google's Material Design 3 guidelines. I used React Native Paper because its components are built to match the M3 spec, so things like the top app bar, search bar, chips, cards, and lists already look and act the way Material says they should. I made my own color scheme from one blue seed color using the Material Theme Builder and gave it both a light and a dark version, so the app follows the phone's dark mode setting. I also stuck to the M3 type scale (headline, title, body, label) instead of picking random font sizes, and used spacing in steps of 4 and 8 so everything lines up.

I tried to use each component for what Material says it's for. Every screen has a top app bar with a title and a back arrow, and the home screen uses the large top app bar. Filter chips are used to pick the vehicle type and model year, and the selected chip fills in so it's easy to tell which one is active. The makes list uses list items with an avatar on the left and a chevron on the right so the user knows the row can be tapped, and the list is split into A–Z sections with subheaders. On the model screen, the year chips show a check for years the model was sold and are greyed out for years it wasn't, so the info can be read quickly without extra text.

Material also says the app should always show what is going on, so every screen that loads data shows a progress indicator with a short message like "Loading car makes...". If a request fails there is an error message and a "Try again" button instead of a blank screen, and if a search or filter has no results there is an empty state that tells the user what to try next. Touch targets are at least 48dp tall, and I added accessibility labels to buttons and list items so screen readers can describe them.

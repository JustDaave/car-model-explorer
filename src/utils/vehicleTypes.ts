// Small helpers for showing vPIC vehicle types in the UI

// Picks a Material icon that matches each vehicle type
export function getVehicleTypeIcon(typeName: string) {
  if (typeName.includes("Passenger Car")) return "car-side";
  if (typeName.includes("MPV")) return "car-estate";
  if (typeName.includes("Truck")) return "truck";
  if (typeName.includes("Motorcycle")) return "motorbike";
  if (typeName.includes("Bus")) return "bus";
  if (typeName.includes("Trailer")) return "truck-trailer";
  return "car";
}

// Makes the long API name shorter so it fits on a chip
export function getShortTypeName(typeName: string) {
  if (typeName.includes("MPV")) return "SUV / MPV";
  return typeName;
}

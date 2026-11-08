// All of the calls to the NHTSA vPIC API live in this file.
// Docs: https://vpic.nhtsa.dot.gov/api/

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

export type Make = {
  MakeId: number;
  MakeName: string;
};

export type VehicleType = {
  VehicleTypeId: number;
  VehicleTypeName: string;
};

export type Model = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

// Every vPIC endpoint returns { Count, Message, Results: [...] }
// so this helper does the fetch and just gives back the Results array.
async function getResults<T>(path: string): Promise<T[]> {
  const response = await fetch(`${BASE_URL}${path}?format=json`);

  if (!response.ok) {
    throw new Error(`Request failed (status ${response.status})`);
  }

  const json = await response.json();
  return json.Results as T[];
}

// API call #1: every make that builds passenger cars
export async function getCarMakes(): Promise<Make[]> {
  const makes = await getResults<Make>("/GetMakesForVehicleType/car");
  return makes.sort((a, b) => a.MakeName.localeCompare(b.MakeName));
}

// API call #2: the vehicle types a make builds (car, truck, MPV, ...)
export async function getVehicleTypesForMake(makeName: string): Promise<VehicleType[]> {
  const types = await getResults<VehicleType & { MakeName: string }>(
    `/GetVehicleTypesForMake/${encodeURIComponent(makeName)}`
  );

  // The search is "contains", so searching HONDA also returns other companies
  // like "SUNDIRO HONDA MOTORCYCLE". Only keep exact matches.
  const exactMatches = types.filter(
    (type) => type.MakeName.toUpperCase() === makeName.toUpperCase()
  );

  // Remove any duplicate types and put Passenger Car first since this is a car app
  const uniqueTypes = exactMatches.filter(
    (type, index, list) =>
      list.findIndex((t) => t.VehicleTypeId === type.VehicleTypeId) === index
  );

  return uniqueTypes.sort((a, b) => {
    if (a.VehicleTypeName === "Passenger Car") return -1;
    if (b.VehicleTypeName === "Passenger Car") return 1;
    return a.VehicleTypeName.localeCompare(b.VehicleTypeName);
  });
}

// API call #3: the models a make sold in a year for one vehicle type
export async function getModelsForMakeYear(
  makeId: number,
  year: number,
  vehicleType: string
): Promise<Model[]> {
  const models = await getResults<Model>(
    `/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}/vehicletype/${encodeURIComponent(vehicleType)}`
  );
  return models.sort((a, b) => a.Model_Name.localeCompare(b.Model_Name));
}

// Uses call #3 once per year to find which years a model was offered.
// The requests run at the same time with Promise.all so it stays fast.
export async function getYearsForModel(
  makeId: number,
  modelId: number,
  vehicleType: string,
  years: number[]
): Promise<number[]> {
  const modelsByYear = await Promise.all(
    years.map((year) => getModelsForMakeYear(makeId, year, vehicleType))
  );

  return years.filter((year, index) =>
    modelsByYear[index].some((model) => model.Model_ID === modelId)
  );
}

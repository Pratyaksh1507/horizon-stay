import {
  getMockCabins,
  createEditMockCabin,
  deleteMockCabin,
} from "../data/mockData";

export async function getCabins() {
  return getMockCabins();
}

export async function createEditCabin(newCabin, id) {
  return createEditMockCabin(newCabin, id);
}

export async function deleteCabin(id) {
  return deleteMockCabin(id);
}
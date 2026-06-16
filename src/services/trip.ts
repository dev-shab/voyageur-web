import { API_BASE_URL } from "@/lib/constants";
import type { Trip } from "@/lib/types";
import axios from "axios";

export const createTrip = async ({
  title,
  destination,
  country,
  startDate,
  endDate,
  category,
  status,
  budget,
  notes,
}: Trip) => {
  try {
    const { data: response } = await axios.post(`${API_BASE_URL}/trips`, {
      title,
      destination,
      country,
      startDate,
      endDate,
      category,
      status,
      budget,
      notes,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

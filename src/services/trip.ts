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
    const { data: image } = await axios.get(
      `https://api.unsplash.com/photos/random?query=${destination}&orientation=squarish`,
      {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      },
    );
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
      imageUrl: image.urls.thumb,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrips = async () => {
  try {
    const { data: response } = await axios.get(`${API_BASE_URL}/trips`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

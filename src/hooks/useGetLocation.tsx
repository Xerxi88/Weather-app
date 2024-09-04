import { useEffect, useState } from "react";
import { User } from "../types";
import useGetIP from "./useGetIP";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3a426db377mshd8bbe90792eddacp18f917jsnd53b33d89dbe",
  },
};

const useGetLocation = () => {
  const URL = "https://ip-geo-location.p.rapidapi.com/ip/";

  const [location, setLocation] = useState<User | null>(null);

  const { ipAddress } = useGetIP();

  useEffect(() => {
    if (ipAddress) {
      fetch(`${URL}${ipAddress}?filter=city`, options)
        .then((res) => res.json())
        .then((res) => setLocation(res.city.name))
        .catch((error) => console.error("Error fetching location:", error));
    }
  }, [ipAddress]);

  return { location };
};

export default useGetLocation;

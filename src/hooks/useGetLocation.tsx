import { useEffect, useState } from "react";
import { User } from "../types";
import useGetIP from "./useGetIP";

const useGetLocation = () => {
  const URL = "http://ipwho.is/";

  const [location, setLocation] = useState<User | null>(null);

  const { ipAddress } = useGetIP();

  console.log(ipAddress);
  console.log(location);

  useEffect(() => {
    if (ipAddress) {
      fetch(`${URL}${ipAddress}`)
        .then((res) => res.json())
        .then((res) => setLocation(res))
        .catch((error) => console.error("Error fetching location:", error));
    }
  }, [ipAddress]);

  return { location };
};

export default useGetLocation;

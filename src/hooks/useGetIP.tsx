import { useEffect, useState } from "react";

const useGetIP = () => {
  const [ipAddress, setIpAddress] = useState<string>("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIpAddress(data.ip))
      .catch((error) => console.error("Error fetching IP address:", error));
  }, []);

  return { ipAddress };
};

export default useGetIP;

import axios from "axios";
import { useState, useEffect } from "react";

function useFetch() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Corrected to camelCase
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // Reset error state before new request
    try {
      const response = await axios.get("http://10.13.8.25:8080/api/product"); // Corrected 'response'
      setData(response.data);
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Corrected the syntax
  }, []); // Empty dependency array means this runs once on mount

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { error, isLoading, data, refetch }; // Corrected 'isLoading'
}

export default useFetch;

import { useState, useEffect } from "react";
import { mockOrders } from "./mockOrders";

const fetchOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      // Simulate an API call with mock data
      setTimeout(() => {
        setData(mockOrders);
        setLoading(false);
      }, 1000); // Simulate network delay
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default fetchOrders;

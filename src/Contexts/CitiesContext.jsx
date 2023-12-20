import { createContext, useContext, useEffect, useState } from "react";

export const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const getCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        // console.log(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCities();
  }, []);
  //
  const getCity = async (id) => {
    if (Number(id) === currentCity.id) return;
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      console.log(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const AddCity = async (newCity) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((prev) => [...prev, data]);
      console.log(data);
    } catch (error) {
      alert("There's an Error in Adding City");
    } finally {
      setIsLoading(false);
    }
  };
  const DeleteCity = async (cityId) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== cityId));
    } catch (error) {
      alert("There's an Error in Deleting City");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, AddCity, DeleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context was used outside the cities Provider");
  return context;
};

import {
  useState,
  useEffect
} from "react";


export const useContacts = () => {
  // eslint-disable-next-line 
  const [data, setData] = useState([]);
  // eslint-disable-next-line 
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line 
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://randomuser.me/api/?results=200");
        const { results, error } = await res.json();
        if (error) {
          throw new Error(error);
        }
        setData(results);
        setIsError(false)
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);
  return {
    data,
    isLoading,
    isError
  };
};
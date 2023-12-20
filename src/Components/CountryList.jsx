import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../Contexts/CitiesContext";

const CountryList = () => {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={`Add your First City By Clicking  on a City on The Map`}
      />
    );

  //  V1
  const countries = new Map();
  const newArr = cities.map((city) => {
    if (!countries.has(city.id)) {
      countries.set(city.country, {
        country: city.country,
        emoji: city.emoji,
      });
    } else {
      countries.delete(city.id);
    }
    return 1;
  });
  // console.log(countries);
  // console.log(Array.from(countries).map(([key, value]) => console.log(value)));

  //  Another Solution V2

  // const countries = cities.reduce((arr, city) => {
  //   // console.log(arr);
  //   if (!arr.map((el) => el.country).includes(city.country)) {
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   } else {
  //     return arr;
  //   }
  // }, []);
  return (
    <>
      <ul className={styles.countryList}>
        {Array.from(countries).map(([key, country]) => (
          <CountryItem key={key} country={country} />
        ))}
      </ul>
    </>
  );
};

export default CountryList;

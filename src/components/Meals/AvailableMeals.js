import React, { useEffect, useState } from "react";
import Card from "../UI/Card";

// css
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-cart-5bfac-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setIsError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Loading.......</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.mealsError}>
        <p>{isError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => <MealItem key={meal.id} {...meal} />);
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

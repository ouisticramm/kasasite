import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/sass/Pages/Apartmentrental.scss";
import Collapse from "../components/Collapse";
import Carousel from "../components/Carousel";
import Apartment_Head from "../components/Apartment_Head";

function Apartmentrental() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/logements.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const apartment = data.find((card) => card.id === id);
        if (!apartment) {
          throw new Error("Apartment not found");
        }
        setSelectedCards(apartment);
      } catch (error) {
        console.error("Error fetching apartment data:", error);
        setError(error.message);
        navigate("/error"); // Redirige vers la page d'erreur
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchApartmentData();
    } else {
      setError("No apartment ID provided");
      setIsLoading(false);
      navigate("/error"); // Redirige vers la page d'erreur
    }
  }, [id, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedCards) return <div>No apartment data found</div>;

  return (
    <div className="Apartment-rental">
      <Carousel pictures={selectedCards.pictures} />
      <Apartment_Head selectedCards={selectedCards} />
      <div className="ADarea">
        <Collapse
          title="Description"
          content={selectedCards.description}
          className="collapse-apartment"
        />
        <Collapse
          title="Équipements"
          content={
            <ul>
              {selectedCards.equipments.map((equipment, index) => (
                <li key={index}>{equipment}</li>
              ))}
            </ul>
          }
          className="collapse-apartment"
        />
      </div>
    </div>
  );
}

export default Apartmentrental;

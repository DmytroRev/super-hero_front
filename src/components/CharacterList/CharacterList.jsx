import { useEffect, useState } from "react";
import { getAllCharacters } from "../../api";
import { Link } from "react-router-dom";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getAllCharacters();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Superhero Marvel and DC</h1>

      {Array.isArray(characters) ? (
        characters.map((character) => (
          <Link key={character._id} to={`/character/${character._id}`}>
            <div style={{ cursor: "pointer" }}>
              <img
                src={character.avatar}
                alt={character.nickname}
                width="100"
              />
              <h3>{character.nickname}</h3>
            </div>
          </Link>
        ))
      ) : (
        <p>No characters found</p>
      )}
    </div>
  );
};

export default CharacterList;

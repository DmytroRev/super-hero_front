import { useEffect, useState } from 'react';
import { getAllCharacters } from '../../api';
import { Link } from 'react-router-dom';
import css from './CharacterList.module.css';
import CreateCharacter from '../CreateCharacter/CreateCharacter';
export default function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getAllCharacters();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div>
      <header className={css.headerList}>
        <h1>Superhero Marvel and DC</h1>
      </header>
      <div>
        <CreateCharacter />
      </div>
      <div className={css.container}>
        {Array.isArray(characters) ? (
          characters.map(character => (
            <Link key={character._id} to={`/character/${character._id}`}>
              <div className={css.containerCard}>
                <img
                  src={character.avatarUrl}
                  alt={character.nickname}
                  className={css.avatar}
                />
                <h3 className={css.nickname}>{character.nickname}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p>No characters found</p>
        )}
      </div>
    </div>
  );
}

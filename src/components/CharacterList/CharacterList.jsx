import { useEffect, useState } from 'react';
import { getAllCharacters } from '../../api';
import { Link } from 'react-router-dom';
import css from './CharacterList.module.css';
import CreateCharacter from '../CreateCharacter/CreateCharacter';
import { defaultAvatarUrl } from '../CharacterDetails/CharacterDedails';
import { MdExpandMore } from 'react-icons/md';

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const data = await getAllCharacters(page, ITEMS_PER_PAGE);

        // Если полученные данные пусты, значит больше нечего подгружать
        if (data.length < ITEMS_PER_PAGE) {
          setHasMore(false);
        }

        setCharacters(prevCharacters => {
          const uniqueCharacters = data.filter(
            newCharacter =>
              !prevCharacters.some(
                prevCharacter => prevCharacter._id === newCharacter._id
              )
          );
          return [...prevCharacters, ...uniqueCharacters];
        });
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const loadMoreCharacters = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <header className={css.headerList}>
        <h1>Superhero Marvel and DC</h1>
      </header>
      <div>
        <CreateCharacter />
      </div>
      <div className={css.container}>
        {Array.isArray(characters) && characters.length > 0 ? (
          characters.map(character => (
            <Link
              key={character._id}
              to={`/character/${character._id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className={css.containerCard}>
                <img
                  src={character.avatarUrl || defaultAvatarUrl}
                  alt={character.nickname || 'Default Avatar'}
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
      <div className={css.loadMoreContainer}>
        {hasMore && (
          <button
            onClick={loadMoreCharacters}
            disabled={isLoading}
            className={css.loadMoreButton}
          >
            Load more <MdExpandMore className={css.loadMoreIcon} />
          </button>
        )}
      </div>
    </div>
  );
}

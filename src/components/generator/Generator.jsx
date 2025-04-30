import React, { useState, useEffect } from "react";
import "./Generator.css";

function MemeGenerator() {
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clickSound = new Audio("/sound/vine_boom.mp3");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMemes(data.data.memes);
          setCurrentMeme(
            data.data.memes[Math.floor(Math.random() * data.data.memes.length)]
          );
          setLoading(false);
        } else {
          throw new Error("Failed to fetch memes");
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getNewMeme = () => {
    if (memes.length > 0) {
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      setCurrentMeme(randomMeme);

      clickSound.play();
    }
  };

  if (loading) return <div>Loading memes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="generator">
      <h1>Meme Generator!!!</h1>

      {currentMeme && (
        <div>
          <img src={currentMeme.url} alt={currentMeme.name} width="300" />
          <p>{currentMeme.name}</p>
        </div>
      )}

      <button className="new-meme-btn" onClick={getNewMeme}>
        New Meme!
      </button>
    </div>
  );
}

export default MemeGenerator;

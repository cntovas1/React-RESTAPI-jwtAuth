// src/components/Game.js
import React, { useEffect, useState } from 'react';

const WordGame=()=> {
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [GameID, setGameID] = useState(1);
  const [totalScore, setTotalScore] = useState([]);
  const [game_name, setGame_name] = useState('wordgame');
  const userId = localStorage.getItem("userId");

  const fetchWords = async () => {
    const response = await fetch('http://localhost:5000/api/v1/words');
    const jsonData = await response.json();
    shuffleArray(jsonData);
    const selectedWords = jsonData.slice(0, 4);
    setWords(selectedWords);
  };

  
  const shuffleArray = (array) => {
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  
  const handleGuess = async (selectedWord)=>{
    const is_correct = selectedWord.is_real;
    if(is_correct){
      setScore(score+1);
      try{
        const response_score = await fetch(`http://localhost:5000/api/v1/score/${userId}/${GameID}`, {
          mode:'cors',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response_score.status === 404){
          await fetch(`http://localhost:5000/api/v1/score/${userId}/${GameID}`, {
            mode:'cors',
            method: 'POST',
            body: [JSON.stringify({game_name})],
            headers:{
              'Content-Type': 'application/json'
            },
          });
        };

        
          const total = await fetch (`http://localhost:5000/api/v1/score/${userId}/${GameID}`);
          const total_score1 = await total.json();
          setTotalScore(total_score1);
        
        
          
      } catch(error){
        console.error('Error updating score:', error);
      }
    }
    

    fetchWords();
  };


  useEffect(() => {
    
    fetchWords();
    
  },[]);



  return (
    <div>
      <h2>Game</h2>
      <ul>
        {words.map(word => (
          <li key={word.id} onClick={() => handleGuess(word)}>
            {word.word}
          </li>
        ))}
        <h2>Score: {score}</h2>
        {totalScore.map(total_score =>(
          <h2>Total Score: {total_score.score}</h2>
        ))}
       
      </ul>
      
    </div>
  );
}

export default WordGame;

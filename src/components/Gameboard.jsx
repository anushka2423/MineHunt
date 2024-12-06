import { useEffect, useState } from "react";
import bomb from "../assets/bomb.png";
import gem from "../assets/gem.png";

const Gameboard = ({
    bombCount,
    handleGameOver,
    isGameStarted,
  }) => {
    // Initialize the game state and bomb positions
    const grid = Array(25).fill("hidden");
    const[gameState, setGameState] = useState(grid)
    const[bombPositions, setBombPositions] = useState(new Set());

    // Set up the game whenever it starts or bombCount changes
    useEffect(() => {
      if(isGameStarted) initializeGame();
    }, [isGameStarted, bombCount]);

    // Function to initialize the game
    const initializeGame = () => {
      // Reset the gameboard to hidden state
      const newGameState = Array(25).fill("hidden"); 
      const newBombPosition = new Set();

      // Randomly generate bomb positions
      while(newBombPosition.size < bombCount) {
        newBombPosition.add(Math.floor(Math.random()*24));
      }

      // Update state with the new game setup
      setGameState(newGameState);
      setBombPositions(newBombPosition);
    };

    // Handle click events on a grid cell
    const handleCircleClick = (index) => {
      // Ignore clicks if the cell is already revealed or the game hasn't started
      if(gameState[index] !== "hidden" || !isGameStarted) return;

      const newGameState = [...gameState];
      if(bombPositions.has(index)) {
        // Reveal bomb and end the game if a bomb is clicked
        newGameState[index] = "Bomb";
        setGameState(newGameState);
        handleGameOver();

      }else {
        // Reveal a gem and update the click count
        newGameState[index] = "gem";
        setGameState(newGameState);
      }
    };

    // Reveal all bomb positions when the game ends
    useEffect(() => {
      if(!isGameStarted) {
        const finalGameState = [...gameState];
        bombPositions.forEach((pos) => {
          finalGameState[pos] = "bomb";
        });
        setGameState(finalGameState);
      }
    }, [isGameStarted]);

    // Render the gameboard with interactive grid cells
    return (
      <div className="bg-[#323738] py-4 px-6 rounded-xl grid grid-cols-5 gap-2">
        {
          gameState.map((state, index) => (
            <div
              key={index}
              className={`w-16 h-16 flex items-center justify-center aspect-square rounded-xl cursor-pointer lg:h-20 lg:w-20 ${
                state === "hidden" ? "bg-[#444c4d]" : "bg-transparent"
              }`}
              onClick={() => handleCircleClick(index)}
            >
              {state === "gem" && (
                <img
                  src={gem}
                  alt="Gem"
                  className="w-12 h-12 lg:w-16 lg:h-16 animate-reveal"
                />
              )}
              {state === "bomb" && (
                <img
                  src={bomb}
                  alt="Bomb"
                  className= "absolute w-12 h-12 lg:w-16 lg:h-16 animate-pop-back"
                />
              )}
            </div>
          ))
        }
      </div>
    );
}

export default Gameboard;
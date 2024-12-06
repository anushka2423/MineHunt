import { useState, useCallback } from 'react';
import './App.css';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import Sidebar from './components/Sidebar';
import backgroundImage from './assets/background.png';

function App() {
    // State hooks to manage the game data
    const [bombCount, setBombCount] = useState("2");
    const [betAmount, setBetAmount] = useState("0");
    const [gameOver, setGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);

    console.log(bombCount);

    // Handle game over, reset or keep winnings based on home run
    const handleGameOver = useCallback(() => {
        setGameOver(true);
        setIsGameStarted(false);
    }, []);

    // Start the game with validation for bomb count and bet amount
    const handleStartGame = () => {
        const bombCountNum = parseInt(bombCount);
        const betAmountNum = parseInt(betAmount);

        if (isNaN(bombCountNum) || bombCount < 1 || bombCount >= 24) {
            alert("Please enter a valid number of bomb circles (1-23)");
            return;
        }

        if (isNaN(betAmountNum) || betAmountNum <= 0) {
            alert("Please enter a valid betting amount (greater than 0).");
            return;
        }

        // Reset game state and start a new game
        setIsGameStarted(true);
        setGameOver(false);
    };

    // Handle changes to bomb count
    const handleBombCountChange = (value) => {
        setBombCount(value);
    };

    // Handle changes to bet amount
    const handleBetAmountChange = (e) => {
        setBetAmount(e.target.value);
    };

    return (
        <div className="h-screen w-screen bg-gray-900 flex flex-col">
            <div className="flex flex-grow items-center justify-center">
                {/* Sidebar and Game Board */}
                <div className="flex w-full h-[100%] bg-gray-800 rounded-lg shadow-lg">
                    <Sidebar
                        bombCount={bombCount}
                        handleBetAmountChange={handleBetAmountChange}
                        handleBombCountChange={handleBombCountChange}
                        isGameStarted={isGameStarted}
                        handleStartGame={handleStartGame}
                    />
                    <div
                        className="w-3/4 max-w-[100%]"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="text-white bg-[#323738] w-3/4 rounded py-2 text-lg mb-12">
                                {!gameOver ? "Game result will be displayed" : "Game Over!!"}
                            </div>
                            <Gameboard
                                bombCount={parseInt(bombCount)}
                                handleGameOver={handleGameOver}
                                isGameStarted={isGameStarted}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;

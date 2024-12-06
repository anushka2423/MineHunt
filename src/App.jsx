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
    const [currentWinnings, setCurrentWinnings] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    console.log(bombCount);

    // Calculate probability of selecting a safe tile
    const calculateProbability = useCallback(
        (safeClicks) => {
            const remainingSafeTiles = 24 - parseInt(bombCount) - safeClicks;
            const remainingTotalTiles = 24 - safeClicks;
            return remainingSafeTiles / remainingTotalTiles;
        },
        [bombCount]
    );

    // Calculate payout based on safe clicks and probability
    const calculatePayout = useCallback(
        (safeClicks) => {
            let payout = parseInt(betAmount);
            for (let i = 0; i < safeClicks; i++) {
                payout /= calculateProbability(i);
            }
            return payout;
        },
        [betAmount, calculateProbability]
    );

    // Handle a safe click and update current winnings
    const handleSafeClick = useCallback((newClickCount) => {
        setClickCount(newClickCount);
        const newWinnings = calculatePayout(newClickCount);
        setCurrentWinnings(newWinnings);
    }, [calculatePayout]);

    // Handle game over, reset or keep winnings based on home run
    const handleGameOver = useCallback((isHomeRun) => {
        setGameOver(true);
        if (!isHomeRun) {
            setCurrentWinnings(0);
        }
        setIsGameStarted(false);
    }, []);

    // Start the game with validation for bomb count and bet amount
    const handleStartGame = () => {
        const bombCountNum = parseInt(bombCount, 10);
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
        setCurrentWinnings(0);
        setClickCount(0);
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
                        betAmount={betAmount}
                        handleBetAmountChange={handleBetAmountChange}
                        isGameStarted={isGameStarted}
                        bombCount={bombCount}
                        handleBombCountChange={handleBombCountChange}
                        gameOver={gameOver}
                        currentWinnings={currentWinnings}
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
                                {"Game result will be displayed"}
                            </div>
                            <Gameboard
                                bombCount={parseInt(bombCount)}
                                handleSafeClick={handleSafeClick}
                                handleGameOver={handleGameOver}
                                isGameStarted={isGameStarted}
                                clickCount={clickCount}
                                setClickCount={setClickCount}
                                currentWinnings={currentWinnings}
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

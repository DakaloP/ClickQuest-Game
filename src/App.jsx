import { useState,useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Shop from './Components/Shop';
import GameArea from './Components/GameArea';
import { use } from 'react';

function App() {
const [coins, setCoins] = useState(0);
const [coinsPerClick, setCoinsPerClick] = useState(1);
const [upgradeCost, setUpgradeCost] = useState(10);
const [achievements, setAchievements] = useState("");
const [message, setMessage] = useState("");

const level = coinsPerClick;
const teleportMode = coins >=5;

useEffect(() => {
  const saveData =JSON.parse(localStorage.getItem('clickquest-save'))
  if (saveData) {
    setCoins(saveData.coins);
    setCoinsPerClick (saveData.coinsPerClick || 1);
    setUpgradeCost (saveData.upgradeCost || 10);
  }
  }, 
  []);//End of useEffect

// useEffect for saving everything to database
useEffect(() => {localStorage.setItem("clickquest",JSON.stringify({coins,coinsPerClick,upgradeCost}))},
[coins,coinsPerClick,upgradeCost]);

 //user feedback 
 useEffect(() => {
  if (coins >= 500) setAchievements("🏆 click Guru");
  else if (coins >= 100) setAchievements("🌟 raising star");
  else if (coins >= 10 ) setAchievements(" Getting started");
 }, [coins]
);

//Challenge and difficulty 
useEffect(() =>{
  if (level ===3){
    setMessage("Evasive mode unlocked! Coins are dodgy!");
    setTimeout(() => setMessage(""), 4000);
  }
  },[level])

useEffect(()=> {
  if (teleportMode){
    setMessage ("Teleport mode unlocked! Coins will disappear and reappear!");
    setTimeout(() => setMessage(""),4000);
  }
}, [teleportMode])

const handleClick = () => setCoins((prev) => prev + coinsPerClick);
  const handleUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins((prev) => prev - upgradeCost);
      setCoinsPerClick((prev) => prev + 1);
      setUpgradeCost((prev) => Math.floor(prev * 1.5));
    }
  };

  const handleReset = () => {
    setCoins(0);
    setCoinsPerClick(1);
    setUpgradeCost(10);
    setAchievement("");
    setMessage("");
    localStorage.removeItem("clickQuestData");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-white p-4 position-relative">
      <Header coins={coins} coinsPerClick={coinsPerClick} />

      {achievements && (
        <div className="position-absolute top-0 end-0 bg-success text-white px-3 py-2 rounded shadow m-3">
          {achievements}
        </div>
      )}
      {message && (
        <div className="position-absolute top-25 end-0 bg-warning text-dark px-3 py-2 rounded shadow m-3">
          {message}
        </div>
      )}

      <GameArea onClick={handleClick} isEvasive={level >= 3} teleportMode={teleportMode} />
      <Shop coins={coins} upgradeCost={upgradeCost} onUpgrade={handleUpgrade} />
      <Footer onReset={handleReset} />
    </div>
  );
   
};

export default App

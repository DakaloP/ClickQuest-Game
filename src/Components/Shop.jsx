import React from "react";


export default function Shop({coins, upgradeCost, onUpgrade}) {
const canUpgrade = coins >= upgradeCost;

    return (
        <div className="d-flex flex-column align-items-center my-4">
      <button onClick={onUpgrade}
      disabled={!canUpgrade} //lock the button if not coins are less 
      // is canUgrade true or false?
      //green if true and grey if false.
      className={`btn ${canUpgrade? 'btn-success' : 'btn-secondary'} btn-md mb-2`}
      >
       upgrade📈 (Cost: {upgradeCost})
      </button>
        
        {!canUpgrade && <small className="text-light">Need {upgradeCost - coins} more coins!</small>}
        </div>
    );
}

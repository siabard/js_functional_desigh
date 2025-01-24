/*

(should= 0 (score (repeat 20 0))) 

(defn score [rolls] 0)

(defn score [rolls]
  (reduce + rolls))

*/
// score 함수

/*
function score(rolls) {
  // return 0; 
  return rolls.reduce((sum, roll) => sum + roll, 0);
}
*/

// STEP 2
/*
function toFrames(rolls) {
  const frames = [];
  for (let i = 0; i < rolls.length; i += 2) {
    frames.push(rolls.slice(i, i + 2));
  }
  return frames;
}

function addFrame(score, frame) {
  return score + frame.reduce((sum, roll) => sum + roll, 0);
}

function score(rolls) {
  return toFrames(rolls).reduce(addFrame, 0);
}
*/

/* STEP 3 */
/*
function toFrames(rolls) {
  const frames = [];
  for (let i = 0; i < rolls.length; i += 2) {
    frames.push(rolls.slice(i, i + 2));
  }

  const possibleBonuses = frames.slice(1).map(frame => [frame[0]]);
  possibleBonuses.push([0]); 

  return frames.map((frame, index) => [...frame, ...(possibleBonuses[index] || [])]);
}

function addFrame(score, frameAndBonus) {
  const frame = frameAndBonus.slice(0, 2); 
  const frameSum = frame.reduce((sum, roll) => sum + roll, 0);

  if (frameSum === 10) {
    return score + frameAndBonus.reduce((sum, roll) => sum + roll, 0);
  } else {
    return score + frameSum;
  }
}

function score(rolls) {
  return toFrames(rolls).reduce(addFrame, 0);
}
*/

/* STEP 4

loop refactoring
*/

/*
// Function to split rolls into frames
function toFrames(rolls) {
  const frames = [];
  let remainingRolls = [...rolls]; // Clone the input array to avoid mutation

  while (remainingRolls.length > 0) {
    // Check if the next two rolls sum to 10 (spare)
    if (
      remainingRolls.length >= 2 &&
      remainingRolls.slice(0, 2).reduce((sum, roll) => sum + roll, 0) === 10
    ) {
      // Add the next 3 rolls as a frame
      frames.push(remainingRolls.slice(0, 3));
      remainingRolls = remainingRolls.slice(2); // Drop 2 rolls
    } else {
      // Add the next 2 rolls as a frame
      frames.push(remainingRolls.slice(0, 2));
      remainingRolls = remainingRolls.slice(2); // Drop 2 rolls
    }
  }

  return frames;
}

// Function to add the score of a frame to the total score
function addFrames(score, frame) {
  return score + frame.reduce((sum, roll) => sum + roll, 0);
}

// Main function to calculate the total score
function score(rolls) {
  return toFrames(rolls).reduce(addFrames, 0);
}
*/

////////////

/* STEP 5 

(defn to-frames [rolls]
  (loop [remaining-rolls rolls
         frames []]
    (cond
      (empty? remaining-rolls) 
	  frames
	  
	  (= 10 (first remaining-rolls))
	        (recur (rest remaining-rolls)
                   (conj frames (take 3 remaining-rolls)))

	  
      (= 10 (reduce + (take 2 remaining-rolls))) 
	  (recur (drop 2 remaining-rolls)
             (conj frames (take 3 remaining-rolls)))
			 
	  :else
      (recur (drop 2 remaining-rolls)
             (conj frames (take 2 remaining-rolls))))))
			 
(defn add-frames [score frame] 
  (+ score (reduce + frame)))

(defn score [rolls]
  (reduce add-frames 0 (to-frames rolls)))

*/

// Function to split rolls into frames
function toFrames(rolls) {
  const frames = [];
  let remainingRolls = [...rolls]; // Clone the input array to avoid mutation

  while (remainingRolls.length > 0) {
    if (remainingRolls[0] === 10) {
      // Strike: take the first 3 rolls as a frame
      frames.push(remainingRolls.slice(0, 3));
      remainingRolls = remainingRolls.slice(1); // Remove the first roll
    } else if (
      remainingRolls.length >= 2 &&
      remainingRolls.slice(0, 2).reduce((sum, roll) => sum + roll, 0) === 10
    ) {
      // Spare: take the first 3 rolls as a frame
      frames.push(remainingRolls.slice(0, 3));
      remainingRolls = remainingRolls.slice(2); // Remove the first 2 rolls
    } else {
      // Normal frame: take the first 2 rolls as a frame
      frames.push(remainingRolls.slice(0, 2));
      remainingRolls = remainingRolls.slice(2); // Remove the first 2 rolls
    }
  }

  return frames;
}

// Function to add a frame's score to the total score
function addFrames(score, frame) {
  return score + frame.reduce((sum, roll) => sum + roll, 0);
}

/*
// Main function to calculate the total score
function score(rolls) {
  return toFrames(rolls).reduce(addFrames, 0);
}
*/

/* STEP 7 */


function score(rolls) {
  // Reduce over the first 10 frames to calculate the total score
  return toFrames(rolls)
    .slice(0, 10) // Take the first 10 frames
    .reduce(addFrames, 0); // Calculate the score
}



module.exports = score;
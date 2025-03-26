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
// 투구를 프레임 단위로 나누는 함수 
function toFrames(rolls) {
  const frames = [];
  let remainingRolls = [...rolls]; // 입력된 배열을 복제한다. (기존 값이 바뀌는 것을 방지하기 위함)

  while (remainingRolls.length > 0) {
    // 다음 두번의 투구의 총합이 10(스페어) 인지 검사한다.
    if (
      remainingRolls.length >= 2 &&
      remainingRolls.slice(0, 2).reduce((sum, roll) => sum + roll, 0) === 10
    ) {
      // 스페어 처리시 3번의 투구를 하나의 프레임에 합산한다.
      frames.push(remainingRolls.slice(0, 3));
      remainingRolls = remainingRolls.slice(2); // Drop 2 rolls
    } else {
      // 스페어 처리를 못했다면 두 번의 투구만 하나의 프레임으로 합산한다.
      frames.push(remainingRolls.slice(0, 2));
      remainingRolls = remainingRolls.slice(2); // Drop 2 rolls
    }
  }

  return frames;
}

// 한 프레임의 점수를 더해 전체 점수를 계산한다. 
function addFrames(score, frame) {
  return score + frame.reduce((sum, roll) => sum + roll, 0);
}

// 전체 점수를 계산하는 주함수 
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

// 각 투구를 프레임 단위로 나눈다.
function toFrames(rolls) {
  const frames = [];
  let remainingRolls = [...rolls]; // // 입력된 배열을 복제한다. (기존 값이 바뀌는 것을 방지하기 위함)

  while (remainingRolls.length > 0) {
    if (remainingRolls[0] === 10) {
      // 스트라이크: 3번의 투구를 합산해 하나의 프레임으로 처리한다. 
      frames.push(remainingRolls.slice(0, 3));
      remainingRolls = remainingRolls.slice(1); // 첫번째 투구를 제외한다.
    } else if (
      remainingRolls.length >= 2 &&
      remainingRolls.slice(0, 2).reduce((sum, roll) => sum + roll, 0) === 10
    ) {
      // 스페어: 3번의 투구를 합산해 하나의 프레임으로 처리한다.
      frames.push(remainingRolls.slice(0, 3));
      remainingRolls = remainingRolls.slice(2); // 처음 두번의 투구를 제한다.
    } else {
      // 일반 프레임: 두 번의 투구를 합산해 하나의 프레임으로 처리한다.
      frames.push(remainingRolls.slice(0, 2));
      remainingRolls = remainingRolls.slice(2); // 처음 두 번의 투구를 제한다. 
    }
  }

  return frames;
}

// 한 프레임의 점수를 더해 전체 점수를 계산한다. 
function addFrames(score, frame) {
  return score + frame.reduce((sum, roll) => sum + roll, 0);
}

/*
// 전체 점수를 계산하는 주함수 
function score(rolls) {
  return toFrames(rolls).reduce(addFrames, 0);
}
*/

/* STEP 7 */


function score(rolls) {
  // 전체 점수를 계산할 때 처음 10프레임만 계산한다. 
  return toFrames(rolls)
    .slice(0, 10) // 처음 10프레임만 가져온다.
    .reduce(addFrames, 0); // 점수를 계산한다.
}



module.exports = score;
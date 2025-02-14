const makeRect = (h, w) => {
  return {h, w};
}

const setH = (rect, h) => {
  return {...rect, h };
}

const setW = (rect, w) => {
  return {...rect, w};
}

const area = (rect) => {
  return rect.w * rect.h;
}

const perimeter = (rect) => {
  return 2 * (rect.w + rect.h);
}


const minimallyIncreaseArea = (rect) => {
  const {h, w} = rect;

  if( h >= w) {
    return makeRect(h + 1, w);
  } else if(w > h ) {
    return makeRect(h, w + 1 );
  }
  throw new Error('invalid input');
};

const makeSquare = (side) => {
  return makeRect(side, side);
}

module.exports = { makeRect, setH, setW, area, perimeter, minimallyIncreaseArea, makeSquare };
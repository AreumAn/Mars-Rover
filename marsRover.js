'use strict';

const ERR_MSG_WRONG = 'This rover instruction has a wrong instruction';
const ERR_MSG_OUT = 'This rover instruction move out of grid';
const ERROR_MSG_CHECK_FILE = 'please check your input';
const RIGHT = 'R';
const LEFT = 'L';
const MOVE = 'M';

function MarsRover(plateau, landing, _instructions) {
  const directions = ['N', 'E', 'S', 'W'];
  const grid = plateau.split(' ').map((p) => parseInt(p));
  let position = landing
    .split(' ')
    .map((p, idx) => (idx !== 2 ? parseInt(p) : p));
  const instructions = _instructions.split('');

  const turn = (direction) => {
    const currentDirectionIdx = directions.indexOf(position[2]);
    let futureIdx = 0;
    if (direction === RIGHT) {
      futureIdx = currentDirectionIdx === 3 ? 0 : currentDirectionIdx + 1;
    } else {
      // direction LEFT
      futureIdx = currentDirectionIdx === 0 ? 3 : currentDirectionIdx - 1;
    }
    position[2] = directions[futureIdx];
  };

  const move = () => {
    let Xposition = position[0];
    let Yposition = position[1];
    switch (position[2]) {
      case 'N':
        Yposition += 1;
        break;
      case 'S':
        Yposition -= 1;
        break;
      case 'E':
        Xposition += 1;
        break;
      case 'W':
        Xposition -= 1;
        break;
      default:
        throw ERR_MSG_WRONG;
    }

    if (
      Xposition < 0 ||
      Xposition > grid[0] ||
      Yposition < 0 ||
      Yposition > grid[1]
    ) {
      throw ERR_MSG_OUT;
    }

    position[0] = Xposition;
    position[1] = Yposition;
  };

  const validationArgs = () => {
    if (grid.length !== 2 || grid.some((n) => isNaN(n) || n < 0)) return false;

    if (
      position.length !== 3 ||
      isNaN(position[0]) ||
      isNaN(position[1]) ||
      directions.indexOf(position[2]) === -1
    ) {
      return false;
    }

    if (
      instructions.some((l) => !isNaN(l) || ['L', 'R', 'M'].indexOf(l) === -1)
    ) {
      return false;
    }

    return true;
  };

  const getLastPosition = () => {
    if (!validationArgs()) {
      return ERROR_MSG_CHECK_FILE;
    }

    instructions.forEach((instruction) => {
      if (instruction === MOVE) {
        move();
      } else if (instruction === RIGHT || instruction === LEFT) {
        turn(instruction);
      } else {
        throw ERR_MSG_WRONG;
      }
    });
    return position.join(' ');
  };

  return getLastPosition();
}

exports.MarsRover = MarsRover;

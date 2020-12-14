#!/usr/bin/env node
const MarsRover = require('../marsRover');
const readline = require('readline');

const ERROR_MSG_DEFAULT = 'please type validation input';
const ERROR_MSG_CHECK_FILE = 'please check your input';

// Check if this file has right format input
const checkFileValidation = (fileArr) => {
  if (fileArr.filter((v) => !!v).length !== 5)
    return printErrMsg(ERROR_MSG_CHECK_FILE);
  // * TODO: check more cases
  return true;
};

// Change argv format to use rover fuction
const formatArgv = (dataArr) => {
  return dataArr.map((data) => data.split(':')[1]);
};

// Print Err msg
const printErrMsg = (msg = ERROR_MSG_DEFAULT) => {
  console.log(`Error: ${msg}`);
};

// Print right result
const printResult = (msg) => {
  msg.forEach((m) => console.log(m));
};

const callMarsRover = (dataArr) => {
  const plateau = dataArr[0];
  const rovers = dataArr.slice(1);

  let results = [];
  let idx = 1;

  for (let i = 0; i < rovers.length; i += 2) {
    const result = MarsRover.MarsRover(plateau, rovers[i], rovers[i + 1]);
    results.push(`Rover${idx}: ${result}`);
    idx++;
  }

  return results;
};

const rl = readline.createInterface({
  input: process.stdin,
});

let input = [];

rl.on('line', function (line) {
  input.push(line.trim());

  if (input.length === 5) {
    let inputData = formatArgv(input);

    if (checkFileValidation(inputData)) {
      printResult(callMarsRover(inputData));
    }
  }
}).on('close', function () {
  process.exit();
});

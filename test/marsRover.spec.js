'use strict';

const assert = require('assert');
const MarsRover = require('../marsRover').MarsRover;

describe('test MarsRover:', () => {
  describe('MarsRover result', () => {
    it("Plateau:5 5\nLanding:1 2 N\nInstructions:LMLMLMLMM should be '1 3 N'", () => {
      assert.equal('1 3 N', MarsRover('5 5', '1 2 N', 'LMLMLMLMM'));
    });
    it("Plateau:5 5\nLanding:1 2 N\nInstructions:LMLMLMLMM should be '1 3 N'", () => {
      assert.equal('5 1 E', MarsRover('5 5', '3 3 E', 'MMRMMRMRRM'));
    });
  });

  describe('MarsRover argument validation', () => {
    it('Plateau argument', () => {
      it("Plateau should be 2 numbers - '5 5', '6 6'", () => {
        assert.equal(
          'please check your input',
          MarsRover('5 a', '1 2 N', 'LMLMLMLMM')
        );
      });

      it("Plateau should be 2 numbers and it should be over 0 - '5 5', '6 6'", () => {
        assert.equal(
          'please check your input',
          MarsRover('5 -4', '1 2 N', 'LMLMLMLMM')
        );
      });
    });

    it('Landing argument', () => {
      it("Landing should have 2 numbers and 1 letter - '1 2 N', '3 2 N'", () => {
        assert.equal(
          'please check your input',
          MarsRover('5 5', 'a 2 N', 'LMLMLMLMM')
        );
      });

      it("Landing last letter should belong to 'N', 'E', 'S' or 'W'", () => {
        assert.equal(
          'please check your input',
          MarsRover('5 5', '1 2 B', 'LMLMLMLMM')
        );
      });
    });

    it('Instructions argument', () => {
      it('Instructions should not number', () => {
        assert.equal(
          'please check your input',
          MarsRover('5 5', '2 2 N', '33LMLMLMLMM')
        );
      });

      it("Each Instrunction should be 'L', 'R' or 'M'", () => {
        assert.equal(
          'please check your input',
          MarsRover('5 5', '1 2 B', 'ALMLMLMLMM')
        );
      });
    });
  });
});

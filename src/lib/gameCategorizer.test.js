import { describe, it, expect } from 'vitest';
import { getPlaytimeCategory, getPlayerCountCategory } from './gameCategorizer.js';

describe('gameCategorizer', () => {

  describe('getPlaytimeCategory', () => {
    // Happy Path Tests
    it('returns "short" for 30 mins or less', () => {
      expect(getPlaytimeCategory('15 mins')).toBe('short');
      expect(getPlaytimeCategory('30m')).toBe('short');
    });

    it('returns "medium" for 31-60 mins', () => {
      expect(getPlaytimeCategory('45 minutes')).toBe('medium');
      expect(getPlaytimeCategory('60')).toBe('medium');
    });

    it('returns "long" for 61-120 mins', () => {
      expect(getPlaytimeCategory('90 min')).toBe('long');
      expect(getPlaytimeCategory('120')).toBe('long');
    });

    it('returns "epic" for over 120 mins', () => {
      expect(getPlaytimeCategory('150')).toBe('epic');
      expect(getPlaytimeCategory('180 minutes')).toBe('epic');
    });

    // Edge Case Tests
    it('returns "unknown" for null, undefined, or wrong types', () => {
      expect(getPlaytimeCategory(null)).toBe('unknown');
      expect(getPlaytimeCategory(undefined)).toBe('unknown');
      expect(getPlaytimeCategory(45)).toBe('unknown');
      expect(getPlaytimeCategory({})).toBe('unknown');
    });

    it('returns "unknown" for strings without digits', () => {
      expect(getPlaytimeCategory('a while')).toBe('unknown');
      expect(getPlaytimeCategory('')).toBe('unknown');
    });

    it('handles negative-looking strings by parsing absolute digits', () => {
      // The current regex /(\d+)/ simply captures digits, ignoring the minus sign
      expect(getPlaytimeCategory('-20')).toBe('short'); 
    });
  });

  describe('getPlayerCountCategory', () => {
    // Happy Path Tests
    it('returns "solo" for solo games', () => {
      expect(getPlayerCountCategory('solo')).toBe('solo');
      expect(getPlayerCountCategory('1')).toBe('solo');
      expect(getPlayerCountCategory('1 player')).toBe('solo');
      expect(getPlayerCountCategory('  SoLo  ')).toBe('solo');
    });

    it('returns "duel" for exactly 2 players', () => {
      expect(getPlayerCountCategory('2')).toBe('duel');
    });

    it('returns "group" for typical player counts (3-5 max)', () => {
      expect(getPlayerCountCategory('3')).toBe('group');
      expect(getPlayerCountCategory('2-4')).toBe('group');
      expect(getPlayerCountCategory('1 - 5')).toBe('group');
    });

    it('returns "party" for large groups (6+ max)', () => {
      expect(getPlayerCountCategory('6')).toBe('party');
      expect(getPlayerCountCategory('2-6')).toBe('party');
      expect(getPlayerCountCategory('4-10')).toBe('party');
    });

    // Edge Case Tests
    it('returns "unknown" for null, undefined, or wrong types', () => {
      expect(getPlayerCountCategory(null)).toBe('unknown');
      expect(getPlayerCountCategory(undefined)).toBe('unknown');
      expect(getPlayerCountCategory(2)).toBe('unknown');
    });

    it('returns "unknown" for empty strings or strings with no digits/keywords', () => {
      expect(getPlayerCountCategory('')).toBe('unknown');
      expect(getPlayerCountCategory('family')).toBe('unknown');
    });

    it('returns "invalid" for reversed ranges (min > max)', () => {
      expect(getPlayerCountCategory('4-2')).toBe('invalid');
      expect(getPlayerCountCategory('5-1')).toBe('invalid');
    });

    it('handles malformed range spacing gracefully', () => {
      expect(getPlayerCountCategory('2- 4')).toBe('group');
      expect(getPlayerCountCategory('1 -6')).toBe('party');
    });
  });

});

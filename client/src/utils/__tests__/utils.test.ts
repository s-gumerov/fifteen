import { transformSecondsCountToWordExpression } from '../utils';

describe('transformSecondsCountToWordExpression function', () => {
  test('less than one minute', () => {
    expect(transformSecondsCountToWordExpression(43)).toBe('43 сек');
  });
  test('equal one minute', () => {
    expect(transformSecondsCountToWordExpression(60)).toBe('1 мин 0 сек');
  });
  test('less than one hour', () => {
    expect(transformSecondsCountToWordExpression(3500)).toBe('58 мин 20 сек');
  });
  test('equal one hour', () => {
    expect(transformSecondsCountToWordExpression(3600)).toBe('1 час 0 мин 0 сек');
  });
  test('more than one hour', () => {
    expect(transformSecondsCountToWordExpression(3700)).toBe('1 час 1 мин 40 сек');
  });
  test('more than two hours', () => {
    expect(transformSecondsCountToWordExpression(10000)).toBe('2 час 46 мин 40 сек');
  });
});
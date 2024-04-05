export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTwoDistinctRandomIntegers(
  min: number,
  max: number
): [number, number] {
  // Generate two distinct random numbers
  let num1 = getRandomInt(min, max);
  let num2 = getRandomInt(min, max);

  // If the two numbers are the same, generate the second number again until it's different
  while (num2 === num1) {
    num2 = getRandomInt(min, max);
  }

  return [num1, num2];
}

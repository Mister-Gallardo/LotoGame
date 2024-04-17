function generateRandomNumber(
  min: number,
  max: number,
  exclude: number[]
): number {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  while (exclude.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return randomNumber;
}

export function generateArrays(): [number[], number[]] {
  const firstArray: number[] = [];
  const secondArray: number[] = [];

  while (firstArray.length < 8) {
    const randomNumber = generateRandomNumber(1, 19, firstArray);
    firstArray.push(randomNumber);
  }

  while (secondArray.length < 1) {
    const randomSecondNumber = generateRandomNumber(1, 2, secondArray);
    secondArray.push(randomSecondNumber);
  }

  return [firstArray, secondArray];
}

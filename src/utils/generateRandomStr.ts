const generateRandomStrByCount = (count: number) => {
  return (Math.random() * (count + 2)).toString(36).substring(2, count + 2);
}

export default generateRandomStrByCount;
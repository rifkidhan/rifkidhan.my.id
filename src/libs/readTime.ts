const readTime = (content: string) => {
  const wordsPerMinutes = 100;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinutes);
  const readTime = time + ' ' + 'min read';

  return readTime as string;
};

export default readTime;

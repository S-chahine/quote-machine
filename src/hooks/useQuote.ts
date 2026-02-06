import { useState, useEffect, useCallback } from "react";

interface Quote {
  content: string;
  author: string;
}

const fallbackQuotes: Quote[] = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { content: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
  { content: "Imagination is more important than knowledge.", author: "Albert Einstein" },
  { content: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { content: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { content: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { content: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { content: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
  { content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { content: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { content: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { content: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { content: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
  { content: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { content: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { content: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith" },
  { content: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { content: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey" },
  { content: "The mind is everything. What you think you become.", author: "Buddha" },
  { content: "An unexamined life is not worth living.", author: "Socrates" },
  { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { content: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { content: "The unexamined life is not worth living.", author: "Socrates" },
  { content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { content: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
  { content: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { content: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
  { content: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
  { content: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
  { content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { content: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { content: "The best revenge is massive success.", author: "Frank Sinatra" },
  { content: "People who are crazy enough to think they can change the world, are the ones who do.", author: "Rob Siltanen" },
  { content: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { content: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
];

// Track shown quotes to avoid repetition
let shownQuoteIndices: number[] = [];

function getRandomFallbackQuote(): Quote {
  // If we've shown all quotes, reset the tracking
  if (shownQuoteIndices.length >= fallbackQuotes.length) {
    shownQuoteIndices = [];
  }
  
  // Find an index we haven't shown yet
  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  } while (shownQuoteIndices.includes(randomIndex));
  
  shownQuoteIndices.push(randomIndex);
  return fallbackQuotes[randomIndex];
}

export function useQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const ApiKey = import.meta.env.VITE_QUOTE_API_KEY;
    
    try {
      // Using ZenQuotes API via a proxy to avoid CORS
      const response = await fetch("https://api.api-ninjas.com/v2/randomquotes", {
        headers: {
          'X-Api-Key': ApiKey,
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      
      const data = await response.json();
      if (data && data[0]) {
        setQuote({
          content: data[0].quote,
          author: data[0].author,
        });
        return;
      }
      throw new Error("Invalid response");
    } catch (err) {
      // Use fallback quotes with no-repeat logic
      setQuote(getRandomFallbackQuote());
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return { quote, isLoading, error, fetchNewQuote: fetchQuote };
}

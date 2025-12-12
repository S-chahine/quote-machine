import { Quote } from "lucide-react";

interface QuoteCardProps {
  content: string;
  author: string;
  isAnimating: boolean;
}

export function QuoteCard({ content, author, isAnimating }: QuoteCardProps) {
  return (
    <div
      className={`glass-card rounded-2xl p-8 m-4 md:p-12 quote-shadow max-w-3xl w-full transition-all duration-500 ${
        isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="relative">
        {/* Decorative quote icon */}
        <Quote className="absolute -top-2 -left-2 h-10 w-10 text-primary" />
        
        {/* Quote content */}
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-foreground pl-6 pt-4">
          "{content}"
        </blockquote>
        
        {/* Author */}
        <footer className="mt-6 pl-6">
          <cite className="text-lg md:text-xl font-medium not-italic text-red-300">
            — {author}
          </cite>
        </footer>
      </div>
    </div>
  );
}

import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteCard } from "@/components/QuoteCard";
import { ShareButtons } from "@/components/ShareButtons";
import { useQuote } from "@/hooks/useQuote";
import { useState, useCallback } from "react";

export function QuoteMachine() {
  const { quote, isLoading, fetchNewQuote } = useQuote();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNewQuote = useCallback(async () => {
    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    await fetchNewQuote();
    setIsAnimating(false);
  }, [fetchNewQuote]);

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="text-center mb-8 md:mb-12 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-8 w-8 text-primary animate-bounce-subtle" />
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-orange-400">
            Quote Machine
          </h1>
          <Sparkles className="h-8 w-8 text-primary animate-bounce-subtle" style={{ animationDelay: "0.5s" }} />
        </div>
        <p className="text-red-300 text-lg font-bold">
          Discover wisdom, one quote at a time
        </p>
      </header>

      {/* Quote Card */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {isLoading && !quote ? (
          <div className="glass-card rounded-2xl p-12 max-w-3xl w-full flex items-center justify-center">
            <RefreshCw className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : quote ? (
          <QuoteCard
            content={quote.content}
            author={quote.author}
            isAnimating={isAnimating}
          />
        ) : null}

        {/* Action buttons */}
        {quote && (
          <div className="m-8 flex flex-col sm:flex-row items-center gap-6">
            <Button
              onClick={handleNewQuote}
              disabled={isLoading}
              variant="glow"
              size="lg"
              className="gap-2"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
              New Quote
            </Button>

            <ShareButtons quote={quote.content} author={quote.author} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-red-300 text-sm z-10">
        <p>Click "New Quote" for inspiration ✨</p>
      </footer>
    </div>
  );
}

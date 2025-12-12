import { Link2, Check } from "lucide-react";
import { FaFacebookF , FaInstagram, FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  quote: string;
  author: string;
}

export function ShareButtons({ quote, author }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `"${quote}" — ${author}`;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
   const shareToInstagram = () => {
    const url = `https://www.instagram.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Quote copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="social"
        size="icon"
        onClick={shareToTwitter}
        aria-label="Share on Twitter"
        className="group"
      >
        <FaXTwitter className="h-5 w-5 transition-colors group-hover:text-primary" />
      </Button>
      
      <Button
        variant="social"
        size="icon"
        onClick={shareToFacebook}
        aria-label="Share on Facebook"
        className="group"
      >
        <FaFacebookF className="h-5 w-5 transition-colors group-hover:text-secondary" />
      </Button>

       <Button
        variant="social"
        size="icon"
        onClick={shareToInstagram}
        aria-label="Share on Instagram"
        className="group"
      >
        <FaInstagram className="h-5 w-5 transition-colors group-hover:text-secondary" />
      </Button>

      <Button
        variant="social"
        size="icon"
        onClick={copyToClipboard}
        aria-label="Copy to clipboard"
        className="group"
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-400" />
        ) : (
          <Link2 className="h-5 w-5 transition-colors group-hover:text-accent" />
        )}
      </Button>
    </div>
  );
}

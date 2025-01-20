import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { handleError } from "@/utils/utils";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";

type CopyButtonProps = {
  label: string;
  textToCopy: string;
};

export default function CopyButton({ label, textToCopy }: CopyButtonProps) {
  const [text, setText] = useState<string>(() => label);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    if (copying) {
      const timer = setTimeout(() => {
        setText(label);
        setCopying(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [copying]);

  const onClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setText("Copied!");
      setCopying(true);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Button
      type="button"
      className={cn("w-40 flex gap-3 transition-all", {
        "!bg-yellow-600": copying,
      })}
      onClick={onClickCopy}
    >
      <Link />
      {text}
    </Button>
  );
}

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (word: string) => void;
}

export default function SecretWordDialog({
  isOpen,
  onClose,
  onConfirm,
}: RejectModalProps) {
  const [secretWord, setSecretWord] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (secretWord.trim()) {
      onConfirm(secretWord);
      setSecretWord("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set secret word</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="rejectReason" className="text-right">
            Secret word
          </Label>
          <Input
            id="rejectReason"
            ref={inputRef}
            value={secretWord}
            onChange={(e) => setSecretWord(e.target.value)}
            placeholder="Enter reason for rejection"
            className="mt-2"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!secretWord.trim()}>
            Confirm Rejection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

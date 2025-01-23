import { useState, useCallback } from "react";

export default function useSecretWordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [secretWordPromise, setSecretWordPromise] = useState<{
    resolve: (value: string | null) => void;
    reject: () => void;
  } | null>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    return new Promise<string | null>((resolve, reject) => {
      setSecretWordPromise({ resolve, reject });
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    if (secretWordPromise) {
      secretWordPromise.resolve(null);
      setSecretWordPromise(null);
    }
  }, [secretWordPromise]);

  const confirmSecretWord = useCallback(
    (reason: string) => {
      setIsOpen(false);
      if (secretWordPromise) {
        secretWordPromise.resolve(reason);
        setSecretWordPromise(null);
      }
    },
    [secretWordPromise]
  );

  return {
    isOpen,
    openModal,
    closeModal,
    confirmSecretWord,
  };
}

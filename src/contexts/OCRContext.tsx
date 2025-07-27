import { createContext, useContext, useState, ReactNode } from "react";

type OCRResult = {
  fileName: string;
  uploadDate: string;
  doctor: string;
  date: string;
  patientName: string;
  patientAge: string;
  medication: string;
  status: "REAL" | "FAKE";
};

type OCRContextType = {
  ocrResult: OCRResult | null;
  setOcrResult: (result: OCRResult) => void;
  imageURL: string;
  setImageURL: (url: string) => void;
};

const OCRContext = createContext<OCRContextType | undefined>(undefined);

export const OCRProvider = ({ children }: { children: ReactNode }) => {
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [imageURL, setImageURL] = useState<string>("");

  return (
    <OCRContext.Provider value={{ ocrResult, setOcrResult, imageURL, setImageURL }}>
      {children}
    </OCRContext.Provider>
  );
};

export const useOCR = () => {
  const context = useContext(OCRContext);
  if (!context) {
    throw new Error("useOCR must be used within an OCRProvider");
  }
  return context;
};

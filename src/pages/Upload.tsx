import React, { useRef } from "react";
import Tesseract from "tesseract.js";
import { useOCR } from "../contexts/OCRContext";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const { setOcrResult, setImageURL } = useOCR();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL);

    const { data: { text } } = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });

    const doctorMatch = text.match(/Dr\.?\s+[A-Za-z\s]+/);
    const dateMatch = text.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/);
    const patientMatch = text.match(/(Patient Name|Name)\s*[:\-]?\s*([A-Za-z\s]+)/i);
    const ageMatch = text.match(/Age\s*[:\-]?\s*(\d{1,3})/i);
    const medicationLines = text
      .split("\n")
      .filter((line) => /mg|tablet|capsule|ml/i.test(line))
      .join("\n");

    let foundFields = 0;
    if (doctorMatch) foundFields++;
    if (dateMatch) foundFields++;
    if (patientMatch) foundFields++;
    if (medicationLines) foundFields++;

    const status = foundFields >= 3 ? "REAL" : "FAKE";

    setOcrResult({
      fileName: file.name,
      uploadDate: new Date().toLocaleDateString(),
      doctor: doctorMatch ? doctorMatch[0] : "Not found",
      date: dateMatch ? dateMatch[0] : "Not found",
      patientName: patientMatch ? patientMatch[2] : "Not found",
      patientAge: ageMatch ? ageMatch[1] : "Not found",
      medication: medicationLines || "Not found",
      status,
    });

    navigate("/app/results");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">Upload Prescriptions</h1>
      <p className="text-gray-600 mb-8">Upload prescription data for fraud analysis</p>

      <div
        className="border-2 border-dashed border-blue-400 bg-gray-50 rounded-xl px-8 py-14 text-center transition"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3m6-10a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p className="text-lg font-medium text-gray-700">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Upload prescription data files for fraud detection analysis
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Files
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Accepted File Formats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-medium">Excel Files</p>
            <p className="text-sm text-gray-500">XLSX and XLS spreadsheets</p>
          </div>
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-medium">JSON Files</p>
            <p className="text-sm text-gray-500">Structured prescription data</p>
          </div>
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-medium">PDF Files</p>
            <p className="text-sm text-gray-500">Prescription documents and forms</p>
          </div>
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-medium">Image Files</p>
            <p className="text-sm text-gray-500">JPG, PNG, TIFF prescription images</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

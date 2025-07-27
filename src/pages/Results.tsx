// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";
// import { Calendar, User } from "lucide-react";
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   AlertTriangle, 
//   CheckCircle, 
//   TrendingUp, 
//   // Filter, 
//   Download,
//   Eye,
//   FileText,
//   Image,
//   File
// } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';


// export default function Results() {
//   // const [selectedFilter, setSelectedFilter] = useState('all');
//   const [selectedFilter] = useState('all');
//   const [selectedCase, setSelectedCase] = useState<any>(null);
//   const { fraudResults } = useAuth();

//   console.log('Current fraud results in Results page:', fraudResults);

//   const filteredCases = fraudResults.filter(case_ => {
//     if (selectedFilter === 'all') return true;
//     return case_.status === selectedFilter;
//   });

//   const getFileIcon = (fileType: string) => {
//     switch (fileType.toLowerCase()) {
//       case 'image': return Image;
//       case 'csv': 
//       case 'excel': 
//       case 'json': return FileText;
//       case 'pdf': return File;
//       default: return FileText;
//     }
//   };

//   const getRiskColor = (score: number) => {
//     if (score >= 80) return 'text-red-600 bg-red-100';
//     if (score >= 60) return 'text-yellow-600 bg-yellow-100';
//     return 'text-green-600 bg-green-100';
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active': return 'text-red-600 bg-red-100';
//       case 'investigating': return 'text-yellow-600 bg-yellow-100';
//       case 'resolved': return 'text-green-600 bg-green-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Fraud Detection Results</h1>
//           <p className="text-gray-600 mt-1">Review and investigate potential prescription fraud cases</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
//             <Download className="h-4 w-4" />
//             <span>Export Results</span>
//           </button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">High Risk Cases</p>
//               <p className="text-2xl font-bold text-red-600 mt-1">
//                 {fraudResults.filter(r => r.riskScore >= 85).length}
//               </p>
//             </div>
//             <AlertTriangle className="h-8 w-8 text-red-600" />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Under Investigation</p>
//               <p className="text-2xl font-bold text-yellow-600 mt-1">
//                 {fraudResults.filter(r => r.status === 'investigating').length}
//               </p>
//             </div>
//             <Eye className="h-8 w-8 text-yellow-600" />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Resolved Cases</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">
//                 {fraudResults.filter(r => r.status === 'resolved').length}
//               </p>
//             </div>
//             <CheckCircle className="h-8 w-8 text-green-600" />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Detection Rate</p>
//               <p className="text-2xl font-bold text-blue-600 mt-1">{fraudResults.length}</p>
//             </div>
//             <TrendingUp className="h-8 w-8 text-blue-600" />
//           </div>
//         </motion.div>
//       </div>

//       {/* Filters
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
//       >
//         <div className="flex items-center space-x-4">
//           <Filter className="h-5 w-5 text-gray-600" />
//           <span className="text-sm font-medium text-gray-700">Filter by status:</span>
//           <div className="flex space-x-2">
//             {['all', 'active', 'investigating', 'resolved'].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setSelectedFilter(filter)}
//                 className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
//                   selectedFilter === filter
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 {filter.charAt(0).toUpperCase() + filter.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </motion.div> */}

//       {/* Cases List */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.5 }}
//         className="bg-white rounded-xl shadow-sm border border-gray-200"
//       >
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">Detected Cases</h3>
//         </div>
//         <div className="divide-y divide-gray-200">
//           {filteredCases.map((case_, index) => (
//             <motion.div
//               key={case_.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
//               onClick={() => setSelectedCase(case_)}
//             >
//               <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                   {React.createElement(getFileIcon(case_.fileType), {
//                     className: "h-8 w-8 text-blue-600"
//                   })}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <div className="flex items-center space-x-3 mb-2">
//                         <h4 className="text-lg font-semibold text-gray-900">{case_.fraudType}</h4>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(case_.riskScore)}`}>
//                           Risk: {case_.riskScore}%
//                         </span>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
//                           {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
//                         </span>
//                         <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
//                           {case_.fileType}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 mb-3">{case_.description}</p>
//                       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
//                         <div className="flex items-center space-x-2">
//                           <FileText className="h-4 w-4 text-gray-400" />
//                           <span className="text-gray-600">File: {case_.fileName}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <User className="h-4 w-4 text-gray-400" />
//                           <span className="text-gray-600">Patient: {case_.patientId}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Calendar className="h-4 w-4 text-gray-400" />
//                           <span className="text-gray-600">{case_.uploadDate}</span>
//                         </div>
//                         {/* <div className="flex items-center space-x-2">
//                           <MapPin className="h-4 w-4 text-gray-400" />
//                           <span className="text-gray-600">{case_.location}</span>
//                         </div> */}
//                         <div className="flex items-center space-x-2">
//                           <User className="h-4 w-4 text-gray-400" />
//                           <span className="text-gray-600">{case_.medication}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Case Details Modal */}
//       {selectedCase && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex min-h-screen items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="fixed inset-0 bg-black bg-opacity-50"
//               onClick={() => setSelectedCase(null)}
//             />
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-8"
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">Case Details</h3>
//                 <button
//                   onClick={() => setSelectedCase(null)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <Eye className="h-6 w-6" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Case ID
//                     </label>
//                     <p className="text-gray-900">{selectedCase.id}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Source File
//                     </label>
//                     <p className="text-gray-900">{selectedCase.fileName} ({selectedCase.fileType})</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Risk Score
//                     </label>
//                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedCase.riskScore)}`}>
//                       {selectedCase.riskScore}% High Risk
//                     </span>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Fraud Type
//                     </label>
//                     <p className="text-gray-900">{selectedCase.fraudType}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Description
//                   </label>
//                   <p className="text-gray-900">{selectedCase.description}</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Patient ID
//                     </label>
//                     <p className="text-gray-900">{selectedCase.patientId}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Upload Date
//                     </label>
//                     <p className="text-gray-900">{selectedCase.uploadDate}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Doctor
//                     </label>
//                     <p className="text-gray-900">{selectedCase.doctor}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Medication
//                     </label>
//                     <p className="text-gray-900">{selectedCase.medication}</p>
//                   </div>
//                 </div>

//                 <div className="flex space-x-4 pt-6">
//                   <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
//                     Flag for Investigation
//                   </button>
//                   <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
//                     Generate Report
//                   </button>
//                   <button 
//                     onClick={() => setSelectedCase(null)}
//                     className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// const fraudResults = [
//   {
//     id: "1",
//     fileName: "prescription_123.png",
//     fileType: "Image",
//     uploadDate: "2024-07-19",
//     fraudType: "Duplicate Medication",
//     riskScore: 85,
//     status: "Flagged",
//     description: "Same drug prescribed twice with different names.",
//     patientId: "P123",
//     doctor: "Dr. Sharma",
//     date: "12/07/2024",
//     patientName: "Rahul Mehra",
//     patientAge: "45",
//     medication: "Paracetamol 500mg\nIbuprofen 400mg"
//   },
//   // Add more entries...
// ];

// const Results = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Prescription OCR Results</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {fraudResults.map((case_) => (
//           <Card key={case_.id} className="shadow-md hover:shadow-lg transition">
//             <CardContent className="p-4 space-y-2">
//               <h2 className="text-lg font-semibold">{case_.fileName}</h2>

//               <div className="text-sm text-gray-600">
//                 <strong>Uploaded:</strong> {case_.uploadDate}
//               </div>

//               <div className="text-sm text-gray-600">
//                 <strong>Fraud Type:</strong> {case_.fraudType}
//               </div>

//               <div className="text-sm text-gray-600">
//                 <strong>Status:</strong> {case_.status}
//               </div>

//               <div className="text-sm text-gray-600">
//                 <strong>Risk Score:</strong> {case_.riskScore}
//               </div>

//               <hr className="my-2" />

//               <div className="text-sm text-gray-700">
//                 <strong>Doctor:</strong> {case_.doctor}
//               </div>

//               <div className="text-sm text-gray-700">
//                 <strong>Patient:</strong> {case_.patientName} ({case_.patientAge} yrs)
//               </div>

//               <div className="text-sm text-gray-700">
//                 <strong>Date:</strong> {case_.date}
//               </div>

//               <div className="text-sm text-gray-700 whitespace-pre-wrap">
//                 <strong>Medicines:</strong>
//                 {"\n"}
//                 {case_.medication}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };



// import React from "react";
import { useOCR } from "../contexts/OCRContext";
import bgImage from "../assets/bg.jpeg";

const Results = () => {
  const { ocrResult, imageURL } = useOCR();

  if (!ocrResult || !imageURL) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">
          No data found. Please upload a prescription first.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md border max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Prescription Details</h1>

        <img
          src={imageURL}
          alt="Uploaded Prescription"
          className="mb-4 rounded-lg shadow-lg max-w-full border"
        />

        <p><strong>File Name:</strong> {ocrResult.fileName}</p>
        <p><strong>Upload Date:</strong> {ocrResult.uploadDate}</p>
        <p><strong>Doctor:</strong> {ocrResult.doctor}</p>
        <p><strong>Date:</strong> {ocrResult.date}</p>
        <p><strong>Patient Name:</strong> {ocrResult.patientName}</p>
        <p><strong>Patient Age:</strong> {ocrResult.patientAge}</p>
        <div className="whitespace-pre-wrap">
          <strong>Medicines:</strong>{"\n"}{ocrResult.medication}
        </div>

        <p className={`mt-4 text-lg font-bold ${ocrResult.status === "REAL" ? "text-green-600" : "text-red-600"}`}>
          {ocrResult.status === "REAL" ? "✅ REAL PRESCRIPTION" : "❌ FAKE PRESCRIPTION"}
        </p>
      </div>
    </div>
  );
};

export default Results;




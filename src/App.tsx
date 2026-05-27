import { useEffect, useState }
from "react";

import api from "./services/api";

import UploadDocument
from "./components/UploadDocument";

import DocumentList
from "./components/DocumentList";

import AskAI
from "./components/AskAI";

import type { DocumentFile } from "./types/Document";

function App() {

  const [docs, setDocs] =
    useState<DocumentFile[]>([]);

  const [selectedFile, setSelectedFile] =
    useState<string>("");

  const fetchDocuments = async () => {

    try {

      const response =
        await api.get("/api/documents");

      setDocs(response.data);

    } catch (error) {

      console.error(error);
    }
  };


  useEffect(() => {
    fetchDocuments();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">

      <div className="mx-auto w-full max-w-6xl">

        <h1 className="mb-10 text-center text-4xl font-bold text-gray-900">
          AI Knowledge Assistant
        </h1>

        <UploadDocument
          onUploadSuccess={
            fetchDocuments
          }
        />

        <DocumentList
          docs={docs}
          onSelect={setSelectedFile}
        />

        {selectedFile && (

          <AskAI
            selectedFile={selectedFile}
          />
        )}

      </div>

    </div>
  );
}

export default App;
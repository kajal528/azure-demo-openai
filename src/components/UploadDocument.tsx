import { useState } from "react";
import api from "../services/api";

interface Props {
  onUploadSuccess: () => void;
}

const UploadDocument = ({
  onUploadSuccess,
}: Props) => {

  const [file, setFile] =
    useState<File | null>(null);

  const [summary, setSummary] =
    useState<string>("");

  const [loading, setLoading] =
    useState<boolean>(false);

  const upload = async () => {

    if (!file) return;

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("file", file);

      const response =
        await api.post(
          "/api/documents/upload",
          formData
        );

      setSummary(response.data.summary);

      onUploadSuccess();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Upload Document
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />

        <button
          type="button"
          onClick={upload}
          disabled={!file || loading}
          className="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >

        {loading
          ? "Uploading..."
          : "Upload"}

        </button>
      </div>

      {summary && (

        <div className="mt-6">

          <h3 className="
            text-xl
            font-semibold
          ">
            AI Summary
          </h3>

          <p className="mt-2">
            {summary}
          </p>

        </div>
      )}

    </div>
  );
};

export default UploadDocument;
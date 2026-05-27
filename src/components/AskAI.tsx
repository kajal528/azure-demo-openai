import { useState } from "react";
import api from "../services/api";

interface Props {
  selectedFile: string;
}

const AskAI = ({
  selectedFile,
}: Props) => {

  const [question, setQuestion] =
    useState<string>("");

  const [answer, setAnswer] =
    useState<string>("");

  const [loading, setLoading] =
    useState<boolean>(false);

  const askAI = async () => {

    if (!selectedFile || !question)
      return;

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append(
        "fileName",
        selectedFile
      );

      formData.append(
        "question",
        question
      );

      const response =
        await api.post(
          "/documents/ask",
          formData
        );

      setAnswer(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Ask AI
      </h2>

      <p className="mb-4 text-sm text-gray-500">
        Selected:
        {" "}
        {selectedFile}
      </p>

      <textarea
  value={question}
  onChange={(e) =>
    setQuestion(e.target.value)
  }
  placeholder="Ask question about document..."
  onKeyDown={(e) => {
    e.stopPropagation();
  }}
  className="
    w-full
    min-h-[140px]
    border
    border-gray-300
    rounded-xl
    p-4
    text-lg
    outline-none
    focus:ring-2
    focus:ring-purple-500
    resize-none
  "
/>

      <button
        type="button"
        onClick={askAI}
        disabled={!question.trim() || loading}
        className="mt-4 rounded-md bg-purple-600 px-5 py-2 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
      >

        {loading
          ? "Thinking..."
          : "Ask AI"}

      </button>

      {answer && (

        <div className="
          mt-6
          border-t
          pt-4
        ">

          <h3 className="
            text-xl
            font-semibold
          ">
            AI Response
          </h3>

          <p className="mt-2">
            {answer}
          </p>

        </div>
      )}

    </div>
  );
};

export default AskAI;
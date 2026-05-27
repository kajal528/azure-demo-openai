import type { DocumentFile } from "../types/Document";

interface Props {
  docs: DocumentFile[];
  onSelect: (fileName: string) => void;
}

const DocumentList = ({
  docs,
  onSelect,
}: Props) => {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Uploaded Documents
      </h2>

      {docs.length === 0 ? (
        <p className="text-sm text-gray-500">
          No documents uploaded yet.
        </p>
      ) : (
      <div className="space-y-4">

        {docs.map((doc) => (

          <div
            key={doc.name}
            className="
              border
              rounded-lg
              p-4
              flex
              justify-between
              items-center
            "
          >

            <div>

              <h3 className="font-semibold">
                {doc.name}
              </h3>

              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="
                  text-blue-600
                  text-sm
                "
              >
                Open Document
              </a>

            </div>

            <button
              onClick={() =>
                onSelect(doc.name)
              }
              className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded
              "
            >
              Ask AI
            </button>

          </div>
        ))}

      </div>
      )}

    </div>
  );
};

export default DocumentList;
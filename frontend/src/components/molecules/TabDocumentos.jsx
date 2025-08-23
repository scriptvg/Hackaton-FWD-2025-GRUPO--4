import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  Download,
  Eye,
  Share2,
  FileText,
  FileSpreadsheet,
  File,
  X,
} from "lucide-react";
import { getDocuments } from "@api/api";
import VisorPDF from "@components/VisorPDF";

// Items per page constant
const ITEMS_PER_PAGE = 6;

// Icon component by document type
const DocumentIcon = ({ tipo }) => {
  switch (tipo) {
    case "PDF":
      return <File className="text-red-500 w-5 h-5" aria-hidden="true" />;
    case "EXCEL":
      return (
        <FileSpreadsheet
          className="text-green-500 w-5 h-5"
          aria-hidden="true"
        />
      );
    default:
      return (
        <FileText className="text-gray-500 w-5 h-5" aria-hidden="true" />
      );
  }
};

export default function TabDocumentos() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalDoc, setModalDoc] = useState(null);

  // Fetch documents when component mounts
  useEffect(() => {
    async function load() {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (err) {
        console.error("Failed to load documents:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Memoized filter & search logic
  const filteredDocuments = useMemo(() => {
    let list = documents;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (d) =>
          d.titulo?.toLowerCase().includes(term) ||
          d.description?.toLowerCase().includes(term)
      );
    }
    if (filterType) {
      list = list.filter((d) => d.tipo === filterType);
    }
    return list;
  }, [documents, searchTerm, filterType]);

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredDocuments.length / ITEMS_PER_PAGE
  );
  const pageDocuments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDocuments.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDocuments, currentPage]);

  // Share via mailto
  const handleShare = useCallback((doc) => {
    const subject = encodeURIComponent(doc.titulo);
    const body = encodeURIComponent(
      `You can access the document here: ${doc.url}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setModalDoc(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section
      aria-labelledby="documents-heading"
      className="w-full px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="max-w-screen-xl mx-auto bg-white rounded-2xl shadow-xl font-sans p-6 sm:p-8">
        {/** Section heading */}
        <h2
          id="documents-heading"
          className="text-teal-600 font-bold text-xl mb-6"
        >
          Documentos Institucionales
        </h2>

        {/** Search & filter controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <input
            type="search"
            aria-label="Search documents"
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <select
            aria-label="Filter by document type"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Todos los tipos</option>
            <option value="PDF">PDF</option>
            <option value="EXCEL">Excel</option>
          </select>
        </div>

        {/** Documents grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p
              role="status"
              className="col-span-full text-center text-gray-500"
            >
              Cargando documentos...
            </p>
          ) : pageDocuments.length > 0 ? (
            pageDocuments.map((doc, idx) => (
              <article
                key={idx}
                className="group border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50 flex flex-col justify-between"
                aria-labelledby={`doc-title-${idx}`}
              >
                <header className="mb-2 flex justify-between items-start">
                  <div className="flex items-center gap-2 text-teal-700 font-semibold text-sm">
                    <DocumentIcon tipo={doc.tipo} />
                    <h3
                      id={`doc-title-${idx}`}
                      className="line-clamp-2 leading-snug"
                    >
                      {doc.titulo}
                    </h3>
                  </div>
                  <span className="text-xs text-white bg-teal-600 rounded px-2 py-0.5">
                    {doc.tipo}
                  </span>
                </header>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {doc.description}
                </p>

                <div className="flex justify-between text-xs text-gray-500 mb-3">
                  <span>{doc.fecha}</span>
                  <span>{doc.peso}</span>
                </div>

                <footer className="flex flex-wrap gap-4 pt-2 border-t text-sm">
                  <button
                    type="button"
                    onClick={() => setModalDoc(doc)}
                    className="flex items-center gap-1 text-teal-600 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label={`Ver ${doc.titulo}`}
                  >
                    <Eye size={16} aria-hidden="true" />
                    Ver
                  </button>

                  {doc.url && (
                    <a
                      href={doc.url}
                      download
                      className="flex items-center gap-1 text-teal-600 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500"
                      aria-label={`Descargar ${doc.titulo}`}
                    >
                      <Download size={16} aria-hidden="true" />
                      Descargar
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleShare(doc)}
                    className="flex items-center gap-1 text-teal-600 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label={`Compartir ${doc.titulo}`}
                  >
                    <Share2 size={16} aria-hidden="true" />
                    Compartir
                  </button>
                </footer>
              </article>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No se encontraron documentos.
            </p>
          )}
        </div>

        {/** Pagination controls */}
        {totalPages > 1 && (
          <nav
            aria-label="Document pagination"
            className="flex flex-wrap justify-center mt-6 gap-2"
          >
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm focus:outline-none ${
                    currentPage === page
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              );
            })}
          </nav>
        )}

        {/** Modal viewer */}
        {modalDoc && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6 z-50 backdrop-blur-sm"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-full sm:max-w-2xl w-full overflow-hidden">
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <h3
                  id="modal-title"
                  className="text-teal-700 font-bold text-lg"
                >
                  {modalDoc.titulo}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalDoc(null)}
                  className="text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  aria-label="Cerrar vista previa"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="p-4 sm:p-6 max-h-[70vh] overflow-auto">
                <p className="text-sm text-gray-600 mb-4">
                  {modalDoc.description}
                </p>
                {modalDoc.tipo === "PDF" ? (
                  <VisorPDF fileUrl={modalDoc.url} />
                ) : (
                  <p className="text-sm text-gray-500">
                    Vista previa no disponible para este tipo de archivo.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

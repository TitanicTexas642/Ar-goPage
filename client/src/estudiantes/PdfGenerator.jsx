import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfGenerator({ pdfContent, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <button onClick={onClose}>Cerrar PDF</button>
      <Document file={pdfContent} onLoadSuccess={handleDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Página {pageNumber} de {numPages}
      </p>
    </div>
  );
}

export default PdfGenerator;
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class GeneradorPDF extends React.Component {
  static generatePDF(nombreAlumno) {
    const doc = new jsPDF();
    doc.text(`Reporte de Calificaciones de ${nombreAlumno}`, 14, 15);

    // Datos ficticios para la tabla
    const tableColumn = ['Nombre Test','Puntaje Pregunta 1', 'Puntaje Pregunta 2', 'Puntaje Pregunta 3', 'Puntaje Pregunta 4', 'Puntaje Pregunta 5'];
    const tableRows = [
      ['Aritmetica', '50%','25%','100%','100%','100%','100%'],
      ['Balanza', '0%','50%','100%','100%','100%','100%'],
      ['Cubos', '25%','50%','0%','25%','75%','25%'],
      ['Informacion', '100%','100%','100%','75%','50%','100%'],
      ['Letras y Numeros', '100%','25%','100%','100%','100%','100%'],
      ['Matrices','100%','25%','100%','100%','100%','100%'],
      ['Puzzles', '0%','25%','25%','75%','50%','50%'],
      ['Semejanzas', '100%','25%','100%','100%','100%','100%'],
      ['Claves', '2','1','3','3','3','3'],
      ['Cancelacion', '2','1','3','3','3','3'],
      ['Vocabulario', '0%','25%','25%','75%','50%','50%'],
      ['Digitos', '2','1','3','3','3','3'],
      ['Simbolos', '75%','100%','0%','25%','25%','50%'],
      ['Comprension', '2','1','3','3','3','3'],
      ['Span', '2','1','3','3','3','3'],
    ];

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('reporte_calificaciones.pdf');
  }

  render() {
    return (
      <div>
        {/* Contenido del componente PDFGenerator (si es necesario) */}
      </div>
    );
  }
}

export default GeneradorPDF;


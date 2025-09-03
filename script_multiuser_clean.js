// Datos globales
let mesasData = [];
let analistasData = [];
let usuarioActual = null;
let mesasEstado = {};

// Elementos del DOM
let tbody, searchInput, filterStatus, exportBtn, modal, modalMesa;
let observacionesTextarea, saveObservacionesBtn, cancelObservacionesBtn, closeModal;

// Variables globales
let currentMesa = null;
let filteredData = [];

// Función para cargar el CSV real
async function cargarCSV() {
    try {
        const response = await fetch('data.csv');
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error cargando CSV:', error);
        // Datos de respaldo para testing
        return `Partido,Establecimiento,Mesa,Analista de Cómputos,Teléfono
Arrecifes,Municipalidad De Arrecifes,1,Caru Jacobo,3364655767
Arrecifes,Municipalidad De Arrecifes,2,Caru Jacobo,3364655767
Arrecifes,Municipalidad De Arrecifes,3,Caru Jacobo,3364655767
Arrecifes,Municipalidad De Arrecifes,4,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 1 ES N° 4,5,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 1 ES N° 4,6,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 1 ES N° 4,7,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 1 ES N° 4,8,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 1 ES N° 4,9,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 1 ES N° 4,10,Caru Jacobo,3364655767
Arrecifes,Colegio Sta. Teresita Del Nino Jesus,11,Caru Jacobo,3364655767
Arrecifes,Colegio Sta. Teresita Del Nino Jesus,12,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 7,13,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 7,14,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 7,15,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 7,16,Caru Jacobo,3364655767
Arrecifes,Escuela Educ. Especial N° 501,17,Caru Jacobo,3364655767
Arrecifes,Escuela Educ. Especial N° 501,18,Caru Jacobo,3364655767
Arrecifes,Escuela Educ. Especial N° 501,19,Caru Jacobo,3364655767
Arrecifes,Escuela Educ. Especial N° 501,20,Caru Jacobo,3364655767
Arrecifes,Escuela Educ. Especial N° 501,21,Caru Jacobo,3364655767
Arrecifes,Escuela Educ. Especial N° 501,22,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 18,23,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 18,24,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 18,25,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 18,26,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 33 ES N° 2,27,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 33 ES N° 2,28,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 33 ES N° 2,29,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 33 ES N° 2,30,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 33 ES N° 2,31,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 33 ES N° 2,32,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 32 ES N° 5,33,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 32 ES N° 5,34,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 32 ES N° 5,35,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 32 ES N° 5,36,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 32 ES N° 5,37,Caru Jacobo,3364655767
Arrecifes,Escuela Est N° 1 ES N° 1,38,Caru Jacobo,3364655767
Arrecifes,Escuela Est N° 1 ES N° 1,39,Caru Jacobo,3364655767
Arrecifes,Escuela Est N° 1 ES N° 1,40,Caru Jacobo,3364655767
Arrecifes,Escuela Est N° 1 ES N° 1,41,Caru Jacobo,3364655767
Arrecifes,Escuela Est N° 1 ES N° 1,42,Caru Jacobo,3364655767
Arrecifes,Escuela Est N° 1 ES N° 1,43,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 2,44,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 2,45,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 2,46,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 2,47,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 2,48,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 2,49,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 2,50,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 5,51,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 5,52,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 5,53,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 5,54,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 5,55,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 29,56,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 29,57,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 29,58,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 29,59,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 29,60,Caru Jacobo,3364655767
Arrecifes,Escuela ES N° 6,61,Caru Jacobo,3364655767
Arrecifes,Escuela ES N° 6,62,Caru Jacobo,3364655767
Arrecifes,Escuela ES N° 6,63,Caru Jacobo,3364655767
Arrecifes,Escuela ES N° 6,64,Caru Jacobo,3364655767
Arrecifes,Escuela ES N° 6,65,Caru Jacobo,3364655767
Arrecifes,Escuela ES N° 6,66,Caru Jacobo,3364655767
Arrecifes,Escuela ES N° 6,67,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 16,68,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 16,69,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 16,70,Caru Jacobo,3364655767
Arrecifes,Escuela EP N° 16,71,Nahuel Burrutia,3407511792
Arrecifes,Escuela EP N° 16,72,Nahuel Burrutia,3407511792
Arrecifes,Escuela EP N° 24,73,Nahuel Burrutia,3407511792
Arrecifes,Escuela EP N° 14,74,Nahuel Burrutia,3407511792
Arrecifes,Escuela EP N° 23 ES N° 3,75,Nahuel Burrutia,3407511792
Arrecifes,Escuela EP N° 23 ES N° 3,76,Nahuel Burrutia,3407511792
Arrecifes,Escuela EP N° 9,77,Nahuel Burrutia,3407511792
Arrecifes,Escuela EP N° 9,78,Nahuel Burrutia,3407511792
Arrecifes,Escuela Ep 16,9001,Nahuel Burrutia,3407511792
Baradero,Escuela ES N° 3,1,Dario Silva,3364687486
Baradero,Escuela ES N° 3,2,Dario Silva,3364687486
Baradero,Escuela ES N° 3,3,Dario Silva,3364687486
Baradero,Escuela ES N° 3,4,Dario Silva,3364687486
Baradero,Escuela ES N° 3,5,Dario Silva,3364687486
Baradero,Escuela ES N° 3,6,Dario Silva,3364687486
Baradero,Escuela ES N° 3,7,Dario Silva,3364687486
Baradero,Escuela ES N° 3,8,Dario Silva,3364687486
Baradero,Escuela EP N° 1 ES N° 10,9,Dario Silva,3364687486
Baradero,Escuela EP N° 1 ES N° 10,10,Dario Silva,3364687486
Baradero,Escuela EP N° 1 ES N° 10,11,Dario Silva,3364687486
Baradero,Escuela EP N° 1 ES N° 10,12,Dario Silva,3364687486
Baradero,Escuela EP N° 1 ES N° 10,13,Dario Silva,3364687486
Baradero,Escuela EP N° 1 ES N° 10,14,Dario Silva,3364687486
Baradero,Escuela Est N° 1,15,Dario Silva,3364687486
Baradero,Escuela Est N° 1,16,Dario Silva,3364687486
Baradero,Escuela Est N° 1,17,Dario Silva,3364687486
Baradero,Escuela Est N° 1,18,Dario Silva,3364687486
Baradero,Escuela Est N° 1,19,Dario Silva,3364687486
Baradero,Escuela Est N° 1,20,Dario Silva,3364687486
Baradero,Escuela Est N° 1,21,Dario Silva,3364687486
Baradero,Escuela Est N° 1,22,Dario Silva,3364687486
Baradero,Colegio San Jose,23,Dario Silva,3364687486
Baradero,Colegio San Jose,24,Dario Silva,3364687486
Baradero,Colegio San Jose,25,Dario Silva,3364687486
Baradero,Colegio San Jose,26,Dario Silva,3364687486
Baradero,Colegio San Jose,27,Dario Silva,3364687486
Baradero,Unid. Acad. Esc. Norm. Sup. Sastre,28,Dario Silva,3364687486
Baradero,Unid. Acad. Esc. Norm. Sup. Sastre,29,Dario Silva,3364687486
Baradero,Unid. Acad. Esc. Norm. Sup. Sastre,30,Dario Silva,3364687486
Baradero,Unid. Acad. Esc. Norm. Sup. Sastre,31,Dario Silva,3364687486
Baradero,Unid. Acad. Esc. Norm. Sup. Sastre,32,Dario Silva,3364687486
Baradero,Unid. Acad. Esc. Norm. Sup. Sastre,33,Dario Silva,3364687486
Baradero,Unid. Acad. Esc. Norm. Sup. Sastre,34,Dario Silva,3364687486
Baradero,Unid. Acad. Esc. Norm. Sup. Sastre,35,Dario Silva,3364687486
Baradero,Escuela EP N° 17,36,Dario Silva,3364687486
Baradero,Escuela EP N° 17,37,Dario Silva,3364687486
Baradero,Escuela EP N° 17,38,Dario Silva,3364687486
Baradero,Escuela EP N° 4,39,Dario Silva,3364687486
Baradero,Escuela EP N° 4,40,Dario Silva,3364687486
Baradero,Escuela EP N° 4,41,Dario Silva,3364687486
Baradero,Escuela EP N° 4,42,Dario Silva,3364687486
Baradero,Escuela EP N° 4,43,Nora Aguilera,3364520101
Baradero,Escuela EP N° 4,44,Nora Aguilera,3364520101
Baradero,Escuela EP N° 3,45,Nora Aguilera,3364520101
Baradero,Escuela EP N° 3,46,Nora Aguilera,3364520101
Baradero,Escuela EP N° 3,47,Nora Aguilera,3364520101
Baradero,Escuela EP N° 3,48,Julian Paredes,3364562633
Baradero,Escuela EP N° 3,49,Julian Paredes,3364562633
Baradero,Escuela EP N° 3,50,Julian Paredes,3364562633
Baradero,Escuela EP N° 3,51,Julian Paredes,3364562633
Baradero,Escuela EP N° 3,52,Julian Paredes,3364562633
Baradero,Escuela EP N° 29 ES N° 11,53,Julian Paredes,3364562633
Baradero,Escuela EP N° 29 ES N° 11,54,Julian Paredes,3364562633
Baradero,Escuela EP N° 29 ES N° 11,55,Julian Paredes,3364562633
Baradero,Escuela EP N° 29 ES N° 11,56,Julian Paredes,3364562633
Baradero,Escuela EP N° 29 ES N° 11,57,Julian Paredes,3364562633
Baradero,Escuela EP N° 29 ES N° 11,58,Julian Paredes,3364562633
Baradero,Escuela EP N° 7 ES N° 8,59,Julian Paredes,3364562633
Baradero,Escuela EP N° 7 ES N° 8,60,Julian Paredes,3364562633
Baradero,Escuela EP N° 7 ES N° 8,61,Julian Paredes,3364562633
Baradero,Ctro. Educ. Complementario N° 801,62,Julian Paredes,3364562633
Baradero,Ctro. Educ. Complementario N° 801,63,Julian Paredes,3364562633
Baradero,Ctro. Educ. Complementario N° 801,64,Julian Paredes,3364562633
Baradero,Ctro. Educ. Complementario N° 801,65,Julian Paredes,3364562633
Baradero,Centro Universitario Baradero,66,Julian Paredes,3364562633
Baradero,Escuela EP Nº5,67,Julian Paredes,3364562633
Baradero,Escuela EP Nº5,68,Julian Paredes,3364562633
Baradero,Escuela EP Nº12,69,Julian Paredes,3364562633
Baradero,Escuela EP Nº12,70,Julian Paredes,3364562633
Baradero,Escuela EP Nº12,71,Julian Paredes,3364562633
Baradero,Jardin De InfantES N° 908,72,Julian Paredes,3364562633
Baradero,Jardin De InfantES N° 908,73,Julian Paredes,3364562633
Baradero,Escuela EP N° 16 ES N° 6,74,Julian Paredes,3364562633
Baradero,Escuela EP N° 16 ES N° 6,75,Julian Paredes,3364562633
Baradero,Escuela EP N° 16 ES N° 6,76,Julian Paredes,3364562633
Baradero,Jardin De InfantES Nº905,77,Julian Paredes,3364562633
Baradero,Jardin De InfantES Nº905,78,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,79,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,80,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,81,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,82,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,83,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,84,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,85,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,86,Julian Paredes,3364562633
Baradero,Escuela EP N° 26 ES N° 5,87,Julian Paredes,3364562633
Baradero,Escuela EP N° 10ES N° 9,88,Julian Paredes,3364562633
Baradero,Escuela EP N° 10ES N° 9,89,Julian Paredes,3364562633
Baradero,Escuela EP N° 22 ES N° 12,90,Julian Paredes,3364562633
Baradero,Escuela EP N° 11,91,Julian Paredes,3364562633
Baradero,Escuela EP N° 11,92,Julian Paredes,3364562633
Baradero,Escuela EP N° 11,93,Julian Paredes,3364562633
Baradero,Escuela EP N° 11,94,Julian Paredes,3364562633
,Baradero Escuela EP N° 11,95,Julian Paredes,3364562633
Baradero,Escuela Educ. Especial N° 502 Maria Montessori,9001,Julian Paredes,3364562633
Baradero,Escuela Educ. Especial N° 502 Maria Montessori,9002,Julian Paredes,3364562633
Capitan Sarmiento,Escuela EP N° 11,1,Nora Aguilera,3364520101
Capitan Sarmiento,Escuela EP N° 11,2,Nora Aguilera,3364520101
Capitan Sarmiento,Escuela EP N° 11,3,Nora Aguilera,3364520101
Capitan Sarmiento,Escuela EP N° 11,4,Nora Aguilera,3364520101
Capitan Sarmiento,Escuela Est N° 1,5,Nora Aguilera,3364520101
Capitan Sarmiento,Escuela Est N° 1,6,Melina Sella,3364686910
Capitan Sarmiento,Escuela Est N° 1,7,Melina Sella,3364686910
Capitan Sarmiento,Escuela Est N° 1,8,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 4,9,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 4,10,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 4,11,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 4,12,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 4,13,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 1,14,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 1,15,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 1,16,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 1,17,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 1,18,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 1,19,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 1,20,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 1,21,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 1,22,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 1,23,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 1,24,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 1,25,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 1,26,Melina Sella,3364686910
Capitan Sarmiento,Nuevo Colegio Ingles,27,Melina Sella,3364686910
Capitan Sarmiento,Nuevo Colegio Ingles,28,Melina Sella,3364686910
Capitan Sarmiento,Nuevo Colegio Ingles,29,Melina Sella,3364686910
Capitan Sarmiento,Nuevo Colegio Ingles,30,Melina Sella,3364686910
Capitan Sarmiento,Nuevo Colegio Ingles,31,Melina Sella,3364686910
Capitan Sarmiento,Nuevo Colegio Ingles,32,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 5,33,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 5,34,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 5,35,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 5,36,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 3,37,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 3,38,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 3,39,Melina Sella,3364686910
Capitan Sarmiento,Escuela ES N° 3,40,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 2 ES N° 4,41,Melina Sella,3364686910
Capitan Sarmiento,Escuela EP N° 13 ES N° 2,9001,Melina Sella,3364686910
Carmen de Areco,Escuela Educ. Especial N° 501,1,Melina Sella,3364686910
Carmen de Areco,Escuela Educ. Especial N° 501,2,Melina Sella,3364686910
Carmen de Areco,Escuela Educ. Especial N° 501,3,Melina Sella,3364686910
Carmen de Areco,Escuela Educ. Especial N° 501,4,Melina Sella,3364686910
Carmen de Areco,Escuela Educ. Especial N° 501,5,Melina Sella,3364686910
Carmen de Areco,Escuela Educ. Especial N° 501,6,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 6,7,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 6,8,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 6,9,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 6,10,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 4,11,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 4,12,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 4,13,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 4,14,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 1,15,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 1,16,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 1,17,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 1,18,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 1,19,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 1,20,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 1,21,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 1,22,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 1,23,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 1,24,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 1,25,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 1,26,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 8,27,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 8,28,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 8,29,Melina Sella,3364686910
Carmen de Areco,Escuela EP N° 8,30,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 2,31,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 2,32,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 2,33,Melina Sella,3364686910
Carmen de Areco,Escuela ES N° 2,34,Nahuel Burrutia,3407511792
Carmen de Areco,Escuela ES N° 2,35,Nahuel Burrutia,3407511792
Carmen de Areco,Escuela ES N° 2,36,Nahuel Burrutia,3407511792
Carmen de Areco,Escuela ES N° 2,37,Nahuel Burrutia,3407511792
Carmen de Areco,Escuela ES N° 2,38,Nahuel Burrutia,3407511792
Carmen de Areco,Escuela EP N° 11 ES N° 3,39,Nahuel Burrutia,3407511792
Carmen de Areco,Escuela EP N° 11 ES N° 3,40,Nahuel Burrutia,3407511792
Carmen de Areco,Escuela EP N° 12 ES N° 1 Ext. N° 1,41,Nahuel Burrutia,3407511792
Carmen de Areco,Escuela EP N° 4,9001,Nahuel Burrutia,3407511792
Colon,Escuela ES N° 1,1,David Iudica,3364260251
Colon,Escuela ES N° 1,2,David Iudica,3364260251
Colon,Escuela EP N° 4,3,David Iudica,3364260251
Colon,Escuela EP N° 4,4,David Iudica,3364260251
Colon,Escuela EP N° 4,5,David Iudica,3364260251
Colon,Escuela EP N° 4,6,David Iudica,3364260251
Colon,Escuela EP N° 4,7,David Iudica,3364260251
Colon,Instituto Monsenor De Andrea,8,David Iudica,3364260251
Colon,Instituto Monsenor De Andrea,9,David Iudica,3364260251
Colon,Instituto Monsenor De Andrea,10,David Iudica,3364260251
Colon,Instituto Monsenor De Andrea,11,David Iudica,3364260251
Colon,Instituto Monsenor De Andrea,12,David Iudica,3364260251
Colon,Instituto Santa Marta,13,David Iudica,3364260251
Colon,Instituto Santa Marta,14,David Iudica,3364260251
Colon,Instituto Santa Marta,15,David Iudica,3364260251
Colon,Instituto Santa Marta,16,David Iudica,3364260251
Colon,Instituto Santa Marta,17,David Iudica,3364260251
Colon,Instituto Santa Marta,18,David Iudica,3364260251
Colon,Instituto Santa Marta,19,David Iudica,3364260251
Colon,Instituto Santa Marta,20,David Iudica,3364260251
Colon,Escuela EP N° 1 ES N° 5,21,David Iudica,3364260251
Colon,Escuela EP N° 1 ES N° 5,22,David Iudica,3364260251
Colon,Escuela EP N° 1 ES N° 5,23,David Iudica,3364260251
Colon,Escuela EP N° 1 ES N° 5,24,David Iudica,3364260251
Colon,Escuela EP N° 1 ES N° 5,25,David Iudica,3364260251
Colon,Escuela EP N° 1 ES N° 5,26,David Iudica,3364260251
Colon,Escuela EP N° 1 ES N° 5,27,David Iudica,3364260251
Colon,Escuela EP N° 1 ES N° 5,28,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,29,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,30,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,31,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,32,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,33,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,34,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,35,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,36,David Iudica,3364260251
Colon,Escuela EP N° 22 ES N° 2,37,David Iudica,3364260251
Colon,Escuela EP N° 6,38,David Iudica,3364260251
Colon,Escuela EP N° 6,39,David Iudica,3364260251
Colon,Escuela Educ. Especial N° 501,40,David Iudica,3364260251
Colon,Escuela Educ. Especial N° 501,41,David Iudica,3364260251
Colon,Escuela EP N° 2 ES N° 3,42,David Iudica,3364260251
Colon,Escuela EP N° 2 ES N° 3,43,David Iudica,3364260251
Colon,Escuela EP N° 2 ES N° 3,44,David Iudica,3364260251
Colon,Escuela EP N° 2 ES N° 3,45,David Iudica,3364260251
Colon,Escuela EP N° 2 ES N° 3,46,David Iudica,3364260251
Colon,Escuela EP N° 2 ES N° 3,47,David Iudica,3364260251
Colon,Escuela EP N° 3,48,David Iudica,3364260251
Colon,Escuela EP N° 3,49,David Iudica,3364260251
Colon,Escuela EP N° 3,50,David Iudica,3364260251
Colon,Escuela EP N° 3,51,David Iudica,3364260251
Colon,Escuela EP N° 3,52,David Iudica,3364260251
Colon,Escuela EP N° 3,53,David Iudica,3364260251
Colon,Escuela EP N° 3,54,David Iudica,3364260251
Colon,Escuela EP N° 3,55,David Iudica,3364260251
Colon,Escuela EP N° 3,56,David Iudica,3364260251
Colon,Escuela Est N° 1,57,David Iudica,3364260251
Colon,Escuela Est N° 1,58,David Iudica,3364260251
,Colon Escuela Est N° 1,59,David Iudica,3364260251
Colon,Escuela Est N° 1,60,David Iudica,3364260251
Colon,Escuela Est N° 1,61,David Iudica,3364260251
Colon,Escuela Est N° 1,62,David Iudica,3364260251
Colon,Escuela Est N° 1,63,David Iudica,3364260251
Colon,Escuela EP N° 13,64,David Iudica,3364260251
Colon,Escuela EP N° 12,65,David Iudica,3364260251
Colon,Escuela EP N° 5 ES N° 6,66,David Iudica,3364260251
Colon,Escuela EP N° 6,9001,David Iudica,3364260251
Exaltacion de la Cruz,Escuela EP N° 1,1,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 1,2,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 1,3,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 1,4,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 1,5,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 1,6,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 1,7,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 1,8,Matias Acosta,3364591658
Exaltacion de la Cruz,Instituto Jose M. Estrada,9,Matias Acosta,3364591658
Exaltacion de la Cruz,Instituto Jose M. Estrada,10,Matias Acosta,3364591658
Exaltacion de la Cruz,Instituto Jose M. Estrada,11,Matias Acosta,3364591658
Exaltacion de la Cruz,Instituto Jose M. Estrada,12,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 12,13,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 12,14,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 12,15,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 12,16,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 12,17,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 12,18,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 12,19,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 12,20,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 4,21,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 4,22,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 4,23,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 4,24,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 20ES N° 3,25,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 20ES N° 3,26,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 20ES N° 3,27,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 20ES N° 3,28,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 20ES N° 3,29,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 20ES N° 3,30,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 19,31,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 19,32,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 19,33,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 19,34,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 19,35,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 19,36,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 2,37,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 2,38,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 2,39,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 2,40,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 2,41,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 2,42,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 11,43,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 11,44,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 11,45,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 11,46,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 11,47,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 11,48,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 11,49,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 11,50,Matias Acosta,3364591658
Exaltacion de la Cruz,Instituto Sagrada Familia Epes,51,Matias Acosta,3364591658
Exaltacion de la Cruz,Instituto Sagrada Familia Epes,52,Matias Acosta,3364591658
Exaltacion de la Cruz,Instituto Sagrada Familia Epes,53,Matias Acosta,3364591658
Exaltacion de la Cruz,Instituto Sagrada Familia Epes,54,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 1,55,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 1,56,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 1,57,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 1,58,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela ES N° 1,59,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 21,60,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 21,61,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 21,62,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 21,63,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 3 ES N° 6,64,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 3 ES N° 6,65,Matias Acosta,3364591658
Exaltacion de la Cruz,Escuela EP N° 3 ES N° 6,66,Matias Acosta,3364591658
Exaltacion de la Cruz,Colegio Altos Los Robles,67,Matias Acosta,3364591658
Exaltacion de la Cruz,Colegio Altos Los Robles,68,Matias Acosta,3364591658
Exaltacion de la Cruz,Colegio Altos Los Robles,69,Matias Acosta,3364591658
Exaltacion de la Cruz,Colegio Altos Los Robles,70,Matias Acosta,3364591658
Exaltacion de la Cruz,Colegio Altos Los Robles,71,Julian Finelli,3364024379
Exaltacion de la Cruz,Colegio Altos Los Robles,72,Julian Finelli,3364024379
Exaltacion de la Cruz,Colegio Altos Los Robles,73,Julian Finelli,3364024379
Exaltacion de la Cruz,Colegio Altos Los Robles,74,Nahuel Burrutia,3407511792
Exaltacion de la Cruz,Colegio Altos Los Robles,75,Nahuel Burrutia,3407511792
Exaltacion de la Cruz,Escuela EP N° 14,76,David Iudica,3364260251
Exaltacion de la Cruz,Escuela EP N° 14,77,David Iudica,3364260251
Exaltacion de la Cruz,Escuela EP N° 14,78,Roberto Simiani,3364564540
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,79,Roberto Simiani,3364564540
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,80,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,81,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,82,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,83,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,84,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,85,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,86,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 4 Est N° 1,87,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela Primaria Francisco I,88,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela Primaria Francisco I,89,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela Primaria Francisco I,90,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela Primaria Francisco I,91,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela Primaria Francisco I,92,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela Primaria Francisco I,93,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela Primaria Francisco I,94,Dario Silva,3364687486
Exaltacion de la Cruz,Jardin De InfantES N °903,95,Dario Silva,3364687486
Exaltacion de la Cruz,Jardin De InfantES N °903,96,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 20ES N° 3,97,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 20ES N° 3,98,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 7,99,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 7,100,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 10,101,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela Educ. Especial N° 501,9001,Dario Silva,3364687486
Exaltacion de la Cruz,Jardin De InfantES N° 902,9002,Dario Silva,3364687486
Exaltacion de la Cruz,Jardin De InfantES N° 902,9003,Dario Silva,3364687486
Exaltacion de la Cruz,Jardin De InfantES N° 902,9004,Dario Silva,3364687486
Exaltacion de la Cruz,Escuela EP N° 14,9005,Dario Silva,3364687486
Exaltacion de la Cruz,Centro Cultural Parada Robles,9006,Dario Silva,3364687486
Exaltacion de la Cruz,Jardin De InfantES N °903,9007,David Iudica,3364260251
Pergamino,Escuela EP N° 27,1,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 19,2,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 16,3,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 16,4,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 16,5,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 16,6,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,7,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,8,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,9,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,10,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,11,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,12,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,13,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,14,Sol Cali Costa,3364218356
Pergamino,Escuela ES N° 5 ES N° 6,15,Sol Cali Costa,3364218356
Pergamino,Colegio Ntra. Sra. Del Huerto Epes,16,Sol Cali Costa,3364218356
Pergamino,Colegio Ntra. Sra. Del Huerto Epes,17,Sol Cali Costa,3364218356
Pergamino,Escuela Est N° 2,18,Sol Cali Costa,3364218356
Pergamino,Escuela Est N° 2,19,Sol Cali Costa,3364218356
Pergamino,Escuela Est N° 2,20,Sol Cali Costa,3364218356
Pergamino,Escuela Est N° 2,21,Sol Cali Costa,3364218356
Pergamino,Escuela Est N° 2,22,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 2 ES N° 19,23,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 2 ES N° 19,24,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 2 ES N° 19,25,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 2 ES N° 19,26,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 2 ES N° 19,27,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 2 ES N° 19,28,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 2 ES N° 19,29,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 2 ES N° 19,30,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 1 ES N° 4,31,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 1 ES N° 4,32,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 1 ES N° 4,33,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 1 ES N° 4,34,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 1 ES N° 4,35,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 1 ES N° 4,36,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 1 ES N° 4,37,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 1 ES N° 4,38,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 22,39,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 22,40,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 22,41,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 22,42,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 22,43,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 22,44,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 22,45,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 22,46,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,47,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,48,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,49,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,50,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,51,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,52,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,53,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,54,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,55,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 4 ES N° 15,56,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 8 ES N° 20,57,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 8 ES N° 20,58,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 8 ES N° 20,59,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 8 ES N° 20,60,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 8 ES N° 20,61,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 8 ES N° 20,62,Sol Cali Costa,3364218356
Pergamino,Escuela EP N° 8 ES N° 20,63,Sol Cali Costa,3364218356
Pergamino,Escuela M. R. Scalabrini Ep Es,64,Sol Cali Costa,3364218356
Pergamino,Escuela M. R. Scalabrini Ep Es,65,Sol Cali Costa,3364218356
Pergamino,Escuela M. R. Scalabrini Ep Es,66,Sol Cali Costa,3364218356
Pergamino,Escuela M. R. Scalabrini Ep Es,67,Sol Cali Costa,3364218356
Pergamino,Escuela M. R. Scalabrini Ep Es,68,Sol Cali Costa,3364218356
Pergamino,Escuela M. R. Scalabrini Ep Es,69,Sol Cali Costa,3364218356
Pergamino,Escuela M. R. Scalabrini Ep Es,70,Sol Cali Costa,3364218356
Pergamino,Escuela M. R. Scalabrini Ep Es,71,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 64 ES N° 12,72,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 64 ES N° 12,73,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 64 ES N° 12,74,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 64 ES N° 12,75,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 64 ES N° 12,76,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 64 ES N° 12,77,Bruno Lacomba,3364350324
Pergamino,Jardin De InfantES N° 923,78,Bruno Lacomba,3364350324
Pergamino,Jardin De InfantES N° 923,79,Bruno Lacomba,3364350324
Pergamino,Jardin De InfantES N° 923,80,Bruno Lacomba,3364350324
Pergamino,Colegio San Jose,81,Bruno Lacomba,3364350324
Pergamino,Colegio San Jose,82,Bruno Lacomba,3364350324
Pergamino,Colegio San Jose,83,Bruno Lacomba,3364350324
Pergamino,Colegio San Jose,84,Bruno Lacomba,3364350324
Pergamino,Colegio San Jose,85,Bruno Lacomba,3364350324
Pergamino,Colegio San Jose,86,Bruno Lacomba,3364350324
Pergamino,Colegio San Jose,87,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,88,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,89,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,90,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,91,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,92,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,93,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,94,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,95,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,96,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 10,97,Bruno Lacomba,3364350324
Pergamino,Inst. Sup. De Formac. Docente N° 5,98,Bruno Lacomba,3364350324
Pergamino,Inst. Sup. De Formac. Docente N° 5,99,Bruno Lacomba,3364350324
Pergamino,Inst. Sup. De Formac. Docente N° 5,100,Bruno Lacomba,3364350324
Pergamino,Inst. Sup. De Formac. Docente N° 5,101,Bruno Lacomba,3364350324
Pergamino,Inst. Sup. De Formac. Docente N° 5,102,Bruno Lacomba,3364350324
Pergamino,Inst. Sup. De Formac. Docente N° 5,103,Bruno Lacomba,3364350324
Pergamino,Inst. Sup. De Formac. Docente N° 5,104,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 2,105,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 2,106,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 2,107,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 2,108,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 2,109,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 2,110,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 2,111,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 2,112,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 50ES N° 2 Extension,113,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 50ES N° 2 Extension,114,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 50ES N° 2 Extension,115,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 50ES N° 2 Extension,116,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 50ES N° 2 Extension,117,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 50ES N° 2 Extension,118,Bruno Lacomba,3364350324
Pergamino,Jardin De InfantES N° 917,119,Bruno Lacomba,3364350324
Pergamino,Jardin De InfantES N° 917,120,Bruno Lacomba,3364350324
Pergamino,Jardin De InfantES N° 917,121,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 5 ES N° 10,122,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 5 ES N° 10,123,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 5 ES N° 10,124,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 5 ES N° 10,125,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 5 ES N° 10,126,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 5 ES N° 10,127,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 62,128,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 62,129,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 62,130,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 62,131,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 62,132,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 62,133,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 62,134,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 62,135,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 18,136,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 18,137,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 18,138,Bruno Lacomba,3364350324
Pergamino,Escuela ES N° 18,139,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 52,140,Bruno Lacomba,3364350324
Pergamino,Escuela EP N° 52,141,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 52,142,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 6,143,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 6,144,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 6,145,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 17,146,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 17,147,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 17,148,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 17,149,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,150,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,151,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,152,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,153,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,154,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,155,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,156,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,157,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,158,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,159,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,160,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 63 ES N° 7,161,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,162,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,163,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,164,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,165,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,166,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,167,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,168,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,169,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,170,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,171,Santiago Morzoli,3407411141
Pergamino,Escuela Est N° 1,172,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 18 ES N° 11,173,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 18 ES N° 11,174,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 18 ES N° 11,175,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 18 ES N° 11,176,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 18 ES N° 11,177,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 18 ES N° 11,178,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 18 ES N° 11,179,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 18 ES N° 11,180,Santiago Morzoli,3407411141
Pergamino,Jardin De InfantES N° 915,181,Santiago Morzoli,3407411141
Pergamino,Jardin De InfantES N° 915,182,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 41,183,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 41,184,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 41,185,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 41,186,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 41,187,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 11 ES N° 17,188,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 11 ES N° 17,189,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 11 ES N° 17,190,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 11 ES N° 17,191,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 11 ES N° 17,192,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 11 ES N° 17,193,Santiago Morzoli,3407411141
Pergamino,Escuela Santa Julia (Epes),194,Santiago Morzoli,3407411141
Pergamino,Escuela Santa Julia (Epes),195,Santiago Morzoli,3407411141
Pergamino,Escuela Santa Julia (Epes),196,Santiago Morzoli,3407411141
Pergamino,Escuela Santa Julia (Epes),197,Santiago Morzoli,3407411141
Pergamino,Escuela Santa Julia (Epes),198,Santiago Morzoli,3407411141
Pergamino,Escuela Santa Julia (Epes),199,Santiago Morzoli,3407411141
Pergamino,Escuela Santa Julia (Epes),200,Santiago Morzoli,3407411141
Pergamino,Escuela Santa Julia (Epes),201,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 53,202,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 53,203,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 53,204,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 53,205,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 53,206,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 53,207,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 53,208,Santiago Morzoli,3407411141
Pergamino,Escuela EP N° 53,209,Santiago Morzoli,3407411141
Pergamino,Escuela ES N° 14,210,Santiago Morzoli,3407411141
Pergamino,Escuela ES N° 14,211,Juan Giupponi,3364183950
Pergamino,Escuela ES N° 14,212,Juan Giupponi,3364183950
Pergamino,Escuela ES N° 14,213,Juan Giupponi,3364183950
Pergamino,Escuela ES N° 14,214,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 42 ES N° 16,215,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 42 ES N° 16,216,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 42 ES N° 16,217,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 42 ES N° 16,218,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 42 ES N° 16,219,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 42 ES N° 16,220,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 42 ES N° 16,221,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 42 ES N° 16,222,Juan Giupponi,3364183950
Pergamino,Colegio San Pablo,223,Juan Giupponi,3364183950
Pergamino,Colegio San Pablo,224,Juan Giupponi,3364183950
Pergamino,Colegio San Pablo,225,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 48 ES N° 13,226,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 48 ES N° 13,227,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 48 ES N° 13,228,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 48 ES N° 13,229,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 48 ES N° 13,230,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 48 ES N° 13,231,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 48 ES N° 13,232,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 48 ES N° 13,233,Juan Giupponi,3364183950
Pergamino,Centro Educ. Complementario N° 802,234,Juan Giupponi,3364183950
Pergamino,Centro Educ. Complementario N° 802,235,Juan Giupponi,3364183950
Pergamino,Centro Educ. Complementario N° 802,236,Juan Giupponi,3364183950
Pergamino,Centro Educ. Complementario N° 802,237,Juan Giupponi,3364183950
Pergamino,Escuela Especial N° 502,238,Juan Giupponi,3364183950
Pergamino,Escuela Especial N° 502,239,Juan Giupponi,3364183950
Pergamino,Escuela Especial N° 502,240,Juan Giupponi,3364183950
Pergamino,Escuela Especial N° 502,241,Juan Giupponi,3364183950
Pergamino,Escuela Especial N° 502,242,Juan Giupponi,3364183950
Pergamino,Escuela Especial N° 502,243,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 56,244,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 3 ES N° 3,245,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 3 ES N° 3,246,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 3 ES N° 3,247,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 3 ES N° 3,248,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 44,249,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 12,250,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 12,251,Juan Giupponi,3364183950
Pergamino,Escuela ES N° 1,252,Juan Giupponi,3364183950
Pergamino,Escuela ES N° 1,253,Juan Giupponi,3364183950
Pergamino,Escuela ES N° 1,254,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 14,255,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 24,256,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 24,257,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 24,258,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 24,259,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 24,260,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 23,261,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 23,262,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 7,263,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 7,264,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 7,265,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 54,266,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 54,267,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 54,268,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 15,269,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 15,270,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 15,271,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 26,272,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 9 ES N° 8,273,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 9 ES N° 8,274,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 20ES N° 9,275,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 20ES N° 9,276,Juan Giupponi,3364183950
Pergamino,Escuela EP N° 20ES N° 9,277,Juan Giupponi,3364183950
Pergamino,Escuela Educ. Especial N° 503,9001,Juan Giupponi,3364183950
Pergamino,Escuela Educ. Especial N° 503,9002,Juan Giupponi,3364183950
Pergamino,Escuela Educ. Especial N° 503,9003,Juan Giupponi,3364183950
Ramallo,Escuela EP N° 1,1,Julian Paredes,3364562633
Ramallo,Escuela EP N° 1,2,Julian Paredes,3364562633
Ramallo,Escuela EP N° 1,3,Julian Paredes,3364562633
Ramallo,Escuela EP N° 1,4,Julian Paredes,3364562633
Ramallo,Escuela EP N° 1,5,Julian Paredes,3364562633
Ramallo,Escuela EP N° 1,6,Julian Paredes,3364562633
Ramallo,Escuela EP N° 1,7,Julian Paredes,3364562633
Ramallo,Escuela EP N° 1,8,Julian Paredes,3364562633
Ramallo,Escuela EP N° 1,9,Julian Paredes,3364562633
Ramallo,Instituto Ramallo (Epes),10,Julian Paredes,3364562633
Ramallo,Instituto Ramallo (Epes),11,Julian Paredes,3364562633
Ramallo,Instituto Ramallo (Epes),12,Julian Paredes,3364562633
Ramallo,Instituto Ramallo (Epes),13,Julian Paredes,3364562633
Ramallo,Instituto Ramallo (Epes),14,Julian Paredes,3364562633
Ramallo,Instituto Ramallo (Epes),15,Julian Paredes,3364562633
Ramallo,Instituto Ramallo (Epes),16,Julian Paredes,3364562633
Ramallo,Instituto Ramallo (Epes),17,Julian Paredes,3364562633
Ramallo,Escuela EP N° 26,18,Julian Paredes,3364562633
Ramallo,Escuela EP N° 26,19,Julian Paredes,3364562633
Ramallo,Escuela EP N° 26,20,Julian Paredes,3364562633
Ramallo,Escuela EP N° 26,21,Nora Aguilera,3364520101
Ramallo,Escuela EP N° 26,22,Nora Aguilera,3364520101
Ramallo,Escuela EP N° 26,23,Nora Aguilera,3364520101
Ramallo,Escuela EP N° 26,24,Nora Aguilera,3364520101
Ramallo,Escuela EP N° 26,25,Nora Aguilera,3364520101
Ramallo,Escuela EP N° 26,26,Andres Burgues,3407406148
Ramallo,Escuela Educ. Especial N° 501,27,Andres Burgues,3407406148
Ramallo,Escuela Educ. Especial N° 501,28,Andres Burgues,3407406148
Ramallo,Escuela Educ. Especial N° 501,29,Andres Burgues,3407406148
Ramallo,Escuela Educ. Especial N° 501,30,Andres Burgues,3407406148
Ramallo,Escuela EP N° 3,31,Andres Burgues,3407406148
Ramallo,Escuela EP N° 3,32,Andres Burgues,3407406148
Ramallo,Escuela EP N° 3,33,Andres Burgues,3407406148
Ramallo,Escuela EP N° 3,34,Andres Burgues,3407406148
Ramallo,Escuela EP N° 3,35,Andres Burgues,3407406148
Ramallo,Escuela EP N° 3,36,Andres Burgues,3407406148
Ramallo,Escuela EP N° 3,37,Andres Burgues,3407406148
Ramallo,Escuela EP N° 3,38,Andres Burgues,3407406148
Ramallo,Escuela ES N° 1,39,Andres Burgues,3407406148
Ramallo,Escuela ES N° 1,40,Andres Burgues,3407406148
Ramallo,Escuela ES N° 1,41,Andres Burgues,3407406148
Ramallo,Escuela ES N° 1,42,Andres Burgues,3407406148
Ramallo,Escuela ES N° 1,43,Andres Burgues,3407406148
Ramallo,Escuela ES N° 1,44,Andres Burgues,3407406148
Ramallo,Escuela ES N° 1,45,Andres Burgues,3407406148
Ramallo,Escuela EP N° 5,46,Andres Burgues,3407406148
Ramallo,Escuela EP N° 5,47,Andres Burgues,3407406148
Ramallo,Escuela EP N° 5,48,Andres Burgues,3407406148
Ramallo,Escuela EP N° 5,49,Andres Burgues,3407406148
Ramallo,Escuela EP N° 5,50,Andres Burgues,3407406148
Ramallo,Escuela EP N° 5,51,Andres Burgues,3407406148
Ramallo,Escuela EP N° 5,52,Andres Burgues,3407406148
Ramallo,Escuela EP N° 6,53,Andres Burgues,3407406148
Ramallo,Escuela EP N° 6,54,Andres Burgues,3407406148
Ramallo,Escuela EP N° 6,55,Andres Burgues,3407406148
Ramallo,Escuela EP N° 6,56,Andres Burgues,3407406148
Ramallo,Escuela EP N° 6,57,Andres Burgues,3407406148
Ramallo,Escuela EP N° 6,58,Andres Burgues,3407406148
Ramallo,Escuela EP N° 6,59,Andres Burgues,3407406148
Ramallo,Escuela EP N° 6,60,Andres Burgues,3407406148
Ramallo,Escuela Est N° 1,61,Andres Burgues,3407406148
Ramallo,Escuela Est N° 1,62,Andres Burgues,3407406148
Ramallo,Escuela Est N° 1,63,Andres Burgues,3407406148
Ramallo,Escuela Est N° 1,64,Andres Burgues,3407406148
Ramallo,Escuela Est N° 1,65,Andres Burgues,3407406148
Ramallo,Escuela Est N° 1,66,Andres Burgues,3407406148
Ramallo,Escuela Est N° 1,67,Andres Burgues,3407406148
Ramallo,Escuela EP N° 27 ES N° 4,68,Andres Burgues,3407406148
Ramallo,Escuela EP N° 27 ES N° 4,69,Andres Burgues,3407406148
Ramallo,Escuela EP N° 27 ES N° 4,70,Andres Burgues,3407406148
Ramallo,Escuela EP N° 27 ES N° 4,71,Andres Burgues,3407406148
Ramallo,Escuela EP N° 4,72,Andres Burgues,3407406148
Ramallo,Escuela EP N° 4,73,Andres Burgues,3407406148
Ramallo,Escuela EP N° 4,74,Andres Burgues,3407406148
Ramallo,Escuela EP N° 4,75,Andres Burgues,3407406148
Ramallo,Escuela EP N° 4,76,Andres Burgues,3407406148
Ramallo,Escuela EP N° 4,77,Andres Burgues,3407406148
Ramallo,Escuela EP N° 2,78,Andres Burgues,3407406148
Ramallo,Escuela EP N° 2,79,Andres Burgues,3407406148
Ramallo,Escuela EP N° 24,80,Andres Burgues,3407406148
Ramallo,Escuela EP N° 24,81,Andres Burgues,3407406148
Ramallo,Escuela EP N° 24,82,Andres Burgues,3407406148
Ramallo,Escuela EP N° 24,83,Andres Burgues,3407406148
Ramallo,Escuela EP N° 16,84,Andres Burgues,3407406148
Ramallo,Escuela EP N° 16,85,Andres Burgues,3407406148
Ramallo,Escuela EP N° 16,86,Andres Burgues,3407406148
Ramallo,Escuela EP N° 16,87,Andres Burgues,3407406148
Ramallo,Escuela EP N° 16,88,Andres Burgues,3407406148
Ramallo,Escuela ES N° 8 Est N° 2,89,Andres Burgues,3407406148
Ramallo,Escuela ES N° 8 Est N° 2,90,Andres Burgues,3407406148
Ramallo,Escuela ES N° 8 Est N° 2,91,Andres Burgues,3407406148
Ramallo,Escuela ES N° 8 Est N° 2,92,Andres Burgues,3407406148
Ramallo,Escuela EP N° 25 ES N° 7,93,Andres Burgues,3407406148
Ramallo,Escuela EP N° 25 ES N° 7,94,Andres Burgues,3407406148
Ramallo,Jardin De InfantES N° 902,9001,Andres Burgues,3407406148
Rojas,Jardin De InfantES N° 904,1,Julian Finelli,3364024379
Rojas,Jardin De InfantES N° 904,2,Julian Finelli,3364024379
Rojas,Escuela Reconocida San Jose,3,Julian Finelli,3364024379
Rojas,Escuela Reconocida San Jose,4,Julian Finelli,3364024379
Rojas,Escuela Reconocida San Jose,5,Julian Finelli,3364024379
Rojas,Escuela Reconocida San Jose,6,Julian Finelli,3364024379
Rojas,Escuela Reconocida San Jose,7,Julian Finelli,3364024379
Rojas,Escuela Reconocida San Jose,8,Julian Finelli,3364024379
Rojas,Escuela EP N° 3,9,Julian Finelli,3364024379
Rojas,Escuela EP N° 3,10,Julian Finelli,3364024379
Rojas,Escuela EP N° 3,11,Julian Finelli,3364024379
Rojas,Escuela ES N° 5,12,Julian Finelli,3364024379
Rojas,Escuela ES N° 5,13,Julian Finelli,3364024379
Rojas,Escuela ES N° 5,14,Julian Finelli,3364024379
Rojas,Escuela ES N° 5,15,Julian Finelli,3364024379
Rojas,Escuela ES N° 5,16,Julian Finelli,3364024379
Rojas,Escuela ES N° 5,17,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,18,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,19,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,20,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,21,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,22,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,23,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,24,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,25,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,26,Julian Finelli,3364024379
Rojas,Escuela Educ. Especial N° 501,27,Julian Finelli,3364024379
Rojas,Escuela Educ. Especial N° 501,28,Julian Finelli,3364024379
Rojas,Escuela Educ. Especial N° 501,29,Julian Finelli,3364024379
Rojas,Escuela Educ. Especial N° 501,30,Julian Finelli,3364024379
Rojas,Escuela Educ. Especial N° 501,31,Julian Finelli,3364024379
Rojas,Escuela ES N° 6,32,Julian Finelli,3364024379
Rojas,Escuela ES N° 6,33,Julian Finelli,3364024379
Rojas,Escuela ES N° 6,34,Julian Finelli,3364024379
Rojas,Escuela ES N° 6,35,Julian Finelli,3364024379
Rojas,Escuela EP N° 11,36,Julian Finelli,3364024379
Rojas,Escuela EP N° 11,37,Julian Finelli,3364024379
Rojas,Escuela EP N° 11,38,Julian Finelli,3364024379
Rojas,Escuela EP N° 11,39,Julian Finelli,3364024379
Rojas,Escuela EP N° 11,40,Julian Finelli,3364024379
Rojas,Escuela EP N° 11,41,Julian Finelli,3364024379
Rojas,Centro Educativo Complementario Nº1,42,Julian Finelli,3364024379
Rojas,Centro Educativo Complementario Nº1,43,Julian Finelli,3364024379
Rojas,Escuela EP N° 8,44,Julian Finelli,3364024379
Rojas,Escuela EP N° 8,45,Julian Finelli,3364024379
Rojas,Escuela EP N° 8,46,Julian Finelli,3364024379
Rojas,Escuela EP N° 8,47,Julian Finelli,3364024379
Rojas,Escuela EP N° 8,48,Julian Finelli,3364024379
Rojas,Escuela EP N° 15,49,Julian Finelli,3364024379
Rojas,Escuela EP N° 15,50,Julian Finelli,3364024379
Rojas,Escuela EP N° 15,51,Julian Finelli,3364024379
Rojas,Escuela EP N° 15,52,Julian Finelli,3364024379
Rojas,Escuela EP N° 15,53,Julian Finelli,3364024379
Rojas,Escuela EP N° 15,54,Julian Finelli,3364024379
Rojas,Centro De Educacion Fisica N° 109,55,Julian Finelli,3364024379
Rojas,Ctro. Educ. Para La Produc. N° 10,56,Julian Finelli,3364024379
Rojas,Escuela EP N° 5,57,Julian Finelli,3364024379
Rojas,Escuela EP N° 7 ES N° 1,58,Julian Finelli,3364024379
Rojas,Escuela EP N° 7 ES N° 1,59,Julian Finelli,3364024379
Rojas,Escuela EP N° 7 ES N° 1,60,Julian Finelli,3364024379
Rojas,Escuela EP N° 29,61,Julian Finelli,3364024379
Rojas,Escuela EP N° 25,62,Julian Finelli,3364024379
Rojas,Escuela EP N° 2,63,Julian Finelli,3364024379
Rojas,Escuela EP N° 2,64,Julian Finelli,3364024379
Rojas,Escuela EP N° 2,65,Julian Finelli,3364024379
Rojas,Escuela EP N° 2,66,Julian Finelli,3364024379
Rojas,Escuela EP N° 30 ES N° 4,9001,Julian Finelli,3364024379
Salto,Escuela EP N° 7 ES N° 4,1,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 7 ES N° 4,2,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 7 ES N° 4,3,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 7 ES N° 4,4,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 7 ES N° 4,5,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 7 ES N° 4,6,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 7 ES N° 4,7,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 7 ES N° 4,8,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 27,9,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 27,10,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 27,11,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 27,12,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 27,13,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 27,14,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 27,15,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,16,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,17,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,18,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,19,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,20,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,21,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,22,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,23,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 1 ES N° 3,24,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 6,25,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 6,26,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 6,27,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 6,28,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 6,29,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 6,30,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 6,31,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 6,32,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 30ES N° 1,33,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 30ES N° 1,34,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 30ES N° 1,35,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 30ES N° 1,36,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 30ES N° 1,37,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 30ES N° 1,38,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 30ES N° 1,39,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 30ES N° 1,40,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 3,41,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 3,42,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 3,43,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 3,44,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 3,45,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,46,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,47,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,48,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,49,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,50,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,51,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,52,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,53,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 2,54,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 29 ES N° 6,55,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 29 ES N° 6,56,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 29 ES N° 6,57,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 29 ES N° 6,58,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 29 ES N° 6,59,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 29 ES N° 6,60,Lisandro Landaburu,3364682836
Salto,Escuela EP N° 29 ES N° 6,61,Lisandro Landaburu,3364682836
Salto,Escuela ES N° 2,62,Lisandro Landaburu,3364682836
Salto,Escuela ES N° 2,63,Lisandro Landaburu,3364682836
Salto,Colegio San Jose Epes,64,Lisandro Landaburu,3364682836
Salto,Colegio San Jose Epes,65,Lisandro Landaburu,3364682836
Salto,Colegio San Jose Epes,66,Lisandro Landaburu,3364682836
Salto,Colegio San Jose Epes,67,Lisandro Landaburu,3364682836
Salto,Colegio San Jose Epes,68,Lisandro Landaburu,3364682836
Salto,Colegio San Jose Epes,69,Lisandro Landaburu,3364682836
Salto,Colegio San Jose Epes,70,Lisandro Landaburu,3364682836
Salto,Colegio San Jose Epes,71,Nora Aguilera,3364520101
Salto,Escuela Est N° 1,72,Nora Aguilera,3364520101
Salto,Escuela Est N° 1,73,Nora Aguilera,3364520101
Salto,Escuela Est N° 1,74,Nahuel Burrutia,3407511792
Salto,Escuela Est N° 1,75,Nahuel Burrutia,3407511792
Salto,Escuela Est N° 1,76,Nahuel Burrutia,3407511792
Salto,Escuela Est N° 1,77,Nahuel Burrutia,3407511792
Salto,Escuela Est N° 1,78,Nahuel Burrutia,3407511792
Salto,Escuela Est N° 1,79,Nahuel Burrutia,3407511792
,Salto Escuela ES N° 7,80,Nahuel Burrutia,3407511792
Salto,Escuela ES N° 7,81,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 16,82,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 16,83,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 16,84,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 9,85,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 5,86,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 5,87,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 5,88,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 8,89,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 8,90,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 8,91,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 13,92,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 10,93,Nahuel Burrutia,3407511792
Salto,Escuela EP N° 14 ES N° 3 Anexo 3031,94,Nahuel Burrutia,3407511792
Salto,Escuela ES N° 2,9001,Nahuel Burrutia,3407511792
San Andres de Giles,Escuela EP N° 1 ES N° 1,1,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 1 ES N° 1,2,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 1 ES N° 1,3,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 1 ES N° 1,4,Roberto Simiani,3364564540
San Andres de Giles,Colegio Sagrada Familia Epes,5,Roberto Simiani,3364564540
San Andres de Giles,Colegio Sagrada Familia Epes,6,Roberto Simiani,3364564540
San Andres de Giles,Colegio Sagrada Familia Epes,7,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 12 ES N° 9,8,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 12 ES N° 9,9,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 12 ES N° 9,10,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 12 ES N° 9,11,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 12 ES N° 9,12,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 12 ES N° 9,13,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 12 ES N° 9,14,Roberto Simiani,3364564540
San Andres de Giles,Ctro. Educ. Complementario N° 801,15,Roberto Simiani,3364564540
San Andres de Giles,Ctro. Educ. Complementario N° 801,16,Roberto Simiani,3364564540
San Andres de Giles,Ctro. Educ. Complementario N° 801,17,Roberto Simiani,3364564540
San Andres de Giles,Escuela Est N° 1,18,Roberto Simiani,3364564540
San Andres de Giles,Escuela Est N° 1,19,Roberto Simiani,3364564540
San Andres de Giles,Escuela Est N° 1,20,Roberto Simiani,3364564540
San Andres de Giles,Escuela Est N° 1,21,Roberto Simiani,3364564540
San Andres de Giles,Escuela Est N° 1,22,Roberto Simiani,3364564540
San Andres de Giles,Escuela Est N° 1,23,Roberto Simiani,3364564540
San Andres de Giles,Escuela Est N° 1,24,Roberto Simiani,3364564540
San Andres de Giles,Escuela Est N° 1,25,Roberto Simiani,3364564540
San Andres de Giles,Escuela Educ. Especial N° 501,26,Roberto Simiani,3364564540
San Andres de Giles,Escuela Educ. Especial N° 501,27,Roberto Simiani,3364564540
San Andres de Giles,Escuela Educ. Especial N° 501,28,Roberto Simiani,3364564540
San Andres de Giles,Escuela Educ. Especial N° 501,29,Roberto Simiani,3364564540
San Andres de Giles,Escuela Educ. Especial N° 501,30,Roberto Simiani,3364564540
San Andres de Giles,Escuela Educ. Especial N° 501,31,Roberto Simiani,3364564540
San Andres de Giles,Escuela Educ. Especial N° 501,32,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 3 ES N° 8,33,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 3 ES N° 8,34,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 3 ES N° 8,35,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 3 ES N° 8,36,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 3 ES N° 8,37,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 3 ES N° 8,38,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 3 ES N° 8,39,Roberto Simiani,3364564540
San Andres de Giles,Escuela ES N° 2 Escuela EP N° 26,40,Roberto Simiani,3364564540
San Andres de Giles,Escuela ES N° 2 Escuela EP N° 26,41,Roberto Simiani,3364564540
San Andres de Giles,Escuela ES N° 2 Escuela EP N° 26,42,Roberto Simiani,3364564540
San Andres de Giles,Escuela ES N° 2 Escuela EP N° 26,43,Roberto Simiani,3364564540
San Andres de Giles,Escuela ES N° 2 Escuela EP N° 26,44,Roberto Simiani,3364564540
San Andres de Giles,Escuela ES N° 2 Escuela EP N° 26,45,Roberto Simiani,3364564540
San Andres de Giles,Escuela ES N° 2 Escuela EP N° 26,46,Roberto Simiani,3364564540
San Andres de Giles,Escuela ES N° 2 Escuela EP N° 26,47,Roberto Simiani,3364564540
San Andres de Giles,Colegio Ntra. Sra. De Lujan Epes,48,Roberto Simiani,3364564540
San Andres de Giles,Colegio Ntra. Sra. De Lujan Epes,49,Roberto Simiani,3364564540
San Andres de Giles,Colegio Ntra. Sra. De Lujan Epes,50,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 10ES N° 4,51,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 10ES N° 4,52,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 23,53,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 23,54,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 8 ES N° 7,55,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 8 ES N° 7,56,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 8 ES N° 7,57,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 8 ES N° 7,58,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 4 ES N° 10,59,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 4 ES N° 10,60,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 5 ES N° 3,61,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 5 ES N° 3,62,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 5 ES N° 3,63,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 19 ES N° 5,64,Roberto Simiani,3364564540
San Andres de Giles,Escuela EP N° 19 ES N° 5,65,Roberto Simiani,3364564540
San Andres de Giles,Jardin De InfantES N° 903,9001,Roberto Simiani,3364564540
San Andres de Giles,Jardin De InfantES N° 903,9002,Roberto Simiani,3364564540
San Antonio de Areco,Escuela EP N° 1,1,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 1,2,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 1,3,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 1,4,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 1,5,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 1,6,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 1,7,Tobias Journet,3407444501
San Antonio de Areco,Coleg. Sta. Maria De La Asuncion,8,Tobias Journet,3407444501
San Antonio de Areco,Coleg. Sta. Maria De La Asuncion,9,Tobias Journet,3407444501
San Antonio de Areco,Coleg. Sta. Maria De La Asuncion,10,Tobias Journet,3407444501
San Antonio de Areco,Coleg. Sta. Maria De La Asuncion,11,Tobias Journet,3407444501
San Antonio de Areco,Coleg. Sta. Maria De La Asuncion,12,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 1,13,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 1,14,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 1,15,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 1,16,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 1,17,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 1,18,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 1,19,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 1,20,Tobias Journet,3407444501
San Antonio de Areco,Escuela Municipal Belgrano,21,Tobias Journet,3407444501
San Antonio de Areco,Escuela Municipal Belgrano,22,Tobias Journet,3407444501
San Antonio de Areco,Escuela Municipal Belgrano,23,Tobias Journet,3407444501
San Antonio de Areco,Escuela Est N° 1,24,Tobias Journet,3407444501
San Antonio de Areco,Escuela Est N° 1,25,Tobias Journet,3407444501
San Antonio de Areco,Escuela Est N° 1,26,Tobias Journet,3407444501
San Antonio de Areco,Escuela Est N° 1,27,Tobias Journet,3407444501
San Antonio de Areco,Escuela Est N° 1,28,Tobias Journet,3407444501
San Antonio de Areco,Escuela Est N° 1,29,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 8,30,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 8,31,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 8,32,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 8,33,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 8,34,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 8,35,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 8,36,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 5,37,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 5,38,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 5,39,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 5,40,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 5,41,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 5,42,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 2,43,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 2,44,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 2,45,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 2,46,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 4,47,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 4,48,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 4,49,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 4,50,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 4,51,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 4,52,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 5 ES N° 4,53,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 5 ES N° 4,54,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 5 ES N° 4,55,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 5 ES N° 4,56,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 5 ES N° 4,57,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 9,58,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 9,59,Tobias Journet,3407444501
San Antonio de Areco,Escuela EP N° 9,60,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 3,61,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 3,62,Tobias Journet,3407444501
,San Antonio de Areco Escuela ES N° 3,63,Tobias Journet,3407444501
San Antonio de Areco,Escuela ES N° 3,64,Tobias Journet,3407444501
San Antonio de Areco,Escuela Especial N° 501 N° 502,9001,Tobias Journet,3407444501
San Antonio de Areco,Escuela Especial N° 501 N° 502,9002,Tobias Journet,3407444501
San Nicolas de los Arroyos,Escuela EP N° 1,1,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 1,2,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 1,3,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 1,4,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 1,5,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 1,6,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela ES N° 3,7,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 3,8,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 3,9,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 3,10,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 9,11,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 9,12,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 9,13,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 9,14,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 9,15,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 9,16,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 9,17,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 9,18,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Esc. Rec. N. S. De La Misericordia,19,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Esc. Rec. N. S. De La Misericordia,20,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Esc. Rec. N. S. De La Misericordia,21,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Esc. Rec. N. S. De La Misericordia,22,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Esc. Rec. N. S. De La Misericordia,23,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Esc. Rec. N. S. De La Misericordia,24,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Esc. Rec. N. S. De La Misericordia,25,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Esc. Rec. N. S. De La Misericordia,26,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela Est N° 3,27,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela Est N° 3,28,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela Est N° 3,29,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela Est N° 3,30,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 16 ES N° 16,31,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 16 ES N° 16,32,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 16 ES N° 16,33,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 16 ES N° 16,34,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 16 ES N° 16,35,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 16 ES N° 16,36,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Colegio Maria Auxiliadora,37,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Colegio Maria Auxiliadora,38,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Colegio Maria Auxiliadora,39,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 12 ES N° 13,40,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 12 ES N° 13,41,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 12 ES N° 13,42,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 12 ES N° 13,43,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 12 ES N° 13,44,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 12 ES N° 13,45,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 4 ES N° 26,46,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 4 ES N° 26,47,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 4 ES N° 26,48,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 4 ES N° 26,49,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 4 ES N° 26,50,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 4 ES N° 26,51,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 4 ES N° 26,52,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 4 ES N° 26,53,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 49 ES N° 12,54,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 49 ES N° 12,55,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 49 ES N° 12,56,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 49 ES N° 12,57,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 49 ES N° 12,58,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 10ES N° 15,59,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 10ES N° 15,60,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 10ES N° 15,61,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 10ES N° 15,62,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 10ES N° 15,63,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 10ES N° 15,64,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 10ES N° 15,65,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Instituto Fray Luis Beltran,66,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Instituto Fray Luis Beltran,67,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Instituto Fray Luis Beltran,68,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Instituto Fray Luis Beltran,69,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Instituto Fray Luis Beltran,70,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Instituto Fray Luis Beltran,71,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Instituto Fray Luis Beltran,72,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Instituto Fray Luis Beltran,73,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 6,74,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 6,75,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 6,76,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 6,77,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 6,78,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 6,79,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 6,80,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 6,81,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 2,82,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 2,83,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 2,84,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 2,85,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 2,86,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 2,87,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 2,88,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 2,89,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 2,90,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela De La Paz,91,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela De La Paz,92,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela De La Paz,93,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela De La Paz,94,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,95,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,96,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,97,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,98,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,99,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,100,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,101,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,102,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 20ES N° 22,103,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,104,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,105,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,106,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,107,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,108,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,109,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,110,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,111,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 31 ES N° 20,112,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 4,113,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 4,114,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 4,115,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 4,116,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 4,117,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 4,118,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 11,119,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 11,120,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 11,121,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 11,122,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 11,123,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 11,124,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 11,125,Braian Galarza,3364348407
San Nicolas de los Arroyos,Instituto San Javier,126,Braian Galarza,3364348407
San Nicolas de los Arroyos,Instituto San Javier,127,Braian Galarza,3364348407
San Nicolas de los Arroyos,Instituto San Javier,128,Braian Galarza,3364348407
San Nicolas de los Arroyos,Instituto San Javier,129,Braian Galarza,3364348407
San Nicolas de los Arroyos,Instituto San Javier,130,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,131,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,132,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,133,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,134,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,135,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,136,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,137,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,138,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 7 ES N° 19,139,Braian Galarza,3364348407
San Nicolas de los Arroyos,Centro De Formacion Integral Nº1,140,Braian Galarza,3364348407
San Nicolas de los Arroyos,Centro De Formacion Integral Nº1,141,Braian Galarza,3364348407
San Nicolas de los Arroyos,Centro De Formacion Integral Nº1,142,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Centro De Formacion Integral Nº1,143,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Centro De Formacion Integral Nº1,144,Fontana Roman,3364186434
San Nicolas de los Arroyos,Centro De Formacion Integral Nº1,145,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Jardin De InfantES Nº910,146,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Jardin De InfantES Nº910,147,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Jardin De InfantES Nº910,148,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 17,149,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 17,150,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 17,151,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 17,152,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 17,153,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 17,154,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Jardin De InfantES N° 911,155,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Jardin De InfantES N° 911,156,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Jardin De InfantES N° 911,157,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Jardin De InfantES N° 911,158,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,159,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,160,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,161,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,162,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,163,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,164,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,165,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,166,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,167,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,168,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 29,169,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 40ES N° 13 Anexo,170,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 40ES N° 13 Anexo,171,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 40ES N° 13 Anexo,172,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 40ES N° 13 Anexo,173,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 40ES N° 13 Anexo,174,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 40ES N° 13 Anexo,175,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 40ES N° 13 Anexo,176,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,177,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,178,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,179,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,180,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,181,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,182,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,183,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,184,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Colegio Don Bosco,185,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Jardin De InfantES Nº923,186,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Jardin De InfantES Nº923,187,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Jardin De InfantES Nº923,188,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,189,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,190,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,191,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,192,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,193,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,194,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,195,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,196,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,197,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela ES N° 10,198,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 30,199,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 30,200,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 30,201,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 30,202,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 30,203,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 30,204,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela Est N° 6,205,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela Est N° 6,206,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela Est N° 6,207,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela Est N° 6,208,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela Est N° 6,209,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 42,210,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 42,211,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 42,212,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 42,213,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,214,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,215,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,216,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,217,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,218,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,219,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,220,Morales Guillermo,3364300110
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,221,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela EP N° 34 ES N° 7Anexo,222,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela ES N° 7,223,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela ES N° 7,224,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela ES N° 7,225,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Escuela ES N° 7,226,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Jardin De InfantES N° 912,227,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Jardin De InfantES N° 912,228,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 19,229,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 19,230,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 19,231,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 19,232,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 19,233,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 19,234,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 19,235,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 35 ES N° 6 Anexo,236,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 35 ES N° 6 Anexo,237,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 35 ES N° 6 Anexo,238,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 35 ES N° 6 Anexo,239,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 35 ES N° 6 Anexo,240,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 35 ES N° 6 Anexo,241,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 35 ES N° 6 Anexo,242,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 15,243,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 15,244,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 15,245,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,246,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,247,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,248,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,249,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,250,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,251,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,252,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,253,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,254,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 44 ES N° 21,255,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela Educ. Especial N° 504,256,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela Educ. Especial N° 504,257,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela Educ. Especial N° 504,258,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela Educ. Especial N° 504,259,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 47 ES N° 6,260,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 47 ES N° 6,261,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 47 ES N° 6,262,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 47 ES N° 6,263,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 47 ES N° 6,264,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 47 ES N° 6,265,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 47 ES N° 6,266,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 47 ES N° 6,267,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,268,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,269,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,270,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,271,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,272,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,273,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,274,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,275,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,276,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 48 ES N° 25,277,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Jardin De InfantES N° 926,278,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Jardin De InfantES N° 926,279,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Jardin De InfantES N° 926,280,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Jardin De InfantES N° 926,281,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Jardin De InfantES N° 926,282,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Jardin De InfantES Nº922,283,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Jardin De InfantES Nº922,284,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,285,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,286,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,287,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,288,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,289,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,290,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,291,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,292,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,293,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar,294,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar - Edif 2,295,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar - Edif 2,296,Nora Aguilera,3364520101
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar - Edif 2,297,Fontana Roman,3364186434
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar - Edif 2,298,Fontana Roman,3364186434
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar - Edif 2,299,Fontana Roman,3364186434
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar - Edif 2,300,Fontana Roman,3364186434
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar - Edif 2,301,Fontana Roman,3364186434
San Nicolas de los Arroyos,Inst. Tecnologico R. De Aguiar - Edif 2,302,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,303,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,304,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,305,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,306,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,307,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,308,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,309,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,310,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 45 ES N° 5 Extension,311,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela ES N° 5,312,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela ES N° 5,313,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela ES N° 5,314,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela ES N° 5,315,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela ES N° 5,316,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela ES N° 5,317,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 43 ES N° 23,318,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 43 ES N° 23,319,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 43 ES N° 23,320,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 43 ES N° 23,321,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 43 ES N° 23,322,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 43 ES N° 23,323,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 43 ES N° 23,324,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 43 ES N° 23,325,Fontana Roman,3364186434
San Nicolas de los Arroyos,Jardin De InfantES Nº918,326,Fontana Roman,3364186434
San Nicolas de los Arroyos,Jardin De InfantES Nº918,327,Fontana Roman,3364186434
San Nicolas de los Arroyos,Jardin De InfantES Nº917,328,Fontana Roman,3364186434
San Nicolas de los Arroyos,Jardin De InfantES Nº917,329,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 46 ES N° 24,330,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 46 ES N° 24,331,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 46 ES N° 24,332,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 46 ES N° 24,333,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 46 ES N° 24,334,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 46 ES N° 24,335,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 13,336,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 13,337,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 13,338,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 13,339,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 13,340,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 13,341,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 13,342,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 33,343,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 33,344,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 33,345,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 33,346,Fontana Roman,3364186434
San Nicolas de los Arroyos,Jardin De InfantES N° 921,347,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 8 ES N° 14,348,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 8 ES N° 14,349,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 8 ES N° 14,350,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 8 ES N° 14,351,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 8 ES N° 14,352,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 25,353,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 25,354,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 14 ES N° 18,355,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 14 ES N° 18,356,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 14 ES N° 18,357,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 14 ES N° 18,358,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 14 ES N° 18,359,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 14 ES N° 18,360,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 18,361,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 18,362,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 18,363,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 18,364,Fontana Roman,3364186434
San Nicolas de los Arroyos,Escuela EP N° 18,365,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela Est N° 5,366,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela Est N° 5,367,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela Est N° 5,368,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela Est N° 5,369,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela Est N° 5,370,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela ES N° 8,371,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela ES N° 8,372,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela ES N° 8,373,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 8,374,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela ES N° 8,375,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 38,9001,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 38,9002,Castañeira Matias,3364273449
San Nicolas de los Arroyos,Escuela EP N° 38,9003,Braian Galarza,3364348407
San Nicolas de los Arroyos,Escuela EP N° 38,9004,Canto Alfredo,3364496756
San Nicolas de los Arroyos,Escuela EP N° 38,9005,Fontana Roman,3364186434
San Pedro,Escuela EP N° 1 ES N° 8,1,Nahuel Burrutia,3407511792
San Pedro,Escuela EP N° 1 ES N° 8,2,Nahuel Burrutia,3407511792
San Pedro,Escuela EP N° 1 ES N° 8,3,Nahuel Burrutia,3407511792
San Pedro,Escuela EP N° 1 ES N° 8,4,Nahuel Burrutia,3407511792
San Pedro,Escuela EP N° 1 ES N° 8,5,Nahuel Burrutia,3407511792
San Pedro,Escuela EP N° 1 ES N° 8,6,Nahuel Burrutia,3407511792
San Pedro,Escuela EP N° 1 ES N° 8,7,Nahuel Burrutia,3407511792
San Pedro,Escuela EP N° 1 ES N° 8,8,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,9,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,10,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,11,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,12,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,13,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,14,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,15,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,16,Nahuel Burrutia,3407511792
San Pedro,Instituto Nuestra Senora Del Socorro,17,Nahuel Burrutia,3407511792
San Pedro,Colegio San Francisco De Asis,18,Nahuel Burrutia,3407511792
San Pedro,Colegio San Francisco De Asis,19,Nahuel Burrutia,3407511792
San Pedro,Colegio San Francisco De Asis,20,Franco Ciladi,3364036372
San Pedro,Colegio San Francisco De Asis,21,Franco Ciladi,3364036372
San Pedro,Colegio San Francisco De Asis,22,Franco Ciladi,3364036372
San Pedro,Colegio San Francisco De Asis,23,Franco Ciladi,3364036372
San Pedro,Escuela De Educacion Especial N° 502,24,Franco Ciladi,3364036372
San Pedro,Escuela De Educacion Especial N° 502,25,Franco Ciladi,3364036372
San Pedro,Escuela De Educacion Especial N° 502,26,Franco Ciladi,3364036372
San Pedro,Escuela De Educacion Especial N° 502,27,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 6,28,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 6,29,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 6,30,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 6,31,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 6,32,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 6,33,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 6,34,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 6,35,Franco Ciladi,3364036372
San Pedro,Escuela Est N° 1,36,Franco Ciladi,3364036372
San Pedro,Escuela Est N° 1,37,Franco Ciladi,3364036372
San Pedro,Escuela Est N° 1,38,Franco Ciladi,3364036372
San Pedro,Escuela Est N° 1,39,Franco Ciladi,3364036372
San Pedro,Escuela Est N° 1,40,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,41,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,42,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,43,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,44,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,45,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,46,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,47,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,48,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 4 ES N° 11,49,Franco Ciladi,3364036372
San Pedro,Club Atletico Los Andes,50,Franco Ciladi,3364036372
San Pedro,Club Atletico Los Andes,51,Franco Ciladi,3364036372
San Pedro,Club Atletico Los Andes,52,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 27 ES N° 17,53,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 27 ES N° 17,54,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 27 ES N° 17,55,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 27 ES N° 17,56,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 27 ES N° 17,57,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 27 ES N° 17,58,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 27 ES N° 17,59,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,60,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,61,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,62,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,63,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,64,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,65,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,66,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,67,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 43 ES N° 15,68,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,69,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,70,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,71,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,72,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,73,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,74,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,75,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,76,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,77,Franco Ciladi,3364036372
San Pedro,Escuela EP N° 7 ES N° 7,78,Franco Ciladi,3364036372
San Pedro,Escuela ES N° 13,79,Franco Ciladi,3364036372
San Pedro,Escuela ES N° 13,80,Franco Ciladi,3364036372
San Pedro,Escuela ES N° 13,81,Franco Ciladi,3364036372
San Pedro,Escuela ES N° 13,82,Franco Ciladi,3364036372
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,83,Franco Ciladi,3364036372
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,84,Franco Ciladi,3364036372
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,85,Franco Ciladi,3364036372
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,86,Franco Ciladi,3364036372
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,87,Franco Ciladi,3364036372
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,88,Nora Aguilera,3364520101
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,89,Nora Aguilera,3364520101
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,90,Nora Aguilera,3364520101
San Pedro,Escuela Normal Superior EP N° 46 ES N° 4,91,Nora Aguilera,3364520101
San Pedro,Escuela EP N° 3 ES N° 12,92,Nahuel Burrutia,3407511792
San Pedro,Escuela EP N° 3 ES N° 12,93,Nora Aguilera,3364520101
San Pedro,Escuela EP N° 3 ES N° 12,94,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 3 ES N° 12,95,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 3 ES N° 12,96,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 3 ES N° 12,97,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 3 ES N° 12,98,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 3 ES N° 12,99,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 3 ES N° 12,100,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 3 ES N° 12,101,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 3 ES N° 12,102,Teodoro Arancibia,3364328468
San Pedro,Escuela De Educacion Especial Nº501,103,Teodoro Arancibia,3364328468
San Pedro,Escuela De Educacion Especial Nº501,104,Teodoro Arancibia,3364328468
San Pedro,Escuela De Educacion Especial Nº501,105,Teodoro Arancibia,3364328468
San Pedro,Escuela De Educacion Especial Nº501,106,Teodoro Arancibia,3364328468
San Pedro,Escuela De Educacion Especial Nº501,107,Teodoro Arancibia,3364328468
San Pedro,Escuela De Educacion Especial Nº501,108,Teodoro Arancibia,3364328468
San Pedro,Escuela De Educacion Especial Nº501,109,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 11,110,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 11,111,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 11,112,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 11,113,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 11,114,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,115,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,116,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,117,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,118,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,119,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,120,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,121,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,122,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,123,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,124,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,125,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 13 ES N° 5,126,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 12 ES N° 9,127,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 12 ES N° 9,128,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 12 ES N° 9,129,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 12 ES N° 9,130,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 12 ES N° 9,131,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 12 ES N° 9,132,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 12 ES N° 9,133,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 10ES N° 14,134,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 10ES N° 14,135,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 10ES N° 14,136,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 10ES N° 14,137,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 10ES N° 14,138,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 10ES N° 14,139,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 48,140,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 48,141,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 48,142,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 35 ES N° 6,143,Teodoro Arancibia,3364328468
San Pedro,Instituto Santa Maria,144,Teodoro Arancibia,3364328468
San Pedro,Instituto Santa Maria,145,Teodoro Arancibia,3364328468
San Pedro,Instituto Santa Maria,146,Teodoro Arancibia,3364328468
San Pedro,Instituto Santa Maria,147,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 35 ES N° 6,148,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 35 ES N° 6,149,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 35 ES N° 6,150,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 35 ES N° 6,151,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 35 ES N° 6,152,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 20,153,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 39,154,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 23 ES N° 18,155,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 23 ES N° 18,156,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 26,157,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 26,158,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 26,159,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 26,160,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 22,161,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 22,162,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 22,163,Teodoro Arancibia,3364328468
San Pedro,Escuela EP N° 22,164,Nahuel Burrutia,3407511792
San Pedro,Jardin De InfantES Nº902,9001,Franco Ciladi,3364036372
San Pedro,Jardin De InfantES Nº902,9002,Franco Ciladi,3364036372
Zarate,Escuela EP N° 7 ES N° 14,1,Nora Aguilera,3364520101
Zarate,Escuela EP N° 7 ES N° 14,2,Nora Aguilera,3364520101
Zarate,Escuela EP N° 7 ES N° 14,3,Graciela Fondato,3364396973
Zarate,Escuela EP N° 7 ES N° 14,4,Graciela Fondato,3364396973
Zarate,Escuela EP N° 7 ES N° 14,5,Graciela Fondato,3364396973
Zarate,Escuela EP N° 7 ES N° 14,6,Nahuel Burrutia,3407511792
Zarate,Escuela EP N° 7 ES N° 14,7,Nahuel Burrutia,3407511792
Zarate,Escuela Est N° 3,8,Nahuel Burrutia,3407511792
Zarate,Escuela Est N° 3,9,Nahuel Burrutia,3407511792
Zarate,Escuela Est N° 3,10,Nahuel Burrutia,3407511792
Zarate,Escuela Est N° 3,11,Nahuel Burrutia,3407511792
Zarate,Escuela Est N° 3,12,Tobias Journet,3407444501
Zarate,Escuela Est N° 3,13,Tobias Journet,3407444501
Zarate,Escuela Est N° 3,14,Tobias Journet,3407444501
Zarate,Escuela Est N° 3,15,Tobias Journet,3407444501
Zarate,Escuela EP N° 1 ES N° 11 Anexo 1,16,Graciela Fondato,3364396973
Zarate,Escuela EP N° 1 ES N° 11 Anexo 1,17,Graciela Fondato,3364396973
Zarate,Escuela EP N° 1 ES N° 11 Anexo 1,18,Graciela Fondato,3364396973
Zarate,Escuela EP N° 1 ES N° 11 Anexo 1,19,Graciela Fondato,3364396973
Zarate,Escuela EP N° 1 ES N° 11 Anexo 1,20,Nora Aguilera,3364520101
Zarate,Escuela EP N° 1 ES N° 11 Anexo 1,21,Nora Aguilera,3364520101
Zarate,Escuela EP N° 1 ES N° 11 Anexo 1,22,Nora Aguilera,3364520101
Zarate,Escuela EP N° 1 ES N° 11 Anexo 1,23,Nora Aguilera,3364520101
Zarate,Escuela EP N° 10ES N° 22,24,Nora Aguilera,3364520101
Zarate,Escuela EP N° 10ES N° 22,25,Julio Maldonado,3364651063
Zarate,Escuela EP N° 10ES N° 22,26,Julio Maldonado,3364651063
Zarate,Escuela EP N° 10ES N° 22,27,Julio Maldonado,3364651063
Zarate,Escuela EP N° 10ES N° 22,28,Julio Maldonado,3364651063
Zarate,Escuela EP N° 10ES N° 22,29,Julio Maldonado,3364651063
Zarate,Escuela EP N° 10ES N° 22,30,Julio Maldonado,3364651063
Zarate,Escuela EP N° 2 ES N° 11,31,Julio Maldonado,3364651063
Zarate,Escuela EP N° 2 ES N° 11,32,Julio Maldonado,3364651063
Zarate,Escuela EP N° 2 ES N° 11,33,Julio Maldonado,3364651063
Zarate,Escuela EP N° 2 ES N° 11,34,Julio Maldonado,3364651063
Zarate,Escuela EP N° 2 ES N° 11,35,Julio Maldonado,3364651063
Zarate,Escuela EP N° 2 ES N° 11,36,Julio Maldonado,3364651063
Zarate,Escuela EP N° 2 ES N° 11,37,Julio Maldonado,3364651063
Zarate,Escuela EP N° 2 ES N° 11,38,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,39,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,40,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,41,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,42,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,43,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,44,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,45,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,46,Julio Maldonado,3364651063
Zarate,Escuela EP N° 3,47,Julio Maldonado,3364651063
Zarate,Escuela EP N° 4 ES N° 23,48,Julio Maldonado,3364651063
Zarate,Escuela EP N° 4 ES N° 23,49,Julio Maldonado,3364651063
Zarate,Escuela EP N° 4 ES N° 23,50,Julio Maldonado,3364651063
Zarate,Escuela EP N° 4 ES N° 23,51,Julio Maldonado,3364651063
Zarate,Escuela EP N° 4 ES N° 23,52,Julio Maldonado,3364651063
Zarate,Escuela EP N° 4 ES N° 23,53,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,54,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,55,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,56,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,57,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,58,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,59,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,60,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,61,Julio Maldonado,3364651063
Zarate,Escuela EP N° 5,62,Julio Maldonado,3364651063
Zarate,Jardin De InfantES N° 910,63,Julio Maldonado,3364651063
Zarate,Jardin De InfantES N° 910,64,Julio Maldonado,3364651063
Zarate,Escuela EP N° 28,65,Julio Maldonado,3364651063
Zarate,Escuela EP N° 28,66,Julio Maldonado,3364651063
Zarate,Escuela EP N° 28,67,Julio Maldonado,3364651063
Zarate,Escuela EP N° 28,68,Julio Maldonado,3364651063
Zarate,Escuela EP N° 28,69,Julio Maldonado,3364651063
Zarate,Escuela EP N° 28,70,Julio Maldonado,3364651063
Zarate,Escuela EP N° 28,71,Julio Maldonado,3364651063
Zarate,Escuela EP N° 28,72,Julio Maldonado,3364651063
Zarate,Escuela ES N° 13,73,Julio Maldonado,3364651063
Zarate,Escuela ES N° 13,74,Julio Maldonado,3364651063
Zarate,Escuela ES N° 13,75,Julio Maldonado,3364651063
Zarate,Escuela ES N° 13,76,Julio Maldonado,3364651063
Zarate,Escuela ES N° 13,77,Julio Maldonado,3364651063
Zarate,Escuela ES N° 13,78,Julio Maldonado,3364651063
Zarate,Escuela ES N° 13,79,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,80,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,81,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,82,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,83,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,84,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,85,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,86,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,87,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,88,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,89,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,90,Julio Maldonado,3364651063
Zarate,Escuela EP N° 29 ES N° 20,91,Julio Maldonado,3364651063
Zarate,Escuela EP N° 27,92,Julio Maldonado,3364651063
Zarate,Escuela EP N° 27,93,Julio Maldonado,3364651063
Zarate,Escuela EP N° 27,94,Julio Maldonado,3364651063
Zarate,Escuela EP N° 27,95,Nora Aguilera,3364520101
Zarate,Escuela EP N° 27,96,Nora Aguilera,3364520101
Zarate,Escuela EP N° 27,97,Nora Aguilera,3364520101
Zarate,Escuela EP N° 27,98,Nora Aguilera,3364520101
Zarate,Escuela EP N° 27,99,Nora Aguilera,3364520101
Zarate,Escuela EP N° 33,100,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 33,101,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 33,102,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 33,103,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 33,104,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 33,105,Lautaro Garzon,3364202756
Zarate,Escuela Educ. Especial N° 502,106,Lautaro Garzon,3364202756
Zarate,Escuela Educ. Especial N° 502,107,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,108,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,109,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,110,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,111,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,112,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,113,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,114,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,115,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 26 ES N° 16,116,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,117,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,118,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,119,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,120,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,121,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,122,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,123,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,124,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 11 ES N° 8,125,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 915,126,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 915,127,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 915,128,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 915,129,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 914,130,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 914,131,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 911,132,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 911,133,Lautaro Garzon,3364202756
Zarate,Jardin De InfantES N° 911,134,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 14,135,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 14,136,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 14,137,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 14,138,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 21,139,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 21,140,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 21,141,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 21,142,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 21,143,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 21,144,Lautaro Garzon,3364202756
Zarate,Escuela Evang. Dr. F. J. Hotton,145,Lautaro Garzon,3364202756
Zarate,Escuela Evang. Dr. F. J. Hotton,146,Lautaro Garzon,3364202756
Zarate,Escuela Evang. Dr. F. J. Hotton,147,Lautaro Garzon,3364202756
Zarate,Escuela Evang. Dr. F. J. Hotton,148,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,149,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,150,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,151,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,152,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,153,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,154,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,155,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,156,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,157,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,158,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 6 ES N° 17,159,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 37 ES N° 4,160,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 37 ES N° 4,161,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 37 ES N° 4,162,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 37 ES N° 4,163,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 37 ES N° 4,164,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 37 ES N° 4,165,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 37 ES N° 4,166,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 37 ES N° 4,167,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 35 ES N° 21,168,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 35 ES N° 21,169,Lautaro Garzon,3364202756
Zarate,Escuela EP N° 35 ES N° 21,170,Nora Aguilera,3364520101
Zarate,Escuela EP N° 35 ES N° 21,171,Nora Aguilera,3364520101
Zarate,Escuela EP N° 35 ES N° 21,172,Nora Aguilera,3364520101
Zarate,Escuela EP N° 35 ES N° 21,173,Nora Aguilera,3364520101
Zarate,Escuela EP N° 15 EsN° 18,174,Nora Aguilera,3364520101
Zarate,Escuela EP N° 15 EsN° 18,175,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 15 EsN° 18,176,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 15 EsN° 18,177,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 15 EsN° 18,178,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 15 EsN° 18,179,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 15 EsN° 18,180,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 15 EsN° 18,181,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 15 EsN° 18,182,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 907,183,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 907,184,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 907,185,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 923,186,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 923,187,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 923,188,Mirko Cicchese,3364255536
Zarate,Escuela ES N° 9,189,Mirko Cicchese,3364255536
Zarate,Escuela ES N° 9,190,Mirko Cicchese,3364255536
Zarate,Escuela ES N° 9,191,Mirko Cicchese,3364255536
Zarate,Escuela ES N° 9,192,Mirko Cicchese,3364255536
Zarate,Escuela ES N° 9,193,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 36,194,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 36,195,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 36,196,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 36,197,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 36,198,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 36,199,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 36,200,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 36,201,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 916,202,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 916,203,Mirko Cicchese,3364255536
Zarate,Centro Educ. Complementario N° 801,204,Mirko Cicchese,3364255536
Zarate,Centro Educ. Complementario N° 801,205,Mirko Cicchese,3364255536
Zarate,Centro Educ. Complementario N° 801,206,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 903,207,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 903,208,Mirko Cicchese,3364255536
Zarate,Jardin De InfantES N° 903,209,Mirko Cicchese,3364255536
Zarate,Instituto Jose Manuel Estrada Es,210,Mirko Cicchese,3364255536
Zarate,Instituto Jose Manuel Estrada Es,211,Mirko Cicchese,3364255536
Zarate,Instituto Jose Manuel Estrada Es,212,Mirko Cicchese,3364255536
Zarate,Instituto Jose Manuel Estrada Es,213,Mirko Cicchese,3364255536
Zarate,Instituto Jose Manuel Estrada Es,214,Mirko Cicchese,3364255536
Zarate,Instituto Jose Manuel Estrada Es,215,Mirko Cicchese,3364255536
Zarate,Instituto Jose Manuel Estrada Es,216,Mirko Cicchese,3364255536
Zarate,Instituto Jose Manuel Estrada Es,217,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 23 ES N° 19,218,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 23 ES N° 19,219,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 23 ES N° 19,220,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 23 ES N° 19,221,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 23 ES N° 19,222,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 23 ES N° 19,223,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 23 ES N° 19,224,Mirko Cicchese,3364255536
Zarate,Escuela EP N° 23 ES N° 19,225,Mirko Cicchese,3364255536
Zarate,Colegio San Pablo,226,Mirko Cicchese,3364255536
Zarate,Colegio San Pablo,227,Mirko Cicchese,3364255536
Zarate,Colegio San Pablo,228,Mirko Cicchese,3364255536
Zarate,Escuela Educ. Especial N° 501,229,Mirko Cicchese,3364255536
Zarate,Escuela Educ. Especial N° 501,230,Mirko Cicchese,3364255536
Zarate,Escuela Educ. Especial N° 501,231,Mirko Cicchese,3364255536
Zarate,Instituto La Vanguardia,232,Mirko Cicchese,3364255536
Zarate,Instituto La Vanguardia,233,Mirko Cicchese,3364255536
Zarate,Instituto La Vanguardia,234,Mirko Cicchese,3364255536
Zarate,Instituto La Vanguardia,235,Mirko Cicchese,3364255536
Zarate,Instituto La Vanguardia,236,Mirko Cicchese,3364255536
Zarate,Instituto La Vanguardia,237,Mirko Cicchese,3364255536
Zarate,Instituto La Vanguardia,238,Mirko Cicchese,3364255536
Zarate,Instituto La Vanguardia,239,Mirko Cicchese,3364255536
Zarate,Escuela Est N° 1,240,Mirko Cicchese,3364255536
Zarate,Escuela Est N° 1,241,Mirko Cicchese,3364255536
Zarate,Escuela Est N° 1,242,Mirko Cicchese,3364255536
Zarate,Escuela Est N° 1,243,Mirko Cicchese,3364255536
Zarate,Escuela Est N° 1,244,Mirko Cicchese,3364255536
Zarate,Escuela Est N° 1,245,Graciela Fondato,3364396973
Zarate,Escuela Est N° 1,246,Graciela Fondato,3364396973
Zarate,Escuela Est N° 1,247,Graciela Fondato,3364396973
Zarate,Escuela Est N° 1,248,Graciela Fondato,3364396973
Zarate,Colegio De La Ciudad Ep,249,Graciela Fondato,3364396973
Zarate,Colegio De La Ciudad Ep,250,Graciela Fondato,3364396973
Zarate,Colegio De La Ciudad Ep,251,Graciela Fondato,3364396973
Zarate,Instituto San Fco. De Asis Epes,252,Graciela Fondato,3364396973
Zarate,Instituto San Fco. De Asis Epes,253,Graciela Fondato,3364396973
Zarate,Instituto San Fco. De Asis Epes,254,Graciela Fondato,3364396973
Zarate,Instituto San Fco. De Asis Epes,255,Graciela Fondato,3364396973
Zarate,Instituto San Fco. De Asis Epes,256,Graciela Fondato,3364396973
Zarate,Escuela EP N° 12 EP N° 19,257,Graciela Fondato,3364396973
Zarate,Escuela EP N° 12 EP N° 19,258,Graciela Fondato,3364396973
Zarate,Escuela EP N° 12 EP N° 19,259,Graciela Fondato,3364396973
Zarate,Escuela EP N° 12 EP N° 19,260,Graciela Fondato,3364396973
Zarate,Escuela EP N° 12 EP N° 19,261,Graciela Fondato,3364396973
Zarate,Escuela EP N° 24 ES N° 7,262,Graciela Fondato,3364396973
Zarate,Escuela EP N° 24 ES N° 7,263,Graciela Fondato,3364396973
Zarate,Escuela EP N° 24 ES N° 7,264,Graciela Fondato,3364396973
Zarate,Escuela EP N° 24 ES N° 7,265,Graciela Fondato,3364396973
Zarate,Escuela EP N° 24 ES N° 7,266,Graciela Fondato,3364396973
Zarate,Escuela EP N° 13 ES N° 6,267,Graciela Fondato,3364396973
Zarate,Escuela EP N° 13 ES N° 6,268,Graciela Fondato,3364396973
Zarate,Escuela EP N° 18 ES N° 10,269,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,270,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,271,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,272,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,273,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,274,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,275,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,276,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,277,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,278,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,279,Graciela Fondato,3364396973
Zarate,Escuela EP N° 9,280,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,281,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,282,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,283,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,284,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,285,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,286,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,287,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,288,Graciela Fondato,3364396973
Zarate,Escuela ES N° 1,289,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,290,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,291,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,292,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,293,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,294,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,295,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,296,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,297,Graciela Fondato,3364396973
Zarate,Escuela EP N° 17,298,Graciela Fondato,3364396973
Zarate,Instituto Vanguardia De Lima,299,Graciela Fondato,3364396973
Zarate,Instituto Vanguardia De Lima,300,Graciela Fondato,3364396973
Zarate,Instituto Vanguardia De Lima,301,Graciela Fondato,3364396973
Zarate,Instituto Sagrada Familia,9001,Graciela Fondato,3364396973
Zarate,Instituto Sagrada Familia,9002,Graciela Fondato,3364396973
Zarate,Instituto Sagrada Familia,9003,Graciela Fondato,3364396973
Zarate,Instituto Sagrada Familia,9004,Graciela Fondato,3364396973
Zarate,Jardin De InfantES N° 901,9005,Graciela Fondato,3364396973
Zarate,Jardin De InfantES N° 901,9006,Graciela Fondato,3364396973`;
    }
}

// Función para parsear CSV (mejorada para manejar CSV complejos)
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
        // Manejo básico de CSV - dividir por comas
        const values = line.split(',').map(v => v.trim());
        const mesa = {};
        
        headers.forEach((header, index) => {
            mesa[header] = values[index] || '';
        });
        
        // Debug: console.log para ver qué datos estamos obteniendo
        console.log('Mesa parseada:', mesa);
        
        return mesa;
    });
}

// Función para extraer analistas únicos
function extraerAnalistas(data) {
    const analistas = [...new Set(data.map(item => item['Analista de Cómputos']).filter(Boolean))];
    return analistas.sort();
}

// Función para mostrar modal de selección de usuario
function mostrarModalSeleccionUsuario(analistas, esCambioUsuario = false) {
    return new Promise((resolve) => {
        const modalHTML = `
        <div id="modalUsuario" class="modal-overlay">
            <div class="modal-content">
                ${esCambioUsuario ? `
                    <button onclick="cerrarModalUsuario()" class="modal-close">&times;</button>
                ` : ''}
                
                <div class="modal-header">
                    <h2>${esCambioUsuario ? 'Cambiar Usuario' : 'Seleccionar Usuario'}</h2>
                    <p>Selecciona tu nombre de la lista:</p>
                </div>
                
                <div class="analistas-list">
                    ${analistas.map(analista => `
                        <button onclick="seleccionarUsuario('${analista}')" class="analista-btn">
                            <span class="analista-initial">${analista.charAt(0).toUpperCase()}</span>
                            <span class="analista-name">${analista}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        window.seleccionarUsuario = (analista) => {
            document.getElementById('modalUsuario').remove();
            resolve(analista);
        };
        
        window.cerrarModalUsuario = () => {
            document.getElementById('modalUsuario').remove();
            resolve(null);
        };
    });
}

// Función para verificar usuario
function verificarUsuario() {
    const usuario = localStorage.getItem('usuarioElecciones');
    if (usuario && analistasData.includes(usuario)) {
        return usuario;
    }
    return null;
}

// Función para guardar usuario
function guardarUsuario(usuario) {
    localStorage.setItem('usuarioElecciones', usuario);
    usuarioActual = usuario;
}

// Función para cambiar usuario
async function cambiarUsuario() {
    const nuevoUsuario = await mostrarModalSeleccionUsuario(analistasData, true);
    if (nuevoUsuario && nuevoUsuario !== usuarioActual) {
        guardarUsuario(nuevoUsuario);
        
        // Recargar todos los datos y filtrar para el nuevo usuario
        const csvText = await cargarCSV();
        const allData = parseCSV(csvText);
        mesasData = filtrarMesasPorAnalista(allData, usuarioActual);
        filteredData = mesasData;
        
        // Actualizar el nombre del usuario en la interfaz
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = usuarioActual;
        }
        
        // Cargar estado del nuevo usuario
        cargarEstado();
        
        // Renderizar tabla
        renderizarTabla();
        
        mostrarNotificacion(`Usuario cambiado a: ${usuarioActual}`);
    }
}

// Función para filtrar mesas por analista
function filtrarMesasPorAnalista(data, analista) {
    return data.filter(mesa => mesa['Analista de Cómputos'] === analista);
}

// Función para cargar estado de localStorage
function cargarEstado() {
    const estadoGuardado = localStorage.getItem(`mesasEstado_${usuarioActual}`);
    if (estadoGuardado) {
        mesasEstado = JSON.parse(estadoGuardado);
    } else {
        mesasEstado = {};
    }
}

// Función para guardar estado en localStorage
function guardarEstado() {
    localStorage.setItem(`mesasEstado_${usuarioActual}`, JSON.stringify(mesasEstado));
}

// Función para renderizar tabla
function renderizarTabla(data = filteredData) {
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach(mesa => {
        const mesaId = `${mesa.Partido}_${mesa.Mesa}`;
        const estado = mesasEstado[mesaId] || { estado: 'pendiente', observaciones: '' };
        
        // Función para obtener el texto y clase del estado
        const getEstadoInfo = (estadoValue) => {
            switch(estadoValue) {
                case 'pendiente':
                    return { texto: 'Pendiente', clase: 'status-pendiente' };
                case 'en-proceso':
                    return { texto: 'En Proceso', clase: 'status-en-proceso' };
                case 'completado':
                    return { texto: 'Controlada', clase: 'status-controlada' };
                case 'con-problemas':
                    return { texto: 'Con Error', clase: 'status-error' };
                default:
                    return { texto: 'Pendiente', clase: 'status-pendiente' };
            }
        };
        
        const estadoInfo = getEstadoInfo(estado.estado);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mesa.Partido}</td>
            <td>${mesa.Establecimiento}</td>
            <td>${mesa.Mesa}</td>
            <td>
                <span class="status-badge ${estadoInfo.clase}">
                    ${estadoInfo.texto}
                </span>
            </td>
            <td>
                <button onclick="abrirModalObservaciones('${mesaId}')" class="btn-observaciones">
                    ${estado.observaciones ? '📝' : '📄'} ${estado.observaciones ? 'Ver' : 'Agregar'}
                </button>
            </td>
            <td>
                <div class="quick-actions">
                    <button onclick="cambiarEstadoRapido('${mesaId}', 'pendiente')" class="quick-btn quick-btn-pendiente" title="Marcar como Pendiente">
                        ⏳ Pendiente
                    </button>
                    <button onclick="cambiarEstadoRapido('${mesaId}', 'en-proceso')" class="quick-btn quick-btn-proceso" title="Marcar En Proceso">
                        🔄 Proceso
                    </button>
                    <button onclick="cambiarEstadoRapido('${mesaId}', 'completado')" class="quick-btn quick-btn-listo" title="Marcar como Controlada/Lista">
                        ✅ LISTO
                    </button>
                    <button onclick="cambiarEstadoRapido('${mesaId}', 'con-problemas')" class="quick-btn quick-btn-error" title="Marcar con Error">
                        ❌ ERROR
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    actualizarEstadisticas();
}

// Función para cambiar estado
function cambiarEstado(mesaId, nuevoEstado) {
    if (!mesasEstado[mesaId]) {
        mesasEstado[mesaId] = { estado: 'pendiente', observaciones: '' };
    }
    
    mesasEstado[mesaId].estado = nuevoEstado;
    guardarEstado();
    actualizarEstadisticas();
    mostrarNotificacion(`Estado actualizado a: ${nuevoEstado}`);
}

// Función para cambio rápido de estado
function cambiarEstadoRapido(mesaId, nuevoEstado) {
    cambiarEstado(mesaId, nuevoEstado);
    // Actualizar la fila específica sin renderizar toda la tabla
    const row = document.querySelector(`tr[data-mesa-id="${mesaId}"]`);
    if (row) {
        const select = row.querySelector('.estado-select');
        if (select) {
            select.value = nuevoEstado;
            select.className = `estado-select ${nuevoEstado}`;
        }
    }
    // Renderizar toda la tabla para asegurar consistencia
    renderizarTabla();
}

// Función para abrir modal de observaciones
function abrirModalObservaciones(mesaId) {
    currentMesa = mesaId;
    
    if (!mesasEstado[mesaId]) {
        mesasEstado[mesaId] = { estado: 'pendiente', observaciones: '' };
    }
    
    modalMesa.textContent = `Mesa ${mesaId.split('_')[1]} - ${mesaId.split('_')[0]}`;
    observacionesTextarea.value = mesasEstado[mesaId].observaciones || '';
    modal.style.display = 'block';
}

// Función para guardar observaciones
function guardarObservaciones() {
    if (currentMesa && observacionesTextarea) {
        if (!mesasEstado[currentMesa]) {
            mesasEstado[currentMesa] = { estado: 'pendiente', observaciones: '' };
        }
        
        mesasEstado[currentMesa].observaciones = observacionesTextarea.value;
        guardarEstado();
        cerrarModal();
        
        // Actualizar la tabla para mostrar el indicador de observaciones
        renderizarTabla();
        
        mostrarNotificacion('Observaciones guardadas');
    }
}

// Función para cerrar modal
function cerrarModal() {
    if (modal) {
        modal.style.display = 'none';
    }
    currentMesa = null;
}

// Función para cerrar modal
function cerrarModal() {
    modal.style.display = 'none';
    currentMesa = null;
}

// Función para actualizar estadísticas
function actualizarEstadisticas() {
    const total = filteredData.length;
    const pendientes = Object.values(mesasEstado).filter(m => m.estado === 'pendiente').length + (total - Object.keys(mesasEstado).length);
    const enProceso = Object.values(mesasEstado).filter(m => m.estado === 'en-proceso').length;
    const completadas = Object.values(mesasEstado).filter(m => m.estado === 'completado').length;
    const conProblemas = Object.values(mesasEstado).filter(m => m.estado === 'con-problemas').length;
    
    // Calcular porcentaje de completadas
    const porcentajeCompletadas = total > 0 ? Math.round((completadas / total) * 100) : 0;
    
    document.getElementById('total-mesas').textContent = total;
    document.getElementById('pendientes').textContent = pendientes;
    document.getElementById('en-proceso').textContent = enProceso;
    document.getElementById('completadas').textContent = completadas;
    document.getElementById('con-problemas').textContent = conProblemas;
    document.getElementById('porcentaje-completadas').textContent = `${porcentajeCompletadas}%`;
}

// Función para filtrar datos
function filtrarDatos() {
    let datos = mesasData;
    
    // Filtro por búsqueda
    const busqueda = searchInput.value.toLowerCase();
    if (busqueda) {
        datos = datos.filter(mesa => 
            mesa.Partido.toLowerCase().includes(busqueda) ||
            mesa.Establecimiento.toLowerCase().includes(busqueda) ||
            mesa.Mesa.toString().includes(busqueda)
        );
    }
    
    // Filtro por estado
    const estadoFiltro = filterStatus.value;
    if (estadoFiltro !== 'todos') {
        datos = datos.filter(mesa => {
            const mesaId = `${mesa.Partido}_${mesa.Mesa}`;
            const estado = mesasEstado[mesaId] ? mesasEstado[mesaId].estado : 'pendiente';
            return estado === estadoFiltro;
        });
    }
    
    filteredData = datos;
    renderizarTabla();
}

// Función para exportar estado
function exportarEstado() {
    const datosExportar = {
        usuario: usuarioActual,
        fecha: new Date().toISOString(),
        mesas: mesasEstado,
        estadisticas: {
            total: filteredData.length,
            pendientes: Object.values(mesasEstado).filter(m => m.estado === 'pendiente').length + (filteredData.length - Object.keys(mesasEstado).length),
            enProceso: Object.values(mesasEstado).filter(m => m.estado === 'en-proceso').length,
            completadas: Object.values(mesasEstado).filter(m => m.estado === 'completado').length,
            conProblemas: Object.values(mesasEstado).filter(m => m.estado === 'con-problemas').length
        }
    };
    
    const blob = new Blob([JSON.stringify(datosExportar, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estado_mesas_${usuarioActual}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    mostrarNotificacion('Estado exportado correctamente');
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 1001;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.parentNode.removeChild(notificacion);
        }
    }, 3000);
}

// Función de inicialización
async function inicializar() {
    // Cargar datos del CSV
    const csvText = await cargarCSV();
    const allData = parseCSV(csvText);
    analistasData = extraerAnalistas(allData);
    
    // Verificar usuario actual
    usuarioActual = verificarUsuario();
    
    if (!usuarioActual) {
        // Mostrar modal de selección de usuario
        usuarioActual = await mostrarModalSeleccionUsuario(analistasData);
        guardarUsuario(usuarioActual);
    }
    
    // Filtrar mesas para el usuario actual
    mesasData = filtrarMesasPorAnalista(allData, usuarioActual);
    filteredData = mesasData;
    
    // Actualizar el nombre del usuario en la interfaz
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = usuarioActual;
    }
    
    // Cargar estado guardado
    cargarEstado();
    
    // Inicializar elementos del DOM
    tbody = document.querySelector('#mesas-table tbody');
    searchInput = document.getElementById('search-input');
    filterStatus = document.getElementById('filter-status');
    exportBtn = document.getElementById('export-btn');
    modal = document.getElementById('observaciones-modal');
    modalMesa = document.getElementById('modal-mesa');
    observacionesTextarea = document.getElementById('observaciones-textarea');
    saveObservacionesBtn = document.getElementById('save-observaciones');
    cancelObservacionesBtn = document.getElementById('cancel-observaciones');
    closeModal = document.querySelector('.close');
    
    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', filtrarDatos);
    }
    
    if (filterStatus) {
        filterStatus.addEventListener('change', filtrarDatos);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportarEstado);
    }
    
    if (saveObservacionesBtn) {
        saveObservacionesBtn.addEventListener('click', guardarObservaciones);
    }
    
    if (cancelObservacionesBtn) {
        cancelObservacionesBtn.addEventListener('click', cerrarModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', cerrarModal);
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModal();
        }
    });
    
    // Renderizar tabla inicial
    renderizarTabla();
}

// Funciones globales para llamadas desde HTML
window.cambiarEstado = cambiarEstado;
window.abrirModalObservaciones = abrirModalObservaciones;
window.cambiarUsuario = cambiarUsuario;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);

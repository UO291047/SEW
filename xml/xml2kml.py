# xml2kml.py

""""
Extracción de coordenadas de coordenadas de un archivo xml a uno kml

@version 1.0 18/Octubre/2024
@author: David González González
"""

import xml.etree.ElementTree as ET
import simplekml
import os

def procesar_rutas(xml_file_path):
    # Cargar el archivo XML
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    # Color rojo (R: 255, G: 0, B: 0, A: 255)
    color_rojo = simplekml.Color.red  # Rojo

    # Crear un objeto KML para esta ruta
    kml = simplekml.Kml()
    circuito_kml = kml.newfolder(name="circuito")

    # Inicializar una lista para almacenar las coordenadas
    coordenadas = []

    # Entrar dentro del apartado de sectores del circuito en el XML
    for sectores in root.findall(".//{http://www.uniovi.es}sectores"):

        #Recorrer cada sector
        for sector in sectores.findall(".//{http://www.uniovi.es}sector"):
            # Obtener las coordenadas de cada sector
            longitud = float(sector.find(".//{http://www.uniovi.es}coords").get("longitud"))
            latitud = float(sector.find(".//{http://www.uniovi.es}coords").get("latitud"))
            altitud = float(sector.find(".//{http://www.uniovi.es}coords").get("altitud"))

            # Agregar las coordenadas a la lista
            coordenadas.append((longitud, latitud, altitud))

        # Obtener las coordenadas del primer sector de nuevo
        sector_inicio = sectores.find(".//{http://www.uniovi.es}sector")
        longitud_inicio = float(sector_inicio.find(".//{http://www.uniovi.es}coords").get("longitud"))
        latitud_inicio = float(sector_inicio.find(".//{http://www.uniovi.es}coords").get("latitud"))
        altitud_inicio = float(sector_inicio.find(".//{http://www.uniovi.es}coords").get("altitud"))

        # Agregar las coordenadas de inicio como el ultimo punto en la lista
        # Hacemos esto para que se dibuje también el primer sector del circuito
        coordenadas.append((longitud_inicio, latitud_inicio , altitud_inicio))

    # Crear una línea que conecte los puntos finales de la cada sector y establecer el color a rojo
    linea = circuito_kml.newlinestring(name="Circuito", coords=coordenadas)
    linea.altitudmode = simplekml.AltitudeMode.relativetoground
    linea.extrude = 1
    linea.tessellate = 1
    linea.style.linestyle.color = color_rojo

    # Obtener el directorio del archivo XML
    output_dir = os.path.dirname(xml_file_path)

    # Nombre del archivo de salida
    output_file = os.path.join(output_dir, "circuito.kml")

    # Guardar el archivo KML en el mismo directorio que el archivo XML
    kml.save(output_file)


def main():
    """
    Extracción de coordenadas de rutas de un archivo xml a uno kml

    Version: 1.0 18/Octubre/2024
    Author: David González González
    """

    print(main.__doc__)

    miArchivoXML = input('Introduzca un archivo XML = ')

    procesar_rutas(miArchivoXML)


if __name__ == "__main__":
    main()
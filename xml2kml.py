# xml2kml.py

""""
Extracción de coordenadas de rutas de un archivo xml a uno kml

@version 1.0 8/Noviembre/2023
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

    # Iterar a través de las rutas en el XML
    for index, ruta in enumerate(root.findall(".//{http://tempuri.org/rutas}ruta")):
        ruta_nombre = ruta.get("nombre")

        # Crear un objeto KML para esta ruta
        kml = simplekml.Kml()
        ruta_kml = kml.newfolder(name=ruta_nombre)

        # Inicializar una lista para almacenar las coordenadas de la ruta
        coordenadas = []

        # Obtener las coordenadas de inicio de la ruta
        inicio_ruta = ruta.find(".//{http://tempuri.org/rutas}ubicacion")
        latitud_inicio = float(inicio_ruta.find(".//{http://tempuri.org/rutas}coordenadas").get("latitud"))
        longitud_inicio = float(inicio_ruta.find(".//{http://tempuri.org/rutas}coordenadas").get("longitud"))
        altitud_inicio = float(inicio_ruta.find(".//{http://tempuri.org/rutas}coordenadas").get("altitud"))

        # Agregar las coordenadas de inicio como el primer punto en la lista
        coordenadas.append((latitud_inicio, longitud_inicio, altitud_inicio))

        # Iterar a través de los hitos de la ruta
        for hito in ruta.findall(".//{http://tempuri.org/rutas}hito"):
            hito_coord = hito.find(".//{http://tempuri.org/rutas}coordenadas")
            latitud = float(hito_coord.get("latitud"))
            longitud = float(hito_coord.get("longitud"))
            altitud = float(hito_coord.get("altitud"))

            # Agregar la coordenada del hito a la lista
            coordenadas.append((latitud, longitud, altitud))

        # Crear una línea que conecte los hitos de la ruta y establecer el color a rojo
        linea = ruta_kml.newlinestring(name="Ruta", coords=coordenadas)
        linea.altitudmode = simplekml.AltitudeMode.relativetoground
        linea.extrude = 1
        linea.tessellate = 1
        linea.style.linestyle.color = color_rojo

        # Obtener el directorio del archivo XML
        output_dir = os.path.dirname(xml_file_path)

        # Nombre del archivo de salida
        output_file = os.path.join(output_dir, f"ruta{index + 1}.kml")

        # Guardar el archivo KML en el mismo directorio que el archivo XML
        kml.save(output_file)


def main():
    """
    Extracción de coordenadas de rutas de un archivo xml a uno kml

    Version: 1.0 8/Noviembre/2023
    Author: David González González
    """

    print(main.__doc__)

    miArchivoXML = input('Introduzca un archivo XML = ')

    procesar_rutas(miArchivoXML)


if __name__ == "__main__":
    main()


import xml.etree.ElementTree as ET
import svgwrite

def generar_perfil_svg(ruta, numero_perfil):
    dwg = svgwrite.Drawing("perfil" + str(numero_perfil) + ".svg", profile='tiny', size=(500, 300))

    coordenadas = []

    # Obtener las coordenadas de inicio de la ruta
    inicio_ruta = ruta.find(".//{http://tempuri.org/rutas}ubicacion")
    latitud_inicio = float(inicio_ruta.find(".//{http://tempuri.org/rutas}coordenadas").get("latitud"))
    longitud_inicio = float(inicio_ruta.find(".//{http://tempuri.org/rutas}coordenadas").get("longitud"))

    # Agregar las coordenadas de inicio como el primer punto en la lista
    coordenadas.append((longitud_inicio, latitud_inicio))

    # Iterar a través de los hitos de la ruta
    for hito in ruta.findall(".//{http://tempuri.org/rutas}hito"):
        latitud = float(hito.find(".//{http://tempuri.org/rutas}coordenadas").get("latitud"))
        longitud = float(hito.find(".//{http://tempuri.org/rutas}coordenadas").get("longitud"))

        # Agregar las coordenadas del hito a la lista
        coordenadas.append((longitud, latitud))

    # Crear el perfil de altimetría con líneas en el archivo SVG
    for i in range(len(coordenadas) - 1):
        x1, y1 = coordenadas[i]
        x2, y2 = coordenadas[i + 1]
        dwg.add(dwg.line(start=(x1, y1), end=(x2, y2), stroke=svgwrite.rgb(0, 0, 0, '%')))  # Línea negra

    dwg.save(pretty=True)

def main():
    # Cargar el archivo XML
    tree = ET.parse("rutasEsquema.xml")
    root = tree.getroot()

    # Iterar a través de las rutas en el XML y generar un perfil SVG para cada una
    for i, ruta in enumerate(root.findall(".//{http://tempuri.org/rutas}ruta")):
        generar_perfil_svg(ruta, i + 1)

if __name__ == "__main__":
    main()

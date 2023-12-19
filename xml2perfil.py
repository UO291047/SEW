import xml.etree.ElementTree as ET
import svgwrite

def invertir_polilinea(altitudes, altura_maxima):
    # Calcular el valor para invertir la polilínea
    offset_inversion = altura_maxima + 10

    # Invertir las altitudes
    altitudes_invertidas = [(x, offset_inversion - y) for x, y in altitudes]

    return altitudes_invertidas

def generar_perfil_svg(ruta, numero_perfil):
    dwg = svgwrite.Drawing(f"perfil{numero_perfil}.svg", profile='tiny', size=(600, 300))

    # Inicializar variables
    distancia_total = 0
    altitudes = []

    # Punto inicial de la ruta con una x más alejada y fuente más grande
    dwg.add(dwg.text(ruta.get("nombre"), insert=(20, 250), fill='black', transform="rotate(-90, 20, 250)", font_size=15))
    #altitudes.append((20, 100))

    # Iterar a través de los hitos de la ruta
    for hito in ruta.findall(".//{http://tempuri.org/rutas}hito"):
        latitud = float(hito.find(".//{http://tempuri.org/rutas}coordenadas").get("latitud"))
        longitud = float(hito.find(".//{http://tempuri.org/rutas}coordenadas").get("longitud"))
        altitud = float(hito.find(".//{http://tempuri.org/rutas}coordenadas").get("altitud"))
        distancia_anterior = float(hito.find(".//{http://tempuri.org/rutas}distancia-anterior").text)

        # Calcular la distancia total
        distancia_total += distancia_anterior

        # Escalar las coordenadas
        latitud_scaled = latitud * 3
        longitud_scaled = longitud * 3
        distancia_total_scaled = distancia_total * 7
        altitud_scaled = altitud * 0.05

        # Añadir la distancia y la altitud a las listas
        altitudes.append((distancia_total_scaled, altitud_scaled))

        # Añadir texto a los puntos con transformación para orientación vertical y fuente más grande
        dwg.add(dwg.text(hito.get("nombre"), insert=(distancia_total_scaled, 250), fill='black', transform="rotate(-90, {}, 250)".format(distancia_total_scaled), font_size=15))

    # Añadir un punto adicional al final de la polilínea para suavizar la transición
    #altitudes.append((distancia_total_scaled + 10, 100))

    # Invertir la polilínea
    altura_maxima = max(altitudes, key=lambda x: x[1])[1]
    altitudes_invertidas = invertir_polilinea(altitudes, altura_maxima)

    # Crear la polilínea invertida en el archivo SVG con mayor grosor de línea
    polyline = dwg.polyline(points=altitudes_invertidas, stroke=svgwrite.rgb(255, 0, 0, '%'), fill='none', stroke_width=3)
    dwg.add(polyline)

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

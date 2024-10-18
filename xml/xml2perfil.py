import xml.etree.ElementTree as ET
import svgwrite

def invertir_polilinea(altitudes, altura_maxima):
    # Calcular el valor para invertir la polilínea
    offset_inversion = altura_maxima + 10

    # Invertir las altitudes
    altitudes_invertidas = [(x, offset_inversion - y) for x, y in altitudes]

    return altitudes_invertidas

def generar_perfil_svg(sectores):
    dwg = svgwrite.Drawing("perfil.svg", profile='tiny', size=(1500, 300))

    # Inicializar variables
    distancia_total = 0.0
    altitudes = []

    for sector in sectores.findall(".//{http://www.uniovi.es}sector"):

        altitud = float(sector.find(".//{http://www.uniovi.es}coords").get("altitud"))
        distancia = float(sector.find(".//{http://www.uniovi.es}longitud").text)

        # Calcular la distancia total
        distancia_total += distancia

        # Escalar las coordenadas
        distancia_total_scaled = distancia_total * 0.2
        altitud_scaled = altitud * 10

        # Añadir la distancia y la altitud a la listas
        altitudes.append((distancia_total_scaled, altitud_scaled))

        # Añadir texto a los puntos con transformación para orientación vertical y fuente más grande
        dwg.add(dwg.text(f"Sector {sector.find(".//{http://www.uniovi.es}num").text}", 
                         insert=(distancia_total_scaled, 250), 
                         fill='black', 
                         transform="rotate(-90, {}, 250)".format(distancia_total_scaled), 
                         font_size=13))

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
    tree = ET.parse("circuitoEsquema.xml")
    root = tree.getroot()

    generar_perfil_svg(root.find(".//{http://www.uniovi.es}sectores"))

if __name__ == "__main__":
    main()
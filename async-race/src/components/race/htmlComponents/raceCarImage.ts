function raceCarImage(color: string = '#000', className: string = 'race__img'): SVGSVGElement {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('version', '1.0');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('width', '196.000000pt');
    svgElement.setAttribute('height', '71.000000pt');
    svgElement.setAttribute('viewBox', '0 0 296.000000 171.000000');
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgElement.setAttribute('class', className);

    const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gElement.setAttribute('transform', 'translate(0.000000,171.000000) scale(0.100000,-0.100000)');
    gElement.setAttribute('fill', color);
    gElement.setAttribute('stroke', 'none');

    const path1Element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1Element.setAttribute(
        'd',
        'M1141 1129 c-51 -6 -108 -23 -185 -56 -94 -39 -123 -47 -191 -51 -92 -4 -106 -12 -98 -53 3 -16 -1 -46 -11 -69 -9 -22 -16 -56 -16 -75 0 -75 40 -110 131 -114 l57 -2 6 36 c9 49 59 102 107 115 94 26 189 -45 189 -141 l0 -29 359 0 358 0 6 42 c6 45 28 81 70 112 37 27 117 27 155 0 41 -31 72 -83 72 -120 l0 -34 50 0 c61 0 105 21 114 52 10 40 6 88 -9 112 -29 44 -161 86 -370 116 -68 10 -90 19 -147 57 -84 55 -166 89 -249 103 -75 12 -291 11 -398 -1z',
    );

    const path2Element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2Element.setAttribute(
        'd',
        'M933 825 c-36 -15 -73 -68 -73 -103 0 -71 54 -122 131 -122 33 0 47 6 75 34 28 28 34 42 34 76 0 52 -25 95 -66 115 -39 18 -59 18 -101 0z',
    );

    const path3Element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3Element.setAttribute(
        'd',
        'M1955 826 c-43 -19 -66 -49 -72 -94 -10 -76 40 -132 117 -132 52 0 83 18 105 60 30 59 13 118 -44 157 -38 26 -63 28 -106 9z',
    );

    gElement.appendChild(path1Element);
    gElement.appendChild(path2Element);
    gElement.appendChild(path3Element);

    svgElement.appendChild(gElement);

    return svgElement;
}

export { raceCarImage };

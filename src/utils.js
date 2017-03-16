export function customArc (x, y, deg, radius, width) {
    var rad,
        path;

    var basePoints = [];

    //if the segment is the 360º
    if (deg >= 360 ) {
        basePoints.push({x: x,       y: y - radius });
        basePoints.push({x: x - 0.01, y: y - radius });
        basePoints.push({x: x,       y: y - (radius + width) });
        basePoints.push({x: x - 0.01,y: y - (radius + width) });

        path = [
            ["M", basePoints[0].x, basePoints[0].y],
            ["A", radius, radius, 0, 1, 1, basePoints[1].x, basePoints[1].y],
            ["M", basePoints[2].x, basePoints[2].y],
            ["A", radius+width, radius+width, 0, 1, 1, basePoints[3].x, basePoints[3].y]
        ];

    } else {

        //rad
        rad = (90 - deg) * Math.PI / 180;

        //define basePoints
        basePoints.push({x: x,
                         y: y - radius});

        basePoints.push({x: x + radius * Math.cos(rad),
                         y: y - radius * Math.sin(rad) });

        basePoints.push({x: x + (radius + width) * Math.cos(rad),
                         y: y - (radius + width) * Math.sin(rad) });

        basePoints.push({x: x,
                         y: y - (radius + width)});

        path = [
            ["M", basePoints[0].x, basePoints[0].y],
            ["A", radius, radius, 0, +(deg > 180), 1, basePoints[1].x, basePoints[1].y],
            ["L", basePoints[2].x, basePoints[2].y],
            ["A", radius + width, radius + width, 0, +(deg > 180), 0, basePoints[3].x, basePoints[3].y],
            ["Z"]
        ];
    }

    var pathString =  path;
    pathString.forEach(function(item, index, array){ array[index] = item.join(' ');});
    pathString = pathString.join(' ');

    return pathString;
}

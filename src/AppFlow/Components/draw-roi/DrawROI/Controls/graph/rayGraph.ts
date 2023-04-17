import { MyPolygon } from './PolygonGraph'
import { Point } from '../../types'
import { fabric } from 'fabric'

export type MyRayOption = {
  polygonLineId: number
  polygonLine: MyPolygon
  startPoint: Point
  endPoint: Point
  textContent: string
}

const defaultOptionForGroup: fabric.IGroupOptions = {
  cornerStyle: 'rect',
  strokeWidth: 2,
  fill: '#999999',
  stroke: '#999999',
  originX: 'center',
  originY: 'center',
  selectable: false,
  objectCaching: false,
  transparentCorners: false
}

export class MyRay extends fabric.Group {
  private _triangle: fabric.Triangle
  private _text: fabric.Text

  constructor({
    polygonLineId,
    polygonLine,
    startPoint,
    endPoint,
    textContent
  }: MyRayOption) {
    super([polygonLine], {
      ...defaultOptionForGroup,
      data: {
        id: polygonLineId,
        type: 'ray'
      }
    })

    // angle (in radians) computed from x axis
    const angle = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    )
    // ray line length
    const lineLength = Math.sqrt(
      (endPoint.y - startPoint.y) * (endPoint.y - startPoint.y) +
        (endPoint.x - startPoint.x) * (endPoint.x - startPoint.x)
    )
    // Triangle bottom width
    const triangleWidth = 20
    // Triangle height
    let triangleHeight = 40
    // Triangle max height
    const maxTriangleHeight = lineLength / 3
    if (triangleHeight > maxTriangleHeight) {
      //  reduce the height of the triangle proportionally
      triangleHeight = (maxTriangleHeight * triangleHeight) / triangleWidth
    }

    // the coordinates of triangle vertices
    const triangleTopX = endPoint.x + (triangleHeight / 2) * Math.cos(angle)
    const triangleTopY = endPoint.y + (triangleHeight / 2) * Math.sin(angle)

    // the coordinates of the upper left corner of a triangle
    const triangleLeft =
      triangleTopX - (triangleWidth / 2) * Math.cos(angle + Math.PI / 2)
    const triangleTop =
      triangleTopY - (triangleWidth / 2) * Math.sin(angle + Math.PI / 2)

    // draw triangle in the correte position
    this._triangle = new fabric.Triangle({
      fill: '#f44336',
      width: triangleWidth,
      height: triangleHeight,
      left: triangleLeft,
      top: triangleTop,
      //   angle in degree
      angle: angle * (180 / Math.PI) + 90
    })
    // text
    this._text = new fabric.Text(textContent, {
      fontSize: 16,
      fill: 'black',
      left: triangleLeft,
      top: triangleTop,
      backgroundColor: '#d5e3f9'
    })

    // Add triangles and text to the Group object
    this.addWithUpdate(this._triangle)
    this.addWithUpdate(this._text)

    // Recalculate the bounding box of the Group object and update the canvas
    this.dirty = true

    this.setCoords()
    this.canvas?.requestRenderAll()
  }
}

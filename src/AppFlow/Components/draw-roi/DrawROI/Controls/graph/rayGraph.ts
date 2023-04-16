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
    const lineLength = Math.sqrt(
      (endPoint.y - startPoint.y) * (endPoint.y - startPoint.y) +
        (endPoint.x - startPoint.x) * (endPoint.x - startPoint.x)
    ) // 计算线段长度
    // Triangle bottom width
    const triangleWidth = 20
    // Triangle height
    let triangleHeight = 40 // 三角形高度
    const maxTriangleHeight = lineLength / 2 // 三角形最大高度
    if (triangleHeight > maxTriangleHeight) {
      // 如果三角形高度过大，则按比例缩小三角形高度
      triangleHeight = (maxTriangleHeight * triangleHeight) / triangleWidth
    }

    // 计算三角形顶点坐标
    const triangleTopX = endPoint.x + (triangleHeight / 2) * Math.cos(angle)
    const triangleTopY = endPoint.y + (triangleHeight / 2) * Math.sin(angle)

    // 计算三角形左上角坐标
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
    // 创建文本
    this._text = new fabric.Text(textContent, {
      fontSize: 16,
      fill: 'black',
      left: triangleLeft,
      top: triangleTop,
      backgroundColor: '#d5e3f9'
    })

    // 添加三角形和文本到 Group 对象
    this.addWithUpdate(this._triangle)
    this.addWithUpdate(this._text)

    // 重新计算 Group 对象的边界框，并更新画布
    this.dirty = true

    this.setCoords()
    this.canvas?.requestRenderAll()
  }
}

import { MyPolygon } from './PolygonGraph'
import { Point } from '../../types'
import { fabric } from 'fabric'

export type MyRayOption = {
  polygonLineId: number
  polygonLine: MyPolygon
  startPoint: Point
  endPoint: Point
  textContent: string
  handleLabelChange: () => void
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
  transparentCorners: false,
  evented: true
}

export class MyRay extends fabric.Group {
  private _triangle: fabric.Triangle
  private _text: fabric.IText
  private _selected: boolean
  private _editing: boolean
  private _handleLabelChange: () => void

  constructor({
    polygonLineId,
    polygonLine,
    startPoint,
    endPoint,
    textContent,
    handleLabelChange
  }: MyRayOption) {
    super([polygonLine], {
      ...defaultOptionForGroup,
      data: {
        id: polygonLineId,
        type: 'ray'
      }
    })
    this._editing = false
    this._selected = false
    this.on('mousedblclick', this.handleDoubleClick)
    this._handleLabelChange = handleLabelChange

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
    //  editable text
    this._text = new fabric.IText(textContent, {
      fontSize: 16,
      fill: 'black',
      left: triangleLeft,
      top: triangleTop,
      backgroundColor: '#d5e3f9',
      editable: true
    })

    // Add triangles and text to the Group object
    this.addWithUpdate(this._triangle)
    this.addWithUpdate(this._text)

    // Recalculate the bounding box of the Group object and update the canvas
    this.dirty = true

    this.setCoords()
    this.canvas?.requestRenderAll()
    this.canvas?.setActiveObject(this)
  }

  public get editing() {
    return this._editing
  }

  public set editing(isEditing: boolean) {
    this._editing = isEditing
    if (isEditing === false) {
      this._selected = false
    }
  }

  onSelect(): boolean {
    this._selected = true
    console.log(
      'onSelect=this._selected,this._editing',
      this._selected,
      this._editing
    )
    return false
  }

  onDeselect(): boolean {
    // this._editing = false
    this._selected = false
    console.log(
      'onDeselect =this._selected,this._editing',
      this._selected,
      this._editing
    )
    return false
  }

  handleDoubleClick(e: fabric.IEvent) {
    console.log('gourp event', e)

    if (this._selected) {
      console.log('is selected the group and handleLabelchange')
      this._editing = true
      this._handleLabelChange()
    }

    console.log(
      'double clickkkk on group=this._selected,this._editing',
      this._selected,
      this._editing
    )
  }
}

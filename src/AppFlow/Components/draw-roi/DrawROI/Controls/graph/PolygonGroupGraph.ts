import { fabric } from 'fabric'
import { Polygon } from '../../types'
import { MyPolygon } from './PolygonGraph'

export type MyPolygonWithLabelOption = {
  polygon: Polygon
  polygonObj: MyPolygon
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
// TODO: edit MyPolygon in the Group
export class MyPolygonWithLabel extends fabric.Group {
  private _selected: boolean
  private _editing: boolean
  public _text: fabric.Text
  public _handleLabelChange: () => void

  constructor({
    polygon,
    polygonObj,
    textContent,
    handleLabelChange
  }: MyPolygonWithLabelOption) {
    super([polygonObj], {
      ...defaultOptionForGroup,
      data: {
        id: polygon.id,
        type: 'polygonGroup'
      }
    })
    this._editing = false
    this._selected = false
    this.on('mousedblclick', this.handleDoubleClick)
    this._handleLabelChange = handleLabelChange

    this._text = new fabric.Text(textContent, {
      fontSize: 16,
      fill: 'black',
      left: polygon.points[0].x,
      top: polygon.points[0].y,
      backgroundColor: '#d5e3f9'
    })
    this.addWithUpdate(this._text)
    // Recalculate the bounding box of the Group object and update the canvas
    this.dirty = true

    this.setCoords()
    this.canvas?.requestRenderAll()
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
    // console.log('onSelect on the poly group')
    this._selected = true
    return false
  }
  onDeselect(): boolean {
    // console.log('onDeselect')
    this._selected = false
    this._editing = false
    return false
  }

  handleDoubleClick(e: fabric.IEvent) {
    if (this._selected) {
      this._editing = true
      this._handleLabelChange()
    }
  }
}

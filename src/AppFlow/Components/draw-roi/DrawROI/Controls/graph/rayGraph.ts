import { MyPolygon } from './PolygonGraph'
import { Point } from '../../types'
import { fabric } from 'fabric'

export type MyRayOption = {
  polygonLineId: number
  polygonLine: MyPolygon
  startPoint: Point
  endPoint: Point
  textContent: string
  onTextChange: (e: fabric.IEvent) => void
}

const defaultOptionForGroup: fabric.IGroupOptions = {
  cornerStyle: 'rect',
  strokeWidth: 2,
  fill: '#999999',
  stroke: '#999999',
  originX: 'center',
  originY: 'center',
  selectable: false,
  // selectable: true,
  objectCaching: false,
  transparentCorners: false
  // evented: true
}

export class MyRay extends fabric.Group {
  private _triangle: fabric.Triangle
  private _text: fabric.Text
  private _selected: boolean
  private _editing: boolean

  constructor({
    polygonLineId,
    polygonLine,
    startPoint,
    endPoint,
    textContent,
    onTextChange
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
  }
  onSelect(): boolean {
    console.log('onSelect')
    this._selected = true
    return false
  }

  // onDeselect(): boolean {
  //   console.log('onDeselect')
  //   if (!this._editing) {
  //     this._selected = false
  //     return false
  //   }
  //   return true
  // }
  // TODO 另一个思路直接在外部设置input框 修改 传入进来的content值

  handleDoubleClick(e: fabric.IEvent) {
    console.log('e', e)

    console.log('double clickkkk on group')
    console.log('this._selected,this._editing', this._selected, this._editing)
    if (this._selected) {
      console.log('change somethins')
      this._editing = true
    }

    if (this._editing) {
      let textForEditing = fabric.util.object.clone(this._text)
      console.log('textForEditing', textForEditing)
      textForEditing.set({
        text: 'tessss',
        editable: true
      })
      // hide group inside text
      this._text.visible = false
      // note important, text cannot be hidden without this
      this.addWithUpdate()

      textForEditing.visible = true
      // do not give controls, do not allow move/resize/rotation on this
      textForEditing.hasControls = false

      // now add this temp obj to canvas
      this.canvas?.add(textForEditing)
      this.canvas?.setActiveObject(textForEditing)

      // make the cursor showing
      textForEditing.enterEditing()
      textForEditing.selectAll()

      // editing:exited means you click outside of the textForEditing
      textForEditing.on('editing:exited', () => {
        console.log('editing:exited')
        let newVal = textForEditing.text
        let oldVal = this._text.text
        console.log('newVal,oldVal', newVal, oldVal)

        // then we check if text is changed
        if (true || newVal !== oldVal) {
          console.log('this._text.setting')
          this._text.set({
            text: newVal,
            visible: true
          })
          // comment before, you must call this
          this.addWithUpdate()

          // we do not need textForEditing anymore
          textForEditing.visible = false
          this.canvas?.remove(textForEditing)

          // optional, buf for better user experience
          // this.canvas?.setActiveObject(this)

          console.log('text for editing end')
        }
      })

      console.log(' double click end')
    }
  }
}

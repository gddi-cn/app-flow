import { fabric } from 'fabric'

// not using fabric.group because:
// https://github.com/fabricjs/fabric.js/issues/3775

export class DrawRayAssistant {
  private status: string

  private line: fabric.Line

  private pt1: fabric.Point

  private pt2: fabric.Point

  constructor() {
    this.status = 'init'
    this.line = new fabric.Line([0, 0, 0, 0], {
      strokeWidth: 3,
      fill: '#999999',
      stroke: '#999999',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
      objectCaching: false,
      data: {
        class: 'line'
      }
    })
    this.pt1 = new fabric.Point(0, 0)
    this.pt2 = new fabric.Point(0, 0)
  }

  public get Status(): string {
    return this.status
  }

  addToCanvas = (canvas: fabric.Canvas): void => {
    canvas.add(this.line)
  }

  removeFromCanvas = (): void => {
    this.line.canvas?.remove(this.line)
  }
  setPoint = (x: number, y: number): void => {
    switch (this.status) {
      case 'init':
        this.set1stPoint(x, y)
        break
      case 'pt1':
        this.set2ndPoint(x, y)
        break

      default:
        break
    }
  }

  endDraw = (): {
    xBegin: number
    yBegin: number
    xEnd: number
    yEnd: number
  } => {
    // called by users
    const lineDim = {
      xBegin: this.line.x1 || 0,
      yBegin: this.line.y1 || 0,
      xEnd: this.line.x2 || 0,
      yEnd: this.line.y2 || 0
    }

    if (this.Status === 'pt1') {
      this.status = 'init'
      this.line.set({ x1: 0, y1: 0, x2: 0, y2: 0 })
    }

    return lineDim
  }

  private set1stPoint = (x: number, y: number): void => {
    this.pt1.setX(x)
    this.pt1.setY(y)
    this.status = 'pt1'
  }

  private set2ndPoint = (x: number, y: number): void => {
    this.pt2.setX(x)
    this.pt2.setY(y)
    this.line.set({
      x1: this.pt1.x,
      y1: this.pt1.y,
      x2: this.pt2.x,
      y2: this.pt2.y
    })

    //  update corners
    this.line.setCoords()
  }
}

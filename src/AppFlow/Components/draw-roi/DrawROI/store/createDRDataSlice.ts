import produce from 'immer'
import { GetState, SetState } from 'zustand'
import { MyDRState } from './useStore'
import { Polygon, Point } from './../types'

export interface DRDataSlice {
  polygons: Polygon[]
  dialogPolygonOpen: boolean
  dialogPolygon: Polygon
  setDialogPolygonOpen: (diaOpen: boolean) => void
  setDialogPolygon: (polygon: Polygon) => void
  setPolygons: (polygons: Polygon[]) => void
  addPolygons: (polygons: Polygon[]) => void
  deletePolygons: (ids: number[]) => void
  modifyPolygonPoints: (id: number, points: Point[]) => void
  modifyPolygonLabel: (id: number, label: string) => void
}

const createDRDataSlice = (
  set: SetState<MyDRState>,
  get: GetState<MyDRState>
): DRDataSlice => ({
  polygons: [],
  dialogPolygonOpen: false,
  dialogPolygon: {} as Polygon,
  setDialogPolygonOpen: (diaOpen: boolean) => {
    set(
      produce((draft: MyDRState) => {
        draft.dialogPolygonOpen = diaOpen
      })
    )
  },
  setDialogPolygon: (polygon: Polygon) => {
    set(
      produce((draft: MyDRState) => {
        draft.dialogPolygon = polygon
      })
    )
  },
  setPolygons: (polygons: Polygon[]) => {
    set(
      produce((draft: MyDRState) => {
        draft.polygons = polygons
      })
    )
  },
  addPolygons: (polygons: Polygon[]) => {
    set(
      produce((draft: MyDRState) => {
        const draft1 = draft
        polygons.forEach((polygon) => {
          draft1.polygons.push(polygon)
        })
      })
    )
  },
  deletePolygons: (ids: number[]) => {
    set(
      produce((draft: MyDRState) => {
        const draft1 = draft
        const newPolygons: Polygon[] = []
        draft1.polygons.forEach((polygon) => {
          if (ids.findIndex((val) => val === polygon.id) === -1) {
            newPolygons.push(polygon)
          }
        })
        draft1.polygons = newPolygons
      })
    )
  },
  modifyPolygonPoints: (id: number, points: Point[]) => {
    set(
      produce((draft: MyDRState) => {
        const idx = draft.polygons.findIndex((poly) => poly.id === id)
        if (idx >= 0) {
          draft.polygons[idx].points = points
        }
      })
    )
  },
  modifyPolygonLabel: (id: number, label: string) => {
    set(
      produce((draft: MyDRState) => {
        const idx = draft.polygons.findIndex((poly) => poly.id === id)
        if (idx >= 0) {
          draft.polygons[idx].labelName = label
        }
      })
    )
  }
})

export default createDRDataSlice

import produce from 'immer'
import { GetState, SetState } from 'zustand'
import { MyDRState } from './useStore'
import { Polygon, Point } from './../types'
import { genarateRayNumber } from '../Controls/graph'

// TODO ray添加序号管理,存在问题
export interface DRDataSlice {
  polygons: Polygon[]
  setPolygons: (polygons: Polygon[]) => void
  addPolygons: (polygons: Polygon[]) => void
  deletePolygons: (ids: number[]) => void
  modifyPolygonPoints: (id: number, points: Point[]) => void
}

const createDRDataSlice = (
  set: SetState<MyDRState>,
  get: GetState<MyDRState>
): DRDataSlice => ({
  polygons: [],
  setPolygons: (polygons: Polygon[]) => {
    set(
      produce((draft: MyDRState) => {
        draft.polygons = genarateRayNumber(polygons)
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
        draft1.polygons = genarateRayNumber(draft1.polygons)
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
        draft1.polygons = genarateRayNumber(draft1.polygons)
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
  }
})

export default createDRDataSlice

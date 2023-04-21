import { regionsWithLabel } from '../../../types'
import { Polygon } from './types'

export function getRandomId(): number {
  const min = 99
  const max = 999999
  const random = Math.floor(Math.random() * (max - min + 1)) + min
  return new Date().getTime() + random
}

export function ROIsToPolygons(
  ROIs: number[][][],
  imgWidth: number,
  imgHeight: number,
  regionsWithLabel: regionsWithLabel
): Polygon[] {
  const polys: Polygon[] = []

  // if regionWithlabel exits，use default regionsWithlable not origin ROIs here
  if (regionsWithLabel && Object.keys(regionsWithLabel).length !== 0) {
    Object.keys(regionsWithLabel).forEach((label) => {
      const newPoly: Polygon = {
        id: getRandomId(),
        points: regionsWithLabel[label].map((pt) => ({
          x: pt[0] * imgWidth,
          y: pt[1] * imgHeight
        })),
        isRay: regionsWithLabel[label].length === 2,
        labelName: label
      }
      polys.push(newPoly)
    })
  } else {
    ROIs.forEach((ROI) => {
      const newPoly: Polygon = {
        id: getRandomId(),
        points: ROI.map((pt) => ({
          x: pt[0] * imgWidth,
          y: pt[1] * imgHeight
        })),
        // ray only has two point
        isRay: ROI.length === 2
      }
      polys.push(newPoly)
    })
  }
  console.log('polys===', polys)

  return polys
}

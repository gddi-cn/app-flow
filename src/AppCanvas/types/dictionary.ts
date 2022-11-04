export type Lang = 'cn' | 'en'

export interface Dictionary {
  extendedControls: {
    layout: {
      tip: string
    }
    reset: {
      tip: string
    }
  }
  node: {
    common: {
      header: {
        deleteBtn: string
      }
      detail: {
        title: string
        numTip: string
        arrayInput: {
          depTip: {
            title: string
            content: string
            listPrefix: string
          }
        }
      }
    }
    detection: {
      noModel: string
      labelNum: string
      dialog: {
        title: string
        confirm: string
        model: {
          title: string
          noSelect: string
          modelSelect: {
            placeHolder: string
            total: string
            confirm: string
            cancel: string
          }
        }
        label: {
          title: string
          selected: string
          columns: {
            label: string
            mapLabel: string
            displayColor: string
          }
        }
      }
    }
    roi: {
      regions: string
      dialog: {
        title: string
        confirm: string
        cameraTab: string
        localTab: string
        resolution: string
        uploadBtn: string
        useBtn: string
      }
    }
  }
}

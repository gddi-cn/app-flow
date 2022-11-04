import { Dictionary } from '../types/dictionary'

const en: Dictionary = {
  extendedControls: {
    layout: {
      tip: 'horizontally layout graph'
    },
    reset: {
      tip: "reset all modules' properties"
    }
  },
  node: {
    common: {
      header: {
        deleteBtn: 'Delete'
      },
      detail: {
        title: 'Props',
        numTip: 'Default value come from module: ',
        arrayInput: {
          depTip: {
            title: 'Dependencies',
            content:
              'This Option is relay to these nodes(modules) as following:',
            listPrefix: 'Module ID: '
          }
        }
      }
    },
    detection: {
      noModel: 'No Model Selected',
      labelNum: '{NUM} Label(s) Selected',
      dialog: {
        title: 'Model and Label Config',
        confirm: 'Save',
        model: {
          title: 'Model',
          noSelect: 'No Model Selected',
          modelSelect: {
            placeHolder: 'Search By Model Name',
            total: 'Total: ',
            confirm: 'Confirm',
            cancel: 'Cancel'
          }
        },
        label: {
          title: "Model's Label",
          selected: '{NUM} label(s) selected',
          columns: {
            label: 'Label',
            mapLabel: 'Map Label',
            displayColor: 'Display Color'
          }
        }
      }
    },
    roi: {
      regions: '{NUM} Region(s)',
      dialog: {
        title: 'Draw ROI',
        confirm: 'Save',
        cameraTab: 'Source: Camera',
        localTab: 'Source: Upload',
        resolution: 'Resolution',
        uploadBtn: 'Upload',
        useBtn: 'Use'
      }
    }
  }
}

export default en

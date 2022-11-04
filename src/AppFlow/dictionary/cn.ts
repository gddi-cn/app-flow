import { Dictionary } from '../types/dictionary'

const cn: Dictionary = {
  extendedControls: {
    layout: {
      tip: '图像水平铺设'
    },
    reset: {
      tip: '重置所有模块属性'
    }
  },
  node: {
    common: {
      header: {
        deleteBtn: '删除'
      },
      detail: {
        title: '属性详情',
        numTip: '默认值来自模块： ',
        arrayInput: {
          depTip: {
            title: '依赖',
            content: '这个属性的可选项依赖于以下几个节点的属性：',
            listPrefix: '模块 ID: '
          }
        }
      }
    },
    detection: {
      noModel: '未选择模型',
      labelNum: '已选择 {NUM} 个标签',
      dialog: {
        title: '模型和标签配置',
        confirm: '保存修改',
        model: {
          title: '模型',
          noSelect: '未选择模型',
          modelSelect: {
            placeHolder: '模型名称搜索',
            total: '总数： ',
            confirm: '确定',
            cancel: '取消'
          }
        },
        label: {
          title: '模型标签',
          selected: '已选择 {NUM} 个标签',
          columns: {
            label: '标签',
            mapLabel: '映射标签',
            displayColor: '显示颜色'
          }
        }
      }
    },
    roi: {
      regions: '{NUM} 个区域',
      dialog: {
        title: '画 ROI',
        confirm: '保存修改',
        cameraTab: '数据源：摄像头',
        localTab: '数据源：本地上传',
        resolution: '分辨率',
        uploadBtn: '上传',
        useBtn: '使用'
      }
    }
  }
}

export default cn

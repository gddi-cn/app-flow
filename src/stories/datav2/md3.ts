import { ModuleDefinitions } from '../../AppFlow'

export const md3: ModuleDefinitions = {
  Demuxer_v2: {
    version: 'v2',
    name: 'Demuxer',
    description: '解复用组件',
    outputs: [
      {
        id: 0,
        name: 'av_stream_open'
      },
      {
        id: 1,
        name: 'av_packet'
      }
    ]
  },
  Decoder_v2: {
    version: 'v2',
    name: 'Decoder',
    description: '解码组件',
    inputs: [
      {
        id: 0,
        name: 'av_stream_open'
      },
      {
        id: 1,
        name: 'av_packet'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'av_decode_open'
      },
      {
        id: 1,
        name: 'av_frame'
      }
    ]
  },
  AvToCv_v2: {
    version: 'v2',
    name: 'AvToCv',
    description: '图像格式转换组件',
    inputs: [
      {
        id: 0,
        name: 'av_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ]
  },
  Detection_v2: {
    version: 'v2',
    name: 'Detection',
    description: '目标检测组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      mod_iter_id: {
        default: '',
        label: '模型ID',
        type: 'string',
        hide: true
      },
      mod_labels: {
        default: {},
        label: '标签列表',
        type: 'object',
        hide: true
      },
      mod_name: {
        default: '',
        label: '模型名称',
        type: 'string',
        hide: true
      },
      mod_path: {
        default: '',
        label: '模型文件',
        type: 'string',
        hide: true
      },
      accelerate: {
        default: '',
        label: '加速器类型',
        type: 'string',
        readonly: true
      },
      best_threshold: {
        default: 0,
        label: '模型阈值',
        type: 'number',
        readonly: true
      },
      frame_rate: {
        default: 15,
        label: '推理帧率',
        type: 'number'
      }
    }
  },
  Tracking_v2: {
    version: 'v2',
    name: 'Tracking',
    description: '目标跟踪组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ]
  },
  Graphics_v2: {
    version: 'v2',
    name: 'Graphics',
    description: '图像绘制组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ]
  },
  Report_v2: {
    version: 'v2',
    name: 'Report',
    description: '数据上报组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      report_url: {
        type: 'string',
        label: '服务地址'
      },
      time_interval: {
        type: 'number',
        label: '时间间隔(s)',
        default: 0
      },
      image_quality: {
        type: 'number',
        label: '图像编码质量(1-100)',
        default: 85
      },
      real_time_push: {
        type: 'boolean',
        label: '实时推送',
        default: false
      }
    }
  },
  VideoEncode_v2: {
    version: 'v2',
    name: 'VideoEncode',
    description: '视频编码组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      output_stream_url: {
        type: 'string',
        label: '输出地址'
      }
    }
  },
  RoiFilter_v2: {
    version: 'v2',
    name: 'RoiFilter',
    description: '视频读取组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      regions_with_label: {
        type: 'array',
        label: '区域'
      },
      threshold: {
        type: 'number',
        default: 0.5,
        label: '阈值'
      }
    }
  },
  Pose_v2: {
    version: 'v2',
    name: 'Pose',
    description: '姿态估计组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      mod_iter_id: {
        default: '',
        label: '模型ID',
        type: 'string',
        hide: true
      },
      mod_labels: {
        default: {},
        label: '标签列表',
        type: 'object',
        hide: true
      },
      mod_name: {
        default: '',
        label: '模型名称',
        type: 'string',
        hide: true
      },
      mod_path: {
        default: '',
        label: '模型文件',
        type: 'string',
        hide: true
      },
      best_threshold: {
        default: 0,
        label: '模型阈值',
        type: 'number',
        readonly: true
      },
      frame_rate: {
        default: 15,
        label: '推理帧率',
        type: 'number'
      }
    }
  },
  Classifier_v2: {
    version: 'v2',
    name: 'Classifier',
    description: '分类推理组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      mod_iter_id: {
        default: '',
        label: '模型ID',
        type: 'string',
        hide: true
      },
      mod_labels: {
        default: {},
        label: '标签列表',
        type: 'object',
        hide: true
      },
      mod_name: {
        default: '',
        label: '模型名称',
        type: 'string',
        hide: true
      },
      mod_path: {
        default: '',
        label: '模型文件',
        type: 'string',
        hide: true
      },
      best_threshold: {
        default: 0,
        label: '模型阈值',
        type: 'number',
        readonly: true
      },
      frame_rate: {
        default: 15,
        label: '推理帧率',
        type: 'number'
      }
    }
  },
  CropImage_v2: {
    version: 'v2',
    name: 'CropImage',
    description: '扣图组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      expansion_factor: {
        type: 'number',
        label: '膨胀系数',
        default: 1.0
      },
      interlaced_number: {
        type: 'number',
        label: '隔帧数',
        default: 4
      },
      max_target_number: {
        type: 'number',
        label: '最多扣图目标数',
        default: 8
      }
    }
  },
  BoxFilter_v2: {
    version: 'v2',
    name: 'BoxFilter',
    description: '目标框过滤组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      min_width: {
        type: 'number',
        label: '最小目标宽',
        default: 0
      },
      max_width: {
        type: 'number',
        label: '最大目标宽',
        default: 4096
      },
      min_height: {
        type: 'number',
        label: '最小目标高',
        default: 0
      },
      max_height: {
        type: 'number',
        label: '最大目标高',
        default: 2160
      },
      min_area: {
        type: 'number',
        label: '最小目标面积',
        default: 0
      },
      max_area: {
        type: 'number',
        label: '最大目标面积',
        default: 8847360
      },
      min_count: {
        type: 'number',
        label: '最少目标数',
        default: 0
      },
      max_count: {
        type: 'number',
        label: '最多目标数',
        default: 1000
      },
      box_prob: {
        type: 'number',
        label: '目标置信度'
      },
      box_labels: {
        type: 'array',
        label: '目标标签'
      }
    }
  },
  CvDecoder_v2: {
    version: 'v2',
    description: 'OpenCV 解码组件',
    feature_flags: false,
    inputs: [],
    name: 'CvDecoder',
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      },
      {
        id: 1,
        name: 'cv_frame'
      }
    ],
    props: {
      input_url: {
        default: '',
        label: '输入源地址',
        type: 'string'
      },
      enable_input_types: {
        default: ['Video'],
        label: '输入类型',
        enum: ['Camera', 'Video'],
        type: 'stringArray'
      }
    }
  },
  MediaDecoder_v2: {
    version: 'v2',
    description: '多媒体解码组件',
    feature_flags: false,
    inputs: [],
    name: 'MediaDecoder',
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      },
      {
        id: 1,
        name: 'cv_frame'
      }
    ],
    props: {
      input_url: {
        default: '',
        label: '输入源地址',
        type: 'string',
        hide: true
      },
      enable_input_types: {
        default: ['Video'],
        label: '输入类型',
        enum: ['Camera', 'Video'],
        type: 'stringArray'
      }
    }
  },
  TargetTracker_v2: {
    version: 'v2',
    name: 'TargetTracker',
    description: '目标跟踪组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      continuous_tracking_time: {
        default: 0,
        label: '持续跟踪时间(s)',
        type: 'number'
      },
      max_lost_time: {
        default: 4,
        label: '目标丢失时间(s)',
        type: 'number'
      },
      lost_report: {
        default: false,
        label: '目标丢失上报',
        type: 'boolean'
      }
    }
  },
  LogicGate_v2: {
    version: 'v2',
    name: 'LogicGate',
    description: '逻辑门组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      labels: {
        type: 'stringArray',
        label: '目标标签',
        enum: [
          'person',
          'oil_car',
          'warning_sign',
          'extinguisher',
          'face',
          'face_mask'
        ]
      },
      operation: {
        type: 'string',
        label: '运算规则',
        default: ''
      },
      duration: {
        type: 'number',
        label: '持续时间(s)',
        default: 1
      }
    }
  },
  Direction_v2: {
    version: 'v2',
    name: 'Direction',
    description: '方向计算组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      direction: {
        type: 'number',
        label: '方向',
        default: 0
      },
      direction_thresh: {
        type: 'number',
        label: '方向偏差阈值',
        default: 0
      },
      distance_thresh: {
        type: 'number',
        label: '间距阈值',
        default: 0
      },
      duration: {
        type: 'number',
        label: '计算周期(s)',
        default: 1
      }
    }
  },
  ImageServer_v2: {
    version: 'v2',
    name: 'ImageServer',
    description: '图像推理组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      srv_port: {
        type: 'number',
        label: '端口',
        default: 9092
      }
    }
  },
  Inference_v2: {
    version: 'v2',
    name: 'Inference',
    description: '推理组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      mod_iter_id: {
        default: '',
        label: '模型ID',
        type: 'string',
        hide: true
      },
      mod_labels: {
        default: {},
        label: '标签列表',
        type: 'object',
        hide: true
      },
      mod_name: {
        default: '',
        label: '模型名称',
        type: 'string',
        hide: true
      },
      mod_path: {
        default: '',
        label: '模型文件',
        type: 'string',
        hide: true
      },
      accelerate: {
        default: '',
        label: '加速器类型',
        type: 'string',
        readonly: true
      },
      best_threshold: {
        default: 0,
        label: '模型阈值',
        type: 'number',
        readonly: true
      },
      frame_rate: {
        default: 15,
        label: '推理帧率',
        type: 'number'
      },
      instances: {
        default: 1,
        label: '推理实例数',
        type: 'number'
      }
    }
  },
  RegionalAlert_v2: {
    version: 'v2',
    name: 'RegionalAlert',
    description: '区域告警组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      param_matrix: {
        type: 'string',
        label: '参数矩阵'
      }
    }
  },
  MsgSubscribe_v2: {
    version: 'v2',
    name: 'MsgSubscribe',
    description: '消息订阅组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      every_frame: {
        type: 'boolean',
        label: '每帧都推送',
        default: false
      },
      time_interval: {
        type: 'number',
        label: '时间间隔',
        default: 0
      }
    }
  },
  SegCalculation_v2: {
    version: 'v2',
    name: 'SegCalculation',
    description: '分割计算组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      param_matrix: {
        type: 'string',
        label: '参数矩阵'
      },
      enable_area: {
        default: false,
        label: '计算面积',
        type: 'boolean'
      },
      enable_length: {
        default: false,
        label: '计算长度',
        type: 'boolean'
      },
      enable_volume: {
        default: false,
        label: '计算体积',
        type: 'boolean'
      },
      area_thresh: {
        default: 10000,
        label: '面积阈值',
        type: 'number'
      }
    }
  },
  ActionCounter_v2: {
    version: 'v2',
    name: 'ActionCounter',
    description: '动作计数组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      action_param: {
        type: 'string',
        label: '动作参数'
      },
      sliding_window: {
        default: 0,
        label: '滑动窗口',
        type: 'number'
      }
    }
  },
  ActionPair_v2: {
    version: 'v2',
    name: 'ActionPair',
    description: '动作匹配组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      action_param: {
        label: '动作参数',
        type: 'string'
      },
      standard_file: {
        label: '标准动作配置文件',
        type: 'string'
      },
      threshold: {
        default: 0.5,
        label: '阈值',
        type: 'number'
      }
    }
  },
  ProbFilter_v2: {
    version: 'v2',
    name: 'ProbFilter',
    description: '置信度过滤组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      box_prob: {
        type: 'number',
        label: '目标置信度',
        default: 0.1
      },
      key_point_prob: {
        type: 'number',
        label: '关键点置信度',
        default: 0.1
      }
    }
  },
  Mosaic_v2: {
    version: 'v2',
    name: 'Mosaic',
    description: '马赛克脱敏组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      check_bbox: {
        type: 'boolean',
        label: '检测框脱敏',
        default: false
      },
      check_key_point: {
        type: 'boolean',
        label: '姿态人脸脱敏',
        default: false
      }
    }
  },
  TargetTracker_v3: {
    version: 'v3',
    name: 'TargetTracker',
    description: '目标跟踪组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      continuous_tracking_time: {
        default: 0,
        label: '持续跟踪时间(s)',
        type: 'number'
      },
      max_lost_time: {
        default: 4,
        label: '目标丢失时间(s)',
        type: 'number'
      }
    }
  },
  Report_v3: {
    version: 'v3',
    name: 'Report',
    description: '数据上报组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      report_url: {
        type: 'string',
        label: '上报服务地址'
      },
      time_interval: {
        type: 'number',
        label: '上报时间间隔',
        default: 0
      },
      lost_report: {
        type: 'boolean',
        label: '目标丢失上报',
        default: false
      }
    }
  },
  RoiCrop_v2: {
    version: 'v2',
    name: 'RoiCrop',
    description: 'ROI扣图组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      regions_with_label: {
        type: 'array',
        label: '区域'
      }
    }
  },
  TrackFilter_v3: {
    version: 'v3',
    name: 'TrackFilter',
    description: '跟踪过滤组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {}
  },
  CropImage_v3: {
    version: 'v3',
    name: 'CropImage',
    description: '扣图组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      expansion_factor: {
        type: 'number',
        label: '膨胀系数',
        default: 1.0
      },
      interlaced_number: {
        type: 'number',
        label: '隔帧数',
        default: 4
      },
      max_target_number: {
        type: 'number',
        label: '最多扣图目标数',
        default: 8
      }
    }
  },
  CrossCounter_v2: {
    version: 'v2',
    name: 'CrossCounter',
    description: '越界计数组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      regions_with_label: {
        type: 'array',
        label: '边界'
      },
      margin: {
        type: 'number',
        label: '边界宽度'
      }
    }
  },
  CameraStatus_v2: {
    version: 'v2',
    name: 'CameraStatus',
    description: '摄像头状态组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      moving_threshold: {
        type: 'number',
        label: '移动阈值'
      },
      staing_interval: {
        type: 'number',
        label: '停留间隔(s)',
        default: 0
      }
    }
  },
  TargetCounter_v2: {
    version: 'v2',
    name: 'TargetCounter',
    description: '目标计数组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    outputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      counting_logic: {
        type: 'string',
        label: '计数逻辑'
      },
      counting_times: {
        type: 'number',
        label: '统计次数(天)'
      }
    }
  },
  JpegPreviewer_v2: {
    version: 'v2',
    name: 'JpegPreviewer',
    description: 'JPEG预览组件',
    inputs: [
      {
        id: 0,
        name: 'cv_frame'
      }
    ],
    props: {
      quality: {
        type: 'string',
        label: '预览质量'
      },
      masking: {
        type: 'boolean',
        label: '背景脱敏',
        default: false
      },
      node_name: {
        type: 'string',
        label: '组件名称',
        default: 'TargetTracker_v2_3'
      }
    }
  }
}

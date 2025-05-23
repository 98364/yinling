// 模拟数据文件，用于前端演示

// 运动计划数据
const exercisePlans = [
  {
    id: 1,
    name: '轻松太极拳',
    shortDesc: '每周3次，每次20分钟',
    description: '太极拳是一种低强度有氧运动，尤其适合高血压和关节不适的老年人。通过缓慢、流畅的动作，结合深呼吸，帮助改善血液循环，降低血压，并增强心肺功能。',
    image: '/assets/images/taichi.jpg',
    icon: '/assets/images/taichi_icon.png',
    intensity: '低强度',
    category: '有氧运动',
    duration: 20,
    progress: 60,
    healthTips: '运动前请先热身，感觉不适随时停止。高血压患者应避免头部过低的动作。',
    videoUrl: '/assets/videos/taichi_tutorial.mp4',
    tutorialSteps: [
      {
        image: '/assets/images/taichi_step1.jpg',
        description: '双脚与肩同宽站立，膝盖微屈，保持身体放松。'
      },
      {
        image: '/assets/images/taichi_step2.jpg',
        description: '两臂缓慢向前抬起至胸前，如抱球状态，呼气。'
      },
      {
        image: '/assets/images/taichi_step3.jpg',
        description: '两臂向两侧分开，同时吸气。'
      },
      {
        image: '/assets/images/taichi_step4.jpg',
        description: '两臂缓慢下落回到身体两侧，呼气。'
      }
    ],
    schedule: [
      {
        day: '周一',
        content: '太极拳基础动作，20分钟'
      },
      {
        day: '周三',
        content: '太极拳套路练习，25分钟'
      },
      {
        day: '周五',
        content: '太极拳全套动作，30分钟'
      }
    ]
  },
  {
    id: 2,
    name: '健步走',
    shortDesc: '每天30分钟慢节奏步行',
    description: '健步走是最简单易行的有氧运动，适合各年龄段人群。对于老年人来说，每天30分钟的健步走可以提高心肺功能，增强下肢力量，改善平衡感。',
    image: '/assets/images/walking.jpg',
    icon: '/assets/images/walking_icon.png',
    intensity: '中低强度',
    category: '有氧运动',
    duration: 30,
    progress: 45,
    healthTips: '选择平坦的路面行走，穿着舒适的鞋子，注意保暖。走路时保持背部挺直，目视前方。',
    videoUrl: '/assets/videos/walking_tutorial.mp4',
    tutorialSteps: [
      {
        image: '/assets/images/walking_step1.jpg',
        description: '挺直腰背，收腹，自然呼吸。'
      },
      {
        image: '/assets/images/walking_step2.jpg',
        description: '脚跟先着地，然后是脚掌和脚趾。'
      },
      {
        image: '/assets/images/walking_step3.jpg',
        description: '手臂自然摆动，增加行走稳定性。'
      }
    ],
    schedule: [
      {
        day: '每天',
        content: '健步走，30分钟'
      }
    ]
  },
  {
    id: 3,
    name: '关节保护训练',
    shortDesc: '低强度关节灵活性训练',
    description: '这套训练专为关节不适的老年人设计，通过缓慢、轻柔的动作，增加关节灵活性，减轻疼痛，预防关节退化。',
    image: '/assets/images/joint.jpg',
    icon: '/assets/images/joint_icon.png',
    intensity: '低强度',
    category: '关节训练',
    duration: 15,
    progress: 30,
    healthTips: '动作幅度以不引起疼痛为宜，感到不适立即停止。每个动作保持5-10秒，不要屏气。',
    videoUrl: '/assets/videos/joint_tutorial.mp4',
    tutorialSteps: [
      {
        image: '/assets/images/joint_step1.jpg',
        description: '坐姿转头：坐直，缓慢向左右转头，各5次。'
      },
      {
        image: '/assets/images/joint_step2.jpg',
        description: '肩部环绕：双肩缓慢向前、向上、向后、向下画圈，10次。'
      },
      {
        image: '/assets/images/joint_step3.jpg',
        description: '坐姿抬腿：坐直，缓慢抬起一条腿，保持5秒，放下，换另一条腿。各10次。'
      },
      {
        image: '/assets/images/joint_step4.jpg',
        description: '踝关节转动：坐姿，一只脚抬起，脚踝顺时针和逆时针各转动10次。'
      }
    ],
    schedule: [
      {
        day: '周二',
        content: '关节保护基础训练，15分钟'
      },
      {
        day: '周四',
        content: '关节保护进阶训练，20分钟'
      },
      {
        day: '周六',
        content: '关节保护放松训练，15分钟'
      }
    ]
  },
  {
    id: 4,
    name: '居家柔韧性训练',
    shortDesc: '提高身体柔韧性的简单训练',
    description: '这套柔韧性训练针对老年人设计，可以在家中轻松完成。通过温和的拉伸动作，改善肌肉柔韧性，增加关节活动范围，预防跌倒。',
    image: '/assets/images/stretch.jpg',
    icon: '/assets/images/stretch_icon.png',
    intensity: '低强度',
    category: '柔韧训练',
    duration: 20,
    progress: 10,
    healthTips: '拉伸动作要缓慢，不要弹跳，感到轻微拉伸感即可，不要疼痛。有严重骨质疏松者应在专业指导下进行。',
    videoUrl: '/assets/videos/stretch_tutorial.mp4',
    tutorialSteps: [
      {
        image: '/assets/images/stretch_step1.jpg',
        description: '颈部拉伸：缓慢向左右、前后倾斜头部，每个方向保持10秒。'
      },
      {
        image: '/assets/images/stretch_step2.jpg',
        description: '坐姿体侧伸展：坐直，一只手高举过头，身体向另一侧倾斜，感受侧腰拉伸。'
      },
      {
        image: '/assets/images/stretch_step3.jpg',
        description: '坐姿腿部拉伸：坐直，一条腿伸直，上身前倾，感受大腿后侧拉伸。'
      }
    ],
    schedule: [
      {
        day: '周一',
        content: '上肢柔韧性训练，20分钟'
      },
      {
        day: '周三',
        content: '下肢柔韧性训练，20分钟'
      },
      {
        day: '周五',
        content: '全身柔韧性训练，20分钟'
      }
    ]
  }
];

// 日常运动记录
const exerciseRecords = [
  {
    id: 1,
    date: '2023-11-10',
    type: '太极拳',
    duration: 25,
    intensity: '低强度',
    note: '今天完成了25分钟的太极拳练习，感觉气息更顺畅了。'
  },
  {
    id: 2,
    date: '2023-11-09',
    type: '健步走',
    duration: 30,
    intensity: '中低强度',
    note: '在小区内走了30分钟，大约4000步。'
  },
  {
    id: 3,
    date: '2023-11-08',
    type: '关节保护训练',
    duration: 15,
    intensity: '低强度',
    note: '完成了关节保护训练，膝盖疼痛感有所减轻。'
  },
  {
    id: 4,
    date: '2023-11-07',
    type: '太极拳',
    duration: 20,
    intensity: '低强度',
    note: '练习太极拳基础动作，动作更协调了。'
  }
];

// 社区帖子数据
const communityPosts = [
  {
    id: 1,
    username: '健康达人',
    avatar: '/assets/images/avatar1.png',
    time: '今天 10:30',
    type: '运动打卡',
    content: '今天完成了30分钟太极拳，感觉气血通畅，心情舒畅！坚持锻炼一个月，血压明显稳定了。',
    images: ['/assets/images/exercise_post1.jpg', '/assets/images/exercise_post2.jpg'],
    likes: 18,
    comments: 5,
    isLiked: false
  },
  {
    id: 2,
    username: '银铃用户',
    avatar: '/assets/images/avatar2.png',
    time: '昨天 16:45',
    type: '话题交流',
    title: '关节保护小技巧',
    content: '最近膝盖不太舒服，医生建议我做一些简单的关节保护运动，分享给大家。\n\n1. 坐姿抬腿：坐在椅子上，双手扶住椅子两侧，慢慢抬起一条腿，保持5秒钟，然后放下，换另一条腿。每条腿重复10次。\n\n2. 轻微弯曲：站立时，轻微弯曲膝盖，不要完全锁直，这样可以减轻关节压力。\n\n3. 游泳：水中运动能减轻关节负担，特别是游泳。\n\n4. 保持适当体重：减轻体重可以显著减轻关节压力。',
    likes: 26,
    comments: 8,
    isLiked: true
  },
  {
    id: 3,
    username: '快乐老伙计',
    avatar: '/assets/images/avatar3.png',
    time: '3天前',
    type: '运动打卡',
    content: '和老伙伴们一起晨练，今天走了5000步！',
    images: ['/assets/images/exercise_post3.jpg'],
    likes: 35,
    comments: 12,
    isLiked: false
  },
  {
    id: 4,
    username: '健康顾问',
    avatar: '/assets/images/avatar4.png',
    time: '4天前',
    type: '话题交流',
    title: '高血压饮食建议',
    content: '高血压患者在日常饮食中应该注意少盐、多钾、控制体重。推荐多吃蔬菜水果，如香蕉、土豆、西红柿等含钾丰富的食物，少吃加工食品。',
    voiceUrl: '/assets/audio/health_advice.mp3',
    voiceDuration: 45,
    likes: 56,
    comments: 16,
    isLiked: false
  },
  {
    id: 5,
    username: '乐活达人',
    avatar: '/assets/images/avatar5.png',
    time: '5天前',
    type: '话题交流',
    title: '适合老年人的居家运动',
    content: '分享几个适合老年人在家就能做的简单运动：\n1. 坐站交替：反复从椅子上站起再坐下，锻炼腿部力量\n2. 墙俯卧撑：面对墙壁做俯卧撑，强度可自行调整\n3. 踮脚尖：扶着椅背，反复踮起脚尖，增强小腿力量和平衡感',
    likes: 42,
    comments: 14,
    isLiked: false
  }
];

// 社区评论数据
const postComments = {
  // 针对帖子id=2的评论
  2: [
    {
      id: 1,
      username: '健康达人',
      avatar: '/assets/images/avatar1.png',
      content: '非常实用的建议！我每天都会做类似的运动，膝盖确实舒服了很多。',
      time: '昨天 17:30',
      replies: [
        {
          id: 101,
          username: '银铃用户',
          content: '谢谢分享，你坚持多久了？',
          time: '昨天 18:20',
          replyTo: '健康达人'
        },
        {
          id: 102,
          username: '健康达人',
          content: '已经坚持了2个月，效果很明显',
          time: '昨天 19:15',
          replyTo: '银铃用户'
        }
      ]
    },
    {
      id: 2,
      username: '快乐老伙计',
      avatar: '/assets/images/avatar3.png',
      content: '游泳确实是很好的选择，特别是对我们老年人来说，负担小效果好。',
      time: '昨天 18:45',
      replies: []
    }
  ],
  // 针对帖子id=1的评论
  1: [
    {
      id: 3,
      username: '乐活达人',
      avatar: '/assets/images/avatar5.png',
      content: '太极拳真的很适合我们这个年龄段的人，既能锻炼身体又能静心。',
      time: '今天 11:15',
      replies: []
    },
    {
      id: 4,
      username: '健康顾问',
      avatar: '/assets/images/avatar4.png',
      content: '坚持运动是控制血压的好方法，建议配合健康饮食效果更好。',
      time: '今天 12:30',
      replies: [
        {
          id: 103,
          username: '健康达人',
          content: '是的，我也注意饮食，少盐少油，多吃蔬果。',
          time: '今天 13:05',
          replyTo: '健康顾问'
        }
      ]
    }
  ]
};

// 健康知识库数据
const healthKnowledge = [
  {
    id: 1,
    title: '老年人运动注意事项',
    image: '/assets/images/elderly_exercise.jpg',
    category: '运动安全',
    summary: '老年人运动需注意循序渐进，选择低强度运动，运动前热身...',
    content: '老年人运动需要特别注意以下几点：\n1. 循序渐进：开始时选择低强度运动，逐渐增加运动量。\n2. 充分热身：运动前5-10分钟热身，预防受伤。\n3. 注意安全：选择平坦场地，穿着防滑鞋。\n4. 掌握适度：运动中如感到不适，应立即停止。\n5. 坚持规律：每周至少运动3-5次，每次20-30分钟。',
    createTime: '2023-10-15'
  },
  {
    id: 2,
    title: '高血压患者的饮食建议',
    image: '/assets/images/hypertension_diet.jpg',
    category: '慢性病管理',
    summary: '高血压患者应减少盐分摄入，增加钾的摄入，控制体重...',
    content: '高血压患者的饮食建议：\n1. 控制钠盐摄入：每日盐摄入量不超过5克。\n2. 增加钾的摄入：多吃香蕉、土豆、西红柿等富含钾的食物。\n3. 限制饱和脂肪：减少动物脂肪摄入，多吃植物油。\n4. 多吃蔬果：每日蔬菜500克，水果200克。\n5. 适量饮酒：男性每日不超过25克酒精，女性不超过15克。\n6. 控制体重：维持健康体重，减轻体重可显著降低血压。',
    createTime: '2023-10-20'
  },
  {
    id: 3,
    title: '老年人膝关节保护方法',
    image: '/assets/images/knee_protection.jpg',
    category: '关节保护',
    summary: '膝关节问题是老年人常见的健康问题，本文介绍如何保护膝关节...',
    content: '老年人膝关节保护方法：\n1. 控制体重：减轻体重可减轻膝关节负担。\n2. 正确行走：走路时脚跟先着地，减少膝关节冲击。\n3. 加强肌力：强化大腿肌肉，支撑膝关节。\n4. 避免过度负重：减少爬楼梯、深蹲等动作。\n5. 选择合适运动：游泳、骑自行车等低冲击运动。\n6. 穿着合适鞋：选择有足弓支撑的舒适鞋。\n7. 使用辅助工具：必要时使用拐杖减轻膝关节负担。',
    createTime: '2023-11-01'
  },
  {
    id: 4,
    title: '老年人睡眠改善指南',
    image: '/assets/images/sleep_improvement.jpg',
    category: '健康生活',
    summary: '随着年龄增长，睡眠质量可能下降，本文提供改善老年人睡眠的方法...',
    content: '老年人睡眠改善指南：\n1. 规律作息：每天固定时间睡觉和起床。\n2. 创造环境：保持卧室安静、黑暗、舒适。\n3. 白天活动：适当运动，避免久坐。\n4. 控制午睡：午睡不超过30分钟。\n5. 避免刺激：睡前不喝茶、咖啡，不看刺激性节目。\n6. 放松身心：睡前可做深呼吸、听轻柔音乐。\n7. 饮食注意：晚餐不宜过饱，睡前避免大量饮水。',
    createTime: '2023-11-05'
  }
];

// 健康统计数据
const healthStatistics = {
  exerciseData: {
    weekly: [
      { date: '周一', minutes: 20 },
      { date: '周二', minutes: 15 },
      { date: '周三', minutes: 25 },
      { date: '周四', minutes: 0 },
      { date: '周五', minutes: 30 },
      { date: '周六', minutes: 20 },
      { date: '周日', minutes: 15 }
    ],
    monthly: [
      { week: '第一周', minutes: 120 },
      { week: '第二周', minutes: 150 },
      { week: '第三周', minutes: 110 },
      { week: '第四周', minutes: 130 }
    ],
    exerciseTypes: [
      { type: '太极拳', percentage: 40 },
      { type: '健步走', percentage: 35 },
      { type: '关节训练', percentage: 15 },
      { type: '其他', percentage: 10 }
    ]
  },
  healthData: {
    weight: [
      { date: '10月', value: 68 },
      { date: '11月初', value: 67.5 },
      { date: '11月中', value: 67 },
      { date: '11月底', value: 66.5 }
    ],
    bloodPressure: [
      { date: '10月', systolic: 145, diastolic: 90 },
      { date: '11月初', systolic: 140, diastolic: 88 },
      { date: '11月中', systolic: 138, diastolic: 87 },
      { date: '11月底', systolic: 135, diastolic: 85 }
    ]
  }
};

// 用户健康统计数据
const userStats = {
  exerciseStats: {
    totalDays: 15,
    streak: 3,
    healthPoints: 800,
    weeklyData: [
      { day: '周一', minutes: 30 },
      { day: '周二', minutes: 45 },
      { day: '周三', minutes: 0 },
      { day: '周四', minutes: 60 },
      { day: '周五', minutes: 20 },
      { day: '周六', minutes: 90 },
      { day: '周日', minutes: 45 }
    ],
    monthlyData: [
      { month: '1月', totalMinutes: 620 },
      { month: '2月', totalMinutes: 540 },
      { month: '3月', totalMinutes: 720 },
      { month: '4月', totalMinutes: 800 },
      { month: '5月', totalMinutes: 900 },
      { month: '6月', totalMinutes: 750 }
    ]
  },
  healthStats: {
    weight: [
      { date: '2023-06-01', value: 70.5 },
      { date: '2023-06-08', value: 70.2 },
      { date: '2023-06-15', value: 69.8 },
      { date: '2023-06-22', value: 69.5 },
      { date: '2023-06-29', value: 69.0 }
    ],
    bloodPressure: [
      { date: '2023-06-01', systolic: 130, diastolic: 85 },
      { date: '2023-06-08', systolic: 128, diastolic: 84 },
      { date: '2023-06-15', systolic: 125, diastolic: 82 },
      { date: '2023-06-22', systolic: 123, diastolic: 80 },
      { date: '2023-06-29', systolic: 120, diastolic: 78 }
    ],
    sleepHours: [
      { date: '2023-06-23', value: 7.5 },
      { date: '2023-06-24', value: 8.0 },
      { date: '2023-06-25', value: 6.5 },
      { date: '2023-06-26', value: 7.0 },
      { date: '2023-06-27', value: 7.8 },
      { date: '2023-06-28', value: 8.2 },
      { date: '2023-06-29', value: 7.5 }
    ]
  },
  achievements: [
    { id: 1, title: '运动启航', description: '完成第一次运动记录', date: '2023-05-10', icon: 'medal1.png' },
    { id: 2, title: '坚持一周', description: '连续7天完成运动计划', date: '2023-05-17', icon: 'medal2.png' },
    { id: 3, title: '运动达人', description: '累计运动时间超过30小时', date: '2023-06-05', icon: 'medal3.png' },
    { id: 4, title: '社区活跃', description: '发布10篇社区帖子', date: '2023-06-20', icon: 'medal4.png' }
  ]
};

// 导出所有模拟数据
module.exports = {
  exercisePlans,
  exerciseRecords,
  communityPosts,
  postComments,
  healthKnowledge,
  healthStatistics,
  userStats
}; 
const app = getApp();

Page({
  data: {
    userInfo: null,
    healthProfile: null,
    loading: true,
    // 基本信息表单
    age: '',
    gender: '男',
    height: '',
    weight: '',
    // 慢性病选项
    chronicDiseases: [],
    chronicDiseaseOptions: [
      { id: 'hypertension', name: '高血压' },
      { id: 'diabetes', name: '糖尿病' },
      { id: 'heart_disease', name: '心脏病' },
      { id: 'osteoporosis', name: '骨质疏松' },
      { id: 'arthritis', name: '关节炎' },
      { id: 'others', name: '其他' }
    ],
    // 体能水平选项
    fitnessLevel: 'medium',
    fitnessLevelOptions: [
      { id: 'low', name: '低（几乎不运动）' },
      { id: 'medium', name: '中（偶尔运动）' },
      { id: 'high', name: '高（经常运动）' }
    ],
    // 健康目标选项
    healthGoals: [],
    healthGoalOptions: [
      { id: 'control_blood_pressure', name: '控制血压' },
      { id: 'control_blood_sugar', name: '控制血糖' },
      { id: 'strengthen_cardiopulmonary', name: '增强心肺功能' },
      { id: 'increase_bone_density', name: '增加骨密度' },
      { id: 'reduce_joint_pain', name: '减轻关节疼痛' },
      { id: 'improve_sleep', name: '改善睡眠' },
      { id: 'weight_management', name: '体重管理' }
    ],
    // 运动习惯
    exerciseHabits: {
      frequency: 0, // 每周运动次数
      duration: 0, // 每次持续时间（分钟）
      preferredExercises: [] // 偏好的运动类型
    },
    exerciseTypeOptions: [
      { id: 'walking', name: '散步' },
      { id: 'jogging', name: '慢跑' },
      { id: 'dancing', name: '广场舞' },
      { id: 'swimming', name: '游泳' },
      { id: 'taichi', name: '太极拳' },
      { id: 'yoga', name: '瑜伽' },
      { id: 'strength', name: '力量训练' },
      { id: 'cycling', name: '骑自行车' },
      { id: 'others', name: '其他' }
    ],
    saveLoading: false,
    success: false
  },

  onLoad: function (options) {
    if (!app.globalData.isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/login',
      });
      return;
    }
    
    this.fetchHealthProfile();
  },

  // 获取健康档案
  fetchHealthProfile: function () {
    const token = app.globalData.token;
    if (!token) return;

    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      url: `${app.globalData.apiBaseUrl}/api/users/profile`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}`
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.success) {
          const userData = res.data.data;
          const healthData = userData.health_profile || {};
          
          this.setData({
            userInfo: userData,
            healthProfile: healthData,
            loading: false,
            age: healthData.age || '',
            gender: healthData.gender === 'female' ? '女' : '男',
            height: healthData.height || '',
            weight: healthData.weight || '',
            chronicDiseases: healthData.chronicDiseases || [],
            fitnessLevel: healthData.fitnessLevel || 'medium',
            healthGoals: healthData.healthGoals || [],
            exerciseHabits: healthData.exerciseHabits || {
              frequency: 0,
              duration: 0,
              preferredExercises: []
            }
          });
        } else {
          this.setData({ loading: false });
          wx.showToast({
            title: '获取健康档案失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('获取健康档案失败', err);
        wx.hideLoading();
        this.setData({ loading: false });
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  },

  // 输入年龄
  inputAge: function (e) {
    this.setData({
      age: e.detail.value
    });
  },

  // 选择性别
  selectGender: function (e) {
    this.setData({
      gender: e.detail.value
    });
  },

  // 输入身高
  inputHeight: function (e) {
    this.setData({
      height: e.detail.value
    });
  },

  // 输入体重
  inputWeight: function (e) {
    this.setData({
      weight: e.detail.value
    });
  },

  // 选择慢性病
  toggleChronicDisease: function (e) {
    const diseaseId = e.currentTarget.dataset.id;
    const chronicDiseases = [...this.data.chronicDiseases];
    
    const index = chronicDiseases.indexOf(diseaseId);
    if (index > -1) {
      chronicDiseases.splice(index, 1);
    } else {
      chronicDiseases.push(diseaseId);
    }
    
    this.setData({
      chronicDiseases
    });
  },

  // 选择体能水平
  selectFitnessLevel: function (e) {
    this.setData({
      fitnessLevel: e.detail.value
    });
  },

  // 选择健康目标
  toggleHealthGoal: function (e) {
    const goalId = e.currentTarget.dataset.id;
    const healthGoals = [...this.data.healthGoals];
    
    const index = healthGoals.indexOf(goalId);
    if (index > -1) {
      healthGoals.splice(index, 1);
    } else {
      healthGoals.push(goalId);
    }
    
    this.setData({
      healthGoals
    });
  },

  // 输入运动频率
  inputExerciseFrequency: function (e) {
    const exerciseHabits = {...this.data.exerciseHabits};
    exerciseHabits.frequency = parseInt(e.detail.value) || 0;
    this.setData({
      exerciseHabits
    });
  },

  // 输入运动时长
  inputExerciseDuration: function (e) {
    const exerciseHabits = {...this.data.exerciseHabits};
    exerciseHabits.duration = parseInt(e.detail.value) || 0;
    this.setData({
      exerciseHabits
    });
  },

  // 选择偏好的运动类型
  toggleExerciseType: function (e) {
    const typeId = e.currentTarget.dataset.id;
    const exerciseHabits = {...this.data.exerciseHabits};
    const preferredExercises = [...exerciseHabits.preferredExercises];
    
    const index = preferredExercises.indexOf(typeId);
    if (index > -1) {
      preferredExercises.splice(index, 1);
    } else {
      preferredExercises.push(typeId);
    }
    
    exerciseHabits.preferredExercises = preferredExercises;
    this.setData({
      exerciseHabits
    });
  },

  // 保存健康档案
  saveHealthProfile: function () {
    const token = app.globalData.token;
    if (!token) return;

    // 格式化数据
    const data = {
      age: parseInt(this.data.age) || null,
      gender: this.data.gender === '女' ? 'female' : 'male',
      height: parseFloat(this.data.height) || null,
      weight: parseFloat(this.data.weight) || null,
      chronicDiseases: this.data.chronicDiseases,
      fitnessLevel: this.data.fitnessLevel,
      healthGoals: this.data.healthGoals,
      exerciseHabits: this.data.exerciseHabits
    };

    this.setData({ saveLoading: true });

    wx.request({
      url: `${app.globalData.apiBaseUrl}/api/users/health-profile`,
      method: 'PUT',
      header: {
        'Authorization': `Bearer ${token}`
      },
      data: data,
      success: (res) => {
        if (res.data.success) {
          this.setData({ 
            saveLoading: false,
            success: true 
          });
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          });
          
          // 3秒后返回上一页
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        } else {
          this.setData({ saveLoading: false });
          wx.showToast({
            title: res.data.message || '保存失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('保存健康档案失败', err);
        this.setData({ saveLoading: false });
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  }
}); 
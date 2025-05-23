// pages/community/create.js
const innerAudioContext = wx.createInnerAudioContext();
const recorderManager = wx.getRecorderManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postType: 'checkin', // checkin 运动打卡, topic 话题交流
    title: '',
    content: '',
    images: [],
    voiceUrl: '',
    voiceDuration: 0,
    location: '',
    selectedTopic: '',
    canPublish: false,
    isPlaying: false,
    isRecording: false,
    recordTime: 0,
    recordTimer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.type) {
      this.setData({
        postType: options.type
      });
    }
    
    this.initAudio();
    this.initVoiceRecord();
  },

  /**
   * 初始化音频播放器
   */
  initAudio() {
    innerAudioContext.onPlay(() => {
      this.setData({
        isPlaying: true
      });
    });
    
    innerAudioContext.onStop(() => {
      this.setData({
        isPlaying: false
      });
    });
    
    innerAudioContext.onEnded(() => {
      this.setData({
        isPlaying: false
      });
    });
  },

  /**
   * 初始化语音录制
   */
  initVoiceRecord() {
    // 监听录音开始事件
    recorderManager.onStart(() => {
      this.setData({
        isRecording: true,
        recordTime: 0
      });
      
      // 开始计时
      this.data.recordTimer = setInterval(() => {
        this.setData({
          recordTime: this.data.recordTime + 1
        });
        
        // 限制最长录音时间
        if (this.data.recordTime >= 60) {
          this.endVoiceRecord();
        }
      }, 1000);
    });
    
    // 监听录音停止事件
    recorderManager.onStop((res) => {
      if (this.data.recordTimer) {
        clearInterval(this.data.recordTimer);
      }
      
      this.setData({
        isRecording: false
      });
      
      const { tempFilePath, duration } = res;
      
      // 语音时长过短
      if (duration < 1000) {
        wx.showToast({
          title: '语音时间太短',
          icon: 'none'
        });
        return;
      }
      
      this.setData({
        voiceUrl: tempFilePath,
        voiceDuration: Math.floor(duration / 1000)
      });
      
      this.checkCanPublish();
    });
    
    // 监听录音错误事件
    recorderManager.onError((res) => {
      wx.showToast({
        title: '录音失败: ' + res.errMsg,
        icon: 'none'
      });
      this.setData({
        isRecording: false
      });
      
      if (this.data.recordTimer) {
        clearInterval(this.data.recordTimer);
      }
    });
  },

  /**
   * 切换帖子类型
   */
  switchType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      postType: type
    });
  },

  /**
   * 标题输入
   */
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
    
    this.checkCanPublish();
  },

  /**
   * 内容输入
   */
  onContentInput(e) {
    this.setData({
      content: e.detail.value
    });
    
    this.checkCanPublish();
  },

  /**
   * 选择图片
   */
  chooseImage() {
    const { images } = this.data;
    const maxCount = 9 - images.length;
    
    if (maxCount <= 0) {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none'
      });
      return;
    }
    
    wx.chooseMedia({
      count: maxCount,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFiles = res.tempFiles;
        const newImages = tempFiles.map(file => file.tempFilePath);
        
        this.setData({
          images: [...images, ...newImages]
        });
        
        this.checkCanPublish();
      }
    });
  },

  /**
   * 移除图片
   */
  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const { images } = this.data;
    
    images.splice(index, 1);
    
    this.setData({
      images
    });
    
    this.checkCanPublish();
  },

  /**
   * 播放语音
   */
  playVoice() {
    const { voiceUrl, isPlaying } = this.data;
    
    if (isPlaying) {
      innerAudioContext.stop();
    } else {
      innerAudioContext.src = voiceUrl;
      innerAudioContext.play();
    }
  },

  /**
   * 移除语音
   */
  removeVoice() {
    if (this.data.isPlaying) {
      innerAudioContext.stop();
    }
    
    this.setData({
      voiceUrl: '',
      voiceDuration: 0
    });
    
    this.checkCanPublish();
  },

  /**
   * 开始录音
   */
  startVoiceRecord() {
    // 检查是否已有语音
    if (this.data.voiceUrl) {
      wx.showModal({
        title: '提示',
        content: '已有录音，是否重新录制？',
        success: (res) => {
          if (res.confirm) {
            this.beginRecord();
          }
        }
      });
    } else {
      this.beginRecord();
    }
  },

  /**
   * 开始录音操作
   */
  beginRecord() {
    // 检查录音权限
    wx.authorize({
      scope: 'scope.record',
      success: () => {
        const options = {
          duration: 60000, // 最长录音时间，单位ms
          sampleRate: 16000, // 采样率
          numberOfChannels: 1, // 录音通道数
          encodeBitRate: 64000, // 编码码率
          format: 'mp3' // 音频格式
        };
        
        recorderManager.start(options);
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '需要您授权录音权限',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting();
            }
          }
        });
      }
    });
  },

  /**
   * 结束录音
   */
  endVoiceRecord() {
    if (this.data.isRecording) {
      recorderManager.stop();
    }
  },

  /**
   * 选择位置
   */
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          location: res.name
        });
      }
    });
  },

  /**
   * 选择话题
   */
  selectTopic(e) {
    const topic = e.currentTarget.dataset.topic;
    
    this.setData({
      selectedTopic: this.data.selectedTopic === topic ? '' : topic
    });
  },

  /**
   * 检查是否可以发布
   */
  checkCanPublish() {
    const { content, images, voiceUrl } = this.data;
    const contentValid = content.trim().length > 0;
    const hasMedia = images.length > 0 || voiceUrl;
    
    this.setData({
      canPublish: contentValid || hasMedia
    });
  },

  /**
   * 发布帖子
   */
  publishPost() {
    const { canPublish, postType, title, content, images, voiceUrl, voiceDuration, location, selectedTopic } = this.data;
    
    if (!canPublish) {
      return;
    }
    
    wx.showLoading({
      title: '发布中...',
    });
    
    // 构建帖子数据
    const postData = {
      type: postType,
      title,
      content,
      images,
      voiceUrl,
      voiceDuration,
      location,
      topic: selectedTopic,
      time: new Date().getTime()
    };
    
    // 模拟发布请求
    setTimeout(() => {
      // 实际开发中，这里应该调用API发布帖子
      // wx.request({
      //   url: 'https://api.example.com/posts',
      //   method: 'POST',
      //   data: postData,
      //   success: (res) => {
      //     wx.hideLoading();
      //     wx.showToast({
      //       title: '发布成功',
      //       icon: 'success'
      //     });
      //     setTimeout(() => {
      //       wx.navigateBack();
      //     }, 1500);
      //   }
      // });
      
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1500);
  },

  /**
   * 取消发布
   */
  cancelPost() {
    if (this.data.content || this.data.images.length > 0 || this.data.voiceUrl) {
      wx.showModal({
        title: '提示',
        content: '是否放弃当前编辑？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      });
    } else {
      wx.navigateBack();
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时停止语音播放
    if (innerAudioContext) {
      innerAudioContext.stop();
    }
    
    // 清除计时器
    if (this.data.recordTimer) {
      clearInterval(this.data.recordTimer);
    }
  }
})
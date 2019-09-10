App({
  config: {
    //apiBase: 'https://locally.uieee.com',
    apiTest: 'https://www.langshish.com/api/v1',
    apiLogin: 'https://www.langshish.com'
  },

  onHide: function () {
     wx.clearStorageSync();
  },
})

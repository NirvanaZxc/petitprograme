const fetch = require('../../utils/fetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    categories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
 //   fetch('/slides')
 //     .then(res => {
 //       this.setData({ slides: res.data })
 //     })

 //   fetch('/categories')
 //     .then(res => {
 //       this.setData({ categories: res.data })
 //     })

     const slides = [
       { image: 'http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj7zx3w751j30u00dmgy3.jpg', link: '' },
       { image: 'http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj6ckx9tlwj30u00fqk8n.jpg', link: '/pages/list/list?cat=10' }
     ]

     const categories = [
       { icon: '/assets/icons/grid-01.png', name: '美食', id: 1 },
       { icon: '/assets/icons/grid-02.png', name: '洗浴足疗', id: 2 },
       { icon: '/assets/icons/grid-03.png', name: '结婚啦', id: 3 },
       { icon: '/assets/icons/grid-04.png', name: '卡拉OK', id: 4 },
       { icon: '/assets/icons/grid-05.png', name: '找工作', id: 5 },
       { icon: '/assets/icons/grid-06.png', name: '辅导班', id: 6 },
       { icon: '/assets/icons/grid-07.png', name: '汽车保养', id: 7 },
       { icon: '/assets/icons/grid-08.png', name: '租房', id: 8 },
       { icon: '/assets/icons/grid-09.png', name: '装修', id: 9 }
     ]

    this.setData({ slides, categories })
  }
})

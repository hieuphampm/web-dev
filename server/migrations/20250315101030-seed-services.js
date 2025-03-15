const Service = require('../models/service');

module.exports = {
  async up() {
    await Service.deleteMany({});
    
    await Service.insertMany([
      {
        name: 'Buffet bữa sáng',
        price: 100000,
        description: 'Bắt đầu từ 5:30 đến 9:30',
        timeRange: '5:30 - 9:30',
        perPerson: true
      },
      {
        name: 'Buffet bữa trưa',
        price: 299000,
        description: 'Bắt đầu từ 11:00 đến 13:00',
        timeRange: '11:00 - 13:00',
        perPerson: true
      },
      {
        name: 'Buffet bữa tối',
        price: 349000,
        description: 'Bắt đầu từ 17:30 đến 21:00',
        timeRange: '17:30 - 21:00',
        perPerson: true
      },
      {
        name: 'Ăn sáng tại phòng',
        price: 79000,
        description: 'Giá tính cho 1 người, chưa bao gồm tiền tip',
        perPerson: true
      },
      {
        name: 'Ăn trưa tại phòng',
        price: 149000,
        description: 'Giá tính cho 1 người, chưa bao gồm tiền tip',
        perPerson: true
      },
      {
        name: 'Ăn tối tại phòng',
        price: 249000,
        description: 'Giá tính cho 1 người, chưa bao gồm tiền tip',
        perPerson: true
      },
      {
        name: 'Massage tại phòng',
        price: 400000,
        description: 'Giá cho 1 nhân viên phục vụ, chưa bao gồm tiền tip',
        perPerson: false
      },
      {
        name: 'Giặt ủi',
        price: 50000,
        description: 'Giá cho 1 kg quần áo',
        perPerson: false
      },
      {
        name: 'Két sắt giữ đồ',
        price: 50000,
        description: 'Giá cho 1 ngày',
        perPerson: false
      },
      {
        name: 'Đưa đón từ sân bay',
        price: 100000,
        description: 'Cho 1 khách',
        perPerson: true
      }
    ]);
  },

  async down() {
    await Service.deleteMany({});
  }
};

import axios from 'axios';
// 创建ajax请求对象
const request =axios.create({
    baseURL:'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT'
})


export default request;
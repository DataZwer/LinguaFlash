//axios进行二次封装
import axios from 'axios';
// import Qs from 'qs';
//进度条
import nprogress from 'nprogress';
//因为进度条样式咱们没有引入
import "nprogress/nprogress.css";
//引入Vuex仓库模块
import store from '@/store';

//创建axios实例[创建出来的实例即为axios，只不过可以配置一些东西]
let instance = axios.create({
    //可以给请求路径中添加一些参数 
    // baseURL: "/api",
    //设置请求时间（5S）
    timeout: 5000,
    // headers: { 'content-type': 'multipart/form-data' },
    
});

//请求拦截器:在发请求之前可以检测到，可以干一些事情
instance.interceptors.request.use((config) => {
    //config配置对象，这里面有请求头
    //config，请求拦截器的一个配置对象

    // config.headers['Content-Type'] = 'multipart/form-data'
    // config.data = Qs.stringify(config.data)
    // config.params =new URLSearchParams()
    // params.append('avatar','')
    //检测到程序发请求，请求拦截器可以检测到，进度条开始动
    if (store.state.user.token) {
        //请求头的这个属性token，和后台老师商量好的了，不能叫做别的名字
        config.headers.Authorization = store.state.user.token;
    }
    nprogress.start();
    return config;
});

//响应拦截器：服务器的数据已经返回了，可以干一些事情
instance.interceptors.response.use((res) => {
    //简化服务器返回的数据格式
    //服务器数据返回进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    //终止promise链
    return Promise.reject(error);
});
//对外暴露二次封装的axios
export default instance;
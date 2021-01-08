import dayjs from 'dayjs';
import vue from 'vue'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'


dayjs.extend(relativeTime) 
dayjs.locale('zh-cn')
vue.filter('relativeTime',value=>{
    return dayjs(value).from(dayjs())
})

# canvas-experiments
# Demos
- [3万粒子效果](https://nibilin33.github.io/canvas-experiments/particles.html) 
> 粒子动效: 粒子，指图像数据imageData中的每一个像素点，获取到每个像素点之后，添加属性或事件对区域内的粒子进行交互，达到动态效果           

# 用到的三方库
- [JavaScript Performance Monitor:stats.js](https://github.com/mrdoob/stats.js/)      
- [tween.js 动画变化效果](https://github.com/tweenjs/tween.js)          

# 轨迹运动
任何有规律的运动都是数学函数的呈现              
让元素抛物线运行，套用抛物线函数即可。公式如下：
y = a*x*x + b*x + c             

# galacean
lottie 681.56 KiB / gzip: 182.38 KiB
## 动效降级
高到低可以分别提供：视频动画/3D、Lottie 动画以及 CSS 动画           
1.网络速度，简单处理可以用当前的网络是wifi、4g还是3g、2g来判断，来决定后续加载哪些图片            
2.内存，内存不足需要立刻做降低内存的动作，比如关停帧动画，释放多余图片          
3.帧率，可以用requestAnimationFrame的触发时间间隔来检测帧率，帧率低说明用户已经遇到了卡顿或者掉帧的情况，需要暂停帧动画来降低cpu占用     
（借助 Web Performance Timing API 中的 Frame Timing API）                   
## 机型划分   
https://github.com/facebook/device-year-class                
动效降级的核心在于为合适的机型提供合适的动效，所以，动效降级的第一步是根据规则对不同机型划分不同级别。
WebGL在Android 4.4 是不支持的，只能使用canvas进行降级       
## 兜底处理
对应的资源拉取异常，也可以走一步步降级方案，高端动效降级为中端动效，中端动效降级为低端动效            
## 规则获取            
确定完机型规则后，还需要获取规则。规则写在代码中或服务端下发。          
## 埋点统计
完成了动效降级之后，还需要进行埋点统计。            
动效降级埋点的意义在于，统计降级占比以及对应机型等。        
只有获取了相关信息，才能动态调节规则配置，达到最好的动效降级效果。      

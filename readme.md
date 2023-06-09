# 超图cesium本地调试

**`Build\Cesium\Cesium.js`是2023年5月19日从[support.supermap.com.cn:8090/webgl/examples/webgl/editor.html#FlowingPipeLine](http://support.supermap.com.cn:8090/webgl/examples/webgl/editor.html#FlowingPipeLine)获取, 格式化得到的**
## 版本
- Cesium.VERSION === '1.67'
- Cesium.S3MVersion === {S3M: 49, S3M4: 1}
- Cesium.SuperMapVersion === '34443'

# 跑起来
- `npm i serve -g`
- `serve -C` #允许跨域
- http://localhost:3000/examples/webgl/FlowingPipeLine

# deuglify(代码可读化)过程记录
特殊报错部分在
```
};
la.stackSave = $d.stackSave;
```
之间

- set NODE_OPTIONS="--max-old-space-size=18096"
- cd D:\Desktop\supermap-cesium-loacl-debug\Build\Cesium
- deuglify Cesium.js > 1.js      

# 文档

- [http://support.supermap.com.cn:8090/webgl/docs/Documentation/ 超图封装的文档](http://support.supermap.com.cn:8090/webgl/docs/Documentation/)
- [http://support.supermap.com.cn:8090/webgl/Build/Documentation/ 超图用的Cesium的文档](http://support.supermap.com.cn:8090/webgl/Build/Documentation/)
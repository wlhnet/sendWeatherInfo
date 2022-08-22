## sendWeatherInfo

### 项目运行

项目环境：Node16+

项目npm模块均已上传，无需再次下载

运行命令：

```
node ./index.js
```
![image](https://user-images.githubusercontent.com/40430808/185976629-b137571c-7652-478d-ade2-6ee05e668d6c.png)

如上图，表示已成功推送！

### 其他说明

根目录`config.js`存放着APP_ID、APP_SECRET、TEMPLATE_ID等其他配置信息

![image-20220823022016418](https://user-images.githubusercontent.com/40430808/185993348-1a09235f-5b59-4e7c-b3f8-775e14120e4c.png)

**1、如果您在本地，或自己的服务器等非所有人能访问的平台，可直接把信息写入`config.js`文件中。**

     并在`index.js`文件中通过`const config = require('./config')`导入

![image-20220823022804051](https://user-images.githubusercontent.com/40430808/185993428-0dcf8614-8d29-469c-b14a-fe5e0b3a74e9.png)


**2、如果您在github actions上运行，建议将信息放入github机密中，如图：**

![image-20220823022408004](https://user-images.githubusercontent.com/40430808/185993537-01997e4a-9563-402c-95ab-3725220b1a9c.png)

```
在Node环境中通过 process.env 读取机密
```

![image-20220823022535118](https://user-images.githubusercontent.com/40430808/185993568-bf900b04-d530-4c36-be3f-75cfdb6a4fb1.png)

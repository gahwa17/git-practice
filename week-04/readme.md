## Instance public IP
    
    52.63.218.90
    
### 什麼是 instance type?
    
執行個體類型，代表 EC2 Server 的硬體規格，規格決定了伺服器的計算能力、記憶體大小、硬碟空間等等 ( 也決定了價格 💸 ) 。

AWS 給的一年免費方案是 750 小時的 **t2.micro** ，記憶體只有 1 GB。

`t2-` 開頭的執行個體特色

- 突發性效能 : 平常保持基本的 CPU 效能，但需要時可以短時間內爆發高效能。
- 原理是透過 CPU 積分管理，平常沒事的時候會累積 CPU 積分，需要高性能時就用這些積分，用完了就回到基本水平。
- 因此適合一些低成本的開發環境 e.g. 小型網站

### **參考資料**

- [運算 – Amazon EC2 執行個體類型 – AWS](https://aws.amazon.com/tw/ec2/instance-types/?trk=fa4fa111-b43a-4e17-8976-4c87239c8376&sc_channel=ps&ef_id=CjwKCAjwvKi4BhABEiwAH2gcw78cTcrE50daR7P8DhZli5Uanf6DBi3raFeaXrp69zC0PGhUydsFAhoCUj0QAvD_BwE:G:s&s_kwcid=AL!4422!3!639494018095!e!!g!!aws%20instances!19155100457!149379720852&gclid=CjwKCAjwvKi4BhABEiwAH2gcw78cTcrE50daR7P8DhZli5Uanf6DBi3raFeaXrp69zC0PGhUydsFAhoCUj0QAvD_BwE)



## Security Group 是什麼？用途為何？有什麼設定原則嗎？
    
AWS 為 EC2 執行個體提供的虛擬防火牆，用來控制進出執行個體的網路流量們，包含網路協定、連接埠（port）和來源 IP 範圍，以及可以連線的目的地 IP 範圍

又分為傳入跟傳出規則 : 

- 傳入 : 控制進來執行個體的流量
    - SSH 規則 : 允許任意 IP 透過 SSH 連接到這台 EC2，我們要透過金鑰存取 EC2 就得開啟
    - HTTP : 允許任意 IP 來訪問我們的網頁應用程式
    - `0.0.0.0/0` 代表任意 IP 位址
- 傳出 : 執行個體能出去的流量，預設是允許所有的傳出流量


### **參考資料**

- [安全群組：傳入和傳出規則 - Amazon QuickSight](https://docs.aws.amazon.com/zh_tw/quicksight/latest/user/vpc-security-groups.html)


## pm2
    
pm2 是 node 的程序管理器 ( process manager )，主要來協助我們在背景執行程式，當 server 重開機時能自動重啟相關程式，指令如下圖 :

1. `pm2 start --name express-example app.js`
    - 啟動 express 程式
    - `--name` : 幫 process 加上易讀名稱


2. `pm2 startup` 

    建立重啟腳本

    > PM2 can generate startup scripts and configure them in order to keep your process list intact across expected or unexpected machine restarts.
    > 


3. `pm2 save` 

    確定我們想要的應用程式都啟動後，將這些 process 都存進 list 中，未來機器重啟時，pm2 會來這個列表重啟所有程序

    > Once you started all the applications you want to manage, you have to save the list you wanna respawn at machine reboot with:
    > 


4. 常用指令
    - Log 管理：`pm2 logs`
    - 監控：`pm2 monit`
    - 列出所有 process：`pm2 list`
    - 重啟 process：`pm2 restart <app_name>`
    - 停止 process：`pm2 stop <app_name>`
    - 刪除 process：`pm2 delete <app_name>`

### **參考資料**
- [node.js - Does pm2 auto restart application after reboot by default? - Stack Overflow](https://stackoverflow.com/questions/60095316/does-pm2-auto-restart-application-after-reboot-by-default)
- [PM2 - Startup Script (keymetrics.io)](https://pm2.keymetrics.io/docs/usage/startup/#comment-4743098045)


## 什麼是 Nginx？為什麼要透過 Nginx 來 `proxy` 到 Express 開發的 Web Server?
    
是網頁伺服器 ( web server )，網頁伺服器的主要工作是接收 client 發出的請求 ( HTTP Requeset )，處理需求後，產生回應 Response 回來給我們。


在現今的軟體實務中，有以下用途 : 

- **反向代理（Reverse Proxy）**

    Nginx 擋在所有後端程式前面，當前端發來請求時，都得先過 Nginx 這一關，由 Nginx 決定這個請求要分配到哪一台後端伺服器上

- **負載平衡（Load Balancing）**

    跟 Reverse Proxy 一起出現的一對名詞，作為 Reverse Proxy，Nginx 會幫忙轉發需求給後端伺服器，當需求湧入一大堆時，Nginx 能否幫忙平均地轉發，讓每一台後端伺服器都好好做事，沒有人偷懶也沒有人過勞，就是負載平衡的目的，常見的轉發演算法有 :

    1. **Round Robin ( 預設 )** : 輪流發送給每台伺服器

    2. **Least Connected** : 哪台伺服器最閒 (  負責的請求數最少 )，就轉給他

    3. **IP Hash** : Nginx 將請求方的 IP 地址做 hash，將這個請求轉發到 hash 出來的 server 上，好處是 IP 沒變的話，hash 也會一樣，就會固定送到同一台伺服器上

        
- 快取 ( Http Cache )

    靜態的資源（ex: HTML 檔案、圖片），可由 Nginx 儲存在 Http 的 Cache 中，這樣子當下次前端來請求靜態資源時，Nginx 就可以直接回傳這些靜態資源給前端，就不需要後端 Server 的介入了。目前實務上較少人在用，因為市面上有更方便的工具（ex: CDN）

    **📢 補充 : 靜態資源 vs 動態資源**
    - 靜態資源 : 網頁事先寫好的，無論何時訪問都保持不變的
        e.g. `index.html` , `*.jpeg` , `*.png`
    - 動態資源 : 根據 client 請求而即時生產的
        e.g. 要到後端資料庫撈的內容

    

- SSL 加密 : SSL 的 handshake 運算成本很高，也可以統一交由 Nginx 處理，減輕後端伺服器的運算負擔

### 結論

最主要還是功能「**反向代理（Reverse Proxy）**」、「**負載平衡（Load Balancing）**」

### 正向代理 VS. 反向代理

- `proxy` 是什麼意思？

    中文翻譯為「代理」，在網路環境中，代理伺服器有「中間人」的概念，代表某些實體來去處理請求或回應。

- `Reverse proxy` vs `Forward Proxy`

    **正向代理（Forward Proxy）**，就是將內部網路的 Client 的資訊隱藏起來，由代理人統一的對外跟 Internet 溝通。

    最常見的就是公司或學校的內部網路，所有的電腦都會先連線到 IT 所架設的路由器上，最終才由這個路由器出去對外和外部的網路世界溝通，所以在這個情境中，這個 IT 所架設的路由器就是負責「正向代理」，所以這也是為甚麼用公司或學校電腦時，某些網站會連不上，因為被正向代理擋住了。


### Nginx 設定檔

```bash
server {
    # 監聽 HTTP 請求
    listen 80;
    
    # 處理送到 52.65.80.187 的請求 (可換成 Domain Name)
    server_name 52.65.80.187;

    # 將請求轉發到本地端 3000 port
    location / {
        proxy_pass http://localhost:3000;
    }
}
```
修改步驟 : 
```bash
# 修改設定
$ sudo nano /etc/nginx/sites-available/default

# 檢查 config 配置語法是否正確
$ sudo nginx -t

# Reload，重啟以適用新的設置
$ sudo nginx -s reload

# Linux 重開啟動時自動開啟
$ sudo systemctl enable nginx
```

### Nginx 的 Log 檔案在哪裡？你怎麼找到的？怎麼看 Nginx 的 Log？
* `nginx.conf` 有寫 log 放在哪裡 : `error_log /var/log/nginx/error.log;`
* 查看最後幾行 log : `tail -n 100 /var/log/nginx/error.log`
* `systemctl`  : `sudo systemctl enable nginx`
    
### **參考資源**

* [Nginx 是什麼？認識反向代理、負載平衡 (kucw.io)](https://kucw.io/blog/nginx/)
* [Nginx 是什麼？有哪些用途？｜ExplainThis](https://www.explainthis.io/zh-hant/swe/why-nginx)
* [Proxy vs Reverse Proxy (Real-world Examples) (youtube.com)](https://www.youtube.com/watch?app=desktop&v=4NB0NDtOwIQ&ab_channel=ByteByteGo)
* [NGINX Explained in 100 Seconds (youtube.com)](https://www.youtube.com/watch?v=JKxlsvZXG7c&ab_channel=Fireship)

## 熟悉 Linux
### 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？
「**S**uper **U**ser **DO**」的縮寫，代表我們要用電腦最高權限身分去做事情，有些操作涉及系統設定，就需要比較高的權限才能做。
*  需要 sudo : 系統級操作，如安裝軟體、修改系統設置
*  不需要 sudo : 普通用戶權限內的操作 e.g. `ls` , `mkdir` 等等
### 目錄結構
- /etc 是什麼的縮寫？這裡通常都放哪些檔案？
    - etcetera，放 OS 或應用程式的設定檔
    - 如 `.conf`
- /var 這裡通常都放哪些檔案？
    - 變動文件
    - 如 `.log`
- /boot 這裡通常都放哪些檔案？
    - 啟動 Linux 時所需的核心文件
    - 如 `.iso`
### $PATH 環境變數的作用是什麼？

PATH 是一種用來**命名電腦上檔案位置**的方法，當我們在 cmd 輸入指令時，linux 會去找這個指令的檔案位置，好處是我們不需要執行指令的時候還得輸入完整路徑，只需要指令名稱即可。


透過 `echo $PATH` 來看目前系統的環境變數有哪些

*  `/usr/bin` : Linux 系統會有的日常基本指令，如 `ls` , `cat` , `cp` 等等
*  `/home/username/.nvm/versions/node/` : Node.js 的執行環境，如 `node` , `npm` 等等
*  `which` 指令的作用？尋找指令執行檔，在環境變數路徑中 $PATH 的完整路徑
    指令 : **`which NAME`**

### **參考資料**

- [Linux 目錄結構 - HackMD](https://hackmd.io/@be2455/H1zn_PCWp)
- [三分鐘快速了解 Linux sudo 指令是什麼！ – 科技讀蟲 (yhtechnote.com)](https://yhtechnote.com/linux-sudo/)
- [鳥哥私房菜 - 第十章、認識與學習BASH (vbird.org)](https://linux.vbird.org/linux_basic/centos7/0320bash.php#variable_environ)

## 找不到答案的問題 & 尚未釐清的觀念

- [ ] 其他登入 EC2 的方式 [REF]
- [ ] Nginx 設定檔案有好多，差異在哪? 我到底該改哪個? 這篇 [stackoverflow](https://stackoverflow.com/questions/41303885/nginx-do-i-really-need-sites-available-and-sites-enabled-folders) 帶出了 Nginx 設定檔疑惑
    * `/etc/nginx/sites-enabled/default.conf`
    * `/etc/nginx/sites-available/default.conf`
    * `/etc/nginx/nginx.conf`

我是修改 `sites-available/default.conf`
        
- 參考本篇 [Nginx 資料夾結構](https://wshs0713.github.io/posts/6a171975/) 來理解三者之關係
    * 改 `sites-available` 內的東西，變動會透過 ***symbolic link***  同步更新到 `sites-enabled`
    * 最終 `nginx.conf` 會再 include  `sites-enabled` 與所有設定檔案
    
        ```
        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
        ```
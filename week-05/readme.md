## 1. 網址

https://www.gahwa.info/

## 2. 你在哪裡購買網域的

Namecheap

## 3. DNS 的 A record 是什麼？

將網域名稱指到 IPv4 地址，當有人輸入網域名稱 ( www.gahwa.info )，A Record 會協助 DNS 找到對應的 IP 位址

常見 A Record 設定 :
* @ (root domain)

    * 用途：根域名
    * HOST：@

* www
    * 用途：早期網站的預設子域名，但現在可以直接輸入根域名即可
    * HOST：www

* 特定子域名
    * 用途：將特定的子域名
    * HOST：blog

* 萬用字元記錄 ( Wildcard )
    * 用途：將所有未明確定義的子域名（如 `non-existent-subdomain.gahwa.info`）指向某個 IP 位址。即使該子域名不存在，DNS 仍會將其導向到指定的 IP。
    * HOST：*

## 4. DNS 的 NS record 是什麼？

Name server，告訴 DNS 應該去找哪個 NS 查詢以取得進一步的 DNS 資訊。

瀏覽器會向 DNS Resolver 發送域名查詢請求，DNS Resolver 再去跟各階層的 NS 問地址，最後就能拿到完整 IP

* root NS :  回傳 TLD 的地址 e.g. `.com` , `.edu`
* TLD NS : 回傳 Authoritaive 的地址
* Authoritaive NS : 回傳完整 IP

## 5. Domain Name vs FQDN vs URL 這三者分別為何？

* Domain Name : 用來識別網站的名稱 e.g. `example.com`
* FQDN  (Fully Qualified Domain Name，全域合格域名) : 除了域名，還包含主機名和頂級域，用來唯一識別一個具體設備或主機如 e.g. `www.example.com.`
* URL  (Uniform Resource Locator，統一資源定位器) : 訪問網路資源的完整地址，包含了網路協議、域名、路徑等資訊 e.g.`https://www.example.com/path/file.html`

## 6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？

* 在 HTTP 協議下，資料是以明文的形式在瀏覽器和伺服器之間傳輸。這意味著，任何人（如黑客）在網路上截取數據時，都可以輕易讀取敏感資訊，如密碼、信用卡資料、個人身份資訊等。
* 而 HTTPS 使用 SSL/TLS 憑證來加密這些資料，確保傳輸過程中是不可讀的。即使有人攔截，也無法理解這些加密的內容。
* ZeroSSL 申請完畢會拿到的 `certificate.crt` 與 `private.key` 檔案就是我們網站的憑證和私鑰，用於加密通信和驗證網站身份

### 參考資料
* [DNS知識要點：A Record、CNAME，購買網域及瀏覽器輸入網址後發生的網址解析](https://shozzle.dev/posts/allen/dns-parse/)
* [A Crash Course in DNS (Domain Name System)](https://blog.bytebytego.com/p/a-crash-course-in-dns-domain-name)

- 說明 blob, tree, commit, branch, head 分別是什麼

1. Blob (Binary Large Object)

Blob 是 git 中最小的文件單位，當我們寫專案，希望 git 能去追蹤我們修改後的檔案，git 會將文件的內容作為一個 blob 對象存儲，並且回給我們一個鍵值 - SHA-1(40 位的雜湊值)，相當於這個 blob 的身分證(ID)，之後我們就可以這個 ID 來找到文件的內容

好用的指令 : git cat-file -p <SHA-1 value>

2. Tree

git 中的目錄結構，白話說就是個 folder，幫我們把一組文件存在一起，他會指向 blob(文件) 和其他 tree(子目錄)，這樣能方便讓 git 建立整個文件系統的全貌

3. Commit
   一個 commit 就相當於一個「版本」，紀錄我們的專案在某個特定時間下的狀態，會包含 Author(作者)、Date(提交時間戳)，以及我們 git commit -m 所留下的訊息，以及這個 commit 自己的 SHA-1 ID

可以透過 `git log` 來查看最近的 commit 紀錄
在進一步拿 commit 後面的 SHA-1 ID 來查看可以得到該版本 git 追蹤了哪些文件

4. Branch

5. Head

- 紀錄在 git repo 操作過程中，.git 檔案夾裡的變化，看看你可以觀察到什麼
- commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？

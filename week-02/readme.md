## 環境準備

**v20.17.0**，官方最新的 LTS 版本

## nvm 與 npm 分別是什麼

- nvm (Node Version Managers)

  - Node 版本管理工具，在不同個 Node.js 版本之間快速切換
  - WHY? 實際開發時，可能會遇到新舊專案版本不一的問題，就可以用 nvm 解決
  - 初始設定與指令

    1. 透過 alias 來重設 default，把預設版本設定成 LTS 的 v20

       > `nvm alias default [$version]`

    2. 再將目前版本切換為這個預設版本 (打 default 或 v20 都行)

       > `nvm use default / v20`

    3. 再次確認目前版本

       > `nvm current`

- npm (Node Package Managers)

  - 跟 nodejs 一起自動安裝，用來安裝開發常見的套件
  - 使用 npm 流程

    1. 專案內初始化 npm，加上 `-y` 可快速設定

       > `npm init`

    2. 透過 `npm install` 安裝常見套件

       > `npm install [$套件名稱]`

    會出現 3 個檔案: `package.json`, `package-lock.json`, `node_modules`

    - **package.json** : 專案的基本資訊和所需的依賴套件
    - **package.lock.json**
      - 記錄套件的「版本」
      - 確保大家即便在不同開發環境，安裝的套件版本也一樣
    - **node_modules** : npm 根據 `package.json` 安裝的套件，就會放在這裡
      - 通常非常肥大，所以不會放進 git
      - 會在 `.gitignore` 加上 `node_modules`

# CLAUDE.md

這個檔案提供給 Claude Code 在此 repo 工作時的指引。

## 專案概覽

**angular-design-system**（內部代號 **sag-library**）是名為 **SAG** 的 app 產品所使用的設計系統 / Angular 元件庫,由 React 版（`/Users/tsengteyu/my-ui-lib/`）轉換而來,兩者皆源自相同的 Figma Make「Testing Library」設計與 token。

- **型態**：Angular CLI workspace,內含單一 library project `ui-components`
- **Angular**：19.2（standalone components、signals、`OnPush`、`ViewEncapsulation.None`）
- **npm 套件名**：`sag-app-component`（component selector 前綴 `lib`，如 `lib-button`）
- **Icon**：`lucide-angular`,集中於 `src/lib/shared/icons.ts`（`DS_ICONS` / `ICON_MAP` / `IconType`）
- **建置**：`ng-packagr`
- **測試**：Karma + Jasmine
- **文件 / 展示**：Storybook 10（`@storybook/angular`）+ Compodoc

## 常用指令

所有自訂 target 都掛在 `ui-components` library 上：

```bash
npm run dev                # = ng serve playground --port 3000（App 開發預覽）
npm run storybook          # = ng run ui-components:storybook（元件庫，port 6006）
npm run build-storybook    # = ng run ui-components:build-storybook
ng build ui-components      # 用 ng-packagr 打包 library → dist/
ng test ui-components       # Karma 單元測試
```

> 注意：Storybook 透過 `angular.json` 的 `storybook` target 全域注入 `src/styles/tokens.css` 與 `src/styles/components.css`(不是靠 component 樣式),改動 token 後需確認這兩個檔有被載入。

## 目錄結構

```
angular-design-system/
├── angular.json              # 兩個 project：ui-components（library）、playground（demo app）
├── projects/playground/      # 開發預覽用的 App 殼（npm run dev → ng serve，port 3000）
│   └── src/                  #   build 已注入 ui-components 的 tokens.css / components.css
├── projects/ui-components/
│   ├── ng-package.json        # ng-packagr 設定
│   ├── .storybook/            # main.ts / preview.ts（@storybook/angular）
│   └── src/
│       ├── public-api.ts      # library 對外 API（新增元件務必在此 export）
│       ├── styles/            # 全域 CSS——唯一視覺真實來源
│       │   ├── tokens.css     # 三層 token 架構（Foundation / Semantic / Component）
│       │   ├── components.css # 元件層 CSS：解析 data-* 屬性 → token lookup
│       │   └── index.css      # 給 consumer 在 angular.json 引入的彙整入口
│       ├── lib/
│       │   ├── shared/        # icons.ts（lucide registry）、safe-html.pipe.ts
│       │   └── <component>/   # <component>.component.ts + .stories.ts
│       └── assets/            # 圖片 / avatar（Storybook 以 staticDirs 對映到 /assets）
└── dist/                      # 建置輸出
```

## 已實作元件（`src/lib/`）

`button`、`icon-button`、`chip`、`badge`、`tag`、`avatar`、`accordion`、`list`、`tab-bar`、`navigation-bar`、`app-bar`、`menu`。全部透過 `public-api.ts` export。

## 核心設計原則

### 三層 CSS Token 架構（`src/styles/tokens.css`）

token 一律單向依賴,**不可跨層或反向引用**：

1. **Foundation**：原始 primitive 值,不可變。
2. **Semantic**：跨元件意義（`--surface-*`、`--state-layer-*`),**禁止帶元件前綴**。
3. **Component**：純別名,只能映射到 semantic 層(例如 `--icon-button-state-hover → --state-layer-hover`),不可定義新語意。

state（hover / pressed / disabled）是系統層級的抽象,所有元件共用同一套機制。

### 元件實作模式（見 `lib/button/button.component.ts`）

延續 React 版的「state 由邏輯解析、視覺由 CSS 驅動」模式,以 Angular idiom 表達：

- standalone component、`ChangeDetectionStrategy.OnPush`、`ViewEncapsulation.None`(樣式必須是全域 CSS,不寫 component-scoped 樣式)。
- 用 `signal()` / `computed()` 管理互動狀態(如 `btnState()`、`ripples()`)。
- 視覺輸出靠根元素的 `data-*` 屬性(`[attr.data-btn-appearance]`、`[attr.data-btn-state]`…),由 `components.css` 解析 L3 → L2 → L1 token;TS 不做 token 查表。
- 尺寸/間距一律引用 CSS 變數(`var(--btn-...)`),勿寫死數值。
- icon 透過 `<lucide-icon [img]="..." [size]="..."/>`,來源為 `shared/icons.ts`。
- ⚠️ 字型:Angular 版使用 `var(--font-family-roboto)`(React 版用 `be-vietnam-pro`),沿用既有元件的設定即可。

### Stories 慣例

- 每個元件旁放 `<component>.stories.ts`(`@storybook/angular` 格式)。
- 全域樣式由 `angular.json` 的 storybook target 注入,stories 本身不需再 import CSS。

## 建立頁面的規則（重要）

sag-library 的元件是 SAG 產品的設計系統。建立任何頁面時：

1. **優先比對既有元件的名稱與外觀**——對得上就直接套用該 component（`lib-*`),不要重刻或寫 inline 樣式。
2. **遇到尚無對應的元件**,先提示使用者,再一起討論該元件要放在：
   - **global**——加入 sag-library（`projects/ui-components/src/lib/`,並在 `public-api.ts` export),跨頁面共用;或
   - **page-local**——只屬於該單一頁面層級。
   確認層級後才動手。若是新增 global 元件,仍須走下方 Figma 比對流程。

## 與 Figma 的關係（重要）

此元件庫的**唯一視覺真實來源是 Figma**,絕不靠猜測或近似值。

- **Figma Make 原始碼** file key：`CySJJL7KH5VS4mScYG94ud`（props / state / logic、SVG、token 定義）
- **Figma 設計稿** file key：`BxMi4QfTMSUsdS7TQ2LKfE`,元件畫布 node `63:3999`

**新增 / 修改元件流程**：
1. 先讀 Figma Make 原始碼(props / state / logic、SVG、token)。
2. 再從設計稿比對視覺規格與所有狀態(enable / hover / press / disabled),用截圖確認外觀。
3. 才開始寫 Angular 程式碼,並在 `public-api.ts` 補上 export。

## 相關專案

React 來源元件庫:`/Users/tsengteyu/my-ui-lib/`(React 19 + Storybook,`src/stories/`)。兩者源自相同 Figma 檔案,**新增或修改元件時應保持兩邊行為與視覺一致**。

## 約定

- 改 token 時維持三層架構的單向依賴;新元件樣式只新增 Component 層別名,不要在 Semantic 層加元件專屬 token。
- 不寫 component-scoped 樣式(`ViewEncapsulation.None`),所有樣式進 `styles/components.css`。
- 顏色、間距、狀態樣式以 Figma 為準,不要自行發明。

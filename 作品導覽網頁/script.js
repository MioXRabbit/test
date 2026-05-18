/**
       * 【 1. 自定義內容編輯區 】
       * 修改此處即可更換全站所有文字、路徑與連結
       */
// 以上為區塊註解：說明以下為使用者自定義內容的編輯區域，通常用來提示開發者可以在此集中管理文字和路徑


/* ============================================================
【 網頁核心運作邏輯 - 完整逐行註解版 】
============================================================ */
// 以上為區塊註解：大區塊分隔線與標題，明確標示從此處開始進入「網頁核心運作邏輯」的程式碼實作
/* ==========================================
 * 全站觸控最高防線擴充：單指快速雙擊攔截網（100% 物理閹割 iOS 霸王雙擊放大機制）
 * ========================================== */
let lastTouchEnd = 0; // 在閉包最外層配置一個輕量級時間紀錄針，用來保存上一次觸控離牆的絕對時間戳記
document.addEventListener('touchend', function (event) { // 在網頁最高節點註冊 touchend 原生觸控結束離牆事件，全時段追蹤手指抬起瞬間
    const now = Date.now(); // 在手指離牆的百萬分之一秒內，光速抓取當前的物理絕對時間戳記
    if (now - lastTouchEnd <= 350) { // 核心時序判定：當前後兩次單指離牆的時間差小於或等於 350 毫秒（即定義為 iOS 標準雙擊手勢）時
        event.preventDefault(); // 終極正確阻斷：命令 WebKit 核心物理沒收此雙擊訊號，全平台強行封鎖、禁用單指雙擊放大行為
    } // 結束雙擊時間差的條件檢查分支
    lastTouchEnd = now; // 完美覆寫：將本次離牆時間點存入變數，做為下一次敲擊時的比對基準原點
}, { passive: false }); // 關鍵性能金鑰：硬性宣告為 false，明確命令瀏覽器核心允許此監聽器具有最高優先權來執行 preventDefault() 阻斷


// ==========================================
// ⚡ 戰略性精準圖片預熱（全相容、不塞車綠色通道）
// ==========================================
// 以上為單行註解：分隔線與標題，標示以下區塊負責執行「戰略性圖片預先載入（預熱）」的優化功能

// 1. 預熱：遊戲介紹區塊的兩張作品 LOGO 小圖
// 單行註解：說明第 1 步是要預載遊戲介紹所需的兩張 LOGO 圖片

const imgCache1 = new Image();
// 實例化（New）第一個 HTML 圖片物件（Image），用來在幕後非同步載入圖片檔案

const imgCache2 = new Image();
// 實例化（New）第二個 HTML 圖片物件（Image）

if (config.gameIntroSubImg1) imgCache1.src = config.gameIntroSubImg1;
// 如果全域設定檔（config）中有定義 gameIntroSubImg1 的路徑，就將其指派給 imgCache1 的 src 屬性，促使瀏覽器立刻開始下載

if (config.gameIntroSubImg2) imgCache2.src = config.gameIntroSubImg2;
// 如果全域設定檔中有定義 gameIntroSubImg2 的路徑，就將其指派給 imgCache2 的 src 屬性，促使瀏覽器立刻開始下載

// ==========================================
// 👥 全角色「核心大立繪（m）」全自動編碼缺陷攔截與強行預存鎖（先下載、後判定版）
// ==========================================
if (config && Array.isArray(config.chars)) {
    config.chars.forEach((char) => {
        if (char.m) {
            const imgCache = new Image();

            // 🚀 調整重點：第一時間先發動一階段下載，讓瀏覽器直接去拉取原始圖檔檔案
            imgCache.src = char.m;

            // 🔍 下載後判定：嘗試對已下載內容發動最高階的硬體加速解碼
            imgCache.decode().then(() => {
                console.log(`[Cache OK] 硬體解碼預存成功: ${char.m}`);
            }).catch(() => {
                // 🌟 核心防禦：凡是無法順利解碼、被硬體拒絕的瑕疵內容，全自動在此被強行攔截！
                // 建立第二個獨立的基礎快取鎖，100% 物理繞過 fetch 與 CORS 限制
                const fallbackCache = new Image();

                fallbackCache.onload = () => {
                    // 當圖片載入完成，代表檔案已經成功、強行塞進瀏覽器的本地快取中，
                    // 切換角色時一樣能達到 0 延遲的流暢顯示，且控制台絕對乾淨、不噴任何紅字與橙字
                    console.log(`[Cache OK] 圖檔（二進位）已強行預存至快取 (已自動相容編碼缺陷): ${char.m}`);
                };

                fallbackCache.src = char.m; // 正式發動對瑕疵內容的強行預存下載
            });
        }
    });
}


// 2. ⚡ 關鍵新增：預熱全站導覽列的所有 Icon 圖示
// 遍歷 config.nav 裡面所有的圖示網址，一開網頁就強迫瀏覽器在背景 0.01 秒悄悄下載好
// 以上兩行為單行註解：詳細說明第 2 步的優化邏輯，透過預載導覽列的 Icon 圖示來避免使用者觸碰導覽列時發生圖片閃爍或空白

if (config.nav && config.nav.length > 0) {
    // 進行安全檢查：確保 config.nav 物件存在，且 nav 陣列裡面的元素數量大於零

    config.nav.forEach(item => {
        // 使用 forEach 方法遍歷（迴圈）config.nav 陣列中的每一個項目（item）

        if (item.icon) {
            // 如果該導覽項目（item）中有定義 icon 的圖片路徑

            const navIconCache = new Image();
            // 則在迴圈內部建立一個區域的 HTML 圖片物件（navIconCache）

            navIconCache.src = item.icon;
            // 將導覽項目的圖示路徑指派給該圖片物件的 src 屬性，強迫瀏覽器在背景非同步下載此圖示
        }
        // 結束個別項目的 icon 檢查
    });
    // 結束 config.nav 陣列的遍歷迴圈
}
// 結束 nav 陣列存在性與數量的安全檢查

// ❌ 依然維持最高防禦：絕對不要在這裡預熱角色立繪、大圖或 Podcast 音檔，確保大背景圖享有最高載入優先權！
// 單行註解：開發效能備忘提示，強調為了讓網頁的主背景圖能以最快速度渲染出來，必須嚴格禁止在此階段預載大容量的資源（如立繪、高解析度圖片與音訊檔）


/**
 * 1. 初始化進入點
 * 確保 HTML 結構載入後，依序執行各個功能模組
 */
// 以上為區塊註解：說明此區塊為程式運行的第一部分「初始化進入點」，負責管理網頁載入後的模組執行順序

// ⚡ 關鍵新增：首次載入旗標，用來防止使用者在網頁中段「切換語系」時，畫面又被無故拉回頂端
// 以上為單行註解：說明宣告 isFirstLoad 變數的目的，是為了解決語系切換時捲軸非預期跳動的體驗問題

let isFirstLoad = true;
// 宣告一個名為 isFirstLoad 的變數並預設為 true，用來記錄網頁是否為第一次載入

// 定義一個全域的中央渲染調度器
// 以上為單行註解：說明接下來要定義的函式用途

function runAllRenderModules() {
    // 定義名為 runAllRenderModules 的函式，作為網頁所有渲染模組的中央調度器

    // 優先執行：不需要連網、本地就能跑的功能
    // 以上為單行註解：說明陣列中擺放的是不依賴外部網絡請求、可立即在本地渲染的函式

    [
        renderNav,
        /*renderStaff,*/
        renderStaticContent,
        renderGameDemoVideos, // 負責 sec5 與 sec6 實機演示影片與標題注入
        initMarquee
    ].forEach(fn => {
        // 建立一個包含多個渲染函式的陣列（其中 renderStaff 遭區塊註解），並使用 forEach 進行遍歷迴圈

        if (typeof fn === 'function') fn();
        // 安全檢查：確保陣列中的元素確實是一個函式，若是，則立即執行該函式
    });
    // 結束渲染函式陣列的遍歷迴圈

    // 每次語系切換時，預設重新渲染第一個角色的文字
    // 以上為單行註解：說明切換語言時，角色介紹區塊預設返回顯示索引值為 0 的首位角色

    if (typeof renderChar === 'function' && config.chars?.length) {
        // 安全檢查：確認 renderChar 函式存在，且全域 config 物件中的 chars 陣列有資料（使用可選鏈 ?. 確保安全）

        renderChar(0);
        // 執行 renderChar 函式並傳入參數 0，渲染展示第一位角色的多國語言文字資訊
    }
    // 結束角色文字渲染的條件判斷

    // 每次語系切換時，重新繪製 Podcast 列表文字
    // 以上為單行註解：說明每次更新語言，Podcast 區塊的清單文字也需要同步重繪

    if (typeof renderPodcastList === 'function') {
        // 安全檢查：確保 renderPodcastList 函式確實存在

        renderPodcastList();
        // 執行 renderPodcastList 函式，重新繪製網頁上的 Podcast 單集清單文字
    }
    // 結束 Podcast 列表渲染的條件判斷

    // 💡 安全防錯：確保按鈕文字在每次畫面重繪時，都能跟隨 LangManager 的狀態對齊
    // 以上為單行註解：說明下方邏輯是為了保證切換語系按鈕上的文字能與目前的語系狀態絕對同步

    const btn = document.getElementById('langToggleBtn');
    // 從網頁 DOM 中選取 ID 為 'langToggleBtn' 的語系切換按鈕，並存入區域常數 btn 當中

    if (btn && window.LangManager) {
        // 安全檢查：確認按鈕元素與全域的 window.LangManager 物件皆存在

        btn.innerText = window.LangManager.current === 'zh' ? 'EN' : '繁中';
        // 使用三元運算子判斷：若目前語系為 'zh' 則將按鈕文字寫入 'EN'，反之則寫入 '繁中'
    }
    // 結束按鈕文字校正的條件區塊

    // ⚡ 終極關鍵修正：擊穿 iOS Safari 強制捲動到底部的漏洞，並強制鎖定在第一頁 sec0
    // 如果是網頁第一次載入，且所有 DOM 節點都被暴力注入完畢後
    // 以上兩行為單行註解：詳細說明下方的雙重排隊幀（Frame）機制，是為了解決行動裝置 Safari 瀏覽器加載時捲軸錯位的老症頭

    if (isFirstLoad) {
        // 條件判斷：如果目前仍是網頁的「第一次載入」狀態

        // 利用雙重 requestAnimationFrame 確保 iOS 已經完成畫面的重繪與排版判定
        // 以上為單行註解：說明使用雙重動畫偵（requestAnimationFrame）技術來確保瀏覽器已完成二次排版計算

        requestAnimationFrame(() => {
            // 註冊第一層動畫偵回呼函式，等待瀏覽器下一次重繪

            requestAnimationFrame(() => {
                // 註冊第二層動畫偵回呼函式，確保排版與高度計算在 iOS 裝置上已完全穩定

                // 1. 100% 強制將網頁視窗重設並鎖定在最頂端 (0, 0)
                // 以上為單行註解：說明歸位視窗的第一個手段

                window.scrollTo(0, 0);
                // 執行全域視窗捲動，強制將網頁軸線移至坐標系統的最左上角（頂端）

                // 2. ⚡ 核心功能新增：精準抓取第一頁的 HTML 節點，強迫瀏覽器把焦點吸附鎖定在 sec0 上
                // 以上為單行註解：說明歸位視窗的第二個保險手段

                const firstSection = document.getElementById('sec0');
                // 抓取網頁中 ID 為 'sec0' 的首頁（第一頁）區塊元素，並存入區域常數 firstSection 中

                if (firstSection) {
                    firstSection.scrollIntoView({ block: 'start', inline: 'nearest' });
                }
                // 如果成功找到首頁區塊元素，則呼叫原生 scrollIntoView 方法，強制瀏覽器將該區塊對齊視窗頂端

                // 3. 成功歸位後，將旗標設為 false，未來使用者點擊語系切換時就不會再受到干涉
                // 以上為單行註解：說明解除首次載入狀態，避免後續正常的語系切換干擾使用者瀏覽

                isFirstLoad = false;
                // 將載入旗標設為 false，關閉首次載入的條件鎖
            });
            // 結束第二層動畫偵回呼函式
        });
        // 結束第一層動畫偵回呼函式
    }
    // 結束首次載入視窗歸位的條件區塊
}
// 結束 runAllRenderModules 函式的定義

// 監聽 1：當網頁首次載入完成
// 以上為單行註解：標示以下為第一個全域事件監聽器，負責 DOM 樹結構就緒時的初始化引爆點

document.addEventListener('DOMContentLoaded', () => {
    // 為 document 註冊 'DOMContentLoaded' 事件監聽器，當網頁 HTML 結構解析完畢後立即觸發內部函式

    // ⚡ 終極防禦新增：只要使用者開啟或重整網頁，立刻用最高權限悄悄抹除網址後方的 #secX
    // 這樣能直接擊碎 iOS Safari 固執的歷史工作階段回復機制，強迫它必須聽從 JS 鎖定在首頁 sec0！
    // 以上兩行為單行註解：說明透過 HTML5 History API 清除網址錨點（Hash），解決瀏覽器重整頁面時記憶舊錨點滾動的漏洞

    if (window.location.hash) {
        // 條件判斷：如果當前網址的結尾帶有 `#` 錨點（例如 #sec2）

        history.replaceState("", document.title, window.location.pathname + window.location.search);
        // 使用 history.replaceState 在不刷新網頁的情況下，靜態地將網址重寫為「路徑 + 參數」，完美拔除網址尾端的錨點字串
    }
    // 結束網址錨點抹除的條件區塊

    // 執行所有畫面渲染
    // 以上為單行註解：說明接下來要呼叫先前定義的中央調度器

    runAllRenderModules();
    // 呼叫執行 runAllRenderModules 函式，啟動全站所有畫面的第一次多國語言渲染與歸位

    /**
     * 💡 導覽列自由收縮核心（全新升級：支援 LOGO 點擊開關、保留所有既有操作）
     */
    // 以上為區塊註解：標示以下為處理手機版或響應式網頁中，導覽列選單開合與收縮的核心邏輯函式

    function initNavToggleLogic() {
        // 在初始化階段定義一個名為 initNavToggleLogic 的內部函式，用來設置導覽列的開關事件

        // 1. 精準抓取您的導覽列主容器與新綁定的 LOGO 按鈕
        // 以上為單行註解：說明第一步是先撈出 DOM 中所有需要互動的選單與按鈕節點

        const navContainer = document.getElementById('nav-container');
        // 從網頁中抓取 ID 為 'nav-container' 的導覽列大容器，並存入區域常數 navContainer 當中

        const logoBtn = document.getElementById('logoBtn');
        // 從網頁中抓取 ID 為 'logoBtn' 的 LOGO 圖示按鈕，並存入區域常數 logoBtn 當中

        // const navList = document.getElementById('navList');
        // 從網頁中抓取 ID 為 'navList' 的導覽項目清單，並存入區域常數 navList 當中（此常數目前宣告後尚未在片段中被讀取）

        if (!navContainer) return;
        // 安全檢查：若網頁中根本沒有導覽列大容器（navContainer 為 null），則直接終斷此函式執行

        // 定義一個統一的關閉動作，避免 iOS 重複觸發
        // 以上為單行註解：說明建立一個關閉選單的公用箭頭函式，用來優化行動裝置的防重複點擊

        const closeMenu = () => {
            navContainer.classList.remove('nav-open');
        };
        // 定義 closeMenu 常數為一個函式，執行時會移除導覽容器上的 'nav-open' CSS 類別，使選單閉合（此常數目前在此片段中尚未被呼叫）

        // 2. ⚡ 全新加入：點擊獨立 LOGO 負責「開啟 / 關閉」導覽列
        // 以上為單行註解：說明第 2 步是為 LOGO 按鈕註冊點擊開關選單的邏輯

        if (logoBtn) {
            // 如果網頁中有成功找到 LOGO 按鈕元素

            logoBtn.addEventListener('click', (e) => {
                // 為 LOGO 按鈕註冊點擊（click）事件監聽器

                e.stopPropagation(); // 💡 關鍵：阻止事件冒泡，防止立刻觸發下方的外部關閉鎖
                // 執行阻止事件冒泡，防止點擊事件向上传遞到 document 或 window，避免同時觸發全域的「點擊外部關閉選單」邏輯

                navContainer.classList.toggle('nav-open');
                // 對導覽列容器的 class 列表進行切換（toggle）：若沒有 'nav-open' 就加上它（開啟選單），若有就移除它（關閉選單）
            });
            // 結束 LOGO 按鈕的點擊事件監聽器
        } // 結束 logoBtn 的存在性判斷
        // 2. ⚡ 針對 iOS 核心優化：點擊 / 觸控選單內部的單一選項，0 秒立刻收回
        // 以上為單行註解：說明以下區塊是專門為了優化 iOS 移動裝置，在點擊選單項目後能立即收合導覽列的邏輯

        if (navList) {
            // 進行安全檢查：確認在上一段程式碼中撈出的 navList（導覽項目清單元素）確實存在

            const handleItemClick = (e) => {
                // 定義一個名為 handleItemClick 的箭頭函式，用來處理點擊或觸摸選單項目時的事件

                // 多重保險判定：只要觸碰/點擊到 nav-item、li 或 a 標籤
                // 單行註解：說明下方使用 closest 方法來確保選單內各種層級的 HTML 標籤都能被精準捕捉

                if (e.target.closest('.nav-item') || e.target.closest('li') || e.target.closest('a')) {
                    // 使用 closest 方法向上尋找 DOM 樹：若點擊的目標屬於 .nav-item、li 或 a 標籤其中的任何一種

                    // 💡 關鍵：先執行收回動畫，不要阻斷網頁原生的錨點跳轉
                    // 單行註解：說明此處不使用 e.preventDefault()，目的是讓選單在動畫收合的同時，不影響原本 HTML 網頁的點擊跳轉功能

                    closeMenu();
                    // 呼叫先前定義的 closeMenu 函式，將導覽列容器的 'nav-open' 樣式類別移除以收回選單
                }
                // 結束多重標籤判定的條件區塊
            };
            // 結束 handleItemClick 箭頭函式的定義

            // 桌機與 Android 使用
            // 單行註解：說明傳統滑鼠點擊事件的適用平台

            navList.addEventListener('click', handleItemClick);
            // 為 navList 註冊常規的 'click'（點擊）事件監聽器，觸發時執行 handleItemClick 函式

            // ⚡ iOS 移動端專用防禦線：使用 touchstart 繞過 iOS 的 300ms 點擊延遲
            // 單行註解：說明透過觸控啟動事件來消除某些行動裝置瀏覽器上，點擊超連結時會產生的 300 毫秒原生等待延遲

            navList.addEventListener('touchstart', handleItemClick, { passive: true });
            // 為 navList 註冊移動端專用的 'touchstart'（觸控開始）事件監聽器，並開啟 passive: true 參數以提升網頁滾動效能
        }
        // 結束 navList 的事件註冊區塊

        // 4. 完美閉合鎖：點擊導覽列與 LOGO 以外的任何地方，通通自動收回選單
        // 單行註解：說明以下邏輯是用來處理使用者「點擊網頁外部空白處」時，自動關閉已展開選單的公用防禦鎖

        const closeMenuHandler = (e) => {
            // 定義一個名為 closeMenuHandler 的箭頭函式，用來判斷點擊事件是否發生在選單外面

            // 💡 修正關鍵：如果點擊的地方「不包含」在選單內，且「不包含」在 LOGO 內，才判定為點擊外部空白
            // 單行註解：詳細說明下方的雙重否定條件判斷，是為了避免點擊 LOGO 或導覽列本體時被誤判為點擊外部空白

            if (!navContainer.contains(e.target) && (!logoBtn || !logoBtn.contains(e.target))) {
                // 如果點擊的目標元素（e.target）不屬於 navContainer 內部，且（LOGO 按鈕不存在，或者點擊目標不屬於 logoBtn 內部）

                navContainer.classList.remove('nav-open');
                // 條件符合，代表使用者點擊了外部空白處，立刻移除 'nav-open' 樣式以關閉選單
            }
            // 結束點擊外部判定的條件區塊
        };
        // 結束 closeMenuHandler 箭頭函式的定義

        window.addEventListener('click', closeMenuHandler);
        // 在全域的 window 物件上註冊常規 'click' 事件監聽器，監控全網頁的所有點擊

        // ⚡ iOS 外部點擊防線：確保在 iOS 螢幕滑動或觸碰其他空白處時也能順暢收回
        // 單行註解：說明在全域加上 touchstart 監聽，確保 iOS 手機使用者滑動或觸摸螢幕其他地方時也能觸發外部收回

        window.addEventListener('touchstart', closeMenuHandler, { passive: true });
        // 在全域 window 物件上註冊 'touchstart' 事件監聽器，並設定效能優化參數為 passive: true
    }
    // 關閉上一段開頭定義的 initNavToggleLogic 函式本體

    // 💡 記得在您的 DOMContentLoaded 陣列或初始化邏輯中呼記此函數：
    // 單行註解：開發提醒文字，提示必須執行導覽列的初始化邏輯

    initNavToggleLogic();
    // 實際執行呼叫剛剛定義完畢的 initNavToggleLogic 函式，正式將所有開關、外部點擊和觸控事件綁定到 DOM 上

    // 啟動核心邏輯 (捲動監測等只需執行一次的功能)
    // 單行註解：說明以下用來啟動不隨語系變更、在網頁生命週期中只需要初始化一次的底層核心邏輯

    if (typeof setupCoreLogic === 'function') setupCoreLogic();
    // 安全檢查：若全域有定義 setupCoreLogic（設定核心邏輯）這個函式，則立刻執行它

    // if (typeof initGameLoader === 'function') initGameLoader();
    // 遭註解掉的程式：原本預留給初始化遊戲加載器（initGameLoader）的執行點，目前不啟用
});

// 💡 監聽 2：當 LangManager 觸發語系改變時，0 秒立刻重新渲染所有文字（iOS 絲滑秒切關鍵）
// 以上為單行註解：說明註冊第二個全域監聽器，用來承接 LangManager 發出的事件，達到無縫切換多國語言的效果

window.addEventListener('languageChanged', () => {

    runAllRenderModules();
});




/**
 * 2. 導覽列渲染 - 智慧型多語系精準替換版
 * 完美保留原有 HTML 結構與錨點跳轉，徹底根除切換語言時 Icon 重新載入與閃爍問題
 */
// 以上為區塊註解：說明此函式為第二個渲染模組「導覽列渲染」，其主要優化目標是解決語言切換時圖示閃爍的效能痛點

function renderNav() {
    // 定義一個名為 renderNav 的函式，用來動態產生或更新網頁頂端的導覽列選單

    const navList = document.getElementById('navList');
    // 從網頁 DOM 當中選取 ID 為 'navList' 的導覽清單容器，並存入區域常數 navList 中

    if (!navList || !config.nav) return;
    // 安全檢查：若網頁中找不到 navList 容器，或者全域設定檔中缺乏 nav 導覽資料，則立刻中斷執行

    // 1. 核心判斷：檢查畫面上是否「已經有」產生好的導覽選項了？
    // 單行註解：說明下方的條件判斷是用來區分「初次渲染」與「語系切換文字更新」兩種不同的情境

    const existingItems = navList.querySelectorAll('.nav-item');
    // 在 navList 容器內部搜尋所有 class 為 'nav-item' 的元素，並將搜尋結果（節點清單）存入常數 existingItems

    if (existingItems.length === 0) {
        // 條件判斷：如果目前畫面上的 nav-item 數量為零，代表網頁是第一次被載入

        // ===【首次載入網頁】===
        // 只有第一次開啟網頁時，才執行完整的 HTML 結構與 Icon 圖片注入
        // 因為頂端已經用 Image 物件預熱了，這裡 src 指定的當下，圖片會直接從記憶體 0秒秒開！
        // 以上三行為單行註解：詳細說明初次載入時的渲染邏輯，並強調配合了前面的圖片預熱機制，能達到無延遲的載入體驗

        navList.innerHTML = config.nav.map((item, i) => `
            <a class="nav-item" href="#sec${i}">
                <div class="nav-icon"><img src="${item.icon}" alt="icon"></div>
                <span class="nav-text">${item.name}</span>
            </a>
        `).join('');
        // 讀取 config.nav 陣列並使用 map 方法將資料轉化為 HTML 字串陣列，動態綁定錨點編號（#secX）、圖示路徑與文字名稱，最後用 join('') 將陣列結合成完整字串，透過 innerHTML 一次性暴力注入到 navList 容器中

        // 核心防護追加：首次生成 HTML 後，立即動態為每個 .nav-item 綁定一模一樣的防連點判定
        navList.querySelectorAll('.nav-item').forEach((btn, i) => {
            btn.onclick = (e) => {
                // 阻斷原始行為：無論如何都先阻止 HTML 原生的滾動跳轉行為
                e.preventDefault();

                // 當前位置高亮攔截：如果自己身上已經有 active 類別，代表正是目前所在分頁，直接攔截不重複跳轉
                if (btn.classList.contains('active')) return;

                // 總容器聯合鎖定：檢查總容器 navList 是否正在冷卻中
                if (navList.dataset.isCooling === "true") return;

                // 🚀 啟動全域聯合安全鎖：將總容器標記為冷卻狀態，瞬間同步封鎖所有導覽按鈕
                navList.dataset.isCooling = "true";

                // 秒跳與入場動畫分流機制：0秒直接切換至指定頁面，全面拔除滾動過程
                const targetSec = document.getElementById(`sec${i}`);
                if (targetSec) {
                    // 🌟 第一步：強制網頁瞬間歸位到該區塊（此處亦可用 window.scrollTo 確保舊版 iOS 相容性）
                    targetSec.scrollIntoView({ behavior: 'instant', block: 'start' });

                    // 🌟 第二步：利用 iOS 異步分流鎖，將動畫啟動時序延後 50 毫秒，等 iOS 滾動執行緒解鎖
                    setTimeout(() => {
                        // 先拔掉所有分頁的動畫類別，確保每一次進入都是全新的「首次進場」
                        document.querySelectorAll('[id^="sec"]').forEach(sec => sec.classList.remove('reveal'));

                        // 強制命令 iOS WebKit 重新計算版面，隨後灌入動畫類別，100% 復活入場動畫
                        targetSec.classList.add('reveal');
                    }, 50);
                }

                // ⏱️ 異步定時解鎖：設定 500 毫秒後自動將狀態解除
                setTimeout(() => {
                    navList.dataset.isCooling = "false"; // 解除安全鎖
                }, 500);
            };
        });
    } else {
        // 否則（意即 existingItems.length 不為零，代表導覽列的 HTML 骨架早就在畫面上產生好了）

        // ===【非首次載入（點擊切換語言時）】===
        // ⚡ 結構鎖定：所有的 <a> 標籤、連結、<img> Icon 通通留在原地，100% 不重新載入
        // 以上兩行為單行註解：說明在語系切換時採取的「結構鎖定」優化手段，用來隔絕瀏覽器重新解構與下載圖片的開銷

        const textElements = navList.querySelectorAll('.nav-text');
        // 在已經存在的導覽列中，精準選取所有 class 為 'nav-text' 的文字標籤節點，並存入常數 textElements 當中

        // 僅僅用 textContent 更新文字內容！Icon 圖片連碰都不會被碰到
        // 單行註解：說明下方的迴圈操作只專注於文字內容的替換，完全不干涉圖示

        config.nav.forEach((item, index) => {
            // 使用 forEach 迴圈遍歷最新語系下的 config.nav 陣列資料

            if (textElements[index]) {
                textElements[index].textContent = item.name;
            }
            // 安全檢查：若對應索引值的文字節點存在，則使用高效的原生 textContent 屬性將其文字修改為最新語系的名稱
        });
        // 結束 config.nav 陣列的遍歷更新
    }
    // 結束首次與非首次載入的條件分支判定
}
// 結束 renderNav 函式的定義


/**
 * 3. 靜態文字渲染 - 標題位置調換版
 * 最終修正版：精準對齊 config.introSubtitle 的大小寫，完美點亮英文副標題
 */
// 以上為區塊註解：說明此函式為第三個渲染模組「靜態文字渲染」，並註記修正了副標題欄位大小寫對齊的問題

function renderStaticContent() {
    // 定義一個名為 renderStaticContent 的函式，用來動態產生或更新網頁中非列表結構的靜態文本內容（如策展理念、遊戲介紹）

    // === 區塊 1 ===
    // 單行註解：標示以下為網頁第 1 區塊（通常是首頁或策展理念區）的文字渲染處理

    const sec1Box = document.querySelector('#sec1 .content-box');
    // 使用選擇器精準抓取 ID 為 'sec1' 元素底下的 '.content-box' 容器，並存入區域常數 sec1Box

    if (sec1Box) {
        // 如果成功在網頁中找到第 1 區塊的內容容器

        let h1 = sec1Box.querySelector('h1');
        // 在 sec1Box 內部搜尋並宣告變數 h1 指向主標題 <h1> 標籤

        let sub = sec1Box.querySelector('.sub-title');
        // 在 sec1Box 內部搜尋並宣告變數 sub 指向 class 為 'sub-title' 的副標題標籤

        let p = sec1Box.querySelector('.p-text');
        // 在 sec1Box 內部搜尋並宣告變數 p 指向 class 為 'p-text' 的段落文字標籤

        // 如果結構不存在（首次載入），完美補回包含 class="sub-title" 的副標題標籤
        // 單行註解：說明當網頁第一次載入且 HTML 內部為空時，自動建立底層 DOM 骨架的安全降級機制

        if (!h1 || !sub || !p) {
            // 條件判斷：如果標題、副標題、段落這三個標籤中，有任何一個在 HTML 結構中缺失

            sec1Box.innerHTML = `<h1></h1><div class="sub-title"></div><p class="p-text"></p>`;
            // 透過 innerHTML 暴力初始化 sec1Box，將主標題、副標題與內文段落的標準 HTML 骨架一次性建立起來

            h1 = sec1Box.querySelector('h1');
            // 結構補齊後，重新撈取並更新 h1 變數的節點參照

            sub = sec1Box.querySelector('.sub-title');
            // 結構補齊後，重新撈取並更新 sub 變數的節點參照

            p = sec1Box.querySelector('.p-text');
            // 結構補齊後，重新撈取並更新 p 變數的節點參照
        }
        // 結束 HTML 骨架初始化判斷

        // 僅替換純文字，完全鎖定你的 HTML 結構與 CSS 樣式
        // 單行註解：說明下方更新文字時不干涉任何網頁排版樣式

        if (h1) h1.textContent = config.introTitle;
        // 如果主標題標籤存在，使用 textContent 填入當前語系的策展理念標題（introTitle）

        // ⚡ 終極關鍵修正：精準對齊你的欄位名稱（小寫 t 的 introSubtitle），讓中英文翻譯順暢切換
        // 單行註解：強調此處修正了欄位名稱大小寫（introSubtitle 的 t 為小寫），避免因變數名稱拼錯讀不到資料

        if (sub) sub.textContent = config.introSubtitle;
        // 如果副標題標籤存在，使用 textContent 填入當前語系的策展理念副標題（introSubtitle）

        if (p) p.textContent = config.introText;
        // 如果內文段落標籤存在，使用 textContent 填入當前語系的策展理念長文本（introText）
    }
    // 結束區塊 1 的靜態文字更新

    // === 區塊 3 ===
    // 單行註解：標示以下為網頁第 3 區塊（通常是遊戲介紹區）的文字與圖片渲染處理

    const sec3Box = document.querySelector('#sec3 .content-box');
    // 使用選擇器精準抓取 ID 為 'sec3' 元素底下的 '.content-box' 容器，並存入區域常數 sec3Box

    if (sec3Box) {
        // 如果成功在網頁中找到第 3 區塊的內容容器

        const hasImgWrap = sec3Box.querySelector('.sub-title-img-wrap');
        // 檢查並宣告常數 hasImgWrap，確認該區塊中目前是否已經包含了輔助圖片的包裝容器

        if (!hasImgWrap) {
            // 條件判斷：如果畫面上還沒有圖片包裝容器（即網頁初次載入）

            sec3Box.innerHTML = `
                ${(config.gameIntroSubImg1 || config.gameIntroSubImg2) ? `
                    <div class="sub-title-img-wrap">
                        ${config.gameIntroSubImg1 ? `<img class="sub-title-img" src="${config.gameIntroSubImg1}" alt="副標題1">` : ''}
                        ${config.gameIntroSubImg2 ? `<img class="sub-title-img" src="${config.gameIntroSubImg2}" alt="副標題2">` : ''}
                    </div>
                ` : ''}
                <h1></h1>
                <p class="p-text"></p>
            `;
            // 使用樣板字串（Template Literals）和三元運算子動態判斷全域設定檔中是否有提供作品 LOGO 小圖。若有任一張，則在頂部灌入含有對應圖片的 .sub-title-img-wrap 容器，否則留空；並在其下方補上主標題 <h1> 與內文段落 <p> 的基本骨架
        }
        // 結束區塊 3 HTML 骨架初始化判斷

        const h1 = sec3Box.querySelector('h1');
        // 在初始化完畢的結構中選取主標題 <h1> 節點，並存入常數 h1 中

        const p = sec3Box.querySelector('.p-text');
        // 在初始化完畢的結構中選取內文段落 <p> 節點，並存入常數 p 中

        if (h1) h1.textContent = config.gameIntroTitle;
        // 如果主標題標籤存在，使用 textContent 填入當前語系的遊戲介紹主標題（gameIntroTitle）

        if (p) p.textContent = config.gameIntroText;
        // 如果內文段落標籤存在，使用 textContent 填入當前語系的遊戲介紹內文（gameIntroText）
    }
    // 結束區塊 3 的靜態文字更新
}
// 結束 renderStaticContent 函式的定義


/**
 * 5. 渲染 Podcast 節目清單（自定義 HTML5 核心：全域 config 圖片去背讀取相容版）
 */
function renderPodcastList() {
    const titleEl = document.getElementById('podcastSectionTitle'); // 從網頁 DOM 當中精準選取 Podcast 區塊的大標題元件，並存入區域常數 titleEl
    if (titleEl) { // 安全檢查：如果標題元件存在
        titleEl.textContent = config.podcastSectionTitle || (window.lang && lang.podcastSectionTitle) || ""; // 透過 textContent 將大標題秒切為當前語言文本，保障語系切換時不閃爍
    } // 結束標題處理的條件區塊

    requestAnimationFrame(() => { // 啟動第一層動畫影格監聽：強迫 JavaScript 進入瀏覽器的排隊等待序列，確保時序分流安全
        requestAnimationFrame(() => { // 啟動第二層動畫影格監聽：強迫程式碼等待實體網頁 DOM 樹與物理像素完全繪製就緒，徹底防範空白死火

            const container = document.getElementById('podcast-container'); // 從已經完全蓋好的網頁實體 DOM 當中精準選取負責掛載清單的外殼容器，並存入常數 container
            if (!container) return; // 安全檢查：若網頁中找不到該容器，則立刻中斷執行，防範非同步腳本引發系統當機

            container.style.height = "auto"; // 將大容器的 CSS 高度強制設定為 "auto"，確保在單集列表展開後能流暢地撐開父層排版，徹底擊碎 0 像素外框隱形地雷

            const currentDict = window.lang || config || (window.translations && window.translations[window.currentLang || 'zh']) || {}; // 核心防禦：自動嗅探並鎖定目前最安全、已就緒的多國語言實體字典檔物件，存入常數 currentDict 之中
            const episodes = currentDict.podcastList || []; // 將變數來源百分之百精準對齊更正為您 config.js 實體截圖中的陣列名稱 podcastList，徹底擊碎斷鏈死鎖

            const existingScrollBox = container.querySelector('.podcast-scroll-box'); // 在 container 內部搜尋是否已經存在自定義的滾動盒子，並將結果存入常數 existingScrollBox

            if (!existingScrollBox) { // 條件分支：如果畫面上還找不到滾動盒子結構，代表網頁是第一次載入，需要進行完整 HTML 骨架注入

                // ===【首次載入網頁（從全域 config 讀取去背圖片檔案，建立自製控制面板結構）】===
                let html = '<div class="podcast-scroll-box">'; // 初始化一個名為 html 的字串變數，並在開頭填入專屬的垂直滾動控制層外殼標籤
                const defaultPlayImg = config.playIcon || "./icon/play.png"; // 讀取全域設定檔中的去背播放圖示路徑，若無則給予專屬的備份預設路徑

                episodes.forEach((ep, i) => { // 直接遍歷您的實體物件陣列，i 為目前集數的索引值
                    const titleText = ep.title || ''; // 完美的對齊提取每一集卡片內部的多國語言標題屬性 ep.title
                    const audioSrc = ep.audio || ''; // 完美的對齊提取每一集卡片內部的實體音訊連結屬性 ep.audio
                    const coverSrc = ep.cover || ''; // 完美的對齊提取每一集卡片內部的實體封面圖片屬性 ep.cover

                    html += `
                        <div class="podcast-item">
                            ${coverSrc ? `<img src="${coverSrc}" alt="cover" class="podcast-cover">` : ''}
                            <div class="podcast-meta-info">
                                <h4 class="podcast-episode-title" data-ep-index="${i}">${titleText}</h4>
                                <div class="custom-audio-player">
                                    <audio id="native-audio-${i}" src="${audioSrc}" preload="metadata" playsinline></audio>
                                    <button id="play-btn-${i}" onclick="window.CustomPlayer.togglePlay(${i})" class="player-control-btn is-paused">
                                        <img src="${defaultPlayImg}" alt="play" class="player-icon-img">
                                    </button>
                                    <span id="time-txt-${i}" class="player-time-display">00:00 / 00:00</span>
                                    <input id="timeline-${i}" type="range" min="0" max="100" value="0" oninput="window.CustomPlayer.seek(${i}, this.value)" class="player-timeline-bar">
                                </div>
                            </div>
                        </div>
                    `; // 終極正確修正：將原本的純文字字符完全汰換為標準的 img 去背圖片標籤，從根本結構上 100% 徹底閹割、抹除 iOS 系統將文字重繪成彩色 Emoji 表情符號的可能
                }); // 結束單集物件陣列的遍歷迴圈

                html += '</div>'; // 閉合自定義的垂直滾動控制層包裹外殼字串
                container.innerHTML = html; // 透過 innerHTML 將這套完全擺脫蘋果 Shadow DOM 束縛的自定義清單結構一次性寫入目標容器內部

                // ===【註冊全域自定義播放器大控制器（ window.CustomPlayer ）】===
                window.CustomPlayer = { // 在全域 window 物件上掛載一個名為 CustomPlayer 的獨立控制庫，用來非同步調度所有自定義播放器的圖片 src 切換與時間軸滑移
                    togglePlay(idx) { // 定義一個名為 togglePlay 的方法，用來開關特定集數的播音
                        const audio = document.getElementById(`native-audio-${idx}`); // 精準撈出該集藏在背後的 HTML5 原生隱形音訊節點
                        const btn = document.getElementById(`play-btn-${idx}`); // 精準選取該集畫面上放大了 1.5 倍的實體自定義播放按鈕外殼
                        if (!audio || !btn) return; // 安全檢查：若元件不存在則立刻退出

                        const iconImg = btn.querySelector('.player-icon-img'); // 在當前被點擊的按鈕內部撈出負責顯示去背圖檔的 img 標籤實體
                        const pImg = config.playIcon || "./icon/play.png"; // 提撥播放去背圖路徑
                        const sImg = config.pauseIcon || "./icon/pause.png"; // 提撥暫停去背圖路徑
                        const lImg = config.loadingIcon || ""; // 提撥載入中去背圖路徑

                        // 💡 核心修正：利用純 Promise 鏈，全面撤除內部所有的 await 關鍵字，完美相容外層普通函數
                        const releaseWakeLock = () => {
                            if (btn._wakeLock) {
                                btn._wakeLock.release().catch(() => { }); // 物理釋放常亮鎖
                                btn._wakeLock = null;
                            }
                        };

                        const requestWakeLock = () => {
                            if ('wakeLock' in navigator && !btn._wakeLock) {
                                navigator.wakeLock.request('screen')
                                    .then((lock) => { btn._wakeLock = lock; }) // 成功鎖定螢幕亮度，100% 杜絕變暗
                                    .catch(() => { btn._wakeLock = null; }); // 低電量安全網
                            }
                        };

                        // 安全防護助手：封裝一個專屬的「安全撤退與音軌重載修復」函式
                        const handleTimeoutFallback = () => {
                            if (btn.dataset.timeoutId) {
                                clearTimeout(parseInt(btn.dataset.timeoutId)); // 清除並回收定時器
                                btn.removeAttribute('data-timeout-id');
                            }
                            releaseWakeLock(); // 💡 發生卡死撤退時，同步安全釋放螢幕鎖

                            if (btn.classList.contains('is-loading')) {
                                // 🌟 核心防錯：在重載洗牌前，光速將卡死當下的進度秒數備份到暫存區
                                const currentProgress = audio.currentTime;

                                audio.pause();
                                audio.load(); // 執行底層音軌洗牌，修復 iPad 醒來失效的通道

                                // 🌟 核心復原：洗牌完成後，立刻將剛才備份的進度強行灌回，100% 防止拉回初始進度
                                audio.currentTime = currentProgress;

                                if (iconImg) iconImg.src = pImg;
                                btn.classList.remove('is-playing', 'is-loading');
                                btn.classList.add('is-paused'); // 安全撤退回播放鍵外觀
                            }
                        };

                        // 💡 核心新增：手動點擊「載入中」狀態的防禦攔截鎖
                        if (btn.classList.contains('is-loading')) {

                            // 🌟 斷點快取第一步：在音軌重載前，光速將卡死當下的真實進度秒數備份下來
                            const currentProgress = audio.currentTime;

                            audio.pause(); // 停止目前卡住的播音請求
                            audio.load();  // 執行底層音軌洗牌，修復 iPad 醒來失效的通道

                            // 🌟 斷點快取第二步：洗牌完成後，立刻將剛才備份的進度強行灌回，100% 防止退回初始起點
                            audio.currentTime = currentProgress;

                            // 🌟 斷點快取第三步：安全將按鈕外觀拉回常規播放鍵
                            if (iconImg) iconImg.src = pImg;
                            btn.classList.remove('is-playing', 'is-loading');
                            btn.classList.add('is-paused');

                            releaseWakeLock(); // 💡 手動取消載入時，同步釋放常亮鎖

                            return; // 💥 阻斷後續所有播放邏輯，不允許堆疊重複請求
                        }

                        if (audio.paused) { // 條件判斷：若該集目前正處於暫停或未播放狀態
                            document.querySelectorAll('.player-control-btn').forEach((b, ai) => { if (ai !== idx) { const aud = document.getElementById(`native-audio-${ai}`); if (aud) aud.pause(); b.classList.remove('is-playing', 'is-loading'); b.classList.add('is-paused'); const img = b.querySelector('.player-icon-img'); if (img) img.src = pImg; } }); // 排他機制：強迫其他所有集數暫停，並一對一將按鈕內部的圖片 src 全部換回常規播放去背圖檔

                            // iOS 防禦鎖：不囉嗦，點擊瞬間一律無視 readyState，強制先行切換為「加載中」外觀
                            if (lImg) {
                                if (iconImg) iconImg.src = lImg;
                                btn.classList.remove('is-paused', 'is-playing');
                                btn.classList.add('is-loading');
                            }

                            // 🚀 核心追加：點擊播放，立刻發動 iOS 螢幕常亮鎖定！
                            requestWakeLock();

                            // 🚀 核心追加：啟動 8 秒超時安全撤退網，防範 iPad 鎖屏醒來無限卡死
                            const timeoutId = setTimeout(() => {
                                handleTimeoutFallback();
                            }, 8000); // 鎖定 8 秒極限超時
                            btn.dataset.timeoutId = timeoutId.toString(); // 將計時器 ID 綁定在 DOM 上以利回收

                            // 監聽：為當前音檔臨時綁定一個「首發播音成功」的一次性回呼
                            audio.onplaying = () => {
                                // 🌟 成功發聲的瞬間，解除並沒收 8 秒超時定時器，任務安全完成
                                if (btn.dataset.timeoutId) {
                                    clearTimeout(parseInt(btn.dataset.timeoutId));
                                    btn.removeAttribute('data-timeout-id');
                                }
                                if (iconImg) iconImg.src = sImg;
                                btn.classList.remove('is-paused', 'is-loading');
                                btn.classList.add('is-playing');
                                audio.onplaying = null; // 任務完成後卸載此單次事件
                            };

                            // 發動播音，如果被 iOS 安全機制全面阻擋，則安全撤退回播放鍵
                            audio.play().catch(() => {
                                audio.onplaying = null; // 失敗時解除監聽
                                if (btn.dataset.timeoutId) {
                                    clearTimeout(parseInt(btn.dataset.timeoutId));
                                    btn.removeAttribute('data-timeout-id');
                                }
                                releaseWakeLock(); // 💡 播放失敗時，同步安全釋放螢幕鎖
                                if (iconImg) iconImg.src = pImg;
                                btn.classList.remove('is-playing', 'is-loading');
                                btn.classList.add('is-paused');
                            });
                        } else { // 否則（意即該集正在放音中）
                            audio.pause(); // 觸發暫停播音
                            audio.onplaying = null; // 暫停時強制切斷未完成的播音監聽
                            if (btn.dataset.timeoutId) {
                                clearTimeout(parseInt(btn.dataset.timeoutId)); // 暫停時一併回收定時器
                                btn.removeAttribute('data-timeout-id');
                            }

                            // 🚀 核心追加：主動暫停時，釋放常亮鎖，還原手機省電機能
                            releaseWakeLock();

                            if (iconImg) iconImg.src = pImg; // 將內部實體 img 標籤的 src 重新指派換回常規的播放去背圖檔路徑
                            btn.classList.remove('is-playing', 'is-loading'); // 觸發暫停時移出播放與載入狀態類別
                            btn.classList.add('is-paused'); // 觸發暫停時補上暫停狀態類別
                        } // 結束播音開關判定
                    }, // 結束 togglePlay 方法定義
                    seek(idx, percent) { // 定義一個名為 seek 的方法，供使用者用滑鼠或大拇指拖曳自定義進度條時調整時間
                        const audio = document.getElementById(`native-audio-${idx}`); // 選取該集的隱形音訊節點
                        const timeline = document.getElementById(`timeline-${idx}`); // 選出實體自定義進度條滑塊
                        if (!audio || !audio.duration) return; // 安全檢查：確認音訊存在且總長度已經加載完畢
                        audio.currentTime = (percent / 100) * audio.duration; // 根據拖曳的百分比，物理計算出對應的播放時間點並指派給原生音訊節點
                        if (timeline) timeline.style.setProperty('--value', `${percent}%`); // 手動拖曳校正：當使用者拉動滑塊時，即時外傳最新百分比給 CSS 漸層同步亮色
                    }
                };

                // ===【註冊定時器：即時同步時間文字與進度條滑動】===
                episodes.forEach((ep, i) => { // 再次遍歷每一集，為各自的隱形音訊節點註冊即時滾動監聽
                    const audio = document.getElementById(`native-audio-${i}`); // 撈出該集隱形音訊節點
                    const timeTxt = document.getElementById(`time-txt-${i}`); // 選出實體自定義時間顯示標籤
                    const timeline = document.getElementById(`timeline-${i}`); // 選出實體自定義進度條滑塊

                    if (audio) { // 如果音訊節點存在
                        const fmt = (s) => { if (isNaN(s)) return '00:00'; const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`; }; // 建立一個名為 fmt 的區域時間格式化小助手，將秒數轉換為標準的 MM:SS 字串

                        audio.addEventListener('timeupdate', () => { // 即時數據指派：只要聲音在跑，就每秒自動數次複製記憶體數值並傳遞給自製滑塊
                            if (timeTxt) timeTxt.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`; // 即時格式化目前進度與總長度，透過 textContent 0 秒更新文字顯示
                            if (timeline && audio.duration) {
                                const pct = (audio.currentTime / audio.duration) * 100; // 計算目前進度的純數字百分比
                                timeline.value = pct; // 將百分比指派給自定義進度條的 value 屬性，推動小圓點向右滑移
                                timeline.style.setProperty('--value', `${pct}%`); // 利用 CSS 變數即時向外部樣式表外傳當前放音比例，激活 CSS 已播放進度條主題藍色渲染
                            }
                        });

                        audio.addEventListener('loadedmetadata', () => { // 註冊元資料監聽
                            if (timeTxt) timeTxt.textContent = `00:00 / ${fmt(audio.duration)}`; // 當網頁在背景加載好音檔長度時，立刻搶先將總時間顯示在畫面上，防範未播放前時間顯示為空白
                        });

                        // 🚀 方案乙追加：網頁長掛/鎖屏醒來「滿血洗牌鎖」
                        // 當 iPad 鎖屏很久、重新亮起螢幕，網頁一回到前景的微秒內立刻觸發
                        document.addEventListener('visibilitychange', () => {
                            if (document.visibilityState === 'visible') {
                                // 🌟 檢查核心：如果網頁醒來時，這首音檔本來是播放狀態，但 readyState 卻小於 3（代表 iOS 核心已經把連線掐斷或失效了）
                                if (!audio.paused && audio.readyState < 3) {

                                    // 斷點快取守護：先光速把休眠前的時間記憶下來，防止重載時被歸零
                                    const wakeProgress = audio.currentTime;

                                    audio.load(); // 執行底層洗牌重載，強迫 iOS 與伺服器重新握手，復活失效的通道 [INDEX]
                                    audio.currentTime = wakeProgress; // 瞬間將時間還原回原地 [INDEX]

                                    // 補點火：再次命令音軌發動播音，並在背後交給 onplaying 去切換成暫停鈕外觀 [INDEX]
                                    audio.play().catch(() => {
                                        // 萬一被 iOS 自動播放政策強行阻擋發聲，則安全退回暫停畫面
                                        const btn = document.querySelectorAll('.player-control-btn')[i];
                                        const iconImg = btn?.querySelector('.player-icon-img');
                                        if (btn && iconImg) {
                                            iconImg.src = config.playIcon || "./icon/play.png";
                                            btn.classList.remove('is-playing', 'is-loading');
                                            btn.classList.add('is-paused');
                                        }
                                    });
                                }
                            }
                        }); // 結束方案乙監聽
                    }
                }); // 結束 episodes 的遍歷監聽註冊

            } else { // 否則（意即 existingScrollBox 存在，代表大外殼與播放器早就在畫面上，此時使用者是在最上方點擊切換語言）

                // ===【非首次載入（點擊切換語言時：結構鎖定最高防禦）】===
                episodes.forEach((ep, i) => { // 遍歷最新的多國語言單集資料
                    const titleEl = container.querySelector(`.podcast-episode-title[data-ep-index="${i}"]`); // 透過我們在上面首次載入時預留的自定義 data-ep-index 屬性，精準在 DOM 樹中撈出該集的標題元素
                    if (titleEl) { // 如果該集標題存在
                        titleEl.textContent = ep.title || ''; // 直接使用 textContent 替換標題為最新語系的 ep.title 文字，而下方的自定義播放器與播音進度則 100% 完全鎖定不動
                    }
                });
            }
        });
    });
}


///**
// * 獨立 QR Code 自動掛載外掛（完全整合 Config 檔案）
// */
//window.addEventListener('DOMContentLoaded', () => {
//    // 1. 檢查 Config 與圖片路徑是否存在，不存在則直接跳出不執行
//    if (!window.config || !window.config.qrcodeSrc) return;

//    // 2. 確保目標 #sec2 節點存在，且防範重複生成容器
//    const targetSection = document.getElementById('sec2');
//    if (!targetSection || document.querySelector('.sec2-qrcode-box')) return;

//    // 3. 動態建立外層包裹容器
//    const qrContainer = document.createElement('div');
//    qrContainer.className = 'sec2-qrcode-box';

//    // 4. 動態建立圖片標籤並注入 Config 參數
//    const qrImg = document.createElement('img');
//    qrImg.src = window.config.qrcodeSrc;
//    qrImg.alt = window.config.qrcodeAlt || 'QRcode';

//    // 5. 組合結構並掛載至 #sec2 內部最底部
//    qrContainer.appendChild(qrImg);
//    targetSection.appendChild(qrContainer);
//});

       ///**
       // * 5. 製作人員名單
       // * 將 config.staff 的資料轉化為網格列表
       // */
       //    function renderStaff() {
       //        const box = document.getElementById('staff-content');
       //        // 安全檢查：確保容器存在且設定檔有資料
       //        if (!box || !config.staff) return;

       //        // 渲染標題與網格內容
       //        box.innerHTML = `
       //         <h1 style="color: #68BFFF !important;">製作人員</h1>
       //         <div class="staff-grid">
       //             ${config.staff.map(s => `
       //                 <div class="staff-row">
       //                     <span class="staff-role">${s.r}</span>
       //                     <span class="staff-name">${s.u}</span>
       //                 </div>
       //             `).join('')}
       //         </div>
       //         `;
       //    }
/**
 * 6. 角色展示區渲染函數（iOS 渲染異步分流版）
 */
function renderChar(idx) {
    const c = config.chars?.[idx]; // 透過傳入的索引值，從全域變數 config.chars 陣列中取出對應的角色資料物件，並存入常數 c 當中
    const container = document.getElementById('char-content'); // 從網頁 DOM 當中選取 ID 為 'char-content' 的角色展示大容器，並存入區域常數 container
    const template = document.getElementById('char-template'); // 從網頁 DOM 當中選取 ID 為 'char-template' 的 HTML5 範本元素，並存入區域常數 template

    if (!c || !container || !template) return; // 安全檢查：若目前選取的角色資料、目標容器、或是範本標籤有任何一個不存在，則立刻中斷執行

    const existingLayout = container.querySelector('.char-layout'); // 在 container 內部搜尋是否已經存在一個 class 為 'char-layout' 的實體結構，並將結果存入常數 existingLayout

    if (!existingLayout) {
        const clone = template.content.cloneNode(true); // 呼回 cloneNode 方法，將 template 內部的所有子節點進行深層克隆，並存入常數 clone

        clone.querySelector('.main-img').src = c.m; // 在克隆結構中搜尋 class 為 'main-img' 的大立繪圖片標籤，並將其 src 指派為該角色的主圖相對路徑
        clone.querySelector('.char-name-title').textContent = c.n; // 在克隆結構中搜尋 class 為 'char-name-title' 的標籤，並使用 textContent 寫入角色名稱
        clone.querySelector('.char-intro').textContent = c.i; // 在克隆結構中搜尋 class 為 'char-intro' 的標籤，並使用 textContent 寫入角色介紹與台詞

        const btnWrap = clone.querySelector('.char-btn-wrap'); // 在克隆結構中搜尋負責包裝頭像按鈕的容器元素，並存入區域常數 btnWrap
        if (btnWrap) {
            config.chars.forEach((char, i) => {
                const btn = document.createElement('div'); // 在記憶體中動態建立一個全新的 div 元素，存入常數 btn
                btn.className = 'head-circle'; // 終極正確修正：首次生成時在虛擬圖層中只給予乾淨的基礎名稱，不提前夾帶 active，防止引發 iOS 渲染陰影與時序錯位

                btn.onclick = () => {
                    // 💡 依高亮位置直接判定：如果自己身上已經有 active，代表就是當前所在角色，直接攔截
                    if (btn.classList.contains('active')) return;

                    // 💡 核心聯合防護修正：檢查按鈕的「共同總容器 btnWrap」是否正在冷卻中，達成三個按鈕一起判定時間
                    if (btnWrap.dataset.isCooling === "true") return;

                    // 🚀 啟動聯合安全鎖：直接將總容器標記為冷卻狀態，瞬間同步封鎖所有子按鈕
                    btnWrap.dataset.isCooling = "true";

                    // 4. 觸發原本的角色渲染邏輯
                    renderChar(i);

                    // 5. 設定 500 毫秒後自動將狀態解除
                    setTimeout(() => {
                        // 觸發一個非同步的計時器（setTimeout）

                        btnWrap.dataset.isCooling = "false"; // 解除安全鎖
                        // 在指定時間到達後，將總容器冷卻狀態重新設為 false，同步重新開放所有點擊

                    }, 500); // 設定該計時器在 500 毫秒（0.5秒）後執行內部程式碼
                };

                btn.innerHTML = `<img src="${char.h}" alt="head">`; // 使用 innerHTML 在按鈕內部灌入一張圖片標籤，其圖片路徑為該角色的小頭像
                btnWrap.appendChild(btn); // 將這個建立、設定完畢的頭像按鈕元素實體，動態挂載到按鈕容器 btnWrap 的末尾
            });
        }

        container.innerHTML = ''; // 清空實體容器 container 內部的所有舊 HTML 內容
        container.appendChild(clone); // 正式掛載：將克隆並處理完畢的全新純淨骨架正式放上實體網頁，讓 iOS 的 WebKit 核心完成初次佈局
        container.classList.add('reveal'); // 為大容器加上 reveal 類別名稱，用來啟動 CSS 預先寫好的淡入、縮放等角色進場動畫效果
    } else {
        const mainImg = existingLayout.querySelector('.main-img'); // 在已經存在的角色結構中，選取大立繪圖片標籤，並存入區域常數 mainImg
        if (mainImg && mainImg.getAttribute('src') !== c.m) {
            mainImg.src = c.m;
        } // 如果大立繪標籤存在，且它目前的 src 路徑不等於最新要顯示的角色圖片路徑，才去修改 src 屬性觸發換圖
        const nameTitle = existingLayout.querySelector('.char-name-title'); // 在已經存在的角色結構中，精準選取角色名字標籤，並存入區域常數 nameTitle
        const introText = existingLayout.querySelector('.char-intro'); // 在已經存在的角色結構中，精準選取角色台詞介紹標籤，並存入區域常數 introText
        if (nameTitle) nameTitle.textContent = c.n; // 如果名字標籤存在，使用 textContent 填入最新語系狀態下的角色名稱
        if (introText) introText.textContent = c.i; // 如果介紹標籤存在，使用 textContent 填入最新語系狀態下的角色台詞與介紹
    }

    const updateActiveButtonState = () => {
        const allButtons = container.querySelectorAll('.head-circle'); // 從目前的容器中，選取出所有的頭像按鈕，並存入區域常數陣列 allButtons 當中
        if (allButtons && allButtons.length > 0) {
            allButtons.forEach((btn, i) => {
                if (i === idx) {
                    btn.classList.add('active'); // 完美點亮：不論是手動初次開啟還是後續點擊，此時 DOM 已經在網頁實體上，直接在此處強勢點亮當前頭像外圈發光
                } else {
                    btn.classList.remove('active'); // 徹底摘除其他非選定按鈕的高亮樣式
                }
            });
        }
    }; // 結束 updateActiveButtonState 箭頭函式的定義

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            updateActiveButtonState(); // 利用雙重 requestAnimationFrame 強迫程式碼等待 iOS 完成畫面的物理繪製，骨架上牆後才給予 active，100% 復活發光圈
        });
    }); // 結束第一層動畫偵回呼函式
}

/**
 * 獨立功能：實機演示影片渲染外掛（智慧型多語系鎖定 + ⚡ 變數大小寫與空值雙重防禦版）
 * 負責在 sec5 與 sec6 注入大標題與原生控制面板影片，自動校正變數命名地雷，開局標題 100% 完美回歸！
 */
// 以上為區塊註解：說明此函式為獨立的功能外掛模組，專門負責網頁第 5 與第 6 區塊（展示影片區）的文字與原生影片標籤注入，並內建了防空值與防變數拼錯的防禦機制

function renderGameDemoVideos() {
    // 定義一個名為 renderGameDemoVideos 的功能函數

    // ⚡ 終極多重防禦：如果 config 讀出來是空的（代表 lang 沒載好），直接強制給予最精準的預設繁中標題！
    // 以上為單行註解：說明下方宣告的物件內建了多層回退（Fallback）機制，以防設定檔變數未就緒時網頁發生空白

    const demoConfigs = {
        // 宣告一個區域常數物件 demoConfigs，將兩個影片區塊的 CSS 選擇器、多國語言標題與影片路徑進行結構化集中管理

        '#sec5 .content-box': {
            // 設定第 5 區塊（視覺小說影片展示區）的資料物件

            title: config.gameDemoTitle5 || (window.lang && lang.gameDemoTitle5) || '視覺小說',
            // 使用邏輯或（||）建立三重標題防禦：優先讀取全域 config，若無則嘗試撈取 window.lang，若皆失敗則強制給予預設字串 '視覺小說'

            src: config.gameVideoSrc5 || config.gameVideoUrl1 || "./info/test.mov"
            // 使用邏輯或建立三重影片路徑防禦：相容 Src5 或是 Url1 欄位名稱，若皆無則指派預設的測試影片相對路徑
        },
        // 結束第 5 區塊的配置

        '#sec6 .content-box': {
            // 設定第 6 區塊（寂寞流星雨影片展示區）的資料物件

            title: config.gameDemoTitle6 || (window.lang && lang.gameDemoTitle6) || '寂寞流星雨',
            // 建立與區塊 5 相同的三重標題防禦，預設兜底文字為 '寂寞流星雨'

            src: config.gameVideoSrc6 || config.gameVideoUrl2 || "./info/test.mov"
            // 建立與區塊 5 相同的三重路徑防禦，相容 Src6 或是 Url2 欄位名稱
        }
        // 結束第 6 區塊的配置
    };
    // 結束 demoConfigs 物件的定義

    Object.entries(demoConfigs).forEach(([selector, videoData]) => {
        // 使用 Object.entries 將 demoConfigs 物件轉換為 [鍵, 值] 陣列，並使用 forEach 迴圈搭配解構賦值，將選擇器（selector）與對應的影片數據（videoData）抽離出來進行遍歷

        const targetElement = document.querySelector(selector);
        // 使用選擇器精準撈取網頁中的實體 DOM 容器，並存入區域常數 targetElement 之中

        if (!targetElement) return;
        // 安全檢查：如果在網頁 HTML 中找不到對應的容器（例如該頁面被刪除），則直接跳過此輪迴圈，不往下執行

        // 智慧判定：檢查這個 content-box 裡面是否「已經有」產生好的影片標籤了？
        // 單行註解：說明下方的判定是用來區分網頁「初次骨架建構」與「後續切換語系」的情境

        const scrollBoxVideo = targetElement.querySelector('video');
        // 在目前的 targetElement 容器內部搜尋是否已經存在原生 `<video>` 標籤，並將結果存入常數 scrollBoxVideo 之中

        if (!scrollBoxVideo) {
            // 條件判斷：如果畫面上還找不到 `<video>` 標籤，代表網頁是第一次載入，需要進行完整結構建立

            // ===【首次載入網頁】===
            // 單行註解：標示此分支負責首次打開網頁時的 HTML 代碼組合與動態注入

            const videoHtml = `
                <h2 class="game-title game-video-title">${videoData.title}</h2>
                ${videoData.src ? `
                    <div class="video-wrapper">
                        <video src="${videoData.src}" controls controlsList="nofullscreen" disablePictureInPicture preload="none" playsinline class="game-video"></video>
                    </div>
                ` : ''}
            `;
            // 使用樣板字串編織 HTML 骨架：填入帶有特殊類別的次級標題 `<h2>`，並使用三元運算子判斷若影片路徑存在，則外包一層 `.video-wrapper` 容器並注入內含控制面板、關閉預先下載（preload="none"）與行動端內嵌播放參數（playsinline）的原生 `<video>` 標籤；若無路徑則輸出空字串

            targetElement.innerHTML = videoHtml;
            // 透過 innerHTML 將組合好的 HTML 字串一次性寫入目標實體容器 targetElement 中

            // 完美保留：滾動交叉監測器（IntersectionObserver）
            // 單行註解：說明接下來要為剛注入的影片綁定網頁滾動進入可視區域時的監測邏輯

            const video = targetElement.querySelector('video');
            // 在剛注入結構的容器中撈出 `<video>` 標籤實體，並存入區域常數 video

            if (video && 'IntersectionObserver' in window) {
                // 安全檢查：確認影片元素存在，且目前使用者的瀏覽器支援原生的 IntersectionObserver 監測器API

                const videoObserver = new IntersectionObserver((entries) => {
                    // 實例化（New）一個滾動交叉監測器，並定義可視狀態改變時的回呼函式

                    entries.forEach(entry => {
                        // 遍歷所有被監控節點的交叉狀態記錄（entries）

                        if (entry.isIntersecting) {
                            video.load();
                            video.currentTime = 0;
                            video.pause();
                        } else {
                            video.pause();
                        }
                        // 條件判斷：若影片區塊滾動進入（Intersecting）螢幕可視範圍，則觸發 video.load() 重新載入元資料、將播放進度時間強制歸零（currentTime = 0）並維持暫停狀態（目的是讓影片封面第一幀流暢亮起）；若影片滾出可視範圍之外，則強制執行 video.pause() 暫停播放，防止幕後隱形放音消耗系統效能
                    });
                    // 結束狀態記錄陣列的遍歷迴圈
                }, { threshold: 0.1 });
                // 結束監測器回呼函式的定義，並設定當目標元素露出面積超過 10%（threshold: 0.1）時即觸發交叉感應

                videoObserver.observe(targetElement);
                // 啟動監測器，強迫瀏覽器開始追蹤 targetElement 容器與視窗邊界的交叉滾動狀態
            }
            // 結束監測器存在性與相容性的條件區塊
        } else {
            // 否則（意即 scrollBoxVideo 存在，代表影片骨架早就在畫面上，此時使用者是在最上方點擊切換語言）

            // ===【非首次載入（點擊切換語言時）】===
            // ⚡ 結構與影片完全鎖定在原地！100% 絕對不重新載入、音樂不中斷、進度不消失
            // 以上兩行為單行註解：說明在多國語言切換時採取的「結構鎖定」優化，保障使用者在看影片或播音樂時的體驗不被打斷

            const titleEl = targetElement.querySelector('.game-video-title');
            // 在已存在的容器中，精準搜尋出 class 為 '.game-video-title' 的標題元素，並存入常數 titleEl 當中

            if (titleEl) {
                titleEl.textContent = videoData.title;
            }
            // 安全檢查：如果標題元素存在，則直接使用高效率的 textContent 屬性將其替換為最新語系的大標題文字，而下方的影片節點則完全不動
        }
        // 結束首次與非首次載入的條件分支判定
    });
    // 結束 demoConfigs 陣列的 entries 遍歷迴圈處理
}
// 結束 renderGameDemoVideos 函式的定義


///**
// * 7. 遊戲載入器 (自動載入版本)
// * 同時處理 sec5 與 sec6，直接將 config 內的遊戲路徑嵌入容器
// */
//function initGameLoader() {
//    // 處理第一個遊戲 (sec5)
//    const frame5 = document.getElementById('game-frame-5');
//    // 確保這裡抓的是 config.gameDownloads[0].fileUrl
//    const data5 = config.gameDownloads && config.gameDownloads[0];
//    if (frame5 && data5) {
//        frame5.src = data5.fileUrl; 
//        console.log("Section 5 載入路徑為:", data5.fileUrl);
//    }

//    // 處理第一個遊戲 (sec7)
//    const frame6 = document.getElementById('game-frame-6');
//    const data6 = config.gameDownloads && config.gameDownloads[1];
//    if (frame6 && data6) {
//        frame6.src = data6.fileUrl;
//        console.log("Section 6 載入路徑為:", data6.fileUrl);
//    }
//}



///**
// * 通用啟動邏輯
// * @param {HTMLElement} btn - 按鈕物件
// * @param {Object} data - 從 config 傳入的該筆遊戲資料
// * @param {Number} id - 對應的區塊 ID
// */
//function setupGameLaunch(btn, data, id) {
//    btn.innerText = data.btnText;

//    btn.onclick = (e) => {
//        e.preventDefault();
//        if (btn.dataset.isLoading === "true") return;
//        btn.dataset.isLoading = "true";

//        let progress = 0;
//        const timer = setInterval(() => {
//            progress += Math.floor(Math.random() * 10) + 5;

//            if (progress >= 100) {
//                clearInterval(timer);

//                const overlay = document.getElementById(`game-overlay-${id}`);
//                const frame = document.getElementById(`game-frame-${id}`);

//                // --- 關鍵修改：從 config 資料中提取路徑 ---
//                frame.src = data.fileUrl;
//                overlay.style.display = 'flex';

//                // 重置按鈕
//                setTimeout(() => {
//                    btn.dataset.isLoading = "false";
//                    btn.innerText = data.btnText;
//                    btn.style.backgroundImage = "none";
//                    btn.style.backgroundColor = "#68BFFF";
//                }, 1000);
//            } else {
//                btn.innerText = `${data.loadingText} ${progress}%`;
//                btn.style.backgroundImage = `linear-gradient(90deg, #68BFFF ${progress}%, #444 ${progress}%)`;
//            }
//        }, 80);
//    };
//}


///**
// * 關閉遊戲視窗
// * @param {Number} id - 對應的區塊 ID
// */
//function closeGame(id) {
//    const overlay = document.getElementById(`game-overlay-${id}`);
//    const frame = document.getElementById(`game-frame-${id}`);

//    if (overlay && frame) {
//        overlay.style.display = 'none';
//        frame.src = ''; // 清空路徑以停止遊戲運行與聲音
//    }
//}

//// 確保 initGameLoader 有正確綁定按鈕
//// 檢查你的 script.js 中 setupGameLaunch 是否正常運作






/**
 * 8. 初始化跑馬燈內容（安全相容垂直直書版）
 */
function initMarquee() {
    const content = document.getElementById('marquee-content'); // 從網頁 DOM 當中選取 ID 為 'marquee-content' 的跑馬燈主文字容器，並存入區域常數 content 之中
    const clone = document.getElementById('marquee-content-clone'); // 從網頁 DOM 當中選取 ID 為 'marquee-content-clone' 的跑馬燈鏡像文字容器，並存入區域常數 clone 之中

    if (!content || !clone) return; // 安全檢查：若網頁中找不到主文字容器或鏡像文字容器，則立刻中斷執行，防止後續填入文字時發生系統當機

    const txt = config.marqueeText + "　"; // 讀取全域設定檔中的跑馬燈文字，並在尾端連接一個全形空格，用來作為重複字串時的字距安全間隔，並存入常數 txt
    const fullTxt = txt.repeat(10); // 使用原生的 repeat(10) 方法，將字串複製並拼接 10 次，產生一串超長字串以填滿超寬螢幕，並存入常數 fullTxt

    content.innerHTML = fullTxt; // 終極修復點：強制還原為 innerHTML，藉由觸發瀏覽器 HTML 解析引擎來啟動英文直書字元寬度計算，100% 找回跑馬燈字體
    clone.innerHTML = fullTxt; // 終極修復點：強制還原為 innerHTML，同步啟動鏡像文字的英文字元寬度計算，確保無縫循環滾動時字體完美亮起
}


/**
 * 9. 核心互動邏輯 (全平台相容最終極致版 - ⚡ 徹底釋放 iOS 媒體通道)
 * 修正：將所有 e.target 與 closest 判定嚴格鎖定在「非觸控桌機版」內部！
 * 移動端 100% 走純淨原生通道，徹底解決 iOS 成功版本突然又被 JS 攔截器誤殺而無法播放的痛點
 */
// 以上為區塊註解：說明此函式為第九個功能模組「核心互動邏輯」，主要用途是透過「環境特徵嗅探」將桌機滾輪切頁與行動端原生滾動徹底隔離，保護行動裝置（尤其是 iOS Safari）上的音訊播放憑證不受 JS 全域攔截干擾

function setupCoreLogic() {
    // 定義一個名為 setupCoreLogic 的功能函數，負責全站的畫面滾動聯動、導覽列高亮切換與背景亮度控制

    const bg = document.getElementById('bg');
    // 從網頁 DOM 當中選取 ID 為 'bg' 的大背景元素，並存入區域常數 bg

    // const bar = document.getElementById('marquee-bar');
    // 從網頁 DOM 當中選取 ID 為 'marquee-bar' 的跑馬燈橫條元素，並存入區域常數 bar（此常數目前在此片段中尚未被後續讀取）

    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    // 將 querySelectorAll 搜出來的所有導覽項目節點清單（NodeList）轉換為真正的 JavaScript 標準陣列，並存入常數 navItems

    const sections = Array.from(document.querySelectorAll('section'));
    // 將 querySelectorAll 搜出來的所有 <section> 區塊網頁節點清單轉換為標準陣列，並存入常數 sections

    // --- A. 建立區塊進入觀察器 ---
    // 單行註解：標示以下為第一個子功能，利用 IntersectionObserver 追蹤使用者目前滾動到哪一頁

    const observer = new IntersectionObserver((entries) => {
        // 實例化（New）一個網頁可視區域交叉監測器，並定義當區塊進出畫面時的非同步回呼函式

        entries.forEach(({ target: t, isIntersecting: isVisible }) => {
            // 使用 forEach 遍歷監測記錄，並透過物件解構賦值，將 target 命名為 t，isIntersecting 命名為 isVisible

            const box = t.querySelector('.content-box');
            // 在當前變動的區塊 t 內部搜尋 class 為 '.content-box' 的文字內容容器，並存入區域常數 box

            if (box) box.classList.toggle('reveal', isVisible);
            // 如果內容容器存在，使用 classList.toggle 根據區塊是否可見（isVisible）來動態切換（加上或移除）'.reveal' 進場動畫類別

            if (isVisible) {
                // 如果該區塊目前滾動進入了螢幕中央（isVisible 為 true）

                const currentSectionIndex = sections.indexOf(t);
                // 計算並宣告常數 currentSectionIndex，找出當前可見區塊 t 在 sections 全站區塊陣列中的索引位置（例如第 0 頁或第 1 頁）

                navItems.forEach((item, index) => {
                    item.classList.toggle('active', index === currentSectionIndex);
                });
                // 遍歷所有導覽列按鈕：若按鈕的索引值剛好等於當前可見頁面的索引值，就為其加上 'active' 高亮類別，其餘按鈕則徹底移除（達到導覽列跟隨滾動亮燈的效果）

                if (bg) {
                    bg.style.filter = `brightness(${t.id === 'sec0' ? 0.8 : 0.3})`;
                }
                // 如果大背景元素存在，利用三元運算子調整其 CSS 濾鏡亮度（filter: brightness）：若目前在首頁 'sec0' 則給予較亮的 0.8（80%），若是其他內容頁則自動壓暗至 0.3（30%）以利閱讀
            }
            // 結束可見狀態下的聯動更新
        });
        // 結束監測記錄陣列的遍歷
    }, { threshold: 0.4 });
    // 結束監測器回呼函式的定義，並設定當區塊露出面積超過 40%（threshold: 0.4）時，即判定為使用者正在瀏覽該頁

    sections.forEach(sec => observer.observe(sec));
    // 使用迴圈將網頁中所有的 section 區塊全部註冊進監測器中，正式啟動追蹤

    // --- B. 全域捲動進度監聽 ---
    // 單行註解：標示以下為第二個子功能，負責動態計算網頁的滾動百分比

    const scrollContainer = document.body;
    // 宣告區域常數 scrollContainer 指向網頁的 document.body（以此作為全站捲軸的容器主體）

    scrollContainer.addEventListener('scroll', () => {
        // 為 scrollContainer 綁定一個原生的 'scroll'（滾動）事件監聽器

        const top = scrollContainer.scrollTop || document.documentElement.scrollTop;
        // 讀取當前的滾動軸高度，並做全瀏覽器相容性防禦：優先拿 body 的 scrollTop，若為 0 則拿 <html> 的 scrollTop，並存入常數 top

        const height = scrollContainer.scrollHeight - window.innerHeight;
        // 計算網頁「扣除掉目前瀏覽器視窗高度後」的實質可滾動總長度，並存入常數 height

        const indicator = document.getElementById('marquee-indicator');
        // 從網頁中撈出負責指示跑馬燈進度的標籤元素，並存入區域常數 indicator

        if (indicator && height > 0) {
            // 安全檢查：若進度指示器存在，且網頁確實具有可滾動的高度（height 大於 0）

            const progress = top / height;
            // 計算目前捲動的百分比比例值（目前高度除以總長度，範圍在 0 到 1 之間），存入常數 progress

            const maxMove = window.innerHeight - 60;
            // 計算進度條在畫面上所能移動的最大物理像素長度（視窗高度扣除 60 像素的邊距），存入常數 maxMove

            const moveAmount = maxMove * progress;
            // 將最大移動長度乘以目前的滾動比例，計算出當前指示器該位移的實質像素值，存入常數 moveAmount

            indicator.style.transform = `translateY(${moveAmount}px)`;
            // 透過 CSS 的 transform 屬性，動態對指示器施加正向的 Y 軸位移（translateY），讓進度條隨著網頁向下滑動而跟著向下走
        }
        // 結束進度條控制的條件區塊
    });
    // 結束滾動進度監聽器的定義

    // --- C. 全平台完美相容切頁控制（⚡ 媒體通道完全隔離保護機制） ---
    // 💡 判定當前裝置是否為「觸控行動端」（手機、平板、特別是 iOS）
    // 以上兩行為單行註解：說明接下來要透過環境特徵來嗅探使用者的設備，執行跨平台策略分流

    const isMobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // 透過檢查 window 中是否存在觸控事件、或者多點觸控點數大於 0，來精準判定是否為手機/平板行動端設備，並將布林值存入常數 isMobileDevice

    if (!isMobileDevice) {
        // 條件分支：如果判定結果為 false（代表使用者使用的是傳統的桌上型電腦或筆記型電腦）

        // ===【僅在桌機版啟動】===
        // 只有傳統桌機環境，才會執行下方的強制滑鼠滾輪鎖定與全螢幕單頁切換邏輯
        // 以上兩行為單行註解：說明以下代碼是專門為桌機版量身打造的單頁式（Page-by-Page）滾動切換核心

        let isScrollLocked = false;
        // 宣告一個區域變數 isScrollLocked 用來鎖定滾輪，預設為 false（不鎖定）

        const scrollCooldown = 800;
        // 宣告一個區域常數 scrollCooldown 設定防連滾的冷卻時間為 800 毫秒（0.8 秒）

        scrollContainer.addEventListener('wheel', (e) => {
            // 為桌機環境的 scrollContainer 綁定一個滑鼠滾輪（wheel）事件監聽器

            if (isScrollLocked) return;
            // 滾輪冷卻鎖：如果目前滾輪處於鎖定狀態（isScrollLocked 為 true），則直接中斷執行並攔截動作

            // ⚡ 智慧安全隔離：把 closest 判定死死關在「滑鼠桌機版」的環境裡
            // 這樣 iPhone 在點擊播放時，全域就完全沒有任何 e.target 判定在跑，100% 釋放 iOS 媒體信任憑證！
            // 以上兩行為單行註解：技術備忘錄，強調此處將 closest 阻斷器死鎖在非觸控環境下，是為了避免 iOS 發生全域事件攔截導致播放器失效的災情

            const isInsidePodcastScroll = e.target.closest('.podcast-scroll-box');
            // 智慧判定：檢查使用者滾動滑鼠的位置，其 DOM 樹向上追溯是否位於 Podcast 滾動盒子（.podcast-scroll-box）內部

            if (isInsidePodcastScroll) return;
            // 如果使用者滑鼠正停留在 Podcast 列表內滾動，則直接中斷此處的整頁切換邏輯，將滾動權限還給列表內部，讓清單可以正常上下捲動

            // 桌機空白處一滑就切門檻
            // 單行註解：說明滑鼠滾輪的力道門檻判定

            if (Math.abs(e.deltaY) > 5) {
                // 判斷滾輪的垂直滾動絕對值力道（e.deltaY）是否大於 5

                e.preventDefault();
                // 門檻通過，立刻調用 e.preventDefault() 阻斷瀏覽器原生的網頁自由滾動行為，改由下方 JS 進行精準接管

                const activeNav = document.querySelector('.nav-item.active');
                // 抓取目前畫面上帶有高亮狀態的導覽按鈕元素，並存入區域常數 activeNav

                const currentIndex = activeNav ? navItems.indexOf(activeNav) : 0;
                // 使用三元運算子判斷：若有找到高亮按鈕，就查出它在導覽陣列中的索引序號，否則預設為第 0 頁

                let targetIndex = currentIndex;
                // 宣告一個可變變數 targetIndex 來記錄接下來準備跳轉的目標頁面索引，預設與目前相同

                if (e.deltaY > 0) {
                    targetIndex = currentIndex + 1;
                } else {
                    targetIndex = currentIndex - 1;
                }
                // 滾輪方向判定：若滾輪向下（deltaY 大於 0）則目標頁面加 1，若滾輪向上則目標頁面減 1

                if (targetIndex >= 0 && targetIndex < sections.length) {
                    // 安全檢查：確保計算出來的目標頁面索引，沒有超出全站區塊的合法範圍（不小於 0 且小於總區塊數）

                    isScrollLocked = true;
                    // 通過檢查，立刻將滾輪安全鎖設為 true，鎖定滾輪防止使用者連續滾動導致畫面瘋狂跳頁

                    const targetTop = sections[targetIndex].offsetTop;
                    // 獲取目標區塊距離網頁最頂端的物理垂直高度像素值，並指派給常數 targetTop

                    scrollContainer.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                    // 呼叫 scrollTo 方法，控制全網頁視窗以平滑的動畫曲線（behavior: 'smooth'）精準對齊並滾動到該目標區塊高度

                    setTimeout(() => { isScrollLocked = false; }, scrollCooldown);
                    // 註冊一個非同步計時器，在 800 毫秒（0.8 秒）後自動將 isScrollLocked 重新解鎖為 false，恢復桌機版滾輪切頁功能
                }
                // 結束目標索引合法性的安全區塊
            }
            // 結束滾輪力道門檻的判斷區塊
        }, { passive: false });
        // 結束 wheel 事件監聽器的定義，並明確設定 passive: false，這樣瀏覽器才允許 e.preventDefault() 成功阻斷原生滾動
    } else {
        // 否則（意即 isMobileDevice 為 true，代表使用者目前使用的是 iPhone、Android 手機或平板電腦等行動觸控裝置）

        // ===【在行動端（iOS / Android）】===
        // ⚡ 100% 保持完全空白！絕對不夾雜任何一丁點 touch 或冒泡事件監聽！
        // 這樣能將 iPhone 的所有觸控焦點、事件派發完整還給原生的 CSS 滿版吸附與你的 Podcast 播放器
        // 確保你剛剛好不容易測試成功的那個音檔預載函數，在 iOS 上再次無痕完美出聲！
        // 以上四行為整段單行註解：這是專案在架構分流上的核心防禦哲學，在行動觸控端完全不做任何事件監聽與攔截，將控制權 100% 還給系統原生通道與 CSS
    }
    // 結束跨平台環境嗅探的分流處理

    // --- D. 初始化狀態校正 ---
    // 單行註解：標示以下為第四個子功能，負責網頁一開局時的進度校正

    scrollContainer.dispatchEvent(new Event('scroll'));
    // 主動在 scrollContainer 上人工觸發（Dispatch）一個全新的滾動事件，強迫上面的進度條監聽器在開局 0 秒時立刻執行一次計算，讓網頁剛載入時進度條就能完美歸位
}
// 結束 setupCoreLogic 函式的定義

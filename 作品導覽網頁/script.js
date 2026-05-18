/**
       * 【 1. 自定義內容編輯區 】
       * 修改此處即可更換全站所有文字、路徑與連結
       */
// 以上為區塊註解：說明以下為使用者自定義內容的編輯區域，通常用來提示開發者可以在此集中管理文字和路徑


/* ============================================================
【 網頁核心運作邏輯 - 完整逐行註解版 】
============================================================ */
// 以上為區塊註解：大區塊分隔線與標題，明確標示從此處開始進入「網頁核心運作邏輯」的程式碼實作
// // ==========================================
// // 獨立不休眠按鈕 - 全環境相容與硬體常亮終極完全體防線
// // ==========================================
// (function () {
//     const lockBtn = document.getElementById('wakeLockBtn');
//     if (!lockBtn) return;

//     // 確保保留文字標籤偵測，杜絕 ReferenceError 錯誤
//     const textSpan = lockBtn.querySelector('.wakelock-text');

//     // 完美對齊 LangManager 架構：將所有狀態鎖、冷卻判定與指標直接內建在控制物件中
//     const WakeLockCtrl = {
//         isCooling: false,     // 設定是否處於連點冷卻時間，預設為 false（不冷卻）
//         _isActiveMode: false, // 全獨立記憶體狀態鎖：100% 杜絕外觀文字被外部重置或洗掉
//         _loopId: null,        // 用來保存高頻重繪計時器的內部指針
//         _togglePulse: false,  // 狀態擺幅旗標

//         // 【硬體核心指針】
//         _wakeLockObj: null,   // 用於保存 Screen Wake Lock API 實例
//         _videoEl: null,       // 用於保存 HTML5 隱藏影片實例（環境相容防線）

//         updateText() {
//             if (!textSpan) return;

//             const txtOn = config.wakeLockOn || "";
//             const txtOff = config.wakeLockOff || "";

//             if (WakeLockCtrl._isActiveMode) {
//                 textSpan.textContent = txtOff;
//                 lockBtn.classList.add('active');
//             } else {
//                 textSpan.textContent = txtOn;
//                 lockBtn.classList.remove('active');
//             }
//         }, // 👈 這裡已補上關鍵逗號

//         // 助手 A：發動不休眠狀態與硬體重繪保活（放回獨立防休眠按鈕中）
//         async request() {
//             WakeLockCtrl._isActiveMode = true;
//             WakeLockCtrl.updateText(); // 0秒光速變換畫面外觀

//             // ─── 🌟 完美歸位：將您這段 8 秒無聲短音保活綁定在防休眠鈕中 ───
//             if (!WakeLockCtrl._shadowAudio) {
//                 WakeLockCtrl._shadowAudio = new Audio();
//                 WakeLockCtrl._shadowAudio.loop = false; // 嚴禁開啟 loop，這是隱藏黑底的死命令
//                 // 您提供的真實 0.1 秒無聲 MP3 Base64 數據
//                 WakeLockCtrl._shadowAudio.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGFtZTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVf/M0MUAAAA00HAwAAIdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
//             }

//             // 點擊當下先偷放第一次，解鎖權限
//             WakeLockCtrl._shadowAudio.play().catch(() => { });

//             // 每 8 秒在背景悄悄重播一次，用非串流機制硬咬住 iOS 顯示晶片不休眠
//             if (!WakeLockCtrl._audioTimerId) {
//                 WakeLockCtrl._audioTimerId = setInterval(() => {
//                     if (WakeLockCtrl._shadowAudio) {
//                         WakeLockCtrl._shadowAudio.currentTime = 0; // 進度光速歸零
//                         WakeLockCtrl._shadowAudio.play().catch(() => { }); // 觸發無感保活
//                     }
//                 }, 8000);
//             }
//             console.log("[WakeLock] 獨立防休眠鈕已啟動背景非串流保活，100% 屏蔽系統黑底");
//         }, // 👈 這裡已補上關鍵逗號

//         // 助手 B：手動解除，回復預設樣式
//         release() {
//             WakeLockCtrl._isActiveMode = false;

//             // 清除定時器並掐斷保活音軌
//             if (WakeLockCtrl._audioTimerId) {
//                 clearInterval(WakeLockCtrl._audioTimerId);
//                 WakeLockCtrl._audioTimerId = null;
//             }
//             if (WakeLockCtrl._shadowAudio) {
//                 WakeLockCtrl._shadowAudio.pause();
//                 WakeLockCtrl._shadowAudio = null;
//             }

//             WakeLockCtrl.updateText();
//             console.log("[WakeLock] 獨立防休眠狀態已手動解除，硬體安全歸位");
//         }
//     }; // 👈 完美閉合物件結構

//     // 🎯 監聽一：使用者親手點擊按鈕（完美對齊 LangManager 防連點與淡化邏輯）
//     lockBtn.onclick = () => {
//         if (WakeLockCtrl.isCooling) return;
//         WakeLockCtrl.isCooling = true;
//         lockBtn.style.opacity = "0.6"; // 點擊瞬間 1秒微暗淡反饋

//         if (!WakeLockCtrl._isActiveMode) {
//             WakeLockCtrl.request();
//         } else {
//             WakeLockCtrl.release();
//         }

//         // 終極修正時序鏈：設定 1000 毫秒後自動將狀態解除
//         setTimeout(() => {
//             WakeLockCtrl.isCooling = false; // 解除安全鎖
//             lockBtn.style.opacity = "1";    // 恢復按鈕 100% 原始亮度

//             // 在不透明度亮回 1、iOS 渲染核心塵埃落定的這一微秒，才由 updateText 執行外觀類別清洗與文字更換
//             WakeLockCtrl.updateText();
//         }, 1000);
//     };

//     // 🎯 監聽二：網頁切換分頁歸隊自動校對（修復切換頁面彈回原狀 Bug）
//     document.addEventListener('visibilitychange', async () => {
//         if (document.visibilityState === 'visible') {
//             if (WakeLockCtrl._isActiveMode) {
//                 WakeLockCtrl._audioTimerId = null; // 強制洗牌定時器指標
//                 await WakeLockCtrl.request();      // 醒來瞬間，在背景悄悄重啟 8 秒保活鎖，常亮絕不中斷
//             } else {
//                 WakeLockCtrl.updateText();
//             }
//         }
//     });

//     // 網頁開局初次點火文字指派
//     WakeLockCtrl.updateText();

//     // 將更新函數與控制主體掛載到全域，方便您的 LangManager 在變更語系或外部驗證時一併呼叫
//     window.WakeLockCtrl = WakeLockCtrl;
//     window.updateWakeLockBtnLang = () => WakeLockCtrl.updateText();
// })();

// ==========================================
// 戰略性精準圖片預熱
// ==========================================

// 1. 預熱遊戲介紹區塊兩張作品 LOGO 小圖

const imgCache1 = new Image(); // 建立圖片物件一

const imgCache2 = new Image(); // 建立圖片物件二

if (config.gameIntroSubImg1) imgCache1.src = config.gameIntroSubImg1; // 有圖一路徑則下載

if (config.gameIntroSubImg2) imgCache2.src = config.gameIntroSubImg2; // 有圖二路徑則下載

// ==========================================
// 全角色核心大立繪全自動編碼缺陷攔截與強行預存鎖
// ==========================================
window.addEventListener('load', () => { // 網頁載入完成後執行
    setTimeout(() => { // 延遲300毫秒避開開局塞車
        if (config && Array.isArray(config.chars)) { // 檢查設定檔與角色資料是否存在
            config.chars.forEach((char) => { // 輪詢所有角色資料
                if (char.m) { // 檢查是否有立繪路徑
                    const imgCache = new Image(); // 建立圖片物件

                    imgCache.onload = () => { // 監聽圖片成功下載至瀏覽器快取事件
                        imgCache.onload = null; // 💡 修正關鍵：下載完成後立刻將事件解綁，100% 釋放記憶體參照防止 iOS 記憶體洩漏
                    };

                    imgCache.onerror = () => { // 監聽圖片下載失敗異常事件
                        imgCache.onerror = null; // 失敗時同步解綁事件避免舊物件卡在記憶體中
                    };

                    imgCache.src = char.m; // 賦值路徑觸發瀏覽器背景快取下載
                }
            });
        }
    }, 300);
});


// ==========================================
// 關鍵新增：預熱全站導覽列的所有 Icon 圖示
// ==========================================
if (config.nav && config.nav.length > 0) { // 檢查導覽列資料是否存在且不為空
    config.nav.forEach(item => { // 輪詢導覽列各個項目
        if (item.icon) { // 檢查項目是否有圖示路徑
            const navIconCache = new Image(); // 建立圖片物件
            navIconCache.src = item.icon; // 指派路徑觸發下載
        }
    });
}

// ❌ 依然維持最高防禦：絕對不要在這裡預熱角色立繪、大圖或 Podcast 音檔，確保大背景圖享有最高載入優先權！
// 單行註解：開發效能備忘提示，強調為了讓網頁的主背景圖能以最快速度渲染出來，必須嚴格禁止在此階段預載大容量的資源（如立繪、高解析度圖片與音訊檔）


/**
 * 1. 初始化進入點
 */
let isFirstLoad = true; // 記錄網頁是否為第一次載入

function runAllRenderModules() { // 全域中央渲染調调度器
    [
        renderNav,
        /*renderStaff,*/
        renderStaticContent,
        renderGameDemoVideos, // 負責展示影片與標題注入
        initMarquee
    ].forEach(fn => { // 遍歷渲染函式陣列
        if (typeof fn === 'function') fn(); // 檢查為函式則立即執行
    });

    if (typeof renderChar === 'function' && config.chars?.length) { // 檢查角色渲染函式與資料是否存在
        renderChar(0); // 預設渲染第一個角色的文字
    }
}

if (typeof renderPodcastList === 'function') { // 檢查 Podcast 渲染函式是否存在
    renderPodcastList(); // 執行並重繪 Podcast 列表文字
}

const btn = document.getElementById('langToggleBtn'); // 取得語系切換按鈕元素
if (btn && window.LangManager) { // 檢查按鈕與語系管理器是否存在
    btn.innerText = window.LangManager.current === 'zh' ? 'EN' : '繁中'; // 依目前語系切換按鈕文字
}

if (isFirstLoad) { // 檢查是否為第一次載入
    requestAnimationFrame(() => { // 註冊第一層動畫影格
        requestAnimationFrame(() => { // 註冊第二層動畫影格確保排版穩定
            window.scrollTo(0, 0); // 強制將視窗捲動至最頂端

            const firstSection = document.getElementById('sec0'); // 取得首頁區塊元素
            if (firstSection) { // 檢查首頁區塊是否存在
                firstSection.scrollIntoView({ block: 'start', inline: 'nearest' }); // 強制將該區塊對齊視窗頂端
            }

            isFirstLoad = false; // 關閉首次載入狀態旗標
        });
    });
}

document.addEventListener('DOMContentLoaded', () => { // 網頁 HTML 結構解析完畢後執行
    if (window.location.hash) { // 檢查當前網址是否帶有錨點
        history.replaceState("", document.title, window.location.pathname + window.location.search); // 清除網址尾端錨點而不重刷網頁
    }

    runAllRenderModules(); // 呼叫執行中央渲染調度器

    function initNavToggleLogic() {
        const navContainer = document.getElementById('nav-container'); // 取得導覽列大容器元素
        const logoBtn = document.getElementById('logoBtn'); // 取得 LOGO 按鈕元素
        // const navList = document.getElementById('navList');

        if (!navContainer) return; // 檢查導覽列容器是否存在，否則中斷執行

        const closeMenu = () => { // 定義關閉選單的公用函式
            navContainer.classList.remove('nav-open'); // 移除開啟狀態類別以閉合選單
        };

        if (logoBtn) { // 檢查 LOGO 按鈕是否存在
            logoBtn.addEventListener('click', (e) => { // 註冊點擊事件監聽器
                e.stopPropagation(); // 阻止事件冒泡避免觸發全域關閉邏輯
                navContainer.classList.toggle('nav-open'); // 切換導覽列的開啟與關閉狀態
            });
        }
        if (navList) { // 檢查導覽項目清單元素是否存在
            const handleItemClick = (e) => { // 定義點擊項目的事件處理函式
                if (e.target.closest('.nav-item') || e.target.closest('li') || e.target.closest('a')) { // 檢查觸碰目標是否為選單項目相關標籤
                    closeMenu(); // 執行收回選單函式
                }
            };

            navList.addEventListener('click', handleItemClick); // 註冊點擊事件監聽器

            navList.addEventListener('touchstart', handleItemClick, { passive: true }); // 註冊觸控開始事件監聽器並啟用被動監聽
        }

        const closeMenuHandler = (e) => { // 定義點擊外部的事件處理函式
            if (!navContainer.contains(e.target) && (!logoBtn || !logoBtn.contains(e.target))) { // 檢查點擊目標是否在選單與 LOGO 之外
                navContainer.classList.remove('nav-open'); // 移除開啟狀態類別以關閉選單
            }
        };

        window.addEventListener('click', closeMenuHandler); // 註冊全域點擊事件監聽器

        window.addEventListener('touchstart', closeMenuHandler, { passive: true }); // 註冊全域觸控開始事件監聽器並啟用被動監聽
    }

    initNavToggleLogic(); // 執行導覽列事件綁定邏輯

    if (typeof setupCoreLogic === 'function') setupCoreLogic(); // 檢查核心邏輯函式是否存在則立即執行
    // if (typeof initGameLoader === 'function') initGameLoader();
});

window.addEventListener('languageChanged', () => { // 監聽語系改變事件
    runAllRenderModules(); // 重新渲染全站所有文字模組
});

document.addEventListener('play', (event) => { // 監聽全網頁多媒體播放事件
    const triggeredElement = event.target; // 取得當前播放的影音元素
    if (triggeredElement.tagName === 'VIDEO' || !triggeredElement.id.startsWith('native-audio-')) { // 檢查是否為影片或非專案音訊

        console.log("[Audio Core] 偵測到外來影片或音軌正在奪取播放霸權，發動強行攔截暫停");

        document.querySelectorAll('audio[id^="native-audio-"]').forEach((audio, idx) => { // 遍歷所有專案音訊節點
            if (!audio.paused) { // 檢查音訊是否正在播放
                audio.pause(); // 暫停該音訊

                const btn = document.getElementById(`play-btn-${idx}`); // 取得對應的播放按鈕元素
                if (btn) { // 檢查按鈕是否存在
                    const iconImg = btn.querySelector('.player-icon-img'); // 取得按鈕內的圖示元素
                    const pImg = config.playIcon || "./icon/play.png"; // 取得播放圖示路徑

                    if (iconImg) iconImg.src = pImg; // 將圖示換回播放狀態
                    btn.classList.remove('is-playing', 'is-loading'); // 移除播放與載入狀態類別
                    btn.classList.add('is-paused'); // 新增暫停狀態類別
                }
            }
        });
    }
}, true); 


// ===【完整導覽列控制鏈：renderNav 函式定義】===
function renderNav() {
    const navList = document.getElementById('navList'); // 取得導覽清單容器元素
    if (!navList || !config.nav) return; // 檢查容器與設定檔是否存在則否則中斷

    const existingItems = navList.querySelectorAll('.nav-item'); // 取得畫面上現有的導覽項目

    if (existingItems.length === 0) { // 檢查是否為首次載入
        navList.innerHTML = config.nav.map((item, i) => `
            <a class="nav-item" href="#sec${i}">
                <div class="nav-icon"><img src="${item.icon}" alt="icon"></div>
                <span class="nav-text">${item.name}</span>
            </a>
        `).join(''); // 生成並注入全新導覽列結構

        navList.querySelectorAll('.nav-item').forEach((btn, i) => { // 遍歷新生成的導覽項目
            btn.onclick = (e) => { // 綁定點擊事件
                e.preventDefault(); // 阻止原生滾動跳轉行為

                if (btn.classList.contains('active')) return; // 若已處於目前分頁則攔截不執行

                if (navList.dataset.isMenuCooling === "true") return; // 選單動畫冷卻中則攔截

                if (navList.dataset.isCooling === "true") return; // 頁面平移冷卻中則攔截

                navList.dataset.isCooling = "true"; // 啟用全域頁面平移冷卻鎖

                navList.dataset.isMenuCooling = "true"; // 啟用選單動畫冷卻鎖

                if (document.activeElement) { // 檢查是否有聚焦元素
                    document.activeElement.blur(); // 強制移除焦點避免事件劫持
                }

                const targetSec = document.getElementById(`sec${i}`); // 取得目標區塊元素
                if (targetSec) { // 檢查目標區塊是否存在
                    targetSec.scrollIntoView({ behavior: 'instant', block: 'start' }); // 瞬間跳轉至該區塊
                }

                setTimeout(() => { // 建立單一五百毫秒定時器以同步所有重置與解鎖
                    document.querySelectorAll('[id^="sec"]').forEach(sec => sec.classList.remove('reveal')); // 移除所有區塊進場動畫
                    targetSec.classList.add('reveal'); // 為目標區塊加入進場動畫

                    const navContainer = document.getElementById('nav-container'); // 取得導覽列主容器元素
                    if (navContainer) { // 檢查導覽列主容器是否存在
                        navContainer.classList.remove('nav-open'); // 執行收回導覽選單縮放動作
                    }

                    navList.dataset.isCooling = "false"; // 解除頁面平移安全鎖
                    navList.dataset.isMenuCooling = "false"; // 解除導覽列選單冷卻鎖
                }, 500);
            };
        });

    } else { // 處理非首次載入語系切換邏輯
        const textElements = navList.querySelectorAll('.nav-text'); // 取得所有導覽文字元素

        config.nav.forEach((item, index) => { // 輪詢新語系設定檔
            if (textElements[index]) { // 檢查對應索引的文字元素是否存在
                textElements[index].textContent = item.name; // 僅更新文字內容不重構結構
            }
        });
    }
}


/**
 * 3. 靜態文字渲染 - 標題位置調換版
 */
function renderStaticContent() { // 定義靜態文字渲染函式
    const sec1Box = document.querySelector('#sec1 .content-box'); // 取得區塊一內容容器元素

    if (sec1Box) { // 檢查區塊一容器是否存在
        let h1 = sec1Box.querySelector('h1'); // 取得主標題元素
        let sub = sec1Box.querySelector('.sub-title'); // 取得副標題元素
        let p = sec1Box.querySelector('.p-text'); // 取得段落文字元素

        if (!h1 || !sub || !p) { // 檢查三個核心標籤是否有任一缺失
            if (!h1) { h1 = document.createElement('h1'); sec1Box.appendChild(h1); } // 補建並掛載主標題元素
            if (!sub) { sub = document.createElement('p'); sub.className = 'sub-title'; sec1Box.appendChild(sub); } // 補建並掛載副標題元素
            if (!p) { p = document.createElement('p'); p.className = 'p-text'; sec1Box.appendChild(p); } // 補建並掛載段落文字元素
        }

        if (h1) h1.textContent = config.introTitle; // 安全填入主標題純文字
        if (sub) sub.textContent = config.introSubtitle; // 安全填入副標題純文字
        if (p) p.textContent = config.introText; // 安全填入內文段落純文字

        if (h1) h1.textContent = config.introTitle; // 填入主標題純文字
        if (sub) sub.textContent = config.introSubtitle; // 填入副標題純文字
        if (p) p.textContent = config.introText; // 填入內文段落純文字
    }

    // === 區塊 3 ===
    const sec3Box = document.querySelector('#sec3 .content-box'); // 取得區塊三內容容器元素

    if (sec3Box) { // 檢查區塊三容器是否存在
        const hasImgWrap = sec3Box.querySelector('.sub-title-img-wrap'); // 檢查是否存在圖片包裝容器

        if (!hasImgWrap) { // 檢查若無圖片容器則進行初始化
            sec3Box.innerHTML = `
                ${(config.gameIntroSubImg1 || config.gameIntroSubImg2) ? `
                    <div class="sub-title-img-wrap">
                        ${config.gameIntroSubImg1 ? `<img class="sub-title-img" src="${config.gameIntroSubImg1}" alt="副標題1">` : ''}
                        ${config.gameIntroSubImg2 ? `<img class="sub-title-img" src="${config.gameIntroSubImg2}" alt="副標題2">` : ''}
                    </div>
                ` : ''}
                <h1></h1>
                <p class="p-text"></p>
            `; // 動態判斷並注入含有圖片、主標題與內文的 HTML 基礎骨架
        }

        const h1 = sec3Box.querySelector('h1'); // 取得主標題元素
        const p = sec3Box.querySelector('.p-text'); // 取得內文段落元素

        if (h1) h1.textContent = config.gameIntroTitle; // 填入遊戲介紹主標題純文字
        if (p) p.textContent = config.gameIntroText; // 填入遊戲介紹內文純文字
    }
}

/**
 * 5. 渲染 Podcast 節目清單
 */
function renderPodcastList() {
    const titleEl = document.getElementById('podcastSectionTitle'); // 取得 Podcast 大標題元素
    if (titleEl) { // 檢查大標題元素是否存在
        titleEl.textContent = config.podcastTitle || (window.lang && lang.podcastTitle) || 'Podcast 展示'; // 依語系字典更新大標題文字
    }

    requestAnimationFrame(() => { // 註冊第一層動畫影格
        requestAnimationFrame(() => { // 註冊第二層動畫影格確保排版就緒

            const container = document.getElementById('podcast-container'); // 取得清單外殼容器元素
            if (!container) return; // 檢查容器是否存在否則中斷執行

            container.style.height = "auto"; // 重設容器高度為自動撐開

            const currentDict = window.lang || config || (window.translations && window.translations[window.currentLang || 'zh']) || {}; // 鎖定目前就緒的多國語言字典物件
            const episodes = currentDict.podcastList || []; // 取得設定檔中的 Podcast 列表陣列

            const existingScrollBox = container.querySelector('.podcast-scroll-box'); // 檢查是否已存在滾動盒子元素

            if (!existingScrollBox) { // 檢查若無滾動盒子則執行首次載入結構注入
                let html = '<div class="podcast-scroll-box">'; // 初始化結構字串並加入外殼標籤
                const defaultPlayImg = config.playIcon || "./icon/play.png"; // 取得播放圖示路徑或備用路徑

                episodes.forEach((ep, i) => { // 遍歷 Podcast 節目列表陣列
                    const titleText = ep.title || ''; // 取得該集標題文字
                    const audioSrc = ep.audio || ''; // 取得該集音訊網址
                    const coverSrc = ep.cover || ''; // 取得該集封面圖片網址
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
                    `; // 拼接單個節目項目的 HTML 樣板結構
                });

                html += '</div>'; // 閉合滾動盒子外殼標籤
                container.innerHTML = html; // 將完整結構字串寫入外殼容器

                window.CustomPlayer = { // 在全域掛載播放器獨立控制庫
                    togglePlay(idx) { // 定義切換播放與暫停的方法
                        const audio = document.getElementById(`native-audio-${idx}`); // 取得對應音訊元素
                        const btn = document.getElementById(`play-btn-${idx}`); // 取得對應播放按鈕元素
                        if (!audio || !btn) return; // 檢查元素是否存在否則中斷執行

                        const iconImg = btn.querySelector('.player-icon-img'); // 取得按鈕內的圖示元素
                        const pImg = config.playIcon || "./icon/play.png"; // 取得播放圖示路徑
                        const sImg = config.pauseIcon || "./icon/pause.png"; // 取得暫停圖示路徑
                        const lImg = config.loadingIcon || ""; // 取得載入中圖示路徑

                        const handleTimeoutFallback = () => { // 定義清除定時器的備用函式
                            if (btn.dataset.timeoutId) { // 檢查是否存在定時器識別碼
                                clearTimeout(parseInt(btn.dataset.timeoutId)); // 清除並回收定時器資源
                                btn.removeAttribute('data-timeout-id'); // 移除定時器屬性標記
                            }
                            if (btn.classList.contains('is-loading') || audio.paused) { // 檢查是否為載入中或暫停狀態
                                const currentProgress = audio.currentTime; // 備份當前播放進度秒數

                                audio.pause(); // 停止目前音訊播放
                                audio.load(); // 重新載入音訊檔案以修復通道

                                audio.addEventListener('loadedmetadata', () => { // 監聽音訊元資料載入完成事件
                                    audio.currentTime = currentProgress; // 還原播放進度秒數
                                }, { once: true }); // 設定為單次執行

                                if (iconImg) iconImg.src = pImg; // 將圖示更換為播放按鈕
                                btn.classList.remove('is-playing', 'is-loading'); // 移除播放與載入狀態類別
                                btn.classList.add('is-paused'); // 加入暫停狀態類別
                            }
                        };

                        if (btn.classList.contains('is-loading')) { // 檢查按鈕是否正處於載入中狀態
                            handleTimeoutFallback(); // 執行超時防禦與進度還原函式
                            return; // 攔截並中斷後續播放邏輯
                        }

                        if (audio.paused) { // 檢查音訊目前是否為暫停狀態
                            document.querySelectorAll('.player-control-btn').forEach((b, ai) => { // 遍歷所有播放控制按鈕進行排他處理
                                if (ai !== idx) { // 排除當前點擊的按鈕項目
                                    const aud = document.getElementById(`native-audio-${ai}`); // 取得其他項目的音訊元素
                                    if (aud) aud.pause(); // 暫停其他項目的音訊播放
                                    b.classList.remove('is-playing', 'is-loading'); // 移除其他按鈕的播放與載入狀態
                                    b.classList.add('is-paused'); // 將其他按鈕設為暫停狀態
                                    const img = b.querySelector('.player-icon-img'); // 取得其他按鈕的圖示元素
                                    if (img) img.src = pImg; // 將其他按鈕圖示換回播放狀態
                                }
                            });

                            if (lImg) { // 檢查載入中圖示是否存在
                                if (iconImg) iconImg.src = lImg; // 切換按鈕圖示為載入中狀態
                                btn.classList.remove('is-paused', 'is-playing'); // 移除暫停與播放狀態類別
                                btn.classList.add('is-loading'); // 新增載入中狀態類別
                            }

                            const timeoutId = setTimeout(() => { // 建立8秒超時安全撤退定時器
                                handleTimeoutFallback(); // 超時則執行還原修復機制
                            }, 8000);
                            btn.dataset.timeoutId = timeoutId.toString(); // 將定時器識別碼綁定至按鈕節點

                            const onPlayingHandler = () => { // 定義正式開始播放的監聽處理函式
                                if (btn.dataset.timeoutId) { // 檢查是否存在超時定時器
                                    clearTimeout(parseInt(btn.dataset.timeoutId)); // 清除並回收定時器資源
                                    btn.removeAttribute('data-timeout-id'); // 移除定時器屬性標記
                                }
                                if (iconImg) iconImg.src = sImg; // 將圖示更換為暫停按鈕
                                btn.classList.remove('is-paused', 'is-loading'); // 移除暫停與載入狀態類別
                                btn.classList.add('is-playing'); // 新增播放狀態類別
                                audio.removeEventListener('playing', onPlayingHandler); // 註銷單次監聽事件
                            };
                            audio.addEventListener('playing', onPlayingHandler); // 綁定標準播放事件監聽器

                            const playPromise = audio.play(); // 執行播放並宣告承諾追蹤變數
                            if (playPromise !== null) { // 檢查播放承諾是否產生
                                playPromise.then(() => { // 承諾兌現成功後執行驗證
                                    if (audio.paused) { // 檢查若在載入期間已被按暫停
                                        audio.pause(); // 強制執行原生暫停指令修正狀態
                                    }
                                }).catch(() => { // 攔截非同步播放失敗異常
                                    audio.removeEventListener('playing', onPlayingHandler); // 註銷播放監聽事件
                                    if (btn.dataset.timeoutId) { // 檢查是否存在定時器
                                        clearTimeout(parseInt(btn.dataset.timeoutId)); // 清除超時定時器
                                        btn.removeAttribute('data-timeout-id'); // 移除定時器標記
                                    }
                                    if (iconImg) iconImg.src = pImg; // 將圖示換回播放按鈕
                                    btn.classList.remove('is-playing', 'is-loading'); // 移除播放與載入狀態
                                    btn.classList.add('is-paused'); // 恢復為暫停狀態類別
                                });
                            }

                        } else { // 處理音訊播放中再度點擊的暫停邏輯
                            audio.pause(); // 暫停音訊播放
                            if (btn.dataset.timeoutId) { // 檢查並確認定時器存在
                                clearTimeout(parseInt(btn.dataset.timeoutId)); // 清除並回收超時定時器
                                btn.removeAttribute('data-timeout-id'); // 移除定時器標記
                            }
                            if (iconImg) iconImg.src = pImg; // 將圖示換回播放按鈕
                            btn.classList.remove('is-playing', 'is-loading'); // 移除播放與載入狀態類別
                            btn.classList.add('is-paused'); // 新增暫停狀態類別
                        }
                    },
                    seek(idx, percent) { // 定義拖曳進度條調整時間的方法
                        const audio = document.getElementById(`native-audio-${idx}`); // 取得對應音訊元素
                        const timeline = document.getElementById(`timeline-${idx}`); // 取得對應進度條元素
                        if (!audio || !audio.duration) return; // 檢查音訊與總長度是否存在則否則中斷

                        audio.currentTime = (percent / 100) * audio.duration; // 依百分比計算並設定音訊當前時間
                        if (timeline) timeline.style.setProperty('--value', `${percent}%`); // 更新進度條 CSS 漸層進度比例
                    }
                };

                // ===【註冊定時器：即時同步時間文字與進度條滑動】===
                episodes.forEach((ep, i) => { // 再次遍歷每一集音訊節點
                    const audio = document.getElementById(`native-audio-${i}`); // 取得對應音訊元素
                    const timeTxt = document.getElementById(`time-txt-${i}`); // 取得對應時間顯示元素
                    const timeline = document.getElementById(`timeline-${i}`); // 取得對應進度條元素

                    if (audio) {
                        const fmt = (s) => { if (isNaN(s)) return '00:00'; const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`; }; // 定義秒數轉 MM:SS 格式的函式

                        audio.addEventListener('timeupdate', () => { // 監聽播放進度更新事件
                            if (timeTxt) timeTxt.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`; // 更新進度與總長度純文字
                            if (timeline && audio.duration) {
                                const pct = (audio.currentTime / audio.duration) * 100; // 計算播放進度百分比
                                timeline.value = pct; // 更新進度條節點數值
                                timeline.style.setProperty('--value', `${pct}%`); // 更新進度條 CSS 漸層進度比例
                            }
                        });

                        audio.addEventListener('loadedmetadata', () => { // 監聽音訊元資料載入完成事件
                            if (timeTxt) timeTxt.textContent = `00:00 / ${fmt(audio.duration)}`; // 預先寫入音訊總時長文字
                        });
                    }
                }); 

            } else {
                episodes.forEach((ep, i) => {
                    const titleEl = container.querySelector(`.podcast-episode-title[data-ep-index="${i}"]`);
                    if (titleEl) {
                        titleEl.textContent = ep.title || '';
                    }

                    const aud = document.getElementById(`native-audio-${i}`); // 取得該集原生音訊元素
                    const txt = document.getElementById(`time-txt-${i}`); // 取得該集時間顯示元素
                    if (aud && txt && !isNaN(aud.duration) && aud.duration > 0) { // 檢查音訊長度數據是否已就緒
                        const fmt = (s) => { if (isNaN(s)) return '00:00'; const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`; }; // 建立時間格式化匿名函式
                        txt.textContent = `${fmt(aud.currentTime)} / ${fmt(aud.duration)}`; // 即時校正並更新時間純文字顯示
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
 * 6. 角色展示區渲染函數
 */
function renderChar(idx) {
    const c = config.chars?.[idx]; // 取得指定索引的角色資料物件
    const container = document.getElementById('char-content'); // 取得角色展示大容器元素
    const template = document.getElementById('char-template'); // 取得角色 HTML5 範本元素

    if (!c || !container || !template) return; // 檢查資料與容器是否存在否則中斷

    const existingLayout = container.querySelector('.char-layout'); // 檢查是否已存在角色佈局結構

    if (!existingLayout) { // 檢查若無佈局結構則執行首次載入
        const clone = template.content.cloneNode(true); // 深層克隆範本內部所有子節點

        clone.querySelector('.main-img').src = c.m; // 設定大立繪圖片網址
        clone.querySelector('.char-name-title').textContent = c.n; // 填入角色名稱純文字
        clone.querySelector('.char-intro').textContent = c.i; // 填入角色介紹純文字

        const btnWrap = clone.querySelector('.char-btn-wrap'); // 取得頭像按鈕包裝容器元素
        if (btnWrap) { // 檢查頭像按鈕容器是否存在
            config.chars.forEach((char, i) => { // 遍歷所有角色資料
                const btn = document.createElement('div'); // 動態建立頭像按鈕元素
                btn.className = 'head-circle'; // 設定基礎樣式類別名稱

                btn.onclick = () => { // 綁定頭像按鈕點擊事件
                    if (btn.classList.contains('active')) return; // 若已處於目前角色則攔截不執行

                    if (btnWrap.dataset.isCooling === "true") return; // 總容器冷卻中則攔截

                    btnWrap.dataset.isCooling = "true"; // 啟用頭像按鈕總容器冷卻鎖

                    renderChar(i); // 重新呼叫函數切換至選定角色

                    setTimeout(() => { // 延遲500毫秒解鎖
                        btnWrap.dataset.isCooling = "false"; // 解除總容器安全冷卻鎖
                    }, 500);
                };

                btn.innerHTML = `<img src="${char.h}" alt="head">`; // 注入角色頭像圖片結構
                btnWrap.appendChild(btn); // 將頭像按鈕掛載至容器末尾
            });
        }

        container.innerHTML = ''; // 清空大容器內部所有舊結構
        container.appendChild(clone); // 正式掛載克隆的全新範本骨架
        container.classList.add('reveal'); // 加入類別名稱以觸發進場動畫
    } else { // 處理非首次載入語系切換或角色更新邏輯
        const mainImg = existingLayout.querySelector('.main-img'); // 取得現有的主立繪圖片元素
        if (mainImg && mainImg.getAttribute('src') !== c.m) { // 檢查圖片路詢不同才進行替換
            mainImg.src = c.m; // 替換大立繪圖片網址觸發換圖
        }
        const nameTitle = existingLayout.querySelector('.char-name-title'); // 取得現有的角色名稱元素
        const introText = existingLayout.querySelector('.char-intro'); // 取得現有的角色介紹元素
        if (nameTitle) nameTitle.textContent = c.n; // 更新角色名稱純文字
        if (introText) introText.textContent = c.i; // 更新角色介紹純文字
    }

    const updateActiveButtonState = () => { // 定義更新頭像按鈕高亮狀態的函式
        const allButtons = container.querySelectorAll('.head-circle'); // 取得容器內所有頭像按鈕元素
        if (allButtons && allButtons.length > 0) { // 檢查頭像按鈕是否存在且不為空
            allButtons.forEach((btn, i) => { // 遍歷所有頭像按鈕
                if (i === idx) {
                    btn.classList.add('active'); // 為當前選定的角色頭像加入高亮類別
                } else {
                    btn.classList.remove('active'); // 移除其他非選定頭像的高亮類別
                }
            });
        }
    };

    requestAnimationFrame(() => { // 註冊第一層動畫影格
        requestAnimationFrame(() => { // 註冊第二層動畫影格確保排版就緒
            updateActiveButtonState(); // 執行頭像按鈕高亮狀態更新
        });
    });
}

/**
 * 獨立功能：實機演示影片渲染外掛
 */
function renderGameDemoVideos() { // 定義展示影片渲染外掛函數
    const demoConfigs = { // 集中管理影片區塊的結構化配置物件
        '#sec5 .content-box': { // 區塊五配置資料
            title: config.gameDemoTitle5 || (window.lang && lang.gameDemoTitle5) || '視覺小說', // 標題多層防禦與預設文字
            src: config.gameVideoSrc5 || config.gameVideoUrl1 || "./info/test.mov" // 影片網址多欄位降級相容路徑
        },
        '#sec6 .content-box': { // 區塊六配置資料
            title: config.gameDemoTitle6 || (window.lang && lang.gameDemoTitle6) || '寂寞流星雨', // 標題多層防禦與預設文字
            src: config.gameVideoSrc6 || config.gameVideoUrl2 || "./info/test.mov" // 影片網址多欄位降級相容路徑
        }
    };

    Object.entries(demoConfigs).forEach(([selector, videoData]) => { // 遍歷影片配置物件的鍵值對
        const targetElement = document.querySelector(selector); // 取得對應的內容容器元素
        if (!targetElement) return; // 檢查容器是否存在，否則跳過此輪

        const scrollBoxVideo = targetElement.querySelector('video'); // 檢查容器內是否已存在影片元素

        if (!scrollBoxVideo) { // 若無影片元素則執行首次載入結構注入
            const videoHtml = `
                <h2 class="game-title game-video-title">${videoData.title}</h2>
                \${videoData.src ? \`
                    <div class="video-wrapper">
                        <!-- 💡 修正關鍵：移除所有 iOS Safari 不支援的 Blink 專屬控制屬性，只保留 playsinline 與標準 controls 以確保跨平台高度相容 -->
                        <video src="\${videoData.src}" controls preload="none" playsinline class="game-video"></video>
                    </div>
                \` : ''}
            `; 

            targetElement.innerHTML = videoHtml; // 將結構字串寫入目標容器

            const video = targetElement.querySelector('video'); // 取得剛注入的影片元素
            if (video && 'IntersectionObserver' in window) {
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (video.paused && video.currentTime === 0) { // 檢查影片為暫停且進度在開頭
                                video.load(); // 影片全新進場時才進行初始化
                            }
                        } else {
                            if (!video.paused) { // 檢查影片是否正在播放
                                video.pause(); // 移出視線時強制安全暫停
                            }
                        }
                    });
                }, { threshold: 0.1 });

                videoObserver.observe(targetElement);
            }
        } else { // 處理非首次載入語系切換邏輯
            const titleEl = targetElement.querySelector('.game-video-title'); // 取得現有的影片標題元素
            if (titleEl) {
                titleEl.textContent = videoData.title; // 僅更新標題文字內容不重構結構
            }
        }
    });
}


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
 * 8. 初始化跑馬燈內容
 */
function initMarquee() {
    const content = document.getElementById('marquee-content'); // 取得跑馬燈主文字容器元素
    const clone = document.getElementById('marquee-content-clone'); // 取得跑馬燈鏡像文字容器元素

    if (!content || !clone) return; // 檢查主容器與鏡像容器是否存在否則中斷

    const txt = config.marqueeText + "　"; // 讀取設定檔文字並串接全形空格作為安全間隔
    const fullTxt = txt.repeat(10); // 將字串重複複製十次以填滿超寬螢幕

    content.textContent = fullTxt; // 使用 textContent 安全填入超長純文字防範指令碼攻擊
    clone.textContent = fullTxt; // 使用 textContent 安全填入鏡像純文字防範指令碼攻擊
}


/**
 * 9. 核心互動邏輯
 */
function setupCoreLogic() { // 定義核心互動邏輯函數
    const bg = document.getElementById('bg'); // 取得大背景元素
    // const bar = document.getElementById('marquee-bar');
    const navItems = Array.from(document.querySelectorAll('.nav-item')); // 取得所有導覽項目元素陣列
    const sections = Array.from(document.querySelectorAll('section')); // 取得所有區塊元素陣列

    const observer = new IntersectionObserver((entries) => { // 建立區塊進出可視區域監測器實例
        entries.forEach(({ target: t, isIntersecting: isVisible }) => { // 遍歷交叉狀態記錄並解構變數
            const box = t.querySelector('.content-box'); // 取得區塊內的內容容器元素
            if (box) box.classList.toggle('reveal', isVisible); // 依可見狀態切換內容進場動畫類別

            if (isVisible) { // 檢查區塊若滾動進入螢幕中央
                const currentSectionIndex = sections.indexOf(t); // 計算當前區塊在陣列中的索引值

                navItems.forEach((item, index) => { // 遍歷所有導覽項目元素
                    item.classList.toggle('active', index === currentSectionIndex); // 依索引值同步切換導覽高亮狀態
                });

                if (bg) {
                    bg.style.filter = `brightness(${t.id === 'sec0' ? 0.8 : 0.3})`; // 依分頁識別動態調整大背景濾鏡亮度
                }
            }
        });
    }, { threshold: 0.4 }); // 設定露出面積超過 40% 觸發

    sections.forEach(sec => observer.observe(sec)); // 將所有區塊元素註冊進監測器啟動追蹤

    const scrollContainer = document.body; // 鎖定網頁主體為捲軸容器

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
    const isMobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0; // 精準判定當前設備是否為觸控行動端

    if (!isMobileDevice) { // 僅在非觸控的傳統桌機環境執行分支
        let isScrollLocked = false; // 宣告防連滾鎖定狀態變數
        const scrollCooldown = 800; // 設定防連滾的動畫冷卻時間

        scrollContainer.addEventListener('wheel', (e) => { // 註冊滑鼠滾輪事件監聽器
            if (isScrollLocked) return; // 滾輪冷卻鎖定中則攔截不執行

            const isInsidePodcastScroll = e.target.closest('.podcast-scroll-box'); // 檢查滾動位置是否在 Podcast 列表內部
            if (isInsidePodcastScroll) return; // 若在列表內滾動則釋放控制權不切頁

            if (Math.abs(e.deltaY) > 5) { // 檢查滾輪垂直滾動絕對值力道是否大於門檻
                e.preventDefault(); // 阻斷瀏覽器原生的全網頁自由滾動行為

                const activeNav = document.querySelector('.nav-item.active'); // 取得當前高亮的導覽項目元素
                const currentIndex = activeNav ? navItems.indexOf(activeNav) : 0; // 計算當前高亮項目的陣列索引值
                let targetIndex = currentIndex; // 宣告目標跳轉頁面索引值變數

                if (e.deltaY > 0) {
                    targetIndex = currentIndex + 1; // 滾輪向下則目標頁面索引加一
                } else {
                    targetIndex = currentIndex - 1; // 滾輪向上則目標頁面索引減一
                }

                if (targetIndex >= 0 && targetIndex < sections.length) { // 檢查目標頁面索引是否在合法區塊範圍內
                    isScrollLocked = true; // 啟用桌機版防連滾安全鎖定

                    const targetTop = sections[targetIndex].offsetTop; // 取得目標區塊距離網頁頂端的高度像素值
                    scrollContainer.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    }); // 控制全網頁視窗平滑滾動至目標區塊高度

                    setTimeout(() => { isScrollLocked = false; }, scrollCooldown); // 延遲800毫秒後解除滾輪切頁鎖定
                }
            }
        }, { passive: false }); // 禁用被動監聽以確保阻斷原生滾動生效
    } else { // 處理行動觸控端設備分支
        // 行動端完全不進行任何滑動事件攔截以確保影音播放憑證與原生吸附
    }

    scrollContainer.dispatchEvent(new Event('scroll'));
}

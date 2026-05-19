// ==========================================
// 戰略性精準圖片預熱
// ==========================================

window.addEventListener('load', () => { // 網頁載入完成後執行
    setTimeout(() => { // 延遲300毫秒避開開局塞車
        if (config && Array.isArray(config.chars)) { // 檢查設定檔與角色資料是否存在

            // 💡 優化 A：優先抓取並存入第一個角色的首發大立繪，全速下載以確保首屏秒開
            if (config.chars[0] && config.chars[0].m) {
                const firstImgCache = new Image(); // 建立首發圖片物件
                firstImgCache.onload = () => { firstImgCache.onload = null; }; // 下載完畢立刻解除參照釋放記憶體
                firstImgCache.src = config.chars[0].m; // 賦值路徑讓瀏覽器全速下載第一張圖
            }

            // 💡 優化 B：將其餘剩餘角色的預載往後推遲一秒半，把開局的所有網路頻寬完全让路給首發大立繪
            setTimeout(() => {
                config.chars.forEach((char, i) => { // 輪詢所有角色資料
                    if (i !== 0 && char.m) { // 排除已經在第一階段下載過的第一個角色
                        const imgCache = new Image(); // 建立其餘圖片物件
                        imgCache.onload = () => { imgCache.onload = null; }; // 下載完畢解除監聽
                        imgCache.onerror = () => { imgCache.onerror = null; }; // 失敗時解除監聽
                        imgCache.src = char.m; // 依序在背景默默下載其餘角色大圖
                    }
                });
            }, 1500); // 鎖定延遲一秒半，確保第一張圖已安全下載完畢
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


// ========================================================
// 🛡️ 額外新增：行動裝置全網頁雙指放大手勢強行鎖 (單指操控隔離器)
// ========================================================
(function () {
    // 1. 🛑 攔截多點觸控（雙指捏合放大）
    document.addEventListener('touchstart', (event) => {
        // 💡 核心判別：當畫面上同時存在 2 隻（含）以上的手指時，代表使用者正在試圖發動縮放手勢
        if (event.touches.length > 1) {
            event.preventDefault(); // 強行沒收瀏覽器的系統級多點放大行為
            console.log("[Gesture Lock] 已成功阻斷一次雙指放大試圖，維持單指操控");
        }
    }, { passive: false }); // 必須關閉 passive，瀏覽器才允許執行 preventDefault()

    // 2. 🛑 攔截縮放手勢事件（iOS Safari 專屬引擎底層事件）
    document.addEventListener('gesturestart', (event) => {
        event.preventDefault(); // 100% 沒收 iOS WebKit 的原生雙指捏合縮放與旋轉手勢
    }, { passive: false });
})();

// 🛠️ 全域觸控攔截盾：直接阻止 300 毫秒內的連續雙擊所引發的原生網頁縮放行為
document.addEventListener("touchend", (event) => { // 監聽全網頁上所有觸控結束的事件
    const now = Date.now(); // 取得當前點擊發生的精確時間戳記
    const lastTouch = window.lastTouchTime || 0; // 提取上一次記錄在全域視窗的點擊時間
    if (now - lastTouch <= 350) { // 如果兩次觸控點擊的時間差小於或等於 300 毫秒（即判定為雙擊）
        event.preventDefault(); // 強制阻斷瀏覽器的預設行為，直接沒收雙擊放大網頁的權限
    }
    window.lastTouchTime = now; // 將當前的時間戳記更新至全域變數中供下一次點擊比對
}, { passive: false }); // 必須關閉被動監聽模式，否則 preventDefault 將會失去攔截權限


// /**
//  * ============================================================================
//  * 附錄外掛：全站頁面高度與基準線即時監控系統（雙重監控升級版）
//  * ============================================================================
//  */
// document.addEventListener('DOMContentLoaded', () => { // 網頁 HTML 結構解析完畢後執行
//     if (typeof window.ResizeObserver !== 'undefined') { // 檢查瀏覽器是否支援原生排版監控器

//         // 建立全站排版監控器實例
//         const layoutObserver = new window.ResizeObserver((entries) => {
//             // 遍歷所有被偵測到尺寸發生變更的 DOM 元素
//             entries.forEach(entry => {
//                 const element = entry.target; // 取得目前產生變更的元素節點
//                 const elementId = element.id ? '#' + element.id : ''; // 取得元素 ID
//                 const elementClass = element.className ? '.' + element.className.split(' ').join('.') : ''; // 取得元素類別名稱
//                 const elementIdentifier = (elementId || elementClass || element.tagName); // 組合最直觀的識別名稱

//                 // 💡 同時讀取：內部內容物理高度與外部實體渲染高度
//                 const currentContentH = entry.contentRect.height; // 讀取隨翻譯拉扯的內部內容高度
//                 const currentBorderH = element.getBoundingClientRect().height; // 讀取被CSS防禦鎖定的外框實體高度

//                 // 從 Dataset 讀取歷史前一次的雙重高度紀錄
//                 const lastContentH = element.dataset.lastContentHeight ? parseFloat(element.dataset.lastContentHeight) : currentContentH;
//                 const lastBorderH = element.dataset.lastBorderHeight ? parseFloat(element.dataset.lastBorderHeight) : currentBorderH;

//                 // 精確計算出內容與外框各自的像素落差
//                 const contentDelta = Math.abs(currentContentH - lastContentH);
//                 const borderDelta = Math.abs(currentBorderH - lastBorderH);

//                 // 💡 雙重抓漏防線：只要內容或外框任一高度變更落差大於 0.5 像素即可觸發日誌
//                 if (!window.IsFirstLoadLocked && (contentDelta > 0.5 || borderDelta > 0.5)) {
//                     console.log("=== Dual Layout Baseline Shift Detected ==="); // 印出雙重偵測標準錯誤標頭
//                     console.log("Target Element:", elementIdentifier); // 印出受影響的目標節點名稱
//                     console.log("[Content Metrics] From:", lastContentH, "To:", currentContentH, "(Delta:", contentDelta + ")"); // 印出內部內容變動數據
//                     console.log("[Border-Box Metrics] From:", lastBorderH, "To:", currentBorderH, "(Delta:", borderDelta + ")"); // 印出外部實體變動數據
//                     console.log("=========================================="); // 印出結尾分隔線
//                 }

//                 // 更新該元素在 Dataset 中的歷史雙重高度快取
//                 element.dataset.lastContentHeight = currentContentH;
//                 element.dataset.lastBorderHeight = currentBorderH;
//             });
//         });

//         // 💡 自動盤點：撈取全網頁所有的 section 區塊進行物理尺寸綁定監控
//         const allSections = document.querySelectorAll('section, .section');
//         if (allSections && allSections.length > 0) {
//             allSections.forEach(sec => {
//                 // 將每個獨立頁面的兩種高度初始值記錄到 Dataset 快取中
//                 sec.dataset.lastContentHeight = sec.offsetHeight; // 這裡以初始高度作為內容快取基準
//                 sec.dataset.lastBorderHeight = sec.getBoundingClientRect().height; // 這裡以實體渲染作為外框快取基準
//                 // 強制讓監控器對該頁面實施全天候尺寸動態追蹤
//                 layoutObserver.observe(sec);
//             });
//         }
//     }
// });




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
        // 💡 修正關鍵：不要再寫死 0，自動讀取全域記錄的當前角色索引，若無記錄才安全回退預設 0
        const currentActiveIdx = typeof window.CurrentCharIndex === 'number' ? window.CurrentCharIndex : 0;

        console.log("=== Central Render Character Dispatch ===");
        console.log("Current Character Index Dispatched For Translation:", currentActiveIdx);

        renderChar(currentActiveIdx); // 傳入當前觀看的角色索引進行文字渲染
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

/**
 * ============================================================================
 * 語系變更監聽器 - 滾輪吸附與滾動雙重凍結防護線
 * ============================================================================
 */
window.addEventListener('languageChanged', () => {
    // 關鍵防線 1：精確紀錄點擊翻譯瞬間，當前使用者絕對不能動的實時滾動軸位置
    const currentScrollY = window.scrollY;

    // 關鍵防線 2：強制沒收目前被點擊元素的焦點狀態，切斷瀏覽器焦點遺失回彈機制
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
    }

    // 關鍵防線 3：暫時關閉 html 與 body 的強制吸附屬性
    // 這樣一來，不論全站 Section 的高度因為滾動條如何集體跳變（如從 711 變 946），
    // 全站的 CSS 吸附系統此時都處於完全失效狀態，絕對沒有權限主動把網頁「向上移動或拉扯」！
    document.documentElement.style.scrollSnapType = 'none';
    document.body.style.scrollSnapType = 'none';

    // 1. 執行主中央調度（原封不動執行您最原始的全站渲染，包含其他頁面與角色區）
    if (typeof runAllRenderModules === 'function') {
        runAllRenderModules();
    }

    // 2. 執行 Podcast 列表重繪
    if (typeof window.renderPodcastList === 'function') {
        window.renderPodcastList();
    }

    // 關鍵防線 4：在全域吸附被凍結的安全期內，無縫將視窗滾動軸精確釘在原本的定位點上
    window.scrollTo(0, currentScrollY);

    // 關鍵防線 5：等待兩個排版影格，確保所有 Section 的視窗尺寸在後台完全穩定、排版定格
    requestAnimationFrame(() => {
        window.scrollTo(0, currentScrollY);

        requestAnimationFrame(() => {
            window.scrollTo(0, currentScrollY);

            // 💡 所有排版尺寸皆已無縫就位，高度完全回復穩定，此時悄悄恢復原本 CSS 的 Y 軸強制吸附
            document.documentElement.style.scrollSnapType = 'y mandatory';
            document.body.style.scrollSnapType = 'y mandatory';
        });
    });
});


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

        if (!hasImgWrap && (config.gameIntroSubImg1 || config.gameIntroSubImg2)) { // 檢查若無容器且設定檔有路徑則執行
            const wrap = document.createElement('div'); // 建立圖片包裝盒子元素
            wrap.className = 'sub-title-img-wrap'; // 賦予標準類別名稱

            if (config.gameIntroSubImg1) { // 檢查設定檔圖一是否存在
                const img1 = document.createElement('img'); // 建立圖片一元素
                img1.className = 'sub-title-img'; // 賦予樣式類別
                img1.src = config.gameIntroSubImg1; // 由 JS 抓取路徑並存入 src
                wrap.appendChild(img1); // 將圖片一掛載至盒子內
            }
            if (config.gameIntroSubImg2) { // 檢查設定檔圖二是否存在
                const img2 = document.createElement('img'); // 建立圖片二元素
                img2.className = 'sub-title-img'; // 賦予樣式類別
                img2.src = config.gameIntroSubImg2; // 由 JS 抓取路徑並存入 src
                wrap.appendChild(img2); // 將圖片二挂載至盒子內
            }

            sec3Box.insertBefore(wrap, sec3Box.firstChild); // 💡 優化：使用 insertBefore 將圖片盒子精確插入到最頂部，100% 絕不使用 innerHTML 覆蓋
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
        titleEl.textContent = config.podcastSectionTitle || (window.lang && lang.podcastSectionTitle) || ''; // 依語系字典更新大標題文字
    }

    requestAnimationFrame(() => { // 註冊第一層動畫影格
        requestAnimationFrame(() => { // 註冊第二層動畫影格確保排版就緒

            const container = document.getElementById('podcast-container'); // 取得清單外殼容器元素
            if (!container) return; // 檢查容器是否存在否則中斷執行

            container.style.height = "auto"; // 重設容器高度為自動撐開

            // 💡 修正關鍵：將降級鏈的第一順位調整為當前經 translations 對齊後的 window.lang 物件，打通切換語言的資料鏈
            const currentDict = window.lang || config || (window.translations && window.translations[window.currentLang || 'zh']) || {}; // 鎖定目前就緒的多國語言字典物件
            const episodes = currentDict.podcastList || []; // 取得設定檔中的 Podcast 列表陣列

            const existingScrollBox = container.querySelector('.podcast-scroll-box'); // 檢查是否已存在滾動盒子元素

            if (!existingScrollBox) { // 檢查若無滾動盒子則執行首次載入結構注入
                let html = '<div class="podcast-scroll-box">'; // 初始化結構字串並加入外殼標籤
                const defaultPlayImg = config.playIcon || "./icon/play.png"; // 取得播放圖示路徑或備用路徑


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
                                audio.load();  // 重新載入音訊檔案以修復通道

                                audio.currentTime = currentProgress; // 還原播放進度秒數

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

                            audio.onplaying = () => { // 監聽音訊正式開始播放事件
                                if (btn.dataset.timeoutId) { // 檢查是否存在超時定時器
                                    clearTimeout(parseInt(btn.dataset.timeoutId)); // 清除並回收定時器資源
                                    btn.removeAttribute('data-timeout-id'); // 移除定時器屬性標記
                                }
                                if (iconImg) iconImg.src = sImg; // 將圖示更換為暫停按鈕
                                btn.classList.remove('is-paused', 'is-loading'); // 移除暫停與載入狀態類別
                                btn.classList.add('is-playing'); // 新增播放狀態類別
                                audio.onplaying = null; // 註銷單次監聽事件
                            };

                            audio.play().catch(() => { // 執行播放並攔截失敗異常
                                audio.onplaying = null; // 播放失敗時註銷監聽事件
                                if (btn.dataset.timeoutId) { // 檢查是否存在定時器
                                    clearTimeout(parseInt(btn.dataset.timeoutId)); // 清除超時定時器
                                    btn.removeAttribute('data-timeout-id'); // 移除定時器標記
                                }
                                if (iconImg) iconImg.src = pImg; // 將圖示換回播放按鈕
                                btn.classList.remove('is-playing', 'is-loading'); // 移除播放與載入狀態
                                btn.classList.add('is-paused'); // 恢復為暫停狀態類別
                            });

                        } else { // 處理音訊播放中再度點擊的暫停邏輯
                            audio.pause(); // 暫停音訊播放
                            audio.onplaying = null; // 清除未觸發的播放監聽
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

            } else { // 處理非首次載入語系切換邏輯
                episodes.forEach((ep, i) => { // 遍歷最新的多國語言單集資料
                    const titleEl = container.querySelector(`.podcast-episode-title[data-ep-index="${i}"]`); // 透過我們在上面首次載入時預留的自定義 data-ep-index 屬性，精準在 DOM 樹中撈出該集的標題元素
                    if (titleEl) { // 如果該集標題存在
                        titleEl.textContent = ep.title || ''; // 直接使用 textContent 替換標題為最新語系的 ep.title 文字，而下方的自定義播放器與播音進度則 100% 完全鎖定不動
                    } // 結束單集文字變更的檢查區塊
                }); // 結束語系切換的遍歷迴圈
            } 
        });
    });
} 


/**
 * ============================================================================
 * 6. 角色展示區渲染函數 - 重繪動畫解鎖完全體
 * ============================================================================
 */
function renderChar(idx) {
    // 紀錄當前關鍵：如果有點擊傳入 idx 就使用它並寫入全域；如果沒有傳入則優先讀取全域，皆無則安全回退預設 0
    const currentCharIdx = typeof idx === 'number' ? idx : (typeof window.CurrentCharIndex === 'number' ? window.CurrentCharIndex : 0);
    window.CurrentCharIndex = currentCharIdx; // 將最終決定的索引同步鎖定到全域變數中

    const c = config.chars?.[currentCharIdx]; // 取得指定索引的角色資料物件
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

                    window.CurrentCharIndex = i; // 點擊頭像時同步更新全域指針

                    renderChar(i); // 重新呼叫函數切換至選定角色

                    setTimeout(() => { // 延遲500毫秒解鎖
                        btnWrap.dataset.isCooling = "false"; // 解除總容器安全冷卻鎖
                    }, 500);
                };

                btn.innerHTML = `<img src="${char.h}" alt="head">`; // 注入角色頭像圖片結構
                btnWrap.appendChild(btn); // 將頭像按鈕掛載至容器末尾
            });
        }

        // ========================================================
        // 核心修正 1：語系切換與刷新重新載入時，直接拔除內容方框進場動畫
        // ========================================================
        if (typeof window.IsFirstLoadLocked !== 'undefined' && !window.IsFirstLoadLocked) { // 檢查若不為全站首次載入則觸發防跳機制
            const targetBox = clone.querySelector('.content-box'); // 於克隆結構中尋找內容方框元素
            if (targetBox) { // 檢查內容方框元素是否存在
                targetBox.style.transition = 'none'; // 強制關閉動畫過渡曲線
                targetBox.style.opacity = '1'; // 強制將透明度直接設定為完成狀態 1
                targetBox.style.transform = 'translateY(0)'; // 強制將垂直位移直接歸零定位
            }
        }

        // 局部物理骨架防坍塌防線
        const originalContainerHeight = container.offsetHeight;
        console.log("=== Character Section Rebuild Initialized ===");
        console.log("Current Container Offset Height Before Clear:", originalContainerHeight);

        if (originalContainerHeight > 0) { // 檢查容器當前高度是否大於零
            container.style.height = originalContainerHeight + 'px'; // 強制將當前高度寫死到 style 屬性上防止空間坍塌
            container.style.overflow = 'hidden'; // 開啟裁剪防止重繪期間圖片解碼造成的基準線拉扯
            console.log("Container Height Freeze Applied Successfully.");
        }

        container.innerHTML = ''; // 清空大容器內部所有舊結構
        container.appendChild(clone); // 正式掛載克隆的全新範本骨架
        container.classList.add('reveal'); // 加入類別名稱以觸發進場動畫

        requestAnimationFrame(() => { // 註冊第一層動畫影格
            requestAnimationFrame(() => { // 註冊第二層動畫影格確保全新 DOM 渲染定位完畢
                container.style.height = ''; // 柔和釋放鎖定的實體高度回復彈性排版
                container.style.overflow = ''; // 回復原本的溢出預設屬性

                // 💡 動畫復原防線：在重新掛載並渲染定格後，柔和把 style 拔掉，100% 確保不干擾使用者隨後正常滾動網頁時的 reveal 效果
                if (typeof window.IsFirstLoadLocked !== 'undefined' && !window.IsFirstLoadLocked) {
                    const targetBox = container.querySelector('.content-box');
                    if (targetBox) {
                        targetBox.style.transition = '';
                        targetBox.style.opacity = '';
                        targetBox.style.transform = '';
                    }
                }

                console.log("Container Height Thawed. Rebuilt Frame Stabilized at Height:", container.offsetHeight);
                console.log("=== Character Section Rebuild Finished ===");
            });
        });
        // ========================================================

    } else { // 處理非首次載入語系切換或角色更新邏輯
        const mainImg = existingLayout.querySelector('.main-img'); // 取得現有的主立繪圖片元素

        console.log("=== In-place Update Branch Triggered ===");

        // 圖片網址變更防護線：檢查圖片網址是否真正改變，若網址相同則絕對不重複指定 .src 屬性
        if (mainImg) {
            const currentSrc = mainImg.getAttribute('src');
            if (currentSrc !== c.m) {
                mainImg.src = c.m; // 只有在更換角色、路徑不同時才觸發換圖
                console.log("Image Source Changed To:", c.m);
            } else {
                console.log("Image Source Retained Same. Skipped Reload Avoid Flash Bug.");
            }
        }

        const nameTitle = container.querySelector('.char-name-title'); // 取得現有的角色名稱元素
        const introText = container.querySelector('.char-intro'); // 取得現有的角色介紹元素
        const contentBox = container.querySelector('.content-box'); // 取得內容方框元素

        // 核心修正 2：Windows 本地端 Flexbox 換字防抖防線
        let originalNameHeight = 0;
        let originalIntroHeight = 0;

        if (nameTitle) originalNameHeight = nameTitle.offsetHeight;
        if (introText) originalIntroHeight = introText.offsetHeight;

        if (contentBox) {
            const originalBoxHeight = contentBox.offsetHeight;
            console.log("Content Box Height Before Text Transformation:", originalBoxHeight);

            contentBox.style.height = originalBoxHeight + 'px'; // 強制將當前高度寫死到 style 屬性上防止空間因文字字型變更而抖動

            if (nameTitle && originalNameHeight > 0) nameTitle.style.height = originalNameHeight + 'px'; // 同步鎖定內部名稱容器高度
            if (introText && originalIntroHeight > 0) introText.style.height = originalIntroHeight + 'px'; // 同步鎖定內部介紹容器高度
        }

        if (nameTitle) nameTitle.textContent = c.n; // 更新角色名稱純文字
        if (introText) introText.textContent = c.i; // 更新角色介紹純文字

        requestAnimationFrame(() => {
            if (contentBox) {
                contentBox.style.height = ''; // 恢復原本 CSS 的彈性高度鎖
                if (nameTitle) nameTitle.style.height = ''; // 柔和釋放內部名稱容器高度
                if (introText) introText.style.height = ''; // 柔和釋放內部介紹容器高度
                console.log("Content Box Height Thawed. Remained Height:", contentBox.offsetHeight);
                console.log("=== In-place Update Branch Finished ===");
            }
        });
    }

    const updateActiveButtonState = () => { // 定義更新頭像按鈕高亮狀態的函式
        const allButtons = container.querySelectorAll('.head-circle'); // 取得容器內所有頭像按鈕元素
        if (allButtons && allButtons.length > 0) { // 檢查頭像按鈕是否存在且不為空
            allButtons.forEach((btn, i) => { // 遍歷所有頭像按鈕
                if (i === currentCharIdx) { // 檢查是否為當前指標角色
                    btn.classList.add('active'); // 為當前選定的角色頭像加入高亮類別
                } else {
                    btn.classList.remove('active'); // 移除其他非選定頭像的高亮類別
                }
            });
        }
    };

    updateActiveButtonState(); // 立即執行高亮狀態重設
}

/**
 * 獨立功能：實機演示影片渲染外掛（個別影片各自手動控音版）
 */
function renderGameDemoVideos() { // 定義展示影片渲染外掛函數
    // 💡 取得當前管理器最新語系字典，打通多國語言翻譯鏈
    const currentLang = (window.LangManager && window.LangManager.current) || 'zh';
    const currentLangDict = (window.translations && window.translations[currentLang]) || {};

    const demoConfigs = { // 集中管理影片區塊的結構化配置物件
        '#sec5 .content-box': { // 區塊五配置資料
            title: config.gameDemoTitle5 || (window.lang && lang.gameDemoTitle5) || '視覺小說', // 💡 100% 原封不動，保留您原本的語言與降級鏈
            src: config.gameVideoSrc5 || config.gameVideoUrl1 || "./info/test.mov" // 影片網址多欄位降級相容路徑
        },
        '#sec6 .content-box': { // 區塊六配置資料
            title: config.gameDemoTitle6 || (window.lang && lang.gameDemoTitle6) || '寂寞流星雨', // 💡 100% 原封不動，保留您原本的語言與降級鏈
            src: config.gameVideoSrc6 || config.gameVideoUrl2 || "./info/test.mov" // 影片網址多欄位降級相容路徑
        }
    };
    Object.entries(demoConfigs).forEach(([selector, videoData]) => {
        const targetElement = document.querySelector(selector);
        if (!targetElement) return;

        const scrollBoxVideo = targetElement.querySelector('video');

        if (!scrollBoxVideo) { // 若無影片元素則執行首次載入結構注入
            let videoHtml = `<h2 class="game-title game-video-title">${videoData.title}</h2>`;

            if (videoData.src) {
                // 🛠️ 升級模板字串：在 video 標籤直接寫入 controlsList 與阻斷右鍵設定，擺脫對 important 的依賴
                videoHtml += `
                    <div class="video-wrapper">
                        <video controls preload="metadata" playsinline class="game-video" draggable="false" controlsList="nodownload nofullscreen noremoteplayback" oncontextmenu="return false;"></video>
                    </div>
                `;
            }

            targetElement.innerHTML = videoHtml;

            const video = targetElement.querySelector('video');
            if (video) {
                // ========================================================
                // 🎬 可視區域動態加載控制鏈 (IntersectionObserver)
                // ========================================================
                if ('IntersectionObserver' in window) {
                    const videoObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                if (!video.dataset.loaded) {

                                    // 1. 動態注入影片網址
                                    video.src = videoData.src;

                                    // 2. 正式啟動載入通道
                                    video.load();

                                    // ========================================================
                                    // 💡 核心改寫：各別影片各自獨立調整音量 (一目了然手動控制區)
                                    // ========================================================

                                    // 🎚️ 【第 1 部影片專屬調整】：對應 sec5 的視覺小說影片
                                    if (selector === '#sec5 .content-box') {
                                        video.volume = 0.1; // 👈 手動改這裡調整第 1 部影片音量 (0.0 到 1.0)
                                        console.log(`[Audio Backstage] 影片 video01 (視覺小說) 音量已手動鎖定為: ${video.volume}`);
                                    }

                                    // 🎚️ 【第 2 部影片專屬調整】：對應 sec6 的寂寞流星雨影片
                                    if (selector === '#sec6 .content-box') {
                                        video.volume = 1.0; // 👈 手動改這裡調整第 2 部影片音量 (0.0 到 1.0)
                                        console.log(`[Audio Backstage] 影片 video02 (寂寞流星雨) 音量已手動鎖定為: ${video.volume}`);
                                    }

                                    // 3. 打上鎖定標記，防止上下捲動時重複觸發
                                    video.dataset.loaded = "true";
                                }
                            } else {
                                if (!video.paused) {
                                    video.pause(); // 移出視線暫停
                                }
                            }
                        });
                    }, { threshold: 0.1 });

                    videoObserver.observe(targetElement);
                }
            }
        } else { // 處理非首次載入語系切換邏輯
            const titleEl = targetElement.querySelector('.game-video-title'); // 取得現有的影片標題元素
            if (titleEl) {
                titleEl.textContent = videoData.title; // 僅更新標題文字內容不重構結構
            }
        }
    });
}




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

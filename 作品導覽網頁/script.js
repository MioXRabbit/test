
       /**
       * 【 1. 自定義內容編輯區 】
       * 修改此處即可更換全站所有文字、路徑與連結
       */


       /* ============================================================
       【 網頁核心運作邏輯 - 完整逐行註解版 】
       ============================================================ */


// ==========================================
// ⚡ 戰略性精準圖片預熱（全相容、不塞車綠色通道）
// ==========================================

// 1. 預熱：遊戲介紹區塊的兩張作品 LOGO 小圖
const imgCache1 = new Image();
const imgCache2 = new Image();
if (config.gameIntroSubImg1) imgCache1.src = config.gameIntroSubImg1;
if (config.gameIntroSubImg2) imgCache2.src = config.gameIntroSubImg2;

// 2. ⚡ 關鍵新增：預熱全站導覽列的所有 Icon 圖示
// 遍歷 config.nav 裡面所有的圖示網址，一開網頁就強迫瀏覽器在背景 0.01 秒悄悄下載好
if (config.nav && config.nav.length > 0) {
    config.nav.forEach(item => {
        if (item.icon) {
            const navIconCache = new Image();
            navIconCache.src = item.icon;
        }
    });
}

// ❌ 依然維持最高防禦：絕對不要在這裡預熱角色立繪、大圖或 Podcast 音檔，確保大背景圖享有最高載入優先權！



/**
 * 1. 初始化進入點
 * 確保 HTML 結構載入後，依序執行各個功能模組
 */

// ⚡ 關鍵新增：首次載入旗標，用來防止使用者在網頁中段「切換語系」時，畫面又被無故拉回頂端
let isFirstLoad = true;

// 定義一個全域的中央渲染調度器
function runAllRenderModules() {
    // 優先執行：不需要連網、本地就能跑的功能
    [
        renderNav,
        /*renderStaff,*/
        renderStaticContent,
        renderGameDemoVideos, // 負責 sec5 與 sec6 實機演示影片與標題注入
        initMarquee
    ].forEach(fn => {
        if (typeof fn === 'function') fn();
    });

    // 每次語系切換時，預設重新渲染第一個角色的文字
    if (typeof renderChar === 'function' && config.chars?.length) {
        renderChar(0);
    }

    // 每次語系切換時，重新繪製 Podcast 列表文字
    if (typeof renderPodcastList === 'function') {
        renderPodcastList();
    }

    // 💡 安全防錯：確保按鈕文字在每次畫面重繪時，都能跟隨 LangManager 的狀態對齊
    const btn = document.getElementById('langToggleBtn');
    if (btn && window.LangManager) {
        btn.innerText = window.LangManager.current === 'zh' ? 'EN' : '繁中';
    }

    // ⚡ 終極關鍵修正：擊穿 iOS Safari 強制捲動到底部的漏洞，並強制鎖定在第一頁 sec0
    // 如果是網頁第一次載入，且所有 DOM 節點都被暴力注入完畢後
    if (isFirstLoad) {
        // 利用雙重 requestAnimationFrame 確保 iOS 已經完成畫面的重繪與排版判定
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // 1. 100% 強制將網頁視窗重設並鎖定在最頂端 (0, 0)
                window.scrollTo(0, 0);

                // 2. ⚡ 核心功能新增：精準抓取第一頁的 HTML 節點，強迫瀏覽器把焦點吸附鎖定在 sec0 上
                const firstSection = document.getElementById('sec0');
                if (firstSection) {
                    firstSection.scrollIntoView({ block: 'start', inline: 'nearest' });
                }

                // 3. 成功歸位後，將旗標設為 false，未來使用者點擊語系切換時就不會再受到干涉
                isFirstLoad = false;
            });
        });
    }
}
// 監聽 1：當網頁首次載入完成
document.addEventListener('DOMContentLoaded', () => {
    // 執行所有畫面渲染
    runAllRenderModules();

    /**
 * 💡 導覽列自由收縮核心（全新升級：支援 LOGO 點擊開關、保留所有既有操作）
 */
    function initNavToggleLogic() {
        // 1. 精準抓取您的導覽列主容器與新綁定的 LOGO 按鈕
        const navContainer = document.getElementById('nav-container');
        const logoBtn = document.getElementById('logoBtn');
        const navList = document.getElementById('navList');

        if (!navContainer) return;

        // 定義一個統一的關閉動作，避免 iOS 重複觸發
        const closeMenu = () => {
            navContainer.classList.remove('nav-open');
        };

        // 2. ⚡ 全新加入：點擊獨立 LOGO 負責「開啟 / 關閉」導覽列
        if (logoBtn) {
            logoBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 💡 關鍵：阻止事件冒泡，防止立刻觸發下方的外部關閉鎖
                navContainer.classList.toggle('nav-open');
            });
        }

        // 2. ⚡ 針對 iOS 核心優化：點擊 / 觸控選單內部的單一選項，0 秒立刻收回
        if (navList) {
            const handleItemClick = (e) => {
                // 多重保險判定：只要觸碰/點擊到 nav-item、li 或 a 標籤
                if (e.target.closest('.nav-item') || e.target.closest('li') || e.target.closest('a')) {
                    // 💡 關鍵：先執行收回動畫，不要阻斷網頁原生的錨點跳轉
                    closeMenu();
                }
            };

            // 桌機與 Android 使用
            navList.addEventListener('click', handleItemClick);
            // ⚡ iOS 移動端專用防禦線：使用 touchstart 繞過 iOS 的 300ms 點擊延遲
            navList.addEventListener('touchstart', handleItemClick, { passive: true });
        }

        // 4. 完美閉合鎖：點擊導覽列與 LOGO 以外的任何地方，通通自動收回選單
        const closeMenuHandler = (e) => {
            // 💡 修正關鍵：如果點擊的地方「不包含」在選單內，且「不包含」在 LOGO 內，才判定為點擊外部空白
            if (!navContainer.contains(e.target) && (!logoBtn || !logoBtn.contains(e.target))) {
                navContainer.classList.remove('nav-open');
            }
        };

        window.addEventListener('click', closeMenuHandler);
        // ⚡ iOS 外部點擊防線：確保在 iOS 螢幕滑動或觸碰其他空白處時也能順暢收回
        window.addEventListener('touchstart', closeMenuHandler, { passive: true });
    }


    // 💡 記得在您的 DOMContentLoaded 陣列或初始化邏輯中呼叫此函數：
    initNavToggleLogic();

    // 啟動核心邏輯 (捲動監測等只需執行一次的功能)
    if (typeof setupCoreLogic === 'function') setupCoreLogic();
    // if (typeof initGameLoader === 'function') initGameLoader();
});

// 💡 監聽 2：當 LangManager 觸發語系改變時，0 秒立刻重新渲染所有文字（iOS 絲滑秒切關鍵）
window.addEventListener('languageChanged', () => {
    runAllRenderModules();
});



/**
 * 2. 導覽列渲染 - 智慧型多語系精準替換版
 * 完美保留原有 HTML 結構與錨點跳轉，徹底根除切換語言時 Icon 重新載入與閃爍問題
 */
function renderNav() {
    const navList = document.getElementById('navList');
    if (!navList || !config.nav) return;

    // 1. 核心判斷：檢查畫面上是否「已經有」產生好的導覽選項了？
    const existingItems = navList.querySelectorAll('.nav-item');

    if (existingItems.length === 0) {
        // ===【首次載入網頁】===
        // 只有第一次開啟網頁時，才執行完整的 HTML 結構與 Icon 圖片注入
        // 因為頂端已經用 Image 物件預熱了，這裡 src 指定的當下，圖片會直接從記憶體 0 秒秒開！
        navList.innerHTML = config.nav.map((item, i) => `
            <a class="nav-item" href="#sec${i}">
                <div class="nav-icon"><img src="${item.icon}" alt="icon"></div>
                <span class="nav-text">${item.name}</span>
            </a>
        `).join('');
    } else {
        // ===【非首次載入（點擊切換語言時）】===
        // ⚡ 結構鎖定：所有的 <a> 標籤、連結、<img> Icon 通通留在原地，100% 不重新載入
        const textElements = navList.querySelectorAll('.nav-text');

        // 僅僅用 textContent 更新文字內容！Icon 圖片連碰都不會被碰到
        config.nav.forEach((item, index) => {
            if (textElements[index]) {
                textElements[index].textContent = item.name;
            }
        });
    }
}


/**
 * 3. 靜態文字渲染 - 標題位置調換版
 * 最終修正版：精準對齊 config.introSubtitle 的大小寫，完美點亮英文副標題
 */
function renderStaticContent() {
    // === 區塊 1 ===
    const sec1Box = document.querySelector('#sec1 .content-box');
    if (sec1Box) {
        let h1 = sec1Box.querySelector('h1');
        let sub = sec1Box.querySelector('.sub-title');
        let p = sec1Box.querySelector('.p-text');

        // 如果結構不存在（首次載入），完美補回包含 class="sub-title" 的副標題標籤
        if (!h1 || !sub || !p) {
            sec1Box.innerHTML = `<h1></h1><div class="sub-title"></div><p class="p-text"></p>`;
            h1 = sec1Box.querySelector('h1');
            sub = sec1Box.querySelector('.sub-title');
            p = sec1Box.querySelector('.p-text');
        }

        // 僅替換純文字，完全鎖定你的 HTML 結構與 CSS 樣式
        if (h1) h1.textContent = config.introTitle;

        // ⚡ 終極關鍵修正：精準對齊你的欄位名稱（小寫 t 的 introSubtitle），讓中英文翻譯順暢切換
        if (sub) sub.textContent = config.introSubtitle;

        if (p) p.textContent = config.introText;
    }

    // === 區塊 3 ===
    const sec3Box = document.querySelector('#sec3 .content-box');
    if (sec3Box) {
        const hasImgWrap = sec3Box.querySelector('.sub-title-img-wrap');
        if (!hasImgWrap) {
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
        }
        const h1 = sec3Box.querySelector('h1');
        const p = sec3Box.querySelector('.p-text');
        if (h1) h1.textContent = config.gameIntroTitle;
        if (p) p.textContent = config.gameIntroText;
    }
}


/**
 * 4. Podcast 列表渲染 - 全平台相容終極完美版（⚡ 完美找回 iOS 播放進度條與總時間）
 * 徹底移除所有寫死的預設字樣，精準對齊 HTML 的 ID，找回專屬大框架
 */
function renderPodcastList() {
    const container = document.getElementById('podcast-container');
    // 安全檢查
    if (!container || !config.podcastList || config.podcastList.length === 0) return;

    // 1. 精準抓取 HTML 中帶有 ID 的 H1 標籤
    const sectionTitleEl = document.getElementById('podcastSectionTitle');
    if (sectionTitleEl && config.podcastSectionTitle) {
        sectionTitleEl.textContent = config.podcastSectionTitle;
    }

    // 2. 智慧型多語系判定：檢查畫面上是否「已經有」產生好的滾動盒子了？
    const scrollBox = container.querySelector('.podcast-scroll-box');

    if (!scrollBox) {
        // ===【首次載入網頁】===
        const listHtml = config.podcastList.map(item => `
            <div class="podcast-item">
                <img src="${item.cover}" style="width: 65px; height: 65px; border-radius: 5px; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.5);">
                <div style="flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center; gap: 10px;">
                    <h4 class="podcast-episode-title">${item.title}</h4>
                    <audio controls preload="metadata" playsinline src="${item.audio}"></audio>
                </div>
            </div>
        `).join('');

        // 注入大結構
        container.innerHTML = `<div class="podcast-scroll-box" style="width: 100%; box-sizing: border-box;">${listHtml}</div>`;

        // ⚡ 3. 終極修正：專門防禦 iOS 的「進度條異步喚醒監聽器」
        container.querySelectorAll('audio').forEach(audio => {
            audio.addEventListener('play', function handlePlayIntercept() {
                // 如果點擊時發現總時間未就緒（isNaN 為 true 代表進度條反白消失）
                if (isNaN(this.duration) || this.duration === 0 || this.readyState === 0) {
                    const currentSrc = this.src;

                    // 建立一次性異步監聽：等 iOS 重新跟 SoundOn 握手並成功拿到長度（Metadata）的瞬間
                    this.addEventListener('loadedmetadata', function onMetadataLoad() {
                        // 此時 iOS 已經知道這首歌有多長了，100% 點亮進度條，這時候呼叫播放就絕對不會再反白！
                        this.play().catch(err => console.log("iOS Native Seek Bar Enabled:", err));
                        this.removeEventListener('loadedmetadata', onMetadataLoad);
                    });

                    // 重新刷新網址通道，驅動 loadedmetadata 事件觸發
                    this.src = '';
                    this.src = currentSrc;
                    this.load();
                }

                // 執行一次後自行銷毀此攔截器，把控制權完整還給使用者的日常操作
                this.removeEventListener('play', handlePlayIntercept);
            });
        });
    } else {
        // ===【非首次載入（點擊切換語言時）】===
        // 結構、封面圖、播放器全部留在原地（不重載、音樂不停播）
        const titleElements = scrollBox.querySelectorAll('.podcast-episode-title');
        config.podcastList.forEach((item, index) => {
            if (titleElements[index]) {
                titleElements[index].textContent = item.title;
            }
        });
    }

    // 確保容器高度自適應
    container.style.height = "auto";
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
 * 6. 角色展示區渲染函數 - 智慧型多語系精準替換版
 * 徹底解決切換語言時頭像按鈕、大立繪重新載入與閃爍的效能地雷
 */
function renderChar(idx) {
    // 取得角色資料與 DOM 元素
    const c = config.chars?.[idx];
    const container = document.getElementById('char-content');
    const template = document.getElementById('char-template');

    if (!c || !container || !template) return;

    // ⚡ 核心判斷：檢查網頁上是不是「已經有」產生過角色展示的實體結構了？
    const existingLayout = container.querySelector('.char-layout');

    if (!existingLayout) {
        // ===【首次載入網頁】===
        // 只有第一次開啟網頁時，才從模板克隆一份新的完整結構，並放入容器
        const clone = template.content.cloneNode(true);

        // 填入大圖與文字內容
        clone.querySelector('.main-img').src = c.m;
        clone.querySelector('.char-name-title').textContent = c.n;
        clone.querySelector('.char-intro').textContent = c.i;

        // 動態生成頭像按鈕群組（只在首次載入時生成一次）
        const btnWrap = clone.querySelector('.char-btn-wrap');
        config.chars.forEach((char, i) => {
            const btn = document.createElement('div');
            btn.className = `head-circle ${i === idx ? 'active' : ''}`;
            btn.onclick = () => renderChar(i); // 綁定點擊事件
            btn.innerHTML = `<img src="${char.h}" alt="head">`;
            btnWrap.appendChild(btn);
        });

        // 放入實體容器，並觸發進場動畫
        container.innerHTML = '';
        container.appendChild(clone);
        container.classList.add('reveal');
    } else {
        // ===【非首次載入（不論是手動換角色，還是點擊切換語言）】===
        // ⚡ 結構與所有頭像圖片死死鎖在原地，100% 絕對不重複載入！

        // 1. 如果是因為「點擊別的角色頭像」而觸發
        // 我們直接精準更新大立繪的圖片路徑
        const mainImg = existingLayout.querySelector('.main-img');
        if (mainImg && mainImg.getAttribute('src') !== c.m) {
            mainImg.src = c.m;
        }

        // 2. ⚡ 精準更新中英文文字內容，絕對不用 innerHTML 沖刷掉圖片
        const nameTitle = existingLayout.querySelector('.char-name-title');
        const introText = existingLayout.querySelector('.char-intro');
        if (nameTitle) nameTitle.textContent = c.n;
        if (introText) introText.textContent = c.i;

        // 3. 智慧校正頭像按鈕的 active 高亮狀態（不管是換語言還是換人，都會自動對齊）
        const buttons = existingLayout.querySelectorAll('.head-circle');
        buttons.forEach((btn, i) => {
            if (i === idx) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}



/**
 * 獨立功能：實機演示影片渲染外掛（智慧型多語系鎖定 + ⚡ iOS 畫面卡死強制激活版）
 * 負責在 sec5 與 sec6 注入大標題與原生控制面板影片，並在滾動進場時強制重新裝載，根除「有進度條但畫面卡住」的 iOS 漏洞
 */
function renderGameDemoVideos() {
    const demoConfigs = {
        '#sec5 .content-box': {
            title: config.gameDemoTitle5 || '實機演示',
            src: config.gameVideoSrc5
        },
        '#sec6 .content-box': {
            title: config.gameVideoSrc6 || '實機演示',
            src: config.gameVideoSrc6
        }
    };

    Object.entries(demoConfigs).forEach(([selector, videoData]) => {
        const targetElement = document.querySelector(selector);
        if (!targetElement) return;

        // 1. 智慧判定：檢查這個 content-box 裡面是否「已經有」產生好的影片標籤了？
        const scrollBoxVideo = targetElement.querySelector('video');

        if (!scrollBoxVideo) {
            // ===【首次載入網頁】===
            const videoHtml = `
                <h2 class="game-title game-video-title"></h2>
                ${videoData.src ? `
                    <div class="video-wrapper">
                        <!-- ⚡ 關鍵修正 1：移除 preload="metadata"，改為 preload="none" 阻止 iOS 在一開網頁就建立錯誤的快取通道 -->
                        <video src="${videoData.src}" controls preload="none" playsinline class="game-video"></video>
                    </div>
                ` : ''}
            `;
            targetElement.innerHTML = videoHtml;

            // 完美保留並升級：你原本精心設計的滾動交叉監測器（IntersectionObserver）
            const video = targetElement.querySelector('video');
            if (video && 'IntersectionObserver' in window) {
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            
                            // ⚡ 終極關鍵修正 2：當使用者滑到這一頁時，強迫 iOS 重新加載影片媒體源
                            // 這能徹底擊穿 iOS 的視訊軌斷流 Bug，強制重新下載正確的畫面與進度條，100% 點亮畫面！
                            video.load();

                            // 核心控制：每次滾動到該頁面，強制將時間軸拉回最開頭（第 0 秒）
                            video.currentTime = 0;
                            // 核心控制：強制暫停，等待使用者親自點擊控制列播放
                            video.pause();
                        } else {
                            // 當使用者離開該頁面時，自動暫停播放，節省後台效能
                            video.pause();
                        }
                    });
                }, { threshold: 0.1 });

                videoObserver.observe(targetElement);
            }
        } else {
            // ===【非首次載入（點擊切換語言時）】===
            // ⚡ 結構與影片完全鎖定在原地！100% 絕對不重新載入、音樂不中斷、進度不消失
            const titleEl = targetElement.querySelector('.game-video-title');
            if (titleEl) {
                titleEl.textContent = videoData.title;
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
    const content = document.getElementById('marquee-content');
    const clone = document.getElementById('marquee-content-clone');
    if (!content || !clone) return;

    const txt = config.marqueeText + "　";
    const fullTxt = txt.repeat(10);

    content.innerHTML = fullTxt;
    clone.innerHTML = fullTxt;
}


/**
 * 9. 核心互動邏輯 (iOS 相容與滿版吸附修復版 + ⚡ 桌機極致寬鬆、行動端原生放行版)
 * 功能：整合區塊進入偵測 (IntersectionObserver) 與全域捲動百分比監聽，並完美解除 iOS 觸控死鎖
 */
function setupCoreLogic() {
    const bg = document.getElementById('bg');
    const bar = document.getElementById('marquee-bar');

    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    const sections = Array.from(document.querySelectorAll('section'));

    // --- A. 建立區塊進入觀察器 ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target: t, isIntersecting: isVisible }) => {
            const box = t.querySelector('.content-box');
            if (box) box.classList.toggle('reveal', isVisible);

            if (isVisible) {
                const currentSectionIndex = sections.indexOf(t);
                navItems.forEach((item, index) => {
                    item.classList.toggle('active', index === currentSectionIndex);
                });

                if (bg) {
                    bg.style.filter = `brightness(${t.id === 'sec0' ? 0.8 : 0.3})`;
                }
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(sec => observer.observe(sec));

    // --- B. 全域捲動進度監聽 ---
    const scrollContainer = document.body;

    scrollContainer.addEventListener('scroll', () => {
        const top = scrollContainer.scrollTop || document.documentElement.scrollTop;
        const height = scrollContainer.scrollHeight - window.innerHeight;
        const indicator = document.getElementById('marquee-indicator');

        if (indicator && height > 0) {
            const progress = top / height;
            const maxMove = window.innerHeight - 60;
            const moveAmount = maxMove * progress;
            indicator.style.transform = `translateY(${moveAmount}px)`;
        }
    });

    // --- ⚡ 關鍵修正 C：全平台完美相容切頁控制（桌機極速放寬、行動端完美避雷） ---
    // 💡 判定當前裝置是否為「觸控行動端」（手機、平板、特別是 iOS）
    const isMobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isMobileDevice) {
        // ===【僅在桌機版啟動：滑鼠滾輪/觸控板極致寬鬆判定】===
        let isScrollLocked = false;
        const scrollCooldown = 800; // 0.8 秒冷卻

        scrollContainer.addEventListener('wheel', (e) => {
            if (isScrollLocked) return;

            // 寬鬆門檻：只要滾動增量絕對值大於 5 像素，立刻觸發切頁意圖！
            if (Math.abs(e.deltaY) > 5) {
                e.preventDefault(); // 阻止桌機原生緩慢的滾動，改由我們的高速通道接管

                const activeNav = document.querySelector('.nav-item.active');
                const currentIndex = activeNav ? navItems.indexOf(activeNav) : 0;
                let targetIndex = currentIndex;

                if (e.deltaY > 0) {
                    targetIndex = currentIndex + 1; // 去下一頁
                } else {
                    targetIndex = currentIndex - 1; // 去上一頁
                }

                if (targetIndex >= 0 && targetIndex < sections.length) {
                    isScrollLocked = true;

                    // ⚡ 拋棄會跟 CSS 衝突的 scrollIntoView，改用最純粹的實體高度像素進行計算與賦值
                    // 這樣既能達成一滑就切，又能在桌機上維持完美流暢度
                    const targetTop = sections[targetIndex].offsetTop;
                    scrollContainer.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });

                    setTimeout(() => { isScrollLocked = false; }, scrollCooldown);
                }
            }
        }, { passive: false });
    } else {
        // ===【在行動端（iOS / Android）】===
        // ⚡ 什麼 JS 觸控干涉程式碼都不要寫！讓它空白！
        // 百分之百放行給手機系統底層最絲滑、優化最好的原生 CSS `scroll-snap-type` 去跑。
        // 這能確保 iPhone 開啟網頁時 100% 復活，可以非常順暢、毫無死鎖地用手指滑動上下頁面。
    }

    // --- D. 初始化狀態校正 ---
    scrollContainer.dispatchEvent(new Event('scroll'));
}

   
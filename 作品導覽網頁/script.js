
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

// 定義一個全域的中央渲染調度器

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

    // ⚡ 終極關鍵修正：擊穿 iOS Safari 強制捲動到底部的漏洞
    // 如果是網頁第一次載入，且所有 DOM 節點都被暴力注入完畢後
    if (isFirstLoad) {
        // 利用雙重 requestAnimationFrame 確保 iOS 已經完成畫面的重繪與排版判定
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // 100% 強制將網頁視窗重設並鎖定在最頂端 (0, 0)
                window.scrollTo(0, 0);
                // 成功歸位後，將旗標設為 false，未來使用者點擊語系切換時就不會再受到干涉
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
 * 4. Podcast 列表渲染 - 智慧型多語系精準替換版
 * 徹底根除切換語言時封面圖片重新載入（閃爍）與音樂中斷（進度條歸零）的經典地雷
 */
function renderPodcastList() {
    const container = document.getElementById('podcast-container');
    if (!container || !config.podcastList || config.podcastList.length === 0) return;

    // 1. 總標題依然精準更新文字，不破壞 H1 標籤
    const sectionTitleEl = document.getElementById('podcastSectionTitle');
    if (sectionTitleEl && config.podcastSectionTitle) {
        sectionTitleEl.textContent = config.podcastSectionTitle;
    }

    // 2. ⚡ 核心判斷：檢查畫面上是否「已經有」渲染好的滾動盒子了？
    const scrollBox = container.querySelector('.podcast-scroll-box');

    if (!scrollBox) {
        // ===【首次載入網頁】===
        // 只有在第一次開啟網頁、畫面上完全沒東西時，才需要完整注入 HTML 結構
        const listHtml = config.podcastList.map(item => `
            <div class="podcast-item">
                <img src="${item.cover}" style="width: 65px; height: 65px; border-radius: 5px; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.5);">
                <div style="flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center; gap: 10px;">
                    <!-- 💡 特意加上 class="podcast-episode-title" 標記，方便切換語言時精準鎖定 -->
                    <h4 class="podcast-episode-title">${item.title}</h4>
                    <audio controls preload="metadata" playsinline src="${item.audio}"></audio>
                </div>
            </div>
        `).join('');

        // 將清單安全放入大框架
        container.innerHTML = `<div class="podcast-scroll-box" style="width: 100%; box-sizing: border-box;">${listHtml}</div>`;

        // 建立全平台相容（相容 iOS 轉址與本機 CORS）的通道校正監聽器
        container.querySelectorAll('audio').forEach(audio => {
            audio.addEventListener('play', function handlePlayIntercept() {
                if (isNaN(this.duration) || this.duration === 0 || this.readyState === 0) {
                    const currentSrc = this.src;
                    this.src = '';
                    this.src = currentSrc;
                    this.play().catch(err => console.log("Bypass play error:", err));
                }
                this.removeEventListener('play', handlePlayIntercept);
            });
        });
    } else {
        // ===【非首次載入（點擊切換語言時）】===
        // ⚡ 奇蹟發生：大框架、封面圖、播放器全部留在原地（不重載、不閃爍）
        // 我們直接抓出畫面上現有的所有 h4 標籤
        const titleElements = scrollBox.querySelectorAll('.podcast-episode-title');

        // 僅僅更新這些 h4 的 textContent 文字內容！
        config.podcastList.forEach((item, index) => {
            if (titleElements[index]) {
                // 將畫面的文字直接更換為 config 最新語系（中文或英文）的單集名稱
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
* 6. 角色展示區渲染函數
* @param {number} idx - 當前選中的角色索引
*/
function renderChar(idx) {
    // 取得角色資料與 DOM 元素
    const c = config.chars?.[idx];
    const container = document.getElementById('char-content');
    const template = document.getElementById('char-template');

    if (!c || !container || !template) return;

    // 1. 從模板克隆一份新的結構
    const clone = template.content.cloneNode(true);

    // 2. 填入大圖與文字內容
    clone.querySelector('.main-img').src = c.m;
    clone.querySelector('.char-name-title').textContent = c.n;

    // 3. 填入介紹文字 (textContent 會安全地處理字串，搭配 CSS 即可換行)
    clone.querySelector('.char-intro').textContent = c.i;

    // 4. 動態生成頭像按鈕群組
    const btnWrap = clone.querySelector('.char-btn-wrap');
    config.chars.forEach((char, i) => {
        const btn = document.createElement('div');
        // 如果是當前選中項，加上 active 類別
        btn.className = `head-circle ${i === idx ? 'active' : ''}`;
        btn.onclick = () => renderChar(i); // 綁定點擊事件
        // ⚡ 關鍵修正：加入 loading="lazy" 告訴瀏覽器這是不需要搶頻寬的小頭像，有空再載入
        btn.innerHTML = `<img src="${char.h}" alt="head" loading="lazy">`;
        btnWrap.appendChild(btn);
    });

    // 5. 更新畫面上實體容器的內容
    // 先清空舊內容，再放入填充好的克隆物件
    container.innerHTML = '';
    container.appendChild(clone);

    // 6. 確保 content-box 觸發 CSS 淡入動畫
    container.classList.add('reveal');
}




/**
 * 獨立功能：實機演示影片渲染外掛（進度條 + 進場重置 + 音量不干涉版）
 * 負責在 sec5 與 sec6 注入大標題與原生控制面板影片，僅負責進場時間軸歸零
 */
function renderGameDemoVideos() {
    const demoContents = {
        '#sec5 .content-box': `
            <h2 class="game-title">${config.gameDemoTitle5 || '實機演示'}</h2>
            ${config.gameVideoSrc5 ? `
                <div class="video-wrapper">
                    <!-- 僅保留控制面板與防擠壓屬性，不干涉自動播放與靜音 -->
                    <video src="${config.gameVideoSrc5}" controls playsinline class="game-video"></video>
                </div>
            ` : ''}
        `,
        '#sec6 .content-box': `
            <h2 class="game-title">${config.gameDemoTitle6 || '實機演示'}</h2>
            ${config.gameVideoSrc6 ? `
                <div class="video-wrapper">
                    <video src="${config.gameVideoSrc6}" controls playsinline class="game-video"></video>
                </div>
            ` : ''}
        `
    };

    Object.entries(demoContents).forEach(([selector, videoHtml]) => {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
            targetElement.innerHTML = videoHtml;

            const video = targetElement.querySelector('video');

            // 建立交叉監測器，只處理滾動時的進度歸零與暫停
            if (video && 'IntersectionObserver' in window) {
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {

                            // 核心控制：每次滾動到該頁面，強制將時間軸拉回最開頭（第 0 秒）
                            video.currentTime = 0;

                            // 核心控制：強制暫停，等待使用者親自點擊控制列播放
                            video.pause();

                        } else {
                            // 當使用者離開該頁面時，自動暫停播放，節省後台效能
                            video.pause();
                        }
                    });
                }, {
                    threshold: 0.1
                });

                videoObserver.observe(targetElement);
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
 * 9. 核心互動邏輯 (iOS 相容與滿版吸附修復版)
 * 功能：整合區塊進入偵測 (IntersectionObserver) 與全域捲動百分比監聽
 */
function setupCoreLogic() {
    const bg = document.getElementById('bg');
    const bar = document.getElementById('marquee-bar');

    // 💡 關鍵修復點 1：將所有導覽列選項轉為陣列，方便後續直接用索引值（Index）比對
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    // 💡 關鍵修復點 2：將所有區塊轉為陣列，精準抓取總高度
    const sections = Array.from(document.querySelectorAll('section'));

    // --- A. 建立區塊進入觀察器 ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target: t, isIntersecting: isVisible }) => {
            // 1. 內容方框動畫：進入視窗時加上 .reveal 類別觸發 CSS 動畫
            const box = t.querySelector('.content-box');
            if (box) box.classList.toggle('reveal', isVisible);

            // 2. 當區塊完全進入視窗時的連動效果
            if (isVisible) {
                // 💡 關鍵修復點 3：改用區塊在陣列中的「索引位置」來精準點亮對應的導覽列項目
                // 這能完美相容 iOS 無 href 錨點的設計，且支援語言切換重繪
                const currentSectionIndex = sections.indexOf(t);

                navItems.forEach((item, index) => {
                    item.classList.toggle('active', index === currentSectionIndex);
                });

                // 背景亮度切換：Home (sec0) 較亮，其餘內容頁調暗以利閱讀
                if (bg) {
                    bg.style.filter = `brightness(${t.id === 'sec0' ? 0.8 : 0.3})`;
                }
            }
        });
    }, { threshold: 0.4 }); // 設定偵測門檻為 40%

    // 將觀察器綁定至所有 section 標籤
    sections.forEach(sec => observer.observe(sec));

    // --- B. 全域捲動進度監聽（修復捲動與進度方框卡死） ---
    // 💡 關鍵修復點 4：在滿版高度鎖架構下，滾動事件發生在 document.body 上
    const scrollContainer = document.body;

    scrollContainer.addEventListener('scroll', () => {
        // 💡 關鍵修復點 5：從滾動主體讀取實際的 scrollTop 與總高度
        const top = scrollContainer.scrollTop || document.documentElement.scrollTop;
        const height = scrollContainer.scrollHeight - window.innerHeight;
        const indicator = document.getElementById('marquee-indicator');

        if (indicator && height > 0) {
            const progress = top / height;
            // 計算位移範圍：螢幕總高度扣掉方框高度
            const maxMove = window.innerHeight - 60;
            const moveAmount = maxMove * progress;

            indicator.style.transform = `translateY(${moveAmount}px)`;
        }
    });

    // --- C. 初始化狀態校正 ---
    // 💡 關鍵修復點 6：手動觸發滾動容器的事件，確保頁面載入當下 UI 狀態即正確
    scrollContainer.dispatchEvent(new Event('scroll'));
}

   
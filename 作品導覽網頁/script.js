
       /**
       * 【 1. 自定義內容編輯區 】
       * 修改此處即可更換全站所有文字、路徑與連結
       */


       /* ============================================================
       【 網頁核心運作邏輯 - 完整逐行註解版 】
       ============================================================ */




/**
 * 1. 初始化進入點
 * 確保 HTML 結構載入後，依序執行各個功能模組
 */

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

}

// 監聽 1：當網頁首次載入完成
document.addEventListener('DOMContentLoaded', () => {
    // 執行所有畫面渲染
    runAllRenderModules();

    /**
 * 💡 專為 iOS 優化：導覽列自由收縮與空白處點擊關閉邏輯
 */
    function initNavToggleLogic() {
        const navContainer = document.getElementById('nav-container');
        const toggleBtn = document.getElementById('navToggleBtn');
        const navList = document.getElementById('navList');

        if (!navContainer || !toggleBtn) return;

        // 1. 點擊小圖示：切換（開啟或關閉）導覽列
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 💡 關鍵：阻止事件冒泡，防止立刻觸發外部關閉鎖
            navContainer.classList.toggle('nav-open');
        });

        // 2. 點擊選單內部的選項：跳轉後「自動收回」選單
        // 這裡直接對父容器進行監聽（事件代理），效能最好且不受語系切換重繪影響
        if (navList) {
            navList.addEventListener('click', (e) => {
                // 只要點擊到的是 nav-item 或裡面的文字/圖示，就執行收回
                if (e.target.closest('.nav-item')) {
                    navContainer.classList.remove('nav-open');
                }
            });
        }

        // 3. 💡 iOS 完美閉合鎖：點擊導覽列以外的任何地方，通通自動收回
        // 在滿版吸附架構下，點擊事件必須同時綁定給 window 與 document.body 確保 iOS 100% 捕捉成功
        const closeMenuHandler = (e) => {
            // 如果點擊的地方「不包含」在導覽列容器之內，就代表點到了外部空白處
            if (!navContainer.contains(e.target)) {
                navContainer.classList.remove('nav-open');
            }
        };

        window.addEventListener('click', closeMenuHandler);
        document.body.addEventListener('click', closeMenuHandler); // 針對滿版高度鎖加強捕捉
    }

    // 💡 記得在您的 DOMContentLoaded 陣列或初始化邏輯中呼叫此函數：
    // initNavToggleLogic();

    // 啟動核心邏輯 (捲動監測等只需執行一次的功能)
    if (typeof setupCoreLogic === 'function') setupCoreLogic();
    // if (typeof initGameLoader === 'function') initGameLoader();
});

// 💡 監聽 2：當 LangManager 觸發語系改變時，0 秒立刻重新渲染所有文字（iOS 絲滑秒切關鍵）
window.addEventListener('languageChanged', () => {
    runAllRenderModules();
});




/**
 * 2. 導覽列渲染
 * 負責從 config.nav 生成選單圖示、文字與連結
 */
function renderNav() {
    const navList = document.getElementById('navList');
    if (!navList || !config.nav) return;

    // 💡 關鍵優化：先清空舊語系的導覽列文字，再重新 map
    navList.innerHTML = '';

    navList.innerHTML = config.nav.map((item, i) => `
        <a class="nav-item" href="#sec${i}">
            <div class="nav-icon"><img src="${item.icon}" alt="icon"></div>
            <span class="nav-text">${item.name}</span>
        </a>
    `).join('');
}



/**
 * 3. 靜態文字渲染 - 標題位置調換版
 * 負責將區塊三的大標題與副標題圖片位置對調
 */
function renderStaticContent() {
    const contents = {
        // 區塊 1：維持原樣
        '#sec1 .content-box': `
            <h1>${config.introTitle}</h1>
            <p class="p-text">${config.introText}</p>
        `,
        // 區塊 3：【關鍵修正】將大標題 h1 調換至圖片群組的下方
        '#sec3 .content-box': `
            ${(config.gameIntroSubImg1 || config.gameIntroSubImg2) ? `
                <div class="sub-title-img-wrap">
                    ${config.gameIntroSubImg1 ? `<img class="sub-title-img" src="${config.gameIntroSubImg1}" alt="副標題1">` : ''}
                    ${config.gameIntroSubImg2 ? `<img class="sub-title-img" src="${config.gameIntroSubImg2}" alt="副標題2">` : ''}
                </div>
            ` : ''}
            <h1>${config.gameIntroTitle}</h1>
            <p class="p-text">${config.gameIntroText}</p>
        `
    };

    Object.entries(contents).forEach(([sel, html]) => {
        const el = document.querySelector(sel);
        if (el) el.innerHTML = html;
    });
}



/**
 * 4. Podcast 列表渲染 - 最終整合版
 * 解決播放器反白、內容遮擋與背景質感問題
 */
function renderPodcastList() {
    const container = document.getElementById('podcast-container');
    // 安全檢查：確保容器與資料存在
    if (!container || !config.podcastList || config.podcastList.length === 0) return;

    // 1. 生成每一集的 HTML
    const listHtml = config.podcastList.map(item => `
            <div class="podcast-item">
                <img src="${item.cover}" style="width: 65px; height: 65px; border-radius: 5px; object-fit: cover; box-shadow: 0 4px 8px rgba(0,0,0,0.5);">
                <div style="flex: 1; overflow: hidden;">
                    <h4 style="color: #68BFFF; font-size: 16px; margin-bottom: 8px; text-align: left;">${item.title}</h4>
                    <audio controls preload="none">
                        <source src="${item.audio}" type="audio/mpeg">
                    </audio>
                </div>
            </div>
        `).join('');

    // 2. 注入內容，並在最後加入 20px 的隱形空白塊確保第七集完全露出
    container.innerHTML = `
            <div class="podcast-scroll-box">
                ${listHtml}
                <div style="height: 20px; width: 100%;"></div> 
            </div>
            `;

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
        btn.innerHTML = `<img src="${char.h}" alt="head">`;
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

   
/**
 * 視覺小說啟動器設定檔 (config.js)
 * 所有的網頁內容、圖片路徑與遊戲連結皆在此統一管理
 */

// ==========================================
// 1. 各語言翻譯文本資料庫
// ==========================================
const translations = {
    zh: {
        marqueeText: "ILLUSORY LOVER FILE 2026 EDITION RELEASE",
        // 導覽列文字
        nav_home: "首頁",
        nav_concept: "策展理念",
        nav_podcast: "Podcast節目",
        nav_gameIntro: "遊戲介紹",
        nav_charIntro: "角色介紹",
        nav_visualNovel: "視覺小說",
        nav_meteor: "寂寞流星雨",
        // nav_staff: "製作團隊",
        // 策展理念
        introTitle: "策展理念",
        introSubtitle: "在數位餘溫中，尋回真實的自我。",
        introText: "現代的愛與孤寂還有陪伴的形式早已跨越了實體的疆界。當我們在螢幕的微光中尋求慰藉，那份觸動心弦的情感，究其本質是真實的悸動，還是程式碼編織出的幻象？" +
                    "《虛戀協議》以此為核心命題，邀請觀者透過沉浸式互動敘事，看見虛擬的人性鏡像、重新思考愛與陪伴，最終找到自己對於科技與人類的理解。",
        // // Podcast 簡介 (預留)
        // PodcastintroTitle: "Podcast簡介",
        // PodcastintroText: "節目收錄了多位長期投入虛擬關係者者訪談紀錄，以及心理學、社會學視角的深度剖析。",
        // 遊戲介紹
        gameIntroTitle: "遊戲介紹",
        gameIntroText: "玩家將進入一個虛擬樂園，體驗與 AI 伴侶的情感羈絆。作品設計了多重分支，反映出遊玩者在面對依附關係時的心理投射。" +
                    "同時也設計了以「接住情緒」為核心的小遊戲，玩家需要讓代表情緒的流星被角色接住。每次命中時會給予分數，代表我們獲得的滿足感。",
        // ===== 第二段新增：Podcast 單集標題 =====
        podcastSectionTitle: "Podcast 展示",
        podcastTitles: [
            "EP1. 虛擬悄然出現於生活中",
            "EP2. 虛擬中的「數位鏡像」｜不受他人評判的私人空間",
            "EP3. 《在一起孤獨》｜擬社交互動與情感關係",
            "EP4. 與虛擬的「單向理解」｜另一種陪伴選擇？",
            "EP5. 《見樹又見林》｜以社會學角度理解人與科技的關係",
            "EP6. 溫柔的牢籠｜當虛擬成了唯一的避風港",
            "EP7. 回歸現實｜如何適當地與虛擬情感共處？"
        ],
        //qrcodeAlt: "掃描 QR code",

        // ===== 第二段新增：角色介紹資料 =====
        charData: [
            {
                n: "Chris",
                i: "風度翩翩的人，是酒吧裡最受歡迎的調酒師和老闆，總能給予他人最恰當的建議和飲品。\n\n" +
                    "「來杯酒嗎？感到疲憊的你。」"
            },
            {
                n: "Lydia",
                i: "品味不俗的畫家，曾經因為自己天真單純而被傷害，後來變得堅強，學會靠自己。\n\n" +
                    "「你是我最珍惜的手稿」"
            },
            {
                n: "Sophia",
                i: "看起來不好接近，實則心思細膩善感，執著於正義感的方面意外理想派女律師。\n\n" +
                    "「即使沒有這層身分，我依舊是我。」"
            }
        ],
        //// Podcast QR Code
        //qrcodeAlt: "掃描 QR code",
        // 區塊 5 & 6 標題
        gameDemoTitle5: "視覺小說",
        gameDemoTitle6: "寂寞流星雨",
        //// 遊戲載入文字
        //gameALoading: { btn: "開始遊戲", load: "系統加載中", comp: "歡迎回來" },
    //    //gameBLoading: { btn: "開始遊戲", load: "功能載入中", comp: "啟動成功" },
    //    // 製作團隊職稱
    //    staffRoles: ["總籌", "劇本", "美術 / 網頁製作", "遊戲開發", "社群 / 音效", "實體活動"]
    },
    en: {
        marqueeText: "ILLUSORY LOVER FILE 2026 EDITION RELEASE",
        // 導覽列文字
        nav_home: "Home",
        nav_concept: "Concept",
        nav_podcast: "Podcast",
        nav_gameIntro: "Game Info",
        nav_charIntro: "Characters",
        nav_visualNovel: "Visual Novel",
        nav_meteor: "Emotion Meteor",
        // nav_staff: "Staff",
        // 策展理念
        introTitle: "Curatorial Concept",
        introSubtitle: "Find your true self within the digital afterglow.",
        introText: "Today, modern love, loneliness, and companionship have crossed physical borders. Seeking solace in screen light, is our emotional stir a real heartbeat or a coded illusion?" +
                    "Centering on this, illusory lover file invites you to mirror virtual humanity, rethink intimacy, and reshape our bond with technology.",
        // // Podcast 簡介 (預留)
        // PodcastintroTitle: "Podcast Info",
        // PodcastintroText: "The program features interviews with long-term participants in virtual relationships, along with in-depth psychological and sociological analyses.",
        // 遊戲介紹
        gameIntroTitle: "Game Introduction",
        gameIntroText: "You would enter a virtual paradise of AI companionship. Multiple story branches project your attachment psychology. " +
                    "Also, enjoy a mini-game centered on catching emotions to simulate the satisfaction of being heard.",
        // ===== 第二段新增：Podcast 單集標題 (英文翻譯) =====
        podcastSectionTitle: "Podcast Playlist",
        podcastTitles: [
            "EP1. The Virtual Silently Blends into Our Lives.",
            "EP2. Digital Mirror | A Private Space Free From Judgment",
            "EP3. Alone Together | Virtual Socializing and Bonds",
            "EP4. One-Way Validation | Another Choice for Comfort?",
            "EP5. The Forest and the Trees | Tech and Sociology",
            "EP6. A Gentle Cage | The Only Virtual Haven",
            "EP7. Back to Reality | How to Coexist with Virtual Emotions?"
        ],
        qrcodeAlt: "Scan QR code",

        // ===== 第二段新增：角色介紹資料 (英文翻譯) =====
        charData: [
            {
                n: "Chris",
                i: "Elegant and charming, he is the bar's most popular bartender and owner, always serving up the perfect drinks and advice.\n\n" +
                    "'Care for a drink? You look weary.'"
            },
            {
                n: "Lydia",
                i: "A painter of refined taste. Once hurt by her own naivety, she grew strong and learned to rely on herself.\n\n" +
                    "'You are my most cherished manuscript.'"
            },
            {
                n: "Sophia",
                i: "Seemingly aloof but deeply sensitive. A female lawyer whose dedication to justice is surprisingly idealistic.\n\n" +
                    "'Even without this identity, I am still who I am.'"
            }
        ],
        //// Podcast QR Code
        //qrcodeAlt: "Scan QR code",
        // 區塊 5 & 6 標題 (英文版)
        gameDemoTitle5: "Visual Novel",
        gameDemoTitle6: "Emotion Meteor",
        //// 遊戲載入文字 (英文版)
        //gameALoading: { btn: "Start Game", load: "System Loading", comp: "Welcome Back" },
        //gameBLoading: { btn: "Start Game", load: "Features Loading", comp: "Boot Success" },
//        // 製作團隊職稱 (英文版)
//        staffRoles: ["Producer", "Screenplay", "Art & Web Development", "Game Development", "Community & Sound", "Physical Event"]
    }
};

// ==========================================
// 2. 初始化全域 config 物件與語系管理核心
// ==========================================
window.config = {};

window.LangManager = {
    // 💡 核心優化：完全移除了 localStorage。每次打開網頁「絕對強制預設繁中 'zh'」
    current: 'zh',
    
    // 💡 將冷卻狀態鎖直接內建在物件裡，預設為 false (不冷卻)
    isCooling: false,

    toggleLanguage() {
        // 1. 使用 this.isCooling 讀取狀態。如果正在冷卻，直接阻斷點擊
        if (this.isCooling) return;

        // 2. 點擊成功，立刻鎖定按鈕
        this.isCooling = true;

        // 3. 變更按鈕透明度（視覺反饋）
        const btn = document.getElementById('langToggleBtn');
        if (btn) btn.style.opacity = "2";

        // 4. 執行中英文循環切換
        const nextLang = this.current === 'zh' ? 'en' : 'zh';
        this.setLanguage(nextLang);

        // 5. 💡 設定 300 毫秒後自動將狀態解除
        // 注意：這裡必須使用箭頭函數 () =>，裡面的 this 才能正確指向 LangManager
        setTimeout(() => {
            this.isCooling = false; // 解除安全鎖
            if (btn) btn.style.opacity = "1"; // 恢復按鈕亮度
        }, 300);
    },



    setLanguage(langCode) {
        // 確保傳入值合法
        if (langCode !== 'zh' && langCode !== 'en') {
            langCode = 'zh';
        }

        this.current = langCode;
        
        //  核心優化：如果是 zh 就強制給予 zh-TW 或 zh-Hant，徹底杜絕 Edge 誤判
        if (langCode === 'zh') {
            document.documentElement.setAttribute('lang', 'zh-TW'); // 或 'zh-Hant'
        } else {
            document.documentElement.setAttribute('lang', 'en');
        }
        
        const lang = translations[langCode];
        
        // 💡 檢查點：確保 translation 檔案有對應到，防止解構死鎖
        if (!lang) {
            console.error("找不到對應的語系資源！");
            return;
        }

        Object.assign(window.config, {
            marqueeText: lang.marqueeText,

            nav: [
                { name: lang.nav_home, icon: "./icon/按鍵(回主選單).png" },
                { name: lang.nav_concept, icon: "icon_info.png" },
                { name: lang.nav_podcast, icon: "icon_mic.png" },
                { name: lang.nav_gameIntro, icon: "icon_doc.png" },
                { name: lang.nav_charIntro, icon: "icon_char.png" },
                { name: lang.nav_visualNovel, icon: "icon_game.png" },
                { name: lang.nav_meteor, icon: "icon_star.png" },
                //  { name: lang.nav_staff, icon: "icon_staff.png" }           
            ],

            introTitle: lang.introTitle,
            introSubtitle: lang.introSubtitle,
            introText: lang.introText,

            // Podcast 區塊 (保持您原本註解的狀態，需要時可在 script.js 啟用)
            // PodcastintroTitle: lang.PodcastintroTitle, 
            // PodcastintroText: lang.PodcastintroText,

            gameIntroTitle: lang.gameIntroTitle,
            gameIntroSubImg1: "./icon/LOGO_1.png",
            gameIntroSubImg2: "./icon/LOGO_2.png",
            gameIntroText: lang.gameIntroText,

            podcastSectionTitle: lang.podcastSectionTitle,
            podcastList: [
                {
                    title: lang.podcastTitles[0],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/d5ea4160-c136-4d48-94ef-9eb83b2888cf/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                {
                    title: lang.podcastTitles[1],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/b351b447-b815-4b2f-8ba3-788c406001c7/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                {
                    title: lang.podcastTitles[2],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/d047f1fc-ea4c-4fb6-a336-7ef597c2ab5e/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                {
                    title: lang.podcastTitles[3],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/41d11de2-5263-45f0-97a7-e25b80aeecdc/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                {
                    title: lang.podcastTitles[4],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/64e06ed6-fe33-4ed2-8172-fe6f03c9fbec/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                {
                    title: lang.podcastTitles[5],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/0cb76691-8e45-4468-a3ef-f945f131e9d4/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                {
                    title: lang.podcastTitles[6],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/31585920-4e67-46f3-9c74-e0cb702a2f76/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                }
            ],
            // qrcodeSrc: "./icon/PodcastQRcode.png", 
            // qrcodeAlt: lang.qrcodeAlt,

            // 【角色資料區】
            chars: [
                {
                    n: "Chris",
                    i: lang.charData[0].i,
                    m: "./info/Chris_normal_glasson.png",
                    h: "./info/QLight_Chris.png"
                },
                {
                    n: "Lydia",
                    i: lang.charData[1].i,
                    m: "./info/Lydia_normal.png",
                    h: "./info/QLight_Lydia.png"
                },
                {
                    n: "Sophia",
                    i: lang.charData[2].i,
                    m: "./info/Sophia_normal.png",
                    h: "./info/QLight_Sophia.png"
                }
            ],

            // 【全新擴充】區塊 5 & 6 實機演示資料
            gameDemoTitle5: lang.gameDemoTitle5,
            gameVideoSrc5: "./info/test.mov",
            gameDemoTitle6: lang.gameDemoTitle6,
            gameVideoSrc6: "./info/test.mov",

            // 【遊戲檔案讀取路徑設置區】
            // gameDownloads: [
            //     { id: "gameA", btnText: lang.gameALoading.btn, loadingText: lang.gameALoading.load, completeText: lang.gameALoading.comp, fileUrl: "./虛戀協議W/index.html" },
            //     { id: "gameB", btnText: lang.gameBLoading.btn, loadingText: lang.gameBLoading.load, completeText: lang.gameBLoading.comp, fileUrl: "./虛戀協議W/index.html" }
            // ],

            //// 【製作人員名單】動態對齊職稱
            //staff: [
            //    { r: lang.staffRoles[0], u: "人員A" },
            //    { r: lang.staffRoles[1], u: "人員B" },
            //    { r: lang.staffRoles[2], u: "人員C" },
            //    { r: lang.staffRoles[3], u: "人員C" },
            //    { r: lang.staffRoles[4], u: "人員C" },
            //    { r: lang.staffRoles[5], u: "人員D" }
            //],

            // === 【全新加入】全站音訊中央管理設定 === (純數值設定，不需經過翻譯)
            audioSettings: {
                defaultVolume: 0.5,
                autoUnmute: true,
                forceMuted: false
            }
        });

        // 💡 關鍵修復點 1：加強安全防錯鎖。如果在本機開啟時 HTML 還沒載入完，就先不改文字
        const btn = document.getElementById('langToggleBtn');
        if (btn) {
            btn.innerText = langCode === 'zh' ? 'EN' : '繁中';
        }

        // 💡 關鍵修復點 2：加上安全延遲通知鎖
        // 確保不論是在本機還是線上，都等到瀏覽器把 HTML 畫完後，才通知 script.js 渲染導覽列
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.dispatchEvent(new Event('languageChanged'));
            });
        } else {
            window.dispatchEvent(new Event('languageChanged'));
        }
    }
};

// 網頁開啟時，自動依據儲存的語系進行第一次初始化
window.LangManager.setLanguage(window.LangManager.current);

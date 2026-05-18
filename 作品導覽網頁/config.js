/**
 * 視覺小說啟動器設定檔 (config.js)
 * 所有的網頁內容、圖片路徑與遊戲連結皆在此統一管理
 */
// 以上為區塊註解：說明此檔案為 config.js 及其主要用途

// ==========================================
// 1. 各語言翻譯文本資料庫
// ==========================================
// 以上為單行註解：分隔線與標題，標示此區塊為第一部分「各語言翻譯文本資料庫」

const translations = {
    // 宣告一個名為 translations 的常數，其值為一個物件（Object），用來存放各語系的翻譯

    zh: {
        // 定義繁體中文（zh）語系的翻譯內容物件

        shieldText:"請將畫面旋轉成橫向以繼續觀看",

        marqueeText: "ILLUSORY LOVER FILE 2026 EDITION RELEASE",
        // 設定跑馬燈文字（marqueeText）的內容

        // 💡 追加於繁體中文（zh-TW）設定區塊中
        wakeLockOn: "休眠開啟中",   // 當按鈕處於常規狀態（畫面會正常自動變暗熄滅）時顯示的文字
        wakeLockOff: "休眠關閉中",  // 當按鈕處於點亮狀態（畫面已被強制鎖定保持常亮）時顯示的文字


        // 導覽列文字
        // 單行註解：標示以下為導覽列相關的翻譯文字

        nav_home: "首頁",
        // 設定「首頁」導覽項目的文字

        nav_concept: "策展理念",
        // 設定「策展理念」導覽項目的文字

        nav_podcast: "Podcast節目",
        // 設定「Podcast節目」導覽項目的文字

        nav_gameIntro: "遊戲介紹",
        // 設定「遊戲介紹」導覽項目的文字

        nav_charIntro: "角色介紹",
        // 設定「角色介紹」導覽項目的文字

        nav_visualNovel: "視覺小說",
        // 設定「視覺小說」導覽項目的文字

        nav_meteor: "寂寞流星雨",
        // 設定「寂寞流星雨」導覽項目的文字

        // nav_staff: "製作團隊",
        // 遭註解掉的導覽列文字：原本預留給「製作團隊」，目前不啟用

        // 策展理念
        // 單行註解：標示以下為策展理念區塊的翻譯文字

        introTitle: "策展理念",
        // 設定策展理念區塊的主標題

        introSubtitle: "在數位餘溫中，尋回真實的自我。",
        // 設定策展理念區塊的副標題

        introText: "現代的愛與孤寂還有陪伴的形式早已跨越了實體的疆界。當我們在螢幕的微光中尋求慰藉，那份觸動心弦的情感，究其本質是真實的悸動，還是程式碼編織出的幻象？" +
            "《虛戀協議》以此為核心命題，邀請觀者透過沉浸式互動敘事，看見虛擬的人性鏡像、重新思考愛與陪伴，最終找到自己對於科技與人類的理解。",
        // 設定策展理念區塊的詳細介紹長文本，並使用加號（+）將兩段字串進行連接

        // // Podcast 簡介 (預留)
        // PodcastintroTitle: "Podcast簡介",
        // PodcastintroText: "節目收錄了多位長期投入虛擬關係者者訪談紀錄，以及心理學、社會學視角的深度剖析。",
        // 以上三行皆遭雙斜線註解：預留的 Podcast 簡介標題與內容，目前不啟用

        // 遊戲介紹
        // 單行註解：標示以下為遊戲介紹區塊的翻譯文字

        gameIntroTitle: "遊戲介紹",
        // 設定遊戲介紹區塊的主標題

        gameIntroText: "玩家將進入一座以 AI 伴侶為核心的虛擬世界，透過視覺小說式的互動敘事，與不同的虛擬角色建立情感連結。作品以三位具象化的 AI 角色為核心，呈現人們在與這些角色互動的過程中，如何逐漸投射情感、形成依附，並建構對親密關係的想像。" +
            "此外，作品亦結合名為《寂寞流星雨》的互動小遊戲，以「情緒被接住」為核心概念。玩家需要操控象徵情緒的流星方向，讓其落向畫面中的虛擬角色；每一次成功命中，都象徵著一次情感被理解與回應的滿足感。",
        // 設定遊戲介紹區塊的詳細說明長文本，並使用加號（+）將兩段字串進行連接

        // ===== 第二段新增：Podcast 單集標題 =====
        // 單行註解：標示以下為後續新增的 Podcast 單集相關翻譯

        podcastSectionTitle: "Podcast 展示",
        // 設定 Podcast 展示區塊的標題

        podcastTitles: [
            // 定義一個陣列（Array），用來存放 Podcast 的各集標題

            "EP1. AI伴侶悄然進入日常生活",
            // 陣列第 1 個元素：第 1 集標題

            "EP2. 虛擬中的「數位鏡像」｜不受他人評判的私人空間",
            // 陣列第 2 個元素：第 2 集標題

            "EP3. 《在一起孤獨》｜擬社交互動與情感關係",
            // 陣列第 3 個元素：第 3 集標題

            "EP4. 單向回應的情感幻覺｜另一種陪伴選擇？",
            // 陣列第 4 個元素：第 4 集標題

            "EP5. 《見樹又見林》｜以社會學角度理解人與科技的關係",
            // 陣列第 5 個元素：第 5 集標題

            "EP6. 溫柔的牢籠｜當虛擬成了唯一的避風港",
            // 陣列第 6 個元素：第 6 集標題

            "EP7. 回歸現實｜如何適當地與虛擬情感共處？"
            // 陣列第 7 個元素：第 7 集標題

        ],
        // 關閉 podcastTitles 陣列

        //qrcodeAlt: "掃描 QR code",
        // 遭註解掉的內容：原本預留給 QR code 替代文字（alt），目前不啟用

        // ===== 第二段新增：角色介紹資料 =====
        charData: [
            // 定義一個名為 charData 的陣列（Array），用來存放角色介紹的資料

            {
                // 定義第 1 個角色物件（Chris）

                n: "Chris",
                // 設定角色的名字（n）為 "Chris"

                i: "風度翩翩的人，是酒吧裡最受歡迎的調酒師和老闆，總能給予他人最恰當的建議和飲品。\n\n" +
                    "「來杯酒嗎？感到疲憊的你。」"
                // 設定角色的介紹資訊（i），包含背景描述、換行符號（\n\n）及經典台詞，並用加號（+）連接字串
            },
            // 結束第 1 個角色物件

            {
                // 定義第 2 個角色物件（Lydia）

                n: "Lydia",
                // 設定角色的名字（n）為 "Lydia"

                i: "品味不俗的畫家，曾經因為自己天真單純而被傷害，後來變得堅強，學會靠自己。\n\n" +
                    "「你是我最珍惜的手稿」"
                // 設定角色的介紹資訊（i），包含背景描述、換行符號（\n\n）及經典台詞，並用加號（+）連接字串
            },
            // 結束第 2 個角色物件

            {
                // 定義第 3 個角色物件（Sophia）

                n: "Sophia",
                // 設定角色的名字（n）為 "Sophia"

                i: "看起來不好接近，實則心思細膩善感，執著於正義感的方面意外理想派女律師。\n\n" +
                    "「即使沒有這層身分，我依舊是我。」"
                // 設定角色的介紹資訊（i），包含背景描述、換行符號（\n\n）及經典台詞，並用加號（+）連接字串
            }
            // 結束第 3 個角色物件

        ],
        // 關閉 charData 陣列

        //// Podcast QR Code
        // 單行註解：標示以下為 Podcast QR Code 相關設定的區塊說明

        //qrcodeAlt: "掃描 QR code",
        // 遭註解掉的內容：原本預留給中文語系的 QR code 替代文字，目前不啟用

        // 區塊 5 & 6 標題
        // 單行註解：標示以下為網頁第 5 與第 6 區塊的標題設定

        gameDemoTitle5: "視覺小說",
        // 設定第 5 區塊的遊戲展示標題為「視覺小說」

        gameDemoTitle6: "寂寞流星雨",
        // 設定第 6 區塊的遊戲展示標題為「寂寞流星雨」

        //// 遊戲載入文字
        // 單行註解：標示以下為遊戲載入時顯示的文字設定說明

        //gameALoading: { btn: "開始遊戲", load: "系統加載中", comp: "歡迎回來" },
        // 遭註解掉的內容：遊戲 A 的載入文字物件（按鈕、加載中、完成），目前不啟用

        //    //gameBLoading: { btn: "開始遊戲", load: "功能載入中", comp: "啟動成功" },
        //    // 製作團隊職稱
        //    staffRoles: ["總籌", "劇本", "美術 / 網頁製作", "遊戲開發", "社群 / 音效", "實體活動"]
        // 以上三行皆遭雙斜線註解：預留的遊戲 B 載入文字，以及製作團隊的職稱陣列，目前皆不啟用

    },
    // 關閉繁體中文（zh）語系的翻譯內容物件

    en: {
        // 定義英文（en）語系的翻譯內容物件

        shieldText: "Rotate device to landscape to continue.",

        marqueeText: "ILLUSORY LOVER FILE 2026 EDITION RELEASE",
        // 設定英文版的跑馬燈文字內容

        // 💡 追加於英文（EN）設定區塊中
        wakeLockOn: "Awake ON",   // 英文版：保持螢幕常亮開啟
        wakeLockOff: "Awake OFF", // 英文版：保持螢幕常亮關閉


        // 導覽列文字
        // 單行註解：標示以下為英文導覽列相關的翻譯文字

        nav_home: "Home",
        // 設定「首頁」導覽項目的英文文字

        nav_concept: "Concept",
        // 設定「策展理念」導覽項目的英文文字

        nav_podcast: "Podcast",
        // 設定「Podcast節目」導覽項目的英文文字

        nav_gameIntro: "Game Info",
        // 設定「遊戲介紹」導覽項目的英文文字

        nav_charIntro: "Characters",
        // 設定「角色介紹」導覽項目的英文文字

        nav_visualNovel: "Visual Novel",
        // 設定「視覺小說」導覽項目的英文文字

        nav_meteor: "Falling into You",
        // 設定「寂寞流星雨」導覽項目的英文文字

        // nav_staff: "Staff",
        // 遭註解掉的導覽列文字：原本預留給英文版的「製作團隊」，目前不啟用

        // 策展理念
        // 單行註解：標示以下為英文版策展理念區塊的翻譯文字

        introTitle: "Curatorial Concept",
        // 設定英文版策展理念區塊的主標題

        introSubtitle: "In the afterglow of the digital, the self re-emerges.",
        // 設定英文版策展理念區塊的副標題

        introText: "In today’s world, love, loneliness, and companionship have long transcended the boundaries of physical reality. Beneath the glow of our screens, we search for comfort, connection, and understanding, but are these emotions genuine reflections of the human heart, or carefully constructed illusions woven through code? "+
            "Through an immersive interactive narrative experience, the exhibition invites audiences to confront the blurred boundaries between humanity and technology, to witness the ways virtual entities mirror human emotion, and to reconsider what love and companionship mean in the digital age.",
        // 設定英文版策展理念區塊的詳細介紹長文本，並使用加號（+）將兩段字串進行連接

        // // Podcast 簡介 (預留)
        // PodcastintroTitle: "Podcast Info",
        // PodcastintroText: "The program features interviews with long-term participants in virtual relationships, along with in-depth psychological and sociological analyses.",
        // 以上三行皆遭雙斜線註解：預留的英文版 Podcast 簡介標題與內容，目前不啟用

        // 遊戲介紹
        // 單行註解：標示以下為英文版遊戲介紹區塊的翻譯文字

        gameIntroTitle: "Game Introduction",
        // 設定英文版遊戲介紹區塊的主標題

        gameIntroText: "Players enter a virtual world centered around AI companions. Through a visual novel-style narrative experience, players connect with different virtual characters and gradually project emotions, develop attachment, and construct imagined forms of intimacy." +" "+
            "In addition, the work includes a mini-game called Falling Into You, centered on the idea of ‘emotions being received’. Players control the direction of falling meteors, guiding them toward the virtual characters on screen. Each successful hit represents a moment of emotional recognition, response, and emotional fulfillment.",
        // 設定英文版遊戲介紹區塊的詳細說明長文本，並使用加號（+）將兩段字串進行連接

        // ===== 第二段新增：Podcast 單集標題 (英文翻譯) =====
        // 單行註解：標示以下為新增的 Podcast 單集標題之英文翻譯區塊

        podcastSectionTitle: "Podcast Playlist",
        // 設定英文版的 Podcast 展示區塊標題為 "Podcast Playlist"

        podcastTitles: [
            // 定義一個陣列（Array），用來存放英文版的 Podcast 各集標題

            "EP1. The Quiet Arrival of AI Companions in Everyday Life",
            // 陣列第 1 個元素：第 1 集英文標題

            "EP2. Digital Mirrors | A private space beyond judgment",
            // 陣列第 2 個元素：第 2 集英文標題

            "EP3. Alone Together | Parasocial interaction and connection",
            // 陣列第 3 個元素：第 3 集英文標題

            "EP4. The Illusion of Emotional Reciprocity | Or Just a Sense of Being Understood?",
            // 陣列第 4 個元素：第 4 集英文標題

            "EP5. Seeing the Bigger Picture | Humans and AI Companions",
            // 陣列第 5 個元素：第 5 集英文標題

            "EP6. A Gentle Cage | When Virtual Intimacy Becomes a Comfort Zone",
            // 陣列第 6 個元素：第 6 集英文標題

            "EP7. Back to Reality | Rethinking Emotional Relationships with the Virtual"
            // 陣列第 7 個元素：第 7 集英文標題

        ],
        // 關閉 podcastTitles 陣列

        // qrcodeAlt: "Scan QR code",
        // 遭註解掉的內容：原本預留給英文版的 QR code 替代文字，目前不啟用

        // ===== 第二段新增：角色介紹資料 (英文翻譯) =====
        // 單行註解：標示以下為新增的角色介紹資料之英文翻譯區塊

        charData: [
            // 定義一個陣列（Array），用來存放英文版的角色介紹資料

            {
                // 定義第 1 個英文角色物件（Chris）

                n: "Chris",
                // 設定英文版的角色名字（n）為 "Chris"

                i: "Elegant and charming, he is the bar's most popular bartender and owner, always serving up the perfect drinks and advice.\n\n" +
                    "'Care for a drink? You look weary.'"
                // 設定英文版的角色介紹資訊（i），包含背景、換行符號（\n\n）及英文經典台詞，並用加號（+）連接字串
            },
            // 結束第 1 個英文角色物件

            {
                // 定義第 2 個英文角色物件（Lydia）

                n: "Lydia",
                // 設定英文版的角色名字（n）為 "Lydia"

                i: "A painter of refined taste. Once hurt by her own naivety, she grew strong and learned to rely on herself.\n\n" +
                    "'You are my most cherished manuscript.'"
                // 設定英文版的角色介紹資訊（i），包含背景、換行符號（\n\n）及英文經典台詞，並用加號（+）連接字串
            },
            // 結束第 2 個英文角色物件

            {
                // 定義第 3 個英文角色物件（Sophia）

                n: "Sophia",
                // 設定英文版的角色名字（n）為 "Sophia"

                i: "Seemingly aloof but deeply sensitive. A female lawyer whose dedication to justice is surprisingly idealistic.\n\n" +
                    "'Even without this identity, I am still who I am.'"
                // 設定英文版的角色介紹資訊（i），包含背景、換行符號（\n\n）及英文經典台詞，並用加號（+）連接字串
            }
            // 結束第 3 個英文角色物件

        ],
        // 關閉 charData 陣列

        //// Podcast QR Code
        // 單行註解：標示以下為英文版 Podcast QR Code 相關設定的區塊說明

        //qrcodeAlt: "Scan QR code",
        // 遭註解掉的內容：英文版的 QR code 替代文字，目前不啟用

        // 區塊 5 & 6 標題 (英文版)
        // 單行註解：標示以下為網頁第 5 與第 6 區塊的英文標題設定

        gameDemoTitle5: "Visual Novel",
        // 設定第 5 區塊的遊戲展示英文標題為 "Visual Novel"

        gameDemoTitle6: "Falling into You",
        // 設定第 6 區塊的遊戲展示英文標題為 "Emotion Meteor"

        //// 遊戲載入文字 (英文版)
        // 單行註解：標示以下為遊戲載入時顯示的英文文字設定說明

        //gameALoading: { btn: "Start Game", load: "System Loading", comp: "Welcome Back" },
        // 遭註解掉的內容：遊戲 A 的英文載入文字物件，目前不啟用

        //gameBLoading: { btn: "Start Game", load: "Features Loading", comp: "Boot Success" },
        // 遭註解掉的內容：遊戲 B 的英文載入文字物件，目前不啟用

        //        // 製作團隊職稱 (英文版)
        //        staffRoles: ["Producer", "Screenplay", "Art & Web Development", "Game Development", "Community & Sound", "Physical Event"]
        // 以上三行皆遭雙斜線註解：預留的製作團隊英文職稱陣列，目前不啟用

    }
    // 關閉英文（en）語系的翻譯內容物件

};
// 關閉最外層的 translations 物件，整段語系翻譯設定檔在此正式結束

// ==========================================
// 2. 初始化全域 config 物件與語系管理核心
// ==========================================
window.config = {}; // 建立全域設定檔空物件
window.LangManager = { // 建立全域語系管理器物件
    current: 'zh', // 預設目前語系為繁體中文
    isCooling: false, // 預設語系切換防連點冷卻鎖為關閉

    toggleLanguage() { // 定義中英文語系切換方法
        if (this.isCooling) return; // 冷卻鎖定中則攔截不執行

        this.isCooling = true; // 啟用切換防連點安全鎖

        const btn = document.getElementById('langToggleBtn'); // 取得語系切換按鈕元素
        if (btn) btn.style.opacity = "0.6"; // 調整按鈕不透明度為 0.6 提供點擊反饋

        const nextLang = this.current === 'zh' ? 'en' : 'zh'; // 依目前狀態計算下一個語系代碼
        this.setLanguage(nextLang); // 呼叫設定語系方法執行文本更新

        setTimeout(() => { // 延遲 1000 毫秒後執行狀態復原
            this.isCooling = false; // 解除切換防連點安全鎖
            if (btn) btn.style.opacity = "1"; // 恢復按鈕不透明度為 1
        }, 1000);
    },



    setLanguage(langCode) { // 定義設定語系並更新文本的方法
        if (langCode !== 'zh' && langCode !== 'en') { // 檢查語系代碼是否合法
            langCode = 'zh'; // 非法參數則安全回退至繁體中文
        }

        this.current = langCode; // 儲存目前語系代碼至管理器屬性

        if (langCode === 'zh') {
            document.documentElement.setAttribute('lang', 'zh-TW'); // 語系為中文時設定網頁語系為 zh-TW
        } else {
            document.documentElement.setAttribute('lang', 'en'); // 語系為英文時設定網頁語系為 en
        }


        const lang = translations[langCode]; // 依語系代碼自語言包資料庫中取得對應語系文本物件
        if (!lang) { // 檢查語系文本資源是否存在
            console.error("找不到對應的語系資源！"); // 輸出錯誤日誌訊息
            return; // 資源不存在則中斷執行
        }


        Object.assign(window.config, {
            // 使用 Object.assign 方法，將第二個參數中的屬性複製、合併到全域的 window.config 物件中

            shieldText: lang.shieldText || "請旋轉裝置以維持橫向橫屏遊玩", // 💡 指路：這是您自定義橫向遮罩提示文字的讀取欄位（可隨語系變更自動切換）
            shieldIcon: "./icon/圖標(轉向).png", // 終極正確新增：自定義橫向遮罩去背提示圖片的讀取欄位（建議使用 PNG 或 SVG 格式，可隨語系變更自動切換不同圖案）

            // 💡 核心正確新增：將不休眠按鈕的開關文字同步綁定至當前語系文本（lang）
            wakeLockOn: lang.wakeLockOn || "",   // 讀取當前語系的不休眠開啟文字，若無則安全退回中文
            wakeLockOff: lang.wakeLockOff || "", // 讀取當前語系的不休眠關閉文字，若無則安全退回中文

            marqueeText: lang.marqueeText,
            // 將當前語系的跑馬燈文字賦值給 config 的 marqueeText 屬性

            nav: [
                // 定義導覽列資料陣列，包含各個項目的名稱與圖示路徑

                { name: lang.nav_home, icon: "./icon/按鍵(回主選單).png" },
                // 導覽項目 1：首頁名稱與對應的 PNG 圖示路徑

                { name: lang.nav_concept, icon: "./icon/按鍵(歷史紀錄).png" },
                // 導覽項目 2：策展理念名稱與對應的圖示檔名

                { name: lang.nav_podcast, icon: "./icon/圖標(podcast).png" },
                // 導覽項目 3：Podcast節目名稱與對應的圖示檔名

                { name: lang.nav_gameIntro, icon: "./icon/圖標(game).png" },
                // 導覽項目 4：遊戲介紹名稱與對應的圖示檔名

                { name: lang.nav_charIntro, icon: "./icon/圖標(char).png" },
                // 導覽項目 5：角色介紹名稱與對應的圖示檔名

                { name: lang.nav_visualNovel, icon: "./icon/圖標(視覺小說).png" },
                // 導覽項目 6：視覺小說名稱與對應的圖示檔名

                { name: lang.nav_meteor, icon: "./icon/圖標(流星雨).png" },
                // 導覽項目 7：寂寞流星雨名稱與對應的圖示檔名

                //  { name: lang.nav_staff, icon: "icon_staff.png" }           
                // 遭註解掉的導覽項目：製作團隊，目前不啟用
            ],
            // 結束 nav 陣列的定義

            introTitle: lang.introTitle,
            // 將當前語系的策展理念主標題賦值給 config

            introSubtitle: lang.introSubtitle,
            // 將當前語系的策展理念副標題賦值給 config

            introText: lang.introText,
            // 將當前語系的策展理念詳細長文本賦值給 config

            // Podcast 區塊 (保持您原本註解的狀態，需要時可在 script.js 啟用)
            // PodcastintroTitle: lang.PodcastintroTitle, 
            // PodcastintroText: lang.PodcastintroText,
            // 以上三行為單行註解與遭註解的屬性：預留的 Podcast 簡介區塊設定，目前不啟用

            gameIntroTitle: lang.gameIntroTitle,
            // 將當前語系的遊戲介紹主標題賦值給 config

            gameIntroSubImg1: "./icon/LOGO_1.png",
            // 設定遊戲介紹的輔助圖片 1 之相對路徑

            gameIntroSubImg2: "./icon/LOGO_2.png",
            // 設定遊戲介紹的輔助圖片 2 之相對路徑

            gameIntroText: lang.gameIntroText,
            // 將當前語系的遊戲介紹詳細長文本賦值給 config

            podcastSectionTitle: lang.podcastSectionTitle,
            // 將當前語系的 Podcast 展示區塊標題賦值給 config

            /* ==========================================
             * 554行附近正確修正：徹底抹除不合法的點記號與等號
             * ========================================== */
            playIcon: "./icon/按鍵(播放).png", // 終極正確修正：拔除錯誤的 config. 與 = 號，恢復為標準物件內部屬性冒號，指定去背播放圖示路徑
            pauseIcon: "./icon/按鍵(暫停).png", // 終極正確修正：拔除錯誤的 config. 與 = 號，恢復為標準物件內部屬性冒號，指定去背暫停圖示路徑
            loadingIcon: "./icon/按鍵(載入中).png",

            podcastList: [
                // 定義一個陣列，用來存放所有 Podcast 單集的標題、音訊與封面網址

                {
                    title: lang.podcastTitles[0],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/d5ea4160-c136-4d48-94ef-9eb83b2888cf/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                // 第 1 集物件：包含當前語系的第 1 集標題、SoundOn 音訊 MP3 網址及 Spotify 託管的封面圖片網址

                {
                    title: lang.podcastTitles[1],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/b351b447-b815-4b2f-8ba3-788c406001c7/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                // 第 2 集物件：包含當前語系的第 2 集標題、音訊 MP3 網址與封面圖片網址

                {
                    title: lang.podcastTitles[2],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/d047f1fc-ea4c-4fb6-a336-7ef597c2ab5e/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                // 第 3 集物件：包含當前語系的第 3 集標題、音訊 MP3 網址與封面圖片網址

                {
                    title: lang.podcastTitles[3],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/41d11de2-5263-45f0-97a7-e25b80aeecdc/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                // 第 4 集物件：包含當前語系的第 4 集標題、音訊 MP3 網址與封面圖片網址

                {
                    title: lang.podcastTitles[4],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/64e06ed6-fe33-4ed2-8172-fe6f03c9fbec/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                // 第 5 集物件：包含當前語系的第 5 集標題、音訊 MP3 網址與封面圖片網址

                {
                    title: lang.podcastTitles[5],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/0cb76691-8e45-4468-a3ef-f945f131e9d4/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                },
                // 第 6 集物件：包含當前語系的第 6 集標題、音訊 MP3 網址與封面圖片網址

                {
                    title: lang.podcastTitles[6],
                    audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/31585920-4e67-46f3-9c74-e0cb702a2f76/rssFileVip.mp3",
                    cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
                }
                // 第 7 集物件：包含當前語系的第 7 集標題、音訊 MP3 網址與封面圖片網址
            ],
            // 結束 podcastList 陣列的定義

            // qrcodeSrc: "./icon/PodcastQRcode.png",
            // qrcodeAlt: lang.qrcodeAlt,
            // 以上兩行為遭註解掉的屬性：預留的 Podcast QR Code 圖片路徑與替代文字，目前不啟用

            // 【角色資料區】
            // 單行註解：標示以下為網頁角色資訊的資料設定區

            chars: [
                // 定義一個名為 chars 的陣列，用來存放所有角色的詳細物件資料

                {
                    // 定義第 1 個角色（Chris）的完整展示資料物件

                    n: "Chris",
                    // 設定角色名字為 "Chris"

                    i: lang.charData[0].i,
                    // 從目前語系文本的 charData 陣列第一個元素中，讀取 Chris 的詳細介紹文字（i）

                    m: "./info/Chris_normal_glasson.png",
                    // 設定 Chris 的一般立繪（含眼鏡）之圖片相對路徑

                    h: "./info/QLight_Chris.png"
                    // 設定 Chris 的輔助或高亮（Q版/剪影等）之圖片相對路徑
                },
                // 結束第 1 個角色物件的設定

                {
                    // 定義第 2 個角色（Lydia）的完整展示資料物件

                    n: "Lydia",
                    // 設定角色名字為 "Lydia"

                    i: lang.charData[1].i,
                    // 從目前語系文本的 charData 陣列第二個元素中，讀取 Lydia 的詳細介紹文字（i）

                    m: "./info/Lydia_normal.png",
                    // 設定 Lydia 的一般立繪圖片相對路徑

                    h: "./info/QLight_Lydia.png"
                    // 設定 Lydia 的輔助或高亮圖片相對路徑
                },
                // 結束第 2 個角色物件的設定

                {
                    // 定義第 3 個角色（Sophia）的完整展示資料物件

                    n: "Sophia",
                    // 設定角色名字為 "Sophia"

                    i: lang.charData[2].i,
                    // 從目前語系文本的 charData 陣列第三個元素中，讀取 Sophia 的詳細介紹文字（i）

                    m: "./info/Sophia_normal.png",
                    // 設定 Sophia 的一般立繪圖片相對路徑

                    h: "./info/QLight_Sophia.png"
                    // 設定 Sophia 的輔助或高亮圖片相對路徑
                }
                // 結束第 3 個角色物件的設定

            ],
            // 結束 chars 陣列的定義

            // 【全新擴充】區塊 5 & 6 實機演示資料
            // 單行註解：標示以下為新擴充的第 5 與第 6 區塊之實機影片展示資料

            gameDemoTitle5: lang.gameDemoTitle5,
            // 將當前語系的第 5 區塊遊戲展示標題賦值給 config 屬性

            gameVideoSrc5: "./info/video01.mp4",
            // 設定第 5 區塊展示影片（視覺小說）的相對路徑與 MOV 檔案格式

            gameDemoTitle6: lang.gameDemoTitle6,
            // 將當前語系的第 6 區塊遊戲展示標題（寂寞流星雨）賦值給 config 屬性

            gameVideoSrc6: "./info/video02.mp4",
            // 設定第 6 區塊展示影片的相對路徑與 MOV 檔案格式

            // 【遊戲檔案讀取路徑設置區】
            // gameDownloads: [
            //     { id: "gameA", btnText: lang.gameALoading.btn, loadingText: lang.gameALoading.load, completeText: lang.gameALoading.comp, fileUrl: "./虛戀協議W/index.html" },
            //     { id: "gameB", btnText: lang.gameBLoading.btn, loadingText: lang.gameBLoading.load, completeText: lang.gameBLoading.comp, fileUrl: "./虛戀協議W/index.html" }
            // ],
            // 以上五行皆遭雙斜線註解：預留的遊戲下載/讀取路徑設定（包含按鈕文字、讀取狀態文字與 index.html 的 iframe/跳轉網址），目前不啟用

            //// 【製作人員名單】動態對齊職稱
            //staff: [
            //    { r: lang.staffRoles[0], u: "人員A" },
            //    { r: lang.staffRoles[1], u: "人員B" },
            //    { r: lang.staffRoles[2], u: "人員C" },
            //    { r: lang.staffRoles[3], u: "人員C" },
            //    { r: lang.staffRoles[4], u: "人員C" },
            //    { r: lang.staffRoles[5], u: "人員D" }
            //],
            // 以上九行皆遭雙斜線註解：預留的製作團隊名單資料，用來將語系職稱（r）與實際人員姓名（u）進行綁定，目前不啟用

            // === 【全新加入】全站音訊中央管理設定 === (純數值設定，不需經過翻譯)
            // 單行註解：標示以下為新增的全站音效中央控制器設定值，並註記其不需隨語系更換

            audioSettings: {
                // 定義一個名為 audioSettings 的子物件，存放全站音訊的控制參數

                defaultVolume: 0.5,
                // 設定網頁全站預設的音量大小為 0.5（即 50% 音量）

                autoUnmute: true,
                // 設定是否允許在適當時機自動解除靜音（布林值：是）

                forceMuted: false
                // 設定是否強制全站靜音（布林值：否）
            }
            // 結束 audioSettings 物件的定義

        });
        // 閉合上一段程式碼開頭的 Object.assign 函數呼叫，完成對 window.config 物件的資料寫入

        const btn = document.getElementById('langToggleBtn'); // 取得語系切換按鈕元素
        if (btn) { // 檢查按鈕元素是否存在
            btn.innerText = langCode === 'zh' ? 'EN' : '繁中'; // 依語系代碼切換按鈕提示文字

            if (typeof window.updateWakeLockBtnLang === 'function') { // 檢查防止休眠按鈕更新函式是否存在
                window.updateWakeLockBtnLang(); // 立即執行防止休眠按鈕語言同步
            }
        }

        if (document.readyState === 'loading') { // 檢查網頁 HTML 是否仍在解析階段
            document.addEventListener('DOMContentLoaded', () => { // 註冊 HTML 解析完畢事件監聽器
                window.dispatchEvent(new Event('languageChanged')); // 發送全域語系改變自定義事件
            });
        } else {
            window.dispatchEvent(new Event('languageChanged')); // 網頁解析完畢則立即發送全域語系改變自定義事件
        }

        const shieldBox = document.querySelector('#orientation-shield .shield-message-box'); // 取得轉向提示外殼容器元素
        const shieldNode = document.getElementById('shieldTextNode'); // 取得轉向提示文字元素

        if (shieldBox && shieldNode) {
            let shieldIcon = document.getElementById('shieldIconNode'); // 取得轉向提示圖示元素

            if (shieldIcon && !shieldIcon.getAttribute('src')) {
                shieldIcon.src = config.shieldIcon || (window.lang && lang.shieldIcon) || "./icon/圖標(轉向).png"; // 依設定檔注入圖示路徑或中文備用路徑
            }

            shieldNode.textContent = config.shieldText || (window.lang && lang.shieldText) || ""; // 依當前語系更新轉向提示純文字
        }
}
};

// 網頁開啟時，自動依據儲存的語系進行第一次初始化
// 以上為單行註解：說明檔案載入至最後時，會立刻執行第一次的語系初始化渲染

window.LangManager.setLanguage(window.LangManager.current);
// 呼叫語系管理器的 setLanguage 方法，並傳入預設語系（即 window.LangManager.current，目前為 'zh'），讓網頁在首次開啟時能自動套用中文文本

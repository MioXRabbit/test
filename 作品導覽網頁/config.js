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
        wakeLockOn: "休眠開啟",   // 當按鈕處於常規狀態（畫面會正常自動變暗熄滅）時顯示的文字
        wakeLockOff: "休眠關閉",  // 當按鈕處於點亮狀態（畫面已被強制鎖定保持常亮）時顯示的文字


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
// 以上為單行註解：分隔線與標題，標示此區塊為第二部分「初始化全域 config 物件與語系管理核心」

window.config = {};
// 在全域物件（window）上建立一個名為 config 的空物件，方便後續在其他檔案存取設定值

window.LangManager = {
    // 在全域物件（window）上建立一個名為 LangManager 的物件，用來統一管理網頁的語系切換

    // 💡 核心優化：完全移除了 localStorage。每次打開網頁「絕對強制預設繁中 'zh'」
    // 單行註解：開發備忘提示，說明目前的設計不保留使用者的語系紀錄，每次重新整理皆強制預設為中文

    current: 'zh',
    // 設定目前正在使用的語系（current）預設值為 'zh'（繁體中文）

    // 💡 將冷卻狀態鎖直接內建在物件裡，預設為 false (不冷卻)
    // 單行註解：開發備忘提示，說明防連點（防抖）的狀態控制欄位

    isCooling: false,
    // 設定是否處於連點冷卻時間（isCooling）的布林值，預設為 false（不冷卻）

    toggleLanguage() {
        // 定義一個方法（Method）名為 toggleLanguage，用來處理中英文語系的循環切換

        // 1. 使用 this.isCooling 讀取狀態。如果正在冷卻，直接阻斷點擊
        // 單行註解：說明第 1 步的防連點安全機制

        if (this.isCooling) return;
        // 如果目前正在冷卻狀態中（this.isCooling 為 true），則直接中斷執行，不執行任何切換動作

        // 2. 點擊成功，立刻鎖定按鈕
        // 單行註解：說明第 2 步的狀態鎖定機制

        this.isCooling = true;
        // 將冷卻狀態設為 true，鎖定點擊，防止使用者在極短時間內重複觸發

        // 3. ⚡ 關鍵修正：將非法數值 "2" 改為合法的 "0.6"（或者是 "0.7"）
        // 這樣在點擊的 300 毫秒內，按鈕會呈現非常優雅的微暗淡狀態，通知使用者「正在切換中」
        // 同時 100% 根除 iOS Safari 因為語法出界導致的按鈕文字瞬間消失、閃爍的地雷！
        // 以上三行為單行註解：詳細說明修正不合法的不透明度數值（CSS opacity 的合法值為 0 到 1），以解決 iOS 裝置上的渲染相容性錯誤

        const btn = document.getElementById('langToggleBtn');
        // 從網頁 DOM 當中抓取 ID 為 'langToggleBtn' 的切換語系按鈕元素，並存入區域常數 btn 中

        if (btn) btn.style.opacity = "0.6";
        // 如果有成功抓取到該按鈕元素，則將其 CSS 不透明度（opacity）暫時調整為 0.6，呈現微淡化的點擊反饋效果

        // 4. 執行中英文循環切換
        // 單行註解：說明第 4 步的語系值切換邏輯

        const nextLang = this.current === 'zh' ? 'en' : 'zh';
        // 使用三元運算子判斷：若目前是 'zh' 則下個語系設為 'en'，否則設為 'zh'，並將結果存入變數 nextLang 

        this.setLanguage(nextLang);
        // 呼叫物件內部的 setLanguage 方法，並傳入 nextLang，開始執行網頁介面文本的更新

        // 5. 設定 1000 毫秒後自動將狀態解除
        // 單行註解：說明第 5 步的計時器解除機制

        setTimeout(() => {
            // 觸發一個非同步的計時器（setTimeout）

            this.isCooling = false; // 解除安全鎖
            // 在指定時間到達後，將冷卻狀態重新設為 false，重新開放點擊

            if (btn) btn.style.opacity = "1"; // 恢復按鈕 100% 原始亮度
            // 如果按鈕存在，將其不透明度恢復為 1（100% 原始亮度）

        }, 1000);
        // 設定該計時器在 1000 毫秒（1秒）後執行內部程式碼

    },
// 結束 toggleLanguage 方法的定義



    setLanguage(langCode) {
        // 定義一個名為 setLanguage 的方法（Method），用來接收語系代碼（langCode）並更新網頁所有文本

        // 確保傳入值合法
        // 單行註解：說明接下來的條件判斷是用來驗證傳入的語系參數

        if (langCode !== 'zh' && langCode !== 'en') {
            // 如果傳入的語系代碼既不是 'zh'（中文）也不是 'en'（英文）

            langCode = 'zh';
            // 則啟動安全回退機制，強制將語系代碼設定為預設的 'zh'
        }
        // 結束非法語系代碼的條件檢查

        this.current = langCode;
        // 將更新後的語系代碼（langCode）賦值給 LangManager 物件的 current 屬性


        //  核心優化：如果是 zh 就強制給予 zh-TW 或 zh-Hant，徹底杜絕 Edge 誤判
        // 單行註解：開發備忘提示，說明強制設定 HTML lang 屬性是為了解決微軟 Edge 等瀏覽器的語系誤判問題

        if (langCode === 'zh') {
            // 如果目前的語系代碼為 'zh'

            document.documentElement.setAttribute('lang', 'zh-TW'); // 或 'zh-Hant'
            // 將網頁最外層的 <html> 標籤（document.documentElement）的 lang 屬性設定為 'zh-TW'
        } else {
            // 否則（即語系代碼為 'en' 的情況下）

            document.documentElement.setAttribute('lang', 'en');
            // 將網頁最外層的 <html> 標籤的 lang 屬性設定為 'en'
        }
        // 結束 <html> 標籤 lang 屬性的條件設定


        const lang = translations[langCode];
        // 透過語系代碼作為 Key（鍵值），從我們之前宣告的 translations 全域資料庫中取出對應的語系文本物件，並存入常數 lang 當中

        // 💡 檢查點：確保 translation 檔案有對應到，防止解構死鎖
        // 單行註解：提示這是一個防錯的安全檢查點，避免因為找不到文本資源而導致後續物件解構或讀取時發生執行階段錯誤

        if (!lang) {
            // 如果找不到對應語系的文本資源（即 lang 的值為 undefined 或不存在）

            console.error("找不到對應的語系資源！");
            // 在瀏覽器的開發者工具主控台（Console）中輸出紅色的錯誤訊息

            return;
            // 直接中斷此方法的執行，不繼續往下跑後續的文本替換邏輯
        }
        // 結束文本資源存在性的安全檢查

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

            gameVideoSrc5: "./info/test.mov",
            // 設定第 5 區塊展示影片（視覺小說）的相對路徑與 MOV 檔案格式

            gameDemoTitle6: lang.gameDemoTitle6,
            // 將當前語系的第 6 區塊遊戲展示標題（寂寞流星雨）賦值給 config 屬性

            gameVideoSrc6: "./info/test.mov",
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

        // 💡 關鍵修復點 1：加強安全防錯鎖。如果在本機開啟時 HTML 還沒載入完，就先不改文字
        // 以上為單行註解：說明以下區塊是為了解決 DOM 元素尚未加載完成時修改文字會發生的錯誤

        const btn = document.getElementById('langToggleBtn');
        // 從網頁中抓取 ID 為 'langToggleBtn' 的切換語系按鈕元素，並存入區域常數 btn 當中

        if (btn) {
            // 如果有成功抓取到該按鈕元素（即元素已載入完成，非 null）

            btn.innerText = langCode === 'zh' ? 'EN' : '繁中';
            // 使用三元運算子判斷：若目前語系為 'zh'，按鈕文字顯示 'EN'（提示可以切換成英文）；否則顯示 '繁中'

            // 🚀 核心秒同步防線：當確認語言切換按鈕成功更換文字的同一個微秒內，
            // 立即主動通知不休眠按鈕也去刷新畫面，彻底根除需要手動更新的時序 Bug
            if (typeof window.updateWakeLockBtnLang === 'function') {
                window.updateWakeLockBtnLang();
            }
        }
        // 結束按鈕文字更新的條件區塊

        // 💡 關鍵修復點 2：加上安全延遲通知鎖
        // 確保不論是在本機還是線上，都等到瀏覽器把 HTML 畫完後，才通知 script.js 渲染導覽列
        // 以上兩行為單行註解：說明接下來的邏輯是為了確保在 DOM 樹完全構建後才發送全域事件

        if (document.readyState === 'loading') {
            // 檢查目前網頁的載入狀態（document.readyState），若仍處於 'loading'（正在解析 HTML）

            document.addEventListener('DOMContentLoaded', () => {
                // 則為 document 註冊一個監聽器，等待 'DOMContentLoaded' 事件（HTML 載入完成）觸發

                window.dispatchEvent(new Event('languageChanged'));
                // 在 HTML 載入完成後，建立並發送一個名為 'languageChanged' 的自訂全域事件，通知 script.js 進行畫面重繪
            });
            // 結束 DOMContentLoaded 事件監聽器的定義

        } else {
            // 否則（代表 HTML 早就已經解析完畢，ready 狀態為 'interactive' 或 'complete'）

            window.dispatchEvent(new Event('languageChanged'));
            // 立刻建立並發送名為 'languageChanged' 的自訂全域事件，不需要多加等待
        }
        // 結束網頁載入狀態的條件判斷

        // ===【遮罩多語系與自定義文字動態注入防線（JS 讀取 config 圖片與結構鎖版）】===
        const shieldBox = document.querySelector('#orientation-shield .shield-message-box'); // 從網頁 DOM 當中精準選取負責包裝提示元件的黑色中央盒子容器，並存入常數 shieldBox
        const shieldNode = document.getElementById('shieldTextNode'); // 從已經完全蓋好的網頁實體 DOM 當中精準選取負責顯示提示的文字節點，並存入常數 shieldNode

        if (shieldBox && shieldNode) { // 安全檢查：確認黑色中央盒子與文字標籤在當前的網頁牆壁上皆確實存在，防範未初始化時發生系統當機
            let shieldIcon = document.getElementById('shieldIconNode'); // 精準對齊並捕捉 HTML 骨架內部埋好的實體 id="shieldIconNode" 空白圖片節點物件

            if (shieldIcon && !shieldIcon.getAttribute('src')) { // 結構防重置鎖：如果圖片標籤存在且其 src 屬性還是空的，代表網頁是第一次剛打開，此時發動首次圖片載入
                shieldIcon.src = config.shieldIcon || (window.lang && lang.shieldIcon) || "./icon/圖標(轉向).png"; // 終極正確修正：強勢讀取您全域 config 內部的實體去背圖片變數欄位 shieldIcon，並以您實體截圖的中文圖名作為黃金兜底路徑，觸發首次物理加載
            } // 結束首次加載圖片標籤的條件分支

            shieldNode.textContent = config.shieldText || (window.lang && lang.shieldText) || ""; // 完美保留原文：直接讀取您 config.js 的自定義欄位，並透過 textContent 秒切當前語系文字，保障換語言時不閃爍，且換語言時 100% 絕對跳過、不重新加載圖片
        } // 結束多語系字串注入與圖片保活的檢查區塊
    }
    // 關閉之前開頭的 setLanguage(langCode) 方法

};
// 關閉最外層的 window.LangManager 物件，語系管理核心物件在此正式宣告完畢

// 網頁開啟時，自動依據儲存的語系進行第一次初始化
// 以上為單行註解：說明檔案載入至最後時，會立刻執行第一次的語系初始化渲染

window.LangManager.setLanguage(window.LangManager.current);
// 呼叫語系管理器的 setLanguage 方法，並傳入預設語系（即 window.LangManager.current，目前為 'zh'），讓網頁在首次開啟時能自動套用中文文本

/**
 * 視覺小說啟動器設定檔 (config.js)
 * 所有的網頁內容、圖片路徑與遊戲連結皆在此統一管理
 */
const config = {
    // 【跑馬燈設定】螢幕左側垂直捲動的文字內容
    marqueeText: "ILLUSORY LOVER FILE 2026 EDITION RELEASE",

    // 【導覽列設定】定義右側選單的名稱與對應的圖標路徑
    nav: [
        { name: "Home", icon: "./icon/按鍵(回主選單).png" }, // 主頁圖標
        { name: "策展理念", icon: "icon_info.png" },           // 策展理念圖標
        { name: "Podcast節目", icon: "icon_mic.png" },        // 廣播頻道圖標
        { name: "遊戲介紹", icon: "icon_doc.png" },           // 遊戲詳細介紹圖標
        { name: "角色介紹", icon: "icon_char.png" },          // 登場角色圖標
        { name: "視覺小說", icon: "icon_game.png" },       // 遊戲體驗圖標
        { name: "寂寞流星雨", icon: "icon_star.png" },         // 特效頁面圖標
    //    { name: "製作團隊", icon: "icon_staff.png" }           // 製作團隊圖標
    ],

    // 【文字內容區】管理網頁各區塊的標題與長文本內容
    introTitle: "策展理念", // 簡介區塊的大標題
    introSubtitle: "在數位餘溫中，尋回真實的自我。", // 簡介區塊的副標題
    introText: "現代的愛與孤寂還有陪伴的形式早已跨越了實體的疆界。當我們在螢幕的微光中尋求慰藉，那份觸動心弦的情感，究其本質是真實的悸動，還是程式碼編織出的幻象？" +
                "《虛戀協議》以此為核心命題，邀請觀者透過沉浸式互動敘事，看見虛擬的人性鏡像、重新思考愛與陪伴，最終找到自己對於科技與人類的理解。",
    // 簡介說明文字

    //PodcastintroTitle: "Podcast簡介", // 簡介區塊的大標題
    //PodcastintroText: "節目收錄了多位長期投入虛擬關係者的訪談紀錄，以及心理學、社會學視角的深度剖析。",
    //// 簡介說明文字

    gameIntroTitle: "遊戲介紹", // 遊戲介紹區塊的大標題
    gameIntroSubImg1: "./icon/LOGO_1.png", // 第一張圖片路徑
    gameIntroSubImg2: "./icon/LOGO_2.png", // 第二張圖片路徑
    gameIntroText:"玩家將進入一個虛擬樂園，體驗與 AI 伴侶的情感羈絆。作品設計了多重分支，反映出遊玩者在面對依附關係時的心理投射。" +
                "同時也設計了以「接住情緒」為核心的小遊戲，玩家需要讓代表情緒的流星被角色接住。每次命中時會給予分數，代表我們獲得的滿足感。",
    // 遊戲介紹說明文字

    // 【Podcast 多集手動設定區】
    // 這裡儲存 RSS 抓取或手動填入的廣播資料
    podcastList: [
        {
            title: "EP1. 虛擬悄然出現於生活中", // 單集標題
            audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/d5ea4160-c136-4d48-94ef-9eb83b2888cf/rssFileVip.mp3", // 音檔連結
            cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a" // 專輯封面
        },
        {
            title: "EP2. 虛擬中的「數位鏡像」｜不受他人評判的私人空間",
            audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/b351b447-b815-4b2f-8ba3-788c406001c7/rssFileVip.mp3",
            cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
        },
        {
            title: "EP3. 《在一起孤獨》｜擬社交互動與情感關係",
            audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/d047f1fc-ea4c-4fb6-a336-7ef597c2ab5e/rssFileVip.mp3",
            cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
        },
        {
            title: "EP4. 與虛擬的「單向理解」｜另一種陪伴選擇？",
            audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/41d11de2-5263-45f0-97a7-e25b80aeecdc/rssFileVip.mp3",
            cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
        },
        {
            title: "EP5. 《見樹又見林》｜以社會學角度理解人與科技的關係",
            audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/64e06ed6-fe33-4ed2-8172-fe6f03c9fbec/rssFileVip.mp3",
            cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
        },
        {
            title: "EP6. 溫柔的牢籠｜當虛擬成了唯一的避風港",
            audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/0cb76691-8e45-4468-a3ef-f945f131e9d4/rssFileVip.mp3",
            cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
        },
        {
            title: "EP7. 回歸現實｜如何適當地與虛擬情感共處？",
            audio: "https://rss.soundon.fm/rssf/8ad87e89-3e17-4f4e-98ee-09f75b909c92/feedurl/31585920-4e67-46f3-9c74-e0cb702a2f76/rssFileVip.mp3",
            cover: "https://i.scdn.co/image/ab6765630000ba8ab37d3873d7abd15a35952b0a"
        }
    ],
    //// Podcast 掃描圖片設定（已解除註解，正式啟用）
    //qrcodeSrc: "./icon/PodcastQRcode.png", // QR code 圖片路徑
    //qrcodeAlt: "掃描 QR code",// 提示文字


    // 【角色資料區】定義展示區的角色資訊 (m: 大立繪圖, h: 頭像小圖)
    chars: [
        {
            n: "Chris", // 角色名字
            i: "風度翩翩的人，是酒吧裡最受歡迎的調酒師和老闆，總能給予他人最恰當的建議和飲品。\n\n" +
                "「來杯酒嗎？感到疲憊的你。」", // 角色介紹，\n 代表換行
            m: "./info/Chris_normal_glasson.png", // 全身立繪路徑
            h: "./info/QLight_Chris.png" // 圓形頭像路徑
        },
        {
            n: "Lydia",
            i: "畫家兼古董交易商，曾經因為自己天真單純而被傷害，後來變得堅強，學會靠自己。\n\n" +
                "「你就是我畫過，最好的景色」",
            m: "./info/Lydia_normal.png",
            h: "./info/QLight_Lydia.png"
        },
        {
            n: "Sophia",
            i: "看起來不好接近，實則心思細膩善感，執著於正義感的方面意外理想派女律師。\n\n" +
                "「即使沒有這層身分，我依舊是我。」",
            m: "./info/Sophia_normal.png",
            h: "./info/QLight_Sophia.png"
        }
    ],


    // 【全新擴充】區塊 5 實機演示資料
    gameDemoTitle5: "視覺小說",
    gameVideoSrc5: "./info/test.mov", // 區塊 5 的影片路徑

    // 【全新擴充】區塊 6 實機演示資料
    gameDemoTitle6: "寂寞流星雨",
    gameVideoSrc6: "./info/test.mov",  // 區塊 6 的影片路徑


    //// 【遊戲檔案讀取路徑設置區】對應 sec6 與 sec7 的啟動設定
    //gameDownloads: [
    //    {
    //        id: "gameA", // 遊戲 A 標籤
    //        btnText: "開始遊戲", // 按鈕預設文字
    //        loadingText: "系統加載中", // 載入進度文字
    //        completeText: "歡迎回來", // 100% 時顯示文字
    //        fileUrl: "./虛戀協議W/index.html" // WebGL 遊戲存放在本機的路徑
    //    },
    //    {
    //        id: "gameB", // 遊戲 B 標籤
    //        btnText: "開始遊戲",
    //        loadingText: "功能載入中",
    //        completeText: "啟動成功",
    //        fileUrl: "./虛戀協議W/index.html"
    //    }
    //], // <-- 此處逗點已修復，確保後續 staff 區塊可讀取


    // 【製作人員名單】用於人員介紹分頁的網格顯示
    staff: [
        { r: "總籌", u: "人員A" }, // r 代表職稱 (Role), u 代表名字 (User)
        { r: "劇本", u: "人員B" },
        { r: "美術 / 網頁製作", u: "人員C" },
        { r: "遊戲開發", u: "人員C" },
        { r: "社群 / 音效", u: "人員C" },
        { r: "實體活動", u: "人員D" }
    ],

    // === 【全新加入】全站音訊中央管理設定 ===
    audioSettings: {
        defaultVolume: 0.5,   /* 全站預設音量：0.0 (完全無聲) 到 1.0 (最大聲) */
        autoUnmute: true,     /* 是否在滾動進場時，嘗試自動解除靜音開啟聲音 */
        forceMuted: false     /* 簡報展覽安全鎖：若設為 true，全站所有影片與音訊將被強制完全靜音 */
    }


};

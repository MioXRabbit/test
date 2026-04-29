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
        { name: "內容簡介", icon: "icon_info.png" },           // 專案簡介圖標
        { name: "Podcast", icon: "icon_mic.png" },        // 廣播頻道圖標
        { name: "遊戲介紹", icon: "icon_doc.png" },           // 遊戲詳細介紹圖標
        { name: "角色介紹", icon: "icon_char.png" },          // 登場角色圖標
        { name: "視覺小說", icon: "icon_game.png" },       // 遊戲體驗圖標
        { name: "寂寞流星雨", icon: "icon_star.png" },         // 特效頁面圖標
        { name: "製作團隊", icon: "icon_staff.png" }           // 製作團隊圖標
    ],

    // 【文字內容區】管理網頁各區塊的標題與長文本內容
    introTitle: "內容簡介", // 簡介區塊的大標題
    introText: "這是一個傳統捲軸轉場範例。每當你離開此頁面，內容就會重置，再次進入時會重新觸發入場動畫。", // 簡介說明文字
    gameIntroTitle: "遊戲介紹", // 遊戲介紹區塊的大標題
    gameIntroText: "這裡可以放置關於遊戲玩法的核心介紹，例如戰鬥系統、世界觀說明等。", // 遊戲介紹說明文字

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

    // 【角色資料區】定義展示區的角色資訊 (m: 大立繪圖, h: 頭像小圖)
    chars: [
        {
            n: "Chris", // 角色名字
            i: "風度翩翩的人，是酒吧裡最受歡迎的調酒師和老闆，總能給予他人最恰當的建議和飲品。\n\n" +
                "「來杯酒嗎？感到疲憊的你。」", // 角色介紹，\n 代表換行
            m: "./info_char/Chris_normal_glasson.png", // 全身立繪路徑
            h: "charA_head.jpg" // 圓形頭像路徑
        },
        {
            n: "Lydia",
            i: "畫家兼古董交易商，曾經因為自己天真單純而被傷害，後來變得堅強，學會靠自己。\n\n" +
                "「你就是我畫過，最好的景色」",
            m: "./info_char/Lydia_normal.png",
            h: "charA_head.jpg"
        },
        {
            n: "Sophia",
            i: "看起來不好接近，實則心思細膩善感，執著於正義感的方面意外理想派女律師。\n\n" +
                "「即使沒有這層身分，我依舊是我。」",
            m: "./info_char/Sophia_normal.png",
            h: "charA_head.jpg"
        }
    ],

    // 【遊戲檔案讀取路徑設置區】對應 sec5 與 sec6 的啟動設定
    gameDownloads: [
        {
            id: "gameA", // 遊戲 A 標籤
            btnText: "開始遊戲", // 按鈕預設文字
            loadingText: "系統加載中", // 載入進度文字
            completeText: "歡迎回來", // 100% 時顯示文字
            fileUrl: "./虛戀協議W/index.html" // WebGL 遊戲存放在本機的路徑
        },
        {
            id: "gameB", // 遊戲 B 標籤
            btnText: "開始遊戲",
            loadingText: "功能載入中",
            completeText: "啟動成功",
            fileUrl: "./虛戀協議W/index.html"
        }
    ], // <-- 此處逗點已修復，確保後續 staff 區塊可讀取

    // 【製作人員名單】用於人員介紹分頁的網格顯示
    staff: [
        { r: "總籌", u: "人員A" }, // r 代表職稱 (Role), u 代表名字 (User)
        { r: "劇本", u: "人員B" },
        { r: "美術 / 網頁製作", u: "人員C" },
        { r: "遊戲開發", u: "人員C" },
        { r: "社群 / 音效", u: "人員C" },
        { r: "實體活動", u: "人員D" }
    ]
};

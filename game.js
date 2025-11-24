// --- 遊戲全局設定 ---
const NUM_PLAYERS_TOTAL = 4; // 固定總共4個角色
const LOAN_AMOUNT = 100000;
const LOAN_INTEREST = 10000;
const PLAYER_COLORS = ['#e74c3c', '#2ecc71', '#f1c40f', '#3498db'];

// 難度設定
const DIFFICULTY_SETTINGS = {
    easy: { startMoney: 800000, aiAggression: 0.3 },   // 玩家錢多，AI 笨 (30%機率購買)
    normal: { startMoney: 500000, aiAggression: 0.7 }, // 標準
    hard: { startMoney: 300000, aiAggression: 1.0 }    // 玩家錢少，AI 猛 (100%購買)
};

// --- 遊戲數據 (64格, 8x8) ---
const TILES = [
    // --- 上方橫排 (0-7) ---
    { name: "起始任務點", type: "start", rent: 88000 },
    { name: "炭治郎老家", type: "property", price: 10000, rent: 1000, group: 1, owner: null, level: 0 },
    { name: "狹霧山", type: "property", price: 12000, rent: 1200, group: 1, owner: null, level: 0 },
    { name: "鱗瀧的試煉場", type: "property", price: 15000, rent: 1500, group: 1, owner: null, level: 0 },
    { name: "鬼殺隊年費", type: "tax", amount: 20000 },
    { name: "藤襲山選拔", type: "property", price: 18000, rent: 1800, group: 1, owner: null, level: 0 },
    { name: "鎹鴉指令", type: "chance" },
    { name: "淺草區", type: "property", price: 22000, rent: 2200, group: 2, owner: null, level: 0 },

    // --- 右側直排 (8-23) ---
    { name: "珠世的隱藏診所", type: "property", price: 24000, rent: 2400, group: 2, owner: null, level: 0 },
    { name: "愈史郎的血鬼術", type: "chance" },
    { name: "鼓之宅", type: "property", price: 26000, rent: 2600, group: 2, owner: null, level: 0 },
    { name: "善逸師傅家", type: "property", price: 28000, rent: 2800, group: 2, owner: null, level: 0 },
    { name: "機能恢復訓練", type: "rest" },
    { name: "那田蜘蛛山", type: "property", price: 30000, rent: 3000, group: 3, owner: null, level: 0 },
    { name: "水柱的靜水處", type: "property", price: 32000, rent: 3200, group: 3, owner: null, level: 0 },
    { name: "蟲之呼吸訓練場", type: "property", price: 34000, rent: 3400, group: 3, owner: null, level: 0 },
    { name: "蝶屋敷 (醫療所)", type: "property", price: 36000, rent: 3600, group: 3, owner: null, level: 0 },
    { name: "無限列車", type: "property", price: 40000, rent: 4000, group: 4, owner: null, level: 0 },
    { name: "炎柱煉獄家", type: "property", price: 42000, rent: 4200, group: 4, owner: null, level: 0 },
    { name: "下弦壹魘夢巢穴", type: "property", price: 44000, rent: 4400, group: 4, owner: null, level: 0 },
    { name: "鎹鴉指令", type: "chance" },
    { name: "花街吉原", type: "property", price: 48000, rent: 4800, group: 5, owner: null, level: 0 },
    { name: "音之呼吸訓練場", type: "property", price: 50000, rent: 5000, group: 5, owner: null, level: 0 },
    { name: "上弦陸兄妹巢穴", type: "property", price: 52000, rent: 5200, group: 5, owner: null, level: 0 },

    // --- 下方橫排 (24-31) ---
    { name: "刀匠村", type: "property", price: 55000, rent: 5500, group: 6, owner: null, level: 0 },
    { name: "炭治郎的鑄刀師家", type: "property", price: 5000, rent: 500, group: 6, owner: null, level: 0 },
    { name: "戀柱的秘密基地", type: "property", price: 58000, rent: 5800, group: 6, owner: null, level: 0 },
    { name: "霞柱的竹林", type: "property", price: 60000, rent: 6000, group: 6, owner: null, level: 0 },
    { name: "上弦伍玉壺巢穴", type: "property", price: 62000, rent: 6200, group: 6, owner: null, level: 0 },
    { name: "日輪刀保養費", type: "tax", amount: 15000 },
    { name: "九柱訓練所", type: "property", price: 70000, rent: 7000, group: 7, owner: null, level: 0 },
    { name: "岩之呼吸訓練場", type: "property", price: 72000, rent: 7200, group: 7, owner: null, level: 0 },

    // --- 左側直排 (32-47) ---
    { name: "風之呼吸訓練場", type: "property", price: 74000, rent: 7400, group: 7, owner: null, level: 0 },
    { name: "蛇之呼吸訓練場", type: "property", price: 76000, rent: 7600, group: 7, owner: null, level: 0 },
    { name: "鎹鴉指令", type: "chance" },
    { name: "無限城入口", type: "property", price: 80000, rent: 8000, group: 8, owner: null, level: 0 },
    { name: "上弦參猗窩座巢穴", type: "property", price: 82000, rent: 8200, group: 8, owner: null, level: 0 },
    { name: "上弦貳童磨巢穴", type: "property", price: 84000, rent: 8400, group: 8, owner: null, level: 0 },
    { name: "上弦壹黑死牟巢穴", type: "property", price: 86000, rent: 8600, group: 8, owner: null, level: 0 },
    { name: "鬼舞辻無慘決戰地", type: "property", price: 90000, rent: 9000, group: 8, owner: null, level: 0 },
    { name: "產屋敷邸 (本部)", type: "property", price: 100000, rent: 10000, group: 9, owner: null, level: 0 },
    { name: "療養所", type: "rest" },
    { name: "隱的後勤部隊", type: "property", price: 8000, rent: 800, group: 2, owner: null, level: 0 },
    { name: "嘴平伊之助的住所", type: "property", price: 8000, rent: 800, group: 2, owner: null, level: 0 },
    { name: "栗花落香奈乎道場", type: "property", price: 35000, rent: 3500, group: 3, owner: null, level: 0 },
    { name: "煉獄杏壽郎遺物", type: "property", price: 41000, rent: 4100, group: 4, owner: null, level: 0 },
    { name: "特別任務：搜山", type: "chance" },
    { name: "紫藤花家紋之家", type: "property", price: 20000, rent: 2000, group: 1, owner: null, level: 0 },

    // --- 填充剩餘 ---
    { name: "水之呼吸道場", type: "property", price: 15000, rent: 1500, group: 1, owner: null, level: 0 },
    { name: "火之神神樂遺跡", type: "property", price: 50000, rent: 5000, group: 9, owner: null, level: 0 },
    { name: "時透無一郎的道場", type: "property", price: 58000, rent: 5800, group: 6, owner: null, level: 0 },
    { name: "不死川實彌的道場", type: "property", price: 72000, rent: 7200, group: 7, owner: null, level: 0 },
    { name: "甘露寺蜜璃的茶屋", type: "property", price: 56000, rent: 5600, group: 6, owner: null, level: 0 },
    { name: "伊黑小芭內的樹林", type: "property", price: 74000, rent: 7400, group: 7, owner: null, level: 0 },
    { name: "悲鳴嶼行冥的瀑布", type: "property", price: 78000, rent: 7800, group: 7, owner: null, level: 0 },
    { name: "胡蝶忍的藥房", type: "property", price: 34000, rent: 3400, group: 3, owner: null, level: 0 },
    { name: "錆兔與真菰的岩石", type: "property", price: 12000, rent: 1200, group: 1, owner: null, level: 0 },
    { name: "鋼鐵塚螢的工坊", type: "property", price: 54000, rent: 5400, group: 6, owner: null, level: 0 },
    { name: "柱合會議", type: "tax", amount: 30000 },
    { name: "鎹鴉信差站", type: "property", price: 20000, rent: 2000, group: 2, owner: null, level: 0 },
    { name: "彌豆子的箱子", type: "chance" },
    { name: "日之呼吸傳承", type: "property", price: 95000, rent: 9500, group: 9, owner: null, level: 0 },
    { name: "青色彼岸花", type: "property", price: 100000, rent: 10000, group: 9, owner: null, level: 0 },
    { name: "大正秘密", type: "chance" }
];

// --- 鎹鴉指令卡 (純金錢/狀態，無位移) ---
const CHANCE_CARDS = [
    { type: 'money', amount: 30000, desc: '賣炭獲得了意外的高價，獲得 ¥30,000。', reaction: 'chance_money' },
    { type: 'money', amount: 50000, desc: '主公大人特別賞賜，獲得 ¥50,000。', reaction: 'chance_money' },
    { type: 'money', amount: -20000, desc: '在戰鬥中破壞了房屋，賠償 ¥20,000。', reaction: 'chance_bad' },
    { type: 'money', amount: 20000, desc: '協助村民驅鬼，獲得謝禮 ¥20,000。', reaction: 'chance_money' },
    { type: 'money', amount: 100000, desc: '發現了鬼舞辻無慘的藏寶庫！獲得 ¥100,000！', reaction: 'chance_money' },
    { type: 'money', amount: -15000, desc: '日輪刀折斷，支付 ¥15,000 修理費。', reaction: 'chance_bad' },
    { type: 'money', amount: 40000, desc: '受到柱的指導，能力提升，獲得經費 ¥40,000。', reaction: 'chance_money' },
    { type: 'skip', turns: 1, desc: '受重傷住院，暫停一回合。' },
    { type: 'upgrade_free', desc: '全集中呼吸！免費升級您的一塊地產。', reaction: 'upgrade_success' },
    { type: 'all_pay', amount: 5000, desc: '舉辦慶功宴，每位隊員支付您 ¥5,000。', reaction: 'chance_money' },
    { type: 'pay_all', amount: 5000, desc: '請所有隊員吃天婦羅，支付每人 ¥5,000。', reaction: 'chance_bad' }
];

const NUM_TILES = TILES.length; // 64

// --- 遊戲狀態 ---
let players = [];
let currentPlayerIndex = 0;
let isRolling = false;
let currentTileIndex = null; 
let currentDifficulty = 'normal'; // 預設

// DOM Elements
const rollDiceBtn = document.getElementById('roll-dice-btn');
const endTurnBtn = document.getElementById('end-turn-btn');
const buyBtn = document.getElementById('buy-btn');
const upgradeBtn = document.getElementById('upgrade-btn');
const continueBtn = document.getElementById('continue-btn');
const startGameBtn = document.getElementById('start-game-btn');
const setupScreen = document.getElementById('setup-screen');
const gameContainer = document.getElementById('game-container');

// --- 對話庫 ---
function getReaction(action, player, target = null) {
    const pName = player.name;
    const tName = target ? target.name : '';
    const isAI = player.isAI;
    
    const reactions = {
        'buy': [`${pName}：這裡歸我守護了！`, `為了滅鬼，我需要這個據點！`],
        'upgrade': [`${pName}：防禦工事加強了！`, `全集中！設施強化！`],
        'rent': [`${pName}：好痛...支付給 ${tName} 過路費。`, `${pName}：居然走到 ${tName} 的地盤...`],
        'start': [`${pName}：回到起點，領取補給！`, `${pName}：繼續下一個任務！`],
        'bankrupt': [`${pName}：我...無法再戰鬥了...`, `對不起，主公大人...`],
        'chance_money': [`${pName}：太好了！`, `這筆資金很有用！`],
        'chance_bad': [`${pName}：真倒霉...`, `必須更小心才行。`],
        'loan': [`${pName}：主公大人，請借給我力量！`, `${pName}：我一定會加倍奉還的！`],
        'loan_interest': [`${pName}：支付利息給主公...`, `債務還沒還清啊...`],
        'ai_thinking': [`${pName} 正在思考...`, `${pName} 正在觀察局勢...`]
    };
    
    if (isAI) return `${pName} (AI) 執行了操作。`; // 簡化 AI 對話
    
    const list = reactions[action];
    return list ? list[Math.floor(Math.random() * list.length)] : '';
}

function logMessage(msg, type = 'info') {
    const log = document.getElementById('message-log');
    const p = document.createElement('p');
    p.textContent = msg;
    p.className = `log-${type}`;
    log.prepend(p);
    if(log.children.length > 30) log.removeChild(log.lastChild);
}

// --- 初始化：讀取設定 ---
function startGame() {
    // 讀取表單設定
    const diffRadios = document.getElementsByName('difficulty');
    for (const r of diffRadios) {
        if (r.checked) currentDifficulty = r.value;
    }
    
    const humanCount = parseInt(document.getElementById('human-count').value);
    const settings = DIFFICULTY_SETTINGS[currentDifficulty];
    
    // 創建玩家
    players = [];
    for (let i = 1; i <= NUM_PLAYERS_TOTAL; i++) {
        const isAI = i > humanCount; // 超過人類數量的都是 AI
        players.push({
            id: i,
            name: isAI ? `電腦 ${i}號` : `隊員 ${i}`,
            money: settings.startMoney,
            position: 0,
            properties: [],
            skipTurn: 0,
            hasUsedLoan: false,
            loanActive: false,
            isAI: isAI,
            aggression: settings.aiAggression // AI 個性
        });
    }

    // UI 切換
    setupScreen.style.display = 'none';
    gameContainer.classList.remove('hidden');
    
    createBoardUI();
    updateUI();
    
    // 綁定遊戲內按鈕
    rollDiceBtn.addEventListener('click', rollDice);
    endTurnBtn.addEventListener('click', endTurn);
    buyBtn.addEventListener('click', handleBuy);
    upgradeBtn.addEventListener('click', handleUpgrade);
    continueBtn.addEventListener('click', endTurn);
    
    logMessage(`🎉 任務開始！難度：${currentDifficulty.toUpperCase()}。`, 'system');
    
    // 檢查第一位是否為 AI (罕見但可能)
    checkAITurn();
}

// 綁定開始按鈕
startGameBtn.addEventListener('click', startGame);


// --- 地圖 UI ---
function createBoardUI() {
    const container = document.getElementById('map-tiles');
    container.innerHTML = ''; // 清空
    TILES.forEach((tile, index) => {
        const div = document.createElement('div');
        div.className = `tile ${tile.type}-tile group-${tile.group || 'none'}`;
        div.id = `tile-${index}`;
        div.innerHTML = `
            <div class="owner-strip"></div>
            <span class="tile-index">${index}</span>
            <span class="tile-name">${tile.name}</span>
            ${tile.type === 'property' ? `<span class="tile-price">¥${tile.price.toLocaleString()}</span>` : ''}
            <div class="player-token-slot"></div>
        `;
        container.appendChild(div);
    });
}

function updateUI() {
    const pInfo = document.getElementById('player-info');
    pInfo.innerHTML = '<h2>隊員狀態</h2>';
    players.forEach((p, idx) => {
        const div = document.createElement('div');
        div.className = `player-card ${idx === currentPlayerIndex ? 'active' : ''}`;
        div.style.borderLeft = `5px solid ${PLAYER_COLORS[idx]}`;
        
        const loanStatus = p.loanActive ? '<span style="color:red;">[欠款]</span>' : '';
        const aiTag = p.isAI ? '<span class="tag-ai">AI</span>' : '';
        
        div.innerHTML = `
            ${aiTag}
            <h3>${p.name}</h3>
            <p>資金: ¥${p.money.toLocaleString()} ${loanStatus}</p>
            <p>位置: ${TILES[p.position].name}</p>
        `;
        pInfo.appendChild(div);
    });

    document.querySelectorAll('.player-token').forEach(e => e.remove());
    players.forEach(p => {
        const slot = document.querySelector(`#tile-${p.position} .player-token-slot`);
        if (slot) {
            const token = document.createElement('div');
            token.className = `player-token`;
            token.style.backgroundImage = `url('player${p.id}_token.png')`;
            slot.appendChild(token);
        }
    });

    TILES.forEach((tile, idx) => {
        const div = document.getElementById(`tile-${idx}`);
        const strip = div.querySelector('.owner-strip');
        if (tile.type === 'property') {
            if (tile.owner) {
                strip.style.backgroundColor = PLAYER_COLORS[tile.owner - 1];
                strip.textContent = '★'.repeat(tile.level);
            } else {
                strip.style.backgroundColor = 'transparent';
                strip.textContent = '';
            }
        }
    });
    
    const currP = players[currentPlayerIndex];
    document.getElementById('current-player-display').textContent = 
        `當前回合: ${currP.name} ${currP.isAI ? '(電腦)' : ''}`;
}

// --- 核心流程 ---

// 檢查是否輪到 AI
function checkAITurn() {
    const player = players[currentPlayerIndex];
    if (player.isAI) {
        // 鎖定按鈕
        rollDiceBtn.disabled = true;
        hideButtons();
        // 延遲後自動擲骰
        setTimeout(() => {
            rollDice();
        }, 1500);
    } else {
        // 人類玩家，解鎖骰子
        rollDiceBtn.disabled = false;
    }
}

function rollDice() {
    if (isRolling) return;
    const player = players[currentPlayerIndex];

    if (player.skipTurn > 0) {
        logMessage(`${player.name} 休息中...`, 'info');
        player.skipTurn--;
        endTurn();
        return;
    }

    isRolling = true;
    hideButtons();
    rollDiceBtn.disabled = true;

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const steps = d1 + d2;

    document.getElementById('dice-result').textContent = `🎲 ${d1} + ${d2} = ${steps}`;
    logMessage(`${player.name} 擲出了 ${steps} 點。`, 'info');

    setTimeout(() => {
        movePlayer(player, steps);
        isRolling = false;
    }, 1000);
}

function movePlayer(player, steps) {
    const oldPos = player.position;
    const newPos = (oldPos + steps) % NUM_TILES;

    if (newPos < oldPos && steps > 0) {
        handleStartPass(player);
    }

    player.position = newPos;
    currentTileIndex = newPos;
    updateUI(); 

    handleTileEvent(player, TILES[newPos]);
}

function handleStartPass(player) {
    let income = TILES[0].rent;
    
    if (player.loanActive) {
        if (player.money >= LOAN_INTEREST) {
            player.money -= LOAN_INTEREST;
            logMessage(`${player.name} 支付利息 ¥10,000。`, 'money');
        } else {
            player.money -= LOAN_INTEREST;
            logMessage(`${player.name} 欠款利息增加...`, 'alert');
        }
    }

    player.money += income;
    logMessage(`${player.name} 經過起點，獲得 ¥${income.toLocaleString()}。`, 'money');
}

function handleTileEvent(player, tile) {
    hideButtons();

    if (tile.type === 'property') {
        if (!tile.owner) {
            // 無主地
            if (player.isAI) {
                // AI 決策：買不買？
                setTimeout(() => aiDecideBuy(player, tile), 1000);
            } else {
                logMessage(`無主地，要購買嗎？`, 'info');
                showButton('buy');
            }
        } else if (tile.owner !== player.id) {
            // 付租金
            const owner = players[tile.owner - 1];
            const isGroupFull = checkGroupOwnership(owner, tile.group);
            let rent = tile.rent * Math.pow(2, tile.level);
            if (isGroupFull) {
                rent *= 2; 
                logMessage(`【區域連鎖】${owner.name} 擁有此區域所有地產，過路費加倍！`, 'alert');
            }
            
            logMessage(getReaction('rent', player, owner), 'dialogue');
            player.money -= rent;
            owner.money += rent;
            logMessage(`${player.name} 支付 ¥${rent.toLocaleString()} 給 ${owner.name}。`, 'money');
            checkBankruptcy(player);
            setTimeout(endTurn, 1500);
        } else {
            // 自己地產
            if (player.isAI) {
                setTimeout(() => aiDecideUpgrade(player, tile), 1000);
            } else {
                logMessage(`你的領地，要升級嗎？`, 'info');
                showButton('upgrade');
            }
        }
    } 
    else if (tile.type === 'tax') {
        player.money -= tile.amount;
        logMessage(`${player.name} 繳納稅金 ¥${tile.amount.toLocaleString()}。`, 'money');
        checkBankruptcy(player);
        setTimeout(endTurn, 1500);
    }
    else if (tile.type === 'chance') {
        handleChanceCard(player);
    }
    else if (tile.type === 'rest') {
        logMessage(`${player.name} 休息一回合。`, 'info');
        player.skipTurn = 1;
        if (player.isAI) setTimeout(endTurn, 1000);
        else showButton('continue');
    }
    else {
        // Start 或其他
        if (player.isAI) setTimeout(endTurn, 1000);
        else showButton('continue');
    }
}

// --- AI 決策邏輯 ---
function aiDecideBuy(player, tile) {
    // 簡單邏輯：錢夠且隨機數 < aggression 就買
    if (player.money >= tile.price) {
        if (Math.random() < player.aggression) {
            handleBuy(); // 呼叫共用購買函數
        } else {
            logMessage(`${player.name} 決定不購買。`, 'info');
            endTurn();
        }
    } else {
        logMessage(`${player.name} 資金不足放棄購買。`, 'info');
        endTurn();
    }
}

function aiDecideUpgrade(player, tile) {
    const cost = tile.price * 0.5;
    if (tile.level < 3 && player.money >= cost) {
        if (Math.random() < player.aggression) {
            handleUpgrade();
        } else {
            endTurn();
        }
    } else {
        endTurn();
    }
}

// --- 區域連動檢查 ---
function checkGroupOwnership(owner, groupID) {
    if (!groupID) return false;
    const groupTiles = TILES.filter(t => t.group === groupID && t.type === 'property');
    return groupTiles.every(t => t.owner === owner.id);
}

// --- 按鈕動作 ---
function handleBuy() {
    const player = players[currentPlayerIndex];
    const tile = TILES[currentTileIndex];

    if (player.money >= tile.price) {
        player.money -= tile.price;
        tile.owner = player.id;
        player.properties.push(currentTileIndex);
        logMessage(getReaction('buy', player), 'dialogue');
        logMessage(`${player.name} 佔領 ${tile.name}！`, 'success');
        updateUI();
        endTurn();
    } else {
        logMessage(`資金不足。`, 'alert');
        if (!player.isAI) endTurn(); 
    }
}

function handleUpgrade() {
    const player = players[currentPlayerIndex];
    const tile = TILES[currentTileIndex];
    const cost = tile.price * 0.5;

    if (tile.level >= 3) {
        logMessage(`已達最高等級。`, 'info');
        endTurn();
        return;
    }

    if (player.money >= cost) {
        player.money -= cost;
        tile.level++;
        logMessage(getReaction('upgrade', player), 'dialogue');
        logMessage(`升級成功！等級 ${tile.level}。`, 'success');
        updateUI();
        endTurn();
    } else {
        logMessage(`資金不足。`, 'alert');
        endTurn();
    }
}

// --- 機會卡 ---
function handleChanceCard(player) {
    const card = CHANCE_CARDS[Math.floor(Math.random() * CHANCE_CARDS.length)];
    logMessage(`【鎹鴉指令】${card.desc}`, 'chance');

    if (card.type === 'money') {
        player.money += card.amount;
    } 
    else if (card.type === 'all_pay') {
        players.forEach(p => {
            if (p !== player) {
                p.money -= card.amount;
                player.money += card.amount;
                checkBankruptcy(p);
            }
        });
    }
    else if (card.type === 'pay_all') {
        players.forEach(p => {
            if (p !== player) {
                player.money -= card.amount;
                p.money += card.amount;
            }
        });
    }
    else if (card.type === 'skip') {
        player.skipTurn += card.turns;
    }
    else if (card.type === 'upgrade_free') {
        const myProps = TILES.filter(t => t.owner === player.id && t.level < 3);
        if (myProps.length > 0) {
            const target = myProps[Math.floor(Math.random() * myProps.length)];
            target.level++;
            logMessage(`${target.name} 免費升級了！`, 'success');
        } else {
            logMessage(`無可升級地產。`, 'info');
        }
    }

    checkBankruptcy(player);
    updateUI();
    
    if (player.isAI) {
        setTimeout(endTurn, 2000);
    } else {
        showButton('continue');
    }
}

// --- 破產與借款 ---
function checkBankruptcy(player) {
    if (player.money < 0) {
        if (!player.hasUsedLoan) {
            // 自動觸發借款 (AI與人類共用邏輯)
            logMessage(`主公產屋敷耀哉援助了 ${player.name}！`, 'system');
            player.money += LOAN_AMOUNT;
            player.hasUsedLoan = true;
            player.loanActive = true;
            logMessage(`${player.name} 獲得 ¥${LOAN_AMOUNT.toLocaleString()} (需付利息)。`, 'success');
            updateUI();
        } else {
            // 破產
            logMessage(`${player.name} 破產退場！`, 'alert');
            TILES.forEach(t => {
                if (t.owner === player.id) {
                    t.owner = null;
                    t.level = 0;
                }
            });
            players = players.filter(p => p.id !== player.id);
            updateUI();
            
            if (players.length === 1) {
                alert(`遊戲結束！${players[0].name} 獲勝！`);
                rollDiceBtn.disabled = true;
            }
        }
    }
}

// --- UI 控制 ---
function hideButtons() {
    buyBtn.classList.add('hidden');
    upgradeBtn.classList.add('hidden');
    continueBtn.classList.add('hidden');
    endTurnBtn.classList.add('hidden');
}

function showButton(type) {
    hideButtons();
    // 如果是 AI，不應該顯示按鈕給人類點 (理論上 AI 邏輯會繞過這裡，但做個保險)
    if (players[currentPlayerIndex].isAI) return;

    if (type === 'buy') {
        buyBtn.classList.remove('hidden');
        buyBtn.textContent = `佔領 (¥${TILES[currentTileIndex].price.toLocaleString()})`;
        endTurnBtn.classList.remove('hidden');
        endTurnBtn.textContent = '放棄';
    } else if (type === 'upgrade') {
        upgradeBtn.classList.remove('hidden');
        endTurnBtn.classList.remove('hidden');
        endTurnBtn.textContent = '不升級';
    } else if (type === 'continue') {
        continueBtn.classList.remove('hidden');
    }
}

function endTurn() {
    hideButtons();
    rollDiceBtn.disabled = false;
    
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateUI();
    
    // 檢查是否為 AI 回合
    checkAITurn();
}
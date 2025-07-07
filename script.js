// --- 汎用的な都道府県データ (種類を減らしてシンプル化) ---
// 各カテゴリに複数のバリエーションを持たせる
const prefectureCategories = [
    {
        type: 'Mountain',
        bgs: ['#ccffcc', '#b0e0e6', '#c9e4c5'], // 緑系、水色系の背景
        items: [
            {name:'きのこ', emoji:'🍄', color:'#8b4513', sparkleEmoji:'💎'},
            {name:'木の実', emoji:'🌰', color:'#a0522d', sparkleEmoji:'🌟'}
        ],
        obstacles: [
            {name:'岩', emoji:'🪨', color:'#888888'},
            {name:'木', emoji:'🌲', color:'#228b22'}
        ],
        infoTemplates: [
            '山々に囲まれた自然豊かな場所。新鮮な空気が美味しいよ！',
            '温泉がたくさんある地域。旅の疲れを癒やそう！',
            '清流が美しい山あいの県。渓流釣りも楽しめるよ！'
        ]
    },
    {
        type: 'Coast',
        bgs: ['#add8e6', '#e0ffff', '#afeeee'], // 青系、水色系の背景
        items: [
            {name:'貝殻', emoji:'🐚', color:'#f5f5dc', sparkleEmoji:'✨'},
            {name:'魚', emoji:'🐟', color:'#1e90ff', sparkleEmoji:'🐠'}
        ],
        obstacles: [
            {name:'カニ', emoji:'🦀', color:'#dc143c'},
            {name:'浮き輪', emoji:'🍩', color:'#ffa500'}
        ],
        infoTemplates: [
            '海に面した温暖な地域。美味しい海の幸が豊富！',
            '美しい海岸線が続く県。夕日がとても綺麗だよ！',
            '新鮮な魚介類が自慢の港町。お寿司が有名だよ！'
        ]
    },
    {
        type: 'City',
        bgs: ['#f8f8ff', '#fffaf0', '#f0f8ff'], // 白系、明るい背景
        items: [
            {name:'お菓子', emoji:'🍬', color:'#ffb6c1', sparkleEmoji:'🍭'},
            {name:'コーヒー', emoji:'☕', color:'#654321', sparkleEmoji:'🥂'}
        ],
        obstacles: [
            {name:'ビル', emoji:'🏢', color:'#808080'},
            {name:'車', emoji:'🚗', color:'#a9a9a9'}
        ],
        infoTemplates: [
            '都会の賑わいが楽しい場所。ショッピングも充実！',
            '歴史と文化が融合した街。古い建物と新しいお店が並ぶよ！',
            '交通の便が良い大都市。何でも揃う便利な地域！'
        ]
    },
    {
        type: 'Rural',
        bgs: ['#ffefd5', '#f0fff0', '#f5f5dc'], // 黄土色系、淡い緑系
        items: [
            {name:'野菜', emoji:'🥕', color:'#ff8c00', sparkleEmoji:'🌽'},
            {name:'お米', emoji:'🌾', color:'#f5deb3', sparkleEmoji:'🍚'}
        ],
        obstacles: [
            {name:'かかし', emoji:'🫨', color:'#8b4513'},
            {name:'石', emoji:'🗿', color:'#708090'}
        ],
        infoTemplates: [
            '田園風景が広がるのどかな場所。四季折々の景色が美しいよ！',
            '伝統的な祭りが残る地域。地元の人との交流が楽しいよ！',
            '美味しい農産物が豊富な県。郷土料理もぜひ味わってね！'
        ]
    }
];

// 47都道府県のリスト (名前のみでOK)
const allPrefectureNames = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

// 都道府県データを作成するヘルパー関数
function createPrefectureData(name) {
    const category = prefectureCategories[Math.floor(Math.random() * prefectureCategories.length)];
    const item = category.items[Math.floor(Math.random() * category.items.length)];
    const obstacle = category.obstacles[Math.floor(Math.random() * category.obstacles.length)];
    const info = category.infoTemplates[Math.floor(Math.random() * category.infoTemplates.length)];
    const bg = category.bgs[Math.floor(Math.random() * category.bgs.length)];

    return {
        name: name,
        bg: bg,
        item: item,
        obstacle: obstacle,
        info: info
    };
}

// --- ゲームインスタンス管理 ---
let currentGameInstance = null;

// --- ゲーム開始関数 ---
function startGame(prefListNames) {
    if (!prefListNames || prefListNames.length === 0) {
        alert('1つ以上の県を選択してください');
        return;
    }
    // 選択された名前から動的に都道府県データを生成
    const selectedPrefectureData = prefListNames.map(name => createPrefectureData(name));

    if (currentGameInstance && currentGameInstance._cancelAnimationFrame) {
        currentGameInstance._cancelAnimationFrame();
    }
    // UI要素の表示/非表示を切り替える
    document.getElementById('modeSelect').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('ui').style.display = 'flex';
    document.getElementById('jumpButton').style.display = 'block';
    document.getElementById('instructions').style.display = 'block'; // ゲーム開始時の説明
    
    currentGameInstance = new FireworksJourneyGame(selectedPrefectureData);
}

// --- モード選択ボタンイベント ---
document.getElementById('fullModeBtn').onclick = () => {
    startGame([...allPrefectureNames]); // 全ての県名でスタート
};

document.getElementById('shortModeBtn').onclick = () => {
    const shuffledNames = [...allPrefectureNames].sort(() => Math.random() - 0.5);
    startGame(shuffledNames.slice(0, 5)); // 5つの県名でスタート
};

document.getElementById('selectModeStartBtn').onclick = () => { // ボタンID変更
    const select = document.getElementById('prefectureSelect'); // セレクトボックスID変更
    const selectedNames = Array.from(select.selectedOptions).map(opt => opt.textContent); // 名前を取得
    startGame(selectedNames);
};

document.getElementById('retryBtn').onclick = () => {
    if (currentGameInstance && currentGameInstance._cancelAnimationFrame) {
        currentGameInstance._cancelAnimationFrame();
    }
    // UI要素の表示/非表示をリセット
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('ui').style.display = 'none';
    document.getElementById('jumpButton').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('modeSelect').style.display = 'flex'; // flexで表示
    createPrefectureSelector(); // モード選択に戻るたびにセレクトボックスを再生成
};

// --- 県選択UI生成 ---
function createPrefectureSelector() {
    const area = document.getElementById('prefectureSelectorArea');
    area.innerHTML = ''; // 既存のセレクトボックスをクリア
    const select = document.createElement('select');
    select.id = 'prefectureSelect'; // ID変更
    select.multiple = true;
    select.size = 7;
    allPrefectureNames.forEach((name) => { // 県名リストからオプションを生成
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
    area.appendChild(select);
    document.getElementById('selectHint').textContent = '※ CtrlキーやShiftキーで複数選択できます (スマホはタップ操作)';
}

// --- 初期ロード時の処理 ---
window.addEventListener('DOMContentLoaded', () => {
    createPrefectureSelector(); // 初期ロード時にセレクトボックスを生成
    
    // 初期説明を表示
    const initialInstructions = document.getElementById('initialInstructions');
    if (initialInstructions) {
        initialInstructions.textContent = '遊びたいモードを選んでね！「セレクトの旅」では好きな都道府県をCtrl/Shiftキー（PC）またはタップ（スマホ）で選べるよ！スペースキーでもジャンプできるよ！';
        document.getElementById('modeSelect').style.display = 'flex'; // 初期画面を表示
    }
});
// --- ゲーム本体クラス ---
class FireworksJourneyGame {
    constructor(selectedPrefecturesData) {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        this.prefectures = selectedPrefecturesData; // 生成された都道府県データを受け取る
        this.currentPrefectureIndex = 0;
        this.sectionStartTime = Date.now();
        this.gameSpeed = 0.5;
        this.score = 0;
        this.life = 100; // ライフは100からスタート
        this.sectionTimeLimit = 60; // 各都道府県の滞在時間 (秒)

        this.player = {
            x: 100,
            y: 0,
            width: 40,
            height: 60,
            velocityY: 0,
            isJumping: false,
            isHoldingJump: false,
            jumpStartTime: 0,
            groundY: 0,
        };

        this.obstacles = [];
        this.items = [];
        this.stars = this.generateStars();
        this.popups = [];
        
        this.isGameRunning = true;
        this._gameLoopId = null;

        this.setupControls();
        this.showCurrentPrefecture(); 
        this.updateUI();

        this.gameLoop();

        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('orientationchange', () => this.resizeCanvas());
    }

    _cancelAnimationFrame() {
        if (this._gameLoopId) {
            cancelAnimationFrame(this._gameLoopId);
            this._gameLoopId = null;
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.player.groundY = this.canvas.height - 150;
        if (!this.player.isJumping) {
            this.player.y = this.player.groundY;
        }
    }

    generateStars() {
        const stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * this.canvas.width * 3,
                y: Math.random() * this.canvas.height * 0.6,
                size: Math.random() * 2 + 1,
                brightness: Math.random()
            });
        }
        return stars;
    }

    setupControls() {
        const jumpBtn = document.getElementById('jumpButton');
        
        // 既存のリスナーを確実に削除
        if (this._currentJumpButtonListener) {
            jumpBtn.removeEventListener('pointerdown', this._currentJumpButtonListener);
            jumpBtn.removeEventListener('pointerup', this._currentJumpButtonListener);
            jumpBtn.removeEventListener('pointercancel', this._currentJumpButtonListener);
            jumpBtn.removeEventListener('pointerleave', this._currentJumpButtonListener);
        }
        if (this._currentKeydownListener) {
            document.removeEventListener('keydown', this._currentKeydownListener);
        }
        if (this._currentKeyupListener) {
            document.removeEventListener('keyup', this._currentKeyupListener);
        }

        this._currentJumpButtonListener = (e) => {
            e.preventDefault();
            if (e.type === 'pointerdown') {
                this.startJump();
            } else if (e.type === 'pointerup' || e.type === 'pointercancel' || e.type === 'pointerleave') {
                this.endJump();
            }
        };
        jumpBtn.addEventListener('pointerdown', this._currentJumpButtonListener);
        jumpBtn.addEventListener('pointerup', this._currentJumpButtonListener);
        jumpBtn.addEventListener('pointercancel', this._currentJumpButtonListener);
        jumpBtn.addEventListener('pointerleave', this._currentJumpButtonListener);

        this._currentKeydownListener = (e) => {
            if (e.code === 'Space' && !this.player.isHoldingJump) { 
                e.preventDefault();
                this.startJump();
            }
        };
        document.addEventListener('keydown', this._currentKeydownListener);

        this._currentKeyupListener = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.endJump();
            }
        };
        document.addEventListener('keyup', this._currentKeyupListener);
    }

    startJump() {
        if (!this.player.isJumping && this.isGameRunning && this.player.y >= this.player.groundY) {
            this.player.isJumping = true;
            this.player.isHoldingJump = true;
            this.player.jumpStartTime = Date.now();
        }
    }

    endJump() {
        this.player.isHoldingJump = false;
    }

    update() {
        if (!this.isGameRunning) return;

        // ジャンプ処理と重力
        if (this.player.isJumping) {
            const jumpDuration = (Date.now() - this.player.jumpStartTime) / 1000;
            if (this.player.isHoldingJump && jumpDuration < 0.6) {
                this.player.velocityY = -10;
            } else {
                this.player.isHoldingJump = false;
            }
        }
        if (!this.player.isHoldingJump) {
            this.player.velocityY += 0.8;
        }
        this.player.y += this.player.velocityY;

        // 地面との衝突判定
        if (this.player.y >= this.player.groundY) {
            this.player.y = this.player.groundY;
            this.player.velocityY = 0;
            this.player.isJumping = false;
            this.player.isHoldingJump = false;
        }

        // 背景と星のスクロール
        this.backgroundOffset = (this.backgroundOffset || 0) + this.gameSpeed * 2;
        this.stars.forEach(star => {
            star.x -= this.gameSpeed * 0.5;
            if (star.x < -10) {
                star.x = this.canvas.width + Math.random() * 200;
                star.y = Math.random() * this.canvas.height * 0.6;
            }
        });

        // アイテム出現ロジック
        if (Math.random() < 0.015 * this.gameSpeed) { // 出現頻度を調整
            const itemData = this.prefectures[this.currentPrefectureIndex].item;
            this.items.push({
                x: this.canvas.width,
                y: this.player.groundY - 30 - Math.random() * 50,
                width: 36,
                height: 36,
                color: itemData.color,
                emoji: itemData.emoji, // 絵文字を追加
                sparkleEmoji: itemData.sparkleEmoji,
                isSparkle: Math.random() < 0.15 // キラキラアイテムの出現確率
            });
        }

        // アイテムの更新と衝突判定
        this.items = this.items.filter(item => {
            item.x -= this.gameSpeed * 2;
            if (
                this.player.x < item.x + item.width &&
                this.player.x + this.player.width > item.x &&
                this.player.y < item.y + item.height &&
                this.player.y + this.player.height > item.y
            ) {
                const scoreGain = item.isSparkle ? 300 : 100;
                this.score += scoreGain;
                this.launchFireworks(item.isSparkle);
                this.showPop(`+${scoreGain}`, item.x, item.y, item.isSparkle);
                return false;
            }
            return item.x > -item.width;
        });

        // 障害物出現ロジック
        if (Math.random() < 0.025 * this.gameSpeed) { // 出現頻度を調整
            const obsData = this.prefectures[this.currentPrefectureIndex].obstacle;
            this.obstacles.push({
                x: this.canvas.width,
                y: this.player.groundY + 20,
                width: 36,
                height: 50,
                color: obsData.color,
                emoji: obsData.emoji, // 絵文字を追加
                shake: 0
            });
        }

        // 障害物の更新と衝突判定
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.x -= this.gameSpeed * 3;
            const px = this.player.x, py = this.player.y, pw = this.player.width, ph = this.player.height;
            const ox = obstacle.x, oy = obstacle.y, ow = obstacle.width, oh = obstacle.height;
            const isColliding = (px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy);

            if (isColliding) {
                const playerBottom = py + ph;
                const obsTop = oy;
                const isLandingOnTop =
                    (playerBottom > obsTop - 8 && playerBottom < obsTop + 16) &&
                    this.player.velocityY > 0 &&
                    px + pw > ox + 5 && px < ox + ow - 5;

                if (isLandingOnTop) {
                    this.player.y = obsTop - ph;
                    this.player.velocityY = 0;
                    this.player.isJumping = false;
                    this.player.isHoldingJump = false;
                    obstacle.shake = 6;
                    return true;
                } else {
                    this.life -= 5; // ライフを5減らす
                    this.score = Math.max(0, this.score - 50); // スコアを50減らす
                    this.player.x = Math.max(50, this.player.x - 10);
                    obstacle.shake = 12;
                    this.showPop("-5", obstacle.x, obstacle.y, false, true);
                    this.updateUI();
                    if (this.life <= 0) {
                        this.gameOver();
                    }
                    return false;
                }
            }
            if (obstacle.shake > 0) obstacle.shake--;
            return obstacle.x > -obstacle.width;
        });

        // ゲームスピードの調整（時間経過で速度アップ）
        this.checkSectionTime();
        this.updateUI();
    }
    checkSectionTime() {
        const elapsedTime = (Date.now() - this.sectionStartTime) / 1000;
        this.gameSpeed = 0.5 + Math.min(1.5, elapsedTime / 60); // 最大2.0x

        if (elapsedTime >= this.sectionTimeLimit) {
            this.moveToNextPrefecture();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.prefectures[this.currentPrefectureIndex].bg;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 星の描画
        this.ctx.save();
        this.ctx.globalAlpha = 0.7;
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            this.ctx.fill();
        });
        this.ctx.restore();

        // 地面の描画
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(0, this.player.groundY + this.player.height - 20, this.canvas.width, this.canvas.height - (this.player.groundY + this.player.height - 20));

        // プレイヤーキャラクターの描画
        this.ctx.save();
        const px = this.player.x, py = this.player.y;

        // 体
        this.ctx.beginPath();
        this.ctx.ellipse(px + 20, py + 50, 18, 24, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = "#ffe6fa";
        this.ctx.shadowColor = "#e0f7fa";
        this.ctx.shadowBlur = 8;
        this.ctx.fill();

        // 顔
        this.ctx.beginPath();
        this.ctx.arc(px + 20, py + 26, 20, 0, Math.PI * 2);
        this.ctx.fillStyle = "#fffbe8";
        this.ctx.shadowColor = "#ffb6d5";
        this.ctx.shadowBlur = 12;
        this.ctx.fill();

        // ほっぺ
        this.ctx.beginPath();
        this.ctx.arc(px + 12, py + 34, 4, 0, Math.PI * 2);
        this.ctx.arc(px + 28, py + 34, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = "#ffb6d5";
        this.ctx.globalAlpha = 0.5;
        this.ctx.fill();
        this.ctx.globalAlpha = 1.0;

        // 目
        this.ctx.beginPath();
        this.ctx.arc(px + 14, py + 26, 3, 0, Math.PI * 2);
        this.ctx.arc(px + 26, py + 26, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = "#a14f7a";
        this.ctx.fill();

        // 口
        this.ctx.beginPath();
        this.ctx.arc(px + 20, py + 32, 5, Math.PI * 0.15, Math.PI * 0.85);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#e75480";
        this.ctx.stroke();

        // 手
        this.ctx.beginPath();
        this.ctx.arc(px + 6, py + 50, 5, 0, Math.PI * 2);
        this.ctx.arc(px + 34, py + 50, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = "#ffe6fa";
        this.ctx.fill();

        // 影（ジャンプ中は下に影）
        if (this.player.y < this.player.groundY) {
            this.ctx.globalAlpha = 0.3;
            this.ctx.beginPath();
            this.ctx.ellipse(px + 20, this.player.groundY + 60, 18, 7, 0, 0, Math.PI * 2);
            this.ctx.fillStyle = "#a3d8f4";
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
        }
        this.ctx.restore();

        // アイテムの描画 (絵文字でシンプルに)
        this.items.forEach(item => {
            this.ctx.save();
            this.ctx.font = `bold ${item.isSparkle ? 40 : 30}px Arial`; // キラキラアイテムは大きめ
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            // 影を追加 (視認性向上)
            this.ctx.shadowColor = item.isSparkle ? '#ffd700' : '#fff';
            this.ctx.shadowBlur = item.isSparkle ? 15 : 8;
            this.ctx.fillText(item.isSparkle ? item.sparkleEmoji : item.emoji, item.x + item.width / 2, item.y + item.height / 2);
            this.ctx.restore();
        });

        // 障害物の描画 (絵文字でシンプルに)
        this.obstacles.forEach(obs => {
            this.ctx.save();
            let shakeX = obs.shake ? (Math.random() - 0.5) * obs.shake : 0;
            let shakeY = obs.shake ? (Math.random() - 0.5) * obs.shake : 0;
            this.ctx.font = 'bold 40px Arial';
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            // 影を追加 (視認性向上)
            this.ctx.shadowColor = '#8b0000';
            this.ctx.shadowBlur = 10;
            this.ctx.fillText(obs.emoji, obs.x + obs.width / 2 + shakeX, obs.y + obs.height / 2 + shakeY);
            this.ctx.restore();
        });

        // ポップアップテキストの描画
        this.popups = this.popups.filter(popup => {
            this.ctx.save();
            this.ctx.font = `bold ${20 + popup.sizeBoost}px "M PLUS Rounded 1c", Arial`;
            this.ctx.fillStyle = popup.isDamage ? 'red' : (popup.isSparkle ? '#ffd700' : 'white');
            this.ctx.shadowColor = popup.isDamage ? 'darkred' : (popup.isSparkle ? '#ff8c00' : '#333');
            this.ctx.shadowBlur = 8;
            this.ctx.textAlign = 'center';
            this.ctx.globalAlpha = popup.opacity;
            this.ctx.fillText(popup.text, popup.x, popup.y);
            this.ctx.restore();

            popup.y -= 2;
            popup.opacity -= 0.02;
            popup.sizeBoost *= 0.98;

            return popup.opacity > 0;
        });
    }

    // ポップアップ表示関数
    showPop(text, x, y, isSparkle = false, isDamage = false) {
        this.popups.push({
            text: text,
            x: x,
            y: y - 30,
            opacity: 1,
            sizeBoost: isSparkle ? 10 : 0,
            isSparkle: isSparkle,
            isDamage: isDamage
        });
    }

    // UIの更新
    updateUI() {
        const elapsed = Math.floor((Date.now() - this.sectionStartTime) / 1000);
        const remainingTime = this.sectionTimeLimit - elapsed;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        document.getElementById('score').textContent = this.score;
        document.getElementById('life').textContent = `${this.life} / 100`;
        document.getElementById('prefectureCount').textContent = `${this.currentPrefectureIndex + 1}/${this.prefectures.length}`;
        document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // 都道府県情報の表示 (よりシンプルに)
    showCurrentPrefecture() {
        const currentPref = this.prefectures[this.currentPrefectureIndex];
        const prefectureEl = document.getElementById('currentPrefecture');
        
        prefectureEl.textContent = currentPref.name;
        prefectureEl.style.opacity = 1;
        // 情報はポップアップで短時間表示
        this.showPop(`${currentPref.name}へようこそ！ ${currentPref.info}`, this.canvas.width / 2, this.canvas.height / 2 + 50, false, false);

        setTimeout(() => {
            prefectureEl.style.opacity = 0;
        }, 3000); // 3秒後に消える
    }

    // 花火を打ち上げるアニメーション
    launchFireworks(isBig = false) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.textContent = isBig ? '🎇' : '🎆'; // 豪華な花火絵文字か通常の花火絵文字
        firework.style.left = `${Math.random() * 80 + 10}%`;
        firework.style.top = `${Math.random() * 40 + 10}%`;

        if (isBig) {
            firework.style.fontSize = '4em';
        } else {
            firework.style.fontSize = '2em';
        }

        document.getElementById('gameContainer').appendChild(firework);

        firework.addEventListener('animationend', () => {
            firework.remove();
        });
    }

    // 次の都道府県へ移動
    moveToNextPrefecture() {
        this.currentPrefectureIndex++;
        if (this.currentPrefectureIndex < this.prefectures.length) {
            this.sectionStartTime = Date.now();
            this.obstacles = [];
            this.items = [];
            this.gameSpeed = 0.5;
            this.showCurrentPrefecture();
            this.updateUI();
            this.life = Math.min(100, this.life + 20); // ライフ少し回復
            this.launchFireworks(true); // 県クリアで大きな花火
        } else {
            // 全ての都道府県をクリアした場合
            this.isGameRunning = false;
            this._cancelAnimationFrame();
            document.getElementById('gameOverText').textContent = '全国制覇おめでとう！';
            document.getElementById('finalScore').textContent = `最終スコア: ${this.score}点`;
            document.getElementById('gameOver').style.display = 'flex';
            document.getElementById('jumpButton').style.display = 'none';
            document.getElementById('ui').style.display = 'none';
        }
    }

    // ゲームオーバー処理
    gameOver() {
        this.isGameRunning = false;
        this._cancelAnimationFrame();
        document.getElementById('gameOverText').textContent = 'ゲームオーバー';
        document.getElementById('finalScore').textContent = `最終スコア: ${this.score}点`;
        document.getElementById('gameOver').style.display = 'flex';
        document.getElementById('jumpButton').style.display = 'none';
        document.getElementById('ui').style.display = 'none';
    }

    // ゲームループ
    gameLoop() {
        this.update();
        this.draw();
        if (this.isGameRunning) {
            this._gameLoopId = requestAnimationFrame(() => this.gameLoop());
        }
    }
}

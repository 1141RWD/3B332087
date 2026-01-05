let isLoggedIn = false; // 預設為未登入
let currentUser = null;
const infoDb = {
    faq: {
        title: "常見問題 (FAQ)",
        content: `<ul>
            <li><b>Q: 下單後多久會出貨？</b><br>A: 現貨商品將於 24 小時內出貨。</li>
            <li><b>Q: 支援哪些付款方式？</b><br>A: 我們支援信用卡、LINE Pay 與銀行轉帳。</li>
        </ul>`
    },
    return: {
        title: "退換貨政策",
        content: "<p>根據消保法規定，您享有商品到貨七天猶豫期之權益。提醒您，猶豫期並非試用期，商品須保持全新包裝完整方可申請退貨。</p>"
    },
    privacy: {
        title: "隱私權聲明",
        content: "<p>我們重視您的個人資料安全。您提供的資訊僅用於訂單處理與會員服務，未經同意不會提供給第三方。</p>"
    }
};
function switchInfoPage(type) {
    // 隱藏所有頁面
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('shop-container').classList.add('hidden');
    document.getElementById('checkout-page').classList.add('hidden');
    
    // 顯示說明頁面
    const infoPage = document.getElementById('info-page');
    infoPage.classList.remove('hidden');
    
    // 填充內容
    const data = infoDb[type];
    document.getElementById('info-title').innerText = data.title;
    document.getElementById('info-content').innerHTML = data.content;
    
    // 捲動到頂部
    window.scrollTo(0, 0);
}

// 修改原有的 showHome 以確保會隱藏 info-page
const originalShowHomeInfo = showHome;
showHome = function() {
    originalShowHomeInfo();
    document.getElementById('info-page').classList.add('hidden');
};
const db = {
    iphone: [
        // iPhone 17 全系列
        { 
            id: 171, 
            name: "iPhone 17 Pro Max", 
            series: "iPhone 17", 
            img: "i17promax.jpg", 
            desc: "搭載全新 A19 Pro 晶片與 6.9 吋超大顯示器，採用航太級鈦金屬設計，是效能與螢幕尺寸的極致頂點。", 
            specs: [{gb: 256, price: 44900}, {gb: 512, price: 51900}] 
        },
        { 
            id: 172, 
            name: "iPhone 17 Pro", 
            series: "iPhone 17", 
            img: "i17promax.jpg", 
            desc: "具備專業級相機系統與 ProMotion 120Hz 高刷螢幕，在強大效能與絕佳手感間取得完美平衡。", 
            specs: [{gb: 128, price: 36900}, {gb: 256, price: 40400}] 
        },
        { 
            id: 173, 
            name: "iPhone 17", 
            series: "iPhone 17", 
            img: "i17.png", 
            desc: "多彩鋁金屬設計搭配 A19 晶片，帶來卓越的電池續航力與流暢的日常使用體驗，是實用主義者的首選。", 
            specs: [{gb: 128, price: 29900}, {gb: 256, price: 33400}] 
        },

        // iPhone 16 全系列
        { 
            id: 161, 
            name: "iPhone 16 Pro Max", 
            series: "iPhone 16", 
            img: "i16promax.png", 
            desc: "配備先進的相機控制按鈕與長焦攝影性能，適合追求大螢幕與專業錄影創作的使用者。", 
            specs: [{gb: 256, price: 44900}, {gb: 512, price: 51900}] 
        },
        { 
            id: 162, 
            name: "iPhone 16 Pro", 
            series: "iPhone 16", 
            img: "i16promax.png", 
            desc: "A18 Pro 晶片賦予強大的 AI 處理能力，提供電影級的攝影體驗與流暢的遊戲效能。", 
            specs: [{gb: 128, price: 36900}, {gb: 256, price: 40400}] 
        },
        { 
            id: 163, 
            name: "iPhone 16", 
            series: "iPhone 16", 
            img: "i16.png", 
            desc: "支援空間影片拍攝與全新的相機操作邏輯，是進入 Apple 智慧生態系的絕佳入門選擇。", 
            specs: [{gb: 128, price: 29900}, {gb: 256, price: 33400}] 
        },

        // 其他品牌旗艦
        { 
            id: 201, 
            name: "Galaxy S24 Ultra", 
            series: "Samsung", 
            img: "s24.png", 
            desc: "旗艦級 AI 體驗，結合 2 億像素相機與內建 S Pen，重新定義智慧手機的生產力與攝影標竿。", 
            specs: [{gb: 256, price: 43900}, {gb: 512, price: 47900}] 
        },
        { 
            id: 202, 
            name: "Pixel 9 Pro XL", 
            series: "Google", 
            img: "px9.png", 
            desc: "Google AI 原生手機，深度整合 Gemini 助理，提供最純淨且聰明的 Android 使用環境。", 
            specs: [{gb: 128, price: 34900}, {gb: 256, price: 39900}] 
        },
        { 
            id: 203, 
            name: "ROG Phone 8 Pro", 
            series: "ASUS", 
            img: "rog 8.png", 
            desc: "專為極致遊戲玩家設計，搭載隱藏式 AniMe Vision 燈效與最頂尖的散熱系統，效能永不妥協。", 
            specs: [{gb: 512, price: 45990}] 
        }
    ],
    accessories: [
        { id: 501, name: "AirPods Pro 2", type: "音訊", img: "ap2.png", desc: "業界領先的主動式降噪與個人化空間音訊，為您帶來沉浸式的音樂饗宴。", specs: [{gb: "標準", price: 7490}] },
        { id: 502, name: "Apple Watch S10", type: "手錶", img: "s10.png", desc: "更輕薄的錶殼與更大的螢幕，搭載先進的健康監測功能，隨時守護您的生活。", specs: [{gb: "42mm", price: 13500}, {gb: "46mm", price: 14500}] },
        { id: 503, name: "USB-C 充電線", type: "電源", img: "usb.png", desc: "2 公尺長度的高品質編織設計，支援快速充電與耐用的資料傳輸。", specs: [{gb: "2m", price: 990}] }
    ]
};
let cart = [];
let currentProduct = null;
let currentCategory = 'iPhone';
let currentList = [];

function showHome() {
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('shop-container').classList.add('hidden');
}

function switchPage(page) {
    currentCategory = page;
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('shop-container').classList.remove('hidden');
    renderSidebar();
    renderProducts('全部');
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (currentCategory === 'iPhone') {
        const series = ['全部', 'iPhone 17', 'iPhone 16', 'Samsung', 'Google', 'ASUS'];
        sidebar.innerHTML = `<h3>品牌與系列</h3><ul>` + 
            series.map(s => `<li onclick="renderProducts('${s}')">${s}</li>`).join('') + `</ul>`;
    } else {
        const types = ['全部', '音訊', '手錶', '電源'];
        sidebar.innerHTML = `<h3>類別</h3><ul>` + 
            types.map(t => `<li onclick="renderProducts('${t}')">${t}</li>`).join('') + `</ul>`;
    }
}

function renderProducts(filter) {
    let data = currentCategory === 'iPhone' ? db.iphone : db.accessories;
    if (filter !== '全部') {
        data = data.filter(p => p.series === filter || p.type === filter || p.name.includes(filter));
    }
    currentList = data; 
    applyFilter();      
}

function applyFilter() {
    const keyword = document.getElementById('search-input')?.value.toLowerCase() || '';
    const sortType = document.getElementById('sort-select')?.value || '';

    let result = currentList.filter(p => p.name.toLowerCase().includes(keyword));

    if (sortType === 'low') {
        result.sort((a, b) => a.specs[0].price - b.specs[0].price);
    } else if (sortType === 'high') {
        result.sort((a, b) => b.specs[0].price - a.specs[0].price);
    }

    document.getElementById('product-list').innerHTML = result.map(p => {
        let badgeHTML = "";
        // 判斷標籤：包含 Pro Max 或 Ultra 使用 MAX 標籤；包含 Pro 使用 PRO 標籤；其餘手機使用 STD
        if (currentCategory === 'iPhone') {
            if (p.name.includes("Pro Max") || p.name.includes("Ultra")) {
                badgeHTML = `<span class="badge max">MAX / ULTRA</span>`;
            } else if (p.name.includes("Pro")) {
                badgeHTML = `<span class="badge pro">PRO</span>`;
            } else {
                badgeHTML = `<span class="badge std">STANDARD</span>`;
            }
        }

        return `
            <div class="product-card">
        <div onclick="openModal(${p.id})">
            <img src="${p.img}" alt="${p.name}">
            <div class="product-name">
                ${p.name}
                ${badgeHTML}
            </div> 
            <div class="product-price-label">
                NT$ ${p.specs[0].price.toLocaleString()} 起
            </div>
        </div>
        <button onclick="toggleCompare(${p.id})" style="margin-top: 15px; background: none; border: 1px solid #86868B; border-radius: 15px; padding: 4px 12px; font-size: 12px; cursor: pointer; transition: 0.3s;">
            ${compareList.find(cp => cp.id === p.id) ? '✅ 已加入' : '⚖️ 加入比較'}
        </button>
    </div>
        `;
    }).join('');
}

function openModal(id) {
    const all = [...db.iphone, ...db.accessories];
    currentProduct = all.find(p => p.id === id);
    if(!currentProduct) return;

    document.getElementById('modal-name').innerText = currentProduct.name;
 
    document.getElementById('modal-img').innerHTML = `<img src="${currentProduct.img}" style="max-height: 250px;">`;
// 將原本統一的文字改為顯示該產品資料庫中的 desc 欄位
document.getElementById('modal-sub-desc').innerText = currentProduct.desc;    const select = document.getElementById('modal-spec-select');
    select.innerHTML = currentProduct.specs.map(s => `<option value="${s.price}">${s.gb}${typeof s.gb === 'number' ? 'GB' : ''}</option>`).join('');

    const comp = document.getElementById('comparison-area');
    if (typeof currentProduct.specs[0].gb === 'number' && currentProduct.specs.length > 1) {
        comp.style.display = 'block';
        // 渲染 CP 表格並加上專屬 ID 方便高亮
        document.getElementById('compare-table-body').innerHTML = `<tr><th>容量</th><th>價格</th><th>每GB</th></tr>` + 
        currentProduct.specs.map(s => `
            <tr id="row-${s.gb}"><td>${s.gb}GB</td><td>$${s.price.toLocaleString()}</td><td>$${Math.round(s.price/s.gb)}</td></tr>
        `).join('');
    } else { comp.style.display = 'none'; }

    updateModalPrice();
    document.getElementById('product-modal').style.display = 'flex';
}

function updateModalPrice() {
    const select = document.getElementById('modal-spec-select');
    const price = parseInt(select.value);
    const selectedGB = select.options[select.selectedIndex].text.replace('GB', '');

    document.getElementById('modal-price').innerText = "NT$ " + price.toLocaleString();

    // 先移除所有高亮
    document.querySelectorAll('#compare-table-body tr').forEach(tr => tr.classList.remove('row-active'));
    // 加上當前選中的高亮
    const targetRow = document.getElementById(`row-${selectedGB}`);
    if (targetRow) targetRow.classList.add('row-active');
}

function closeModal() { document.getElementById('product-modal').style.display = 'none'; }
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('open'); }
function addToCart() {
    // 檢查登入狀態
    if (!isLoggedIn) {
        alert("請先登入會員才能將商品加入購物車！");
        showLogin(); // 自動彈出登入視窗
        return;
    }

    const sel = document.getElementById('modal-spec-select');
    const specName = sel.options[sel.selectedIndex].text;
    const price = parseInt(sel.value);
    
    const existingItem = cart.find(item => item.name === currentProduct.name && item.spec === specName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            name: currentProduct.name, 
            spec: specName, 
            price: price, 
            quantity: 1 
        });
    }
    
    updateCartUI();
    closeModal();
    toggleCart();
}
function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    const cartListEl = document.getElementById('cart-items-list');
    
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.innerText = totalQty;

    if (cart.length === 0) {
        cartListEl.innerHTML = `<p style="text-align:center; color:gray; margin-top:20px;">購物車是空的</p>`;
        document.getElementById('cart-total').innerText = "NT$ 0";
        return;
    }

    let total = 0;
    cartListEl.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #eee;">
                <div style="flex:1">
                    <b style="font-size:16px;">${item.name}</b><br>
                    <small style="color:gray;">${item.spec}</small>
                    <div style="margin-top:8px; display:flex; align-items:center; gap:12px;">
                        <button onclick="changeQty(${index}, -1)" style="width:24px; height:24px; border-radius:50%; border:1px solid #ddd; background:white; cursor:pointer;">-</button>
                        <span style="font-weight:600;">${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)" style="width:24px; height:24px; border-radius:50%; border:1px solid #ddd; background:white; cursor:pointer;">+</button>
                    </div>
                </div>
                <div style="text-align:right">
                    <div style="font-weight:600;">NT$ ${itemTotal.toLocaleString()}</div>
                    <div onclick="removeFromCart(${index})" style="color:#ff3b30; font-size:12px; cursor:pointer; margin-top:5px;">移除</div>
                </div>
            </div>`;
    }).join('');
    
    document.getElementById('cart-total').innerText = "NT$ " + total.toLocaleString();
}

// 改變數量函數
function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartUI();
    }
}

// 刪除商品函數
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}
function showLogin() { document.getElementById('login-modal').style.display = 'flex'; }
function closeLogin() { document.getElementById('login-modal').style.display = 'none'; }
function doLogin() {
    const name = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (!name || !pass) {
        alert("請輸入帳號和密碼");
        return;
    }

    // 模擬登入成功
    isLoggedIn = true; // 標記為已登入
    currentUser = name;
    document.getElementById('user-display').innerText = "Hi, " + name;
    
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    
    closeLogin();
    alert("登入成功！現在您可以開始購物了。");
}
// 捲動顯示偵測器 (Intersection Observer)
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15 // 當元素露出 15% 時觸發
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // 加上 active 觸發 CSS 動畫
            }
        });
    }, observerOptions);

    // 尋找所有帶有 reveal 類別的元素
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 當網頁載入完成時執行
window.addEventListener('DOMContentLoaded', initScrollReveal);

// 因為你是單頁應用 (SPA)，當切換回首頁時，也需要重新初始化或觸發
const originalShowHome = showHome;
showHome = function() {
    originalShowHome();
    // 稍微延遲讓 DOM 渲染後再跑動畫
    setTimeout(initScrollReveal, 100);
};

let currentHeroIndex = 1;
const totalHeroes = 3;

function startHeroSlideshow() {
    // 先初始化第一張的文字，避免一開始是空白
    document.getElementById('caption-title').innerText = heroData[0].title;
    document.getElementById('caption-desc').innerText = heroData[0].desc;

    setInterval(() => {
        // 移除舊圖片的 active
        const oldImg = document.getElementById(`hero-${currentHeroIndex}`);
        if(oldImg) oldImg.classList.remove('active');
        
        // 計算下一張
        currentHeroIndex = currentHeroIndex >= totalHeroes ? 1 : currentHeroIndex + 1;
        
        // 加入新圖片的 active
        const newImg = document.getElementById(`hero-${currentHeroIndex}`);
        if(newImg) newImg.classList.add('active');
        
        // 同步更新文字說明
        const data = heroData[currentHeroIndex - 1];
        document.getElementById('caption-title').innerText = data.title;
        document.getElementById('caption-desc').innerText = data.desc;
    }, 4000); 
}

// 在網頁載入後執行
window.addEventListener('DOMContentLoaded', () => {
    startHeroSlideshow();
    // 之前教你的捲動動畫也要記得保留
    if(typeof initScrollReveal === 'function') initScrollReveal();
});

function toggleMenu() {
    // 讓按鈕圖示變形
    document.getElementById('hamburger').classList.toggle('active');
    
    // 讓導覽選單出現/消失
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}

// 輪播資料 (讓文字隨圖片改變)
const heroData = [
    { title: "iPhone 17 Pro Max", desc: "全新的鈦金屬配色，現正熱賣中。" },
    { title: "S24 Ultra AI 旗艦", desc: "最強 AI 智慧手機，工作效率倍增。" },
    { title: "Pixel 9 Pro XL", desc: "Google 原生系統，最聰明的 AI 助理。" }
];
// 3. 商品比較功能 (模擬數據)


// 4. 結帳與跳轉邏輯
function goToCheckout() {
    if (!isLoggedIn) {
        alert("請先登入後再進行結帳");
        showLogin();
        return;
    }
    if (cart.length === 0) {
        alert("購物車是空的喔！");
        return;
    }
    toggleCart(); // 關閉側邊欄
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('shop-container').classList.add('hidden');
    document.getElementById('checkout-page').classList.remove('hidden');

    // 渲染清單
    const summary = document.getElementById('checkout-items-summary');
    let total = 0;
    summary.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `<p>${item.name} (${item.spec}) x ${item.quantity} - <b>NT$ ${(item.price * item.quantity).toLocaleString()}</b></p>`;
    }).join('');
    document.getElementById('final-total').innerText = "總計: NT$ " + total.toLocaleString();
}
function processOrder() {
    const name = document.getElementById('order-name').value;
    if (!name) return alert("請填寫收件人姓名");
    
    const orderID = "ORD-" + Math.floor(Math.random() * 1000000);
    alert(`感謝購買！\n\n訂單編號：${orderID}\n付款人：${name}\n\n我們將儘速為您出貨。`);
    
    // 清空購物車並回首頁
    cart = [];
    updateCartUI();
    showHome();
    document.getElementById('checkout-page').classList.add('hidden');
}
let compareList = [];

function toggleCompare(id) {
    const allProducts = [...db.iphone, ...db.accessories];
    const product = allProducts.find(p => p.id === id);
    const index = compareList.findIndex(p => p.id === id);

    if (index > -1) {
        compareList.splice(index, 1);
    } else {
        if (compareList.length >= 3) {
            alert("最多只能比較 3 項商品喔！");
            return;
        }
        compareList.push(product);
    }

    // 更新介面
    updateCompareBar();
    applyFilter(); // 重新渲染列表，讓按鈕文字變更
}

function updateCompareBar() {
    const bar = document.getElementById('compare-bar');
    const count = document.getElementById('compare-count');
    count.innerText = compareList.length;
    bar.style.display = compareList.length > 0 ? 'block' : 'none';
}

function clearCompare() {
    compareList = [];
    updateCompareBar();
    applyFilter();
}

function openCompareManager() {
    if (compareList.length < 2) {
        alert("請至少選擇 2 項商品進行比較");
        return;
    }
    const container = document.getElementById('compare-table-container');
    let html = `
        <table class="compare-table" style="width:100%; border-collapse: collapse;">
            <tr style="background: #f5f5f7;">
                <th style="padding:15px; border:1px solid #ddd;">規格項目</th>
                ${compareList.map(p => `<th style="padding:15px; border:1px solid #ddd;">${p.name}</th>`).join('')}
            </tr>
            <tr>
                <td style="padding:15px; border:1px solid #ddd; font-weight:bold;">外觀</td>
                ${compareList.map(p => `<td style="padding:15px; border:1px solid #ddd; text-align:center;"><img src="${p.img}" style="height:100px; object-fit:contain;"></td>`).join('')}
            </tr>
            <tr>
                <td style="padding:15px; border:1px solid #ddd; font-weight:bold;">產品描述</td>
                ${compareList.map(p => `<td style="padding:15px; border:1px solid #ddd;">${p.desc}</td>`).join('')}
            </tr>
            <tr>
                <td style="padding:15px; border:1px solid #ddd; font-weight:bold;">起售價</td>
                ${compareList.map(p => `<td style="padding:15px; border:1px solid #ddd; font-weight:600; color: #0066CC;">NT$ ${p.specs[0].price.toLocaleString()}</td>`).join('')}
            </tr>
        </table>`;
    container.innerHTML = html;
    document.getElementById('compare-manager-modal').style.display = 'flex';
}

function closeCompareManager() {
    document.getElementById('compare-manager-modal').style.display = 'none';
}

// 補回缺失的 showComparison 函數，並將文字改為產品專屬描述
function showComparison() {
    const table = document.getElementById('compare-detail-table');
    
    if (!currentProduct) return;

    table.innerHTML = `
        <tr><td class="feature-label">比較項目</td><td>${currentProduct.name}</td><td>同級競爭對手</td></tr>
        <tr><td class="feature-label">核心技術</td><td>${currentProduct.desc}</td><td>標準晶片技術</td></tr>
        <tr><td class="feature-label">螢幕顯示</td><td>超 Retina XDR 顯示器</td><td>一般 OLED 螢幕</td></tr>
        <tr><td class="feature-label">相機系統</td><td>專業級相機系統</td><td>標準三鏡頭系統</td></tr>
        <tr><td class="feature-label">保固期限</td><td>12 個月原廠保固</td><td>12 個月原廠保固</td></tr>
    `;
    document.getElementById('compare-modal').style.display = 'flex';
}

// 補回缺失的 closeCompare 函數
function closeCompare() { 
    document.getElementById('compare-modal').style.display = 'none'; 
}
function handleUserClick() {
    if (isLoggedIn) {
        if (confirm("確定要登出嗎？")) {
            isLoggedIn = false;
            currentUser = null;
            document.getElementById('user-display').innerText = "會員登入";
            cart = []; // 選項：登出時清空購物車
            updateCartUI();
            showHome();
        }
    } else {
        showLogin();
    }
}
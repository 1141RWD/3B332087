const db = {
    iphone: [
        // iPhone 17 全系列
        { id: 171, name: "iPhone 17 Pro Max", series: "iPhone 17", img: "i17promax.jpg", desc: "6.9 吋螢幕，搭載 A19 Pro 晶片，鈦金屬設計。", specs: [{gb: 256, price: 44900}, {gb: 512, price: 51900}] },
        { id: 172, name: "iPhone 17 Pro", series: "iPhone 17", img: "i17promax.jpg", desc: "6.3 吋螢幕，ProMotion 120Hz，極致效能。", specs: [{gb: 128, price: 36900}, {gb: 256, price: 40400}] },
        { id: 173, name: "iPhone 17", series: "iPhone 17", img: "i17.png", desc: "6.1 吋螢幕，全新 A19 晶片，多彩鋁金屬。", specs: [{gb: 128, price: 29900}, {gb: 256, price: 33400}] },

        // iPhone 16 全系列
        { id: 161, name: "iPhone 16 Pro Max", series: "iPhone 16", img: "i16promax.png", desc: "最強錄影性能，全新的相機控制按鈕。", specs: [{gb: 256, price: 44900}, {gb: 512, price: 51900}] },
        { id: 162, name: "iPhone 16 Pro", series: "iPhone 16", img: "i16promax.png", desc: "A18 Pro 晶片，專業級三鏡頭系統。", specs: [{gb: 128, price: 36900}, {gb: 256, price: 40400}] },
        { id: 163, name: "iPhone 16", series: "iPhone 16", img: "i16.png", desc: "相機控制功能，多彩設計，支援空間影片。", specs: [{gb: 128, price: 29900}, {gb: 256, price: 33400}] },
        // 其他品牌旗艦
        { id: 201, name: "Galaxy S24 Ultra", series: "Samsung", img: "s24.png", desc: "內建 S Pen，AI 搜尋圈功能，2 億像素相機。", specs: [{gb: 256, price: 43900}, {gb: 512, price: 47900}] },
        { id: 202, name: "Pixel 9 Pro XL", series: "Google", img: "px9.png", desc: "Google AI 原生手機，最強 Gemini 整合。", specs: [{gb: 128, price: 34900}, {gb: 256, price: 39900}] },
        { id: 203, name: "ROG Phone 8 Pro", series: "ASUS", img: "rog 8.png", desc: "電競巔峰之作，隱藏式 AniMe Vision 燈效。", specs: [{gb: 512, price: 45990}] }
    ],
    accessories: [
        { id: 501, name: "AirPods Pro 2", type: "音訊", img: "ap2.png", desc: "主動式降噪，個人化空間音訊。", specs: [{gb: "標準", price: 7490}] },
        { id: 502, name: "Apple Watch S10", type: "手錶", img: "s10.png", desc: "先進健康監測，更輕薄。", specs: [{gb: "42mm", price: 13500}, {gb: "46mm", price: 14500}] },
        { id: 503, name: "USB-C 充電線", type: "電源", img: "usb.png", desc: "2 公尺編織線，耐用快充。", specs: [{gb: "2m", price: 990}] }
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
            <div class="product-card" onclick="openModal(${p.id})">
                <img src="${p.img}" alt="${p.name}" style="width:100%; height:180px; object-fit:contain;">
                <div class="product-name">
                    ${p.name}
                    ${badgeHTML}
                </div> 
                <div class="product-price-label">
                    NT$ ${p.specs[0].price.toLocaleString()} 起
                </div>
            </div>
        `;
    }).join('');
}

function openModal(id) {
    const all = [...db.iphone, ...db.accessories];
    currentProduct = all.find(p => p.id === id);
    if(!currentProduct) return;

    document.getElementById('modal-name').innerText = currentProduct.name;
    document.getElementById('modal-desc').innerText = currentProduct.desc;
    // 在 main.js 的 openModal 函數內修改這行
document.getElementById('modal-img').innerHTML = `<img src="${currentProduct.img}" style="width: 250px; height: auto; object-fit: contain;">`;
    
    const select = document.getElementById('modal-spec-select');
    select.innerHTML = currentProduct.specs.map(s => `<option value="${s.price}">${s.gb}${typeof s.gb === 'number' ? 'GB' : ''}</option>`).join('');

    const comp = document.getElementById('comparison-area');
    if (typeof currentProduct.specs[0].gb === 'number' && currentProduct.specs.length > 1) {
        comp.style.display = 'block';
        const unitPrices = currentProduct.specs.map(s => s.price / s.gb);
        const minUnit = Math.min(...unitPrices);
        document.getElementById('compare-table-body').innerHTML = `<tr><th>容量</th><th>價格</th><th>每GB</th></tr>` + currentProduct.specs.map(s => `
            <tr class="${(s.price / s.gb) === minUnit ? 'best-value' : ''}"><td>${s.gb}GB</td><td>$${s.price.toLocaleString()}</td><td>$${Math.round(s.price/s.gb)}</td></tr>
        `).join('');
    } else { 
        comp.style.display = 'none'; 
    }

    updateModalPrice();
    document.getElementById('product-modal').style.display = 'flex';
}

function updateModalPrice() {
    const price = parseInt(document.getElementById('modal-spec-select').value);
    document.getElementById('modal-price').innerText = "NT$ " + price.toLocaleString();
}
function closeModal() { document.getElementById('product-modal').style.display = 'none'; }
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('open'); }
function addToCart() {
    const sel = document.getElementById('modal-spec-select');
    const specName = sel.options[sel.selectedIndex].text;
    const price = parseInt(sel.value);
    
    // 檢查購物車是否已有相同名稱與規格的商品
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
    document.getElementById('user-display').innerText = "Hi, " + name;
    
    // 清空輸入框以便下次使用
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    
    closeLogin();
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
    setInterval(() => {
        // 移除當前圖片的 active
        document.getElementById(`hero-${currentHeroIndex}`).classList.remove('active');
        
        // 計算下一張圖片的索引
        currentHeroIndex = currentHeroIndex >= totalHeroes ? 1 : currentHeroIndex + 1;
        
        // 加入新的 active 類別
        document.getElementById(`hero-${currentHeroIndex}`).classList.add('active');
    }, 3000); // 3000 毫秒 = 3 秒換一次
}

// 在網頁載入後執行
window.addEventListener('DOMContentLoaded', () => {
    startHeroSlideshow();
    // 之前教你的捲動動畫也要記得保留
    if(typeof initScrollReveal === 'function') initScrollReveal();
});
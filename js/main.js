// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const notificationsBtn = document.getElementById('notifications');
const notificationsPanel = document.querySelector('.notifications-panel');
const closeNotifications = document.querySelector('.close-notifications');
const projectGrid = document.querySelector('.projects-grid');
const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartClose = document.getElementById('cart-close');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartBadgeEl = document.getElementById('cart-badge');

// Sample project data (in a real app, this would come from an API)
const projects = [
    {
        id: 1,
        title: 'حقيبة قماشية مرسومة يدوياً',
        creator: 'سارة أحمد',
        sellerId: 1,
        university: 'الجامعة الأردنية',
        description: 'تصميم حقيبة قماشية فريدة من نوعها برسومات يدوية تعبر عن التراث الأردني',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
        price: '15 دينار',
        category: 'فنون تشكيلية',
        progress: 70,
        storyWhy: 'بدأت هذا المشروع لأثبت أن الفن يمكن أن يكون جزءاً من حياتنا اليومية بطريقة عملية وقريبة للناس.',
        storyDream: 'أطمح لتوسيع المجموعة وتوفير فرص تدريب لطالبات أخريات للعمل على تصاميم مستوحاة من التراث.'
    },
    {
        id: 2,
        title: 'لوحة فنية تجريدية',
        creator: 'زيد خالد',
        sellerId: 2,
        university: 'جامعة العلوم التطبيقية',
        description: 'لوحة فنية تجريدية مستوحاة من الطبيعة بألوان زاهية وتقنيات مختلطة',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80',
        price: '40 دينار',
        category: 'رسم وتصوير',
        progress: 55,
        storyWhy: 'بدأت لأنني أؤمن أن اللون علاج، وأردت مشاركة تجربتي عبر لوحة تحمل مشاعر الأمل.',
        storyDream: 'هدفي تنظيم معرض طلابي متنقل داخل الجامعات لدعم الفنانين المبتدئين.'
    },
    {
        id: 3,
        title: 'مشروع تطبيق جوال',
        creator: 'محمد حسن',
        sellerId: 3,
        university: 'جامعة البلقاء التطبيقية',
        description: 'تطبيق جوال يساعد الطلاب في تنظيم وقت الدراسة والمهام اليومية',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        price: 'مجاني',
        category: 'تطبيقات جوال',
        progress: 35,
        storyWhy: 'بدأت لأن معظم الطلاب يعانون من ضغط الوقت، وأردت أداة عربية بسيطة وسريعة.',
        storyDream: 'أطمح لبناء نسخة متكاملة تربط جداول الجامعة وإشعارات الدراسة في مكان واحد.'
    }
];

function ensureToastContainer() {
    let c = document.querySelector('.toast-container');
    if (!c) {
        c = document.createElement('div');
        c.className = 'toast-container';
        c.setAttribute('aria-live', 'polite');
        c.setAttribute('aria-relevant', 'additions');
        document.body.appendChild(c);
    }
    return c;
}

function toast({ type = 'info', title = 'تنبيه', message = '', timeout = 2200 } = {}) {
    const c = ensureToastContainer();
    const el = document.createElement('div');
    el.className = `toast ${type}`;

    const icon = type === 'success' ? 'check' : type === 'error' ? 'xmark' : 'info';
    el.innerHTML = `
        <div class="toast-icon"><i class="fas fa-${icon}"></i></div>
        <div>
            <p class="toast-title">${title}</p>
            <p class="toast-msg">${message}</p>
        </div>
        <button class="toast-close" type="button" aria-label="إغلاق"><i class="fas fa-times"></i></button>
    `;

    const close = () => {
        el.classList.add('leaving');
        window.setTimeout(() => el.remove(), 220);
    };

    el.querySelector('.toast-close')?.addEventListener('click', close);
    c.appendChild(el);
    if (timeout > 0) window.setTimeout(close, timeout);
}

const storeItems = [
    {
        id: 1,
        title: 'حقيبة قماشية مرسومة يدوياً',
        creator: 'سارة أحمد',
        sellerId: 1,
        university: 'الجامعة الأردنية',
        category: 'فنون تشكيلية',
        price: '15 دينار',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 2,
        title: 'لوحة فنية تجريدية "ألوان الأمل"',
        creator: 'زيد خالد',
        sellerId: 2,
        university: 'جامعة العلوم التطبيقية',
        category: 'رسم وتصوير',
        price: '40 دينار',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 4,
        title: 'إكسسوارات يدوية فريدة',
        creator: 'نور حسن',
        sellerId: 4,
        university: 'جامعة مؤتة',
        category: 'فنون تشكيلية',
        price: '12 دينار',
        image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 5,
        title: 'دفتر ملاحظات بتجليد يدوي',
        creator: 'ليلى عمر',
        sellerId: 5,
        university: 'جامعة اليرموك',
        category: 'فنون تشكيلية',
        price: '9 دينار',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80'
    }
];

const sellers = [
    {
        id: 1,
        name: 'سارة أحمد',
        university: 'الجامعة الأردنية',
        bio: 'طالبة فنون تشكيلية، شغوفة بتطوير منتجات عملية بلمسة فنية مستوحاة من التراث.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: 2,
        name: 'زيد خالد',
        university: 'جامعة العلوم التطبيقية',
        bio: 'مهتم بالفن التجريدي وتقنيات المزج بالألوان، وأسعى لنشر رسائل إيجابية عبر اللوحات.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 3,
        name: 'محمد حسن',
        university: 'جامعة البلقاء التطبيقية',
        bio: 'مطور تطبيقات، أعمل على حلول بسيطة تساعد الطلاب على تنظيم حياتهم الدراسية.',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
        id: 4,
        name: 'نور حسن',
        university: 'جامعة مؤتة',
        bio: 'أصمم إكسسوارات يدوية خفيفة ومناسبة للاستخدام اليومي بألوان وأشكال عصرية.',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
        id: 5,
        name: 'ليلى عمر',
        university: 'جامعة اليرموك',
        bio: 'أحب الأعمال الورقية والمنتجات المكتبية بتفاصيل يدوية مميزة.',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
    }
];

window.IdamData = {
    projects,
    storeItems,
    sellers
};

const CART_KEY = 'idam_cart';

function readCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function priceToNumber(price) {
    if (!price) return 0;
    if (String(price).includes('مجاني')) return 0;
    const m = String(price).match(/(\d+(?:\.\d+)?)/);
    return m ? Number(m[1]) : 0;
}

function getItemById(id) {
    const pid = Number(id);
    const p = projects.find(x => x.id === pid);
    if (p) return p;
    return storeItems.find(x => x.id === pid);
}

function getSellerById(id) {
    const sid = Number(id);
    return sellers.find(s => s.id === sid);
}

function addToCart(itemId, qty = 1) {
    const pid = Number(itemId);
    const cart = readCart();
    const existing = cart.find(x => x.id === pid);
    if (existing) existing.qty += qty;
    else cart.push({ id: pid, qty: qty });
    writeCart(cart);
    renderCart();
}

function setCartQty(itemId, qty) {
    const pid = Number(itemId);
    const cart = readCart();
    const idx = cart.findIndex(x => x.id === pid);
    if (idx === -1) return;
    const nextQty = Math.max(1, qty);
    cart[idx].qty = nextQty;
    writeCart(cart);
    renderCart();
}

function removeFromCart(itemId) {
    const pid = Number(itemId);
    const cart = readCart().filter(x => x.id !== pid);
    writeCart(cart);
    renderCart();
}

function cartCount() {
    return readCart().reduce((sum, x) => sum + (Number(x.qty) || 0), 0);
}

function openCart() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.add('active');
    cartBackdrop.classList.add('active');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartBackdrop.setAttribute('aria-hidden', 'false');
}

function closeCart() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.remove('active');
    cartBackdrop.classList.remove('active');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartBackdrop.setAttribute('aria-hidden', 'true');
}

function renderCart() {
    if (cartBadgeEl) cartBadgeEl.textContent = String(cartCount());
    if (!cartItemsEl || !cartTotalEl) return;

    const cart = readCart();
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<div class="cart-empty">سلتك فارغة حالياً</div>';
        cartTotalEl.textContent = '0 دينار';
        return;
    }

    let total = 0;
    cartItemsEl.innerHTML = '';
    cart.forEach(entry => {
        const item = getItemById(entry.id);
        if (!item) return;
        const unit = priceToNumber(item.price);
        total += unit * entry.qty;

        const seller = getSellerById(item.sellerId);
        const sellerLink = seller ? `<a href="seller.html?id=${seller.id}" class="muted" style="text-decoration:underline;">${seller.name}</a>` : `<span class="muted">${item.creator || ''}</span>`;

        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div>
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-sub">${sellerLink}</p>
                <div class="cart-row">
                    <span class="pill">${item.price}</span>
                    <button class="cart-remove" type="button" data-cart-remove="${item.id}">حذف</button>
                </div>
                <div class="cart-row">
                    <div class="qty-control">
                        <button class="qty-btn" type="button" data-cart-minus="${item.id}">-</button>
                        <span class="qty-value" data-cart-qty="${item.id}">${entry.qty}</span>
                        <button class="qty-btn" type="button" data-cart-plus="${item.id}">+</button>
                    </div>
                    <strong>${(unit * entry.qty).toFixed(0)} دينار</strong>
                </div>
            </div>
        `;
        cartItemsEl.appendChild(el);
    });

    cartTotalEl.textContent = `${total.toFixed(0)} دينار`;
}

// Sample notifications data
const notifications = [
    {
        id: 1,
        message: 'قام علي بشراء لوحتك!',
        time: 'منذ ساعتين',
        read: false
    },
    {
        id: 2,
        message: 'هناك مشروع جديد في كليتك يحتاج لدعمك',
        time: 'منذ يوم',
        read: false
    },
    {
        id: 3,
        message: 'لديك 3 إشعارات جديدة',
        time: 'منذ 3 أيام',
        read: true
    }
];

// Initialize the application
function init() {
    document.body.classList.add('enter');
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        setTimeout(() => {
            logoImg.classList.add('logo-enter');
        }, 80);
    }
    enhanceNavigation();
    setupBackToTop();
    setupEventListeners();
    setupContactForm();
    renderProjects();
    renderNotifications();
    renderStorePage();
    renderProjectsPage();
    renderProfilePage();
    renderSellerPage();
    renderCart();
}

function enhanceNavigation() {
    const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (!href || href.startsWith('#')) return;
        a.classList.remove('active');
        if (href === current) a.classList.add('active');
    });

    document.addEventListener('click', (e) => {
        const t = e.target;
        if (!(t instanceof HTMLElement)) return;
        const a = t.closest('a');
        if (!a) return;
        const href = a.getAttribute('href') || '';
        if (!href) return;
        if (href.startsWith('#')) return;
        if (/^https?:\/\//i.test(href)) return;
        if (a.getAttribute('target') === '_blank') return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const isHtml = href.toLowerCase().endsWith('.html');
        if (!isHtml) return;

        e.preventDefault();
        document.body.classList.add('leaving');
        window.setTimeout(() => {
            window.location.href = href;
        }, 160);
    });
}

function setupBackToTop() {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'الرجوع للأعلى');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(btn);
    }

    const onScroll = () => {
        if (window.scrollY > 520) btn.classList.add('show');
        else btn.classList.remove('show');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        toast({
            type: 'success',
            title: 'تم الإرسال',
            message: 'وصلتنا رسالتك بنجاح — سنرد عليك قريباً (نسخة تجريبية)'
        });
        form.reset();
    });
}

// Set up event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Notifications panel toggle
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleNotificationsPanel();
        });
    }

    // Close notifications panel
    if (closeNotifications) {
        closeNotifications.addEventListener('click', closeNotificationsPanel);
    }

    // Close notifications when clicking outside
    document.addEventListener('click', (e) => {
        if (!notificationsPanel || !notificationsBtn) return;
        if (!notificationsPanel.contains(e.target) && !notificationsBtn.contains(e.target)) {
            closeNotificationsPanel();
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Add animation on scroll
    window.addEventListener('scroll', animateOnScroll);

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderCart();
            openCart();
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    if (cartBackdrop) {
        cartBackdrop.addEventListener('click', closeCart);
    }

    if (cartItemsEl) {
        cartItemsEl.addEventListener('click', (e) => {
            const t = e.target;
            if (!(t instanceof HTMLElement)) return;
            const plus = t.closest('[data-cart-plus]');
            const minus = t.closest('[data-cart-minus]');
            const remove = t.closest('[data-cart-remove]');
            if (plus) {
                const id = plus.getAttribute('data-cart-plus');
                const entry = readCart().find(x => String(x.id) === String(id));
                setCartQty(id, (entry?.qty || 1) + 1);
            }
            if (minus) {
                const id = minus.getAttribute('data-cart-minus');
                const entry = readCart().find(x => String(x.id) === String(id));
                setCartQty(id, Math.max(1, (entry?.qty || 1) - 1));
            }
            if (remove) {
                const id = remove.getAttribute('data-cart-remove');
                removeFromCart(id);
            }
        });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            toast({
                type: 'info',
                title: 'إتمام الطلب',
                message: 'هذه نسخة تجريبية — سيتم ربط الدفع لاحقاً'
            });
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Toggle body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Toggle notifications panel
function toggleNotificationsPanel() {
    if (!notificationsPanel) return;
    notificationsPanel.classList.toggle('active');
}

// Close notifications panel
function closeNotificationsPanel() {
    if (!notificationsPanel) return;
    notificationsPanel.classList.remove('active');
}

// Render projects in the grid
function renderProjects() {
    if (!projectGrid) return;

    projectGrid.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-creator">${project.creator} - ${project.university}</p>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <span class="project-price">${project.price}</span>
                    <div class="project-actions">
                        <button class="like-btn"><i class="far fa-heart"></i></button>
                        <button class="support-btn">ادعم المشروع</button>
                    </div>
                </div>
            </div>
        `;

        projectCard.addEventListener('click', () => {
            // In a real app, this would navigate to the project details page
            window.location.href = `project-details.html?id=${project.id}`;
        });

        projectGrid.appendChild(projectCard);
    });
}

function renderStorePage() {
    const grid = document.getElementById('store-grid');
    if (!grid) return;

    const filters = document.getElementById('store-filters');
    const getActiveFilter = () => {
        const btn = filters ? filters.querySelector('.chip.active') : null;
        return btn ? btn.getAttribute('data-filter') : 'all';
    };

    const draw = () => {
        const filter = getActiveFilter();
        const items = filter === 'all' ? storeItems : storeItems.filter(i => i.category === filter);
        grid.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('article');
            card.className = 'store-card';
            const seller = getSellerById(item.sellerId);
            const sellerHtml = seller ? `<a href="seller.html?id=${seller.id}" class="muted" style="text-decoration:underline;">${seller.name}</a>` : `<span class="muted">${item.creator}</span>`;
            card.innerHTML = `
                <img class="store-card-media" src="${item.image}" alt="${item.title}">
                <div class="store-card-body">
                    <div class="pill"><i class="fas fa-tag"></i>${item.category}</div>
                    <h3 style="margin-top:10px;">${item.title}</h3>
                    <p class="muted" style="margin-top:6px;">${sellerHtml} - ${item.university}</p>
                    <div class="store-meta">
                        <span class="project-price">${item.price}</span>
                        <button class="btn btn-primary" type="button" data-add-cart="${item.id}" style="padding:10px 16px;">أضف للسلة</button>
                    </div>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (e.target && e.target.closest('button')) return;
                window.location.href = `project-details.html?id=${item.id}`;
            });
            const addBtn = card.querySelector('[data-add-cart]');
            if (addBtn) {
                addBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(item.id, 1);
                    openCart();
                });
            }

            grid.appendChild(card);
        });
    };

    if (filters) {
        filters.querySelectorAll('.chip').forEach(btn => {
            btn.addEventListener('click', () => {
                filters.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                draw();
            });
        });
    }

    draw();
}

function renderProjectsPage() {
    const grid = document.getElementById('projects-page-grid');
    if (!grid) return;

    const tabs = document.getElementById('projects-tabs');
    const getActiveFilter = () => {
        const btn = tabs ? tabs.querySelector('.chip.active') : null;
        return btn ? btn.getAttribute('data-filter') : 'all';
    };

    const draw = () => {
        const filter = getActiveFilter();
        const items = filter === 'all' ? projects : projects.filter(p => p.category === filter);
        grid.innerHTML = '';

        items.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-story';
            card.innerHTML = `
                <img class="project-story-media" src="${project.image}" alt="${project.title}">
                <div class="project-story-body">
                    <div class="pill"><i class="fas fa-user"></i>${project.creator}</div>
                    <h3 style="margin-top:10px;">${project.title}</h3>
                    <p class="muted" style="margin-top:6px;">${project.university}</p>
                    <p style="margin-top:10px;">${project.storyWhy}</p>
                    <p class="muted" style="margin-top:10px;">${project.storyDream}</p>
                    <div class="progress-wrap">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span class="muted">التقدم</span>
                            <span class="pill">${project.progress}%</span>
                        </div>
                        <div class="progress-bar" style="margin-top:8px;">
                            <div class="progress-fill" data-progress="${project.progress}"></div>
                        </div>
                    </div>
                    <div class="story-actions">
                        <button class="btn btn-outline" type="button" data-like="${project.id}"><i class="far fa-heart"></i> إدعم معنوياً</button>
                        <button class="btn btn-secondary" type="button" data-support="${project.id}"><i class="fas fa-hand-holding-heart"></i> إدعم مادياً</button>
                    </div>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (e.target && e.target.closest('button')) return;
                window.location.href = `project-details.html?id=${project.id}`;
            });

            const likeBtn = card.querySelector('[data-like]');
            if (likeBtn) {
                likeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    likeBtn.classList.toggle('active');
                });
            }

            const supportBtn = card.querySelector('[data-support]');
            if (supportBtn) {
                supportBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `project-details.html?id=${project.id}`;
                });
            }

            grid.appendChild(card);
        });

        const fills = grid.querySelectorAll('.progress-fill');
        requestAnimationFrame(() => {
            fills.forEach(el => {
                const v = el.getAttribute('data-progress');
                el.style.width = `${v}%`;
            });
        });
    };

    if (tabs) {
        tabs.querySelectorAll('.chip').forEach(btn => {
            btn.addEventListener('click', () => {
                tabs.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                draw();
            });
        });
    }

    draw();
}

function renderProfilePage() {
    const summary = document.getElementById('profile-summary');
    const content = document.getElementById('profile-content');
    const tabs = document.getElementById('profile-tabs');
    if (!summary || !content || !tabs) return;

    const profile = {
        name: 'سارة أحمد',
        role: 'مبدعة - فنون تشكيلية',
        university: 'الجامعة الأردنية',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    };

    summary.innerHTML = `
        <div class="dash-card" style="grid-column: span 12; display:flex; gap:16px; align-items:center;">
            <img src="${profile.avatar}" alt="${profile.name}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;">
            <div>
                <h2 style="margin:0;">${profile.name}</h2>
                <p class="muted" style="margin-top:6px;">${profile.role} - ${profile.university}</p>
            </div>
        </div>
    `;

    const renderCreator = () => {
        content.innerHTML = `
            <div class="dash-grid">
                <div class="dash-card">
                    <h3>ملخص الأداء</h3>
                    <div class="kv"><span>الزيارات</span><strong>1,240</strong></div>
                    <div class="kv"><span>المبيعات</span><strong>86</strong></div>
                    <div class="kv"><span>تعليقات إيجابية</span><strong>134</strong></div>
                </div>
                <div class="dash-card">
                    <h3>مشاريعي</h3>
                    <div class="kv"><span>مشروع نشط</span><strong>3</strong></div>
                    <div class="kv"><span>قيد المراجعة</span><strong>1</strong></div>
                    <div class="kv"><span>مكتمل</span><strong>5</strong></div>
                </div>
                <div class="dash-card">
                    <h3>أحدث نشاط</h3>
                    <div class="kv"><span>قام علي بشراء لوحتك</span><strong>الآن</strong></div>
                    <div class="kv"><span>إعجاب جديد</span><strong>قبل 2س</strong></div>
                    <div class="kv"><span>تعليق</span><strong>قبل يوم</strong></div>
                </div>
            </div>
        `;
    };

    const renderSupporter = () => {
        content.innerHTML = `
            <div class="dash-grid">
                <div class="dash-card">
                    <h3>سجل المشتريات</h3>
                    <div class="kv"><span>لوحة "ألوان الأمل"</span><strong>40 دينار</strong></div>
                    <div class="kv"><span>حقيبة مرسومة</span><strong>15 دينار</strong></div>
                    <div class="kv"><span>إكسسوارات يدوية</span><strong>12 دينار</strong></div>
                </div>
                <div class="dash-card">
                    <h3>مشاريع ساهمت بها</h3>
                    <div class="kv"><span>ألوان الأمل</span><strong>نجاح 75%</strong></div>
                    <div class="kv"><span>تطبيق الطلاب</span><strong>نجاح 35%</strong></div>
                    <div class="kv"><span>مجموعة إكسسوارات</span><strong>نجاح 90%</strong></div>
                </div>
                <div class="dash-card">
                    <h3>مفضلاتي</h3>
                    <div class="kv"><span>فنون تشكيلية</span><strong>8</strong></div>
                    <div class="kv"><span>رسم وتصوير</span><strong>4</strong></div>
                    <div class="kv"><span>تطبيقات</span><strong>2</strong></div>
                </div>
            </div>
        `;
    };

    const setActive = (tab) => {
        tabs.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.getAttribute('data-tab');
        if (key === 'supporter') renderSupporter();
        else renderCreator();
    };

    tabs.querySelectorAll('.chip').forEach(btn => {
        btn.addEventListener('click', () => setActive(btn));
    });

    const initial = tabs.querySelector('.chip.active') || tabs.querySelector('.chip');
    if (initial) setActive(initial);
}

// Render notifications in the panel
function renderNotifications() {
    const notificationsList = document.querySelector('.notifications-list');
    if (!notificationsList) return;
    
    notificationsList.innerHTML = '';
    
    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${!notification.read ? 'unread' : ''}`;
        notificationItem.innerHTML = `
            <p>${notification.message}</p>
            <span class="notification-time">${notification.time}</span>
        `;
        
        notificationsList.appendChild(notificationItem);
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.step, .project-card, .hero-illustration, .store-card, .project-story, .dash-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', () => {
    // initCursor(); // Removed custom cursor
    initScrollAnimations();
    initScrollProgress();
    initLanguage(); // Initialize language first
    initTypewriter();
    initSpotlight();
    initParticles();
});

// Global variable for typewriter phrases (English only)
let currentTypewriterPhrases = [
    "Full Stack Developer",
    "Software Engineer",
    "Problem Solver",
    "Tech Enthusiast"
];

/* Background Particles */
function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticleSet();
    }

    function initParticleSet() {
        particles = [];
        const numParticles = Math.floor(width * height / 20000); // Density
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.3 + 0.1
            });
        }
    }

    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Decay scroll speed influence
        scrollSpeed *= 0.95;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy - (scrollSpeed * 0.5); // Move opposite to scroll for depth

            // Wrap around
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        scrollSpeed = delta; // Direct mapping for responsiveness
        lastScrollY = currentScrollY;
    });

    resize();
    animate();
}

/* Spotlight Effect */
function initSpotlight() {
    const spotlight = document.querySelector('.spotlight');
    if (!spotlight) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Initial position
    spotlight.style.setProperty('--x', mouseX + 'px');
    spotlight.style.setProperty('--y', mouseY + 'px');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        spotlight.style.setProperty('--x', mouseX + 'px');
        spotlight.style.setProperty('--y', mouseY + 'px');
        
        if (!spotlight.classList.contains('active')) {
            spotlight.classList.add('active');
        }
    });
}

/* Scroll Progress Bar */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.height = scrollPercent + '%';
    });
}

/* Custom Cursor - Removed */
/*
function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverables = document.querySelectorAll('a, button, .project-card, .vault-card');
    
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
}
*/

/* Scroll Animations */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.project-card, .vault-card, .section-title, .about-content, .project-row, .timeline-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles dynamically or rely on CSS if added there. 
    // Here we inject the style logic via JS for simplicity in this step.
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* Typewriter Effect */
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        // Ensure phraseIndex is valid if phrases changed
        if (phraseIndex >= currentTypewriterPhrases.length) {
            phraseIndex = 0;
        }

        const currentPhrase = currentTypewriterPhrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % currentTypewriterPhrases.length;
            typeSpeed = 500; // Pause before typing new
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* Language Handling (Simplified) */
const translations = {
    en: {
        greeting: "Hello, I am",
        heroDesc: "I build accessible, pixel-perfect, and performant web experiences.",
        viewWork: "View My Work",
        projects: "Projects",
        vault: "The Vault",
        about: "About Me",
        contact: "Contact",
        projectsTitle: "Projects",
        vaultTitle: "The Vault",
        vaultDesc: "A collection of documents, experiments, and mini-games.",
        aboutTitle: "About Me",
        aboutText: "I'm Kağan, a software engineer based near Stuttgart. I completed my Bachelor's (B.Sc. Informatik) at DHBW Stuttgart in 2025. I focus on building efficient software and user-friendly applications. My journey involves full-stack development, from crafting intuitive front-ends to robust back-ends.",
        aboutText2: "When I'm not coding, I'm exploring new technologies or optimizing workflows.",
        downloadResume: "Download Resume",
        
        // Experience
        experienceTitle: "Experience",
        
        // 2025 - Present (Job)
        expJobTitle: "Middleware Expert",
        expJobOrg: "W&W Group",
        expJobDesc: "Administration and management of enterprise middleware solutions and infrastructure.",

        // 2022 - 2025 (Dual)
        expDualTitle: "Dual Student (B.Sc.)",
        expDualOrg: "W&W Group & DHBW Stuttgart",
        expDualDesc: "Computer Science. Alternating between academic studies at DHBW and practical software engineering phases at W&W.",

        // 2020 - 2022 (BK)
        expBkTitle: "Vocational College",
        expBkOrg: "Carl-Schaefer-Schule Ludwigsburg",
        expBkDesc: "Technical diploma with a focus on Information Technology and Mathematics.",

        // Tags & Types
        gameDev: "Game Dev",
        gameLogic: "Game Logic",
        aiAssistant: "AI Assistant",
        university: "University",
        webApp: "Web App",
        hackathon: "Hackathon",
        mobileApp: "Mobile App",
        personal: "Personal",
        mobileSolution: "Mobile Solution",
        lifestyle: "Lifestyle",
        uxDesign: "UX Design",
        apiIntegration: "API Integration",
        frontend: "Frontend",
        
        // Typewriter
        typewriter: ["Full Stack Developer", "Software Engineer", "Problem Solver", "Tech Enthusiast"],

        // Projects
        werbinichDesc: "A character guessing game using Yes/No questions. Interactive and fun web experience designed to challenge players' deduction skills.",
        playGame: "Play Game",
        
        porgDesc: "An intelligent chatbot developed to answer DHBW IT students' questions and provide detailed professor profiles instantly.",
        internalProject: "Internal Project",
        
        doenerDesc: "Find, review, and filter nearby kebab shops. Displays locations and ratings on an interactive map for the ultimate food discovery.",
        uniProject: "University Project",
        
        tapDesc: "NFC-based restaurant service solution allowing customers to order and call for service directly via their smartphones.",
        concept: "Concept",
        
        ewunDesc: "International recipe discovery platform with integrated shopping lists and social sharing features for foodies.",
        
        // Vault
        docsTitle: "Documents",
        docsDesc: "Resume, Certificates, and other formal documents.",
        gamesTitle: "Minigames",
        gamesDesc: "Small browser games and coding experiments.",
        projectsDesc: "A showcase of my technical projects and experiments.",
        
        // Minigames
        minigamesTitle: "Minigames",
        minesweeperDesc: "The classic minefield game. Clear the board without detonating any mines.",
        whoamiDesc: "The popular guessing game. Guess the character based on Yes/No questions.",
        
        // Documents
        documentsTitle: "Documents",
        bachelorDegreeTitle: "Bachelor's Degree",
        bachelorDegreeDesc: "My Bachelor of Science degree certificate (B.Sc. Informatik, DHBW Stuttgart).",
        resumeDesc: "My complete professional resume detailing my career path, skills, and education.",
        comingSoon: "Coming Soon",
        careerPath: "Career Path & Profile",

        // Footer
        footerText: "© 2025 Kağan Demirer."
    },
    de: {
        greeting: "Hallo, ich bin",
        heroDesc: "Ich entwickle barrierefreie, pixelgenaue und leistungsstarke Web-Erlebnisse.",
        viewWork: "Meine Arbeiten",
        projects: "Projekte",
        vault: "Tresor",
        about: "Über mich",
        contact: "Kontakt",
        projectsTitle: "Projekte",
        vaultTitle: "Tresor",
        vaultDesc: "Eine Sammlung von Dokumenten, Experimenten und Minispielen.",
        aboutTitle: "Über Mich",
        aboutText: "Ich bin Kağan, Software Engineer aus der Region Stuttgart. Meinen Bachelor (B.Sc. Informatik) habe ich 2025 an der DHBW Stuttgart abgeschlossen. Ich konzentriere mich auf die Entwicklung effizienter Software und benutzerfreundlicher Anwendungen. Mein Weg umfasst die Full-Stack-Entwicklung, von intuitiven Frontends bis hin zu robusten Backends.",
        aboutText2: "Wenn ich nicht programmiere, erkunde ich neue Technologien oder optimiere Workflows.",
        downloadResume: "Lebenslauf herunterladen",
        
        // Experience
        experienceTitle: "Erfahrung",
        
        // 2025 - Present (Job)
        expJobTitle: "Middleware-Experte",
        expJobOrg: "W&W Gruppe",
        expJobDesc: "Administration und Verwaltung von Enterprise-Middleware-Lösungen und Infrastruktur.",

        // 2022 - 2025 (Dual)
        expDualTitle: "Dualer Student (B.Sc.)",
        expDualOrg: "W&W Gruppe & DHBW Stuttgart",
        expDualDesc: "Informatik. Wechsel zwischen theoretischem Studium an der DHBW und praktischen Phasen bei W&W.",

        // 2020 - 2022 (BK)
        expBkTitle: "Berufskolleg",
        expBkOrg: "Carl-Schaefer-Schule Ludwigsburg",
        expBkDesc: "Fachhochschulreife mit Schwerpunkt Informationstechnik und Mathematik.",

        // Tags & Types
        gameDev: "Spieleentwicklung",
        gameLogic: "Spiellogik",
        aiAssistant: "KI-Assistent",
        university: "Universität",
        webApp: "Web-App",
        hackathon: "Hackathon",
        mobileApp: "Mobile App",
        personal: "Persönlich",
        mobileSolution: "Mobile Lösung",
        lifestyle: "Lifestyle",
        uxDesign: "UX Design",
        apiIntegration: "API-Integration",
        frontend: "Frontend",
        
        // Typewriter
        typewriter: ["Full Stack Entwickler", "Software Engineer", "Problemlöser", "Tech-Enthusiast"],

        // Projects
        werbinichDesc: "Ein Personen-Ratespiel mit Ja/Nein-Fragen. Interaktives Web-Erlebnis, das die Kombinationsgabe der Spieler herausfordert.",
        playGame: "Spiel starten",
        
        porgDesc: "Ein intelligenter Chatbot, entwickelt um Fragen von DHBW IT-Studenten zu beantworten und detaillierte Professorenprofile bereitzustellen.",
        internalProject: "Internes Projekt",
        
        doenerDesc: "Finde, bewerte und filtere Dönerläden in der Nähe. Zeigt Standorte und Bewertungen auf einer interaktiven Karte an.",
        uniProject: "Hochschulprojekt",
        
        tapDesc: "NFC-basierte Service-Lösung für Restaurants, die es Kunden ermöglicht, direkt über ihr Smartphone zu bestellen und Service zu rufen.",
        concept: "Konzept",
        
        ewunDesc: "Internationale Rezept-Plattform mit integrierten Einkaufslisten und Social-Sharing-Funktionen für Foodies.",
        
        // Vault
        docsTitle: "Dokumente",
        docsDesc: "Lebenslauf, Zertifikate und andere formelle Dokumente.",
        gamesTitle: "Minispiele",
        gamesDesc: "Kleine Browsergames und Programmierexperimente.",
        projectsDesc: "Eine Sammlung meiner technischen Projekte und Experimente.",

        // Minigames
        minigamesTitle: "Minispiele",
        minesweeperDesc: "Das klassische Minenfeld-Spiel. Räume das Feld, ohne eine Mine zu zünden.",
        whoamiDesc: "Das beliebte Ratespiel. Errate den Charakter basierend auf Ja/Nein-Fragen.",
        
        // Documents
        documentsTitle: "Dokumente",
        bachelorDegreeTitle: "Bachelorabschluss",
        bachelorDegreeDesc: "Mein Bachelor-of-Science-Zeugnis (B.Sc. Informatik, DHBW Stuttgart).",
        resumeDesc: "Mein vollständiger professioneller Lebenslauf mit Details zu meinem Werdegang, Fähigkeiten und Ausbildung.",
        comingSoon: "Demnächst",
        careerPath: "Werdegang & Profil",
        
        // Footer
        footerText: "© 2025 Kağan Demirer."
    },
    tr: {
        greeting: "Merhaba, ben",
        heroDesc: "Erişilebilir, piksel mükemmelliğinde ve performanslı web deneyimleri geliştiriyorum.",
        viewWork: "Çalışmalarım",
        projects: "Projeler",
        vault: "Kasa",
        about: "Hakkımda",
        contact: "İletişim",
        projectsTitle: "Projeler",
        vaultTitle: "Kasa",
        vaultDesc: "Belgeler, deneyler ve mini oyunlardan oluşan bir koleksiyon.",
        aboutTitle: "Hakkımda",
        aboutText: "Ben Kağan, Stuttgart civarında çalışan bir yazılım mühendisiyim. Lisans eğitimimi (B.Sc. Bilgisayar Bilimleri) 2025 yılında DHBW Stuttgart'ta tamamladım. Verimli yazılımlar ve kullanıcı dostu uygulamalar geliştirmeye odaklanıyorum. Yolculuğum, sezgisel ön yüzlerden sağlam arka uçlara kadar tam yığın geliştirmeyi kapsıyor.",
        aboutText2: "Kod yazmadığım zamanlarda yeni teknolojileri keşfediyor veya iş akışlarını optimize ediyorum.",
        downloadResume: "Özgeçmişi İndir",
        
        // Experience
        experienceTitle: "Deneyim",
        
        // 2025 - Present (Job)
        expJobTitle: "Middleware Uzmanı",
        expJobOrg: "W&W Group",
        expJobDesc: "Kurumsal ara katman yazılımı çözümlerinin ve altyapısının yönetimi ve idaresi.",

        // 2022 - 2025 (Dual)
        expDualTitle: "Dual Öğrenci (B.Sc.)",
        expDualOrg: "W&W Group & DHBW Stuttgart",
        expDualDesc: "Uygulamalı Bilgisayar Bilimleri. DHBW'de akademik eğitim ve W&W'de pratik aşamalar.",

        // 2020 - 2022 (BK)
        expBkTitle: "Meslek Koleji",
        expBkOrg: "Carl-Schaefer-Schule Ludwigsburg",
        expBkDesc: "Bilişim Teknolojileri ve Matematik odaklı teknik diploma.",

        // Tags & Types
        gameDev: "Oyun Geliştirme",
        gameLogic: "Oyun Mantığı",
        aiAssistant: "Yapay Zeka Asistanı",
        university: "Üniversite",
        webApp: "Web Uygulaması",
        hackathon: "Hackathon",
        mobileApp: "Mobil Uygulama",
        personal: "Kişisel",
        mobileSolution: "Mobil Çözüm",
        lifestyle: "Yaşam Tarzı",
        uxDesign: "UX Tasarımı",
        apiIntegration: "API Entegrasyonu",
        frontend: "Ön Yüz",
        
        // Typewriter
        typewriter: ["Full Stack Geliştirici", "Yazılım Mühendisi", "Problem Çözücü", "Teknoloji Tutkunu"],

        // Projects
        werbinichDesc: "Evet/Hayır soruları kullanan bir karakter tahmin oyunu. Oyuncuların çıkarım becerilerini zorlamak için tasarlanmış etkileşimli web deneyimi.",
        playGame: "Oyunu Başlat",
        
        porgDesc: "DHBW BT öğrencilerinin sorularını yanıtlamak ve anında ayrıntılı profesör profilleri sağlamak için geliştirilmiş akıllı bir sohbet robotu.",
        internalProject: "Dahili Proje",
        
        doenerDesc: "Yakındaki kebapçıları bulun, inceleyin ve filtreleyin. En iyi yemek keşfi için konumları ve puanları etkileşimli bir haritada görüntüler.",
        uniProject: "Üniversite Projesi",
        
        tapDesc: "Müşterilerin doğrudan akıllı telefonları üzerinden sipariş vermesini ve servis çağırmasını sağlayan NFC tabanlı restoran çözümü.",
        concept: "Konsept",
        
        ewunDesc: "Yemek tutkunları için entegre alışveriş listeleri ve sosyal paylaşım özelliklerine sahip uluslararası tarif keşif platformu.",
        
        // Vault
        docsTitle: "Belgeler",
        docsDesc: "Özgeçmiş, Sertifikalar ve diğer resmi belgeler.",
        gamesTitle: "Mini Oyunlar",
        gamesDesc: "Küçük tarayıcı oyunları ve kodlama deneyleri.",
        projectsDesc: "Teknik projelerimin ve deneylerimin bir sergisi.",

        // Minigames
        minigamesTitle: "Mini Oyunlar",
        minesweeperDesc: "Klasik mayın tarlası oyunu. Hiçbir mayını patlatmadan alanı temizleyin.",
        whoamiDesc: "Popüler tahmin oyunu. Evet/Hayır sorularına dayanarak karakteri tahmin edin.",
        
        // Documents
        documentsTitle: "Belgeler",
        bachelorDegreeTitle: "Lisans Diploması",
        bachelorDegreeDesc: "Bilgisayar Bilimleri lisans diplomam (B.Sc., DHBW Stuttgart).",
        resumeDesc: "Kariyer yolumu, becerilerimi ve eğitimimi detaylandıran tam profesyonel özgeçmişim.",
        comingSoon: "Çok Yakında",
        careerPath: "Kariyer Yolu & Profil",
        
        // Footer
        footerText: "© 2025 Kağan Demirer."
    }
};

function initLanguage() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLangSpan = document.querySelector('.current-lang');
    const currentFlagSpan = document.querySelector('.current-flag');
    const langOptions = document.querySelectorAll('.lang-option');

    const flags = {
        en: "🇬🇧",
        de: "🇩🇪",
        tr: "🇹🇷"
    };

    if (!langBtn || !langDropdown) return;

    // Load saved language
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    updateLanguageUI(savedLang);

    // Toggle Dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langBtn.classList.toggle('active');
        langDropdown.classList.toggle('show');
    });

    // Close on click outside
    document.addEventListener('click', () => {
        langBtn.classList.remove('active');
        langDropdown.classList.remove('show');
    });

    // Handle Selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
            updateLanguageUI(lang);
        });
    });

    function updateLanguageUI(lang) {
        if (currentLangSpan) currentLangSpan.textContent = lang.toUpperCase();
        if (currentFlagSpan) currentFlagSpan.textContent = flags[lang];
        
        langOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

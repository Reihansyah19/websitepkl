// Ambil elemen yang dibutuhkan untuk Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // Mengambil tag <html> untuk mencocokkan CSS :root

// Ambil elemen yang dibutuhkan untuk Hamburger Menu Mobile
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

// Fungsi untuk memperbarui tampilan tema
function updateTheme(isLight) {
    if (isLight) {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Event listener saat tombol tema diklik
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Cek tema aktif saat ini dari atribut HTML
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        // Balikkan temanya
        if (currentTheme === 'light') {
            updateTheme(false); // Ubah ke dark
        } else {
            updateTheme(true);  // Ubah ke light
        }
    });
}

// Fitur Hamburger Menu (Mobile) ketika diklik
if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
        // Mencegah event bubbling agar tidak langsung tertutup saat diklik
        e.stopPropagation(); 
        hamburger.classList.toggle('active'); // Memicu animasi garis 3 menjadi X di CSS
        navLinks.classList.toggle('active');    // Memicu menu dropdown muncul
    });

    // Menutup menu otomatis jika pengguna mengklik area di luar menu
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active'); // Kembalikan tombol ke garis 3
            navLinks.classList.remove('active');    // Sembunyikan menu dropdown
        }
    });
}

// Cek preferensi saat halaman pertama kali dimuat (Anti-Reset saat Pindah Halaman)
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default ke dark jika kosong
    
    if (savedTheme === 'light') {
        updateTheme(true);
    } else {
        updateTheme(false);
    }
});
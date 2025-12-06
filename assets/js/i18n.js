// ===========================
//  Çok Dilli Sistem – i18n.js
// ===========================

// Tüm çeviri metinleri burada
const translations = {
  tr: {
    label_today: "BUGÜN NEREDEYİZ?",
    hero_title_main: "Hayati İşler & Urfa Sıra Gecesi",
    hero_desc:
      "Urfa türküleri, davul-zurna, saz ve renkli mendillerle tam bir sıra gecesi atmosferini sahneye taşıyoruz. Düğün, kına, kurumsal etkinlik ve özel gecelerinizde misafirlerinize unutulmaz bir gece yaşatıyoruz.",
    tag_live: "Canlı müzik",
    tag_stage: "Otantik sahne",
    tag_urfa: "Urfa & doğu ezgileri",
    tag_special: "Özel konsept",
  },

  en: {
    label_today: "WHERE ARE WE TODAY?",
    hero_title_main: "Hayati İşler & Urfa Night Event",
    hero_desc:
      "We bring the authentic Urfa night atmosphere with traditional music, drums, saz, and colorful scarves. Perfect for weddings, henna nights, corporate events, and special celebrations.",
    tag_live: "Live music",
    tag_stage: "Authentic stage",
    tag_urfa: "Urfa & eastern tunes",
    tag_special: "Special concept",
  },

  ar: {
    label_today: "أين نحن اليوم؟",
    hero_title_main: "حياتي إشلر & سهرة أورفا",
    hero_desc:
      "نقدم لكم أجواء سهرة أورفا الأصيلة مع الموسيقى، الطبل، الساز، والمناديل الملونة. مناسب للأعراس، ليالي الحناء، الفعاليات الشركات والمناسبات الخاصة.",
    tag_live: "موسيقى حية",
    tag_stage: "منصة تقليدية",
    tag_urfa: "أغاني أورفا الشرقية",
    tag_special: "عرض خاص",
  },

  de: {
    label_today: "WO SIND WIR HEUTE?",
    hero_title_main: "Hayati İşler & Urfa Nachtshow",
    hero_desc:
      "Wir bringen die authentische Urfa-Abendatmosphäre mit traditioneller Musik, Trommeln, Saz und farbigen Tüchern auf die Bühne. Ideal für Hochzeiten, Henna-Abende, Firmenfeiern und besondere Veranstaltungen.",
    tag_live: "Live-Musik",
    tag_stage: "Authentische Bühne",
    tag_urfa: "Urfa & östliche Melodien",
    tag_special: "Spezielles Konzept",
  },
};


// ===========================
//  Dil değiştirme fonksiyonu
// ===========================
function applyLanguage(lang) {
  const dict = translations[lang] || translations["tr"];

  // Tüm data-i18n alanlarını bul
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");

    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Arapça ise sağdan sola yazı yönü
  if (lang === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
}


// ===========================
//  İlk çalıştırma (sayfa açılınca)
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || "tr";
  applyLanguage(saved);
});

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

translations.tr.blog_title = "Blog Yazıları";
translations.en.blog_title = "Blog Articles";
translations.ar.blog_title = "مقالات المدونة";
translations.de.blog_title = "Blogartikel";

translations.tr.blog_adabi = "Sıra Gecesi Adabı";
translations.en.blog_adabi = "Etiquette of the Sıra Night";
translations.ar.blog_adabi = "آداب سهرة السيرة";
translations.de.blog_adabi = "Etikette der Sıra-Nacht";

translations.tr.blog_tarihcesi = "Sıra Gecesi Tarihçesi";
translations.en.blog_tarihcesi = "History of Sıra Night";
translations.ar.blog_tarihcesi = "تاريخ سهرة السيرة";
translations.de.blog_tarihcesi = "Geschichte der Sıra-Nacht";

translations.tr.blog_isimler = "Türkülerde Geçen İsimler & Hikâyeleri";
translations.en.blog_isimler = "Names in Folk Songs & Their Stories";
translations.ar.blog_isimler = "الأسماء في الأغاني الشعبية وقصصها";
translations.de.blog_isimler = "Namen in Volksliedern & ihre Geschichten";

translations.tr.blog_hikayeler = "Türkülerin Hikâyeleri";
translations.en.blog_hikayeler = "Stories Behind the Folk Songs";
translations.ar.blog_hikayeler = "قصص الأغاني الشعبية";
translations.de.blog_hikayeler = "Geschichten hinter den Volksliedern";

translations.tr.blog_cigkofte = "Çiğköfte Gelenekleri";
translations.en.blog_cigkofte = "Çiğköfte Traditions";
translations.ar.blog_cigkofte = "تقاليد الجيغ كفتة";
translations.de.blog_cigkofte = "Traditionen der Çiğköfte";

translations.tr.blog_mendil = "Sıra Gecesinde Mendil Sallama Anlamları";
translations.en.blog_mendil = "Meanings of Handkerchief Waving in Sıra Night";
translations.ar.blog_mendil = "معاني التلويح بالمنديل في سهرة السيرة";
translations.de.blog_mendil = "Bedeutungen des Taschentuchschwenkens in der Sıra-Nacht";

translations.tr.blog_mirra = "Mırra ve Sıra Gecesi Kültürü";
translations.en.blog_mirra = "Mırra and Sıra Night Culture";
translations.ar.blog_mirra = "المِرّة وثقافة سهرة السيرة";
translations.de.blog_mirra = "Mırra und die Kultur der Sıra-Nacht";


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

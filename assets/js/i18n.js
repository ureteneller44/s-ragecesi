// --------------------------------------------
//  LANGUAGE DATA
// --------------------------------------------
const i18nData = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      blog: "Blog",
      contact: "İletişim",
      lang: "Dil"
    },
    index: {
      heroTitle: "El emeği & yerel lezzetler tek platformda",
      heroDesc: "Kadın üreticilerden el işi ürünler ve yerel tatlar.",
      searchPlaceholder: "Ürün, kategori, ilçe ara…",
      login: "Giriş Yap",
      register: "Kayıt Ol"
    },
    blogs: {
      turkuHikayeleri: {
        title: "Türkülerin Hikâyeleri",
        intro1: "Türküler Anadolu insanının sevinci, acısı, kavgası, aşkı ve kaderiyle yoğrulmuş sözlü tarih belgeleridir.",
        intro2: "Bu sayfada en bilinen Urfa türkülerinin ardındaki gerçek hikâyeleri bulacaksınız.",
        // buraya diğer tüm bölümlerin Türkçe karşılıkları tek tek işlenecek
      }
      // diğer bloglar buraya eklenecek
    }
  },

  // ---------------------- ENGLISH ----------------------
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      contact: "Contact",
      lang: "Language"
    },
    index: {
      heroTitle: "Handmade goods & local flavors in one platform",
      heroDesc: "Handmade crafts and traditional foods from women producers.",
      searchPlaceholder: "Search: product, category, district…",
      login: "Login",
      register: "Register"
    },
    blogs: {
      turkuHikayeleri: {
        title: "Stories Behind the Folk Songs",
        intro1: "Folk songs are emotional historical records shaped by the joy, sadness and struggles of Anatolian people.",
        intro2: "Here you will find the true stories behind the most famous Urfa folk songs.",
      }
      // diğer blog çevirileri buraya gelecek
    }
  },

  // ---------------------- ARABIC ----------------------
  ar: {
    nav: {
      home: "الرئيسية",
      blog: "المدونة",
      contact: "اتصل بنا",
      lang: "اللغة"
    },
    index: {
      heroTitle: "المنتجات اليدوية والنكهات المحلية في منصة واحدة",
      heroDesc: "منتجات وحرف يدوية من النساء المنتجّات.",
      searchPlaceholder: "ابحث: منتج، فئة، منطقة…",
      login: "تسجيل الدخول",
      register: "إنشاء حساب"
    },
    blogs: {
      turkuHikayeleri: {
        title: "قصص الأغاني الشعبية",
        intro1: "الأغاني الشعبية هي سجلات شفوية شكّلها فرح وحزن ونضال أهل الأناضول.",
        intro2: "هنا ستجد القصص الحقيقية وراء أشهر أغاني أورفا.",
      }
    }
  },

  // ---------------------- GERMAN ----------------------
  de: {
    nav: {
      home: "Startseite",
      blog: "Blog",
      contact: "Kontakt",
      lang: "Sprache"
    },
    index: {
      heroTitle: "Handgemachte Produkte & lokale Spezialitäten auf einer Plattform",
      heroDesc: "Handarbeiten und lokale Speisen von Frauenproduzenten.",
      searchPlaceholder: "Suche: Produkt, Kategorie, Bezirk…",
      login: "Anmelden",
      register: "Registrieren"
    },
    blogs: {
      turkuHikayeleri: {
        title: "Geschichten der Volkslieder",
        intro1: "Volkslieder sind mündliche historische Aufzeichnungen, die von den Gefühlen der anatolischen Menschen geprägt wurden.",
        intro2: "Hier findest du die wahren Geschichten hinter den bekanntesten Urfa-Liedern.",
      }
    }
  }
};

// --------------------------------------------
//  APPLY TRANSLATION
// --------------------------------------------
function applyTranslations(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let text = i18nData[lang];

    keys.forEach(k => {
      if (text && text[k] !== undefined) text = text[k];
    });

    if (typeof text === "string") el.innerHTML = text;
  });
}

// --------------------------------------------
//  LANGUAGE SWITCH HANDLER
// --------------------------------------------
function changeLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
}

// --------------------------------------------
//  INIT
// --------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "tr";
  applyTranslations(savedLang);
});

export type Locale = "uz-cyr" | "uz-lat" | "ru" | "en";

export interface TranslationDict {
  metaTitle: string;
  metaDesc: string;
  logoSub: string;
  navAbout: string;
  navFeatures: string;
  navHowItWorks: string;
  navFaq: string;
  navBlog: string;
  navContact: string;
  navDonate: string;
  contactTooltip: string;
  themeToggleDark: string;
  themeToggleLight: string;
  
  // Hero
  heroBadge: string;
  heroTitlePre: string;
  heroTitleHighlight: string;
  heroTitlePost: string;
  heroSubtitle: string;

  // Uploader
  uploaderTitle: string;
  uploaderDropzone: string;
  uploaderProcessing: string;
  uploaderConverting: string;
  uploaderReady: string;
  uploaderDownload: string;
  uploaderRemove: string;
  uploaderErrFormat: string;
  uploaderErrSize: string;
  uploaderErrEmpty: string;
  uploaderErrUnknown: string;
  uploaderErrRead: string;
  uploaderBadge: string;

  // Converter Panels
  panelInputHeader: string;
  panelInputClear: string;
  panelInputPlaceholder: string;
  panelOutputHeader: string;
  panelOutputCopy: string;
  panelOutputCopied: string;
  panelOutputDownload: string;
  panelOutputPlaceholder: string;
  panelCharCount: string;
  panelWordCount: string;
  panelPasteShortcut: string;
  panelPasteAction: string;
  panelAutoNotice: string;
  panelDownloadTxt: string;
  panelDownloadDocx: string;
  panelQuickClear: string;

  // Scripts
  scriptCyrillic: string;
  scriptLatinOld: string;
  scriptLatinNew: string;
  scriptAuto: string;
  scriptSwap: string;
  scriptOldBadge: string;
  scriptNewBadge: string;
  scriptFromLabel: string;
  scriptToLabel: string;

  // How It Works
  howItWorksEyebrow: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // Features
  featuresEyebrow: string;
  featuresTitle: string;
  featuresSubtitle: string;
  feat1Title: string;
  feat1Desc: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Title: string;
  feat3Desc: string;
  feat4Title: string;
  feat4Desc: string;
  feat5Title: string;
  feat5Desc: string;
  feat6Title: string;
  feat6Desc: string;

  // About & Legacy
  aboutEyebrow: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  featuresPrivacyEyebrow: string;
  featuresPrivacyTitle: string;
  featuresPrivacyDesc: string;
  featuresWordEyebrow: string;
  featuresWordTitle: string;
  featuresWordDesc: string;
  featuresFootnote: string;

  // Blog Section on Home
  blogEyebrow: string;
  blogTitle: string;
  blogSubtitle: string;
  blogViewAll: string;
  blogReadTime: string;

  // FAQ
  faqEyebrow: string;
  faqTitle: string;
  faqSubtitle: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqQ6: string;
  faqA6: string;
  faqQ7: string;
  faqA7: string;
  faqQ8: string;
  faqA8: string;

  // SEO Content Table
  seoAlphabetEyebrow: string;
  seoAlphabetTitle: string;
  seoAlphabetDesc: string;
  seoThCyr: string;
  seoThLat: string;
  seoThExCyr: string;
  seoThExLat: string;
  seoRulesEyebrow: string;
  seoRulesTitle: string;
  seoHistoryEyebrow: string;
  seoHistoryTitle: string;

  // Modals
  modalDonateTitle: string;
  modalDonateDesc: string;
  modalDonateCopy: string;
  modalDonateCopied: string;
  modalDonateCopiedToast: string;
  modalDonateHolder: string;
  modalDonateButton: string;
  modalDonateCardLabel: string;
  modalDonateCardHolderLabel: string;
  modalContactTitle: string;
  modalContactDesc: string;
  modalContactLink: string;
  modalContactItServices: string;
  modalContactItDesc: string;
  modalContactSuggest: string;
  modalContactSuggestDesc: string;
  modalClose: string;

  // Footer
  footerDesc: string;
  footerNavTitle: string;
  footerScriptsTitle: string;
  footerToolsTitle: string;
  footerContactTitle: string;
  footerPrivacyNote: string;
  footerAllRights: string;

  // Toasts & PWA
  toastNoTextToCopy: string;
  toastCopied: string;
  toastCopyError: string;
  toastNoTextToDownload: string;
  toastCleared: string;
  toastUndo: string;
  toastFileLoaded: string;
  toastFileLoadError: string;
  offlineToast: string;
  onlineToast: string;
  pwaInstallTitle: string;
  pwaInstallDesc: string;
  pwaInstallBtn: string;
  pwaInstallDismiss: string;
  pwaBadgeOffline: string;
}

export const translations: Record<Locale, TranslationDict> = {
  "uz-lat": {
    metaTitle: "Kirill Lotin Konvertor — Kirildan Lotinga va Lotindan Kirilga onlayn o'girish | kirillotin.uz",
    metaDesc: "O'zbek matnlarini Kirill, Eski lotin va Yangi lotin yozuvlari o'rtasida tezkor va bepul konvertatsiya qilish. Word (.docx) va .txt fayllarni formatlash bilan o'giring.",
    logoSub: "kirillotin.uz",
    navAbout: "Sayt haqida",
    navFeatures: "Imkoniyatlar",
    navHowItWorks: "Qanday ishlaydi?",
    navFaq: "Savollar",
    navBlog: "Blog",
    navContact: "Bog'lanish",
    navDonate: "Donat",
    contactTooltip: "Dasturchi bilan bog'lanish",
    themeToggleDark: "Tungi rejimga o'tish",
    themeToggleLight: "Kun rejimiga o'tish",

    heroBadge: "✨ 100% Bepul, Tezkor va Maxfiy Konvertor",
    heroTitlePre: "Kirilldan ",
    heroTitleHighlight: "lotinga",
    heroTitlePost: " va aksincha",
    heroSubtitle: "Matnlaringizni bir zumda kerakli yozuvga o'giring.",

    uploaderTitle: "Hujjat yuklash",
    uploaderDropzone: "Faylni tanlang yoki shu yerga tashlang (.txt, .docx · maks 5MB)",
    uploaderProcessing: "Fayl yuklanmoqda...",
    uploaderConverting: "Konvertatsiya qilinmoqda...",
    uploaderReady: "Tayyor",
    uploaderDownload: "Yuklab olish",
    uploaderRemove: "Faylni tozalash",
    uploaderErrFormat: "Faqat .txt yoki .docx fayllar qabul qilinadi",
    uploaderErrSize: "Fayl hajmi 5MB dan oshmasligi kerak",
    uploaderErrEmpty: "Fayl bo'sh yoki o'qib bo'lmadi",
    uploaderErrUnknown: "Noma'lum fayl turi",
    uploaderErrRead: "Faylni o'qishda xatolik yuz berdi",
    uploaderBadge: "DOCX & TXT",

    panelInputHeader: "Matn kiritish",
    panelInputClear: "Tozalash",
    panelInputPlaceholder: "Matnni shu yerga kiriting...",
    panelOutputHeader: "Natija",
    panelOutputCopy: "Nusxalash",
    panelOutputCopied: "Nusxalandi!",
    panelOutputDownload: "Yuklab olish",
    panelOutputPlaceholder: "Natija shu yerda ko'rinadi...",
    panelCharCount: "belgi",
    panelWordCount: "so'z",
    panelPasteShortcut: "Ctrl + V — matn qo'yish",
    panelPasteAction: "Qo'yish",
    panelAutoNotice: "Matn kiritishingiz bilan natija avtomatik hosil bo'ladi.",
    panelDownloadTxt: "Matn fayl (.txt)",
    panelDownloadDocx: "Word hujjati (.docx)",
    panelQuickClear: "Tozalash",

    scriptCyrillic: "Kirill",
    scriptLatinOld: "Eski lotin",
    scriptLatinNew: "Yangi lotin",
    scriptAuto: "Avtomatik aniqlash",
    scriptSwap: "Almashtirish",
    scriptOldBadge: "Oʻ, Gʻ, Sh, Ch",
    scriptNewBadge: "Ö, Ğ, Ş, Ç",
    scriptFromLabel: "Qaysi yozuvdan:",
    scriptToLabel: "Qaysi yozuvga:",

    howItWorksEyebrow: "Qo'llanma",
    howItWorksTitle: "Qanday ishlaydi?",
    howItWorksSubtitle: "Matnlaringizni uchta oson va tushunarli qadamda kerakli yozuvga o'giring",
    step1Title: "Matn kiriting yoki fayl yuklang",
    step1Desc: "Matnni to'g'ridan-to'g'ri kiriting, buferdan qo'ying yoki Word (.docx) va TXT hujjatini yuklang.",
    step2Title: "Kerakli yozuv tizimini tanlang",
    step2Desc: "Kirill, Eski lotin yoki Yangi lotinni mustaqil tanlang yoki avtomatik aniqlash imkoniyatidan foydalaning.",
    step3Title: "Natijani nusxalang yoki yuklab oling",
    step3Desc: "Birgina bosish bilan tayyor matnni nusxalang yoki yangilangan hujjatni (.docx/.txt) yuklab oling.",

    featuresEyebrow: "Afzalliklar",
    featuresTitle: "Asosiy imkoniyatlar",
    featuresSubtitle: "Kirilllotin.uz qulay, zamonaviy va tezkor transliteratsiya uchun barcha qulayliklarni taklif etadi",
    feat1Title: "Uch xil yozuv tizimi",
    feat1Desc: "Kirill, Eski lotin (1995-yil) va Yangi lotin (2021-yil loyihasi) o'rtasida barcha 6 yo'nalishda bexato konvertatsiya qiling.",
    feat2Title: "Tezkor konvertatsiya",
    feat2Desc: "Har bir belgi kiritilishi bilanoq real vaqtda bir zumda konvertatsiya qilinadi — kutish va kechikishlar yo'q.",
    feat3Title: "Avtomatik aniqlash",
    feat3Desc: "Kiritilgan matn kirill yoki lotin ekanligini aqlli tahlil qilib, kerakli yo'nalishni mustaqil tanlaydi.",
    feat4Title: "Fayllarni o'girish",
    feat4Desc: "MS Word (.docx) va matnli (.txt) fayllarni jadvallar, ranglar va matn formatlashini 100% to'liq saqlagan holda o'giring.",
    feat5Title: "Nusxalash va yuklab olish",
    feat5Desc: "Natijani bir tugma bilan buferga nusxalang yoki to'g'ridan-to'g'ri .txt va .docx formatlarida yuklab oling.",
    feat6Title: "Qulay va bepul foydalanish",
    feat6Desc: "Hech qanday to'lov yoki ro'yxatdan o'tish talab etilmaydi. Barcha amallar faqat brauzeringizda xavfsiz bajariladi.",

    aboutEyebrow: "Loyiha haqida",
    aboutTitle: "Kirilllotin.uz — Milliy transliteratsiya platformasi",
    aboutDesc1: "O'zbek tilidagi matnlarni Kirill, Eski lotin va Yangi lotin yozuvlari o'rtasida bir zumda konvertatsiya qilish uchun yaratilgan zamonaviy onlayn platforma. Barcha hisob-kitoblar faqat brauzeringizda amalga oshiriladi va ma'lumotlar serverga yuborilmaydi.",
    aboutDesc2: "Word (.docx) formatidagi rasmiy hujjatlar, jadvallar va turli matn formatlashlari to'liq o'z holicha saqlab qolinadi.",
    featuresPrivacyEyebrow: "Maxfiylik",
    featuresPrivacyTitle: "Matningiz serverga yuborilmaydi",
    featuresPrivacyDesc: "Barcha konvertatsiya jarayoni sizning brauzeringizda amalga oshiriladi. Biz ham, boshqa hech kim ham yozganingizni ko'rmaydi. Bir marta ochilgandan keyin sayt internetsiz ham ishlayveradi.",
    featuresWordEyebrow: "Hujjatlar",
    featuresWordTitle: "Word (.docx) fayllarni formatlash bilan o'girish",
    featuresWordDesc: "Maxsus MS Word (.docx) faylini yuklang. Konvertor ichidagi barcha ranglar, jadvallar va formatlash elementlarini saqlab qolgan holda matnni o'girib beradi.",
    featuresFootnote: "Bepul. Ro'yxatdan o'tish yo'q. Reklama yo'q.",

    blogEyebrow: "Foydali maqolalar",
    blogTitle: "O'zbek tili va imlosi bo'yicha qo'llanmalar",
    blogSubtitle: "Kirill va lotin yozuvi qoidalari, tarixiy bosqichlar va Word hujjatlari bilan ishlash bo'yicha maqolalar",
    blogViewAll: "Barcha maqolalarni ko'rish",
    blogReadTime: "daqiqa o'qish",

    faqEyebrow: "Savollar va javoblar",
    faqTitle: "Ko'p beriladigan savollar",
    faqSubtitle: "Kirilllotin.uz platformasidan foydalanish bo'yicha eng muhim savollarga javoblar",
    faqQ1: "Kirilllotin.uz qanday ishlaydi?",
    faqA1: "Kirilllotin.uz o'zbek tili imlo qoidalariga asoslangan zamonaviy algoritmlar yordamida ishlaydi. Kiritilgan matn belgima-belgi tahlil qilinib, murakkab tovushlar (Sh, Ch, Yo, Yu, Ya, Ts, E/Ye) va yumshoqlik/tutuq belgilari rasmiy qoidalar asosida o'giriladi.",
    faqQ2: "Eski lotin va yangi lotin o'rtasidagi farq nima?",
    faqA2: "Eski lotin — 1995-yilda qabul qilingan va hozirda amalda bo'lgan alifbo (Oʻ, Gʻ, Sh, Ch harflari bilan). Yangi lotin esa 2021-yilda e'lon qilingan loyiha bo'lib, unda Oʻ va Gʻ harflari o'rniga Ö va Ğ, Sh va Ch o'rniga Ş va Ç diakritik harflari qo'llaniladi.",
    faqQ3: "Qanday qilib matnni kirilldan lotinga o'girish mumkin?",
    faqA3: "Juda oddiy: chap tarafdagi maydonga kirillcha matnni kiriting yoki qo'ying. Sayt avtomatik ravishda uni aniqlaydi va o'ng tarafdagi maydonda darhol lotincha natijani hosil qiladi.",
    faqQ4: "Word fayllarini ham konvertatsiya qilish mumkinmi?",
    faqA4: "Ha! Saytga Microsoft Word (.docx) formatidagi fayllarni yuklashingiz mumkin. Konvertor hujjatdagi shriftlar, jadvallar, ranglar va boshqa formatlashlarni to'liq saqlagan holda matnni o'girib, yangi .docx faylni taqdim etadi.",
    faqQ5: "Saytdan foydalanish bepulmi?",
    faqA5: "Ha, saytdan foydalanish mutlaqo bepul va hech qanday cheklovlar yo'q. Loyihamizni qo'llab-quvvatlamoqchi bo'lsangiz, «Donat» tugmasi orqali hissa qo'shishingiz mumkin.",
    faqQ6: "Matnlarim serverda saqlanadimi?",
    faqA6: "Yo'q, matnlaringiz serverda saqlanmaydi va uchinchi shaxslarga uzatilmaydi. Barcha konvertatsiya amallari faqat sizning qurilmangizdagi brauzer ichida (JavaScript orqali) xavfsiz tarzda bajariladi.",
    faqQ7: "Mobil qurilmalarda qulay ishlaydimi?",
    faqA7: "Ha, saytimiz smartfonlar va planshetlar uchun to'liq moslashtirilgan. Kichik ekranlarda converter vertikal qulay ko'rinishga o'tadi va bir qo'l bilan boshqarish imkonini beradi.",
    faqQ8: "Biror so'z noto'g'ri o'girilsa nima qilish kerak?",
    faqA8: "Bizga Telegram orqali bog'lanishingiz mumkin (@Shohruz_Isroilov). Imlo xatolari va takliflar tezkor ravishda ko'rib chiqiladi va tuzatiladi.",

    seoAlphabetEyebrow: "Alifbo",
    seoAlphabetTitle: "Kirill va Lotin harflari jadvali",
    seoAlphabetDesc: "O'zbek tilidagi barcha kirill harflarining lotincha ekvivalenti va misollar bilan to'liq jadval.",
    seoThCyr: "Kirill",
    seoThLat: "Lotin",
    seoThExCyr: "Misol (Kirill)",
    seoThExLat: "Misol (Lotin)",
    seoRulesEyebrow: "Qoidalar",
    seoRulesTitle: "Kirill va Lotin yozuv qoidalari",
    seoHistoryEyebrow: "Tarix",
    seoHistoryTitle: "O'zbek yozuvi tarixi haqida",

    modalDonateTitle: "Loyihani qo'llab-quvvatlash",
    modalDonateDesc: "Saytimiz reklamasiz va bepul ishlashi uchun ketadigan server xarajatlarini qoplashda o'z hissangizni qo'shing.",
    modalDonateCopy: "Nusxa olish",
    modalDonateCopied: "Nusxalandi!",
    modalDonateCopiedToast: "Karta raqami nusxalandi",
    modalDonateHolder: "Shohruz Isroilov",
    modalDonateButton: "Karta raqamini nusxalash",
    modalDonateCardLabel: "Humo karta raqami",
    modalDonateCardHolderLabel: "Karta egasi",
    modalContactTitle: "Bog'lanish",
    modalContactDesc: "Agar sizda takliflar bo'lsa yoki IT loyihalar bo'yicha hamkorlik qilmoqchi bo'lsangiz, men bilan bog'lanishingiz mumkin:",
    modalContactLink: "Telegram orqali yozish",
    modalContactItServices: "IT xizmatlari",
    modalContactItDesc: "Veb-sayt, mobil ilova, dastur yoki boshqa IT loyiha buyurtmasi uchun",
    modalContactSuggest: "Muammo yoki taklif",
    modalContactSuggestDesc: "Saytda xato topdingizmi yoki yaxshilash uchun taklifingiz bormi?",
    modalClose: "Yopish",

    footerDesc: "O'zbek tilidagi matnlarni Kirill, Eski Lotin va Yangi Lotin yozuvlari o'rtasida bir zumda konvertatsiya qiluvchi bepul va xavfsiz milliy platforma.",
    footerNavTitle: "Sahifalar",
    footerScriptsTitle: "Yozuv tizimlari",
    footerToolsTitle: "Fayllar & Xizmatlar",
    footerContactTitle: "Bog'lanish",
    footerPrivacyNote: "100% brauzerda ishlaydi — matnlaringiz serverga bormaydi va saqlanmaydi.",
    footerAllRights: "Barcha huquqlar himoyalangan.",

    toastNoTextToCopy: "Nusxalash uchun matn mavjud emas",
    toastCopied: "Nusxa buferga olindi",
    toastCopyError: "Nusxalashda xatolik yuz berdi",
    toastNoTextToDownload: "Yuklab olish uchun matn mavjud emas",
    toastCleared: "Matn tozalandi",
    toastUndo: "Bekor qilish",
    toastFileLoaded: '"{name}" fayli muvaffaqiyatli yuklandi',
    toastFileLoadError: "Faylni yuklashda xatolik yuz berdi",
    offlineToast: "Internet uzildi. Konvertor oflayn rejimda ishlamoqda.",
    onlineToast: "Internet aloqasi tiklandi.",
    pwaInstallTitle: "Ilovani o'rnatish",
    pwaInstallDesc: "Kirill ↔ Lotin konvertorini tezkor ochish uchun ilova sifatida o'rnating.",
    pwaInstallBtn: "O'rnatish",
    pwaInstallDismiss: "Keyinroq",
    pwaBadgeOffline: "Oflayn rejim",
  },

  "uz-cyr": {
    metaTitle: "Кирилл Лотин Конвертор — Кирилдан Лотинга ва Лотиндан Кирилга онлайн ўгириш | kirillotin.uz",
    metaDesc: "Ўзбек матнларини Кирилл, Эски лотин ва Янги лотин ёзувлари ўртасида тезкор ва бепул конвертация қилиш. Word (.docx) ва .txt файлларни форматлаш билан ўгиринг.",
    logoSub: "kirillotin.uz",
    navAbout: "Сайт ҳақида",
    navFeatures: "Имкониятлар",
    navHowItWorks: "Қандай ишлайди?",
    navFaq: "Саволлар",
    navBlog: "Блог",
    navContact: "Боғланиш",
    navDonate: "Донат",
    contactTooltip: "Дастурчи билан боғланиш",
    themeToggleDark: "Тунги режимга ўтиш",
    themeToggleLight: "Кун режимига ўтиш",

    heroBadge: "✨ 100% Бепул, Тезкор ва Махфий Конвертор",
    heroTitlePre: "Кирилдан ",
    heroTitleHighlight: "лотинга",
    heroTitlePost: " ва аксинча",
    heroSubtitle: "Матнларингизни бир зумда керакли ёзувга ўгиринг.",

    uploaderTitle: "Ҳужжат юклаш",
    uploaderDropzone: "Файлни танланг ёки шу ерга ташланг (.txt, .docx · макс 5MB)",
    uploaderProcessing: "Файл юкланмоқда...",
    uploaderConverting: "Конвертация қилинмоқда...",
    uploaderReady: "Тайёр",
    uploaderDownload: "Юклаб олиш",
    uploaderRemove: "Файлни тозалаш",
    uploaderErrFormat: "Фақат .txt ёки .docx файллар қабул қилинади",
    uploaderErrSize: "Файл ҳажми 5MB дан ошмаслиги керак",
    uploaderErrEmpty: "Файл бўш ёки ўқиб бўлмади",
    uploaderErrUnknown: "Номаълум файл тури",
    uploaderErrRead: "Файлни ўқишда хатолик юз берди",
    uploaderBadge: "DOCX & TXT",

    panelInputHeader: "Матн киритиш",
    panelInputClear: "Тозалаш",
    panelInputPlaceholder: "Матнни шу ерга киритинг...",
    panelOutputHeader: "Натижа",
    panelOutputCopy: "Нусхалаш",
    panelOutputCopied: "Нусхаланди!",
    panelOutputDownload: "Юклаб олиш",
    panelOutputPlaceholder: "Натижа шу ерда кўринади...",
    panelCharCount: "белги",
    panelWordCount: "сўз",
    panelPasteShortcut: "Ctrl + V — матн қўйиш",
    panelPasteAction: "Қўйиш",
    panelAutoNotice: "Матн киритишингиз билан натижа автоматик ҳосил бўлади.",
    panelDownloadTxt: "Матн файл (.txt)",
    panelDownloadDocx: "Word ҳужжати (.docx)",
    panelQuickClear: "Тозалаш",

    scriptCyrillic: "Кирилл",
    scriptLatinOld: "Эски лотин",
    scriptLatinNew: "Янги лотин",
    scriptAuto: "Автоматик аниқлаш",
    scriptSwap: "Алмаштириш",
    scriptOldBadge: "Oʻ, Gʻ, Sh, Ch",
    scriptNewBadge: "Ö, Ğ, Ş, Ç",
    scriptFromLabel: "Қайси ёзувдан:",
    scriptToLabel: "Қайси ёзувга:",

    howItWorksEyebrow: "Қўлланма",
    howItWorksTitle: "Қандай ишлайди?",
    howItWorksSubtitle: "Матнларингизни учта осон ва тушунарли қадамда керакли ёзувга ўгиринг",
    step1Title: "Матн киритинг ёки файл юкланг",
    step1Desc: "Матнни тўғридан-тўғри киритинг, буфердан қўйинг ёки Word (.docx) ва TXT ҳужжатини юкланг.",
    step2Title: "Керакли ёзув тизимини танланг",
    step2Desc: "Кирилл, Эски лотин ёки Янги лотинни мустақил танланг ёки автоматик аниқлаш имкониятидан фойдаланинг.",
    step3Title: "Натижани нусхаланг ёки юклаб олинг",
    step3Desc: "Биргина босиш билан тайёр матнни нусхаланг ёки янгиланган ҳужжатни (.docx/.txt) юклаб олинг.",

    featuresEyebrow: "Афзалликлар",
    featuresTitle: "Асосий имкониятлар",
    featuresSubtitle: "Kirilllotin.uz қулай, замонавий ва тезкор транслитерация учун барча қулайликларни таклиф этади",
    feat1Title: "Уч хил ёзув тизими",
    feat1Desc: "Кирилл, Эски лотин (1995-йил) ва Янги лотин (2021-йил лойиҳаси) ўртасида барча 6 йўналишда бехато конвертация қилинг.",
    feat2Title: "Тезкор конвертация",
    feat2Desc: "Ҳар бир белги киритилиши биланоқ реал вақтда бир зумда конвертация қилинади — кутиш ва кечикишлар йўқ.",
    feat3Title: "Автоматик аниқлаш",
    feat3Desc: "Киритилган матн кирилл ёки лотин эканлигини ақлли таҳлил қилиб, керакли йўналишни мустақил танлайди.",
    feat4Title: "Файлларни ўгириш",
    feat4Desc: "MS Word (.docx) ва матнли (.txt) файлларни жадваллар, ранглар ва матн форматлашини 100% тўлиқ сақлаган ҳолда ўгиринг.",
    feat5Title: "Нусхалаш ва юклаб олиш",
    feat5Desc: "Натижани бир тугма билан буферга нусхаланг ёки тўғридан-тўғри .txt ва .docx форматларида юклаб олинг.",
    feat6Title: "Қулай ва бепул фойдаланиш",
    feat6Desc: "Ҳеч қандай тўлов ёки рўйхатдан ўтиш талаб этилмайди. Барча амаллар фақат браузерингизда хавфсиз бажарилади.",

    aboutEyebrow: "Лойиҳа ҳақида",
    aboutTitle: "Kirilllotin.uz — Миллий транслитерация платформаси",
    aboutDesc1: "Ўзбек тилидаги матнларни Кирилл, Эски лотин ва Янги лотин ёзувлари ўртасида бир зумда конвертация қилиш учун яратилган замонавий онлайн платформа. Барча ҳисоб-китоблар фақат браузерингизда амалга оширилади ва маълумотлар серверга юборилмайди.",
    aboutDesc2: "Word (.docx) форматидаги расмий ҳужжатлар, жадваллар ва турли матн форматлашлари тўлиқ ўз ҳолича сақлаб қолинади.",
    featuresPrivacyEyebrow: "Махфийлик",
    featuresPrivacyTitle: "Матнингиз серверга юборилмайди",
    featuresPrivacyDesc: "Барча конвертация жараёни сизнинг браузерингизда амалга оширилади. Биз ҳам, бошқа ҳеч ким ҳам ёзганингизни кўрмайди. Бир марта очилгандан кейин сайт интернетсиз ҳам ишлайверади.",
    featuresWordEyebrow: "Ҳужжатлар",
    featuresWordTitle: "Word (.docx) файлларни форматлаш билан ўгириш",
    featuresWordDesc: "Махсус MS Word (.docx) файлини юкланг. Конвертор ичидаги барча ранглар, жадваллар ва форматлаш элементларини сақлаб қолган ҳолда матнни ўгириб беради.",
    featuresFootnote: "Бепул. Рўйхатдан ўтиш йўқ. Реклама йўқ.",

    blogEyebrow: "Фойдали мақолалар",
    blogTitle: "Ўзбек тили ва имлоси бўйича қўлланмалар",
    blogSubtitle: "Кирилл ва лотин ёзуви қоидалари, тарихий босқичлар ва Word ҳужжатлари билан ишлаш бўйича мақолалар",
    blogViewAll: "Барча мақолаларни кўриш",
    blogReadTime: "дақиқа ўқиш",

    faqEyebrow: "Саволлар ва жавоблар",
    faqTitle: "Кўп бериладиган саволлар",
    faqSubtitle: "Kirilllotin.uz платформасидан фойдаланиш бўйича энг муҳим саволларга жавоблар",
    faqQ1: "Kirilllotin.uz қандай ишлайди?",
    faqA1: "Kirilllotin.uz ўзбек тили имло қоидаларига асосланган замонавий алгоритмлар ёрдамида ишлайди. Киритилган матн белгима-белги таҳлил қилиниб, мураккаб товушлар (Ш, Ч, Ё, Ю, Я, Ц, Е/Э) ва юмшоқлик/тутуқ белгилари расмий қоидалар асосида ўгирилади.",
    faqQ2: "Эски лотин ва янги лотин ўртасидаги фарқ нима?",
    faqA2: "Эски лотин — 1995-йилда қабул қилинган ва ҳозирда амалда бўлган алифбо (Oʻ, Gʻ, Sh, Ch ҳарфлари билан). Янги лотин эса 2021-йилда эълон қилинган лойиҳа бўлиб, унда Oʻ ва Gʻ ҳарфлари ўрнига Ö ва Ğ, Sh ва Ch ўрнига Ş ва Ç диакритик ҳарфлари қўлланилади.",
    faqQ3: "Қандай қилиб матнни кириллдан лотинга ўгириш мумкин?",
    faqA3: "Жуда оддий: чап тарафдаги майдонга кириллча матнни киритинг ёки қўйинг. Сайт автоматик равишда уни аниқлайди ва ўнг тарафдаги майдонда дарҳол лотинча натижани ҳосил қилади.",
    faqQ4: "Word файлларини ҳам конвертация қилиш мумкинми?",
    faqA4: "Ҳа! Сайтга Microsoft Word (.docx) форматидаги файлларни юклашингиз мумкин. Конвертор ҳужжатдаги шрифтлар, жадваллар, ранглар ва бошқа форматлашларни тўлиқ сақлаган ҳолда матнни ўгириб, янги .docx файлни тақдим этади.",
    faqQ5: "Сайтдан фойдаланиш бепулми?",
    faqA5: "Ҳа, сайтдан фойдаланиш мутлақо бепул ва ҳеч қандай чекловлар йўқ. Лойиҳамизни қўллаб-қувватламоқчи бўлсангиз, «Донат» тугмаси орқали ҳисса қўшишингиз мумкин.",
    faqQ6: "Матнларим серверда сақланадими?",
    faqA6: "Йўқ, матнларингиз серверда сақланмайди ва учинчи шахсларга узатилмайди. Барча конвертация амаллари фақат сизнинг қурилмангиздаги браузер ичида (JavaScript орқали) хавфсиз тарзда бажарилади.",
    faqQ7: "Мобил қурилмаларда қулай ишлайдими?",
    faqA7: "Ҳа, сайтимиз смартфонлар ва планшетлар учун тўлиқ мослаштирилган. Кичик экранларда converter вертикал қулай кўринишга ўтади ва бир қўл билан бошқариш имконини беради.",
    faqQ8: "Бирор сўз нотўғри ўгирилса нима қилиш керак?",
    faqA8: "Бизга Telegram орқали боғланишингиз мумкин (@Shohruz_Isroilov). Имло хатолари ва таклифлар тезкор равишда кўриб чиқилади ва тузатилади.",

    seoAlphabetEyebrow: "Алифбо",
    seoAlphabetTitle: "Кирилл ва Лотин ҳарфлари жадвали",
    seoAlphabetDesc: "Ўзбек тилидаги барча кирилл ҳарфларининг лотинча эквиваленти ва мисоллар билан тўлиқ жадвал.",
    seoThCyr: "Кирилл",
    seoThLat: "Лотин",
    seoThExCyr: "Мисол (Кирилл)",
    seoThExLat: "Мисол (Лотин)",
    seoRulesEyebrow: "Қоидалар",
    seoRulesTitle: "Кирилл ва Лотин ёзув қоидалари",
    seoHistoryEyebrow: "Тарих",
    seoHistoryTitle: "Ўзбек ёзуви тарихи ҳақида",

    modalDonateTitle: "Лойиҳани қўллаб-қувватлаш",
    modalDonateDesc: "Сайтимиз рекламасиз ва бепул ишлаши учун кетадиган сервер харажатларини қоплашда ўз ҳиссангизни қўшинг.",
    modalDonateCopy: "Нусха олиш",
    modalDonateCopied: "Нусхаланди!",
    modalDonateCopiedToast: "Карта рақами нусхаланди",
    modalDonateHolder: "Шоҳруз Исроилов",
    modalDonateButton: "Карта рақамини нусхалаш",
    modalDonateCardLabel: "Humo карта рақами",
    modalDonateCardHolderLabel: "Карта эгаси",
    modalContactTitle: "Боғланиш",
    modalContactDesc: "Агар сизда таклифлар бўлса ёки IT лойиҳалар бўйича ҳамкорлик қилмоқчи бўлсангиз, мен билан боғланишингиз мумкин:",
    modalContactLink: "Телеграм орқали ёзиш",
    modalContactItServices: "IT хизматлари",
    modalContactItDesc: "Веб-сайт, мобил илова, дастур ёки бошқа IT лойиҳа буюртмаси учун",
    modalContactSuggest: "Муаммо ёки таклиф",
    modalContactSuggestDesc: "Сайтда хато топдингизми ёки яхшилаш учун таклифингиз борми?",
    modalClose: "Ёпиш",

    footerDesc: "Ўзбек тилидаги матнларни Кирилл, Эски Лотин ва Янги Лотин ёзувлари ўртасида бир зумда конвертация қилувчи бепул ва хавфсиз миллий платформа.",
    footerNavTitle: "Саҳифалар",
    footerScriptsTitle: "Ёзув тизимлари",
    footerToolsTitle: "Файллар & Хизматлар",
    footerContactTitle: "Боғланиш",
    footerPrivacyNote: "100% браузерда ишлайди — матнларингиз серверга бормайди ва сақланмайди.",
    footerAllRights: "Барча ҳуқуқлар ҳимояланган.",

    toastNoTextToCopy: "Нусхалаш учун матн мавжуд эмас",
    toastCopied: "Нусха буферга олинди",
    toastCopyError: "Нусхалашда хатолик юз берди",
    toastNoTextToDownload: "Юклаб олиш учун матн мавжуд эмас",
    toastCleared: "Матн тозаланди",
    toastUndo: "Бекор қилиш",
    toastFileLoaded: '"{name}" файли муваффақиятли юкланди',
    toastFileLoadError: "Файлни юклашда хатолик юз берди",
    offlineToast: "Интернет узилди. Конвертор офлайн режимда ишламоқда.",
    onlineToast: "Интернет алоқаси тикланди.",
    pwaInstallTitle: "Иловани ўрнатиш",
    pwaInstallDesc: "Кирилл ↔ Лотин конверторини тезкор очиш учун илова сифатида ўрнатинг.",
    pwaInstallBtn: "Ўрнатиш",
    pwaInstallDismiss: "Кейинроқ",
    pwaBadgeOffline: "Офлайн режим",
  },

  "ru": {
    metaTitle: "Конвертер Кириллица Латиница — Онлайн транслитерация узбекского языка | kirillotin.uz",
    metaDesc: "Бесплатный перевод узбекского текста между Кириллицей, старой и новой Латиницей. Поддержка документов Word (.docx) и файлов .txt с сохранением форматирования.",
    logoSub: "kirillotin.uz",
    navAbout: "О сервисе",
    navFeatures: "Возможности",
    navHowItWorks: "Как это работает?",
    navFaq: "Вопросы",
    navBlog: "Блог",
    navContact: "Контакты",
    navDonate: "Донат",
    contactTooltip: "Связаться с разработчиком",
    themeToggleDark: "Перейти на тёмную тему",
    themeToggleLight: "Перейти на светлую тему",

    heroBadge: "✨ 100% Бесплатно, Быстро и Конфиденциально",
    heroTitlePre: "С кириллицы на ",
    heroTitleHighlight: "латиницу",
    heroTitlePost: " и наоборот",
    heroSubtitle: "Мгновенно переводите ваши тексты в нужную систему письменности.",

    uploaderTitle: "Загрузка документов",
    uploaderDropzone: "Выберите файл или перетащите его сюда (.txt, .docx · макс 5МБ)",
    uploaderProcessing: "Загрузка файла...",
    uploaderConverting: "Идет конвертация...",
    uploaderReady: "Готово",
    uploaderDownload: "Скачать результат",
    uploaderRemove: "Удалить файл",
    uploaderErrFormat: "Поддерживаются только файлы .txt или .docx",
    uploaderErrSize: "Размер файла не должен превышать 5МБ",
    uploaderErrEmpty: "Файл пуст или поврежден",
    uploaderErrUnknown: "Неизвестный формат файла",
    uploaderErrRead: "Ошибка при чтении файла",
    uploaderBadge: "DOCX & TXT",

    panelInputHeader: "Ввод текста",
    panelInputClear: "Очистить",
    panelInputPlaceholder: "Введите текст здесь...",
    panelOutputHeader: "Результат",
    panelOutputCopy: "Копировать",
    panelOutputCopied: "Скопировано!",
    panelOutputDownload: "Скачать",
    panelOutputPlaceholder: "Результат появится здесь...",
    panelCharCount: "знаков",
    panelWordCount: "слов",
    panelPasteShortcut: "Ctrl + V — вставить текст",
    panelPasteAction: "Вставить",
    panelAutoNotice: "Результат генерируется автоматически при вводе текста.",
    panelDownloadTxt: "Текстовый файл (.txt)",
    panelDownloadDocx: "Документ Word (.docx)",
    panelQuickClear: "Очистить",

    scriptCyrillic: "Кириллица",
    scriptLatinOld: "Старая латиница",
    scriptLatinNew: "Новая латиница",
    scriptAuto: "Автоопределение",
    scriptSwap: "Поменять",
    scriptOldBadge: "Oʻ, Gʻ, Sh, Ch",
    scriptNewBadge: "Ö, Ğ, Ş, Ç",
    scriptFromLabel: "Исходная:",
    scriptToLabel: "Целевая:",

    howItWorksEyebrow: "Инструкция",
    howItWorksTitle: "Как это работает?",
    howItWorksSubtitle: "Переводите узбекские тексты за три простых и понятных шага",
    step1Title: "Введите текст или загрузите файл",
    step1Desc: "Вставьте текст из буфера или загрузите файл Word (.docx) или .txt.",
    step2Title: "Выберите систему письменности",
    step2Desc: "Выберите Кириллицу, старую или новую Латиницу вручную или включите автоопределение.",
    step3Title: "Скопируйте или скачайте результат",
    step3Desc: "В один клик скопируйте текст или скачайте готовый документ в исходном формате.",

    featuresEyebrow: "Преимущества",
    featuresTitle: "Основные возможности",
    featuresSubtitle: "Kirilllotin.uz предлагает современные и удобные инструменты для работы с текстом",
    feat1Title: "Три системы письменности",
    feat1Desc: "Полная поддержка конвертации между Кириллицей, старой Латиницей (1995 г.) и новой Латиницей (проект 2021 г.) по всем 6 направлениям.",
    feat2Title: "Мгновенная скорость",
    feat2Desc: "Конвертация происходит на лету в режиме реального времени при вводе каждого символа.",
    feat3Title: "Умное автоопределение",
    feat3Desc: "Алгоритм автоматически распознает исходный алфавит текста и выбирает правильное направление перевода.",
    feat4Title: "Конвертация файлов Word",
    feat4Desc: "Перевод документов MS Word (.docx) и .txt с полным сохранением структуры, таблиц и стилей оформления.",
    feat5Title: "Копирование и выгрузка",
    feat5Desc: "Быстрое копирование в буфер обмена или экспорт текста в форматы .txt и .docx.",
    feat6Title: "100% Приватно и бесплатно",
    feat6Desc: "Все вычисления производятся исключительно в вашем браузере. Данные не передаются на сервер.",

    aboutEyebrow: "О проекте",
    aboutTitle: "Kirilllotin.uz — Платформа транслитерации",
    aboutDesc1: "Современный онлайн-инструмент для мгновенного перевода узбекских текстов между Кириллицей, старой и новой Латиницей. Все операции выполняются строго в браузере клиента.",
    aboutDesc2: "Полностью сохраняется форматирование, таблицы и структура файлов Microsoft Word (.docx).",
    featuresPrivacyEyebrow: "Приватность",
    featuresPrivacyTitle: "Текст не отправляется на сервер",
    featuresPrivacyDesc: "Конвертация выполняется на стороне клиента. Никакие данные не сохраняются.",
    featuresWordEyebrow: "Документы",
    featuresWordTitle: "Перевод файлов Word (.docx) со стилями",
    featuresWordDesc: "Загрузите файл MS Word (.docx), и конвертер сохранит все таблицы, цвета и стили текста.",
    featuresFootnote: "Бесплатно. Без регистрации. Без рекламы.",

    blogEyebrow: "Полезные статьи",
    blogTitle: "Статьи об узбекском языке и орфографии",
    blogSubtitle: "Правила правописания, различия алфавитов и руководства по работе с документами",
    blogViewAll: "Все статьи блога",
    blogReadTime: "мин. чтения",

    faqEyebrow: "Вопросы и ответы",
    faqTitle: "Часто задаваемые вопросы",
    faqSubtitle: "Ответы на популярные вопросы о работе платформы Kirilllotin.uz",
    faqQ1: "Как работает Kirilllotin.uz?",
    faqA1: "Платформа использует правила узбекской орфографии и транслитерации. Текст посимвольно анализируется с учетом сложных сочетаний (Ш, Ч, Ц, Е, Ё, Ю, Я) и апострофов.",
    faqQ2: "В чем разница между старой и новой латиницей?",
    faqA2: "Старая латиница принята в 1995 году и использует буквы с перевернутым апострофом (Oʻ, Gʻ) и диграфы (Sh, Ch). В новой версии 2021 года используются турецкие диакритические буквы (Ö, Ğ, Ş, Ç).",
    faqQ3: "Как перевести текст с кириллицы на латиницу?",
    faqA3: "Просто вставьте текст в левое поле. Сервис автоматически определит кириллицу и отобразит латинский результат справа.",
    faqQ4: "Можно ли конвертировать документы Word?",
    faqA4: "Да, поддерживаются файлы .docx. Сервис преобразует текст внутри документа, сохраняя шрифты, цвета и таблицы.",
    faqQ5: "Использование сервиса бесплатно?",
    faqA5: "Да, сервис полностью бесплатен. Вы можете поддержать проект через кнопку «Донат».",
    faqQ6: "Сохраняются ли мои тексты на сервере?",
    faqA6: "Нет. Конвертация выполняется полностью на вашем устройстве в браузере (через JavaScript).",
    faqQ7: "Удобно ли пользоваться на телефоне?",
    faqA7: "Да, интерфейс оптимизирован для смартфонов и планшетов: на малых экранах панели конвертера перестраиваются вертикально.",
    faqQ8: "Что делать, если обнаружена ошибка в слове?",
    faqA8: "Напишите разработчику в Telegram (@Shohruz_Isroilov), и мы оперативно внесем исправления.",

    seoAlphabetEyebrow: "Алфавит",
    seoAlphabetTitle: "Таблица букв Кириллицы и Латиницы",
    seoAlphabetDesc: "Полное соответствие всех букв узбекского алфавита с примерами использования.",
    seoThCyr: "Кириллица",
    seoThLat: "Латиница",
    seoThExCyr: "Пример (Кир.)",
    seoThExLat: "Пример (Лат.)",
    seoRulesEyebrow: "Правила",
    seoRulesTitle: "Правила узбекской письменности",
    seoHistoryEyebrow: "История",
    seoHistoryTitle: "История узбекской письменности",

    modalDonateTitle: "Поддержка проекта",
    modalDonateDesc: "Помогите проекту оставаться бесплатным и качественным, покрывая расходы на работу сервиса.",
    modalDonateCopy: "Скопировать",
    modalDonateCopied: "Скопировано!",
    modalDonateCopiedToast: "Номер карты скопирован",
    modalDonateHolder: "Шохруз Исроилов",
    modalDonateButton: "Скопировать номер карты",
    modalDonateCardLabel: "Карта Humo",
    modalDonateCardHolderLabel: "Владелец карты",
    modalContactTitle: "Контакты",
    modalContactDesc: "Для предложений по сайту или сотрудничества в сфере веб/мобильной разработки:",
    modalContactLink: "Написать в Telegram",
    modalContactItServices: "IT-услуги",
    modalContactItDesc: "Заказ веб-сайтов, мобильных приложений или других IT-решений",
    modalContactSuggest: "Вопрос или идея",
    modalContactSuggestDesc: "Нашли неточность или хотите предложить улучшение?",
    modalClose: "Закрыть",

    footerDesc: "Бесплатная платформа для моментальной транслитерации узбекских текстов между Кириллицей, старой и новой Латиницей.",
    footerNavTitle: "Разделы",
    footerScriptsTitle: "Письменности",
    footerToolsTitle: "Файлы и сервисы",
    footerContactTitle: "Контакты",
    footerPrivacyNote: "100% в браузере — данные не сохраняются на сервере.",
    footerAllRights: "Все права защищены.",

    toastNoTextToCopy: "Нет текста для копирования",
    toastCopied: "Текст скопирован в буфер",
    toastCopyError: "Ошибка при копировании",
    toastNoTextToDownload: "Нет текста для скачивания",
    toastCleared: "Текст очищен",
    toastUndo: "Отменить",
    toastFileLoaded: 'Файл "{name}" успешно загружен',
    toastFileLoadError: "Ошибка при загрузке файла",
    offlineToast: "Связь потеряна. Конвертер работает в офлайн-режиме.",
    onlineToast: "Интернет-соединение восстановлено.",
    pwaInstallTitle: "Установить приложение",
    pwaInstallDesc: "Установите конвертер на рабочий стол для быстрого доступа.",
    pwaInstallBtn: "Установить",
    pwaInstallDismiss: "Позже",
    pwaBadgeOffline: "Офлайн-режим",
  },

  "en": {
    metaTitle: "Uzbek Cyrillic to Latin Converter — Fast & Free Online Transliteration | kirillotin.uz",
    metaDesc: "Instant online transliteration between Uzbek Cyrillic, Traditional Latin (1995), and New Latin (2021). Convert raw text or Word (.docx) and .txt files with full style preservation.",
    logoSub: "kirillotin.uz",
    navAbout: "About",
    navFeatures: "Features",
    navHowItWorks: "How It Works",
    navFaq: "FAQ",
    navBlog: "Blog",
    navContact: "Contact",
    navDonate: "Donate",
    contactTooltip: "Contact developer",
    themeToggleDark: "Switch to dark mode",
    themeToggleLight: "Switch to light mode",

    heroBadge: "✨ 100% Free, Instant & Private Transliteration",
    heroTitlePre: "Convert Cyrillic to ",
    heroTitleHighlight: "Latin",
    heroTitlePost: " & vice versa",
    heroSubtitle: "Transform your text instantly between all Uzbek writing systems.",

    uploaderTitle: "Upload document",
    uploaderDropzone: "Select or drag & drop a file here (.txt, .docx · max 5MB)",
    uploaderProcessing: "Uploading file...",
    uploaderConverting: "Converting file...",
    uploaderReady: "Ready",
    uploaderDownload: "Download result",
    uploaderRemove: "Remove file",
    uploaderErrFormat: "Only .txt and .docx files are supported",
    uploaderErrSize: "File size must not exceed 5MB",
    uploaderErrEmpty: "File is empty or unreadable",
    uploaderErrUnknown: "Unknown file type",
    uploaderErrRead: "An error occurred while reading the file",
    uploaderBadge: "DOCX & TXT",

    panelInputHeader: "Input text",
    panelInputClear: "Clear",
    panelInputPlaceholder: "Type or paste your text here...",
    panelOutputHeader: "Result",
    panelOutputCopy: "Copy",
    panelOutputCopied: "Copied!",
    panelOutputDownload: "Download",
    panelOutputPlaceholder: "Conversion result appears here...",
    panelCharCount: "chars",
    panelWordCount: "words",
    panelPasteShortcut: "Ctrl + V — paste text",
    panelPasteAction: "Paste",
    panelAutoNotice: "Result is generated in real-time as you type.",
    panelDownloadTxt: "Text file (.txt)",
    panelDownloadDocx: "Word document (.docx)",
    panelQuickClear: "Clear",

    scriptCyrillic: "Cyrillic",
    scriptLatinOld: "Traditional Latin",
    scriptLatinNew: "New Latin",
    scriptAuto: "Auto detect",
    scriptSwap: "Swap",
    scriptOldBadge: "Oʻ, Gʻ, Sh, Ch",
    scriptNewBadge: "Ö, Ğ, Ş, Ç",
    scriptFromLabel: "Source script:",
    scriptToLabel: "Target script:",

    howItWorksEyebrow: "Guide",
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Transliterate your documents in three simple and intuitive steps",
    step1Title: "Enter text or upload a file",
    step1Desc: "Type directly, paste from clipboard, or drag & drop a Word (.docx) or .txt file.",
    step2Title: "Select writing systems",
    step2Desc: "Pick Cyrillic, Traditional Latin, or New Latin, or let auto-detect choose for you.",
    step3Title: "Copy or download results",
    step3Desc: "Copy your converted text with one click or download the formatted document.",

    featuresEyebrow: "Capabilities",
    featuresTitle: "Core Features",
    featuresSubtitle: "Built for speed, accuracy, and convenience across all Uzbek writing standards",
    feat1Title: "Three Writing Systems",
    feat1Desc: "Support for all 6 bidirectional conversions between Cyrillic, Traditional Latin (1995), and New Latin (2021).",
    feat2Title: "Instant Conversion",
    feat2Desc: "Real-time processing character by character without any server round-trips or latency.",
    feat3Title: "Intelligent Auto-detection",
    feat3Desc: "Smart algorithm detects the input script automatically and selects the appropriate target alphabet.",
    feat4Title: "Document Conversion",
    feat4Desc: "Convert MS Word (.docx) and .txt files while keeping all tables, styles, and formatting intact.",
    feat5Title: "Copy & Export",
    feat5Desc: "One-click clipboard copy and seamless download options for both text and Word documents.",
    feat6Title: "100% Private & Free",
    feat6Desc: "No signup, no tracking, and no ads. All operations run strictly inside your web browser.",

    aboutEyebrow: "About",
    aboutTitle: "Kirilllotin.uz — Uzbek Transliteration Platform",
    aboutDesc1: "A modern, high-performance platform created to convert Uzbek text across Cyrillic, Traditional Latin, and New Latin scripts.",
    aboutDesc2: "All conversions run client-side in your browser, maintaining full privacy and preserving Word (.docx) formatting.",
    featuresPrivacyEyebrow: "Privacy",
    featuresPrivacyTitle: "Your text never leaves your device",
    featuresPrivacyDesc: "All conversions run strictly in your web browser. Neither we nor third parties have access to your data.",
    featuresWordEyebrow: "Documents",
    featuresWordTitle: "Word (.docx) conversion with formatting",
    featuresWordDesc: "Upload your Word documents. The tool converts text while preserving fonts, tables, and colors.",
    featuresFootnote: "Free. No signup. No ads.",

    blogEyebrow: "Articles",
    blogTitle: "Uzbek Language & Orthography",
    blogSubtitle: "Guides on alphabet reforms, spelling rules, and document workflows",
    blogViewAll: "View all articles",
    blogReadTime: "min read",

    faqEyebrow: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about Kirilllotin.uz",
    faqQ1: "How does Kirilllotin.uz work?",
    faqA1: "The platform runs customized transliteration rules for the Uzbek language, properly mapping complex digraphs (Sh, Ch, Ts), vowels (E, Yo, Yu, Ya), and apostrophe marks.",
    faqQ2: "What is the difference between Traditional and New Latin?",
    faqA2: "Traditional Latin (1995) uses apostrophes (Oʻ, Gʻ) and digraphs (Sh, Ch). The New Latin reform (2021 proposal) adopts diacritics (Ö, Ğ, Ş, Ç) matching common Turkic alphabets.",
    faqQ3: "How do I convert text from Cyrillic to Latin?",
    faqA3: "Simply paste or type your Cyrillic text in the left panel. The tool detects it instantly and produces the Latin text on the right.",
    faqQ4: "Can I convert Word (.docx) documents?",
    faqA4: "Yes! Upload your .docx file. It converts the text while preserving table structures, colors, and styling.",
    faqQ5: "Is the service free?",
    faqA5: "Yes, it is completely free with no usage limits. You can support server maintenance through the Donate button.",
    faqQ6: "Is my text stored on the server?",
    faqA6: "No. All conversions happen entirely inside your browser using client-side JavaScript. No data is stored or transmitted.",
    faqQ7: "Does it work well on mobile devices?",
    faqA7: "Yes, the interface is fully responsive, shifting into an ergonomic vertical layout for single-handed mobile use.",
    faqQ8: "What if I find a conversion mistake?",
    faqA8: "Reach out to the developer via Telegram (@Shohruz_Isroilov) and we will gladly review and update the rules.",

    seoAlphabetEyebrow: "Alphabet",
    seoAlphabetTitle: "Cyrillic and Latin Mapping Table",
    seoAlphabetDesc: "Complete correspondence table between Uzbek Cyrillic and Latin characters with examples.",
    seoThCyr: "Cyrillic",
    seoThLat: "Latin",
    seoThExCyr: "Example (Cyr.)",
    seoThExLat: "Example (Lat.)",
    seoRulesEyebrow: "Rules",
    seoRulesTitle: "Spelling and Orthography Rules",
    seoHistoryEyebrow: "History",
    seoHistoryTitle: "History of the Uzbek Alphabet",

    modalDonateTitle: "Support the Project",
    modalDonateDesc: "Help keep this platform free, fast, and ad-free by contributing toward hosting expenses.",
    modalDonateCopy: "Copy",
    modalDonateCopied: "Copied!",
    modalDonateCopiedToast: "Card number copied",
    modalDonateHolder: "Shohruz Isroilov",
    modalDonateButton: "Copy card number",
    modalDonateCardLabel: "Humo card number",
    modalDonateCardHolderLabel: "Cardholder",
    modalContactTitle: "Contact",
    modalContactDesc: "For inquiries, suggestions, or software development collaboration:",
    modalContactLink: "Message on Telegram",
    modalContactItServices: "IT Services",
    modalContactItDesc: "Custom web development, mobile apps, or enterprise solutions",
    modalContactSuggest: "Feedback & Bug Reports",
    modalContactSuggestDesc: "Found an issue or want to suggest a new feature?",
    modalClose: "Close",

    footerDesc: "A modern, free transliteration platform converting text seamlessly between Uzbek Cyrillic, Traditional Latin, and New Latin scripts.",
    footerNavTitle: "Navigation",
    footerScriptsTitle: "Writing Systems",
    footerToolsTitle: "Files & Tools",
    footerContactTitle: "Connect",
    footerPrivacyNote: "100% client-side — your texts never touch a server.",
    footerAllRights: "All rights reserved.",

    toastNoTextToCopy: "No text to copy",
    toastCopied: "Copied to clipboard",
    toastCopyError: "Failed to copy text",
    toastNoTextToDownload: "No text to download",
    toastCleared: "Text cleared",
    toastUndo: "Undo",
    toastFileLoaded: '"{name}" loaded successfully',
    toastFileLoadError: "Error loading file",
    offlineToast: "Internet connection lost. Converter running in offline mode.",
    onlineToast: "Internet connection restored.",
    pwaInstallTitle: "Install Application",
    pwaInstallDesc: "Install Cyrillic ↔ Latin Converter for fast offline use.",
    pwaInstallBtn: "Install App",
    pwaInstallDismiss: "Later",
    pwaBadgeOffline: "Offline mode",
  },
};

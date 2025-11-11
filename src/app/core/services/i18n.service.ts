import { Injectable, signal, effect, inject } from '@angular/core';

export type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly languageSignal = signal<Language>(this.getInitialLanguage());
  public readonly language = this.languageSignal.asReadonly();

  private readonly translations: Translations = {
    'app.name': { en: 'Manisik Umrah Booking', ar: 'مناسك الحج والعمرة' },
    'nav.home': { en: 'Home', ar: 'الرئيسية' },
    'nav.hotels': { en: 'Hotels', ar: 'الفنادق' },
    'nav.transport': { en: 'Transport', ar: 'النقل' },
    'nav.bookings': { en: 'My Bookings', ar: 'حجوزاتي' },
    'nav.users': { en: 'Users', ar: 'المستخدمون' },
    'nav.login': { en: 'Login', ar: 'تسجيل الدخول' },
    'nav.logout': { en: 'Logout', ar: 'تسجيل الخروج' },
    'auth.login': { en: 'Login', ar: 'تسجيل الدخول' },
    'auth.register': { en: 'Register', ar: 'إنشاء حساب' },
    'auth.email': { en: 'Email', ar: 'البريد الإلكتروني' },
    'auth.password': { en: 'Password', ar: 'كلمة المرور' },
    'auth.firstName': { en: 'First Name', ar: 'الاسم الأول' },
    'auth.lastName': { en: 'Last Name', ar: 'اسم العائلة' },
    'auth.phone': { en: 'Phone', ar: 'الهاتف' },
    'common.loading': { en: 'Loading...', ar: 'جاري التحميل...' },
    'common.save': { en: 'Save', ar: 'حفظ' },
    'common.cancel': { en: 'Cancel', ar: 'إلغاء' },
    'common.delete': { en: 'Delete', ar: 'حذف' },
    'common.edit': { en: 'Edit', ar: 'تعديل' },
    'common.search': { en: 'Search', ar: 'بحث' },
    'common.filter': { en: 'Filter', ar: 'تصفية' },
    'common.apply': { en: 'Apply', ar: 'تطبيق' },
    'common.reset': { en: 'Reset', ar: 'إعادة تعيين' }
  };

  constructor() {
    effect(() => {
      const lang = this.languageSignal();
      this.applyLanguage(lang);
      this.saveLanguage(lang);
    });

    // Apply initial language
    this.applyLanguage(this.languageSignal());
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      return key;
    }
    return translation[this.languageSignal()] || translation.en;
  }

  setLanguage(language: Language): void {
    this.languageSignal.set(language);
  }

  toggleLanguage(): void {
    this.languageSignal.update(current => current === 'en' ? 'ar' : 'en');
  }

  isRTL(): boolean {
    return this.languageSignal() === 'ar';
  }

  private getInitialLanguage(): Language {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && (saved === 'en' || saved === 'ar')) {
      return saved;
    }
    return 'en';
  }

  private applyLanguage(language: Language): void {
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }

  private saveLanguage(language: Language): void {
    localStorage.setItem('language', language);
  }
}


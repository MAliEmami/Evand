import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, Cookie, UserCheck } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "اطلاعاتی که جمع‌آوری می‌کنیم",
      items: [
        "اطلاعات حساب: نام، ایمیل و رمز عبور هنگام ثبت‌نام",
        "اطلاعات پروفایل: تصویر، بیوگرافی و اطلاعات تماس اختیاری",
        "اطلاعات رویداد: جزئیات رویدادهایی که ایجاد یا شرکت می‌کنید",
        "اطلاعات فنی: آدرس IP، نوع مرورگر و دستگاه",
      ],
    },
    {
      icon: Eye,
      title: "نحوه استفاده از اطلاعات",
      items: [
        "ارائه و بهبود سرویس‌های ایونته‌من",
        "ارسال اطلاع‌رسانی‌های مرتبط با رویدادها",
        "پشتیبانی و پاسخ به سوالات شما",
        "تحلیل و بهبود تجربه کاربری",
      ],
    },
    {
      icon: Lock,
      title: "حفاظت از اطلاعات",
      items: [
        "رمزنگاری داده‌ها در انتقال و ذخیره‌سازی",
        "دسترسی محدود کارکنان به اطلاعات حساس",
        "بررسی‌های امنیتی منظم",
        "سیاست‌های سخت‌گیرانه دسترسی",
      ],
    },
    {
      icon: UserCheck,
      title: "حقوق شما",
      items: [
        "دسترسی به اطلاعات شخصی خود",
        "اصلاح یا حذف اطلاعات",
        "انصراف از دریافت ایمیل‌های تبلیغاتی",
        "درخواست کپی از داده‌های خود",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            حریم <span className="text-gradient">خصوصی</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            حفاظت از اطلاعات شما برای ما اولویت دارد
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Cookie Policy */}
          <div className="mt-12 bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary-foreground" />
              </div>
              سیاست کوکی‌ها
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ما از کوکی‌ها برای بهبود تجربه شما استفاده می‌کنیم. کوکی‌ها فایل‌های کوچکی هستند که در مرورگر شما ذخیره می‌شوند.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-2">کوکی‌های ضروری</h4>
                <p className="text-sm text-muted-foreground">برای عملکرد صحیح سایت لازم هستند</p>
              </div>
              <div className="bg-muted rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-2">کوکی‌های تحلیلی</h4>
                <p className="text-sm text-muted-foreground">برای درک نحوه استفاده از سایت</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-muted-foreground">
            <p>آخرین بروزرسانی: دی ۱۴۰۳</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;

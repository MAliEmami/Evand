import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, Search, Calendar, Users, CreditCard, Settings, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { icon: Calendar, title: "ایجاد رویداد", count: 8 },
    { icon: Users, title: "شرکت در رویداد", count: 6 },
    { icon: CreditCard, title: "پرداخت و بلیط", count: 5 },
    { icon: Settings, title: "تنظیمات حساب", count: 7 },
  ];

  const faqs = [
    {
      question: "چگونه یک رویداد جدید ایجاد کنم؟",
      answer: "برای ایجاد رویداد، وارد حساب کاربری خود شوید، روی دکمه «ایجاد رویداد» کلیک کنید و اطلاعات رویداد را تکمیل کنید. می‌توانید تصاویر، توضیحات و جزئیات بلیط را اضافه کنید.",
    },
    {
      question: "آیا می‌توانم رویداد خود را ویرایش کنم؟",
      answer: "بله، تا زمانی که رویداد شروع نشده، می‌توانید از طریق پروفایل خود به بخش «رویدادهای من» رفته و رویداد را ویرایش کنید.",
    },
    {
      question: "چگونه بلیط رویداد را خریداری کنم؟",
      answer: "وارد صفحه رویداد مورد نظر شوید، تعداد بلیط را انتخاب کرده و روی «ثبت‌نام» کلیک کنید. در صورت نیاز به پرداخت، به درگاه پرداخت هدایت می‌شوید.",
    },
    {
      question: "آیا امکان استرداد بلیط وجود دارد؟",
      answer: "شرایط استرداد بستگی به سیاست برگزارکننده رویداد دارد. برخی رویدادها امکان استرداد تا ۴۸ ساعت قبل را دارند. جزئیات را در صفحه رویداد بررسی کنید.",
    },
    {
      question: "چگونه رمز عبور خود را تغییر دهم؟",
      answer: "به تنظیمات حساب کاربری بروید، بخش «امنیت» را انتخاب کنید و روی «تغییر رمز عبور» کلیک کنید. رمز فعلی و رمز جدید را وارد کنید.",
    },
    {
      question: "چگونه با پشتیبانی تماس بگیرم؟",
      answer: "می‌توانید از طریق صفحه «تماس با ما» با تیم پشتیبانی در ارتباط باشید. همچنین ایمیل support@eventeman.com در دسترس است.",
    },
  ];

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.includes(searchQuery) ||
      faq.answer.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            مرکز <span className="text-gradient">راهنما</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            پاسخ سوالات خود را پیدا کنید
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="جستجو در سوالات..."
              className="pr-12 h-14 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-3">
                  <cat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} مقاله</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            سوالات متداول
          </h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full p-6 flex items-center justify-between text-right"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">نتیجه‌ای یافت نشد</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground text-center">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">پاسخ خود را پیدا نکردید؟</h3>
            <p className="text-primary-foreground/80 mb-6">
              تیم پشتیبانی ما آماده کمک به شماست
            </p>
            <Button variant="secondary" size="lg" asChild>
              <a href="/contact">تماس با پشتیبانی</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Help;

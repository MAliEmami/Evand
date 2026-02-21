import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard, Check, Zap, Crown, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "رایگان",
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      description: "برای شروع و رویدادهای کوچک",
      features: [
        "تا ۳ رویداد در ماه",
        "حداکثر ۵۰ شرکت‌کننده",
        "صفحه رویداد اختصاصی",
        "پشتیبانی ایمیلی",
        "گزارش‌های پایه",
      ],
      cta: "شروع رایگان",
      popular: false,
    },
    {
      name: "حرفه‌ای",
      icon: Crown,
      price: { monthly: 299000, yearly: 2990000 },
      description: "برای برگزارکنندگان جدی",
      features: [
        "رویدادهای نامحدود",
        "شرکت‌کنندگان نامحدود",
        "سفارشی‌سازی کامل صفحه",
        "پشتیبانی ۲۴/۷",
        "گزارش‌های پیشرفته",
        "یکپارچه‌سازی با درگاه پرداخت",
        "ارسال ایمیل و پیامک",
        "بدون لوگوی ایونته‌من",
      ],
      cta: "شروع دوره آزمایشی",
      popular: true,
    },
    {
      name: "سازمانی",
      icon: Building,
      price: { monthly: 0, yearly: 0 },
      description: "برای شرکت‌ها و سازمان‌های بزرگ",
      features: [
        "همه امکانات حرفه‌ای",
        "API اختصاصی",
        "مدیر حساب اختصاصی",
        "SLA تضمین شده",
        "آموزش تیم",
        "قرارداد سفارشی",
        "استقرار اختصاصی",
      ],
      cta: "تماس با فروش",
      popular: false,
      custom: true,
    },
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return "رایگان";
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            پلن‌های <span className="text-gradient">قیمت‌گذاری</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            پلن مناسب خود را انتخاب کنید و همین امروز شروع کنید
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              ماهانه
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              سالانه
              <span className="mr-2 px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded-full">
                ۲ ماه رایگان
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-card border rounded-2xl p-8 ${
                  plan.popular
                    ? "border-primary shadow-xl scale-105"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-hero text-primary-foreground text-sm font-medium rounded-full">
                    محبوب‌ترین
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-4">
                  <plan.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  {plan.custom ? (
                    <span className="text-3xl font-bold text-foreground">تماس بگیرید</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-foreground">
                        {formatPrice(isYearly ? plan.price.yearly : plan.price.monthly)}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-muted-foreground text-sm mr-1">
                          /{isYearly ? "سال" : "ماه"}
                        </span>
                      )}
                    </>
                  )}
                </div>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full mb-8"
                  size="lg"
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">سوالی دارید؟</h2>
          <p className="text-muted-foreground mb-8">
            می‌توانید از صفحه راهنما پاسخ سوالات خود را پیدا کنید یا با تیم پشتیبانی تماس بگیرید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
              <a href="/help">مرکز راهنما</a>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <a href="/contact">تماس با ما</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;

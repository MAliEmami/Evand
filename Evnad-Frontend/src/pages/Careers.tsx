import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, MapPin, Clock, ArrowLeft, Heart, Zap, Users, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const benefits = [
    { icon: Heart, title: "بیمه تکمیلی", desc: "پوشش کامل بیمه برای شما و خانواده" },
    { icon: Coffee, title: "محیط کار انعطاف‌پذیر", desc: "امکان دورکاری و ساعات کاری شناور" },
    { icon: Zap, title: "رشد سریع", desc: "فرصت‌های یادگیری و پیشرفت شغلی" },
    { icon: Users, title: "تیم فوق‌العاده", desc: "کار با افراد باانگیزه و متخصص" },
  ];

  const jobs = [
    {
      id: 1,
      title: "توسعه‌دهنده فرانت‌اند ارشد",
      department: "فنی",
      location: "تهران - دورکاری",
      type: "تمام وقت",
      description: "به دنبال یک توسعه‌دهنده React با تجربه برای پیوستن به تیم فنی هستیم.",
    },
    {
      id: 2,
      title: "طراح محصول (UI/UX)",
      department: "طراحی",
      location: "تهران",
      type: "تمام وقت",
      description: "طراحی تجربه کاربری برای محصولات ایونته‌من و بهبود مستمر رابط کاربری.",
    },
    {
      id: 3,
      title: "مدیر بازاریابی دیجیتال",
      department: "بازاریابی",
      location: "تهران",
      type: "تمام وقت",
      description: "مدیریت کمپین‌های بازاریابی و افزایش آگاهی از برند ایونته‌من.",
    },
    {
      id: 4,
      title: "کارشناس پشتیبانی مشتریان",
      department: "پشتیبانی",
      location: "تهران - دورکاری",
      type: "تمام وقت",
      description: "پاسخگویی به سوالات کاربران و کمک به حل مشکلات آن‌ها.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            فرصت‌های <span className="text-gradient">شغلی</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            به تیم ایونته‌من بپیوندید و در شکل‌دهی آینده رویدادها سهیم باشید
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            چرا ایونته‌من؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            موقعیت‌های شغلی فعال
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <Button variant="hero" className="gap-2 whitespace-nowrap">
                    ارسال رزومه
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground text-center">
            <h3 className="text-2xl font-bold mb-4">موقعیت مورد نظرتان را پیدا نکردید؟</h3>
            <p className="text-primary-foreground/80 mb-6">
              رزومه خود را برای ما بفرستید تا در فرصت‌های آینده با شما تماس بگیریم
            </p>
            <Button variant="secondary" size="lg">
              ارسال رزومه عمومی
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;

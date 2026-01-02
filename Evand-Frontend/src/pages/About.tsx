import { Calendar, Users, Target, Award, Heart, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const teamMembers = [
    { name: "علی احمدی", role: "مدیرعامل", avatar: "A" },
    { name: "مریم محمدی", role: "مدیر فنی", avatar: "M" },
    { name: "رضا کریمی", role: "طراح ارشد", avatar: "R" },
    { name: "سارا حسینی", role: "مدیر بازاریابی", avatar: "S" },
  ];

  const values = [
    { icon: Heart, title: "مشتری‌مداری", desc: "رضایت شما اولویت اول ماست" },
    { icon: Zap, title: "نوآوری", desc: "همیشه به دنبال راه‌حل‌های جدید و خلاقانه هستیم" },
    { icon: Target, title: "کیفیت", desc: "تعهد به ارائه بهترین تجربه ممکن" },
    { icon: Award, title: "شفافیت", desc: "صداقت و شفافیت در همه تعاملات ما" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            درباره <span className="text-gradient">ایونته‌من</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            داستان ما، ماموریت ما و چشم‌انداز آینده
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">داستان ما</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ایونته‌من در سال ۱۴۰۲ با هدف ساده‌سازی برگزاری رویدادها در ایران راه‌اندازی شد. ما باور داریم که هر رویداد، فرصتی برای ایجاد ارتباطات معنادار و خاطرات ماندگار است.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  تیم ما متشکل از افراد خلاق و پرانرژی است که عاشق ایجاد تجربه‌های فوق‌العاده هستند. از روز اول، تمرکز ما بر ارائه ابزارهای ساده و قدرتمند برای برگزارکنندگان رویداد بوده است.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
                <h3 className="text-2xl font-bold mb-6">ماموریت ما</h3>
                <p className="text-primary-foreground/90 leading-relaxed mb-6">
                  ماموریت ما ایجاد پلتفرمی ساده، قدرتمند و در دسترس برای همه است تا بتوانند رویدادهای حرفه‌ای برگزار کنند. از کنفرانس‌های بزرگ تا جشن‌های کوچک، ما ابزارهای لازم را در اختیار شما قرار می‌دهیم.
                </p>
                <h3 className="text-2xl font-bold mb-4">چشم‌انداز</h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  ما می‌خواهیم ایونته‌من به اولین انتخاب برگزارکنندگان رویداد در خاورمیانه تبدیل شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "۱۰,۰۰۰+", label: "کاربر فعال" },
              { number: "۵,۰۰۰+", label: "رویداد برگزار شده" },
              { number: "۹۸٪", label: "رضایت کاربران" },
              { number: "۲۴/۷", label: "پشتیبانی" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">ارزش‌های ما</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              این اصول راهنمای ما در همه تصمیمات و اقدامات هستند
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              <Users className="inline-block w-8 h-8 ml-2" />
              تیم ما
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              افراد پشت ایونته‌من که هر روز برای بهتر شدن تلاش می‌کنند
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

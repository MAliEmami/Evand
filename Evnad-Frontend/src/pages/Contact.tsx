import { Mail, Phone, MapPin, Clock, Send, Instagram, Twitter, Linkedin, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "شماره تماس",
      value: "۰۲۱-۱۲۳۴۵۶۷۸",
      subValue: "۰۹۱۲-۱۲۳-۴۵۶۷",
    },
    {
      icon: Mail,
      title: "ایمیل",
      value: "info@eventeman.com",
      subValue: "support@eventeman.com",
    },
    {
      icon: MapPin,
      title: "آدرس",
      value: "تهران، خیابان ولیعصر",
      subValue: "پلاک ۱۲۳، طبقه ۵",
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      value: "شنبه تا پنج‌شنبه",
      subValue: "۹ صبح تا ۶ عصر",
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "اینستاگرام", color: "hover:bg-pink-500" },
    { icon: Twitter, href: "#", label: "توییتر", color: "hover:bg-blue-400" },
    { icon: Linkedin, href: "#", label: "لینکدین", color: "hover:bg-blue-600" },
    { icon: MessageCircle, href: "#", label: "تلگرام", color: "hover:bg-sky-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            تماس با <span className="text-gradient">ما</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ما همیشه آماده پاسخگویی به سوالات شما هستیم. از هر طریقی که راحت‌ترید با ما در ارتباط باشید.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.value}</p>
                <p className="text-muted-foreground text-sm">{item.subValue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                ارسال پیام
              </h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">نام و نام خانوادگی</Label>
                    <Input id="name" placeholder="علی محمدی" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">موضوع</Label>
                  <Input id="subject" placeholder="موضوع پیام خود را بنویسید" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">پیام</Label>
                  <Textarea
                    id="message"
                    placeholder="پیام خود را بنویسید..."
                    className="min-h-[150px] resize-none"
                  />
                </div>
                <Button variant="hero" size="lg" className="w-full gap-2">
                  ارسال پیام
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Social Links & Extra Info */}
            <div className="space-y-8">
              {/* Social Media */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  ما را در شبکه‌های اجتماعی دنبال کنید
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`flex items-center gap-3 p-4 bg-muted rounded-xl ${social.color} hover:text-white transition-all duration-300`}
                    >
                      <social.icon className="w-6 h-6" />
                      <span className="font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
                <h2 className="text-2xl font-bold mb-4">
                  نیاز به کمک فوری دارید؟
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  تیم پشتیبانی ما آماده پاسخگویی به سوالات شما در کوتاه‌ترین زمان است.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:02112345678"
                    className="flex items-center justify-center gap-2 bg-background/20 backdrop-blur-sm rounded-xl px-6 py-3 hover:bg-background/30 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    تماس تلفنی
                  </a>
                  <a
                    href="mailto:support@eventeman.com"
                    className="flex items-center justify-center gap-2 bg-background/20 backdrop-blur-sm rounded-xl px-6 py-3 hover:bg-background/30 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    ایمیل پشتیبانی
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Contact;

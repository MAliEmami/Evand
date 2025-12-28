import { Link } from "react-router-dom";
import { Calendar, Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "ویژگی‌ها", path: "/" },
      { label: "مرور رویدادها", path: "/events" },
      { label: "ایجاد رویداد", path: "/create-event" },
      { label: "قیمت‌گذاری", path: "/pricing" },
    ],
    company: [
      { label: "درباره ما", path: "/about" },
      { label: "فرصت‌های شغلی", path: "/careers" },
      { label: "وبلاگ", path: "/blog" },
      { label: "تماس با ما", path: "/contact" },
    ],
    support: [
      { label: "مرکز راهنما", path: "/help" },
      { label: "شرایط استفاده", path: "/terms" },
      { label: "حریم خصوصی", path: "/privacy" },
      { label: "سیاست کوکی‌ها", path: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "توییتر" },
    { icon: Instagram, href: "#", label: "اینستاگرام" },
    { icon: Linkedin, href: "#", label: "لینکدین" },
    { icon: Github, href: "#", label: "گیت‌هاب" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                ایونته<span className="text-gradient">‌من</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              رویدادهای فراموش‌نشدنی بسازید و با افراد همفکر ارتباط برقرار کنید. سفر شما به تجربه‌های شگفت‌انگیز از اینجا شروع می‌شود.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">محصول</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">شرکت</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">پشتیبانی</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} ایونته‌من. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>hello@eventeman.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
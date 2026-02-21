import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Users, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral/5 via-background to-amber/5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-coral/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>دروازه شما به تجربه‌های شگفت‌انگیز</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 animate-slide-up">
            ایجاد، کشف و{" "}
            <span className="text-gradient">شرکت در رویدادها</span>{" "}
            که اهمیت دارند
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            چه در حال برگزاری کارگاه، کنفرانس یا گردهمایی باشید، ایونته‌من ارتباط با افرادی که علایق مشترک دارند را آسان می‌کند.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/create-event">
              <Button variant="hero" size="xl" className="gap-2 group">
                ایجاد رویداد شما
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="xl" className="gap-2">
                مشاهده رویدادها
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-coral/10 mx-auto mb-3">
                <Calendar className="w-6 h-6 text-coral" />
              </div>
              <p className="text-2xl font-bold text-foreground">+۵۰۰</p>
              <p className="text-sm text-muted-foreground">رویداد</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal/10 mx-auto mb-3">
                <Users className="w-6 h-6 text-teal" />
              </div>
              <p className="text-2xl font-bold text-foreground">+۱۰ هزار</p>
              <p className="text-sm text-muted-foreground">عضو</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber/10 mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-amber" />
              </div>
              <p className="text-2xl font-bold text-foreground">+۵۰</p>
              <p className="text-sm text-muted-foreground">شهر</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-background/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-background/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            آماده ایجاد رویداد فراموش‌نشدنی بعدی خود هستید؟
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            به هزاران برگزارکننده بپیوندید که به ایونته‌من اعتماد می‌کنند تا ایده‌هایشان را زنده کنند. همین امروز شروع به ساختن تجربه‌های شگفت‌انگیز کنید.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button 
                size="xl" 
                className="bg-background text-foreground hover:bg-background/90 gap-2 group"
              >
                شروع رایگان
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/events">
              <Button 
                variant="outline" 
                size="xl" 
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
              >
                مرور رویدادها
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
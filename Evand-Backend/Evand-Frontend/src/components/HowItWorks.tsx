import { CalendarPlus, Users, Ticket, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: CalendarPlus,
      title: "ایجاد یا پیدا کردن",
      description: "رویداد خود را ایجاد کنید یا صدها رویداد هیجان‌انگیز در نزدیکی خود را مرور کنید.",
      color: "coral",
    },
    {
      icon: Users,
      title: "ارتباط",
      description: "به جوامع افراد همفکر بپیوندید و ارتباطات پایدار از طریق تجربه‌های مشترک بسازید.",
      color: "teal",
    },
    {
      icon: Ticket,
      title: "شرکت",
      description: "بلیط‌های خود را فوراً دریافت کنید و با بلیط‌های دیجیتال ما به رویداد دسترسی یکپارچه داشته باشید.",
      color: "amber",
    },
    {
      icon: Star,
      title: "تجربه",
      description: "خاطرات بسازید، بازخورد به اشتراک بگذارید و بخشی از رویدادهایی شوید که واقعاً برایتان اهمیت دارند.",
      color: "coral",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "coral":
        return "bg-coral/10 text-coral";
      case "teal":
        return "bg-teal/10 text-teal";
      case "amber":
        return "bg-amber/10 text-amber";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            نحوه کار
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            سفر رویداد شما ساده شده است
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            از کشف تا حضور، ما هر مرحله را ساده کرده‌ایم تا بهترین تجربه ممکن را داشته باشید.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[-40%] w-full h-0.5 bg-border" />
              )}

              <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative z-10">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${getColorClasses(step.color)} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
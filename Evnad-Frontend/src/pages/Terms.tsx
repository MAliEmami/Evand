import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, CheckCircle, AlertCircle, Shield } from "lucide-react";

const Terms = () => {
  const sections = [
    {
      title: "پذیرش شرایط",
      content: "با استفاده از سرویس ایونته‌من، شما موافقت خود را با این شرایط و ضوابط اعلام می‌کنید. اگر با هر بخشی از این شرایط موافق نیستید، لطفاً از استفاده از سرویس خودداری کنید.",
    },
    {
      title: "تعریف سرویس",
      content: "ایونته‌من یک پلتفرم آنلاین برای ایجاد، مدیریت و شرکت در رویدادهاست. ما ابزارهایی برای برگزارکنندگان و شرکت‌کنندگان رویداد فراهم می‌کنیم تا تجربه بهتری داشته باشند.",
    },
    {
      title: "حساب کاربری",
      content: "شما مسئول حفظ امنیت حساب کاربری و رمز عبور خود هستید. هرگونه فعالیت انجام شده از طریق حساب شما، مسئولیتش با شماست. در صورت مشاهده استفاده غیرمجاز، فوراً به ما اطلاع دهید.",
    },
    {
      title: "محتوای کاربران",
      content: "کاربران مسئول محتوایی هستند که در پلتفرم منتشر می‌کنند. محتوای غیرقانونی، توهین‌آمیز یا نقض‌کننده حقوق دیگران ممنوع است و ما حق حذف چنین محتوایی را داریم.",
    },
    {
      title: "مالکیت معنوی",
      content: "تمامی محتوا، طراحی، لوگو و نرم‌افزار ایونته‌من تحت حمایت قوانین مالکیت معنوی است. استفاده غیرمجاز از این موارد ممنوع است.",
    },
    {
      title: "محدودیت مسئولیت",
      content: "ایونته‌من در قبال خسارات ناشی از استفاده یا عدم امکان استفاده از سرویس، از دست رفتن داده‌ها یا هرگونه خسارت غیرمستقیم مسئولیتی ندارد.",
    },
    {
      title: "تغییرات در شرایط",
      content: "ما حق تغییر این شرایط را در هر زمان داریم. تغییرات از زمان انتشار در سایت قابل اجرا خواهند بود. استفاده مداوم از سرویس به معنای پذیرش شرایط جدید است.",
    },
    {
      title: "قانون حاکم",
      content: "این شرایط تحت قوانین جمهوری اسلامی ایران تفسیر و اجرا می‌شوند. هرگونه اختلاف از طریق مراجع قضایی ذیصلاح حل و فصل خواهد شد.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            شرایط <span className="text-gradient">استفاده</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            آخرین بروزرسانی: دی ۱۴۰۳
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-hero rounded-2xl p-8 text-primary-foreground text-center">
            <Shield className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">سوالی دارید؟</h3>
            <p className="text-primary-foreground/80">
              در صورت داشتن هرگونه سوال درباره شرایط استفاده، با ما تماس بگیرید.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;

import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "۱۰ نکته برای برگزاری یک رویداد موفق",
      excerpt: "در این مقاله، مهم‌ترین نکاتی که باید برای برگزاری یک رویداد حرفه‌ای بدانید را بررسی می‌کنیم.",
      category: "راهنما",
      date: "۱۵ دی ۱۴۰۳",
      readTime: "۵ دقیقه",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
    },
    {
      id: 2,
      title: "چگونه مخاطبان بیشتری جذب کنیم؟",
      excerpt: "استراتژی‌های بازاریابی دیجیتال برای افزایش تعداد شرکت‌کنندگان رویداد شما.",
      category: "بازاریابی",
      date: "۱۰ دی ۱۴۰۳",
      readTime: "۷ دقیقه",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600",
    },
    {
      id: 3,
      title: "آینده رویدادهای آنلاین در ایران",
      excerpt: "نگاهی به روند رشد رویدادهای مجازی و ترکیبی در سال‌های اخیر.",
      category: "تحلیل",
      date: "۵ دی ۱۴۰۳",
      readTime: "۶ دقیقه",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600",
    },
    {
      id: 4,
      title: "مدیریت بودجه رویداد: راهنمای کامل",
      excerpt: "چگونه بودجه رویداد خود را به درستی برنامه‌ریزی و مدیریت کنید.",
      category: "مدیریت",
      date: "۱ دی ۱۴۰۳",
      readTime: "۸ دقیقه",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600",
    },
    {
      id: 5,
      title: "بهترین مکان‌ها برای برگزاری رویداد در تهران",
      excerpt: "معرفی ۱۰ مکان برتر برای برگزاری کنفرانس، سمینار و رویدادهای شرکتی.",
      category: "راهنما",
      date: "۲۵ آذر ۱۴۰۳",
      readTime: "۱۰ دقیقه",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
    },
    {
      id: 6,
      title: "تکنولوژی‌های نوین در صنعت رویداد",
      excerpt: "از واقعیت مجازی تا هوش مصنوعی: ابزارهایی که آینده رویدادها را شکل می‌دهند.",
      category: "تکنولوژی",
      date: "۲۰ آذر ۱۴۰۳",
      readTime: "۶ دقیقه",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    },
  ];

  const categories = ["همه", "راهنما", "بازاریابی", "تحلیل", "مدیریت", "تکنولوژی"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            وبلاگ <span className="text-gradient">ایونته‌من</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مقالات، نکات و اخبار دنیای رویدادها
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      ادامه مطلب
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              مشاهده مقالات بیشتر
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

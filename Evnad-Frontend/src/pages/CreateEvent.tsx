import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, MapPin, Users, Image, Tag, FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    address: "",
    category: "",
    maxAttendees: "",
    price: "",
    imageUrl: "",
  });

  const categories = [
    "فناوری",
    "کارگاه",
    "شبکه‌سازی",
    "موسیقی",
    "سلامت",
    "غذا و نوشیدنی",
    "ورزش",
    "هنر",
    "آموزش",
    "کسب‌وکار",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "رویداد ایجاد شد!",
        description: "رویداد شما با موفقیت منتشر شد.",
      });
      navigate("/events");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              چیز شگفت‌انگیزی بسازید
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              ایجاد رویداد
            </h1>
            <p className="text-lg text-muted-foreground">
              جزئیات زیر را پر کنید تا رویداد خود را ایجاد و منتشر کنید
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                اطلاعات پایه
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان رویداد</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="عنوان جذابی برای رویداد خود بنویسید"
                    value={formData.title}
                    onChange={handleChange}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="به مردم بگویید رویداد شما درباره چیست..."
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[150px] resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">دسته‌بندی</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="h-12">
                        <Tag className="w-4 h-4 ml-2 text-muted-foreground" />
                        <SelectValue placeholder="انتخاب دسته‌بندی" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">حداکثر شرکت‌کنندگان</Label>
                    <div className="relative">
                      <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="maxAttendees"
                        name="maxAttendees"
                        type="number"
                        placeholder="مثلاً ۱۰۰"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        className="pr-11 h-12"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                تاریخ و زمان
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">تاریخ</Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="pr-11 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">زمان</Label>
                  <div className="relative">
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="pr-11 h-12"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                مکان
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">نام محل برگزاری</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="مثلاً مرکز همایش‌ها"
                      value={formData.location}
                      onChange={handleChange}
                      className="pr-11 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">آدرس کامل</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="خیابان، شهر، استان"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-12"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Media & Pricing */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                رسانه و قیمت‌گذاری
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">لینک تصویر کاور</Label>
                  <div className="relative">
                    <Image className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className="pr-11 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">قیمت بلیط</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="رایگان یا قیمت وارد کنید (مثلاً ۵۰,۰۰۰ تومان)"
                    value={formData.price}
                    onChange={handleChange}
                    className="h-12"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => navigate("/events")}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="flex-1 gap-2"
                disabled={loading}
              >
                {loading ? "در حال ایجاد..." : "انتشار رویداد"}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateEvent;
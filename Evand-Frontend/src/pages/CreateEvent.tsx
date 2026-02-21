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
import { eventApi } from "@/services/api";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    address: "",
    category: "",
    capacity: "",
    price: "",
    photo: "",
    x: "",
    y: "",
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

    try {
      const startDateTime = `${formData.startDate}T${formData.startTime || "00:00"}:00`;
      const endDateTime = `${formData.endDate}T${formData.endTime || "23:59"}:00`;

      await eventApi.addEvent({
        name: formData.name,
        category: formData.category,
        x: formData.x ? parseFloat(formData.x) : null,
        y: formData.y ? parseFloat(formData.y) : null,
        price: parseFloat(formData.price) || 0,
        photo: formData.photo || null,
        address: formData.address,
        startDate: startDateTime,
        endDate: endDateTime,
        capacity: parseInt(formData.capacity) || 0,
      });

      toast({
        title: "رویداد ایجاد شد!",
        description: "رویداد شما با موفقیت منتشر شد.",
      });
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد رویداد پیش آمد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                  <Label htmlFor="name">نام رویداد</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="نام جذابی برای رویداد خود بنویسید"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12"
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
                    <Label htmlFor="capacity">ظرفیت</Label>
                    <div className="relative">
                      <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        placeholder="مثلاً ۱۰۰"
                        value={formData.capacity}
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
                  <Label htmlFor="startDate">تاریخ شروع</Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="pr-11 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">ساعت شروع</Label>
                  <div className="relative">
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="pr-11 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">تاریخ پایان</Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="pr-11 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">ساعت پایان</Label>
                  <div className="relative">
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
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
                  <Label htmlFor="address">آدرس</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="address"
                      name="address"
                      placeholder="آدرس کامل محل برگزاری"
                      value={formData.address}
                      onChange={handleChange}
                      className="pr-11 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="x">طول جغرافیایی (X)</Label>
                    <Input
                      id="x"
                      name="x"
                      type="number"
                      step="any"
                      placeholder="مثلاً 51.3890"
                      value={formData.x}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="y">عرض جغرافیایی (Y)</Label>
                    <Input
                      id="y"
                      name="y"
                      type="number"
                      step="any"
                      placeholder="مثلاً 35.6892"
                      value={formData.y}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
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
                  <Label htmlFor="photo">لینک تصویر کاور</Label>
                  <div className="relative">
                    <Image className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="photo"
                      name="photo"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.photo}
                      onChange={handleChange}
                      className="pr-11 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">قیمت (تومان)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="۰ برای رایگان"
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

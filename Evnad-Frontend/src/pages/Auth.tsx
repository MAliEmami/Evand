import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "خوش آمدید!",
          description: "با موفقیت وارد شدید.",
        });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name: formData.name,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "حساب ایجاد شد!",
          description: "حساب شما با موفقیت ایجاد شد.",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "خطا",
        description: error.message === "Invalid login credentials" 
          ? "ایمیل یا رمز عبور نادرست است" 
          : error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              ایونته<span className="text-gradient">‌من</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "خوش آمدید" : "ایجاد حساب کاربری"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? "اطلاعات ورود خود را وارد کنید" 
                : "سفر خود را با ایونته‌من از امروز شروع کنید"}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-muted rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                isLogin 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ورود
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                !isLogin 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ثبت‌نام
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">نام کامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="علی محمدی"
                    value={formData.name}
                    onChange={handleChange}
                    className="pr-11 h-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">آدرس ایمیل</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pr-11 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-11 pl-11 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-start">
                <button type="button" className="text-sm text-primary hover:underline">
                  رمز عبور را فراموش کردید؟
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full gap-2"
              disabled={loading}
            >
              {loading ? (
                "لطفاً صبر کنید..."
              ) : (
                <>
                  {isLogin ? "ورود" : "ایجاد حساب"}
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                یا ادامه با
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="h-12">
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              گوگل
            </Button>
            <Button variant="outline" size="lg" className="h-12">
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              گیت‌هاب
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            با ادامه، شما با{" "}
            <button className="text-primary hover:underline">شرایط استفاده</button>{" "}
            و{" "}
            <button className="text-primary hover:underline">حریم خصوصی</button>{" "}
            ما موافقت می‌کنید
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-background/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <Calendar className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            شروع به ساختن رویدادهای شگفت‌انگیز کنید
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            به جامعه برگزارکنندگان و شرکت‌کنندگان ما بپیوندید. رویدادهایی که اهمیت دارند را ایجاد، کشف و تجربه کنید.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex -space-x-3 space-x-reverse">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm border-2 border-primary-foreground/20 flex items-center justify-center text-primary-foreground font-semibold text-sm"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-primary-foreground/80 text-sm">
              +۱۰ هزار کاربر پیوستند
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
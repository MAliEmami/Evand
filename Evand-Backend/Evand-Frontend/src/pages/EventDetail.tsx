import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Heart, 
  ArrowRight,
  CheckCircle,
  User,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  location: string;
  address: string | null;
  category: string;
  image_url: string | null;
  price: string | null;
  max_attendees: number;
  user_id: string;
}

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

// Sample events data
const sampleEvents: Record<string, Event> = {
  "sample-1": {
    id: "sample-1",
    title: "همایش نوآوران فناوری ۱۴۰۳",
    description: `همراه با رهبران صنعت و نوآوران برای یک روز بحث‌های فناوری پیشرفته و فرصت‌های شبکه‌سازی.

این همایش درخشان‌ترین ذهن‌های فناوری را گرد هم می‌آورد تا آینده نوآوری را کاوش کنند. چه یک حرفه‌ای باتجربه باشید و چه تازه سفر فناوری خود را شروع کرده‌اید، بینش‌ها و ارتباطات ارزشمندی را در اینجا پیدا خواهید کرد.

چه انتظاری داشته باشید:
- سخنرانی‌های کلیدی از رهبران صنعت
- کارگاه‌های تعاملی و جلسات گروهی
- فرصت‌های شبکه‌سازی با همتایان
- نمایش محصولات و دموها
- پنل‌های بحث در مورد فناوری‌های نوظهور`,
    date: "2025-01-07",
    time: "09:00:00",
    location: "مرکز همایش‌های تهران",
    address: "خیابان ولیعصر، تهران",
    category: "فناوری",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    price: "رایگان",
    max_attendees: 300,
    user_id: "",
  },
  "sample-2": {
    id: "sample-2",
    title: "کارگاه طراحی خلاقانه",
    description: `کارگاه عملی برای کشف جدیدترین روندها و ابزارهای طراحی. مناسب برای مبتدیان و حرفه‌ای‌ها.

در این کارگاه یاد می‌گیرید:
- اصول طراحی مدرن
- کار با ابزارهای Figma و Adobe XD
- طراحی رابط کاربری جذاب
- تجربه کاربری (UX) در طراحی`,
    date: "2025-01-15",
    time: "14:00:00",
    location: "استودیو طراحی اصفهان",
    address: "خیابان چهارباغ، اصفهان",
    category: "کارگاه",
    image_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200",
    price: "۵۰,۰۰۰ تومان",
    max_attendees: 30,
    user_id: "",
  },
  "sample-3": {
    id: "sample-3",
    title: "شب شبکه‌سازی استارتاپ‌ها",
    description: `ارتباط با بنیان‌گذاران، سرمایه‌گذاران و علاقه‌مندان استارتاپ در یک شب گفتگوهای معنادار.

برنامه‌های شب:
- معرفی استارتاپ‌های موفق
- گفتگو با سرمایه‌گذاران
- شبکه‌سازی و تبادل تجربه`,
    date: "2025-01-22",
    time: "18:00:00",
    location: "هاب استارتاپ، شیراز",
    address: "بلوار زند، شیراز",
    category: "شبکه‌سازی",
    image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
    price: "رایگان",
    max_attendees: 150,
    user_id: "",
  },
  "sample-4": {
    id: "sample-4",
    title: "اردوگاه سلامت و آرامش",
    description: `یک آخر هفته تحول‌آفرین متمرکز بر سلامت ذهنی، مدیتیشن و رشد شخصی.

برنامه‌ها شامل:
- جلسات مدیتیشن صبحگاهی
- کارگاه یوگا
- گفتگوی گروهی درباره سلامت روان
- طبیعت‌گردی`,
    date: "2025-01-30",
    time: "08:00:00",
    location: "اقامتگاه کوهستانی تهران",
    address: "جاده چالوس",
    category: "سلامت",
    image_url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200",
    price: "۲۰۰,۰۰۰ تومان",
    max_attendees: 50,
    user_id: "",
  },
  "sample-5": {
    id: "sample-5",
    title: "فستیوال موسیقی زنده",
    description: `سه روز اجراهای زنده باورنکردنی از هنرمندان برتر در ژانرهای مختلف.

هنرمندان شرکت‌کننده:
- گروه‌های موسیقی پاپ و راک
- نوازندگان سنتی
- هنرمندان جوان و نوظهور`,
    date: "2025-02-11",
    time: "12:00:00",
    location: "پارک ساحلی، کیش",
    address: "جزیره کیش",
    category: "موسیقی",
    image_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200",
    price: "۳۵۰,۰۰۰ تومان",
    max_attendees: 5000,
    user_id: "",
  },
  "sample-6": {
    id: "sample-6",
    title: "کلاس پخت حرفه‌ای",
    description: `تکنیک‌های آشپزی حرفه‌ای را از سرآشپزهای برنده جایزه در این کلاس عملی انحصاری بیاموزید.

موضوعات کلاس:
- تکنیک‌های برش حرفه‌ای
- پخت غذاهای ایرانی
- تزئین غذا و سرو`,
    date: "2025-02-25",
    time: "11:00:00",
    location: "آکادمی آشپزی، مشهد",
    address: "بلوار وکیل‌آباد، مشهد",
    category: "غذا و نوشیدنی",
    image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200",
    price: "۱۵۰,۰۰۰ تومان",
    max_attendees: 20,
    user_id: "",
  },
};

const sampleAttendeeCounts: Record<string, number> = {
  "sample-1": 245,
  "sample-2": 28,
  "sample-3": 89,
  "sample-4": 42,
  "sample-5": 4800,
  "sample-6": 18,
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [organizer, setOrganizer] = useState<Profile | null>(null);
  const [organizerEventCount, setOrganizerEventCount] = useState(0);
  const [attendeesCount, setAttendeesCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isSampleEvent, setIsSampleEvent] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (id) {
      fetchEventData();
    }
  }, [id, user]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      
      // Check if it's a sample event
      if (id && id.startsWith("sample-")) {
        const sampleEvent = sampleEvents[id];
        if (sampleEvent) {
          setEvent(sampleEvent);
          setAttendeesCount(sampleAttendeeCounts[id] || 0);
          setIsSampleEvent(true);
          setOrganizerEventCount(6);
          setLoading(false);
          return;
        }
      }

      // Fetch real event from database
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (eventError) throw eventError;
      if (!eventData) {
        // Check if it might be a sample event with wrong format
        const sampleId = `sample-${id}`;
        if (sampleEvents[sampleId]) {
          setEvent(sampleEvents[sampleId]);
          setAttendeesCount(sampleAttendeeCounts[sampleId] || 0);
          setIsSampleEvent(true);
          setOrganizerEventCount(6);
          setLoading(false);
          return;
        }
        setLoading(false);
        return;
      }

      setEvent(eventData);
      setIsSampleEvent(false);

      // Fetch organizer profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", eventData.user_id)
        .maybeSingle();

      setOrganizer(profileData);

      // Fetch organizer's event count
      const { count: eventCount } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .eq("user_id", eventData.user_id);

      setOrganizerEventCount(eventCount || 0);

      // Fetch attendees count
      const { count: attendees } = await supabase
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", id);

      setAttendeesCount(attendees || 0);

      // Check if current user is registered
      if (user) {
        const { data: registration } = await supabase
          .from("event_registrations")
          .select("id")
          .eq("event_id", id)
          .eq("user_id", user.id)
          .maybeSingle();

        setIsRegistered(!!registration);
      }

    } catch (error: any) {
      console.error("Error fetching event:", error);
      // Try to show sample event
      if (id && sampleEvents[id]) {
        setEvent(sampleEvents[id]);
        setAttendeesCount(sampleAttendeeCounts[id] || 0);
        setIsSampleEvent(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = () => {
    setIsRegistered(true);
    toast({
      title: "با موفقیت ثبت شد",
      description: "شما در این رویداد ثبت‌نام کردید",
    });
  };


  const handleShare = async () => {
    const url = window.location.href;
    const title = event?.title || "رویداد";

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title} - ایونته‌من`,
          url: url,
        });
      } catch (error) {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "لینک کپی شد!",
      description: "لینک رویداد در کلیپ‌بورد کپی شد",
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد",
      description: isLiked ? "این رویداد از لیست علاقه‌مندی‌ها حذف شد" : "این رویداد به لیست علاقه‌مندی‌ها اضافه شد",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "عصر" : "صبح";
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour12}:${minutes} ${period}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">رویداد یافت نشد</h1>
          <p className="text-muted-foreground mb-6">رویداد مورد نظر وجود ندارد یا حذف شده است</p>
          <Button variant="hero" asChild>
            <Link to="/events">مشاهده رویدادها</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const spotsLeft = event.max_attendees - attendeesCount;
  const isFull = spotsLeft <= 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Back Button */}
          <Link to="/events" className="absolute top-8 right-4 md:right-8">
            <Button variant="secondary" size="sm" className="gap-2 bg-background/80 backdrop-blur-sm">
              <ArrowRight className="w-4 h-4" />
              بازگشت به رویدادها
            </Button>
          </Link>

          {/* Sample Badge */}
          {isSampleEvent && (
            <Badge className="absolute top-8 left-4 md:left-8 bg-amber-500 text-white">
              رویداد نمونه
            </Badge>
          )}
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                {/* Category */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary/10 text-primary border-0">
                    {event.category}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {event.title}
                </h1>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاریخ</p>
                      <p className="font-semibold text-foreground">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">زمان</p>
                      <p className="font-semibold text-foreground">{formatTime(event.time)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-xl md:col-span-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">مکان</p>
                      <p className="font-semibold text-foreground">{event.location}</p>
                      {event.address && (
                        <p className="text-sm text-muted-foreground">{event.address}</p>
                      )}
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.location + (event.address ? ', ' + event.address : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        نمایش روی نقشه
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-xl font-bold text-foreground mb-4">درباره این رویداد</h2>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {event.description || "توضیحاتی برای این رویداد ثبت نشده است."}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Registration Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">قیمت</p>
                      <p className="text-3xl font-bold text-foreground">{event.price || "رایگان"}</p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">{attendeesCount}/{event.max_attendees}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-muted rounded-full mb-4 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? "bg-destructive" : "bg-gradient-hero"
                      }`}
                      style={{ width: `${Math.min((attendeesCount / event.max_attendees) * 100, 100)}%` }}
                    />
                  </div>
                  <p className={`text-sm mb-6 ${isFull ? "text-destructive" : "text-muted-foreground"}`}>
                    {isFull ? "ظرفیت تکمیل شده است" : `${spotsLeft} جای باقی‌مانده`}
                  </p>

                  <Button 
                    variant={isRegistered ? "outline" : "hero"}
                    size="lg" 
                    className="w-full gap-2 mb-4"
                    onClick={handleJoinEvent}
                    disabled={isRegistered}
                  >
                    <CheckCircle className="w-5 h-5" />
                    {isRegistered ? "ثبت‌نام شده" : "ثبت‌نام"}
                  </Button>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 gap-2"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                      اشتراک‌گذاری
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className={`gap-2 ${isLiked ? "text-red-500 border-red-500" : ""}`}
                      onClick={handleLike}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>

                {/* Organizer Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">برگزارکننده</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center text-xl font-bold text-primary-foreground">
                      {isSampleEvent ? "ا" : (organizer?.avatar_url ? (
                        <img 
                          src={organizer.avatar_url} 
                          alt={organizer.full_name || "کاربر"} 
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        (organizer?.full_name?.[0] || "ک")
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {isSampleEvent ? "ایونته‌من" : (organizer?.full_name || "کاربر ایونته‌من")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {organizerEventCount} رویداد برگزار کرده
                      </p>
                    </div>
                  </div>
                  {!isSampleEvent && user && user.id !== event.user_id && (
                    <Button variant="outline" className="w-full mt-4 gap-2">
                      <User className="w-4 h-4" />
                      مشاهده پروفایل
                    </Button>
                  )}
                  {!isSampleEvent && user && user.id === event.user_id && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 gap-2"
                      onClick={() => navigate(`/create-event?edit=${event.id}`)}
                    >
                      ویرایش رویداد
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16" />
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;

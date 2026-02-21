import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Filter, MapPin, Calendar as CalendarIcon, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { faIR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({});

  // Sample events to show when database is empty
  const sampleEvents: Event[] = [
    {
      id: "sample-1",
      title: "همایش نوآوران فناوری ۱۴۰۳",
      description: "همراه با رهبران صنعت و نوآوران برای یک روز بحث‌های فناوری پیشرفته و شبکه‌سازی.",
      date: "2025-01-07",
      time: "09:00:00",
      location: "مرکز همایش‌های تهران",
      address: "خیابان ولیعصر",
      category: "فناوری",
      image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      price: "رایگان",
      max_attendees: 300,
      user_id: "",
    },
    {
      id: "sample-2",
      title: "کارگاه طراحی خلاقانه",
      description: "کارگاه عملی برای کشف جدیدترین روندها و ابزارهای طراحی. مناسب برای مبتدیان و حرفه‌ای‌ها.",
      date: "2025-01-15",
      time: "14:00:00",
      location: "استودیو طراحی اصفهان",
      address: "خیابان چهارباغ",
      category: "کارگاه",
      image_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
      price: "۵۰,۰۰۰ تومان",
      max_attendees: 30,
      user_id: "",
    },
    {
      id: "sample-3",
      title: "شب شبکه‌سازی استارتاپ‌ها",
      description: "ارتباط با بنیان‌گذاران، سرمایه‌گذاران و علاقه‌مندان استارتاپ در یک شب گفتگوهای معنادار.",
      date: "2025-01-22",
      time: "18:00:00",
      location: "هاب استارتاپ، شیراز",
      address: "بلوار زند",
      category: "شبکه‌سازی",
      image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      price: "رایگان",
      max_attendees: 150,
      user_id: "",
    },
    {
      id: "sample-4",
      title: "اردوگاه سلامت و آرامش",
      description: "یک آخر هفته تحول‌آفرین متمرکز بر سلامت ذهنی، مدیتیشن و رشد شخصی.",
      date: "2025-01-30",
      time: "08:00:00",
      location: "اقامتگاه کوهستانی تهران",
      address: "جاده چالوس",
      category: "سلامت",
      image_url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
      price: "۲۰۰,۰۰۰ تومان",
      max_attendees: 50,
      user_id: "",
    },
    {
      id: "sample-5",
      title: "فستیوال موسیقی زنده",
      description: "سه روز اجراهای زنده باورنکردنی از هنرمندان برتر در ژانرهای مختلف.",
      date: "2025-02-11",
      time: "12:00:00",
      location: "پارک ساحلی، کیش",
      address: "جزیره کیش",
      category: "موسیقی",
      image_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
      price: "۳۵۰,۰۰۰ تومان",
      max_attendees: 5000,
      user_id: "",
    },
    {
      id: "sample-6",
      title: "کلاس پخت حرفه‌ای",
      description: "تکنیک‌های آشپزی حرفه‌ای را از سرآشپزهای برنده جایزه در این کلاس عملی انحصاری بیاموزید.",
      date: "2025-02-25",
      time: "11:00:00",
      location: "آکادمی آشپزی، مشهد",
      address: "بلوار وکیل‌آباد",
      category: "غذا و نوشیدنی",
      image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
      price: "۱۵۰,۰۰۰ تومان",
      max_attendees: 20,
      user_id: "",
    },
  ];

  const categories = [
    "همه",
    "فناوری",
    "کارگاه",
    "شبکه‌سازی",
    "موسیقی",
    "سلامت",
    "غذا و نوشیدنی",
    "ورزش",
    "هنر",
  ];

  const locations = [
    "تهران",
    "اصفهان",
    "شیراز",
    "مشهد",
    "تبریز",
    "کیش",
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;

      // If no events in database, use sample events
      if (!data || data.length === 0) {
        setEvents(sampleEvents);
        // Set sample attendee counts
        const sampleCounts: Record<string, number> = {
          "sample-1": 245,
          "sample-2": 28,
          "sample-3": 89,
          "sample-4": 42,
          "sample-5": 4800,
          "sample-6": 18,
        };
        setAttendeeCounts(sampleCounts);
      } else {
        setEvents(data);

        // Fetch attendee counts for all events
        const counts: Record<string, number> = {};
        for (const event of data) {
          const { count } = await supabase
            .from("event_registrations")
            .select("*", { count: "exact", head: true })
            .eq("event_id", event.id);
          counts[event.id] = count || 0;
        }
        setAttendeeCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      // On error, show sample events
      setEvents(sampleEvents);
    } finally {
      setLoading(false);
    }
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

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "همه" || event.category === selectedCategory;
    const matchesLocation = !selectedLocation || event.location.includes(selectedLocation);
    const eventDate = new Date(event.date);
    const matchesDate = !selectedDate || (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
    const matchesPrice = priceFilter.length === 0 || (
      (priceFilter.includes("free") && (event.price === "رایگان" || !event.price)) ||
      (priceFilter.includes("paid") && event.price && event.price !== "رایگان")
    );
    return matchesSearch && matchesCategory && matchesLocation && matchesDate && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("همه");
    setSelectedLocation(null);
    setSelectedDate(undefined);
    setPriceFilter([]);
  };

  const activeFiltersCount = [
    selectedLocation,
    selectedDate,
    priceFilter.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              کشف <span className="text-gradient">رویدادهای</span> شگفت‌انگیز
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              رویدادهایی که با علایق شما مطابقت دارند را پیدا کنید و در آن‌ها شرکت کنید. از گفتگوهای فناوری تا اردوگاه‌های سلامت، برای همه چیزی وجود دارد.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="bg-card rounded-2xl p-6 shadow-card mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="جستجوی رویدادها بر اساس نام، توضیحات یا مکان..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 h-12 text-base"
                />
              </div>

              {/* Location Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant={selectedLocation ? "default" : "outline"} 
                    className="h-12 gap-2 px-6"
                  >
                    <MapPin className="w-4 h-4" />
                    {selectedLocation || "مکان"}
                    {selectedLocation && (
                      <X 
                        className="w-4 h-4 mr-1 hover:text-destructive" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLocation(null);
                        }}
                      />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="start">
                  <div className="space-y-1">
                    {locations.map((location) => (
                      <Button
                        key={location}
                        variant={selectedLocation === location ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedLocation(location)}
                      >
                        {location}
                      </Button>
                    ))}
                    {selectedLocation && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive"
                        onClick={() => setSelectedLocation(null)}
                      >
                        پاک کردن
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Date Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant={selectedDate ? "default" : "outline"} 
                    className="h-12 gap-2 px-6"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: faIR }) : "تاریخ"}
                    {selectedDate && (
                      <X 
                        className="w-4 h-4 mr-1 hover:text-destructive" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDate(undefined);
                        }}
                      />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              {/* More Filters */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant={activeFiltersCount > 0 ? "default" : "secondary"} 
                    className="h-12 gap-2 px-6"
                  >
                    <Filter className="w-4 h-4" />
                    فیلترها
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="mr-1 bg-primary-foreground text-primary">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="start">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">قیمت</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="free"
                            checked={priceFilter.includes("free")}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setPriceFilter([...priceFilter, "free"]);
                              } else {
                                setPriceFilter(priceFilter.filter(p => p !== "free"));
                              }
                            }}
                          />
                          <Label htmlFor="free" className="cursor-pointer">رایگان</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="paid"
                            checked={priceFilter.includes("paid")}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setPriceFilter([...priceFilter, "paid"]);
                              } else {
                                setPriceFilter(priceFilter.filter(p => p !== "paid"));
                              }
                            }}
                          />
                          <Label htmlFor="paid" className="cursor-pointer">پولی</Label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <Button 
                        variant="ghost" 
                        className="w-full text-destructive hover:text-destructive"
                        onClick={clearFilters}
                      >
                        پاک کردن همه فیلترها
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Active Filters Display */}
            {(selectedLocation || selectedDate || priceFilter.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">فیلترهای فعال:</span>
                {selectedLocation && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedLocation}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation(null)} />
                  </Badge>
                )}
                {selectedDate && (
                  <Badge variant="secondary" className="gap-1">
                    {format(selectedDate, "d MMMM", { locale: faIR })}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDate(undefined)} />
                  </Badge>
                )}
                {priceFilter.includes("free") && (
                  <Badge variant="secondary" className="gap-1">
                    رایگان
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceFilter(priceFilter.filter(p => p !== "free"))} />
                  </Badge>
                )}
                {priceFilter.includes("paid") && (
                  <Badge variant="secondary" className="gap-1">
                    پولی
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceFilter(priceFilter.filter(p => p !== "paid"))} />
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {loading ? (
                "در حال بارگذاری..."
              ) : (
                <>
                  <span className="font-semibold text-foreground">{filteredEvents.length}</span> رویداد یافت شد
                </>
              )}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Events Grid */}
          {!loading && filteredEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description || ""}
                  date={formatDate(event.date)}
                  time={formatTime(event.time)}
                  location={event.location}
                  attendees={attendeeCounts[event.id] || 0}
                  maxAttendees={event.max_attendees}
                  category={event.category}
                  imageUrl={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
                  organizer="ایونته‌من"
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">رویدادی یافت نشد</h3>
              <p className="text-muted-foreground mb-6">
                {events.length === 0
                  ? "هنوز رویدادی ایجاد نشده است. اولین رویداد را شما ایجاد کنید!"
                  : "معیارهای جستجوی خود را تنظیم کنید یا فیلترها را پاک کنید"}
              </p>
              {events.length === 0 ? (
                <Button variant="hero" asChild>
                  <a href="/create-event">ایجاد رویداد</a>
                </Button>
              ) : (
                <Button variant="outline" onClick={clearFilters}>
                  پاک کردن همه فیلترها
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;

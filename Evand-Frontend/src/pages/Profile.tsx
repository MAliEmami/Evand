import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit,
  Settings,
  LogOut,
  Camera,
  Plus,
  Users,
  Star,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "علی محمدی",
    email: "ali@example.com",
    bio: "علاقه‌مند به رویدادها و عاشق فناوری. همیشه به دنبال تجربه بزرگ بعدی برای شرکت.",
    location: "تهران، ایران",
    joinedDate: "عضو از آذر ۱۴۰۲",
  });

  // Sample events organized
  const organizedEvents = [
    {
      id: "1",
      title: "گردهمایی شبکه‌سازی فناوری",
      date: "دی ۲۵, ۱۴۰۳",
      attendees: 45,
      status: "پیش‌رو",
    },
    {
      id: "2",
      title: "کارگاه طراحی",
      date: "آذر ۲۹, ۱۴۰۳",
      attendees: 28,
      status: "گذشته",
    },
  ];

  // Sample events attending
  const attendingEvents = [
    {
      id: "3",
      title: "همایش نوآوران فناوری ۱۴۰۳",
      date: "دی ۷, ۱۴۰۳",
      organizer: "تک‌هاب",
      status: "پیش‌رو",
    },
    {
      id: "4",
      title: "کارگاه طراحی خلاقانه",
      date: "دی ۱۵, ۱۴۰۳",
      organizer: "ذهن‌های خلاق",
      status: "پیش‌رو",
    },
    {
      id: "5",
      title: "شب شبکه‌سازی استارتاپ‌ها",
      date: "دی ۲۲, ۱۴۰۳",
      organizer: "باشگاه بنیان‌گذاران",
      status: "پیش‌رو",
    },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "پروفایل به‌روزرسانی شد",
      description: "پروفایل شما با موفقیت ذخیره شد.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Profile Header */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-hero flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  {profile.name.charAt(0)}
                </div>
                <button className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Camera className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Star className="w-3 h-3" />
                      برگزارکننده
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Users className="w-3 h-3" />
                      شرکت‌کننده
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{profile.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {profile.joinedDate}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4" />
                  ویرایش پروفایل
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{organizedEvents.length}</p>
                <p className="text-sm text-muted-foreground">رویداد برگزار شده</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{attendingEvents.length}</p>
                <p className="text-sm text-muted-foreground">شرکت در رویداد</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">۱۵۶</p>
                <p className="text-sm text-muted-foreground">ارتباطات</p>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditing && (
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card mb-8 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground mb-6">ویرایش پروفایل</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">نام کامل</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">موقعیت</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">بیوگرافی</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="min-h-[100px] resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    انصراف
                  </Button>
                  <Button variant="hero" onClick={handleSaveProfile}>
                    ذخیره تغییرات
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="attending" className="w-full">
            <TabsList className="w-full md:w-auto bg-muted p-1 rounded-xl mb-6">
              <TabsTrigger value="attending" className="rounded-lg px-6">
                رویدادهای شرکت‌کرده
              </TabsTrigger>
              <TabsTrigger value="organized" className="rounded-lg px-6">
                رویدادهای برگزار شده
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attending">
              <div className="space-y-4">
                {attendingEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="block bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {event.organizer}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {event.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="organized">
              <div className="space-y-4">
                {organizedEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="block bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.attendees} شرکت‌کننده
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${event.status === "پیش‌رو" ? "bg-primary/10 text-primary border-primary/20" : ""}`}
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </Link>
                ))}

                <Link to="/create-event">
                  <Button variant="outline" className="w-full h-16 gap-2 border-dashed">
                    <Plus className="w-5 h-5" />
                    ایجاد رویداد جدید
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>

          {/* Logout Button */}
          <div className="mt-12 pt-8 border-t border-border">
            <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2">
              <LogOut className="w-4 h-4" />
              خروج
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
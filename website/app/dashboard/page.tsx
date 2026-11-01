
"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Compass,
  MessageCircle,
  UserRound,
  LogOut,
  Camera,
  Save,
  Loader2,
  MapPin,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "../../lib/supabase/browser";

type Profile = {
  username: string;
  full_name: string;
  location: string;
  bio: string;
  relationship_intention: string;
  avatar_path: string | null;
};

const tabs = [
  { id: "discover", label: "Discover", icon: Compass },
  { id: "likes", label: "Likes", icon: Heart },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "profile", label: "My Profile", icon: UserRound },
];

const emptyProfile: Profile = {
  username: "",
  full_name: "",
  location: "",
  bio: "",
  relationship_intention: "Marriage",
  avatar_path: null,
};

export default function DashboardPage() {
  const router = useRouter();

  const [supabase] = useState(() => createClient());
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedTab = params.get("tab");

    if (tabs.some((tab) => tab.id === requestedTab)) {
      setActiveTab(requestedTab!);
    }

    async function loadMember() {
      const { data, error: authError } = await supabase.auth.getUser();

      if (authError || !data.user) {
        router.replace("/login");
        return;
      }

      setUserId(data.user.id);
      setEmail(data.user.email || "");

      const { data: savedProfile, error: profileError } = await supabase
        .from("profiles")
        .select(
          "username, full_name, location, bio, relationship_intention, avatar_path"
        )
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        setError(
          "Your account is signed in, but the profile could not be loaded. Please check the Supabase table permissions."
        );
      } else if (savedProfile) {
        setProfile({
          username: savedProfile.username || "",
          full_name: savedProfile.full_name || "",
          location: savedProfile.location || "",
          bio: savedProfile.bio || "",
          relationship_intention:
            savedProfile.relationship_intention || "Marriage",
          avatar_path: savedProfile.avatar_path || null,
        });

        if (savedProfile.avatar_path) {
          const { data: imageData } = supabase.storage
            .from("profile-photos")
            .getPublicUrl(savedProfile.avatar_path);

          setAvatarUrl(imageData.publicUrl);
        }
      }

      setLoading(false);
    }

    loadMember();
  }, [router, supabase]);

  function updateField(field: keyof Profile, value: string) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    if (!profile.username.trim() || !profile.full_name.trim()) {
      setError("Please enter your full name and username.");
      setSaving(false);
      return;
    }

    if (profile.username.trim().length < 3) {
      setError("Your username must contain at least 3 characters.");
      setSaving(false);
      return;
    }

    const { error: saveError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: userId,
          username: profile.username.trim().toLowerCase(),
          full_name: profile.full_name.trim(),
          location: profile.location.trim(),
          bio: profile.bio.trim(),
          relationship_intention: profile.relationship_intention,
          avatar_path: profile.avatar_path,
          is_active: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (saveError) {
      setError(saveError.message);
    } else {
      setMessage("Your profile has been saved successfully.");
    }

    setSaving(false);
  }

  async function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file || !userId) return;

    setError("");
    setMessage("");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Your profile photo must be smaller than 10 MB.");
      return;
    }

    setUploading(true);

    const extension = file.name.split(".").pop() || "jpg";
    const filePath = `${userId}/${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    setProfile((current) => ({
      ...current,
      avatar_path: filePath,
    }));

    setAvatarUrl(data.publicUrl);
    setMessage("Photo uploaded. Save your profile to confirm the change.");
    setUploading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  function changeTab(tab: string) {
    setActiveTab(tab);
    setMenuOpen(false);
    window.history.replaceState(
      null,
      "",
      `/dashboard?tab=${tab}`
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8fa]">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-rose-500" size={38} />
          <p className="mt-4 text-sm text-gray-500">
            Loading your Prominent Hearts account...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8fa] pb-28 text-[#30202a]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-rose-100 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-600 to-pink-500 text-white">
              <Heart size={25} fill="currentColor" />
            </span>

            <span className="font-serif text-xl font-bold">
              Prominent <span className="text-rose-600">Hearts</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle member menu"
            className="rounded-xl p-3 hover:bg-rose-50"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-rose-100 bg-white p-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => changeTab(tab.id)}
                  className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left font-semibold hover:bg-rose-50"
                >
                  <Icon size={21} />
                  {tab.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut size={21} />
              Sign out
            </button>
          </div>
        )}
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        {/* WELCOME */}
        <section className="rounded-[2rem] bg-gradient-to-br from-[#651c3c] via-[#923456] to-[#c65377] p-7 text-white shadow-xl sm:p-10">
          <p className="text-sm font-semibold tracking-[3px] text-rose-100">
            YOUR PERSONAL SPACE
          </p>

          <h1 className="mt-4 font-serif text-3xl font-bold sm:text-5xl">
            Welcome to Prominent Hearts
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-rose-50">
            Build your profile, discover meaningful connections and
            begin your journey with purpose.
          </p>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 bg-white/20">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Your profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={27} />
              )}
            </div>

            <div className="min-w-0">
              <p className="font-bold">
                {profile.full_name || "Complete your profile"}
              </p>
              <p className="truncate text-sm text-rose-100">{email}</p>
            </div>
          </div>
        </section>

        {/* MEMBER NAVIGATION */}
        <nav className="mt-7 grid grid-cols-4 gap-2 rounded-2xl border border-rose-100 bg-white p-2 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => changeTab(tab.id)}
                className={`flex flex-col items-center gap-2 rounded-xl px-1 py-4 text-center text-xs font-semibold transition sm:text-sm ${
                  active
                    ? "bg-rose-50 text-rose-600"
                    : "text-slate-500 hover:bg-rose-50"
                }`}
              >
                <Icon size={23} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <section className="mt-8 rounded-3xl border border-rose-100 bg-white p-5 shadow-sm sm:p-9">
            <div className="mb-7">
              <p className="text-sm font-bold tracking-[3px] text-rose-500">
                MEMBER PROFILE
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold">
                My Profile
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Tell other members about yourself and what you are looking for.
              </p>
            </div>

            {/* PHOTO */}
            <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl bg-[#fff8fa] p-6 sm:flex-row">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-rose-100 shadow">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile photo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={43} className="text-rose-500" />
                )}
              </div>

              <div className="text-center sm:text-left">
                <h3 className="font-bold">Your profile photo</h3>
                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG or WEBP. Maximum size 10 MB.
                </p>

                <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-bold text-white hover:bg-rose-700">
                  {uploading ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Camera size={17} />
                  )}
                  {uploading ? "Uploading..." : "Upload photo"}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={uploadPhoto}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <form onSubmit={saveProfile} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full name
                  </label>

                  <input
                    value={profile.full_name}
                    onChange={(e) =>
                      updateField("full_name", e.target.value)
                    }
                    required
                    maxLength={100}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Username
                  </label>

                  <input
                    value={profile.username}
                    onChange={(e) =>
                      updateField(
                        "username",
                        e.target.value.replace(/[^a-zA-Z0-9_]/g, "")
                      )
                    }
                    required
                    minLength={3}
                    maxLength={30}
                    placeholder="Choose a username"
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Location
                </label>

                <input
                  value={profile.location}
                  onChange={(e) =>
                    updateField("location", e.target.value)
                  }
                  maxLength={120}
                  placeholder="City or town"
                  className="w-full rounded-xl border border-gray-200 px-4 py-4 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Relationship intention
                </label>

                <select
                  value={profile.relationship_intention}
                  onChange={(e) =>
                    updateField("relationship_intention", e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                >
                  <option value="Marriage">Marriage</option>
                  <option value="Contextual Marriage">
                    Contextual Marriage
                  </option>
                  <option value="Long-term Relationship">
                    Long-term Relationship
                  </option>
                  <option value="Get to Know Someone Intentionally">
                    Get to Know Someone Intentionally
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  About me
                </label>

                <textarea
                  value={profile.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  maxLength={1000}
                  rows={5}
                  placeholder="Share something meaningful about yourself..."
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-4 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />

                <p className="mt-1 text-right text-xs text-gray-400">
                  {profile.bio.length}/1000 characters
                </p>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={saving || uploading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-4 font-bold text-white transition hover:bg-rose-700 disabled:opacity-60 sm:w-auto"
              >
                {saving ? (
                  <Loader2 size={19} className="animate-spin" />
                ) : (
                  <Save size={19} />
                )}

                {saving ? "Saving..." : "Save my profile"}
              </button>
            </form>
          </section>
        )}

        {/* DISCOVER TAB */}
        {activeTab === "discover" && (
          <section className="mt-8 rounded-3xl border border-rose-100 bg-white p-7 shadow-sm">
            <Compass size={35} className="text-rose-500" />

            <h2 className="mt-4 font-serif text-3xl font-bold">
              Discover meaningful connections
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              Explore the Prominent Hearts homepage to see suggested
              profiles and relationship intentions.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-bold text-white"
            >
              Explore profiles
              <Compass size={18} />
            </Link>
          </section>
        )}

        {/* LIKES TAB */}
        {activeTab === "likes" && (
          <section className="mt-8 rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm">
            <Heart size={42} className="mx-auto text-rose-500" />

            <h2 className="mt-4 font-serif text-3xl font-bold">
              Your Likes
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
              Profiles you like will appear here once the persistent
              likes feature is connected.
            </p>
          </section>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <section className="mt-8 rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm">
            <MessageCircle size={42} className="mx-auto text-rose-500" />

            <h2 className="mt-4 font-serif text-3xl font-bold">
              Your Messages
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
              Your private conversations will appear here when the
              messaging system is implemented.
            </p>
          </section>
        )}

        {/* ACCOUNT FOOTER */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-rose-100 bg-white p-5 sm:flex-row">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <ShieldCheck className="text-rose-500" size={21} />
            Your account is protected by Supabase authentication.
          </div>

          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </div>

      {/* FLOATING BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-rose-100 bg-white/95 shadow-[0_-5px_25px_rgba(80,20,40,0.08)] backdrop-blur-md">
        <div className="mx-auto grid max-w-xl grid-cols-4 px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => changeTab(tab.id)}
                className={`flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-semibold ${
                  active
                    ? "text-rose-600"
                    : "text-slate-400 hover:text-rose-500"
                }`}
              >
                <Icon size={24} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}

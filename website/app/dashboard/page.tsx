
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import {
  Heart,
  Compass,
  MessageCircle,
  UserRound,
  Menu,
  X,
  LogOut,
  MapPin,
  Search,
  Bell,
  ShieldCheck,
  Pencil,
  Save,
  Loader2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { auth, db } from "../../lib/firebase";

type Profile = {
  id: string;
  full_name: string;
  username: string;
  location: string;
  bio: string;
  relationship_intention: string;
  photoURL: string;
  isActive: boolean;
};

type Tab = "discover" | "likes" | "messages" | "profile";

const tabs = [
  { id: "discover" as Tab, label: "Discover", icon: Compass },
  { id: "likes" as Tab, label: "Likes", icon: Heart },
  { id: "messages" as Tab, label: "Messages", icon: MessageCircle },
  { id: "profile" as Tab, label: "My Profile", icon: UserRound },
];

const emptyProfile = {
  full_name: "",
  username: "",
  location: "",
  bio: "",
  relationship_intention: "Marriage",
  photoURL: "",
  isActive: true,
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [members, setMembers] = useState<Profile[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    location: "",
    bio: "",
    relationship_intention: "Marriage",
  });

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      if (!firebaseUser) {
        router.replace("/login");
        return;
      }

      setUser(firebaseUser);

      try {
        const profileRef = doc(db, "profiles", firebaseUser.uid);
        const privateRef = doc(db, "privateUsers", firebaseUser.uid);

        const [profileSnapshot, privateSnapshot] = await Promise.all([
          getDoc(profileRef),
          getDoc(privateRef),
        ]);

        let currentProfile: Profile;

        if (!profileSnapshot.exists()) {
          currentProfile = {
            id: firebaseUser.uid,
            ...emptyProfile,
            full_name:
              firebaseUser.displayName ||
              firebaseUser.email?.split("@")[0] ||
              "",
            photoURL: firebaseUser.photoURL || "",
          };

          await setDoc(profileRef, {
            ...currentProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          setEditing(true);
        } else {
          const saved = profileSnapshot.data();

          currentProfile = {
            id: firebaseUser.uid,
            full_name: saved.full_name || "",
            username: saved.username || "",
            location: saved.location || "",
            bio: saved.bio || "",
            relationship_intention:
              saved.relationship_intention || "Marriage",
            photoURL: saved.photoURL || "",
            isActive: saved.isActive !== false,
          };
        }

        let privateLikes: string[] = [];

        if (!privateSnapshot.exists()) {
          await setDoc(privateRef, {
            email: firebaseUser.email || "",
            likedUserIds: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } else {
          const privateData = privateSnapshot.data();

          privateLikes = Array.isArray(privateData.likedUserIds)
            ? privateData.likedUserIds
            : [];
        }

        if (!mounted) return;

        setProfile(currentProfile);
        setLikedIds(privateLikes);

        setForm({
          full_name: currentProfile.full_name,
          username: currentProfile.username,
          location: currentProfile.location,
          bio: currentProfile.bio,
          relationship_intention:
            currentProfile.relationship_intention,
        });

        const profilesQuery = query(
          collection(db, "profiles"),
          limit(31)
        );

        const membersSnapshot = await getDocs(profilesQuery);

        if (!mounted) return;

        const otherMembers = membersSnapshot.docs
          .filter((item) => item.id !== firebaseUser.uid)
          .map((item) => {
            const data = item.data();

            return {
              id: item.id,
              full_name: data.full_name || "",
              username: data.username || "",
              location: data.location || "",
              bio: data.bio || "",
              relationship_intention:
                data.relationship_intention || "",
              photoURL: data.photoURL || "",
              isActive: data.isActive !== false,
            };
          })
          .filter((member) => member.isActive);

        setMembers(otherMembers);
      } catch (err) {
        console.error("Dashboard loading error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your account. Please try again."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [router]);

  async function saveProfile() {
    if (!user) return;

    if (!form.full_name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (
      form.username.trim() &&
      !/^[a-zA-Z0-9_]{3,30}$/.test(form.username.trim())
    ) {
      setError(
        "Username must be 3–30 characters using letters, numbers or underscores."
      );
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    const values = {
      full_name: form.full_name.trim(),
      username: form.username.trim(),
      location: form.location.trim(),
      bio: form.bio.trim(),
      relationship_intention: form.relationship_intention,
      photoURL: user.photoURL || profile?.photoURL || "",
      isActive: true,
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(
        doc(db, "profiles", user.uid),
        values,
        { merge: true }
      );

      await setDoc(
        doc(db, "privateUsers", user.uid),
        {
          email: user.email || "",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      const updatedProfile: Profile = {
        id: user.uid,
        full_name: values.full_name,
        username: values.username,
        location: values.location,
        bio: values.bio,
        relationship_intention: values.relationship_intention,
        photoURL: values.photoURL,
        isActive: true,
      };

      setProfile(updatedProfile);
      setEditing(false);
      setNotice("Your profile has been saved successfully.");
    } catch (err) {
      console.error("Profile save error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "We could not save your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
    }
  }

  async function toggleLike(memberId: string) {
    if (!user) return;

    const alreadyLiked = likedIds.includes(memberId);

    try {
      const privateRef = doc(db, "privateUsers", user.uid);

      await updateDoc(privateRef, {
        likedUserIds: alreadyLiked
          ? arrayRemove(memberId)
          : arrayUnion(memberId),
        updatedAt: serverTimestamp(),
      });

      setLikedIds((current) =>
        alreadyLiked
          ? current.filter((id) => id !== memberId)
          : [...current, memberId]
      );
    } catch (err) {
      console.error("Like error:", err);
      setError("Unable to update your likes. Please try again.");
    }
  }

  function changeTab(tab: Tab) {
    setActiveTab(tab);
    setMenuOpen(false);
    setNotice("");
    setError("");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8fa]">
        <div className="text-center">
          <Loader2
            className="mx-auto animate-spin text-rose-600"
            size={38}
          />
          <p className="mt-4 font-semibold text-slate-600">
            Loading your Prominent Hearts account...
          </p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const displayName =
    profile?.full_name ||
    user.displayName ||
    "Member";

  return (
    <main className="min-h-screen bg-[#fff8fa] pb-28 text-[#30202a]">
      <header className="sticky top-0 z-40 border-b border-rose-100 bg-white">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-600 to-pink-500 text-white">
              <Heart fill="currentColor" size={24} />
            </span>

            <span className="font-serif text-xl font-bold">
              Prominent <span className="text-rose-600">Hearts</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeTab("messages")}
              aria-label="Messages"
              className="rounded-full p-3 text-slate-600 hover:bg-rose-50"
            >
              <Bell size={21} />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Account menu"
              className="rounded-xl p-2 hover:bg-rose-50"
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute right-4 top-[70px] z-50 w-64 rounded-2xl border border-rose-100 bg-white p-3 shadow-xl">
            <div className="border-b border-rose-100 px-3 py-3">
              <p className="font-bold">{displayName}</p>
              <p className="truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={() => changeTab("profile")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-rose-50"
            >
              <UserRound size={19} />
              My Profile
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-600 hover:bg-red-50"
            >
              <LogOut size={19} />
              Sign out
            </button>
          </div>
        )}
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {notice && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            {notice}
          </div>
        )}

        <section className="mb-7 rounded-[2rem] bg-gradient-to-br from-[#651c3c] via-[#923456] to-[#c65377] p-6 text-white shadow-lg sm:p-9">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-100">
            <Sparkles size={18} />
            Your journey continues here
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
            Welcome, {displayName}
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-rose-50">
            Discover meaningful connections, meet people who share
            your values and build relationships with purpose.
          </p>

          <button
            type="button"
            onClick={() => changeTab("profile")}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-rose-700"
          >
            Complete your profile
            <ArrowLeft className="rotate-180" size={18} />
          </button>
        </section>

        <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-rose-100 bg-white p-4">
            <Compass className="text-rose-500" size={23} />
            <p className="mt-3 text-2xl font-bold">{members.length}</p>
            <p className="text-sm text-gray-500">Discover profiles</p>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-white p-4">
            <Heart className="text-rose-500" size={23} />
            <p className="mt-3 text-2xl font-bold">{likedIds.length}</p>
            <p className="text-sm text-gray-500">Profiles you like</p>
          </div>

          <div className="col-span-2 rounded-2xl border border-rose-100 bg-white p-4 sm:col-span-1">
            <ShieldCheck className="text-rose-500" size={23} />
            <p className="mt-3 font-bold">Adults 18+</p>
            <p className="text-sm text-gray-500">
              Purposeful connections
            </p>
          </div>
        </section>

        {activeTab === "discover" && (
          <section>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-[3px] text-rose-500">
                  YOUR COMMUNITY
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold">
                  Discover people
                </h2>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm text-gray-500">
                <Search size={17} />
                <span>{members.length} profiles</span>
              </div>
            </div>

            {members.length === 0 ? (
              <div className="rounded-3xl border border-rose-100 bg-white p-10 text-center">
                <Heart className="mx-auto text-rose-400" size={40} />
                <h3 className="mt-4 text-xl font-bold">
                  Your community is growing
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  There are no other active member profiles to show yet.
                  Check back as new members join.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => {
                  const liked = likedIds.includes(member.id);

                  return (
                    <article
                      key={member.id}
                      className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm"
                    >
                      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-rose-200 to-orange-100">
                        {member.photoURL ? (
                          <img
                            src={member.photoURL}
                            alt={member.full_name || "Member"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/80 font-serif text-5xl text-slate-700">
                            {(member.full_name || "M")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-serif text-2xl font-bold">
                          {member.full_name || "Prominent Hearts Member"}
                        </h3>

                        {member.username && (
                          <p className="mt-1 text-sm text-rose-600">
                            @{member.username}
                          </p>
                        )}

                        {member.location && (
                          <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={16} />
                            {member.location}
                          </p>
                        )}

                        {member.relationship_intention && (
                          <span className="mt-3 inline-block rounded-full bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600">
                            {member.relationship_intention}
                          </span>
                        )}

                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                          {member.bio || "This member is getting started."}
                        </p>

                        <button
                          type="button"
                          onClick={() => toggleLike(member.id)}
                          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-bold ${
                            liked
                              ? "bg-rose-100 text-rose-700"
                              : "bg-rose-600 text-white hover:bg-rose-700"
                          }`}
                        >
                          <Heart
                            size={19}
                            fill={liked ? "currentColor" : "none"}
                          />
                          {liked ? "Liked" : "Like profile"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {activeTab === "likes" && (
          <section>
            <p className="text-xs font-bold tracking-[3px] text-rose-500">
              YOUR INTEREST
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold">
              Profiles you like
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {members
                .filter((member) => likedIds.includes(member.id))
                .map((member) => (
                  <div
                    key={member.id}
                    className="rounded-2xl border border-rose-100 bg-white p-5"
                  >
                    <h3 className="font-bold">
                      {member.full_name || "Member"}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {member.location || "Location not provided"}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleLike(member.id)}
                      className="mt-4 text-sm font-bold text-rose-600"
                    >
                      Remove like
                    </button>
                  </div>
                ))}
            </div>

            {likedIds.length === 0 && (
              <div className="mt-6 rounded-3xl border border-rose-100 bg-white p-10 text-center">
                <Heart className="mx-auto text-rose-400" size={40} />
                <h3 className="mt-4 text-xl font-bold">No likes yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Visit Discover and like profiles that interest you.
                </p>
                <button
                  type="button"
                  onClick={() => changeTab("discover")}
                  className="mt-5 rounded-full bg-rose-600 px-6 py-3 font-bold text-white"
                >
                  Discover profiles
                </button>
              </div>
            )}
          </section>
        )}

        {activeTab === "messages" && (
          <section>
            <p className="text-xs font-bold tracking-[3px] text-rose-500">
              CONVERSATIONS
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold">
              Messages
            </h2>

            <div className="mt-6 rounded-3xl border border-rose-100 bg-white p-10 text-center">
              <MessageCircle className="mx-auto text-rose-400" size={42} />
              <h3 className="mt-4 text-xl font-bold">
                Your conversations will appear here
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                The messaging system will be connected to member
                conversations in the next development stage.
              </p>
            </div>
          </section>
        )}

        {activeTab === "profile" && (
          <section>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-[3px] text-rose-500">
                  YOUR ACCOUNT
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold">
                  My Profile
                </h2>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 rounded-full border border-rose-200 bg-white px-5 py-3 text-sm font-bold text-rose-600"
                >
                  <Pencil size={17} />
                  Edit profile
                </button>
              )}
            </div>

            <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white">
              <div className="flex flex-col items-center bg-gradient-to-br from-[#651c3c] to-[#c65377] px-6 py-10 text-white">
                {profile?.photoURL ? (
                  <img
                    src={profile.photoURL}
                    alt={displayName}
                    className="h-28 w-28 rounded-full border-4 border-white/80 object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/80 bg-white/20 font-serif text-5xl">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}

                <h3 className="mt-4 font-serif text-2xl font-bold">
                  {displayName}
                </h3>

                <p className="mt-1 text-sm text-rose-100">
                  {user.email}
                </p>
              </div>

              <div className="p-6 sm:p-8">
                {editing ? (
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-bold">
                        Full name
                      </label>
                      <input
                        value={form.full_name}
                        onChange={(e) =>
                          setForm({ ...form, full_name: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold">
                        Username
                      </label>
                      <input
                        value={form.username}
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                        placeholder="Choose a username"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-400"
                      />
                      <p className="mt-1 text-xs text-gray-400">
                        3–30 characters. Letters, numbers and underscores.
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold">
                        Location
                      </label>
                      <input
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        placeholder="City or town"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold">
                        Relationship intention
                      </label>
                      <select
                        value={form.relationship_intention}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            relationship_intention: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-rose-400"
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
                      <label className="mb-2 block text-sm font-bold">
                        About me
                      </label>
                      <textarea
                        value={form.bio}
                        onChange={(e) =>
                          setForm({ ...form, bio: e.target.value })
                        }
                        placeholder="Tell other members about yourself..."
                        rows={5}
                        maxLength={1000}
                        className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-400"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={saveProfile}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-full bg-rose-600 px-7 py-3 font-bold text-white disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <Save size={18} />
                        )}
                        Save profile
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="rounded-full border border-gray-200 px-6 py-3 font-bold text-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Username
                      </p>
                      <p className="mt-1 font-semibold">
                        {profile?.username
                          ? `@${profile.username}`
                          : "Not set"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Location
                      </p>
                      <p className="mt-1 font-semibold">
                        {profile?.location || "Not added"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Relationship intention
                      </p>
                      <p className="mt-1 font-semibold">
                        {profile?.relationship_intention || "Not selected"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        About me
                      </p>
                      <p className="mt-1 leading-7 text-gray-600">
                        {profile?.bio || "Add a description about yourself."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white px-5 py-4 font-bold text-red-600 hover:bg-red-50"
            >
              <LogOut size={19} />
              Sign out
            </button>
          </section>
        )}
      </div>

      <nav
        aria-label="Member navigation"
        className="fixed bottom-0 left-0 right-0 z-[100] border-t border-rose-100 bg-white/95 shadow-[0_-5px_25px_rgba(80,20,40,0.08)] backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-xl grid-cols-4 px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => changeTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition ${
                  active
                    ? "text-rose-600"
                    : "text-slate-500 hover:bg-rose-50"
                }`}
              >
                <Icon
                  size={24}
                  strokeWidth={active ? 2.5 : 2}
                  fill={
                    active && tab.id === "likes"
                      ? "currentColor"
                      : "none"
                  }
                />
                <span className="text-[11px] font-semibold sm:text-xs">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}

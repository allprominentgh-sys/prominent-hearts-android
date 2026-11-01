import React, { useMemo, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

type Profile = {
  id: number;
  name: string;
  age: number;
  city: string;
  occupation: string;
  intention: string;
  about: string;
  initials: string;
};

const profiles: Profile[] = [
  {
    id: 1,
    name: "Abena",
    age: 28,
    city: "Accra",
    occupation: "Accountant",
    intention: "Marriage-minded",
    about: "Family values, kindness and meaningful conversations.",
    initials: "A"
  },
  {
    id: 2,
    name: "Kwame",
    age: 31,
    city: "Kumasi",
    occupation: "Engineer",
    intention: "Marriage-minded",
    about: "Enjoys learning, travel and building a purposeful life.",
    initials: "K"
  },
  {
    id: 3,
    name: "Esi",
    age: 26,
    city: "Tema",
    occupation: "Teacher",
    intention: "Long-term relationship",
    about: "Positive, thoughtful and passionate about education.",
    initials: "E"
  },
  {
    id: 4,
    name: "Nana",
    age: 33,
    city: "Cape Coast",
    occupation: "Business owner",
    intention: "Marriage-minded",
    about: "Values honesty, respect and commitment.",
    initials: "N"
  },
  {
    id: 5,
    name: "Akosua",
    age: 29,
    city: "Accra",
    occupation: "Nurse",
    intention: "Long-term relationship",
    about: "Warm-hearted, adventurous and close to family.",
    initials: "A"
  },
  {
    id: 6,
    name: "Kojo",
    age: 30,
    city: "Takoradi",
    occupation: "IT specialist",
    intention: "Marriage-minded",
    about: "Interested in friendship, faith and shared goals.",
    initials: "K"
  }
];

const ROSE = "#9D294F";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [liked, setLiked] = useState<number[]>([]);
  const [following, setFollowing] = useState<number[]>([]);
  const [tab, setTab] = useState("Discover");
  const [notice, setNotice] = useState("");

  const visibleProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesSearch = [
        profile.name,
        profile.city,
        profile.occupation
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        profile.intention === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  function toggleLike(id: number) {
    setLiked((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function toggleFollow(id: number) {
    setFollowing((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function renderProfiles() {
    let selected = visibleProfiles;

    if (tab === "Likes") {
      selected = profiles.filter((p) => liked.includes(p.id));
    }

    if (tab === "Following") {
      selected = profiles.filter((p) =>
        following.includes(p.id)
      );
    }

    if (tab === "Messages" || tab === "My profile") {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            {tab === "Messages"
              ? "Your conversations"
              : "Create your profile"}
          </Text>

          <Text style={styles.description}>
            {tab === "Messages"
              ? "Secure private messaging will be connected in the next development stage."
              : "Profile registration and verification will be added in the next development stage."}
          </Text>
        </View>
      );
    }

    if (selected.length === 0) {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            No profiles found
          </Text>
          <Text style={styles.description}>
            Try changing your search or filters.
          </Text>
        </View>
      );
    }

    return selected.map((profile) => (
      <View style={styles.card} key={profile.id}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.initials}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {profile.name}, {profile.age}
            </Text>

            <Text style={styles.meta}>
              {profile.city} · {profile.occupation}
            </Text>

            <Text style={styles.intention}>
              {profile.intention}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>
          {profile.about}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => toggleLike(profile.id)}
          >
            <Text style={styles.actionText}>
              {liked.includes(profile.id)
                ? "♥ Liked"
                : "♡ Like"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.action}
            onPress={() => toggleFollow(profile.id)}
          >
            <Text style={styles.actionText}>
              {following.includes(profile.id)
                ? "Following"
                : "Follow"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.messageButton}
            onPress={() =>
              setNotice(
                "Messaging is currently a demonstration only."
              )
            }
          >
            <Text style={styles.messageText}>
              Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF9FA"
      />

      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>
              Prominent Hearts
            </Text>

            <Text style={styles.tagline}>
              Meaningful connections. Lasting love.
            </Text>
          </View>

          <View style={styles.logo}>
            <Text style={styles.logoText}>♥</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>
            A COMMUNITY FOR PURPOSEFUL LOVE
          </Text>

          <Text style={styles.heroTitle}>
            Meet someone who shares your values.
          </Text>

          <Text style={styles.heroDescription}>
            Discover adults looking for genuine and
            respectful relationships in Ghana.
          </Text>
        </View>

        <TextInput
          style={styles.search}
          placeholder="Search name, city or occupation"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />

        <Text style={styles.sectionTitle}>
          Relationship intention
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
        >
          {[
            "All",
            "Marriage-minded",
            "Long-term relationship"
          ].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.filter,
                filter === item && styles.filterActive
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item &&
                    styles.filterTextActive
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {tab === "Discover"
              ? "People to discover"
              : tab}
          </Text>

          <Text style={styles.count}>
            {visibleProfiles.length} profiles
          </Text>
        </View>

        {notice !== "" && (
          <Text style={styles.notice}>
            {notice}
          </Text>
        )}

        {renderProfiles()}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>
            Adults only — 18+
          </Text>

          <Text style={styles.disclaimerText}>
            Prominent Hearts is intended for adults aged
            18 and above. These profiles are demonstration
            data. Likes and follows are temporary local
            interactions. Messages are not sent and no
            payments are collected.
          </Text>
        </View>

        <Text style={styles.footer}>
          Prominent Hearts
          {"\n"}
          All Prominent Ghana Limited
        </Text>
      </ScrollView>

      <View style={styles.navigation}>
        {[
          "Discover",
          "Likes",
          "Following",
          "Messages",
          "My profile"
        ].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.navItem}
            onPress={() => {
              setTab(item);
              setNotice("");
            }}
          >
            <Text
              style={[
                styles.navText,
                tab === item && styles.navActive
              ]}
            >
              {item === "Discover"
                ? "⌕"
                : item === "Likes"
                ? "♥"
                : item === "Following"
                ? "♡"
                : item === "Messages"
                ? "✉"
                : "●"}
            </Text>

            <Text
              style={[
                styles.navLabel,
                tab === item && styles.navActive
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF9FA"
  },

  container: {
    padding: 20,
    paddingBottom: 110
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  brand: {
    color: ROSE,
    fontSize: 24,
    fontWeight: "800"
  },

  tagline: {
    color: "#77717A",
    fontSize: 12,
    marginTop: 4
  },

  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F6E1E8",
    alignItems: "center",
    justifyContent: "center"
  },

  logoText: {
    color: ROSE,
    fontSize: 25
  },

  hero: {
    backgroundColor: "#F5E5EA",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18
  },

  eyebrow: {
    color: ROSE,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1
  },

  heroTitle: {
    color: "#321C26",
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "800",
    marginTop: 10
  },

  heroDescription: {
    color: "#65515A",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8
  },

  search: {
    backgroundColor: "#FFFFFF",
    borderColor: "#EADDE2",
    borderWidth: 1,
    borderRadius: 13,
    padding: 14,
    color: "#30242A",
    marginBottom: 18
  },

  sectionTitle: {
    color: "#33242B",
    fontSize: 17,
    fontWeight: "800"
  },

  filters: {
    marginTop: 12,
    marginBottom: 14
  },

  filter: {
    borderWidth: 1,
    borderColor: "#E5D4DB",
    borderRadius: 22,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: "#FFFFFF"
  },

  filterActive: {
    backgroundColor: ROSE,
    borderColor: ROSE
  },

  filterText: {
    color: "#65515A",
    fontSize: 12,
    fontWeight: "600"
  },

  filterTextActive: {
    color: "#FFFFFF"
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12
  },

  count: {
    color: "#77717A",
    fontSize: 12
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F0E3E8",
    padding: 15,
    marginBottom: 13
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center"
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F2D9E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },

  avatarText: {
    color: ROSE,
    fontSize: 24,
    fontWeight: "800"
  },

  name: {
    color: "#30212A",
    fontSize: 17,
    fontWeight: "800"
  },

  meta: {
    color: "#77717A",
    fontSize: 12,
    marginTop: 3
  },

  intention: {
    color: ROSE,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 5
  },

  description: {
    color: "#65515A",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 13
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14
  },

  action: {
    borderWidth: 1,
    borderColor: "#E8D6DE",
    borderRadius: 10,
    padding: 9,
    marginRight: 7
  },

  actionText: {
    color: ROSE,
    fontSize: 11,
    fontWeight: "700"
  },

  messageButton: {
    backgroundColor: ROSE,
    borderRadius: 10,
    padding: 10,
    marginLeft: "auto"
  },

  messageText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800"
  },

  empty: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: "#F0E3E8",
    marginBottom: 16
  },

  emptyTitle: {
    color: "#30212A",
    fontWeight: "800",
    fontSize: 16
  },

  notice: {
    backgroundColor: "#F6E1E8",
    color: ROSE,
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 12
  },

  disclaimer: {
    backgroundColor: "#F5E5EA",
    borderRadius: 14,
    padding: 15,
    marginTop: 8
  },

  disclaimerTitle: {
    color: ROSE,
    fontWeight: "800",
    fontSize: 13
  },

  disclaimerText: {
    color: "#65515A",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5
  },

  footer: {
    color: "#77717A",
    textAlign: "center",
    fontSize: 10,
    marginTop: 18
  },

  navigation: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EADDE2",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 20
  },

  navItem: {
    alignItems: "center",
    minWidth: 55
  },

  navText: {
    color: "#9B8C93",
    fontSize: 19,
    fontWeight: "800"
  },

  navLabel: {
    color: "#9B8C93",
    fontSize: 9,
    marginTop: 3
  },

  navActive: {
    color: ROSE,
    fontWeight: "800"
  }
});

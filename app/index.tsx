
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
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
    id: 1, name: "Abena", age: 28, city: "Accra",
    occupation: "Accountant", intention: "Marriage-minded",
    about: "Family values, kindness and meaningful conversations.",
    initials: "A"
  },
  {
    id: 2, name: "Kwame", age: 31, city: "Kumasi",
    occupation: "Engineer", intention: "Marriage-minded",
    about: "Enjoys learning, travel and building a purposeful life.",
    initials: "K"
  },
  {
    id: 3, name: "Esi", age: 26, city: "Tema",
    occupation: "Teacher", intention: "Long-term relationship",
    about: "Positive, thoughtful and passionate about education.",
    initials: "E"
  },
  {
    id: 4, name: "Nana", age: 33, city: "Cape Coast",
    occupation: "Business owner", intention: "Marriage-minded",
    about: "Values honesty, respect and commitment.",
    initials: "N"
  },
  {
    id: 5, name: "Akosua", age: 29, city: "Accra",
    occupation: "Nurse", intention: "Long-term relationship",
    about: "Warm-hearted, adventurous and close to family.",
    initials: "A"
  },
  {
    id: 6, name: "Kojo", age: 30, city: "Takoradi",
    occupation: "IT specialist", intention: "Marriage-minded",
    about: "Interested in friendship, faith and shared goals.",
    initials: "K"
  }
];

const ROSE = "#9D294F";

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [liked, setLiked] = useState<number[]>([]);
  const [following, setFollowing] = useState<number[]>([]);
  const [tab, setTab] = useState("Discover");
  const [notice, setNotice] = useState("");

  // Public marriage profile
  const [supportsAgreement, setSupportsAgreement] =
    useState(true);

  // Private agreement details
  const [partyA, setPartyA] = useState("");
  const [partyB, setPartyB] = useState("");
  const [jurisdiction, setJurisdiction] = useState("Ghana");
  const [propertyA, setPropertyA] = useState("");
  const [propertyB, setPropertyB] = useState("");
  const [businessA, setBusinessA] = useState("");
  const [businessB, setBusinessB] = useState("");
  const [landA, setLandA] = useState("");
  const [landB, setLandB] = useState("");
  const [debtsA, setDebtsA] = useState("");
  const [debtsB, setDebtsB] = useState("");
  const [financialTerms, setFinancialTerms] = useState("");
  const [expenseArrangement, setExpenseArrangement] = useState("");
  const [disputeResolution, setDisputeResolution] = useState("");
  const [shareConsent, setShareConsent] = useState(false);
  const [legalAdvice, setLegalAdvice] = useState(false);

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

  function saveDraft() {
    Alert.alert(
      "Draft prepared",
      "Your agreement details are currently held in this app session. Permanent secure storage will be connected in a future development stage."
    );
  }

  function shareAgreement() {
    if (!shareConsent) {
      Alert.alert(
        "Consent required",
        "Please confirm that you voluntarily consent to sharing this agreement."
      );
      return;
    }

    Alert.alert(
      "Sharing not yet connected",
      "Your consent has been recorded for this session. Secure private sharing will be implemented after authentication and database integration. No financial information has been sent."
    );
  }

  function renderMarriageAgreement() {
    return (
      <View>
        <View style={styles.marriageHero}>
          <Text style={styles.eyebrow}>
            PROMINENT HEARTS MARRIAGE PROFILE
          </Text>
          <Text style={styles.marriageHeroTitle}>
            Marriage Agreement
          </Text>
          <Text style={styles.description}>
            Transparency, understanding and financial
            expectations before marriage.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Public marriage profile
          </Text>

          <Text style={styles.description}>
            Let other members know your position on
            premarital agreements without revealing
            your private financial information.
          </Text>

          <View style={styles.publicStatus}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                Supports marriage agreements
              </Text>
              <Text style={styles.meta}>
                Visible to other members
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                setSupportsAgreement(!supportsAgreement)
              }
              style={[
                styles.switchButton,
                supportsAgreement && styles.switchOn
              ]}
            >
              <Text style={styles.switchText}>
                {supportsAgreement ? "ON" : "OFF"}
              </Text>
            </TouchableOpacity>
          </View>

          {supportsAgreement && (
            <View style={styles.publicBadge}>
              <Text style={styles.publicBadgeText}>
                ♥ Supports premarital agreements
              </Text>
            </View>
          )}

          <Text style={styles.smallNote}>
            Public members cannot see your assets,
            account details, business valuations,
            debts or private agreement.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Private agreement
          </Text>

          <Text style={styles.description}>
            Complete the following sections privately.
            Only share with a prospective spouse with
            your explicit consent.
          </Text>

          <Text style={styles.formSection}>
            1. Parties to the agreement
          </Text>

          <Field
            label="Full legal name — Party A"
            value={partyA}
            onChange={setPartyA}
            placeholder="Enter full legal name"
          />

          <Field
            label="Full legal name — Party B"
            value={partyB}
            onChange={setPartyB}
            placeholder="Enter full legal name"
          />

          <Field
            label="Governing jurisdiction"
            value={jurisdiction}
            onChange={setJurisdiction}
            placeholder="e.g. Republic of Ghana"
          />

          <Text style={styles.formSection}>
            2. Separate property
          </Text>

          <Field
            label="Party A — Pre-existing assets"
            value={propertyA}
            onChange={setPropertyA}
            placeholder="Describe property and assets"
            multiline
          />

          <Field
            label="Party B — Pre-existing assets"
            value={propertyB}
            onChange={setPropertyB}
            placeholder="Describe property and assets"
            multiline
          />

          <Text style={styles.formSection}>
            3. Business ownership and investments
          </Text>

          <Field
            label="Party A — Businesses and interests"
            value={businessA}
            onChange={setBusinessA}
            placeholder="List business interests and investments"
            multiline
          />

          <Field
            label="Party B — Businesses and interests"
            value={businessB}
            onChange={setBusinessB}
            placeholder="List business interests and investments"
            multiline
          />

          <Text style={styles.formSection}>
            4. Land and real estate
          </Text>

          <Field
            label="Party A — Property and land"
            value={landA}
            onChange={setLandA}
            placeholder="Describe land and real estate"
            multiline
          />

          <Field
            label="Party B — Property and land"
            value={landB}
            onChange={setLandB}
            placeholder="Describe land and real estate"
            multiline
          />

          <Text style={styles.formSection}>
            5. Financial liabilities
          </Text>

          <Field
            label="Party A — Existing debts and liabilities"
            value={debtsA}
            onChange={setDebtsA}
            placeholder="Disclose loans and liabilities"
            multiline
          />

          <Field
            label="Party B — Existing debts and liabilities"
            value={debtsB}
            onChange={setDebtsB}
            placeholder="Disclose loans and liabilities"
            multiline
          />

          <Text style={styles.formSection}>
            6. Financial expectations during marriage
          </Text>

          <Field
            label="Joint and separate financial arrangements"
            value={financialTerms}
            onChange={setFinancialTerms}
            placeholder="Describe agreed financial arrangements"
            multiline
          />

          <Field
            label="Household expenses and contributions"
            value={expenseArrangement}
            onChange={setExpenseArrangement}
            placeholder="Describe how household expenses will be shared"
            multiline
          />

          <Text style={styles.formSection}>
            7. Dispute resolution
          </Text>

          <Field
            label="Preferred mediation and dispute arrangements"
            value={disputeResolution}
            onChange={setDisputeResolution}
            placeholder="Describe proposed dispute resolution"
            multiline
          />

          <Text style={styles.formSection}>
            8. Legal review and consent
          </Text>

          <TouchableOpacity
            style={styles.consentRow}
            onPress={() => setLegalAdvice(!legalAdvice)}
          >
            <Text style={styles.consentCheck}>
              {legalAdvice ? "☑" : "☐"}
            </Text>
            <Text style={styles.consentText}>
              I acknowledge the importance of obtaining
              independent legal advice before signing.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consentRow}
            onPress={() => setShareConsent(!shareConsent)}
          >
            <Text style={styles.consentCheck}>
              {shareConsent ? "☑" : "☐"}
            </Text>
            <Text style={styles.consentText}>
              I voluntarily consent to sharing my
              agreement with my selected prospective
              spouse when secure sharing becomes available.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={saveDraft}
          >
            <Text style={styles.primaryButtonText}>
              Save agreement draft
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={shareAgreement}
          >
            <Text style={styles.secondaryButtonText}>
              Request private sharing
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.warning}>
          <Text style={styles.warningTitle}>
            Important legal notice
          </Text>
          <Text style={styles.warningText}>
            This is a discussion and drafting template,
            not a legal opinion or automatically
            enforceable marriage contract. Laws governing
            marriage, property and agreements must be
            reviewed by a qualified lawyer in the
            applicable jurisdiction. Both parties should
            obtain independent legal advice and make
            full financial disclosure. Do not sign
            under pressure.
          </Text>
        </View>
      </View>
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
              : "Your marriage profile"}
          </Text>

          <Text style={styles.description}>
            {tab === "Messages"
              ? "Secure private messaging will be connected in the next development stage."
              : "Your public marriage-agreement preference can be managed in the Marriage Agreement section."}
          </Text>

          {tab === "My profile" && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setTab("Marriage Agreement")}
            >
              <Text style={styles.primaryButtonText}>
                Open marriage agreement
              </Text>
            </TouchableOpacity>
          )}
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

        {supportsAgreement &&
          profile.intention === "Marriage-minded" && (
            <Text style={styles.publicBadgeText}>
              ♥ Supports marriage agreements
            </Text>
          )}
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
        keyboardShouldPersistTaps="handled"
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

        {tab === "Marriage Agreement" ? (
          renderMarriageAgreement()
        ) : (
          <>
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

            <TouchableOpacity
              style={styles.marriageLink}
              onPress={() => setTab("Marriage Agreement")}
            >
              <Text style={styles.marriageLinkTitle}>
                ♥ Marriage Agreement
              </Text>
              <Text style={styles.marriageLinkDescription}>
                Set your public preference and prepare
                a private premarital agreement.
              </Text>
              <Text style={styles.linkText}>
                Open agreement →
              </Text>
            </TouchableOpacity>

            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerTitle}>
                Adults only — 18+
              </Text>
              <Text style={styles.disclaimerText}>
                These profiles are demonstration data.
                Likes and follows are temporary local
                interactions. Messages are not sent and
                no payments are collected.
              </Text>
            </View>

            <Text style={styles.footer}>
              Prominent Hearts{"\n"}
              All Prominent Ghana Limited
            </Text>
          </>
        )}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.navigation}
        contentContainerStyle={styles.navigationContent}
      >
        {[
          "Discover",
          "Likes",
          "Following",
          "Messages",
          "My profile",
          "Marriage Agreement"
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
              {item === "Discover" ? "⌕" :
               item === "Likes" ? "♥" :
               item === "Following" ? "♡" :
               item === "Messages" ? "✉" :
               item === "My profile" ? "●" : "⚖"}
            </Text>
            <Text
              style={[
                styles.navLabel,
                tab === item && styles.navActive
              ]}
            >
              {item === "Marriage Agreement" ? "Marriage" : item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingBottom: 115
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
    borderTopColor: "#EADDE2"
  },
  navigationContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 5
  },
  navItem: {
    alignItems: "center",
    minWidth: 68,
    paddingHorizontal: 5
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
  },
  marriageHero: {
    backgroundColor: "#F5E5EA",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15
  },
  marriageHeroTitle: {
    color: "#321C26",
    fontSize: 27,
    fontWeight: "800",
    marginTop: 10
  },
  cardTitle: {
    color: "#30212A",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8
  },
  publicStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  },
  switchButton: {
    backgroundColor: "#999",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20
  },
  switchOn: {
    backgroundColor: ROSE
  },
  switchText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 11
  },
  publicBadge: {
    backgroundColor: "#F8E8EE",
    padding: 12,
    borderRadius: 10,
    marginTop: 14
  },
  publicBadgeText: {
    color: ROSE,
    fontWeight: "700",
    fontSize: 12,
    marginTop: 8
  },
  smallNote: {
    color: "#77717A",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 12
  },
  formSection: {
    color: ROSE,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 24,
    marginBottom: 12
  },
  field: {
    marginBottom: 14
  },
  fieldLabel: {
    color: "#43323A",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 7
  },
  input: {
    backgroundColor: "#FFFCFD",
    borderColor: "#EADDE2",
    borderWidth: 1,
    borderRadius: 11,
    padding: 13,
    color: "#30212A",
    minHeight: 48,
    fontSize: 13
  },
  multiline: {
    minHeight: 90,
    paddingTop: 12
  },
  consentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14
  },
  consentCheck: {
    color: ROSE,
    fontSize: 22,
    marginRight: 10
  },
  consentText: {
    flex: 1,
    color: "#65515A",
    fontSize: 12,
    lineHeight: 19,
    paddingTop: 3
  },
  primaryButton: {
    backgroundColor: ROSE,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 20
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13
  },
  secondaryButton: {
    borderColor: ROSE,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 10
  },
  secondaryButtonText: {
    color: ROSE,
    fontWeight: "800",
    fontSize: 13
  },
  warning: {
    backgroundColor: "#FFF0E5",
    borderRadius: 14,
    padding: 15,
    marginTop: 15
  },
  warningTitle: {
    color: "#9A4D19",
    fontWeight: "800",
    fontSize: 14
  },
  warningText: {
    color: "#704A32",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 8
  },
  marriageLink: {
    backgroundColor: "#F5E5EA",
    borderRadius: 16,
    padding: 17,
    marginTop: 16,
    marginBottom: 15
  },
  marriageLinkTitle: {
    color: ROSE,
    fontSize: 17,
    fontWeight: "800"
  },
  marriageLinkDescription: {
    color: "#65515A",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7
  },
  linkText: {
    color: ROSE,
    fontWeight: "800",
    marginTop: 12,
    fontSize: 12
  }
});

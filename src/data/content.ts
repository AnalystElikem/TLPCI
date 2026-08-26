export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "#",
    children: [
      { label: "Our Story", href: "/about/our-story" },
      { label: "What We Believe", href: "/about/what-we-believe" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Education", href: "/about/education" },
      { label: "Healing Station", href: "/about/healing-station" },
    ],
  },
  {
    label: "Churches",
    href: "#",
    children: [
      { label: "Find a Church", href: "/churches/find" },
      { label: "Our Ministers", href: "/churches/pastors" },
    ],
  },
  {
    label: "Ministries",
    href: "#",
    children: [
      { label: "Men", href: "/ministries/men" },
      { label: "Women", href: "/ministries/women" },
      { label: "Youth", href: "/ministries/youth" },
      { label: "Students", href: "/ministries/students" },
      { label: "Children", href: "/ministries/children" },
      { label: "Missions", href: "/ministries/missions" },
      { label: "Music", href: "/ministries/music" },
      { label: "Deacons & Deaconesses", href: "/ministries/deacons" },
    ],
  },
  {
    label: "Media",
    href: "#",
    children: [
      { label: "Sermons", href: "/media/sermons" },
      { label: "Devotions", href: "/media/devotions" },
      { label: "Testimonies", href: "/media/testimonies" },
      { label: "Gallery", href: "/media/gallery" },
      { label: "Livestream", href: "/media/livestream" },
    ],
  },
  {
    label: "News & Events",
    href: "#",
    children: [
      { label: "Blog", href: "/news-events/blog" },
      { label: "Events", href: "/news-events/events" },
    ],
  },
  {
    label: "Get Involved",
    href: "#",
    children: [
      { label: "Plan Your Visit", href: "/get-involved/plan-your-visit#plan-visit" },
      { label: "Membership", href: "/get-involved/membership" },
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Prayer Request", href: "/get-involved/prayer-request" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const sermons = [
  {
    id: 1,
    title: "Divine Guidance towards the Glorious Destination",
    date: "Jul 6, 2026",
    category: "Sunday Service",
    speaker: "Pastor John Adeyemi",
    scripture: "Psalm 32:8",
    duration: "48 min",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80",
  },
  {
    id: 2,
    title: "Knowing God More and More for Extraordinary Exploits",
    date: "Jul 6, 2026",
    category: "Bible Study",
    speaker: "Pastor Michael Okafor",
    scripture: "Philippians 3:10",
    duration: "52 min",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80",
  },
  {
    id: 3,
    title: "Permanent Freedom through Sustained Faith",
    date: "Jul 5, 2026",
    category: "Revival Service",
    speaker: "Pastor Daniel Adebayo",
    scripture: "John 8:36",
    duration: "55 min",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
  },
  {
    id: 4,
    title: "Walking in the Spirit Daily",
    date: "Jun 29, 2026",
    category: "Sunday Service",
    speaker: "Pastor John Adeyemi",
    scripture: "Galatians 5:16",
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
  },
  {
    id: 5,
    title: "The Power of Corporate Prayer",
    date: "Jun 25, 2026",
    category: "Prayer Meeting",
    speaker: "Pastor Grace Okonkwo",
    scripture: "Acts 4:31",
    duration: "38 min",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80",
  },
  {
    id: 6,
    title: "Raising Disciples Who Make Disciples",
    date: "Jun 22, 2026",
    category: "Bible Study",
    speaker: "Pastor Samuel Mensah",
    scripture: "Matthew 28:19-20",
    duration: "50 min",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&q=80",
  },
];

export const galleryAlbums = [
  {
    slug: "sunday-worship",
    title: "Sunday Worship",
    category: "Worship",
    date: "Jul 2026",
    description:
      "Moments from our Sunday gatherings — worship, the Word, and fellowship.",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=900&q=80",
    tall: false,
    photos: [
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80",
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1200&q=80",
    ],
  },
  {
    slug: "baptism-service",
    title: "Baptism Service",
    category: "Sacraments",
    date: "Jun 2026",
    description: "Celebrating new believers as they take the step of baptism.",
    image:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=80",
    tall: true,
    photos: [
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80",
      "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1200&q=80",
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80",
    ],
  },
  {
    slug: "youth-fellowship",
    title: "Youth Fellowship",
    category: "Youth",
    date: "Jun 2026",
    description: "Youth nights filled with worship, teaching, and friendship.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    tall: false,
    photos: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1200&q=80",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&q=80",
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&q=80",
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
    ],
  },
  {
    slug: "bible-study",
    title: "Bible Study",
    category: "Teaching",
    date: "May 2026",
    description: "Midweek gatherings around the Word of God.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=80",
    tall: false,
    photos: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1200&q=80",
    ],
  },
  {
    slug: "childrens-day",
    title: "Children's Day",
    category: "Children",
    date: "May 2026",
    description: "A joyful celebration with our children and families.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80",
    tall: true,
    photos: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1200&q=80",
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=1200&q=80",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80",
    ],
  },
  {
    slug: "outreach",
    title: "Outreach",
    category: "Missions",
    date: "Apr 2026",
    description: "Taking the gospel into the streets and communities we serve.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=80",
    tall: false,
    photos: [
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1200&q=80",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80",
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&q=80",
    ],
  },
  {
    slug: "praise-night",
    title: "Praise Night",
    category: "Worship",
    date: "Apr 2026",
    description: "An evening of praise, worship, and thanksgiving.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80",
    tall: false,
    photos: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80",
    ],
  },
  {
    slug: "convention",
    title: "Convention",
    category: "Events",
    date: "Mar 2026",
    description: "Highlights from our annual convention gatherings.",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=900&q=80",
    tall: false,
    photos: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
    ],
  },
  {
    slug: "womens-meeting",
    title: "Women's Meeting",
    category: "Fellowship",
    date: "Mar 2026",
    description: "Sisters gathered for prayer, Word, and encouragement.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80",
    tall: false,
    photos: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
    ],
  },
];

export function getGalleryAlbum(slug: string) {
  return galleryAlbums.find((album) => album.slug === slug);
}

export const events = [
  {
    id: 1,
    title: "Workers' Training",
    date: "Jul 11",
    time: "5:00 pm",
    location: "Headquarters, Kwashieman",
    category: "Training",
    description:
      "Equipping workers and volunteers for effective service across all departments.",
  },
  {
    id: 2,
    title: "Sunday Worship Service",
    date: "Jul 12",
    time: "8:00 am",
    location: "All branches",
    category: "Worship",
    description:
      "Spirit-filled worship, the Word, and fellowship — everyone is welcome.",
  },
  {
    id: 3,
    title: "Monday Bible Study",
    date: "Jul 13",
    time: "6:00 pm",
    location: "All branches",
    category: "Teaching",
    description:
      "Midweek study through the Scriptures with practical application for daily life.",
  },
  {
    id: 4,
    title: "Leadership Development",
    date: "Jul 14",
    time: "6:30 pm – 8:30 pm",
    location: "Headquarters, Kwashieman",
    category: "Training",
    description:
      "Raising and refreshing leaders for the work of the ministry.",
  },
  {
    id: 5,
    title: "Youth Camp 2026",
    date: "Aug 7",
    time: "3-day camp",
    location: "Camp grounds, Lagos",
    category: "Youth",
    description:
      "A three-day residential camp for young people focused on faith and purpose.",
  },
  {
    id: 6,
    title: "Annual Convention",
    date: "Sep 14",
    time: "All week",
    location: "Headquarters, Kwashieman",
    category: "Convention",
    description:
      "Our biggest gathering of the year — a full week of worship, teaching, and fellowship.",
  },
];

export const publications = [
  {
    id: 1,
    title: "Daily Manna",
    description: "Daily devotionals for spiritual growth and strength.",
    date: "Jul 2026",
    href: "/media/sermons",
  },
  {
    id: 2,
    title: "Higher Everyday",
    description: "Devotional guide for youth and young adults.",
    date: "Jul 2026",
    href: "/media/sermons",
  },
  {
    id: 3,
    title: "Faith Digest",
    description: "Teachings and insights for victorious Christian living.",
    date: "Jun 2026",
    href: "/media/sermons",
  },
  {
    id: 4,
    title: "Gospel Outlook",
    description: "Tracts and publications for evangelism and discipleship.",
    date: "Jun 2026",
    href: "/media/sermons",
  },
];

export const featureCards = [
  {
    title: "Retreats & Conferences",
    description: "Access free Retreat Sermons & Resources",
    href: "/news-events/events",
    icon: "calendar",
  },
  {
    title: "Daily Devotional",
    description: "Grow through daily personal bible study",
    href: "/media/sermons",
    icon: "book-open",
  },
  {
    title: "Prayer Request Hub",
    description: "Submit your prayer request and see God work",
    href: "/get-involved/prayer-request",
    icon: "heart",
  },
  {
    title: "Books and Publications",
    description: "Resources for achieving all-round fulfillment",
    href: "/media/sermons",
    icon: "library",
  },
];

export const newsItems = [
  {
    id: 1,
    title: "Annual Convention Announced",
    date: "Jul 8, 2026",
    category: "Announcement",
    excerpt:
      "Join us for a powerful week of worship, teaching, and fellowship at our annual convention. Registration opens across all branches this month.",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&q=80",
  },
  {
    id: 2,
    title: "New Branch Opens in Accra",
    date: "Jul 2, 2026",
    category: "Church News",
    excerpt:
      "We praise God for the opening of a new branch to serve families across the city.",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80",
  },
  {
    id: 3,
    title: "Youth Camp Registration Open",
    date: "Jun 28, 2026",
    category: "Youth",
    excerpt:
      "Young people are invited to register for this year's youth camp focused on faith and purpose.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
  },
  {
    id: 4,
    title: "Baptism Service This Month",
    date: "Jun 20, 2026",
    category: "Sacraments",
    excerpt:
      "New believers who have completed the baptism class are invited to take this step of faith.",
    image:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
  },
  {
    id: 5,
    title: "Missions Update: Outreach Testimonies",
    date: "Jun 12, 2026",
    category: "Missions",
    excerpt:
      "Testimonies from recent street outreaches — souls won and lives touched by the gospel.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
  },
];

// The General Overseer's full profile.
export const generalOverseer = {
  name: "Apostle Eric Essandoh Anim Otoo",
  role: "General Overseer",
  image: "/images/leadership/general-overseer.jpg",
  spouse: "Juliet",
  book: "My Life, My Purpose, His Glory",
  bio: [
    "Apostle Eric Essandoh Anim Otoo is the General Overseer of The Lord's Pentecostal Church International. He is blessed with the grace of teaching the Word of God with a remarkable acumen, and is known in some quarters for the gift of healing and the discernment of spirits.",
    "He was called into ministry in 2002 and has since served in many positions within The Lord's Pentecostal Church International, including General Secretary, Students' Pastor, Youth Pastor, and Secretary to the Ministers and Spouses' Association, among others. Before his election as General Overseer, he served as a member of the National Executive Council of the church for ten years.",
    "He is the author of the book My Life, My Purpose, His Glory.",
    "He holds a Diploma in Biblical Studies (CLBTS & ISOM), a Bachelor's Degree in Theology from Trinity Theological Seminary, Accra-Legon, and an M.Phil in Religious Studies from the University of Ghana, Legon.",
    "He is married to Juliet, and together they are blessed with three children: Nhyira, Aseda, and Kristodea Essandoh Otoo.",
  ],
  education: [
    "Diploma in Biblical Studies — CLBTS & ISOM",
    "B.A. Theology — Trinity Theological Seminary, Accra-Legon",
    "M.Phil Religious Studies — University of Ghana, Legon",
  ],
};

// The Executive Council — the governing body of the church, excluding the
// General Overseer (featured separately). Add `image` and `name` as they
// become available; an empty image shows a placeholder.
export const executiveCouncil = [
  { name: "Apostle Paul Sowu", role: "General Secretary", image: "" },
  { name: "Apostle David L. Dzeble", role: "Director of Missions", image: "" },
  { name: "Rev. Emmanuel Bable", role: "Director of Operations", image: "" },
  { name: "Apostle Prosper Adompreh", role: "Pastors' Rep", image: "" },
  { name: "Rev. Michael Nyumutsu", role: "Pastors' Rep", image: "" },
  { name: "Apostle Dr. David Khorbs", role: "Director of Christian Education", image: "" },
  { name: "Mrs. Victoria Nipah", role: "Director of Finance", image: "" },
  { name: "Rev. Cosmos Bedzra", role: "Director of Development Projects", image: "" },
  { name: "Dr. (Deacon) Peter Agbaxode", role: "Council Member", image: "" },
  { name: "Dr. Mrs. (Dcns) Amewu Attah", role: "Council Member", image: "" },
  { name: "Dcns. Mrs. Evelyn Kelvis", role: "Council Member", image: "" },
  { name: "Deacon James Obeng", role: "Council Member", image: "" },
];

// Past General Overseers and their tenures.
export const pastOverseers = [
  {
    name: "Apostle John Sam Amedzro",
    note: "Founder & First General Overseer",
    tenure: "1961 – 1972",
    image: "/images/leadership/past-overseers/amedzro.jpg",
  },
  {
    name: "Apostle Emmanuel Wuaku",
    note: "Second General Overseer",
    tenure: "1972 – 1993",
    image: "/images/leadership/past-overseers/wuaku.jpg",
  },
  {
    name: "Apostle John Timpo",
    note: "Third General Overseer",
    tenure: "1994 – 2004",
    image: "/images/leadership/past-overseers/timpo.jpg",
  },
  {
    name: "Apostle Richard Buafor",
    note: "Fourth General Overseer",
    tenure: "2005 – 2020",
    image: "/images/leadership/past-overseers/buafor.jpg",
  },
];

export const timeline = [
  {
    year: "1998",
    title: "The Beginning",
    text: "A small fellowship of believers gathered for prayer and Bible study, seeking God's direction for a Holy Spirit–led church.",
  },
  {
    year: "2005",
    title: "First Sanctuary",
    text: "The church dedicated its first permanent place of worship and began regular Sunday and midweek services.",
  },
  {
    year: "2014",
    title: "Branch Expansion",
    text: "New congregations were planted in other cities as souls were won and leaders were raised for ministry.",
  },
  {
    year: "2024",
    title: "Growing Nations",
    text: "Today the work continues across cities and nations with a renewed focus on discipleship and missions.",
  },
];

// Basis of Faith — the doctrinal basis of the Church as stated in its
// constitution: the fundamental truths of Christianity revealed in Scripture.
export const basisOfFaith = [
  {
    text: "The Sovereignty of God in Creation, Revelation, Redemption and Final Judgement.",
    refs: "Psalm 148:5; Romans 11:36; Ephesians 3:9",
  },
  {
    text: "The Trinity, that is the Unity of the Father, the Son and the Holy Spirit in the Godhead.",
    refs: "Matthew 28:19; John 14:26; 2 Corinthians 13:14",
  },
  {
    text: "The divine inspiration and the infallibility of the Holy Scriptures as originally given, and its supreme authority in all matters of Faith and Conduct.",
    refs: "2 Timothy 3:16-17; 2 Peter 1:21; 1 Corinthians 2:13",
  },
  {
    text: "The universal sinfulness and guilt of man since the fall, rendering man subject to God's wrath and condemnation.",
    refs: "Romans 3:23; Galatians 3:22; 1 John 1:8",
  },
  {
    text: "The conception of Jesus Christ our Lord by the Holy Spirit, born of the Virgin Mary, very God and very Man.",
    refs: "Luke 1:26-35; John 1:14-18; Isaiah 7:14; Isaiah 9:6",
  },
  {
    text: "Redemption of man from the power, guilt and penalty of sin through the sacrificial death of Jesus Christ; the baptism of the believer by immersion and justification by faith in Jesus Christ.",
    refs: "2 Corinthians 5:21; Romans 5:1-3; Galatians 3:13; Ephesians 2:8-9",
  },
  {
    text: "The Sacrament of the Holy Communion or the Lord's Supper.",
    refs: "Matthew 26:26-29; Mark 14:22-25; Luke 22:19-20; 1 Corinthians 11:23-32",
  },
  {
    text: "The death of Jesus Christ and His resurrection from the dead and ascension.",
    refs: "1 Corinthians 15:4-20",
  },
  {
    text: "The necessity of the work of the Holy Spirit to make the death of Christ effective to the individual sinner, granting him repentance towards God and faith in Jesus Christ.",
    refs: "John 3:3-5; 2 Corinthians 3:3",
  },
  {
    text: "The infilling of the Holy Spirit and His work in the believer, by whose activities the believer is empowered to witness and to live a victorious Christian life, and by whose administration the Christian Church receives daily miraculous gifts and ministries in this present life.",
    refs: "1 Corinthians 12:4-10; Ephesians 4:11",
  },
  {
    text: "The baptism of the Holy Spirit with the evidence of speaking in tongues.",
    refs: "Acts 2:4; Acts 8:15-17; Acts 10:44-46; Acts 19:6",
  },
  {
    text: "The one Holy Universal Church which is the Body of Christ, to which all true believers belong.",
    refs: "Matthew 16:18; 1 Corinthians 12:13",
  },
  {
    text: "The second coming of our Lord Jesus Christ.",
    refs: "John 14:3; Acts 1:10-11; 1 Thessalonians 4:16",
  },
  {
    text: "Eternal life for believers and eternal punishment for unbelievers.",
    refs: "John 5:24; John 3:16; Mark 9:43-48; 2 Thessalonians 1:9; Revelation 20:10-15",
  },
];

export const ministries = [
  {
    slug: "children",
    title: "Children",
    eyebrow: "Next Generation",
    subtitle: "Helping children know Jesus and grow in His Word.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1400&q=80",
    meeting: "Sundays during the main service",
    body: [
      "Our Children's Ministry creates a safe, joyful environment where kids encounter Jesus through Bible stories, worship, and age-appropriate teaching.",
      "We partner with parents to raise children who love God, respect others, and live with purpose from an early age.",
    ],
    focuses: [
      "Age-appropriate Bible teaching",
      "Worship & Scripture memory",
      "Safe, caring volunteers",
      "Partnership with parents",
    ],
  },
  {
    slug: "youth",
    title: "Youth",
    eyebrow: "Young Disciples",
    subtitle: "Raising a generation on fire for God.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80",
    meeting: "Fridays 5:00 pm",
    body: [
      "Youth Ministry equips teenagers to stand firm in faith, develop godly character, and discover their calling in Christ.",
      "Through teaching, mentorship, and fellowship, young people are challenged to live holy lives and impact their schools and communities.",
    ],
    focuses: [
      "Bible teaching & mentorship",
      "Peer fellowship",
      "Evangelism & outreach",
      "Leadership development",
    ],
  },
  {
    slug: "men",
    title: "Men",
    eyebrow: "Men of Faith",
    subtitle: "Building men of integrity, faith, and responsibility.",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1400&q=80",
    meeting: "First Saturday of each month",
    body: [
      "The Men's Ministry strengthens brothers to lead their homes, serve the church, and walk in purity and purpose.",
      "We gather for prayer, teaching, and accountability so every man can grow as a disciple of Jesus Christ.",
    ],
    focuses: [
      "Prayer & accountability",
      "Biblical manhood",
      "Family leadership",
      "Service in the church",
    ],
  },
  {
    slug: "women",
    title: "Women",
    eyebrow: "Women of Virtue",
    subtitle: "Encouraging women to flourish in Christ.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80",
    meeting: "Second Saturday of each month",
    body: [
      "Women's Ministry provides fellowship, teaching, and support for sisters at every stage of life.",
      "We focus on prayer, discipleship, and practical Christian living so women can grow spiritually and serve effectively.",
    ],
    focuses: [
      "Discipleship & prayer",
      "Fellowship across ages",
      "Practical Christian living",
      "Serving the body",
    ],
  },
  {
    slug: "students",
    title: "Students",
    eyebrow: "Campus Life",
    subtitle: "Campus fellowship for students who love Jesus.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&q=80",
    meeting: "Weekday fellowships on campus",
    body: [
      "Our Students Ministry reaches universities and colleges with the gospel, helping students stay rooted in Christ during their academic years.",
      "Through Bible study, evangelism, and peer discipleship, students are prepared to shine as lights on campus and beyond.",
    ],
    focuses: [
      "Campus Bible studies",
      "Peer discipleship",
      "Gospel outreach",
      "Life after campus",
    ],
  },
  {
    slug: "missions",
    title: "Missions",
    eyebrow: "Go & Tell",
    subtitle: "Taking the gospel to the nations.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&q=80",
    meeting: "Mission briefings as announced",
    body: [
      "Missions is at the heart of our calling. We support church planting, outreach, and missionary work locally and internationally.",
      "Whether through prayer, giving, or going, every member can participate in fulfilling the Great Commission.",
    ],
    focuses: [
      "Church planting",
      "Local & global outreach",
      "Missionary support",
      "Prayer & partnership",
    ],
  },
  {
    slug: "music",
    title: "Music",
    eyebrow: "Worship & Praise",
    subtitle: "Leading the church into the presence of God through worship.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80",
    meeting: "Rehearsals midweek · Ministering every service",
    body: [
      "The Music Ministry leads the congregation into heartfelt worship, ministering in song at every gathering and creating an atmosphere for the presence of God.",
      "Through the choir, praise team, and instrumentalists, we serve with excellence and humility — lifting up the name of Jesus and drawing hearts into worship.",
    ],
    focuses: [
      "Choir & praise team",
      "Instrumentalists & band",
      "Worship leading",
      "Sound & media support",
    ],
  },
  {
    slug: "deacons",
    title: "Deacons & Deaconesses",
    eyebrow: "The Ministry of Helps",
    subtitle: "Serving the church and caring for the practical needs of God's people.",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1400&q=80",
    meeting: "Serving at every service and gathering",
    body: [
      "The Deacons and Deaconesses carry the ministry of helps — attending to the practical life of the church so the work of the Gospel flows without hindrance.",
      "From welfare and hospitality to order and care for members, they serve quietly and faithfully, following the example of the first deacons chosen in Acts 6.",
    ],
    focuses: [
      "Welfare & benevolence",
      "Ushering & order",
      "Hospitality & care",
      "Supporting the ministers",
    ],
  },
] as const;

export function getMinistry(slug: string) {
  return ministries.find((m) => m.slug === slug);
}

export const footerLinks = {
  about: [
    { label: "Our Story", href: "/about/our-story" },
    { label: "What We Believe", href: "/about/what-we-believe" },
    { label: "Leadership", href: "/about/leadership" },
    { label: "Education", href: "/about/education" },
    { label: "Healing Station", href: "/about/healing-station" },
  ],
  ministries: [
    { label: "Children", href: "/ministries/children" },
    { label: "Youth", href: "/ministries/youth" },
    { label: "Men", href: "/ministries/men" },
    { label: "Women", href: "/ministries/women" },
    { label: "Music", href: "/ministries/music" },
    { label: "Students", href: "/ministries/students" },
    { label: "Missions", href: "/ministries/missions" },
    { label: "Deacons & Deaconesses", href: "/ministries/deacons" },
  ],
  media: [
    { label: "Sermons", href: "/media/sermons" },
    { label: "Devotions", href: "/media/devotions" },
    { label: "Testimonies", href: "/media/testimonies" },
    { label: "Gallery", href: "/media/gallery" },
    { label: "Livestream", href: "/media/livestream" },
  ],
  involve: [
    { label: "Plan Your Visit", href: "/get-involved/plan-your-visit" },
    { label: "Membership", href: "/get-involved/membership" },
    { label: "Volunteer", href: "/get-involved/volunteer" },
    { label: "Prayer Request", href: "/get-involved/prayer-request" },
  ],
};

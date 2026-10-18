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
      { label: "Latest News", href: "/news-events/blog" },
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
  { slug: "children", title: "Children" },
  { slug: "youth", title: "Youth Fellowship" },
  { slug: "men", title: "Men" },
  { slug: "women", title: "Women" },
  { slug: "students", title: "Students" },
  { slug: "missions", title: "Missions" },
  { slug: "music", title: "Music" },
  { slug: "deacons", title: "Deacons & Deaconesses" },
] as const;

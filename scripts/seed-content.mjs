import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import { dbConnect } from "../src/lib/mongodb.js";
import HomeContent from "../src/models/HomeContent.js";
import SiteSettings from "../src/models/SiteSettings.js";
import ImageAsset from "../src/models/ImageAsset.js";
import { translations } from "../src/lib/translations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicImagesDir = path.join(__dirname, "..", "public", "images");

const en = translations.en;
const hi = translations.hi;

async function uploadImage(filename) {
  const filePath = path.join(publicImagesDir, filename);
  const data = await fs.readFile(filePath);
  const ext = path.extname(filename).toLowerCase();
  const mimeType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : ext === ".webp" ? "image/webp" : "image/png";
  const doc = await ImageAsset.create({
    data,
    mimeType,
    filename,
    sizeBytes: data.length,
  });
  console.log(`  uploaded ${filename} -> ${doc._id}`);
  return doc._id;
}

async function main() {
  await dbConnect();

  const existing = await HomeContent.findOne({});
  if (existing) {
    console.log("HomeContent already exists — refusing to re-seed. Exiting without changes.");
    await mongoose.disconnect();
    return;
  }

  console.log("Uploading images...");
  const imageIds = {};
  for (const filename of [
    "hero_bg.png",
    "hero-mobile.png",
    "About.png",
    "case1.png",
    "case2.png",
    "case3.png",
    "case4.png",
    "media1.png",
    "media2.png",
    "media3.png",
    "banner-scale.png",
    "office.png",
  ]) {
    imageIds[filename] = await uploadImage(filename);
  }

  console.log("Building HomeContent document...");

  const practiceIcons = [
    "Scale", "Shield", "Users", "Building2", "BriefcaseBusiness", "ShoppingCart",
    "FileText", "Landmark", "Gavel", "KeyRound", "Laptop", "FileCheck",
  ];
  const whyChooseIcons = [
    "Scale", "MessageSquareText", "Trophy", "BriefcaseBusiness",
    "ShieldCheck", "Handshake", "Landmark", "Gavel",
  ];
  const featuredCaseImages = ["case1.png", "case2.png", "case3.png", "case4.png"];
  const testimonialExtra = [
    { name: "Rajesh Kumar", location: "Varanasi", rating: 5 },
    { name: "Priya Singh", location: "Varanasi", rating: 5 },
    { name: "Amit Tiwari", location: "Varanasi", rating: 5 },
    { name: "Anjali Mishra", location: "Lucknow", rating: 5 },
    { name: "Rahul Verma", location: "Kanpur", rating: 5 },
    { name: "Sneha Gupta", location: "Prayagraj", rating: 5 },
    { name: "Vivek Sharma", location: "Noida", rating: 5 },
    { name: "Pooja Yadav", location: "Delhi", rating: 5 },
  ];
  const articleIcons = ["FileText", "Scale", "ShieldCheck", "Landmark"];
  const articleDates = ["20 May 2024", "18 May 2024", "10 May 2024", "05 May 2024"];
  const mediaImages = ["media1.png", "media2.png", "media3.png"];
  const mediaDates = ["May 2024", "Mar 2024", "Jan 2024"];
  const achievementYears = ["2022", "2021", "2020"];
  const courtIcons = ["Landmark", "Gavel", "Users", "ShoppingCart", "BriefcaseBusiness", "Building2"];

  function pageHeroEntry(key) {
    return {
      eyebrow_en: en.pageHero[key].eyebrow,
      eyebrow_hi: hi.pageHero[key].eyebrow,
      title_en: en.pageHero[key].title,
      title_hi: hi.pageHero[key].title,
      subtitle_en: en.pageHero[key].subtitle,
      subtitle_hi: hi.pageHero[key].subtitle,
      current_en: en.pageHero[key].current,
      current_hi: hi.pageHero[key].current,
    };
  }

  const homeContent = {
    navbar: {
      workingHours_en: en.navbar.workingHours,
      workingHours_hi: hi.navbar.workingHours,
      eyebrow_en: en.navbar.eyebrow,
      eyebrow_hi: hi.navbar.eyebrow,
      firstName_en: en.navbar.firstName,
      firstName_hi: hi.navbar.firstName,
      lastName_en: en.navbar.lastName,
      lastName_hi: hi.navbar.lastName,
      bookConsultation_en: en.navbar.bookConsultation,
      bookConsultation_hi: hi.navbar.bookConsultation,
      navLinks: {
        home_en: en.navbar.navLinks.home,
        home_hi: hi.navbar.navLinks.home,
        about_en: en.navbar.navLinks.about,
        about_hi: hi.navbar.navLinks.about,
        practiceAreas_en: en.navbar.navLinks.practiceAreas,
        practiceAreas_hi: hi.navbar.navLinks.practiceAreas,
        courtExperience_en: en.navbar.navLinks.courtExperience,
        courtExperience_hi: hi.navbar.navLinks.courtExperience,
        caseStudies_en: en.navbar.navLinks.caseStudies,
        caseStudies_hi: hi.navbar.navLinks.caseStudies,
        media_en: en.navbar.navLinks.media,
        media_hi: hi.navbar.navLinks.media,
        articles_en: en.navbar.navLinks.articles,
        articles_hi: hi.navbar.navLinks.articles,
        testimonials_en: en.navbar.navLinks.testimonials,
        testimonials_hi: hi.navbar.navLinks.testimonials,
      },
    },
    disclaimer: {
      notice_en: en.disclaimer.notice,
      notice_hi: hi.disclaimer.notice,
      title_en: en.disclaimer.title,
      title_hi: hi.disclaimer.title,
      paragraph1_en: en.disclaimer.paragraph1,
      paragraph1_hi: hi.disclaimer.paragraph1,
      paragraph2_en: en.disclaimer.paragraph2,
      paragraph2_hi: hi.disclaimer.paragraph2,
      accept_en: en.disclaimer.accept,
      accept_hi: hi.disclaimer.accept,
      proceed_en: en.disclaimer.proceed,
      proceed_hi: hi.disclaimer.proceed,
    },
    bookingModal: {
      eyebrow_en: en.bookingModal.eyebrow,
      eyebrow_hi: hi.bookingModal.eyebrow,
      title_en: en.bookingModal.title,
      title_hi: hi.bookingModal.title,
      subtitle_en: en.bookingModal.subtitle,
      subtitle_hi: hi.bookingModal.subtitle,
      callNow_en: en.bookingModal.callNow,
      callNow_hi: hi.bookingModal.callNow,
      emailLabel_en: en.bookingModal.emailLabel,
      emailLabel_hi: hi.bookingModal.emailLabel,
      emailUs_en: en.bookingModal.emailUs,
      emailUs_hi: hi.bookingModal.emailUs,
      phoneLabel_en: en.bookingModal.phoneLabel,
      phoneLabel_hi: hi.bookingModal.phoneLabel,
      hoursLabel_en: en.bookingModal.hoursLabel,
      hoursLabel_hi: hi.bookingModal.hoursLabel,
    },
    hero: {
      line1_en: en.hero.line1,
      line1_hi: hi.hero.line1,
      line2_en: en.hero.line2,
      line2_hi: hi.hero.line2,
      line3_en: en.hero.line3,
      line3_hi: hi.hero.line3,
      subtitle_en: en.hero.subtitle,
      subtitle_hi: hi.hero.subtitle,
      paragraph_en: en.hero.paragraph,
      paragraph_hi: hi.hero.paragraph,
      scheduleConsultation_en: en.hero.scheduleConsultation,
      scheduleConsultation_hi: hi.hero.scheduleConsultation,
      viewPracticeAreas_en: en.hero.viewPracticeAreas,
      viewPracticeAreas_hi: hi.hero.viewPracticeAreas,
      cards: {
        clientFirstTitle_en: en.hero.cards.clientFirstTitle,
        clientFirstTitle_hi: hi.hero.cards.clientFirstTitle,
        clientFirstSub_en: en.hero.cards.clientFirstSub,
        clientFirstSub_hi: hi.hero.cards.clientFirstSub,
        ethicalTitle_en: en.hero.cards.ethicalTitle,
        ethicalTitle_hi: hi.hero.cards.ethicalTitle,
        ethicalSub_en: en.hero.cards.ethicalSub,
        ethicalSub_hi: hi.hero.cards.ethicalSub,
        strategicTitle_en: en.hero.cards.strategicTitle,
        strategicTitle_hi: hi.hero.cards.strategicTitle,
        strategicSub_en: en.hero.cards.strategicSub,
        strategicSub_hi: hi.hero.cards.strategicSub,
      },
      bgImageId: imageIds["hero_bg.png"],
      bgMobileImageId: imageIds["hero-mobile.png"],
    },
    stats: {
      clientsAssisted_en: en.stats.clientsAssisted,
      clientsAssisted_hi: hi.stats.clientsAssisted,
      casesHandled_en: en.stats.casesHandled,
      casesHandled_hi: hi.stats.casesHandled,
      practiceAreas_en: en.stats.practiceAreas,
      practiceAreas_hi: hi.stats.practiceAreas,
      yearsExcellence_en: en.stats.yearsExcellence,
      yearsExcellence_hi: hi.stats.yearsExcellence,
      highCourt_en: en.stats.highCourt,
      highCourt_hi: hi.stats.highCourt,
      values: ["1000+", "500+", "20+", "15+", null],
    },
    about: {
      eyebrow_en: en.about.eyebrow,
      eyebrow_hi: hi.about.eyebrow,
      name_en: en.about.name,
      name_hi: hi.about.name,
      role_en: en.about.role,
      role_hi: hi.about.role,
      bio_en: en.about.bio,
      bio_hi: hi.about.bio,
      education_en: en.about.education,
      education_hi: hi.about.education,
      educationValue_en: en.about.educationValue,
      educationValue_hi: hi.about.educationValue,
      enrollment_en: en.about.enrollment,
      enrollment_hi: hi.about.enrollment,
      enrollmentValue_en: en.about.enrollmentValue,
      enrollmentValue_hi: hi.about.enrollmentValue,
      experience_en: en.about.experience,
      experience_hi: hi.about.experience,
      experienceValue_en: en.about.experienceValue,
      experienceValue_hi: hi.about.experienceValue,
      courts_en: en.about.courts,
      courts_hi: hi.about.courts,
      courtsValue_en: en.about.courtsValue,
      courtsValue_hi: hi.about.courtsValue,
      imageId: imageIds["About.png"],
      timeline: en.about.timeline.map((item, i) => ({
        year: item.year,
        title_en: item.title,
        title_hi: hi.about.timeline[i].title,
      })),
    },
    practice: {
      eyebrow_en: en.practice.eyebrow,
      eyebrow_hi: hi.practice.eyebrow,
      heading_en: en.practice.heading,
      heading_hi: hi.practice.heading,
      paragraph_en: en.practice.paragraph,
      paragraph_hi: hi.practice.paragraph,
      items: en.practice.items.map((item, i) => ({
        title_en: item.title,
        title_hi: hi.practice.items[i].title,
        desc_en: item.desc,
        desc_hi: hi.practice.items[i].desc,
        icon: practiceIcons[i],
      })),
    },
    whyChoose: {
      heading_en: en.whyChoose.heading,
      heading_hi: hi.whyChoose.heading,
      items: en.whyChoose.items.map((item, i) => ({
        title_en: item.title,
        title_hi: hi.whyChoose.items[i].title,
        desc_en: item.desc,
        desc_hi: hi.whyChoose.items[i].desc,
        icon: whyChooseIcons[i],
      })),
    },
    featuredCases: {
      eyebrow_en: en.featuredCases.eyebrow,
      eyebrow_hi: hi.featuredCases.eyebrow,
      heading_en: en.featuredCases.heading,
      heading_hi: hi.featuredCases.heading,
      paragraph_en: en.featuredCases.paragraph,
      paragraph_hi: hi.featuredCases.paragraph,
      viewCase_en: en.featuredCases.viewCase,
      viewCase_hi: hi.featuredCases.viewCase,
      viewAll_en: en.featuredCases.viewAll,
      viewAll_hi: hi.featuredCases.viewAll,
      items: en.featuredCases.items.map((item, i) => ({
        title_en: item.title,
        title_hi: hi.featuredCases.items[i].title,
        desc_en: item.desc,
        desc_hi: hi.featuredCases.items[i].desc,
        tag_en: en.caseStudiesPage.tags[i] || "",
        tag_hi: hi.caseStudiesPage.tags[i] || "",
        imageId: imageIds[featuredCaseImages[i]],
      })),
    },
    testimonials: {
      eyebrow_en: en.testimonials.eyebrow,
      eyebrow_hi: hi.testimonials.eyebrow,
      heading_en: en.testimonials.heading,
      heading_hi: hi.testimonials.heading,
      viewAll_en: en.testimonials.viewAll,
      viewAll_hi: hi.testimonials.viewAll,
      items: en.testimonials.items.map((item, i) => ({
        name: testimonialExtra[i].name,
        location: testimonialExtra[i].location,
        rating: testimonialExtra[i].rating,
        role_en: item.role,
        role_hi: hi.testimonials.items[i].role,
        message_en: item.message,
        message_hi: hi.testimonials.items[i].message,
      })),
    },
    latestUpdates: {
      articlesEyebrow_en: en.latestUpdates.articlesEyebrow,
      articlesEyebrow_hi: hi.latestUpdates.articlesEyebrow,
      articlesHeading_en: en.latestUpdates.articlesHeading,
      articlesHeading_hi: hi.latestUpdates.articlesHeading,
      articles: en.latestUpdates.articles.map((item, i) => ({
        title_en: item.title,
        title_hi: hi.latestUpdates.articles[i].title,
        date: articleDates[i],
        icon: articleIcons[i],
      })),
      mediaHeading_en: en.latestUpdates.mediaHeading,
      mediaHeading_hi: hi.latestUpdates.mediaHeading,
      media: en.latestUpdates.media.map((item, i) => ({
        title_en: item.title,
        title_hi: hi.latestUpdates.media[i].title,
        date: mediaDates[i],
        imageId: imageIds[mediaImages[i]],
      })),
      achievementsHeading_en: en.latestUpdates.achievementsHeading,
      achievementsHeading_hi: hi.latestUpdates.achievementsHeading,
      achievements: en.latestUpdates.achievements.map((item, i) => ({
        title_en: item.title,
        title_hi: hi.latestUpdates.achievements[i].title,
        desc_en: item.desc,
        desc_hi: hi.latestUpdates.achievements[i].desc,
        year: achievementYears[i],
        icon: "Trophy",
      })),
      viewAll_en: en.latestUpdates.viewAll,
      viewAll_hi: hi.latestUpdates.viewAll,
    },
    consultationBanner: {
      heading_en: en.consultationBanner.heading,
      heading_hi: hi.consultationBanner.heading,
      subheading_en: en.consultationBanner.subheading,
      subheading_hi: hi.consultationBanner.subheading,
      paragraph_en: en.consultationBanner.paragraph,
      paragraph_hi: hi.consultationBanner.paragraph,
      cta_en: en.consultationBanner.cta,
      cta_hi: hi.consultationBanner.cta,
      bgImageId: imageIds["banner-scale.png"],
      features: en.consultationBanner.features.map((item, i) => ({
        title_en: item.title,
        title_hi: hi.consultationBanner.features[i].title,
        subtitle_en: item.subtitle,
        subtitle_hi: hi.consultationBanner.features[i].subtitle,
      })),
    },
    contactSection: {
      eyebrow_en: en.contactSection.eyebrow,
      eyebrow_hi: hi.contactSection.eyebrow,
      heading_en: en.contactSection.heading,
      heading_hi: hi.contactSection.heading,
      address_en: en.contactSection.address,
      address_hi: hi.contactSection.address,
      workingHours_en: en.contactSection.workingHours,
      workingHours_hi: hi.contactSection.workingHours,
      workingHoursValue_en: en.contactSection.workingHoursValue,
      workingHoursValue_hi: hi.contactSection.workingHoursValue,
      rights_en: en.contactSection.rights,
      rights_hi: hi.contactSection.rights,
      imageId: imageIds["office.png"],
    },
    pageHero: {
      about: pageHeroEntry("about"),
      practiceAreas: pageHeroEntry("practiceAreas"),
      courtExperience: pageHeroEntry("courtExperience"),
      caseStudies: pageHeroEntry("caseStudies"),
      media: pageHeroEntry("media"),
      articles: pageHeroEntry("articles"),
      testimonials: pageHeroEntry("testimonials"),
    },
    recognitions: {
      eyebrow_en: en.recognitions.eyebrow,
      eyebrow_hi: hi.recognitions.eyebrow,
      heading_en: en.recognitions.heading,
      heading_hi: hi.recognitions.heading,
    },
    caseStudiesPage: {
      outcome_en: en.caseStudiesPage.outcome,
      outcome_hi: hi.caseStudiesPage.outcome,
    },
    courtExperiencePage: {
      courtsEyebrow_en: en.courtExperiencePage.courtsEyebrow,
      courtsEyebrow_hi: hi.courtExperiencePage.courtsEyebrow,
      courtsHeading_en: en.courtExperiencePage.courtsHeading,
      courtsHeading_hi: hi.courtExperiencePage.courtsHeading,
      courts: en.courtExperiencePage.courts.map((item, i) => ({
        name_en: item.name,
        name_hi: hi.courtExperiencePage.courts[i].name,
        desc_en: item.desc,
        desc_hi: hi.courtExperiencePage.courts[i].desc,
        icon: courtIcons[i],
      })),
      processEyebrow_en: en.courtExperiencePage.processEyebrow,
      processEyebrow_hi: hi.courtExperiencePage.processEyebrow,
      processHeading_en: en.courtExperiencePage.processHeading,
      processHeading_hi: hi.courtExperiencePage.processHeading,
      process: en.courtExperiencePage.process.map((item, i) => ({
        title_en: item.title,
        title_hi: hi.courtExperiencePage.process[i].title,
        desc_en: item.desc,
        desc_hi: hi.courtExperiencePage.process[i].desc,
      })),
    },
  };

  await HomeContent.create(homeContent);
  console.log("HomeContent created.");

  const existingSettings = await SiteSettings.findOne({});
  if (!existingSettings) {
    await SiteSettings.create({
      phone: "+91 94150 99900",
      email: "advocate.shashanktripathi@gmail.com",
      address: "B-310/2, Sigra, Varanasi, Uttar Pradesh - 221010, India",
      mapsEmbedUrl:
        "https://www.google.com/maps?q=B-310/2,+Sigra,+Varanasi,+Uttar+Pradesh+221010&output=embed",
      rights_en: en.contactSection.rights,
      rights_hi: hi.contactSection.rights,
    });
    console.log("SiteSettings created.");
  } else {
    console.log("SiteSettings already exists, left untouched.");
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});

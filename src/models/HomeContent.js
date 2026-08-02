import mongoose from "mongoose";

const { Schema } = mongoose;
const ImageRef = { type: Schema.Types.ObjectId, ref: "ImageAsset", default: null };

const NavLinksSchema = new Schema(
  {
    home_en: { type: String, default: "" },
    home_hi: { type: String, default: "" },
    about_en: { type: String, default: "" },
    about_hi: { type: String, default: "" },
    practiceAreas_en: { type: String, default: "" },
    practiceAreas_hi: { type: String, default: "" },
    courtExperience_en: { type: String, default: "" },
    courtExperience_hi: { type: String, default: "" },
    caseStudies_en: { type: String, default: "" },
    caseStudies_hi: { type: String, default: "" },
    media_en: { type: String, default: "" },
    media_hi: { type: String, default: "" },
    articles_en: { type: String, default: "" },
    articles_hi: { type: String, default: "" },
    testimonials_en: { type: String, default: "" },
    testimonials_hi: { type: String, default: "" },
  },
  { _id: false }
);

const NavbarSchema = new Schema(
  {
    workingHours_en: { type: String, default: "" },
    workingHours_hi: { type: String, default: "" },
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    firstName_en: { type: String, default: "" },
    firstName_hi: { type: String, default: "" },
    lastName_en: { type: String, default: "" },
    lastName_hi: { type: String, default: "" },
    bookConsultation_en: { type: String, default: "" },
    bookConsultation_hi: { type: String, default: "" },
    navLinks: { type: NavLinksSchema, default: () => ({}) },
  },
  { _id: false }
);

const DisclaimerSchema = new Schema(
  {
    notice_en: { type: String, default: "" },
    notice_hi: { type: String, default: "" },
    title_en: { type: String, default: "" },
    title_hi: { type: String, default: "" },
    paragraph1_en: { type: String, default: "" },
    paragraph1_hi: { type: String, default: "" },
    paragraph2_en: { type: String, default: "" },
    paragraph2_hi: { type: String, default: "" },
    accept_en: { type: String, default: "" },
    accept_hi: { type: String, default: "" },
    proceed_en: { type: String, default: "" },
    proceed_hi: { type: String, default: "" },
  },
  { _id: false }
);

const BookingModalSchema = new Schema(
  {
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    title_en: { type: String, default: "" },
    title_hi: { type: String, default: "" },
    subtitle_en: { type: String, default: "" },
    subtitle_hi: { type: String, default: "" },
    callNow_en: { type: String, default: "" },
    callNow_hi: { type: String, default: "" },
    emailLabel_en: { type: String, default: "" },
    emailLabel_hi: { type: String, default: "" },
    emailUs_en: { type: String, default: "" },
    emailUs_hi: { type: String, default: "" },
    phoneLabel_en: { type: String, default: "" },
    phoneLabel_hi: { type: String, default: "" },
    hoursLabel_en: { type: String, default: "" },
    hoursLabel_hi: { type: String, default: "" },
  },
  { _id: false }
);

const HeroCardsSchema = new Schema(
  {
    clientFirstTitle_en: { type: String, default: "" },
    clientFirstTitle_hi: { type: String, default: "" },
    clientFirstSub_en: { type: String, default: "" },
    clientFirstSub_hi: { type: String, default: "" },
    ethicalTitle_en: { type: String, default: "" },
    ethicalTitle_hi: { type: String, default: "" },
    ethicalSub_en: { type: String, default: "" },
    ethicalSub_hi: { type: String, default: "" },
    strategicTitle_en: { type: String, default: "" },
    strategicTitle_hi: { type: String, default: "" },
    strategicSub_en: { type: String, default: "" },
    strategicSub_hi: { type: String, default: "" },
  },
  { _id: false }
);

const HeroSchema = new Schema(
  {
    line1_en: { type: String, default: "" },
    line1_hi: { type: String, default: "" },
    line2_en: { type: String, default: "" },
    line2_hi: { type: String, default: "" },
    line3_en: { type: String, default: "" },
    line3_hi: { type: String, default: "" },
    subtitle_en: { type: String, default: "" },
    subtitle_hi: { type: String, default: "" },
    paragraph_en: { type: String, default: "" },
    paragraph_hi: { type: String, default: "" },
    scheduleConsultation_en: { type: String, default: "" },
    scheduleConsultation_hi: { type: String, default: "" },
    viewPracticeAreas_en: { type: String, default: "" },
    viewPracticeAreas_hi: { type: String, default: "" },
    cards: { type: HeroCardsSchema, default: () => ({}) },
    bgImageId: ImageRef,
    bgMobileImageId: ImageRef,
  },
  { _id: false }
);

const StatsSchema = new Schema(
  {
    clientsAssisted_en: { type: String, default: "" },
    clientsAssisted_hi: { type: String, default: "" },
    casesHandled_en: { type: String, default: "" },
    casesHandled_hi: { type: String, default: "" },
    practiceAreas_en: { type: String, default: "" },
    practiceAreas_hi: { type: String, default: "" },
    yearsExcellence_en: { type: String, default: "" },
    yearsExcellence_hi: { type: String, default: "" },
    highCourt_en: { type: String, default: "" },
    highCourt_hi: { type: String, default: "" },
    values: { type: [String], default: [] },
  },
  { _id: false }
);

const TimelineItemSchema = new Schema({
  year: { type: String, default: "" },
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
});

const AboutSchema = new Schema(
  {
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    name_en: { type: String, default: "" },
    name_hi: { type: String, default: "" },
    role_en: { type: String, default: "" },
    role_hi: { type: String, default: "" },
    bio_en: { type: String, default: "" },
    bio_hi: { type: String, default: "" },
    education_en: { type: String, default: "" },
    education_hi: { type: String, default: "" },
    educationValue_en: { type: String, default: "" },
    educationValue_hi: { type: String, default: "" },
    enrollment_en: { type: String, default: "" },
    enrollment_hi: { type: String, default: "" },
    enrollmentValue_en: { type: String, default: "" },
    enrollmentValue_hi: { type: String, default: "" },
    experience_en: { type: String, default: "" },
    experience_hi: { type: String, default: "" },
    experienceValue_en: { type: String, default: "" },
    experienceValue_hi: { type: String, default: "" },
    courts_en: { type: String, default: "" },
    courts_hi: { type: String, default: "" },
    courtsValue_en: { type: String, default: "" },
    courtsValue_hi: { type: String, default: "" },
    imageId: ImageRef,
    timeline: { type: [TimelineItemSchema], default: [] },
  },
  { _id: false }
);

const PracticeItemSchema = new Schema({
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
  desc_en: { type: String, default: "" },
  desc_hi: { type: String, default: "" },
  icon: { type: String, default: "" },
});

const PracticeSchema = new Schema(
  {
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    heading_en: { type: String, default: "" },
    heading_hi: { type: String, default: "" },
    paragraph_en: { type: String, default: "" },
    paragraph_hi: { type: String, default: "" },
    items: { type: [PracticeItemSchema], default: [] },
  },
  { _id: false }
);

const WhyChooseItemSchema = new Schema({
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
  desc_en: { type: String, default: "" },
  desc_hi: { type: String, default: "" },
  icon: { type: String, default: "" },
});

const WhyChooseSchema = new Schema(
  {
    heading_en: { type: String, default: "" },
    heading_hi: { type: String, default: "" },
    items: { type: [WhyChooseItemSchema], default: [] },
  },
  { _id: false }
);

const FeaturedCaseItemSchema = new Schema({
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
  desc_en: { type: String, default: "" },
  desc_hi: { type: String, default: "" },
  tag_en: { type: String, default: "" },
  tag_hi: { type: String, default: "" },
  imageId: ImageRef,
});

const FeaturedCasesSchema = new Schema(
  {
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    heading_en: { type: String, default: "" },
    heading_hi: { type: String, default: "" },
    paragraph_en: { type: String, default: "" },
    paragraph_hi: { type: String, default: "" },
    viewCase_en: { type: String, default: "" },
    viewCase_hi: { type: String, default: "" },
    viewAll_en: { type: String, default: "" },
    viewAll_hi: { type: String, default: "" },
    items: { type: [FeaturedCaseItemSchema], default: [] },
  },
  { _id: false }
);

const TestimonialItemSchema = new Schema({
  name: { type: String, default: "" },
  location: { type: String, default: "" },
  rating: { type: Number, default: 5 },
  role_en: { type: String, default: "" },
  role_hi: { type: String, default: "" },
  message_en: { type: String, default: "" },
  message_hi: { type: String, default: "" },
});

const TestimonialsSchema = new Schema(
  {
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    heading_en: { type: String, default: "" },
    heading_hi: { type: String, default: "" },
    viewAll_en: { type: String, default: "" },
    viewAll_hi: { type: String, default: "" },
    items: { type: [TestimonialItemSchema], default: [] },
  },
  { _id: false }
);

const ArticleItemSchema = new Schema({
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
  date: { type: String, default: "" },
  icon: { type: String, default: "" },
});

const MediaItemSchema = new Schema({
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
  date: { type: String, default: "" },
  imageId: ImageRef,
});

const AchievementItemSchema = new Schema({
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
  desc_en: { type: String, default: "" },
  desc_hi: { type: String, default: "" },
  year: { type: String, default: "" },
  icon: { type: String, default: "" },
});

const LatestUpdatesSchema = new Schema(
  {
    articlesEyebrow_en: { type: String, default: "" },
    articlesEyebrow_hi: { type: String, default: "" },
    articlesHeading_en: { type: String, default: "" },
    articlesHeading_hi: { type: String, default: "" },
    articles: { type: [ArticleItemSchema], default: [] },
    mediaHeading_en: { type: String, default: "" },
    mediaHeading_hi: { type: String, default: "" },
    media: { type: [MediaItemSchema], default: [] },
    achievementsHeading_en: { type: String, default: "" },
    achievementsHeading_hi: { type: String, default: "" },
    achievements: { type: [AchievementItemSchema], default: [] },
    viewAll_en: { type: String, default: "" },
    viewAll_hi: { type: String, default: "" },
  },
  { _id: false }
);

const ConsultationFeatureSchema = new Schema({
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
  subtitle_en: { type: String, default: "" },
  subtitle_hi: { type: String, default: "" },
});

const ConsultationBannerSchema = new Schema(
  {
    heading_en: { type: String, default: "" },
    heading_hi: { type: String, default: "" },
    subheading_en: { type: String, default: "" },
    subheading_hi: { type: String, default: "" },
    paragraph_en: { type: String, default: "" },
    paragraph_hi: { type: String, default: "" },
    cta_en: { type: String, default: "" },
    cta_hi: { type: String, default: "" },
    bgImageId: ImageRef,
    features: { type: [ConsultationFeatureSchema], default: [] },
  },
  { _id: false }
);

const ContactSectionSchema = new Schema(
  {
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    heading_en: { type: String, default: "" },
    heading_hi: { type: String, default: "" },
    address_en: { type: String, default: "" },
    address_hi: { type: String, default: "" },
    workingHours_en: { type: String, default: "" },
    workingHours_hi: { type: String, default: "" },
    workingHoursValue_en: { type: String, default: "" },
    workingHoursValue_hi: { type: String, default: "" },
    rights_en: { type: String, default: "" },
    rights_hi: { type: String, default: "" },
    imageId: ImageRef,
  },
  { _id: false }
);

// One entry per inner page's hero banner (eyebrow/title/subtitle/breadcrumb
// label). The Home page itself doesn't use PageHero, so no "home" key here.
const PageHeroEntrySchema = new Schema(
  {
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    title_en: { type: String, default: "" },
    title_hi: { type: String, default: "" },
    subtitle_en: { type: String, default: "" },
    subtitle_hi: { type: String, default: "" },
    current_en: { type: String, default: "" },
    current_hi: { type: String, default: "" },
    backgroundImageId: ImageRef,
  },
  { _id: false }
);

const PageHeroSchema = new Schema(
  {
    about: { type: PageHeroEntrySchema, default: () => ({}) },
    practiceAreas: { type: PageHeroEntrySchema, default: () => ({}) },
    courtExperience: { type: PageHeroEntrySchema, default: () => ({}) },
    caseStudies: { type: PageHeroEntrySchema, default: () => ({}) },
    media: { type: PageHeroEntrySchema, default: () => ({}) },
    articles: { type: PageHeroEntrySchema, default: () => ({}) },
    testimonials: { type: PageHeroEntrySchema, default: () => ({}) },
  },
  { _id: false }
);

const RecognitionsSchema = new Schema(
  {
    eyebrow_en: { type: String, default: "" },
    eyebrow_hi: { type: String, default: "" },
    heading_en: { type: String, default: "" },
    heading_hi: { type: String, default: "" },
  },
  { _id: false }
);

const CaseStudiesPageSchema = new Schema(
  {
    outcome_en: { type: String, default: "" },
    outcome_hi: { type: String, default: "" },
  },
  { _id: false }
);

const CourtItemSchema = new Schema({
  name_en: { type: String, default: "" },
  name_hi: { type: String, default: "" },
  desc_en: { type: String, default: "" },
  desc_hi: { type: String, default: "" },
  icon: { type: String, default: "" },
});

const ProcessStepItemSchema = new Schema({
  title_en: { type: String, default: "" },
  title_hi: { type: String, default: "" },
  desc_en: { type: String, default: "" },
  desc_hi: { type: String, default: "" },
});

const CourtExperiencePageSchema = new Schema(
  {
    courtsEyebrow_en: { type: String, default: "" },
    courtsEyebrow_hi: { type: String, default: "" },
    courtsHeading_en: { type: String, default: "" },
    courtsHeading_hi: { type: String, default: "" },
    courts: { type: [CourtItemSchema], default: [] },
    processEyebrow_en: { type: String, default: "" },
    processEyebrow_hi: { type: String, default: "" },
    processHeading_en: { type: String, default: "" },
    processHeading_hi: { type: String, default: "" },
    process: { type: [ProcessStepItemSchema], default: [] },
  },
  { _id: false }
);

const HomeContentSchema = new Schema(
  {
    navbar: { type: NavbarSchema, default: () => ({}) },
    disclaimer: { type: DisclaimerSchema, default: () => ({}) },
    bookingModal: { type: BookingModalSchema, default: () => ({}) },
    hero: { type: HeroSchema, default: () => ({}) },
    stats: { type: StatsSchema, default: () => ({}) },
    about: { type: AboutSchema, default: () => ({}) },
    practice: { type: PracticeSchema, default: () => ({}) },
    whyChoose: { type: WhyChooseSchema, default: () => ({}) },
    featuredCases: { type: FeaturedCasesSchema, default: () => ({}) },
    testimonials: { type: TestimonialsSchema, default: () => ({}) },
    latestUpdates: { type: LatestUpdatesSchema, default: () => ({}) },
    consultationBanner: { type: ConsultationBannerSchema, default: () => ({}) },
    contactSection: { type: ContactSectionSchema, default: () => ({}) },
    pageHero: { type: PageHeroSchema, default: () => ({}) },
    recognitions: { type: RecognitionsSchema, default: () => ({}) },
    caseStudiesPage: { type: CaseStudiesPageSchema, default: () => ({}) },
    courtExperiencePage: { type: CourtExperiencePageSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.models.HomeContent ||
  mongoose.model("HomeContent", HomeContentSchema);

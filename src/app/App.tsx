import { useState, useMemo } from "react";
import {
  Users, Home, Calendar, Clock, FileText, LogOut, Menu, X,
  Bell, Search, Activity, Pill, ClipboardList, TrendingUp,
  AlertCircle, CheckCircle, Plus, ChevronLeft, BarChart2,
  User, MapPin, Phone, Mail, Building2, UserCheck, PenLine,
  Send, Heart, Stethoscope, Brain, MessageSquare, BookOpen,
  Info, Shield, ChevronDown, Edit3, AlertTriangle, Check,
  Star, ChevronRight, Download, RefreshCw, Filter
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";
import { clsx } from "clsx";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "admin" | "staff";
type View =
  | "dashboard" | "clients" | "client-detail" | "schedule"
  | "timesheet" | "homes" | "staff-mgmt" | "reports";

interface AppUser {
  id: string; name: string; role: Role; email: string;
  title: string; homeAssignments: string[];
}
interface Medication {
  id: string; name: string; dosage: string; frequency: string;
  prescriber: string; startDate: string; instructions: string; active: boolean;
}
interface Appointment {
  id: string; type: string; provider: string; date: string;
  time: string; location: string; notes: string;
  status: "scheduled" | "completed" | "cancelled";
}
interface TargetBehavior {
  name: string; definition: string; antecedent: string;
  consequence: string; goal: string;
}
interface BehavioralPlan {
  targets: TargetBehavior[]; strategies: string[];
  reinforcers: string[]; lastUpdated: string; author: string;
}
interface Note {
  id: string; author: string; date: string; time: string;
  content: string; mood: "positive" | "neutral" | "concerning"; tags: string[];
}
interface Client {
  id: string; name: string; age: number; dob: string; homeId: string;
  primaryDSP: string; status: "active" | "inactive"; diagnoses: string[];
  allergies: string[]; primaryContact: { name: string; phone: string; relationship: string };
  medications: Medication[]; appointments: Appointment[];
  behavioralPlan: BehavioralPlan; notes: Note[];
  initials: string; color: string;
}
interface GroupHome {
  id: string; name: string; address: string; phone: string;
  manager: string; capacity: number; clientIds: string[];
}
interface StaffMember {
  id: string; name: string; role: Role; email: string; phone: string;
  title: string; hireDate: string; homeAssignments: string[];
  status: "active" | "inactive";
}
interface ScheduleEntry {
  id: string; date: string; startTime: string; endTime: string;
  homeId: string; clientIds: string[]; type: "regular" | "overtime" | "training";
}
interface TimesheetEntry {
  id: string; date: string; startTime: string; endTime: string;
  hours: number; homeId: string; notes: string;
  status: "draft" | "submitted" | "approved";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const USERS: AppUser[] = [
  { id: "admin1", name: "Maria Chen", role: "admin", email: "maria.chen@careconnect.org",
    title: "Program Director", homeAssignments: ["home1", "home2", "home3"] },
  { id: "staff1", name: "James Williams", role: "staff", email: "james.williams@careconnect.org",
    title: "Direct Support Professional", homeAssignments: ["home1", "home2"] },
];

const HOMES: GroupHome[] = [
  { id: "home1", name: "Sunrise House", address: "124 Maple Avenue, Springfield, IL 62701",
    phone: "(217) 555-0142", manager: "Maria Chen", capacity: 4, clientIds: ["c1","c2"] },
  { id: "home2", name: "Oak Grove Home", address: "307 Pine Street, Springfield, IL 62702",
    phone: "(217) 555-0198", manager: "Thomas Baker", capacity: 4, clientIds: ["c3","c4"] },
  { id: "home3", name: "Valley View", address: "892 Elm Drive, Springfield, IL 62703",
    phone: "(217) 555-0221", manager: "Lisa Park", capacity: 4, clientIds: ["c5","c6"] },
];

const STAFF_MEMBERS: StaffMember[] = [
  { id: "admin1", name: "Maria Chen", role: "admin", email: "maria.chen@careconnect.org",
    phone: "(217) 555-0101", title: "Program Director", hireDate: "2019-03-15",
    homeAssignments: ["home1","home2","home3"], status: "active" },
  { id: "staff1", name: "James Williams", role: "staff", email: "james.williams@careconnect.org",
    phone: "(217) 555-0182", title: "Direct Support Professional", hireDate: "2021-08-02",
    homeAssignments: ["home1","home2"], status: "active" },
  { id: "staff2", name: "Sarah Rodriguez", role: "staff", email: "sarah.rodriguez@careconnect.org",
    phone: "(217) 555-0244", title: "Senior DSP", hireDate: "2020-11-14",
    homeAssignments: ["home1","home3"], status: "active" },
  { id: "staff3", name: "David Okafor", role: "staff", email: "david.okafor@careconnect.org",
    phone: "(217) 555-0317", title: "Direct Support Professional", hireDate: "2022-04-20",
    homeAssignments: ["home2","home3"], status: "active" },
  { id: "staff4", name: "Ashley Kim", role: "staff", email: "ashley.kim@careconnect.org",
    phone: "(217) 555-0389", title: "Behavioral Technician", hireDate: "2023-01-09",
    homeAssignments: ["home2"], status: "active" },
];

const CLIENTS: Client[] = [
  {
    id: "c1", name: "Marcus Thompson", age: 34, dob: "1990-07-12",
    homeId: "home1", primaryDSP: "James Williams", status: "active",
    initials: "MT", color: "#1a4f7a",
    diagnoses: ["Autism Spectrum Disorder (Level 2)", "Generalized Anxiety Disorder"],
    allergies: ["Penicillin", "Shellfish"],
    primaryContact: { name: "Diane Thompson", phone: "(217) 555-0445", relationship: "Mother" },
    medications: [
      { id: "m1", name: "Sertraline", dosage: "100mg", frequency: "Once daily (morning)",
        prescriber: "Dr. Anika Patel", startDate: "2022-03-10",
        instructions: "Take with food. Do not crush.", active: true },
      { id: "m2", name: "Risperidone", dosage: "1mg", frequency: "Twice daily (morning & evening)",
        prescriber: "Dr. Anika Patel", startDate: "2021-09-05",
        instructions: "Monitor for EPS symptoms.", active: true },
      { id: "m3", name: "Melatonin", dosage: "5mg", frequency: "At bedtime (PRN)",
        prescriber: "Dr. Anika Patel", startDate: "2023-01-18",
        instructions: "30 minutes before desired sleep time.", active: true },
    ],
    appointments: [
      { id: "a1", type: "Psychiatry Follow-up", provider: "Dr. Anika Patel",
        date: "2026-06-28", time: "10:00 AM", location: "Springfield Behavioral Health, Suite 204",
        notes: "Quarterly medication review. Bring current behavior data.", status: "scheduled" },
      { id: "a2", type: "OT Evaluation", provider: "Carla Nguyen, OTR/L",
        date: "2026-07-09", time: "2:00 PM", location: "Community Therapy Center",
        notes: "Sensory processing assessment follow-up.", status: "scheduled" },
      { id: "a3", type: "PCP Annual Visit", provider: "Dr. Michael Ross",
        date: "2026-05-14", time: "11:30 AM", location: "Springfield Primary Care",
        notes: "Completed. Labs normal. Weight stable.", status: "completed" },
    ],
    behavioralPlan: {
      lastUpdated: "2026-04-15", author: "Maria Chen",
      targets: [
        { name: "Verbal Aggression",
          definition: "Any verbal statement directed toward staff or peers that is threatening, demeaning, or uses profanity.",
          antecedent: "Transitions between preferred and non-preferred activities; unexpected schedule changes; noise levels exceeding comfortable range.",
          consequence: "Brief verbal redirection using neutral tone; environmental reset; offer sensory break.",
          goal: "Reduce verbal aggression from baseline of 4 incidents/week to 1 or fewer over 8 consecutive weeks." },
        { name: "Property Destruction",
          definition: "Any forceful contact with objects resulting in damage or displacement.",
          antecedent: "Denial of preferred item/activity; task demands above current skill level.",
          consequence: "Non-contingent reinforcement schedule; neutral redirection; brief environmental reset.",
          goal: "Reduce property destruction from baseline of 2 incidents/week to 0 over 4 consecutive weeks." },
      ],
      strategies: [
        "Visual schedule posted at eye level in bedroom and common areas",
        "Transition warnings given at 10, 5, and 2 minutes prior",
        "First-Then visual supports for non-preferred activities",
        "Sensory breaks available every 90 minutes",
        "Noise-canceling headphones available at all times",
      ],
      reinforcers: ["iPad access (10-min increments)", "Preferred YouTube videos", "Park walks", "Goldfish crackers, apple juice"],
    },
    notes: [
      { id: "n1", author: "James Williams", date: "2026-06-21", time: "4:45 PM",
        content: "Marcus had an excellent shift today. He completed his morning ADL routine independently without prompting. During dinner prep he helped set the table and folded napkins — a significant positive step toward independence goals. He requested his iPad after dinner and used it appropriately for 25 minutes. No behavioral incidents. Mood was elevated and calm throughout the entire shift.",
        mood: "positive", tags: ["ADL", "independence", "compliance"] },
      { id: "n2", author: "Sarah Rodriguez", date: "2026-06-20", time: "8:30 PM",
        content: "Mild verbal outburst during evening TV time when David changed the channel. Marcus said 'I hate you' and went to his room. Staff used brief redirection: acknowledged his feelings, gave him 5 minutes, then re-engaged with his preferred YouTube channel. Recovered well within 10 minutes. No escalation beyond initial statement.",
        mood: "concerning", tags: ["verbal aggression", "evening", "peer interaction"] },
      { id: "n3", author: "David Okafor", date: "2026-06-19", time: "3:15 PM",
        content: "Routine afternoon. Marcus attended the community walk and completed 0.8 miles. He interacted with a neighbor appropriately and greeted them by name — a great moment for community integration. Medications taken as scheduled. Appetite was good at all meals.",
        mood: "neutral", tags: ["community", "walk", "medications"] },
    ],
  },
  {
    id: "c2", name: "Priya Patel", age: 28, dob: "1997-11-03",
    homeId: "home1", primaryDSP: "Sarah Rodriguez", status: "active",
    initials: "PP", color: "#7c3aed",
    diagnoses: ["Intellectual Disability (Mild)", "Obsessive Compulsive Disorder"],
    allergies: ["Latex", "Sulfa drugs"],
    primaryContact: { name: "Raj Patel", phone: "(217) 555-0512", relationship: "Father" },
    medications: [
      { id: "m4", name: "Fluoxetine", dosage: "20mg", frequency: "Once daily (morning)",
        prescriber: "Dr. Leah Sommer", startDate: "2021-05-22",
        instructions: "Take with or without food. May cause initial insomnia.", active: true },
      { id: "m5", name: "Hydroxyzine", dosage: "25mg", frequency: "PRN for acute anxiety (max 3x/day)",
        prescriber: "Dr. Leah Sommer", startDate: "2022-08-10",
        instructions: "Document each PRN use in MAR.", active: true },
    ],
    appointments: [
      { id: "a4", type: "Psychiatry Follow-up", provider: "Dr. Leah Sommer",
        date: "2026-07-03", time: "1:30 PM", location: "Springfield Behavioral Health, Suite 118",
        notes: "OCD symptom review. Consider ERP therapy referral.", status: "scheduled" },
      { id: "a5", type: "Speech Therapy", provider: "Monica Briggs, SLP",
        date: "2026-06-25", time: "9:00 AM", location: "Community Therapy Center",
        notes: "Bi-weekly pragmatic language session.", status: "scheduled" },
    ],
    behavioralPlan: {
      lastUpdated: "2026-03-20", author: "Maria Chen",
      targets: [
        { name: "Repetitive Questioning",
          definition: "Asking the same question more than 3 times within a 10-minute window after receiving a complete answer.",
          antecedent: "Unstructured time; schedule uncertainty; novel environments.",
          consequence: "Provide full answer once; redirect with scheduled activity or worry journal.",
          goal: "Reduce repetitive questioning from 12+ episodes/day to 4 or fewer per day." },
      ],
      strategies: [
        "Structured daily visual schedule updated each morning",
        "Designated question time at meals",
        "Worry journal available in bedroom",
        "Consistent staff responses using identical answer scripts",
      ],
      reinforcers: ["Baking activities", "Backyard gardening", "Makeup and nail care", "Phone calls to family"],
    },
    notes: [
      { id: "n4", author: "Sarah Rodriguez", date: "2026-06-21", time: "5:00 PM",
        content: "Priya had a productive day. She completed her gardening task independently and was very proud of the tomatoes growing. Repetitive questioning was minimal — only 2 episodes, both redirected successfully with her worry journal. Medication taken on schedule. Called her father in the evening which significantly lifted her mood.",
        mood: "positive", tags: ["gardening", "OCD", "family contact"] },
    ],
  },
  {
    id: "c3", name: "Elijah Morgan", age: 41, dob: "1984-02-28",
    homeId: "home2", primaryDSP: "Ashley Kim", status: "active",
    initials: "EM", color: "#059669",
    diagnoses: ["Schizophrenia (Paranoid Type)", "Intellectual Disability (Moderate)"],
    allergies: ["Aspirin"],
    primaryContact: { name: "Grace Morgan", phone: "(217) 555-0633", relationship: "Sister" },
    medications: [
      { id: "m6", name: "Aripiprazole", dosage: "15mg", frequency: "Once daily (morning)",
        prescriber: "Dr. Charles Obi", startDate: "2020-06-01",
        instructions: "Monitor for akathisia and tardive dyskinesia.", active: true },
      { id: "m7", name: "Valproic Acid", dosage: "500mg", frequency: "Twice daily",
        prescriber: "Dr. Charles Obi", startDate: "2020-06-01",
        instructions: "Monitor liver enzymes quarterly. Take with food.", active: true },
      { id: "m8", name: "Benztropine", dosage: "1mg", frequency: "Twice daily",
        prescriber: "Dr. Charles Obi", startDate: "2021-02-14",
        instructions: "EPS management. Monitor for anticholinergic effects.", active: true },
    ],
    appointments: [
      { id: "a6", type: "Psychiatry Follow-up", provider: "Dr. Charles Obi",
        date: "2026-06-30", time: "9:30 AM", location: "Central Illinois Mental Health Clinic",
        notes: "Monthly med check. Review positive symptom log.", status: "scheduled" },
      { id: "a7", type: "Lab Work", provider: "Quest Diagnostics",
        date: "2026-06-24", time: "7:30 AM", location: "Quest Diagnostics — 450 N 5th St",
        notes: "Valproate level, LFTs, CBC.", status: "scheduled" },
    ],
    behavioralPlan: {
      lastUpdated: "2026-05-01", author: "Maria Chen",
      targets: [
        { name: "Paranoid Ideation Responses",
          definition: "Verbal statements expressing belief staff or peers are conspiring against him, resulting in med refusal or activity withdrawal.",
          antecedent: "Changes in staff schedule; new staff introductions; environmental stressors.",
          consequence: "Calm low-stimulation interaction; validate emotions without reinforcing paranoid content; contact nurse if escalated.",
          goal: "Reduce medication refusals related to paranoia from 3x/week to 0x/week over 8 weeks." },
      ],
      strategies: [
        "Consistent staffing schedule — minimize unexpected changes",
        "Pre-introduce new staff via photo 24 hours in advance",
        "Medication offered in clear cup — Elijah may inspect before taking",
        "Daily agenda review each morning at 8:00 AM",
      ],
      reinforcers: ["Drawing and sketching materials", "Classic R&B music", "Meal preparation", "One-on-one quiet time with preferred staff"],
    },
    notes: [
      { id: "n5", author: "Ashley Kim", date: "2026-06-21", time: "6:00 PM",
        content: "Elijah took all medications without resistance — 5 consecutive days of full compliance. He spent the afternoon drawing in his sketchbook and appeared calm. Brief paranoid comment at dinner ('people watching him') was redirected quickly with his art materials. No significant behavioral incidents. Overall a positive shift.",
        mood: "neutral", tags: ["medications", "compliance", "paranoia", "art"] },
    ],
  },
  {
    id: "c4", name: "Sophia Chen", age: 19, dob: "2006-09-17",
    homeId: "home2", primaryDSP: "David Okafor", status: "active",
    initials: "SC", color: "#d97706",
    diagnoses: ["Autism Spectrum Disorder (Level 1)", "Epilepsy (Absence Seizures)"],
    allergies: ["None known"],
    primaryContact: { name: "Kevin & Joan Chen", phone: "(217) 555-0718", relationship: "Parents" },
    medications: [
      { id: "m9", name: "Levetiracetam (Keppra)", dosage: "500mg", frequency: "Twice daily",
        prescriber: "Dr. Nancy Voss, Neurology", startDate: "2023-11-08",
        instructions: "Do not skip doses. Monitor for mood changes.", active: true },
      { id: "m10", name: "Escitalopram", dosage: "10mg", frequency: "Once daily (morning)",
        prescriber: "Dr. Leah Sommer", startDate: "2024-03-15",
        instructions: "Take with food. Reassess after 12 weeks.", active: true },
    ],
    appointments: [
      { id: "a8", type: "Neurology Follow-up", provider: "Dr. Nancy Voss",
        date: "2026-07-15", time: "3:00 PM", location: "Memorial Neurology Associates",
        notes: "Seizure frequency review. Last absence: 2026-05-29.", status: "scheduled" },
      { id: "a9", type: "Vocational Assessment", provider: "Transition Works, LLC",
        date: "2026-06-27", time: "10:00 AM", location: "Transition Works — 220 Commerce Blvd",
        notes: "Employment readiness evaluation for competitive integrated employment.", status: "scheduled" },
    ],
    behavioralPlan: {
      lastUpdated: "2026-04-22", author: "Maria Chen",
      targets: [
        { name: "Social Initiation in Community Settings",
          definition: "Initiating verbal or non-verbal interaction with unfamiliar individuals in community settings without prompting.",
          antecedent: "Community outings, volunteer activities, employment settings.",
          consequence: "Immediate praise and preferred reinforcer following any spontaneous initiation.",
          goal: "Increase unprompted social initiations from 0-1 per outing to 3+ per outing by Q3 2026." },
      ],
      strategies: [
        "Daily social scripts practice in home setting",
        "Roleplay community scenarios with preferred staff",
        "Video modeling for employment interactions",
        "Graduated exposure — familiar settings before novel ones",
      ],
      reinforcers: ["Digital art activities", "Animal videos on YouTube", "Boba tea outings", "Animal Crossing (Nintendo Switch)"],
    },
    notes: [
      { id: "n6", author: "David Okafor", date: "2026-06-21", time: "7:30 PM",
        content: "Sophia had a wonderful outing at the farmers market. She independently asked a vendor 'How much is this?' and purchased a small plant — a significant milestone for her social initiation goals! No observed seizure activity today. Evening was calm; she spent time digital drawing. All medications taken on schedule.",
        mood: "positive", tags: ["community", "social initiation", "milestone", "employment prep"] },
    ],
  },
  {
    id: "c5", name: "Robert Davis", age: 55, dob: "1970-04-05",
    homeId: "home3", primaryDSP: "Sarah Rodriguez", status: "active",
    initials: "RD", color: "#dc2626",
    diagnoses: ["Traumatic Brain Injury (Moderate)", "Major Depressive Disorder"],
    allergies: ["Codeine", "Ibuprofen"],
    primaryContact: { name: "Patricia Davis", phone: "(217) 555-0891", relationship: "Legal Guardian" },
    medications: [
      { id: "m11", name: "Sertraline", dosage: "50mg", frequency: "Once daily (morning)",
        prescriber: "Dr. Renata Flores", startDate: "2022-10-19",
        instructions: "Assess for SI monthly. Document PHQ-9 scores.", active: true },
      { id: "m12", name: "Donepezil", dosage: "10mg", frequency: "Once daily (bedtime)",
        prescriber: "Dr. Renata Flores", startDate: "2023-04-07",
        instructions: "Bedtime administration reduces nausea. Monitor for vivid dreams.", active: true },
      { id: "m13", name: "Amlodipine", dosage: "5mg", frequency: "Once daily (morning)",
        prescriber: "Dr. Marcus Webb (PCP)", startDate: "2021-07-22",
        instructions: "BP monitoring 3x/week. Log in vitals book.", active: true },
    ],
    appointments: [
      { id: "a10", type: "Psychiatry Follow-up", provider: "Dr. Renata Flores",
        date: "2026-07-01", time: "11:00 AM", location: "Springfield Behavioral Health, Suite 302",
        notes: "PHQ-9 required. Recent scores trending lower — flag to Dr. Flores.", status: "scheduled" },
      { id: "a11", type: "PCP Visit", provider: "Dr. Marcus Webb",
        date: "2026-06-26", time: "2:30 PM", location: "Capital City Primary Care",
        notes: "BP slightly elevated this week. Bring BP log.", status: "scheduled" },
    ],
    behavioralPlan: {
      lastUpdated: "2026-05-10", author: "Maria Chen",
      targets: [
        { name: "Depressive Withdrawal",
          definition: "Refusing to leave bedroom, declining meals, or verbal hopelessness lasting more than 2 consecutive hours.",
          antecedent: "Rainy/overcast weather; reduced guardian contact; routine changes.",
          consequence: "Non-coercive engagement every 15 minutes; offer preferred activities; contact supervisor if withdrawal exceeds 4 hours.",
          goal: "Reduce prolonged withdrawal episodes from 3/week to 0/week. Maintain daily meal participation." },
      ],
      strategies: [
        "Morning check-in with preferred staff",
        "Light therapy lamp 30 minutes each morning",
        "Structured daily activities schedule",
        "Daily phone call opportunity with Patricia",
      ],
      reinforcers: ["Classic film DVDs", "Woodworking projects", "Card games with staff", "Ice cream outings"],
    },
    notes: [
      { id: "n7", author: "Sarah Rodriguez", date: "2026-06-21", time: "4:30 PM",
        content: "Robert had a mixed day. Stayed in his room until 10:30 AM and skipped breakfast initially. Staff offered preferred coffee and he came out. He later completed his woodworking puzzle and we played two rounds of Rummy. PHQ-9 completed — score of 11 (moderate depression). Documented and flagged to supervisor per protocol. Evening medications taken.",
        mood: "neutral", tags: ["depression", "withdrawal", "PHQ-9", "medications"] },
    ],
  },
  {
    id: "c6", name: "Amara Wilson", age: 31, dob: "1994-12-20",
    homeId: "home3", primaryDSP: "David Okafor", status: "active",
    initials: "AW", color: "#7c3aed",
    diagnoses: ["Intellectual Disability (Mild)", "PTSD", "Borderline Personality Disorder features"],
    allergies: ["Amoxicillin"],
    primaryContact: { name: "Pastor James Wilson", phone: "(217) 555-0967", relationship: "Legal Guardian (Uncle)" },
    medications: [
      { id: "m14", name: "Prazosin", dosage: "2mg", frequency: "At bedtime",
        prescriber: "Dr. Anika Patel", startDate: "2024-01-15",
        instructions: "For PTSD nightmares. Monitor for orthostatic hypotension.", active: true },
      { id: "m15", name: "Paroxetine", dosage: "20mg", frequency: "Once daily (morning)",
        prescriber: "Dr. Anika Patel", startDate: "2023-08-04",
        instructions: "Do not discontinue abruptly — taper required. Take with food.", active: true },
    ],
    appointments: [
      { id: "a12", type: "Trauma Therapy (EMDR)", provider: "Dr. Kimberly Nash, LCPC",
        date: "2026-06-24", time: "4:00 PM", location: "Healing Path Counseling Center",
        notes: "Bi-weekly EMDR session. Transport needed from home.", status: "scheduled" },
      { id: "a13", type: "Psychiatry Follow-up", provider: "Dr. Anika Patel",
        date: "2026-07-08", time: "10:30 AM", location: "Springfield Behavioral Health, Suite 204",
        notes: "Prazosin efficacy review. Sleep log required.", status: "scheduled" },
    ],
    behavioralPlan: {
      lastUpdated: "2026-05-18", author: "Maria Chen",
      targets: [
        { name: "Emotional Dysregulation",
          definition: "Crying, yelling, or mild self-injurious behavior lasting more than 5 minutes disproportionate to identified trigger.",
          antecedent: "Interpersonal conflict (real or perceived); trauma reminders; feeling dismissed.",
          consequence: "DBT-informed TIPP skills: cold water, paced breathing. Remove from trigger. Contact supervisor for any SIB.",
          goal: "Reduce dysregulation episodes from 5/week to 2 or fewer. No SIB in any rolling 30-day period." },
      ],
      strategies: [
        "DBT skills poster in bedroom and bathroom",
        "Daily emotion check-ins using feelings thermometer",
        "Trauma-informed care — avoid power struggles",
        "Safety plan posted in staff binder",
      ],
      reinforcers: ["Crafting and jewelry-making", "Dance exercise videos", "Cooking special meals", "Nature walks"],
    },
    notes: [
      { id: "n8", author: "David Okafor", date: "2026-06-21", time: "9:00 PM",
        content: "Amara had a calm evening overall. Attended vocational program during the day (positive day program report received). At home she completed a beaded bracelet and showed it to staff proudly. Brief tearfulness at ~7 PM about missing her grandmother — used breathing exercises and recovered within 8 minutes without escalation. Excellent use of coping skills. Sleep medication given at 9:30 PM.",
        mood: "positive", tags: ["coping skills", "DBT", "jewelry", "self-regulation"] },
    ],
  },
];

const SCHEDULE: ScheduleEntry[] = [
  { id: "s1", date: "2026-06-22", startTime: "8:00 AM", endTime: "4:00 PM", homeId: "home1", clientIds: ["c1","c2"], type: "regular" },
  { id: "s2", date: "2026-06-23", startTime: "8:00 AM", endTime: "4:00 PM", homeId: "home2", clientIds: ["c3","c4"], type: "regular" },
  { id: "s3", date: "2026-06-24", startTime: "12:00 PM", endTime: "8:00 PM", homeId: "home1", clientIds: ["c1","c2"], type: "regular" },
  { id: "s4", date: "2026-06-25", startTime: "8:00 AM", endTime: "4:00 PM", homeId: "home1", clientIds: ["c1","c2"], type: "regular" },
  { id: "s5", date: "2026-06-26", startTime: "8:00 AM", endTime: "6:00 PM", homeId: "home2", clientIds: ["c3","c4"], type: "overtime" },
  { id: "s6", date: "2026-06-27", startTime: "9:00 AM", endTime: "1:00 PM", homeId: "home1", clientIds: [], type: "training" },
];

const TIMESHEET_INIT: TimesheetEntry[] = [
  { id: "t1", date: "2026-06-15", startTime: "8:00 AM", endTime: "4:00 PM", hours: 8, homeId: "home1", notes: "Regular shift", status: "approved" },
  { id: "t2", date: "2026-06-16", startTime: "8:00 AM", endTime: "4:00 PM", hours: 8, homeId: "home2", notes: "Regular shift", status: "approved" },
  { id: "t3", date: "2026-06-17", startTime: "12:00 PM", endTime: "8:00 PM", hours: 8, homeId: "home1", notes: "Afternoon/evening shift", status: "approved" },
  { id: "t4", date: "2026-06-18", startTime: "8:00 AM", endTime: "4:00 PM", hours: 8, homeId: "home1", notes: "Regular shift", status: "submitted" },
  { id: "t5", date: "2026-06-19", startTime: "8:00 AM", endTime: "6:00 PM", hours: 10, homeId: "home2", notes: "Overtime — staff called out", status: "submitted" },
  { id: "t6", date: "2026-06-22", startTime: "8:00 AM", endTime: "4:00 PM", hours: 8, homeId: "home1", notes: "", status: "draft" },
];

const behaviorChartData = [
  { week: "Wk 1", verbal: 4, property: 2 },
  { week: "Wk 2", verbal: 3, property: 1 },
  { week: "Wk 3", verbal: 5, property: 2 },
  { week: "Wk 4", verbal: 2, property: 1 },
  { week: "Wk 5", verbal: 3, property: 0 },
  { week: "Wk 6", verbal: 1, property: 0 },
];

const weeklyHoursData = [
  { day: "Mon", hours: 8 }, { day: "Tue", hours: 8 },
  { day: "Wed", hours: 8 }, { day: "Thu", hours: 8 }, { day: "Fri", hours: 10 },
];

const incidentTrendData = [
  { month: "Jan", incidents: 18 }, { month: "Feb", incidents: 14 },
  { month: "Mar", incidents: 21 }, { month: "Apr", incidents: 12 },
  { month: "May", incidents: 9 }, { month: "Jun", incidents: 7 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getHome = (id: string) => HOMES.find(h => h.id === id);
const getHomeName = (id: string) => getHome(id)?.name ?? id;
const getClientName = (id: string) => CLIENTS.find(c => c.id === id)?.name ?? id;

function fmtDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function fmtDateShort(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

const moodStyle = {
  positive: "text-emerald-700 bg-emerald-50 border-emerald-200",
  neutral: "text-slate-600 bg-slate-50 border-slate-200",
  concerning: "text-amber-700 bg-amber-50 border-amber-200",
};
const MoodIcon = ({ mood }: { mood: Note["mood"] }) => {
  if (mood === "positive") return <CheckCircle className="w-3.5 h-3.5" />;
  if (mood === "concerning") return <AlertTriangle className="w-3.5 h-3.5" />;
  return <Info className="w-3.5 h-3.5" />;
};

function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: "text-emerald-700 bg-emerald-50 border-emerald-200",
    inactive: "text-slate-500 bg-slate-50 border-slate-100",
    scheduled: "text-blue-700 bg-blue-50 border-blue-200",
    completed: "text-emerald-700 bg-emerald-50 border-emerald-200",
    cancelled: "text-red-700 bg-red-50 border-red-200",
    draft: "text-slate-600 bg-slate-50 border-slate-200",
    submitted: "text-blue-700 bg-blue-50 border-blue-200",
    approved: "text-emerald-700 bg-emerald-50 border-emerald-200",
    regular: "text-blue-700 bg-blue-50 border-blue-200",
    overtime: "text-amber-700 bg-amber-50 border-amber-200",
    training: "text-violet-700 bg-violet-50 border-violet-200",
  };
  return clsx("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border", map[status] ?? "text-slate-600 bg-slate-50 border-slate-200");
}

function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sz = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-14 h-14 text-lg" : "w-10 h-10 text-sm";
  return (
    <div className={clsx("rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0", sz)} style={{ backgroundColor: color }}>
      {initials}
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: (u: AppUser) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = USERS.find(u => u.email === email);
    if (user && password === "password") { onLogin(user); }
    else { setError("Invalid email or password. Try a demo account below."); }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] bg-sidebar p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, #0d9488 0%, transparent 60%), radial-gradient(circle at 80% 80%, #1a4f7a 0%, transparent 50%)"
        }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">Care Connect</span>
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                Supporting people.<br />Empowering teams.
              </h1>
              <p className="text-slate-400 text-base leading-relaxed">
                The complete behavioral DSP platform for managing clients, care plans, staff schedules, and compliance documentation — all in one place.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Shield, text: "HIPAA-compliant data security" },
                { icon: ClipboardList, text: "Behavioral plan & medication tracking" },
                { icon: Users, text: "Role-based staff permissions" },
                { icon: Clock, text: "Integrated scheduling & timesheets" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-slate-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="relative text-slate-500 text-xs">© 2026 Care Connect. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-foreground text-lg font-bold">Care Connect</span>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
            <p className="text-muted-foreground text-sm">Sign in to access your workspace</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@careconnect.org"
                className="w-full px-3.5 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
            <button type="submit" className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-semibold text-sm hover:opacity-90 active:scale-[.98] transition-all">
              Sign in
            </button>
          </form>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">Quick demo access</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {USERS.map(u => (
              <button key={u.id} onClick={() => onLogin(u)}
                className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-secondary/40 transition-all text-left group">
                <div className="flex items-center gap-2 mb-1">
                  <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold", u.role === "admin" ? "bg-primary" : "bg-accent")}>
                    {u.name.charAt(0)}
                  </div>
                  <span className={clsx("text-xs font-semibold capitalize px-1.5 py-0.5 rounded-full", u.role === "admin" ? "text-primary bg-secondary" : "text-accent bg-emerald-50")}>
                    {u.role}
                  </span>
                </div>
                <div className="text-sm font-semibold text-foreground">{u.name}</div>
                <div className="text-xs text-muted-foreground">{u.title}</div>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Demo password: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">password</code>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_ADMIN = [
  { view: "dashboard" as View, label: "Dashboard", icon: Activity },
  { view: "clients" as View, label: "All Clients", icon: Users },
  { view: "homes" as View, label: "Group Homes", icon: Building2 },
  { view: "staff-mgmt" as View, label: "Staff", icon: UserCheck },
  { view: "reports" as View, label: "Reports", icon: BarChart2 },
];
const NAV_STAFF = [
  { view: "dashboard" as View, label: "Dashboard", icon: Activity },
  { view: "clients" as View, label: "My Clients", icon: Users },
  { view: "schedule" as View, label: "My Schedule", icon: Calendar },
  { view: "timesheet" as View, label: "Timesheet", icon: Clock },
];

function Sidebar({ user, view, onNav, onLogout, open, onClose }: {
  user: AppUser; view: View; onNav: (v: View) => void;
  onLogout: () => void; open: boolean; onClose: () => void;
}) {
  const nav = user.role === "admin" ? NAV_ADMIN : NAV_STAFF;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />}
      <aside className={clsx(
        "fixed top-0 left-0 h-full w-64 bg-sidebar z-30 flex flex-col transition-transform duration-200",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white text-sm font-bold leading-none">Care Connect</div>
              <div className="text-sidebar-foreground text-xs mt-0.5">Behavioral DSP</div>
            </div>
          </div>
          <button className="lg:hidden text-sidebar-foreground hover:text-white" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <div className="px-2 mb-2">
            <p className="text-sidebar-foreground text-xs font-semibold uppercase tracking-wider opacity-50">
              {user.role === "admin" ? "Administration" : "My Workspace"}
            </p>
          </div>
          {nav.map(({ view: v, label, icon: Icon }) => (
            <button key={v} onClick={() => { onNav(v); onClose(); }}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                view === v
                  ? "bg-accent text-white shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className={clsx("w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0", user.role === "admin" ? "bg-primary" : "bg-accent")}>
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="min-w-0">
              <div className="text-sidebar-accent-foreground text-sm font-semibold truncate">{user.name}</div>
              <div className="text-sidebar-foreground text-xs truncate">{user.title}</div>
            </div>
          </div>
          <button onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-red-500/10 hover:text-red-400 text-sm font-medium transition-colors">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ title, user, onMenuOpen, actions }: {
  title: string; user: AppUser; onMenuOpen: () => void; actions?: React.ReactNode;
}) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-6 gap-4 flex-shrink-0">
      <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={onMenuOpen}>
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex-1 flex items-center gap-3">
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <button className="relative w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-card" />
        </button>
        <div className={clsx("w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold", user.role === "admin" ? "bg-primary" : "bg-accent")}>
          {user.name.split(" ").map(n => n[0]).join("")}
        </div>
      </div>
    </header>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{label}</span>
        <div className={clsx("w-9 h-9 rounded-lg flex items-center justify-center", color)}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {sub && <div className="text-muted-foreground text-xs mt-1">{sub}</div>}
    </div>
  );
}

// ─── Dashboard View ───────────────────────────────────────────────────────────

function DashboardView({ user, onNav, onClientSelect }: {
  user: AppUser; onNav: (v: View) => void; onClientSelect: (id: string) => void;
}) {
  const myClients = user.role === "staff"
    ? CLIENTS.filter(c => user.homeAssignments.includes(c.homeId))
    : CLIENTS;

  const upcomingApts = CLIENTS.flatMap(c => c.appointments
    .filter(a => a.status === "scheduled")
    .map(a => ({ ...a, clientName: c.name, clientId: c.id }))
  ).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);

  const recentNotes = CLIENTS.flatMap(c => c.notes.map(n => ({ ...n, clientName: c.name, clientId: c.id, initials: c.initials, color: c.color })))
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time)).slice(0, 4);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {user.name.split(" ")[0]}
          </h2>
          <p className="text-muted-foreground text-sm">Monday, June 22, 2026 · {user.title}</p>
        </div>
        {user.role === "staff" && (
          <button onClick={() => onNav("timesheet")}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition">
            <Clock className="w-4 h-4" /> Log Hours
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {user.role === "admin" ? (
          <>
            <StatCard label="Active Clients" value={CLIENTS.filter(c => c.status === "active").length} sub="Across all homes" icon={Users} color="bg-blue-50 text-primary" />
            <StatCard label="Group Homes" value={HOMES.length} sub={`${HOMES.reduce((s, h) => s + h.capacity - h.clientIds.length, 0)} beds available`} icon={Building2} color="bg-emerald-50 text-emerald-600" />
            <StatCard label="Staff Members" value={STAFF_MEMBERS.filter(s => s.status === "active").length} sub="All active" icon={UserCheck} color="bg-violet-50 text-violet-600" />
            <StatCard label="Appts This Week" value={upcomingApts.length} sub="Next 7 days" icon={Calendar} color="bg-amber-50 text-amber-600" />
          </>
        ) : (
          <>
            <StatCard label="My Clients" value={myClients.length} sub="Assigned to me" icon={Users} color="bg-blue-50 text-primary" />
            <StatCard label="Shifts This Week" value={SCHEDULE.length} sub="Scheduled" icon={Calendar} color="bg-emerald-50 text-emerald-600" />
            <StatCard label="Hours This Week" value="42" sub="8 overtime" icon={Clock} color="bg-amber-50 text-amber-600" />
            <StatCard label="Pending Timesheets" value={TIMESHEET_INIT.filter(t => t.status === "draft").length} sub="Needs submission" icon={FileText} color="bg-violet-50 text-violet-600" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-foreground">
                {user.role === "admin" ? "Incident Trend" : "Weekly Hours"}
              </h3>
              <p className="text-muted-foreground text-xs">
                {user.role === "admin" ? "Organization-wide incidents, last 6 months" : "Current pay period"}
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            {user.role === "admin" ? (
              <AreaChart data={incidentTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a4f7a" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1a4f7a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5d7a96" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#5d7a96" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                <Area type="monotone" dataKey="incidents" stroke="#1a4f7a" strokeWidth={2} fill="url(#incGrad)" dot={{ r: 3, fill: "#1a4f7a" }} />
              </AreaChart>
            ) : (
              <BarChart data={weeklyHoursData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5d7a96" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#5d7a96" }} axisLine={false} tickLine={false} domain={[0, 12]} />
                <Tooltip contentStyle={{ fontSize: 12, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8 }} />
                <Bar dataKey="hours" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Upcoming appointments */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Upcoming Appointments</h3>
            <span className="text-xs text-muted-foreground">{upcomingApts.length} total</span>
          </div>
          <div className="space-y-3">
            {upcomingApts.map(apt => (
              <button key={apt.id} onClick={() => onClientSelect(apt.clientId)}
                className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors group">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Stethoscope className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate">{apt.type}</div>
                    <div className="text-xs text-muted-foreground">{apt.clientName}</div>
                    <div className="text-xs text-primary font-medium mt-0.5">{fmtDate(apt.date)} · {apt.time}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent observations */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">Recent Observations</h3>
          <button onClick={() => onNav("clients")} className="text-xs text-accent font-semibold hover:underline">View all clients</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentNotes.map(note => (
            <button key={note.id} onClick={() => onClientSelect(note.clientId)}
              className="text-left p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Avatar initials={note.initials} color={note.color} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-foreground">{note.clientName}</div>
                  <div className="text-xs text-muted-foreground">{note.author} · {fmtDate(note.date)}</div>
                </div>
                <span className={clsx("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border", moodStyle[note.mood])}>
                  <MoodIcon mood={note.mood} />
                  {note.mood}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{note.content}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Clients List View ────────────────────────────────────────────────────────

function ClientsView({ user, onClientSelect }: {
  user: AppUser; onClientSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterHome, setFilterHome] = useState("all");

  const displayed = useMemo(() => {
    const base = user.role === "staff"
      ? CLIENTS.filter(c => user.homeAssignments.includes(c.homeId))
      : CLIENTS;
    return base.filter(c => {
      const q = search.toLowerCase();
      const matchSearch = !search || c.name.toLowerCase().includes(q) || c.diagnoses.some(d => d.toLowerCase().includes(q));
      const matchHome = filterHome === "all" || c.homeId === filterHome;
      return matchSearch && matchHome;
    });
  }, [search, filterHome, user]);

  const homes = user.role === "staff"
    ? HOMES.filter(h => user.homeAssignments.includes(h.id))
    : HOMES;

  return (
    <div className="p-4 lg:p-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search clients or diagnoses..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select value={filterHome} onChange={e => setFilterHome(e.target.value)}
          className="px-3 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="all">All Homes</option>
          {homes.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
        </select>
      </div>

      {/* Count */}
      <p className="text-muted-foreground text-xs mb-4 font-medium">{displayed.length} client{displayed.length !== 1 ? "s" : ""}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {displayed.map(client => (
          <button key={client.id} onClick={() => onClientSelect(client.id)}
            className="bg-card rounded-xl border border-border p-5 text-left hover:border-primary/40 hover:shadow-sm transition-all group">
            <div className="flex items-start gap-3 mb-3">
              <Avatar initials={client.initials} color={client.color} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground text-sm">{client.name}</h3>
                  <span className={statusBadge(client.status)}>{client.status}</span>
                </div>
                <p className="text-muted-foreground text-xs">Age {client.age} · {getHomeName(client.homeId)}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
            <div className="space-y-1.5 mb-3">
              {client.diagnoses.slice(0, 2).map(d => (
                <div key={d} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">{d}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Pill className="w-3.5 h-3.5" />
                {client.medications.filter(m => m.active).length} meds
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {client.appointments.filter(a => a.status === "scheduled").length} upcoming
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                {client.primaryDSP.split(" ")[0]}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Client Detail View ───────────────────────────────────────────────────────

type ClientTab = "overview" | "behavioral" | "medications" | "appointments" | "notes";

function ClientDetailView({ clientId, user, onBack }: {
  clientId: string; user: AppUser; onBack: () => void;
}) {
  const client = CLIENTS.find(c => c.id === clientId);
  const [tab, setTab] = useState<ClientTab>("overview");
  const [notes, setNotes] = useState(client?.notes ?? []);
  const [noteText, setNoteText] = useState("");
  const [noteMood, setNoteMood] = useState<Note["mood"]>("neutral");
  const [noteTags, setNoteTags] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!client) return <div className="p-6 text-muted-foreground">Client not found.</div>;

  const home = getHome(client.homeId);

  function submitNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim()) return;
    const newNote: Note = {
      id: `n-${Date.now()}`, author: user.name,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      content: noteText.trim(),
      mood: noteMood,
      tags: noteTags.split(",").map(t => t.trim()).filter(Boolean),
    };
    setNotes(prev => [newNote, ...prev]);
    setNoteText(""); setNoteTags(""); setNoteMood("neutral"); setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const tabs: { id: ClientTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: User },
    { id: "behavioral", label: "Behavioral Plan", icon: Brain },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "notes", label: "Observations", icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 lg:px-6 py-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-3 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to clients
        </button>
        <div className="flex items-start gap-4">
          <Avatar initials={client.initials} color={client.color} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-foreground">{client.name}</h2>
              <span className={statusBadge(client.status)}>{client.status}</span>
            </div>
            <p className="text-muted-foreground text-sm">DOB: {fmtDate(client.dob)} · Age {client.age} · {home?.name}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {client.diagnoses.map(d => (
                <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">{d}</span>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1 text-right flex-shrink-0">
            <div className="text-xs text-muted-foreground">Primary DSP</div>
            <div className="text-sm font-semibold text-foreground">{client.primaryDSP}</div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-0 mt-4 -mb-4 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={clsx(
                "flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap",
                tab === t.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}>
              <t.icon className="w-3.5 h-3.5" />{t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">

        {/* Overview */}
        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-card rounded-xl border border-border p-5 space-y-4">
              <h3 className="font-bold text-foreground text-sm">Personal Information</h3>
              {[
                { label: "Date of Birth", value: fmtDate(client.dob) },
                { label: "Age", value: client.age },
                { label: "Residence", value: home?.name ?? client.homeId },
                { label: "Address", value: home?.address },
              ].map(r => (
                <div key={r.label} className="flex items-start justify-between gap-4">
                  <span className="text-xs text-muted-foreground font-medium">{r.label}</span>
                  <span className="text-sm text-foreground text-right">{r.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Known Allergies</p>
                <div className="flex flex-wrap gap-1.5">
                  {client.allergies.map(a => (
                    <span key={a} className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">{a}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-5 space-y-4">
              <h3 className="font-bold text-foreground text-sm">Emergency Contact</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{client.primaryContact.name}</div>
                  <div className="text-muted-foreground text-xs">{client.primaryContact.relationship}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="w-4 h-4 text-muted-foreground" />
                {client.primaryContact.phone}
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Diagnoses</p>
                <div className="space-y-1.5">
                  {client.diagnoses.map(d => (
                    <div key={d} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-5 lg:col-span-2">
              <h3 className="font-bold text-foreground text-sm mb-3">Quick Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted">
                  <div className="text-xl font-bold text-primary">{client.medications.filter(m => m.active).length}</div>
                  <div className="text-xs text-muted-foreground">Active Meds</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <div className="text-xl font-bold text-accent">{client.appointments.filter(a => a.status === "scheduled").length}</div>
                  <div className="text-xs text-muted-foreground">Upcoming Apts</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <div className="text-xl font-bold text-violet-600">{client.behavioralPlan.targets.length}</div>
                  <div className="text-xs text-muted-foreground">Target Behaviors</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <div className="text-xl font-bold text-amber-600">{notes.length}</div>
                  <div className="text-xs text-muted-foreground">Observations</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Behavioral Plan */}
        {tab === "behavioral" && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-xs text-muted-foreground bg-card rounded-lg border border-border px-4 py-3">
              <Shield className="w-4 h-4 text-accent" />
              <span>Last updated: <strong className="text-foreground">{fmtDate(client.behavioralPlan.lastUpdated)}</strong> by {client.behavioralPlan.author}</span>
            </div>
            {client.behavioralPlan.targets.map((t, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-primary/5 border-b border-border px-5 py-3 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-foreground text-sm">Target Behavior: {t.name}</h3>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { label: "Definition", value: t.definition },
                    { label: "Antecedents", value: t.antecedent },
                    { label: "Consequence Strategy", value: t.consequence },
                    { label: "Goal", value: t.goal, accent: true },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{row.label}</div>
                      <p className={clsx("text-sm", row.accent ? "text-accent font-semibold" : "text-foreground")}>{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Strategies
                </h3>
                <ul className="space-y-2">
                  {client.behavioralPlan.strategies.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" /> Reinforcers
                </h3>
                <div className="flex flex-wrap gap-2">
                  {client.behavioralPlan.reinforcers.map((r, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medications */}
        {tab === "medications" && (
          <div className="space-y-3">
            {client.medications.map(med => (
              <div key={med.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{med.name}</h3>
                      <p className="text-muted-foreground text-xs">{med.dosage} · {med.frequency}</p>
                    </div>
                  </div>
                  <span className={statusBadge(med.active ? "active" : "inactive")}>{med.active ? "Active" : "Inactive"}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold mb-0.5">Prescriber</div>
                    <div className="text-foreground">{med.prescriber}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold mb-0.5">Start Date</div>
                    <div className="text-foreground">{fmtDate(med.startDate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold mb-0.5">Instructions</div>
                    <div className="text-foreground">{med.instructions}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Appointments */}
        {tab === "appointments" && (
          <div className="space-y-3">
            {client.appointments.map(apt => (
              <div key={apt.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{apt.type}</h3>
                      <p className="text-muted-foreground text-xs">{apt.provider}</p>
                    </div>
                  </div>
                  <span className={statusBadge(apt.status)}>{apt.status}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {fmtDate(apt.date)} at {apt.time}
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {apt.location}
                  </div>
                  {apt.notes && (
                    <div className="flex items-start gap-2 text-muted-foreground text-xs sm:col-span-3">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      {apt.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Observations / Notes */}
        {tab === "notes" && (
          <div className="space-y-5">
            {/* Submit note form */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                <PenLine className="w-4 h-4 text-accent" /> Log New Observation
              </h3>
              {submitted && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm mb-4">
                  <CheckCircle className="w-4 h-4" /> Observation saved successfully.
                </div>
              )}
              <form onSubmit={submitNote} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Observation Notes *</label>
                  <textarea
                    value={noteText} onChange={e => setNoteText(e.target.value)} rows={4}
                    placeholder="Describe the client's mood, behavior, activities, incidents, and any relevant observations during your shift..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Overall Mood</label>
                    <div className="flex gap-2">
                      {(["positive", "neutral", "concerning"] as Note["mood"][]).map(m => (
                        <button key={m} type="button" onClick={() => setNoteMood(m)}
                          className={clsx(
                            "flex-1 py-2 rounded-lg text-xs font-semibold border transition-all capitalize",
                            noteMood === m ? moodStyle[m] + " border-current" : "border-border text-muted-foreground hover:bg-muted"
                          )}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Tags (comma-separated)</label>
                    <input value={noteTags} onChange={e => setNoteTags(e.target.value)}
                      placeholder="e.g. medications, community, behavior"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4" /> Submit Observation
                  </button>
                </div>
              </form>
            </div>

            {/* Notes list */}
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                        {note.author.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{note.author}</div>
                        <div className="text-xs text-muted-foreground">{fmtDate(note.date)} at {note.time}</div>
                      </div>
                    </div>
                    <span className={clsx("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border", moodStyle[note.mood])}>
                      <MoodIcon mood={note.mood} />
                      {note.mood}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3">{note.content}</p>
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {note.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Schedule View ────────────────────────────────────────────────────────────

function ScheduleView({ user }: { user: AppUser }) {
  return (
    <div className="p-4 lg:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-foreground">Week of June 22 – 28, 2026</h2>
          <p className="text-muted-foreground text-xs">Your scheduled shifts</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">42 hrs total</span>
        </div>
      </div>

      <div className="space-y-3">
        {SCHEDULE.map(entry => (
          <div key={entry.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start gap-4">
              <div className="text-center min-w-[52px]">
                <div className="text-xs font-semibold text-muted-foreground">
                  {new Date(entry.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="text-2xl font-bold text-foreground leading-none">
                  {new Date(entry.date + "T12:00:00").getDate()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(entry.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-foreground text-sm">{getHomeName(entry.homeId)}</span>
                  <span className={statusBadge(entry.type)}>{entry.type}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  {entry.startTime} – {entry.endTime}
                </div>
                {entry.type === "training" ? (
                  <div className="flex items-center gap-1.5 text-xs text-violet-700 bg-violet-50 rounded-lg px-2.5 py-1.5 border border-violet-200 w-fit">
                    <BookOpen className="w-3 h-3" /> Staff Training Session
                  </div>
                ) : entry.clientIds.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.clientIds.map(id => (
                      <span key={id} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                        {getClientName(id)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Timesheet View ───────────────────────────────────────────────────────────

function TimesheetView({ user }: { user: AppUser }) {
  const [entries, setEntries] = useState(TIMESHEET_INIT);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", startTime: "", endTime: "", homeId: "home1", notes: "" });
  const [saved, setSaved] = useState(false);

  const totalHours = entries.reduce((s, e) => s + e.hours, 0);
  const approvedHours = entries.filter(e => e.status === "approved").reduce((s, e) => s + e.hours, 0);

  function calcHours(start: string, end: string) {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return Math.max(0, (eh * 60 + em - sh * 60 - sm) / 60);
  }

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    const hours = calcHours(form.startTime, form.endTime);
    const newEntry: TimesheetEntry = {
      id: `t-${Date.now()}`, date: form.date,
      startTime: form.startTime, endTime: form.endTime,
      hours, homeId: form.homeId, notes: form.notes, status: "draft",
    };
    setEntries(prev => [newEntry, ...prev]);
    setForm({ date: "", startTime: "", endTime: "", homeId: "home1", notes: "" });
    setShowForm(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function submitAll() {
    setEntries(prev => prev.map(e => e.status === "draft" ? { ...e, status: "submitted" } : e));
  }

  const hasDrafts = entries.some(e => e.status === "draft");

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{totalHours}</div>
          <div className="text-xs text-muted-foreground">Total Hours</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600">{approvedHours}</div>
          <div className="text-xs text-muted-foreground">Approved</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{totalHours > 40 ? totalHours - 40 : 0}</div>
          <div className="text-xs text-muted-foreground">Overtime hrs</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button onClick={() => setShowForm(f => !f)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Add Entry
        </button>
        {hasDrafts && (
          <button onClick={submitAll}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:opacity-90 transition">
            <Send className="w-4 h-4" /> Submit All Drafts
          </button>
        )}
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <CheckCircle className="w-4 h-4" /> Entry added. Submit when ready.
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-bold text-foreground text-sm mb-4">New Timesheet Entry</h3>
          <form onSubmit={addEntry} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Date *</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Start Time *</label>
                <input type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">End Time *</label>
                <input type="time" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Location</label>
                <select value={form.homeId} onChange={e => setForm(f => ({ ...f, homeId: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  {HOMES.filter(h => user.homeAssignments.includes(h.id)).map(h => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Notes</label>
                <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Optional notes..."
                  className="w-full px-3 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition">
                Cancel
              </button>
              <button type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition">
                Add Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Entries table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-bold text-foreground text-sm">Pay Period Entries</h3>
        </div>
        <div className="divide-y divide-border">
          {entries.map(entry => (
            <div key={entry.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="min-w-[100px]">
                <div className="text-sm font-semibold text-foreground">{fmtDateShort(entry.date)}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground">{getHomeName(entry.homeId)}</div>
                <div className="text-xs text-muted-foreground">{entry.startTime} – {entry.endTime}{entry.notes ? " · " + entry.notes : ""}</div>
              </div>
              <div className="text-sm font-bold text-foreground tabular-nums w-16 text-right">{entry.hours}h</div>
              <span className={statusBadge(entry.status)}>{entry.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Homes View ───────────────────────────────────────────────────────────────

function HomesView({ user, onClientSelect }: { user: AppUser; onClientSelect: (id: string) => void }) {
  const homes = user.role === "staff"
    ? HOMES.filter(h => user.homeAssignments.includes(h.id))
    : HOMES;

  return (
    <div className="p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {homes.map(home => {
          const clients = CLIENTS.filter(c => home.clientIds.includes(c.id));
          const occupancy = Math.round((clients.length / home.capacity) * 100);
          return (
            <div key={home.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="bg-primary/5 border-b border-border px-5 py-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Home className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{home.name}</h3>
                      <p className="text-muted-foreground text-xs">{home.manager}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground">{clients.length}/{home.capacity}</div>
                    <div className="text-xs text-muted-foreground">residents</div>
                  </div>
                </div>
                {/* Occupancy bar */}
                <div className="mt-3">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${occupancy}%` }} />
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {home.address}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Phone className="w-3.5 h-3.5" /> {home.phone}
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Residents</p>
                  <div className="space-y-2">
                    {clients.map(c => (
                      <button key={c.id} onClick={() => onClientSelect(c.id)}
                        className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted transition-colors group">
                        <Avatar initials={c.initials} color={c.color} size="sm" />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">{c.name}</div>
                          <div className="text-xs text-muted-foreground">Age {c.age}</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Staff Management View (admin only) ───────────────────────────────────────

function StaffMgmtView() {
  const [search, setSearch] = useState("");
  const filtered = STAFF_MEMBERS.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-4 lg:p-6 space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search staff..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-foreground text-sm">{filtered.length} staff members</h3>
        </div>
        <div className="divide-y divide-border">
          {filtered.map(member => (
            <div key={member.id} className="flex items-center gap-4 px-5 py-4">
              <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0", member.role === "admin" ? "bg-primary" : "bg-accent")}>
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">{member.name}</span>
                  <span className={clsx("text-xs px-1.5 py-0.5 rounded-full font-semibold capitalize", member.role === "admin" ? "text-primary bg-secondary" : "text-accent bg-emerald-50")}>
                    {member.role}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{member.title}</div>
              </div>
              <div className="hidden md:block text-xs text-muted-foreground text-right">
                <div className="flex items-center gap-1.5 mb-0.5"><Mail className="w-3 h-3" />{member.email}</div>
                <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{member.phone}</div>
              </div>
              <div className="hidden lg:block">
                <div className="text-xs text-muted-foreground mb-1 font-medium">Assignments</div>
                <div className="flex flex-wrap gap-1">
                  {member.homeAssignments.map(hid => (
                    <span key={hid} className="text-xs px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground">{getHomeName(hid)}</span>
                  ))}
                </div>
              </div>
              <span className={statusBadge(member.status)}>{member.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Reports View (admin only) ────────────────────────────────────────────────

function ReportsView() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Incident trend */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-bold text-foreground mb-1">Incident Trend</h3>
          <p className="text-muted-foreground text-xs mb-4">Behavioral incidents — last 6 months</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={incidentTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a4f7a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1a4f7a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5d7a96" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5d7a96" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="incidents" stroke="#1a4f7a" strokeWidth={2} fill="url(#grad1)" dot={{ r: 3, fill: "#1a4f7a" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Behavior chart */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-bold text-foreground mb-1">Marcus Thompson — Behavior Tracking</h3>
          <p className="text-muted-foreground text-xs mb-4">Verbal aggression & property destruction, last 6 weeks</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={behaviorChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#5d7a96" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5d7a96" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8 }} />
              <Bar dataKey="verbal" name="Verbal Aggression" fill="#1a4f7a" radius={[3, 3, 0, 0]} />
              <Bar dataKey="property" name="Property Destruction" fill="#0d9488" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-bold text-foreground text-sm">Client Overview Report</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["Client", "Home", "Active Meds", "Upcoming Apts", "Behavior Targets", "Last Note"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CLIENTS.map(c => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar initials={c.initials} color={c.color} size="sm" />
                      <span className="font-medium text-foreground">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{getHomeName(c.homeId)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-primary">{c.medications.filter(m => m.active).length}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-accent">{c.appointments.filter(a => a.status === "scheduled").length}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-violet-600">{c.behavioralPlan.targets.length}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {c.notes.length > 0 ? fmtDate(c.notes[0].date) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── View Titles ──────────────────────────────────────────────────────────────

const VIEW_TITLES: Record<View, string> = {
  dashboard: "Dashboard",
  clients: "Clients",
  "client-detail": "Client Profile",
  schedule: "My Schedule",
  timesheet: "Timesheet",
  homes: "Group Homes",
  "staff-mgmt": "Staff Management",
  reports: "Reports",
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogin(user: AppUser) {
    setCurrentUser(user);
    setView("dashboard");
  }

  function handleLogout() {
    setCurrentUser(null);
    setView("dashboard");
    setSelectedClientId(null);
  }

  function handleClientSelect(id: string) {
    setSelectedClientId(id);
    setView("client-detail");
    setSidebarOpen(false);
  }

  function handleNav(v: View) {
    setView(v);
    if (v !== "client-detail") setSelectedClientId(null);
  }

  if (!currentUser) return <LoginPage onLogin={handleLogin} />;

  const activeView = view === "client-detail" && selectedClientId ? "client-detail" : view;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        user={currentUser} view={activeView}
        onNav={handleNav} onLogout={handleLogout}
        open={sidebarOpen} onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        <TopBar
          title={VIEW_TITLES[activeView]}
          user={currentUser}
          onMenuOpen={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          {activeView === "dashboard" && (
            <DashboardView user={currentUser} onNav={handleNav} onClientSelect={handleClientSelect} />
          )}
          {activeView === "clients" && (
            <ClientsView user={currentUser} onClientSelect={handleClientSelect} />
          )}
          {activeView === "client-detail" && selectedClientId && (
            <ClientDetailView clientId={selectedClientId} user={currentUser} onBack={() => handleNav("clients")} />
          )}
          {activeView === "schedule" && <ScheduleView user={currentUser} />}
          {activeView === "timesheet" && <TimesheetView user={currentUser} />}
          {activeView === "homes" && (
            <HomesView user={currentUser} onClientSelect={handleClientSelect} />
          )}
          {activeView === "staff-mgmt" && currentUser.role === "admin" && <StaffMgmtView />}
          {activeView === "reports" && currentUser.role === "admin" && <ReportsView />}
        </main>
      </div>
    </div>
  );
}

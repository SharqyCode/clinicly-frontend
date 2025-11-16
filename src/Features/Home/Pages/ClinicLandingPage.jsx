import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
// import { Search, Calendar, UserPlus, Check } from "lucide-react";
import heroImg from "../assets/Landing/health-professional-team-concept.png";
import doctorRun from "../assets/Landing/doctorRun.jpg";
import patientCare from "../assets/Landing/patientCare.jpg";

// Single-file landing page for a single clinic instance
// - Tailwind classes throughout
// - Framer Motion for entry animations
// - Placeholder images used (via.placeholder.com)

export default function ClinicLandingPage() {
  // counters
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const [patientsServed, setPatientsServed] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    if (!statsInView) return;

    // animate counters to final values
    const animate = (setter, to, duration = 900) => {
      const start = Date.now();
      const from = 0;
      const tick = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(from + (to - from) * progress);
        setter(value);
        if (progress < 1) requestAnimationFrame(tick);
      };
      tick();
    };

    animate(setPatientsServed, 12420, 1200);
    animate(setDoctorsCount, 18, 900);
    animate(setYears, 12, 900);
  }, [statsInView]);

  // booking form state (local only - placeholders)
  const [specialty, setSpecialty] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");

  const doctorsMock = [
    {
      id: 1,
      name: "Dr. Omar Hassan",
      spec: "General Physician",
      img: "https://via.placeholder.com/400x300?text=Dr.+Omar",
    },
    {
      id: 2,
      name: "Dr. Sara Khaled",
      spec: "Pediatrics",
      img: "https://via.placeholder.com/400x300?text=Dr.+Sara",
    },
    {
      id: 3,
      name: "Dr. Amr Fathy",
      spec: "Dentistry",
      img: "https://via.placeholder.com/400x300?text=Dr.+Amr",
    },
  ];

  const specialties = [...new Set(doctorsMock.map((d) => d.spec))];

  function handleApplyDoctor(e) {
    e.preventDefault();
    alert("Thanks! Your application has been received. (placeholder)");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 antialiased">
      {/* NAV */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            AS
          </div>
          <div>
            <div className="font-semibold">Al Shifa Medical Center</div>
            <div className="text-xs text-slate-500">Care you can trust</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#book"
            className="text-sm px-4 py-2 rounded-md hover:bg-slate-100"
          >
            Book Appointment
          </a>
          <a
            href="#join"
            className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:opacity-95"
          >
            Join as Doctor
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Quality care, personalized for you
          </h1>
          <p className="mt-4 text-slate-600">
            Book online, get reminders, and consult with our experienced team —
            all in one place.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow hover:opacity-95"
            >
              {/* <UserPlus size={18} />  */}
              Get Started
            </a>
            <a
              href="#book"
              className="inline-flex items-center gap-2 border border-slate-200 px-5 py-3 rounded-lg"
            >
              {/* <Calendar size={16} />  */}
              Book Appointment
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
              <div className="text-2xl font-semibold">
                {patientsServed.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">Patients served</div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
              <div className="text-2xl font-semibold">{doctorsCount}</div>
              <div className="text-xs text-slate-500">Active doctors</div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
              <div className="text-2xl font-semibold">{years}</div>
              <div className="text-xs text-slate-500">Years of service</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="">
            <img src={heroImg} alt="Clinic hero" className="w-full" />
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg w-64"
          >
            <div className="text-sm font-semibold">Dr. Sara Khaled</div>
            <div className="text-xs text-slate-500">
              Pediatrics · Accepting new patients
            </div>
            <div className="mt-3 flex gap-2">
              <a
                href="#book"
                className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-md"
              >
                Book
              </a>
              <a href="#" className="text-sm px-3 py-2 border rounded-md">
                Profile
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* stats observer anchor */}
        <div ref={statsRef} className="pointer-events-none" />
      </header>

      <main className="max-w-6xl mx-auto px-6 space-y-16">
        {/* WHY CHOOSE US */}

        <motion.section
          // ref={ref}
          initial={{ opacity: 0, y: 18, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h3 className="text-2xl font-semibold">Why Al Shifa?</h3>
            <p className="text-slate-600 mt-2">
              Modern care with a human touch. We combine experience, technology,
              and compassion.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                {/* <Check size={18} className="mt-1 text-sky-600" /> */}
                <div>
                  <div className="font-semibold">Trusted Doctors</div>
                  <div className="text-xs text-slate-500">
                    Experienced, vetted specialists.
                  </div>
                </div>
              </li>
              <li className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                {/* <Check size={18} className="mt-1 text-sky-600" /> */}
                <div>
                  <div className="font-semibold">Digital Prescriptions</div>
                  <div className="text-xs text-slate-500">
                    Fill or download prescriptions instantly.
                  </div>
                </div>
              </li>
              <li className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                {/* <Check size={18} className="mt-1 text-sky-600" /> */}
                <div>
                  <div className="font-semibold">Telemedicine</div>
                  <div className="text-xs text-slate-500">
                    Secure video consultations from home.
                  </div>
                </div>
              </li>
              <li className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                {/* <Check size={18} className="mt-1 text-sky-600" /> */}
                <div>
                  <div className="font-semibold">Easy Billing</div>
                  <div className="text-xs text-slate-500">
                    Transparent invoices and online payments.
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="">
            <img src={doctorRun} alt="facilities" />
          </div>
        </motion.section>

        {/* TESTIMONIALS */}
        <motion.section
          initial={{ opacity: 0, y: 18, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.8,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className=""
        >
          <h3 className="text-2xl font-semibold">What our patients say</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.blockquote
              initial={{ opacity: 0, x: -18, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <div className="font-semibold">Sarah K.</div>
              <div className="text-slate-600 mt-2">
                "Booking was simple — and the doctor was understanding and
                professional. Highly recommend."
              </div>
            </motion.blockquote>

            <motion.blockquote
              initial={{ opacity: 0, x: 18, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <div className="font-semibold">Dr. Omar H.</div>
              <div className="text-slate-600 mt-2">
                "The clinic's system keeps my day organized. I can focus on
                patients, not paperwork."
              </div>
            </motion.blockquote>
          </div>
        </motion.section>

        {/* BOOK APPOINTMENT */}
        <section id="book" className="bg-white rounded-2xl shadow p-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Book an appointment</h2>
              <p className="text-slate-600 mt-1">
                Find your doctor and schedule a visit in minutes.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-slate-500">
              Need help? Call us at <strong>+20 2 1234 5678</strong>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-8">
            <div className="">
              <img src={patientCare} alt="facilities" className="max-h-80" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                The best care you can ask for
              </h3>
              <p className="text-slate-600 mt-1">One click away.</p>
              <a
                href="#book"
                className="inline-flex items-center gap-2 bg-accent-primary-main text-text-light px-5 py-3 rounded-lg mt-5"
              >
                {/* <Calendar size={16} />  */}
                Book Appointment
              </a>
            </div>
          </div>
        </section>

        {/* JOIN US - Doctors */}
        <section id="join" className="bg-white rounded-2xl shadow p-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Join Our Team</h2>
              <p className="text-slate-600 mt-1">
                Apply to become part of Al Shifa's growing medical family.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-slate-500">
              Competitive compensation · Flexible scheduling
            </div>
          </div>

          <form
            onSubmit={handleApplyDoctor}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <input
              placeholder="Full name"
              className="col-span-1 md:col-span-1 border rounded-lg px-3 py-2"
              required
            />
            <input
              placeholder="Specialty (e.g., Cardiology)"
              className="col-span-1 md:col-span-1 border rounded-lg px-3 py-2"
              required
            />
            <input
              placeholder="Email"
              type="email"
              className="col-span-1 md:col-span-1 border rounded-lg px-3 py-2"
              required
            />

            <textarea
              placeholder="Short bio / experience"
              className="col-span-1 md:col-span-3 border rounded-lg px-3 py-2"
              rows={4}
            />

            <div className="col-span-1 md:col-span-3 flex justify-end">
              <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Apply to Join
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-bold text-lg">Al Shifa Medical Center</div>
            <div className="text-sm text-slate-300 mt-2">
              123 Health St., Cairo, Egypt
            </div>
            <div className="text-sm text-slate-300 mt-2">
              Mon — Sat: 8:00 — 20:00
            </div>
          </div>

          <div>
            <div className="font-semibold">Quick links</div>
            <ul className="mt-3 text-sm text-slate-300 space-y-2">
              <li>
                <a href="#book" className="hover:underline">
                  Book appointment
                </a>
              </li>
              <li>
                <a href="#join" className="hover:underline">
                  Join as doctor
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Patient login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <div className="text-sm text-slate-300 mt-3">
              Phone: +20 2 1234 5678
            </div>
            <div className="text-sm text-slate-300">
              Email: info@alshifa.example
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-slate-400 py-4">
          © {new Date().getFullYear()} Al Shifa Medical Center — Powered by
          Clinic.ly
        </div>
      </footer>
    </div>
  );
}

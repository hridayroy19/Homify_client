import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import MessengerCustomerChat from "react-messenger-customer-chat";
import {
  MdCall,
  MdEmail,
  MdLocationOn,
  MdAccessTime,
  MdSend,
  MdChat,
  MdArrowForward,
} from "react-icons/md";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

/* ── Constants ────────────────────────────────────────────────── */
const TEAM_AVATARS = [
  "https://i.ibb.co/LzWxcQc/assignment-helps-fbdf10d1.webp",
  "https://i.ibb.co/7zn0Gc0/editing-help-service-d5ba1cce.webp",
  "https://i.ibb.co/8NSMWkR/every-student-ment-f7a30282.webp",
];

const INFO_CARDS = [
  {
    Icon: MdCall,
    label: "Phone",
    value: "01777-70077",
    href: "tel:0177770077",
  },
  {
    Icon: MdEmail,
    label: "Email",
    value: "hrhridoyroy@gmail.com",
    href: "mailto:hrhridoyroy@gmail.com",
  },
  {
    Icon: MdLocationOn,
    label: "Address",
    value: "Rangpur, Dhaka, BD",
    href: "#map",
  },
  {
    Icon: MdAccessTime,
    label: "Hours",
    value: "Mon–Sat  9am – 6pm",
    href: "#",
  },
];

const SOCIALS = [
  {
    Icon: FaFacebook,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:bg-blue-600",
  },
  {
    Icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "hover:bg-sky-500",
  },
  {
    Icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:bg-pink-500",
  },
  {
    Icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:bg-blue-700",
  },
  {
    Icon: FaWhatsapp,
    href: "https://wa.me/0177770077",
    label: "WhatsApp",
    color: "hover:bg-green-500",
  },
];

/* ── Component ────────────────────────────────────────────────── */
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_zt3es0s", "template_ih4zkgp", form.current, {
        publicKey: "_M-Xno-tG5TitAcIS",
      })
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        (err) => toast.error("Failed to send. Please try again.", err),
      );
  };

  return (
    <>
      {/* Messenger Chat */}
      <MessengerCustomerChat pageId="103365232464560" appId="763941302317239" />

      <div className="bg-gradient-to-b from-amber-50/40 to-white">
        {/* ── Hero Banner ── */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src="https://i.ibb.co/TKpzWqV/contact-us1.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-14 flex flex-col gap-10">
          {/* ── Info Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFO_CARDS.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors duration-200">
                  <Icon className="text-amber-500 text-3xl group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                    {label}
                  </p>
                  <p className="text-lg font-semibold text-gray-800 truncate">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* ── Main Content: Left Info + Right Form ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ── Left Panel ── */}
            <div className="flex flex-col gap-6">
              {/* Ask Our Team card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Ask Our Team
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  Want to contact us directly? No problem — we are always here
                  for you, 24/7.
                </p>

                {/* Avatars */}
                <div className="flex items-center gap-1 mb-5">
                  {TEAM_AVATARS.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`team-${i}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm -ml-2 first:ml-0"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center -ml-2">
                    <span className="text-white text-[10px] font-bold">
                      +99
                    </span>
                  </div>
                  <span className="ml-3 text-xs text-gray-400 font-medium">
                    Our happy clients
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-100 mb-5" />

                {/* Contact details */}
                <div className="flex flex-col gap-3">
                  {[
                    { Icon: MdLocationOn, text: "Rangpur, Dhaka, Bangladesh" },
                    {
                      Icon: MdCall,
                      text: "01777-70077",
                      href: "tel:0177770077",
                    },
                    {
                      Icon: MdEmail,
                      text: "hrhridoyroy@gmail.com",
                      href: "mailto:hrhridoyroy@gmail.com",
                    },
                  ].map(({ Icon, text, href }) => (
                    <a
                      key={text}
                      href={href ?? "#"}
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      <span className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-amber-500 text-base" />
                      </span>
                      {text}
                    </a>
                  ))}
                </div>

                {/* Live chat button */}
                <button className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5">
                  <MdChat className="text-base" />
                  Start Live Chat
                </button>
              </div>

              {/* Social Links */}
              <div className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Follow Us
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {SOCIALS.map(({ Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className={`w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 ${color} hover:border-transparent hover:text-white transition-all duration-200 hover:-translate-y-0.5`}
                    >
                      <Icon className="text-sm" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div
                id="map"
                className="relative w-full h-52 rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.36721369!2d90.27923951562498!3d23.780573100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* ── Right: Email Form ── */}
            <div className="bg-white border border-gray-100 rounded-2xl px-6 py-8 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                Get In Touch
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h3>

              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="from_phone"
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="from_subject"
                      placeholder="Property inquiry..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 group mt-1"
                >
                  <MdSend className="text-base" />
                  Send Message
                  <MdArrowForward className="text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

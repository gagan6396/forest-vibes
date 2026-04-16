"use client";

import { useState } from "react";

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const field = (name: string) =>
    `w-full bg-transparent border-b py-4 text-[15px] font-light text-black placeholder:text-[#888] outline-none transition-colors duration-300 ${
      focused === name ? "border-[#3a6349]" : "border-[#ccc]"
    }`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const message = `*New Contact Form Submission*%0A%0A*First Name:* ${formData.firstName}%0A*Last Name:* ${formData.lastName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Message:* ${formData.message}`;
    
    // WhatsApp number (without + or spaces)
    const phoneNumber = "917500131319";
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    
    setSubmitted(true);
  };

  return (
    <section className="bg-[#f5f2eb] px-6 py-24 md:px-20 md:py-18">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p className="font-serif italic text-[13px] text-black tracking-wide mb-4">
            Request Info
          </p>
          <h2 className="font-serif font-light text-black text-[clamp(2.4rem,5vw,3.6rem)] leading-tight tracking-tight mb-5">
            Get in <em className="italic text-[#3a6349]">Touch</em> Today
          </h2>
          <p className="text-[14px] text-black font-light leading-[1.9] max-w-lg mx-auto">
            Reach out via phone, email, or the form below — we'll get back to you as soon as possible.
          </p>
          <div className="w-8 h-px bg-[#3a6349]/30 mx-auto mt-7" />
        </div>

        {/* ── Two col: form + map ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 shadow-sm">

          {/* Form */}
          <div className="bg-white px-12 py-14">
            <p className="font-serif italic text-[12px] text-black mb-8">Send us a message</p>

            {submitted ? (
              <div className="flex flex-col items-start justify-center h-80 gap-4">
                <div className="w-8 h-px bg-[#3a6349]" />
                <h3 className="font-serif font-light text-black text-3xl">Thank you.</h3>
                <p className="text-[14px] text-black font-light leading-relaxed">
                  We've received your message and will be in touch shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      message: ""
                    });
                  }}
                  className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#3a6349] hover:text-[#2d4f39] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-9" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name" 
                      className={field("first")}
                      onFocus={() => setFocused("first")} 
                      onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name" 
                      className={field("last")}
                      onFocus={() => setFocused("last")} 
                      onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="username@gmail.com" 
                    className={field("email")}
                    onFocus={() => setFocused("email")} 
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your number here..." 
                    className={field("phone")}
                    onFocus={() => setFocused("phone")} 
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">Your Message</label>
                  <textarea 
                    rows={5} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    className={`${field("msg")} resize-none`}
                    onFocus={() => setFocused("msg")} 
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3a6349] text-white text-[11px] font-semibold uppercase tracking-[0.22em] py-5 hover:bg-[#2d4f39] transition-colors duration-300"
                >
                  Submit Now
                </button>
              </form>
            )}
          </div>

          {/* Right: map + contact info */}
          <div className="flex flex-col">

            {/* Map embed */}
            <div className="flex-1" style={{ minHeight: "380px" }}>
              <iframe
                title="Forrest Vibes Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.500319459191!2d78.10797629999999!3d30.336727800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929078a97851b%3A0xcb105f6510d2c922!2sFORREST%20VIBES!5e0!3m2!1sen!2sin!4v1776322226763!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "380px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact details below map */}
            <div className="bg-[#1a1a1a] px-10 py-10">
              <p className="font-serif italic text-[12px] text-white/60 mb-7">Find us here</p>
              <div className="space-y-6">
                {[
                  { label: "Address", value: "Moza Bajhet, Khasra no- 51, Bajhet, Raipur PO:Raipur, DIST: Dehradun, Uttarakhand - 248008" },
                  { label: "Email", value: "username@gmail.com" },
                  { label: "Phone", value: "+91 7500131319" },
                  // { label: "Reception", value: "Open 24 / 7" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-6 items-start">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white font-bold pt-0.5 w-20 flex-shrink-0">
                      {item.label}
                    </span>
                    <span className="text-[13px] font-light text-white/70 leading-relaxed whitespace-pre-line">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
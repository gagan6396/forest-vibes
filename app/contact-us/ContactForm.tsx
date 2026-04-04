"use client";

import { useState } from "react";

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const field = (name: string) =>
    `w-full bg-transparent border-b py-4 text-[15px] font-light text-black placeholder:text-[#888] outline-none transition-colors duration-300 ${
      focused === name ? "border-[#3a6349]" : "border-[#ccc]"
    }`;

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
              </div>
            ) : (
              <form
                className="space-y-9"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">First Name</label>
                    <input type="text" placeholder="James" className={field("first")}
                      onFocus={() => setFocused("first")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">Last Name</label>
                    <input type="text" placeholder="Anderson" className={field("last")}
                      onFocus={() => setFocused("last")} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">Email Address</label>
                  <input type="email" placeholder="james@email.com" className={field("email")}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">Phone Number</label>
                  <input type="tel" placeholder="+1 (123) 456-7890" className={field("phone")}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black font-light block mb-1">Your Message</label>
                  <textarea rows={5} placeholder="How can we help you?" className={`${field("msg")} resize-none`}
                    onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
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
                title="Paradista Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.2!2d-9.1523!3d38.7223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933a6e6f6f6f7%3A0x0!2sAvenida+Miguel+Bombarda%2C+Lisboa!5e0!3m2!1sen!2spt!4v1"
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
                  { label: "Address", value: "Avenida Miguel Bombarda 89\nPortugal 1600-764" },
                  { label: "Email", value: "hello@paradista.com" },
                  { label: "Phone", value: "(123) 456-7890" },
                  { label: "Reception", value: "Open 24 / 7" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-6 items-start">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#3a6349] font-light pt-0.5 w-20 flex-shrink-0">
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
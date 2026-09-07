"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, X } from "lucide-react";

type FaqItem = { q: string; a: React.ReactNode };

const FAQS: FaqItem[] = [
  {
    q: "What is AeroStack?",
    a: (
      <>
        AeroStack is a live flight tracking tool that lets you explore active flights and search for
        flights, airlines, and routes. It is powered by Aviationstack, a flight data API that provides
        developers with real-time flight status, tracking, schedules, and global aviation data.
      </>
    ),
  },
  {
    q: "What is the data source for AeroStack?",
    a: (
      <>
        AeroStack is powered by Aviationstack API. Aviationstack provides real-time flight tracking and
        status data, along with information about airports, airlines, routes, aircraft, schedules, and
        other aviation entities.
      </>
    ),
  },
  {
    q: "How does the AeroStack flight tracker work?",
    a: (
      <>
        AeroStack uses aviation data provided through Aviationstack to display active flights and their
        status on an interactive map. You can search for a specific flight, airline, or route to explore
        available flight information.
      </>
    ),
  },
  {
    q: "Is AeroStack showing real-time flight data?",
    a: (
      <>
        Yes. AeroStack uses Aviationstack&apos;s real-time flight data to display active flights and flight
        status information. Aviationstack provides global flight status updates with delays as low as
        30–60 seconds, depending on the data source and flight.
      </>
    ),
  },
  {
    q: "What is Aviationstack API?",
    a: (
      <>
        Aviationstack is a REST API for accessing global aviation data programmatically. Developers can
        use it to retrieve real-time flight status and tracking information, historical flight data,
        schedules, airline routes, airport information, airline data, aircraft information, and more in a
        lightweight JSON format.
      </>
    ),
  },
  {
    q: "How can I use Aviationstack API to build a flight tracking application?",
    a: (
      <>
        You can use Aviationstack&apos;s flight endpoints to retrieve real-time flight status and tracking
        information and integrate the data into your own website or application. The API returns
        structured JSON data that can be used to build flight trackers, travel platforms, airport
        dashboards, maps, notifications, analytics tools, and other aviation applications.
      </>
    ),
  },
  {
    q: "What aviation data does Aviationstack API provide?",
    a: (
      <>
        Aviationstack provides a broad range of aviation data, including real-time flights, historical
        flight data, future schedules, airline routes, airports, airlines, airplanes, aircraft types,
        cities, countries, and aviation taxes. Its global coverage includes 10,000+ airports, 13,000+
        airlines, and 19,000+ airplanes across 250+ countries.
      </>
    ),
  },
];

const SIGNUP_URL =
  "https://app.apilayer.com/signup/aviationstack/?utm_source=aerostack_devtools&utm_medium=internal&utm_campaign=featured_section";

export function FaqModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // First question starts expanded so the panel never opens looking empty.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Escape closes, matching the detail panels' dismiss behaviour.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black/70 backdrop-blur-sm font-sans"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Frequently asked questions"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85vh] flex flex-col bg-[#141416] border border-[#2c2c2e] rounded-xl shadow-2xl overflow-hidden text-white"
          >
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 bg-[#1b2b4c] border-b border-[#2c2c2e]">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3D7BFF]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Frequently asked questions</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1.5">
                  About <span className="text-[#3D7BFF]">AeroStack</span>
                </h2>
                <p className="text-[11px] text-gray-300 mt-1">
                  Live flight tracking powered by the Aviationstack API.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close FAQ"
                className="text-gray-400 hover:text-white transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#2c2c2e]">
              {FAQS.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={item.q}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-[#1b1b1d] transition cursor-pointer"
                    >
                      <span className="flex items-start gap-3 min-w-0">
                        <span className="text-[10px] font-mono font-bold text-[#3D7BFF]/70 mt-0.5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-semibold text-gray-100">{item.q}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform ${
                          isOpen ? "rotate-180 text-[#3D7BFF]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 sm:px-5 pb-4 pl-10 sm:pl-12 text-[13px] leading-relaxed text-gray-400">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-end justify-end gap-2 bg-[#3D7BFF]/10 hover:bg-[#3D7BFF]/20 border-t border-[#3D7BFF]/30 px-4 sm:px-5 py-3 transition select-none"
            >
              {/* <span className="flex items-center gap-2 text-[11px] text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D7BFF] animate-pulse shrink-0" />
                Flight data by <span className="font-bold text-white">AviationStack</span>
              </span> */}
              <span className="text-[11px] font-semibold text-[#3D7BFF] group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                Get API Key →
              </span>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

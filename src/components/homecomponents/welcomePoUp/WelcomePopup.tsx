import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const FALLBACK_IMAGE =
  "https://i.ibb.co.com/fzjXfZzj/Chat-GPT-Image-Mar-31-2026-10-38-53-AM.png";

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("homify_popup_shown");
    if (!shown) {
      setOpen(true);
      sessionStorage.setItem("homify_popup_shown", "true");
    }
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
  };

  if (!open) return null;

  const imgSrc = FALLBACK_IMAGE;

  return (
    <>
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
        @keyframes popOut {
          from { opacity: 1; transform: scale(1)    translateY(0);     }
          to   { opacity: 0; transform: scale(0.88) translateY(12px);  }
        }
        .popup-card-enter { animation: popIn  0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .popup-card-exit  { animation: popOut 0.25s ease-in            forwards; }
      `}</style>

      <div
        className="fixed inset-0 z-[999] flex items-center justify-center px-4"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(6px)",
          transition: "opacity 0.3s ease",
          opacity: visible ? 1 : 0,
        }}
        onClick={handleClose}
      >
        <div
          className={`relative  overflow-hidden shadow-2xl max-w-xl w-full ${
            visible ? "popup-card-enter" : "popup-card-exit"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 z-10 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-200 shadow-sm"
            aria-label="Close"
          >
            <FaTimes className="text-xs" />
          </button>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={imgSrc}
              alt={"Welcome to HomifyEstate"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePopup;

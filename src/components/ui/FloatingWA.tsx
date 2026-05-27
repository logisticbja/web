"use client";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";

export function FloatingWA() {
  return (
    <WALink
      href={buildGeneralMessage()}
      className="fixed bottom-6 right-6 z-50 flex items-center"
      aria-label="Chat WhatsApp BJA Logistic"
    >
      {/* Chat bubble */}
      <div className="relative bg-white text-gray-800 text-sm font-semibold px-4 py-2.5 rounded-2xl mr-3" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
        Hubungi BJA Logistic
        {/* Arrow tail pointing right */}
        <span
          className="absolute top-1/2 -right-2 -translate-y-1/2"
          style={{
            width: 0,
            height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderLeft: "9px solid white",
          }}
        />
      </div>

      {/* WA circle button */}
      <div className="relative shrink-0">
        <div className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bc59] transition-colors flex items-center justify-center shadow-lg wa-pulse">
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.675 4.8 1.847 6.788L2 30l7.418-1.822A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.89-1.605l-.422-.252-4.403 1.082 1.107-4.296-.276-.44A11.56 11.56 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.35-8.67c-.347-.174-2.057-1.015-2.376-1.13-.318-.116-.55-.174-.78.174-.232.347-.896 1.13-1.099 1.362-.202.232-.405.26-.752.087-.347-.174-1.464-.54-2.788-1.72-1.03-.918-1.726-2.051-1.928-2.398-.202-.347-.021-.534.152-.707.156-.155.347-.405.52-.607.174-.202.232-.347.347-.579.116-.232.058-.434-.029-.607-.087-.174-.78-1.88-1.07-2.573-.28-.676-.567-.584-.78-.595l-.664-.011c-.232 0-.607.087-.925.434-.318.347-1.214 1.186-1.214 2.892s1.243 3.354 1.416 3.586c.174.232 2.447 3.734 5.928 5.237.829.358 1.476.572 1.98.732.832.265 1.589.228 2.187.138.667-.1 2.057-.841 2.347-1.654.289-.812.289-1.508.202-1.654-.087-.145-.318-.232-.664-.405z"/>
          </svg>
        </div>
        {/* Badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#CC1F2A] text-white text-[10px] font-black flex items-center justify-center">
          1
        </span>
      </div>
    </WALink>
  );
}

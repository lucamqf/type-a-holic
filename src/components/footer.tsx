import { Github, Mail } from "lucide-react";
import { IconButton } from "./ui/icon-button";
import { BuyMeACoffee } from "./buy-me-a-coffee";

export function Footer() {
  function openGithub() {
    window.open("https://github.com/lucamqf/Type-A-Holic")
  }

  function openMail() {
    window.open("mailto:lmqf@proton.me")
  }

  function buyMeACoffee() {
    window.open("https://www.paypal.com/donate/?business=LD6CL79GYC5KY&no_recurring=0&currency_code=BRL")
  }

  return (
    <div className="flex max-h-20 overflow-hidden h-full pb-4 px-10 items-center justify-between w-screen p-0 text-text gap-2">
      <div className="flex gap-4">
        <IconButton className="hover:text-text-200" onClick={openGithub}>
          <Github className="w-7 h-7"  />
        </IconButton>
        <IconButton className="hover:text-text-200" onClick={openMail}>
          <Mail className="w-7 h-7" />
        </IconButton>
      </div>
      <IconButton onClick={buyMeACoffee}>
        <BuyMeACoffee className="fill-text-100 hover:fill-text-200 w-[120px] transition-all duration-200" />
      </IconButton>
    </div>
  );
}

import { DM_Sans, Montserrat, Poppins  } from "next/font/google";
import 'funuicss/css/fun.css'
import "aos/dist/aos.css"
import "../assets/styles/globals.css"
const font = Poppins({ subsets: ["latin"]  , weight:["100", "300", "400", "500","600","700","800"]});

export const metadata = {
  title: "ICBTS",
  description: "Informal Cross Border Trade Survey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <div >
      <body className={[font.className ]}>{children}</body>
      </div>
    </html>
  );
}

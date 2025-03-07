import Footer from "@/components/Footer";
import Header from "@/components/Header";
import hero from "../assets/hero.jpeg";

type Props = {
  children: React.ReactNode;
  showHero: boolean;
};

export default function Layout({ children, showHero }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      {showHero && (
        <img src={hero} alt="" className="w-full h-screen object-cover" />
      )}
      <div className="container flex-1 mx-auto">{children}</div>
      <Footer />
    </div>
  );
}

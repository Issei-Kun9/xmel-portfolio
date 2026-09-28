import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import WhatsappFloat from "@/components/site/whatsapp-float";
import CtaTracker from "@/components/home/cta-tracker";

/** Header and footer for every main-site page (not the sites./pro. offers). */
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsappFloat />
      <CtaTracker />
    </>
  );
}

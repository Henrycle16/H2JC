import SmallFooter from "@/components/ui/footer/SmallFooter";
import ProfileHeader from "@/components/ui/header/ProfileHeader";

export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />
      <main className="container flex-1 mx-auto flex max-lg:py-5">
        {children}
      </main>
      <SmallFooter />
    </>
  );
}
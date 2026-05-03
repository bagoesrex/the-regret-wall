import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import Wall from "@/components/wall";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MaxWidthWrapper className="pt-20 pb-15">
        <Wall />
      </MaxWidthWrapper>
    </main>
  );
}

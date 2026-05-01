import MaxWidthWrapper from "@/components/layout/max-width-wrapper";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MaxWidthWrapper className="pt-20 pb-15">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-bold">The Regret Wall</h1>
          <p className="max-w-100">
            Dinding anonim tempat semua orang meninggalkan penyesalan mereka. Tempelkan milikmu.
          </p>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

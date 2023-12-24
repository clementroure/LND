import Dashboard from "@/components/pages/dashboard";

export default function IndexPage() {
  return (
    <main className="text-balance container grid max-w-prose items-center gap-6 space-y-4 pb-8 pt-6 md:py-10">
      <div className="flex min-h-[50vh] flex-col justify-center gap-3">
        <Dashboard />
      </div>
    </main>
  );
}

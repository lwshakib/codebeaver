import { DotPattern } from "@/components/background/dot-pattern"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Branding/Marketing */}
      <div className="relative hidden min-h-screen w-full items-center justify-center bg-zinc-950 lg:flex lg:w-3/5">
        <DotPattern className="absolute inset-0 z-0" />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-12 py-20 max-w-4xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
            You&apos;re 2 clicks away from
            <br />
            shipping higher-quality
            <br />
            code.
          </h1>
          <p className="mt-8 text-lg font-medium text-zinc-500 max-w-md">
            Free up development time while increasing productivity.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              14 days free trial
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              No credit card needed
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="flex w-full flex-1 flex-col justify-center bg-zinc-950 px-6 py-12 lg:w-2/5 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  )
}

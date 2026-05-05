"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Day {
  contributionCount: number;
  date: string;
  color: string;
}

interface Week {
  contributionDays: Day[];
}

interface ContributionActivityProps {
  calendar: Week[];
  totalContributions: number;
}

export function ContributionActivity({
  calendar,
  totalContributions,
}: ContributionActivityProps) {
  // Flatten days and group them by month for labels
  const allDays = calendar.flatMap((w) => w.contributionDays);

  // Get month labels
  const monthLabels: { label: string; index: number }[] = [];
  calendar.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const date = parseISO(firstDay.date);
      const monthLabel = format(date, "MMM");
      if (
        monthLabels.length === 0 ||
        monthLabels[monthLabels.length - 1].label !== monthLabel
      ) {
        monthLabels.push({ label: monthLabel, index: i });
      }
    }
  });

  const lastDay = allDays[allDays.length - 1];
  const displayYear = lastDay
    ? format(parseISO(lastDay.date), "yyyy")
    : format(new Date(), "yyyy");

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
      <div className="mx-4 lg:mx-6 overflow-hidden">
        <div className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Contribution Activity
            </h2>
            <p className="text-muted-foreground text-sm">
              Visualizing your coding frequency over the last year
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">{totalContributions}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              contributions in the last year
            </div>
          </div>
        </div>

        <div className="pt-6 pb-6">
          <div className="flex flex-col items-center w-full overflow-hidden">
            <div className="inline-flex flex-col gap-2 max-w-full overflow-x-auto pb-2 scrollbar-hide">
              {/* Month labels */}
              <div className="relative text-[10px] text-muted-foreground ml-8 h-4 mb-1 font-medium">
                {monthLabels.map((m, i) => (
                  <div
                    key={`${m.label}-${i}`}
                    style={{
                      position: "absolute",
                      left: `${m.index * 13.5}px`,
                    }}
                    className="whitespace-nowrap translate-y-[2px]"
                  >
                    {m.label}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                {/* Day labels */}
                <div className="flex flex-col gap-[3.5px] text-[10px] text-muted-foreground w-6 pt-1 font-medium">
                  {dayLabels.map((label, i) => (
                    <div key={i} className="h-[11px] flex items-center">
                      {label}
                    </div>
                  ))}
                </div>

                {/* The Grid */}
                <div className="flex gap-[3.5px]">
                  <TooltipProvider delayDuration={100}>
                    {calendar.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3.5px]">
                        {week.contributionDays.map((day, dayIndex) => {
                          const isZero = day.contributionCount === 0;
                          return (
                            <Tooltip key={day.date}>
                              <TooltipTrigger asChild>
                                <div
                                  className="w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-all hover:ring-2 hover:ring-primary/50"
                                  style={{
                                    backgroundColor: isZero ? "var(--muted)" : day.color,
                                    opacity: 0,
                                    animation: `popIn 0.3s ease-out forwards`,
                                    animationDelay: `${(weekIndex * 7 + dayIndex) * 0.001}s`
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs border-border bg-popover text-popover-foreground">
                                <span className="font-bold">
                                  {day.contributionCount} contributions
                                </span>{" "}
                                on {format(parseISO(day.date), "MMMM d, yyyy")}
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    ))}
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
            <div>
              {totalContributions} activities in {displayYear}
            </div>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-[2px]"
                    style={{
                      backgroundColor: i === 0 ? "var(--muted)" : "var(--primary)",
                      opacity: i === 0 ? 1 : i * 0.25,
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ContributionActivitySkeleton() {
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="mx-4 lg:mx-6 overflow-hidden">
      <div className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="text-right space-y-2 flex flex-col items-end">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      <div className="pt-6 pb-6">
        <div className="flex flex-col items-center w-full overflow-hidden">
          <div className="inline-flex flex-col gap-2">
            {/* Month labels placeholder */}
            <div className="flex gap-10 ml-8 h-4 mb-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-8" />
              ))}
            </div>

            <div className="flex gap-2">
              {/* Day labels */}
              <div className="flex flex-col gap-[3.5px] w-6 pt-1">
                {dayLabels.map((_, i) => (
                  <div key={i} className="h-[11px] flex items-center">
                    <Skeleton className="h-2 w-4" />
                  </div>
                ))}
              </div>

              {/* The Grid placeholder */}
              <div className="flex gap-[3.5px]">
                {Array.from({ length: 53 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3.5px]">
                    {Array.from({ length: 7 }).map((_, dayIndex) => (
                      <Skeleton
                        key={dayIndex}
                        className="w-[11px] h-[11px] rounded-[2px] opacity-20"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between pt-2 border-t border-border">
          <Skeleton className="h-3 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-8" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="w-2.5 h-2.5 rounded-[2px]" />
              ))}
            </div>
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

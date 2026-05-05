import { SearchIcon, RefreshCwIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Octokit } from "octokit";
import Link from "next/link";

export default async function RepositoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const { page: pageStr, search } = await searchParams;
  const page = parseInt(pageStr || "1", 10);
  const perPage = 10;

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/sign-in");
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  if (!account || !account.accessToken) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-foreground">No GitHub account connected</h1>
        <p className="text-muted-foreground">Please sign in with GitHub to view your repositories.</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
          <a href="/sign-in">Sign in with GitHub</a>
        </Button>
      </div>
    );
  }

  let repositories: any[] = [];
  let error = null;
  let totalCount = 0;

  try {
    const octokit = new Octokit({
      auth: account.accessToken,
    });

    const userResponse = await octokit.request("GET /user");
    const username = userResponse.data.login;
    
    // Improved total count logic
    totalCount = (userResponse.data.public_repos || 0) + (userResponse.data.total_private_repos || 0);

    if (search) {
      const response = await octokit.request("GET /search/repositories", {
        q: `user:${username} ${search} in:name`,
        sort: "updated",
        per_page: perPage,
        page: page,
      });
      repositories = response.data.items;
      totalCount = response.data.total_count;
    } else {
      const response = await octokit.request("GET /user/repos", {
        sort: "updated",
        per_page: perPage,
        page: page,
        affiliation: "owner,collaborator,organization_member",
        visibility: "all",
      });
      repositories = response.data;
    }
  } catch (err: any) {
    console.error("Failed to fetch repositories:", err);
    error = "Failed to fetch repositories from GitHub. Make sure your token has 'repo' scope for private repositories.";
  }

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Repositories</h1>
          <p className="mt-1 text-sm text-muted-foreground font-medium">List of repositories accessible to PulseGrid.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 border-border bg-background text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <RefreshCwIcon className="mr-2 size-3.5" />
            Sync Repositories
          </Button>
          <Button className="h-9 bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90">
            <PlusIcon className="mr-2 size-4" />
            Add Repositories
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          <form className="relative max-w-sm" action="/repositories" method="GET">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
            <Input 
              name="search"
              placeholder="Search repositories" 
              defaultValue={search}
              className="h-10 pl-10 bg-background border-border text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
            />
          </form>

          <div className="rounded-lg border border-border overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      Repository
                      <RefreshCwIcon className="size-3 text-muted-foreground" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {repositories.length > 0 ? (
                  repositories.map((repo) => (
                    <tr key={repo.id} className="group hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[14px] font-medium text-foreground/80 group-hover:text-foreground transition-colors"
                          >
                            {repo.full_name}
                          </a>
                          {repo.private ? (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary border border-primary/20 uppercase tracking-wide">Private</span>
                          ) : (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold text-muted-foreground border border-border uppercase tracking-wide">Public</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-12 text-center text-muted-foreground text-sm italic">
                      {search ? "No repositories matching your search." : "No repositories found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-8 pt-4">
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <span>Rows per page</span>
              <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 cursor-default shadow-sm">
                <span>10</span>
                <ChevronDown className="size-3 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-xs font-medium text-muted-foreground">Page {page} of {totalPages || 1}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild disabled={page <= 1} className="size-8 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30">
                  <Link href={`/repositories?page=1${search ? `&search=${search}` : ""}`}>
                    <ChevronsLeftIcon className="size-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild disabled={page <= 1} className="size-8 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30">
                  <Link href={`/repositories?page=${Math.max(1, page - 1)}${search ? `&search=${search}` : ""}`}>
                    <ChevronLeftIcon className="size-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild disabled={page >= totalPages} className="size-8 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30">
                  <Link href={`/repositories?page=${Math.min(totalPages, page + 1)}${search ? `&search=${search}` : ""}`}>
                    <ChevronRightIcon className="size-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild disabled={page >= totalPages} className="size-8 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30">
                  <Link href={`/repositories?page=${totalPages}${search ? `&search=${search}` : ""}`}>
                    <ChevronsRightIcon className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

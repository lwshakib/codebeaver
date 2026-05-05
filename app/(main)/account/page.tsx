'use client';

import { useState, useEffect, useRef } from 'react';
import { authClient } from '@/lib/auth-client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Laptop,
  Smartphone,
  Loader2,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Trash2,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

interface SessionData {
  token: string;
  userAgent?: string | null;
  updatedAt: Date;
  ipAddress?: string | null;
}


export default function AccountPage() {
  const {
    data: session,
    isPending: isSessionPending,
  } = authClient.useSession();
  const router = useRouter();

  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [userName, setUserName] = useState('');
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    }

    const getImageUrl = async () => {
      if (session?.user?.image) {
        if (session.user.image.startsWith('uploads/')) {
          try {
            const res = await fetch(`/api/s3/signed-url?path=${session.user.image}`);
            const data = await res.json();
            if (data.url) {
              setProfileImageUrl(data.url);
            }
          } catch (err) {
            console.error('Failed to get signed image URL:', err);
          }
        } else {
          setProfileImageUrl(session.user.image);
        }
      } else {
        setProfileImageUrl(null);
      }
    };
    getImageUrl();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessRes = await authClient.listSessions();
        if (sessRes.data) {
          setSessions(sessRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch account data:', err);
      } finally {
        setIsLoadingSessions(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const handleUpdateName = async () => {
    if (!userName.trim()) return;
    setIsUpdatingName(true);
    try {
      await authClient.updateUser({
        name: userName,
      });
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const toastId = toast.loading('Uploading image...');

    try {
      // 1. Get presigned URL
      const presignedRes = await fetch(
        `/api/s3/presigned-url?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`
      );
      const { url, path } = await presignedRes.json();

      if (!url) throw new Error('Failed to get upload URL');

      // 2. Upload to S3
      const uploadRes = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadRes.ok) throw new Error('Failed to upload image');

      // 3. Update user profile
      await authClient.updateUser({
        image: path,
      });

      toast.success('Profile picture updated', { id: toastId });
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Failed to update profile picture', { id: toastId });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRevokeSession = async (token: string) => {
    try {
      await authClient.revokeSession({ token });
      setSessions((prev) => prev.filter((s) => s.token !== token));
      toast.success('Session terminated');
    } catch {
      toast.error('Failed to revoke session');
    }
  };


  if (isSessionPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!session) {
    router.replace('/sign-in');
    return null;
  }


  return (
    <div className="mx-auto max-w-6xl w-full pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-foreground">
          Account Settings
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Manage your profile, connected integrations, and active sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: Profile Spotlight */}
        <div className="lg:sticky lg:top-24 space-y-6 lg:col-span-1">
          <Card className="overflow-hidden border-border bg-card shadow-xl shadow-border/50">
            <CardContent className="pt-10 pb-8 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="size-24 rounded-full bg-muted border-2 border-border flex items-center justify-center overflow-hidden">
                  {isUploadingImage ? (
                    <Loader2 className="size-8 animate-spin text-orange-600" />
                  ) : profileImageUrl ? (
                    <img src={profileImageUrl} alt={session.user.name} className="size-full object-cover" />
                  ) : (
                    <User className="size-10 text-muted-foreground" />
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full border-4 border-card text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg"
                >
                  <Icon icon="lucide:camera" className="size-3.5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div className="space-y-2 w-full px-4">
                <h2 className="text-2xl font-bold text-foreground truncate">
                  {session.user.name}
                </h2>
                <p className="text-sm text-muted-foreground font-medium truncate">
                  {session.user.email}
                </p>
                <div className="pt-4 flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-muted/50 border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <ShieldCheck className="mr-1.5 size-3.5 text-primary" />
                    Verified Account
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-border border-dashed">
            <CardContent className="p-4 text-xs text-muted-foreground leading-relaxed font-medium">
              Your profile information is used to personalize your PulseGrid experience. Connecting your GitHub account allows us to analyze your repositories.
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Configuration */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <Card className="bg-card border-border shadow-lg shadow-border/30">
            <CardHeader>
              <CardTitle className="text-foreground">Personal Information</CardTitle>
              <CardDescription className="text-muted-foreground">Update your display name and email settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Full Name</Label>
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="bg-background border-border text-foreground focus-visible:ring-ring max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Email Address</Label>
                <div className="flex items-center gap-3 text-sm font-medium bg-muted/30 text-foreground/80 p-3 rounded-md border border-border max-w-md">
                  <Mail className="size-4 text-muted-foreground" />
                  {session.user.email}
                </div>
                <p className="text-[11px] text-muted-foreground/80 italic">
                  Contact support to change your primary email address.
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-border py-4">
              <Button
                onClick={handleUpdateName}
                disabled={isUpdatingName || userName === session.user.name}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-9 px-6"
              >
                {isUpdatingName ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 size-4" />
                )}
                Save Changes
              </Button>
            </CardFooter>
          </Card>


          {/* Security & Sessions */}
          <Card className="bg-card border-border shadow-lg shadow-border/30">
            <CardHeader>
              <CardTitle className="text-foreground">Active Device Sessions</CardTitle>
              <CardDescription className="text-muted-foreground">View and manage your active sessions on different devices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingSessions ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="size-6 animate-spin text-orange-600" />
                </div>
              ) : (
                <div className="grid gap-3">
                  {sessions.map((sess) => (
                    <div
                      key={sess.token}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="p-2.5 bg-background border border-border rounded-lg shrink-0 text-muted-foreground">
                          {sess.userAgent?.includes('Mobi') ? (
                            <Smartphone className="size-4" />
                          ) : (
                            <Laptop className="size-4" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-foreground flex items-center gap-2 break-words">
                            {sess.userAgent || 'Unknown Device'}
                            {sess.token === session.session.token && (
                              <span className="shrink-0 text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20">
                                Current
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-zinc-500 font-medium">
                            Last active: {new Date(sess.updatedAt).toLocaleDateString()} at {new Date(sess.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>

                      {sess.token !== session.session.token && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 size-9"
                          onClick={() => handleRevokeSession(sess.token)}
                          title="Terminate session"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

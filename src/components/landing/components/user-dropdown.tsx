"use client";
import {
  HelpCircle,
  Layers,
  LogOut,
  Notebook,
  ScrollText,
  Settings,
  ShieldUser,
  Sparkles,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toastManager } from "../../ui/toast";
import { signOut } from "@/lib/auth-client";
import { useSession } from "@/hooks/use-session";

const UserDropdown = () => {
  const { data, isLoading } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="relative h-10 w-10 rounded-full" variant="ghost">
            <Avatar>
              <AvatarImage
                alt="User Profile"
                src={
                  data?.user?.image ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
              />
              <AvatarFallback>FN</AvatarFallback>
            </Avatar>
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 border-secondary border-4"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm leading-none">
                {data?.user?.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {data?.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/account"}>
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
          </Link>

          {data?.user?.role === "admin" && (
            <Link href={"/admin"}>
              <DropdownMenuItem>
                <Notebook />
                Your Notes
              </DropdownMenuItem>
            </Link>
          )}

          <DropdownMenuItem disabled>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <HelpCircle />
            Help
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Coming soon features */}
          <DropdownMenuItem disabled>
            <Layers />
            Flash Cards
            <Badge
              variant="secondary"
              size="sm"
              className="ml-auto text-[10px] px-1.5 py-0"
            >
              Soon
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Sparkles />
            Quizzes
            <Badge
              variant="secondary"
              size="sm"
              className="ml-auto text-[10px] px-1.5 py-0"
            >
              Soon
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant={isLoading ? "default" : "destructive"}
            onClick={async () => {
              try {
                await signOut();
                router.push("/");
                router.refresh();
              } catch {
                toastManager.add({
                  title: "Logout failed",
                  description: "Something went wrong. Please try again.",
                  type: "error",
                });
              }
            }}
          >
            <div className="relative">
              <p
                className={cn(
                  "flex justify-center items-center gap-x-2",
                  isLoading && "opacity-5",
                )}
              >
                <LogOut />
                Log out
              </p>
              {isLoading && (
                <p className="absolute top-0 left-6">
                  <Spinner />
                </p>
              )}
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;

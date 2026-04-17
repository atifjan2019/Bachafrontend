"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/store/auth";
import { getOrders } from "@/lib/api/orders";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Package, UserCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types";

export default function AccountPage() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const hydrated = useAuth((s) => s.hydrated);
  const signOut = useAuth((s) => s.signOut);
  const [orderCount, setOrderCount] = useState<number | null>(null);

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  useEffect(() => {
    if (user) {
      getOrders().then((o: Order[]) => setOrderCount(o.length));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="container-shop py-10 lg:py-14">
      <div className="text-center mb-10">
        <GoldDivider className="mb-4" />
        <h1 className="font-display text-3xl sm:text-4xl">Assalam o Alaikum, {user.name.split(" ")[0]}</h1>
        <p className="mt-2 text-sm text-muted">Welcome to your account.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        <Card
          icon={<Package className="h-6 w-6" />}
          title="Recent Orders"
          value={orderCount === null ? "..." : `${orderCount} ${orderCount === 1 ? "order" : "orders"}`}
          href="/account/orders"
          cta="View all"
        />
        <Card
          icon={<UserCircle className="h-6 w-6" />}
          title="Profile"
          value={user.email}
          href="/account/profile"
          cta="Edit profile"
        />
        <div className="bg-ivory border border-border rounded-lg p-5 flex flex-col">
          <div className="h-10 w-10 rounded-full bg-cream border border-border flex items-center justify-center text-gold">
            <LogOut className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg mt-3">Sign out</h3>
          <p className="text-sm text-muted mt-1">End your session on this device.</p>
          <Button
            variant="outline"
            className="mt-auto w-fit"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="bg-ivory border border-border rounded-lg p-5 flex flex-col">
      <div className="h-10 w-10 rounded-full bg-cream border border-border flex items-center justify-center text-gold">
        {icon}
      </div>
      <h3 className="font-display text-lg mt-3">{title}</h3>
      <p className="text-sm text-muted mt-1 truncate">{value}</p>
      <Button asChild variant="outline" className="mt-auto w-fit">
        <Link href={href}>{cta}</Link>
      </Button>
    </div>
  );
}

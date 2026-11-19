import Link from "next/link";
import {
  Home,
  Users,
  Calendar,
  TrendingUp,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { properties, formatPrice } from "@/data/properties";

export default function DashboardPage() {
  const available = properties.filter((p) => p.status === "Available").length;
  const totalValue = properties
    .filter((p) => p.status === "Available")
    .reduce((sum, p) => sum + p.price, 0);
  const recent = properties.slice(0, 4);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back. Here&apos;s what&apos;s happening with Ikorodu Realtors.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total Properties</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <Home className="h-4.5 w-4.5 text-blue-600" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {properties.length}
          </p>
          <p className="mt-1 text-xs text-emerald-600">
            {available} available
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Portfolio Value</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-600" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatPrice(totalValue)}
          </p>
          <p className="mt-1 text-xs text-gray-500">Active listings</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Active Leads</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
              <Users className="h-4.5 w-4.5 text-amber-600" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">24</p>
          <p className="mt-1 text-xs text-amber-600">+6 this week</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Appointments</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
              <Calendar className="h-4.5 w-4.5 text-purple-600" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">8</p>
          <p className="mt-1 text-xs text-gray-500">This week</p>
        </div>
      </div>

      {/* Recent properties + quick link */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Listings
            </h2>
            <Link
              href="/properties"
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs font-medium uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {p.title}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {p.area}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          p.status === "Available"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/properties"
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Home className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Properties</p>
                <p className="text-xs text-gray-500">
                  View listings & interactive map
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 opacity-60">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Add New Lead</p>
                <p className="text-xs text-gray-500">Coming soon</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 opacity-60">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Schedule Viewing</p>
                <p className="text-xs text-gray-500">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

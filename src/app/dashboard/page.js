import { AreaChart, BarChart, LineChart } from "@/components/charts";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="  bg-opacity-95 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <MetricCard
          title="Sales"
          value="50.8K"
          change={8.2}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          }
        />
        <MetricCard
          title="Product Views"
          value="23.6K"
          change={-5.2}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="2" />
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            </svg>
          }
        />
        <MetricCard
          title="Total Products"
          value="756"
          change={8.3}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
          }
        />
        <MetricCard
          title="New Customers"
          value="2.3K"
          change={8.5}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <MetricCard
          title="Store Visits"
          value="2.3K"
          change={8.5}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
          }
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 border border-purple-500/30 rounded-xl lg:grid-cols-3 gap-6 lg:gap-0">
        {/* Left Column - Revenue Chart */}
        <div className="lg:col-span-2 bg-opacity-90  p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h3 className="text-sm text-gray-400">Total revenue</h3>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">$240.8K</p>
                <span className="text-xs bg-[#132218] text-[#4ade80] px-2 py-1 rounded-full flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  6.2%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#8b5cf6]"></span>
                <span className="text-xs">Revenue</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#06b6d4]"></span>
                <span className="text-xs">Expenses</span>
              </div>
              <div className="flex items-center gap-1 bg-[#1f1f2e] px-3 py-1 rounded-md text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
                Jan 2023 - Dec 2023
              </div>
            </div>
          </div>

          <div className="relative h-[300px]">
            <AreaChart />

            {/* Highlighted data point */}
            <div className="absolute left-[30%] top-[25%] bg-[#8b5cf6] bg-opacity-20 px-3 py-2 rounded-lg">
              <p className="text-[#8b5cf6] font-bold">$125.2k</p>
              <p className="text-xs text-[#4ade80] flex items-center">
                <ArrowUpIcon className="w-3 h-3 mr-1" />
                10.3%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 mt-4 text-xs text-gray-400">
            <div>Jan</div>
            <div>Feb</div>
            <div>Mar</div>
            <div>Apr</div>
            <div>May</div>
            <div>Jun</div>
            <div>Jul</div>
            <div>Aug</div>
            <div>Sep</div>
            <div>Oct</div>
            <div>Nov</div>
            <div>Dec</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:border-l lg:border-r-0 border-purple-500/30">
          {/* Total Profit */}
          <Card className="bg-[#13131f] bg-opacity-90 border-0 border-b border-purple-500/30 rounded-none text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <h3 className="text-sm text-gray-400">Total profit</h3>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-2xl font-bold">$144.6K</p>
                <span className="text-xs bg-[#132218] text-[#4ade80] px-2 py-1 rounded-full flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  8.2%
                </span>
              </div>

              <div className="h-[100px]">
                <BarChart />
              </div>

              <div className="flex justify-between mt-4 text-xs">
                <p className="text-gray-400">Last 12 months</p>
                <button className="text-[#4ade80]">View report</button>
              </div>
            </CardContent>
          </Card>

          {/* New Orders */}
          <Card className="bg-[#13131f] bg-opacity-90 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <h3 className="text-sm text-gray-400">New Orders</h3>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-2xl font-bold">400</p>
                <span className="text-xs bg-[#132218] text-[#4ade80] px-2 py-1 rounded-full flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  4.5%
                </span>
              </div>

              <div className="h-[100px]">
                <LineChart />
              </div>

              <div className="flex justify-between mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#132218] text-[#4ade80] flex items-center justify-center rounded-full text-[8px]">
                    <ArrowUpIcon className="w-2 h-2" />
                  </span>
                  <span className="text-[#4ade80]">1.5%</span>
                  <span className="text-gray-400">10k visitors</span>
                </div>
                <button className="text-[#4ade80]">View report</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon }) {
  const isPositive = change >= 0;

  return (
    <Card className="bg-[#13131f] bg-opacity-90 border border-purple-500/30 text-white">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">{title}</span>
          <span className="text-gray-400">{icon}</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold">{value}</p>
          <span
            className={`text-xs ${
              isPositive
                ? "bg-[#132218] text-[#4ade80]"
                : "bg-[#221313] text-[#ef4444]"
            } px-2 py-1 rounded-full flex items-center`}
          >
            {isPositive ? (
              <ArrowUpIcon className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownIcon className="w-3 h-3 mr-1" />
            )}
            {Math.abs(change)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

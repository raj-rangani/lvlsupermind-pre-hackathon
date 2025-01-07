"use client";

import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PlatformCard, {
  Platform,
  PlatformIcons,
  PlatformMetrics,
} from "@/components/ui/platform-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const platforms = [
  {
    value: "reels",
    label: "Reels",
  },
  {
    value: "static_image",
    label: "Image",
  },
  {
    value: "carousel",
    label: "Carousel",
  },
];

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "#a78bfa",
  },
  visibility: {
    label: "Visibility",
    color: "#c4b5fd",
  },
} satisfies ChartConfig;

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("reels");
  const [loading, setLoading] = React.useState(false);

  const [inputText, setInputText] = React.useState("");
  // const [output, setOutput] = React.useState<{ [key: string]: object }>();
  const [chatLoading, setChatLoading] = React.useState(false);

  const [metrics, setMetrics] = React.useState<{ [key: string]: unknown }>();

  const [topViewed, setTopViewed] = React.useState<
    { [key: string]: unknown }[]
  >([]);

  const [chartData, setChartData] = React.useState<
    { [key: string]: unknown }[]
  >([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/engagement/metrics?type=${value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data["facebook"]);
        setMetrics(data.data);
        setChartData(data.monthlyData);
        setTopViewed(data.topViewed);
        console.log(data);
      })
      .finally(() => setLoading(false));
  }, [value]);

  useEffect(() => {
    setChatLoading(true);
    fetch(
      "https://api.langflow.astra.datastax.com/lf/b6240349-dead-48d6-996d-e6b7b9d2ed00/api/v1/run/3952e360-1cd1-4253-8603-83f10ea8e5bc",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LANGFLOW_TOKEN ?? ""}`,
        },
        referrerPolicy: "same-origin",
        method: "POST",
        body: JSON.stringify({ input_value: inputText }),
      }
    )
      .then((res) => res.json())
      // .then((data) => setOutput(data))
      .finally(() => setChatLoading(false));
  }, [inputText]);

  return (
    <div className="2xl:max-w-screen-xl xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm max-w-full mx-auto px-8">
      <div className="mt-5 flex justify-between items-center">
        <div className="flex gap-2.5">
          <Image
            src="/lvl-logo.png"
            alt="Image"
            width={0}
            height={0}
            sizes="100vh"
            className="w-[25%] max-w-11 max-h-11 rounded-full"
          />
          <div className="flex flex-col gap-1 justify-center text-[#6826ea]">
            <text className="text-xl font-metropolis-semibold leading-4">
              Level SuperMind
            </text>
            <text className="text-sm font-metropolis-semibold leading-4">
              Pre Hackathon Assignment
            </text>
          </div>
        </div>
        <div className="flex gap-2 font-metropolis-semibold">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="bg-gradient-to-r from-[#c084fc] to-[#fb7185] text-white rounded-lg"
              >
                <svg
                  fill="currentColor"
                  width="800px"
                  height="800px"
                  viewBox="0 0 512 512"
                  id="icons"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M208,512a24.84,24.84,0,0,1-23.34-16l-39.84-103.6a16.06,16.06,0,0,0-9.19-9.19L32,343.34a25,25,0,0,1,0-46.68l103.6-39.84a16.06,16.06,0,0,0,9.19-9.19L184.66,144a25,25,0,0,1,46.68,0l39.84,103.6a16.06,16.06,0,0,0,9.19,9.19l103,39.63A25.49,25.49,0,0,1,400,320.52a24.82,24.82,0,0,1-16,22.82l-103.6,39.84a16.06,16.06,0,0,0-9.19,9.19L231.34,496A24.84,24.84,0,0,1,208,512Zm66.85-254.84h0Z" />
                  <path d="M88,176a14.67,14.67,0,0,1-13.69-9.4L57.45,122.76a7.28,7.28,0,0,0-4.21-4.21L9.4,101.69a14.67,14.67,0,0,1,0-27.38L53.24,57.45a7.31,7.31,0,0,0,4.21-4.21L74.16,9.79A15,15,0,0,1,86.23.11,14.67,14.67,0,0,1,101.69,9.4l16.86,43.84a7.31,7.31,0,0,0,4.21,4.21L166.6,74.31a14.67,14.67,0,0,1,0,27.38l-43.84,16.86a7.28,7.28,0,0,0-4.21,4.21L101.69,166.6A14.67,14.67,0,0,1,88,176Z" />
                  <path d="M400,256a16,16,0,0,1-14.93-10.26l-22.84-59.37a8,8,0,0,0-4.6-4.6l-59.37-22.84a16,16,0,0,1,0-29.86l59.37-22.84a8,8,0,0,0,4.6-4.6L384.9,42.68a16.45,16.45,0,0,1,13.17-10.57,16,16,0,0,1,16.86,10.15l22.84,59.37a8,8,0,0,0,4.6,4.6l59.37,22.84a16,16,0,0,1,0,29.86l-59.37,22.84a8,8,0,0,0-4.6,4.6l-22.84,59.37A16,16,0,0,1,400,256Z" />
                </svg>
                Generate Insights
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Post Analysis Assistant</DialogTitle>
                <DialogDescription>
                  AI assistant to help you with your social media analytics
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                {!chatLoading ? (
                  <>
                    <pre>Chat Output</pre>
                  </>
                ) : (
                  <>Loading</>
                )}
              </div>
              <DialogFooter className="sm:justify-end w-full">
                <div className="flex w-full gap-2.5">
                  <Input
                    name="chatInput"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Write something ..."
                    className="w-full focus:border-[#7141d0] outline-none"
                  />
                  <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between rounded-lg bg-[#6826ea] hover:bg-[#411c8d]"
                  >
                    Send
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between rounded-lg"
              >
                {value
                  ? platforms.find((platform) => platform.value === value)
                      ?.label
                  : platforms[0].label}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No platform found.</CommandEmpty>
                  <CommandGroup>
                    {platforms.map((platform) => (
                      <CommandItem
                        key={platform.value}
                        value={platform.value}
                        onSelect={(currentValue: string) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === platform.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {platform.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {!loading ? (
        <>
          <div className="mt-8">
            <text className="font-metropolis-semibold text-2xl">
              Average Performance Metrics
            </text>
            <div className="flex gap-4 mt-4">
              <PlatformCard
                platform="instagram"
                metrics={metrics?.["instagram"] as PlatformMetrics}
              />
              <PlatformCard
                platform="facebook"
                metrics={metrics?.["facebook"] as PlatformMetrics}
              />
              <PlatformCard
                platform="youtube"
                metrics={metrics?.["youtube"] as PlatformMetrics}
              />
              <PlatformCard
                platform="linkedin"
                metrics={metrics?.["linkedin"] as PlatformMetrics}
              />
            </div>
          </div>
          <div className="mt-9">
            <text className="font-metropolis-semibold text-2xl">
              Post Performance & Reach (Monthly)
            </text>
            <div className="flex gap-4 mt-4">
              <div className="flex-[2] border rounded-2xl px-6 pt-4 pb-6">
                <text className="text-lg font-metropolis-semibold">
                  Average Engagement & Visibility
                </text>
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[200px] w-full mt-3"
                >
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="engagement"
                      fill="var(--color-engagement)"
                      radius={4}
                    />
                    <Bar
                      dataKey="visibility"
                      fill="var(--color-visibility)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="flex-1 border rounded-2xl px-6 py-5">
                <div className="flex flex-col">
                  <text className="font-metropolis-semibold text-lg leading-5">
                    Highest Viewed Post
                  </text>
                  <text className="font-metropolis-semibold text-sm leading-5 text-gray-400">
                    Top viewed post across different platforms
                  </text>
                </div>
                <div className="flex flex-col gap-1">
                  {topViewed.map((el, index) => (
                    <div className="flex justify-evenly gap-3 mt-5" key={index}>
                      <div className="font-metropolis-medium">
                        <span>{index + 1}.</span>
                      </div>
                      <div className="flex-1 flex flex-col w-full">
                        <span className="font-metropolis-medium leading-5">
                          {el["author"] as string}
                        </span>
                        <span className="font-metropolis-medium  text-sm truncate text-ellipsis w-72 leading-4 text-gray-400">
                          {el["caption"] as string}
                        </span>
                        <span>
                          (
                          <span className="text-[#6826ea]">
                            {Intl.NumberFormat("en", {
                              compactDisplay: "short",
                            }).format(el["reach"] as number)}
                          </span>{" "}
                          views)
                        </span>
                      </div>
                      {PlatformIcons({
                        platform: el["platform"] as keyof typeof Platform,
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="mt-8">
            <text className="font-metropolis-semibold text-2xl">
              Average Performance Metrics
            </text>
            <div className="flex gap-4 mt-4">
              <Skeleton className="flex-1 h-[116px] rounded-xl" />
              <Skeleton className="flex-1 h-[116px] rounded-xl" />
              <Skeleton className="flex-1 h-[116px] rounded-xl" />
              <Skeleton className="flex-1 h-[116px] rounded-xl" />
            </div>
          </div>
          <div className="mt-10">
            <text className="font-metropolis-semibold text-2xl">
              Post Performance & Reach (Monthly)
            </text>
            <div className="flex gap-4 mt-4 h-[460px]">
              <Skeleton className="flex-[2] border rounded-2xl px-6 pt-4 pb-6" />
              <Skeleton className="flex-1 border rounded-2xl px-6 py-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

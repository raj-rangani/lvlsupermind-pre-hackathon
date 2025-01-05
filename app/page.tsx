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
import PlatformCard from "@/components/ui/platfrom-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const frameworks = [
  {
    value: "reels",
    label: "Reels",
  },
  {
    value: "image",
    label: "Image",
  },
  {
    value: "carousel",
    label: "Carousel",
  },
];

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#a78bfa",
  },
  mobile: {
    label: "Mobile",
    color: "#c4b5fd",
  },
} satisfies ChartConfig;

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : frameworks[0].label}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-8">
        <text className="font-metropolis-semibold text-2xl">
          Average Performance Metrics
        </text>
        <div className="flex gap-4 mt-4">
          <PlatformCard platform="instagram" />
          <PlatformCard platform="facebook" />
          <PlatformCard platform="youtube" />
          <PlatformCard platform="linkedin" />
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
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="flex-1 border rounded-2xl px-6 py-5">
            <div className="flex flex-col">
              <text className="font-metropolis-semibold text-lg leading-5">
                High Performing Post
              </text>
              <text className="font-metropolis-semibold text-sm leading-5 text-gray-400">
                Top post across different platforms
              </text>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-evenly gap-3 mt-5">
                <div className="font-metropolis-medium">
                  <span>1.</span>
                </div>
                <div className="flex-1 flex flex-col w-full">
                  <span className="font-metropolis-medium leading-5">
                    sachin.sudani
                  </span>
                  <span className="font-metropolis-medium  text-sm truncate text-ellipsis w-72 leading-4 text-gray-400">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it
                  </span>
                  <span>
                    (#<span className="text-[#6826ea]">283929932003</span>)
                  </span>
                </div>
                <div>there</div>
              </div>
              <div className="flex justify-evenly gap-3 mt-5">
                <div className="font-metropolis-medium">
                  <span>2.</span>
                </div>
                <div className="flex-1 flex flex-col w-full">
                  <span className="font-metropolis-medium leading-5">
                    sachin.sudani
                  </span>
                  <span className="font-metropolis-medium  text-sm truncate text-ellipsis w-72 leading-4 text-gray-400">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it
                  </span>
                  <span>
                    (#<span className="text-[#6826ea]">283929932003</span>)
                  </span>
                </div>
                <div>there</div>
              </div>
              <div className="flex justify-evenly gap-3 mt-5">
                <div className="font-metropolis-medium">
                  <span>3.</span>
                </div>
                <div className="flex-1 flex flex-col w-full">
                  <span className="font-metropolis-medium leading-5">
                    sachin.sudani
                  </span>
                  <span className="font-metropolis-medium  text-sm truncate text-ellipsis w-72 leading-4 text-gray-400">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it
                  </span>
                  <span>
                    (#<span className="text-[#6826ea]">283929932003</span>)
                  </span>
                </div>
                <div>there</div>
              </div>
              <div className="flex justify-evenly gap-3 mt-5">
                <div className="font-metropolis-medium">
                  <span>4.</span>
                </div>
                <div className="flex-1 flex flex-col w-full">
                  <span className="font-metropolis-medium leading-5">
                    sachin.sudani
                  </span>
                  <span className="font-metropolis-medium  text-sm truncate text-ellipsis w-72 leading-4 text-gray-400">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it
                  </span>
                  <span>
                    (#<span className="text-[#6826ea]">283929932003</span>)
                  </span>
                </div>
                <div>there</div>
              </div>
              <div className="flex justify-evenly gap-3 mt-5">
                <div className="font-metropolis-medium">
                  <span>5.</span>
                </div>
                <div className="flex-1 flex flex-col w-full">
                  <span className="font-metropolis-medium leading-5">
                    sachin.sudani
                  </span>
                  <span className="font-metropolis-medium  text-sm truncate text-ellipsis w-72 leading-4 text-gray-400">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it
                  </span>
                  <span>
                    (#<span className="text-[#6826ea]">283929932003</span>)
                  </span>
                </div>
                <div>there</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

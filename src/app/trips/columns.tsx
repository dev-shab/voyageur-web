"use client";

import { formatTripDates } from "@/lib/helpers";
import type { Trip } from "@/lib/types";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TRIP_CATEGORY, TRIP_STATUS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";

const statusBadgeVariant = (status) => {
  switch (status) {
    case "BOOKED":
    case "PLANNED":
    case "IN_PROGRESS":
      return "blue";
    case "COMPLETED":
      return "green";
    case "CANCELLED":
    case "POSTPONED":
      return "red";
    default:
      return "yellow";
  }
};

const STATUS_COLORS = {
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  green: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  red: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  yellow:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
} as const;

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "title",
    header: "TITLE",
    cell: ({ row }) => {
      const { title, destination, country, imageUrl } = row.original;
      return (
        <div className="flex gap-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={destination}
              className="h-12 w-12 rounded-md object-cover"
            />
          ) : (
            <Skeleton className="h-15 w-15" />
          )}
          <div>
            <div className="text-lg font-semibold">{`${title}`}</div>
            <div className="text-sm text-muted-foreground">{`${destination}, ${country}`}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dates",
    header: "DATES",
    cell: ({ row }) => {
      const { startDate, endDate } = row.original;
      return formatTripDates(`${startDate}`, `${endDate}`);
    },
  },
  {
    accessorKey: "budget",
    header: "BUDGET",
    cell: ({ row }) => {
      const budget = row.getValue("budget");
      return budget ? `$ ${budget}` : "-";
    },
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
    cell: ({ row }) => {
      const category: string = row.getValue("category");
      return TRIP_CATEGORY[category]?.length ? (
        <Badge variant="secondary">
          <span className="text-muted-foreground">
            {TRIP_CATEGORY[category]}
          </span>
        </Badge>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const color = statusBadgeVariant(status);
      return TRIP_STATUS[status]?.length ? (
        <Badge className={STATUS_COLORS[color]}>{TRIP_STATUS[status]}</Badge>
      ) : (
        "-"
      );
    },
  },
];

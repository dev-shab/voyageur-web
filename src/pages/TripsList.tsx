import { useQuery } from "@tanstack/react-query";
import { fetchTrips } from "@/services/trip";
import { DataTable } from "@/app/trips/data-table";
import { columns } from "@/app/trips/columns";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CirclePlus, TreePalm } from "lucide-react";
import { Button } from "@/components/ui/button";
import { open } from "@/slices/createTrip";
import { useDispatch } from "react-redux";

const TripsList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["trips"],
    queryFn: fetchTrips,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data?.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <TreePalm size={64} />
          </EmptyMedia>
          <EmptyTitle>No trips yet</EmptyTitle>
          <EmptyDescription>Start Planning Your First Trip</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => dispatch(open())}>
            {" "}
            <CirclePlus />
            Create Your First Trip
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};

export default TripsList;

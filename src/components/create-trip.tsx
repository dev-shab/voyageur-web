import { CalendarIcon, DollarSign, Plus } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, TRIP_CATEGORY, TRIP_STATUS } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { Trip } from "@/lib/types";
import * as tripService from "@/services/trip";

const CreateTrip = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, watch, control, reset } = useForm<Trip>({
    defaultValues: {
      category: "LEISURE",
      status: "DRAFT",
    },
  });
  const mutation = useMutation({
    mutationFn: tripService.createTrip,
    onSuccess: () => {
      reset({
        title: "",
        destination: "",
        country: "",
        notes: "",
        budget: null,
      });
      toast.success("Trip created");
      setOpen(false);
    },
    onError: () => toast.error("Something went wrong - please try again"),
  });
  const onSubmit: SubmitHandler<Trip> = async (data) => {
    await mutation.mutateAsync(data);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          New trip
        </Button>
      </SheetTrigger>
      <form id="create-trip-form" onSubmit={handleSubmit(onSubmit)}>
        <SheetContent>
          <SheetHeader className="border-b-2">
            <SheetTitle>New Trip</SheetTitle>
          </SheetHeader>
          <FieldGroup className="gap-6 px-4">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Trip title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="e.g. Summer in Europe"
                    required
                    {...register("title")}
                  />
                </Field>
                <div className="flex gap-2">
                  <Field>
                    <FieldLabel htmlFor="destination">Destination</FieldLabel>
                    <Input
                      id="destination"
                      placeholder="e.g. Paris"
                      required
                      {...register("destination")}
                    />
                  </Field>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="country">Country</FieldLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="country"
                            className="w-full max-w-48"
                          >
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {COUNTRIES.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <Field>
                    <FieldLabel htmlFor="startDate">Start date</FieldLabel>
                    <Popover>
                      <PopoverTrigger id="startDate" asChild>
                        <Button
                          variant="outline"
                          className="w-[280px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                          {watch("startDate") ? (
                            format(watch("startDate"), "PPP")
                          ) : (
                            <span>dd/mm/yyyy</span>
                          )}
                          <CalendarIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ field }) => (
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="endDate">End date</FieldLabel>
                    <Popover>
                      <PopoverTrigger id="endDate" asChild>
                        <Button
                          variant="outline"
                          className="w-[280px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                          {watch("endDate") ? (
                            format(watch("endDate"), "PPP")
                          ) : (
                            <span>dd/mm/yyyy</span>
                          )}
                          <CalendarIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ field }) => (
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                </div>
                <div className="flex gap-2">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="category"
                            className="w-full max-w-48"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Object.entries(TRIP_CATEGORY).map(
                                ([key, value]) => (
                                  <SelectItem key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ),
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                  <Field>
                    <FieldLabel htmlFor="budget">Budget</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        placeholder={"0.0"}
                        type="number"
                        id="budget"
                        {...register("budget", { valueAsNumber: true })}
                      />
                      <InputGroupAddon>
                        <DollarSign />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </div>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="status">Status</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="status" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.entries(TRIP_STATUS).map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
                <Field>
                  <FieldLabel htmlFor="notes">Notes</FieldLabel>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information or specific requirements"
                    {...register("notes")}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
          <SheetFooter className="border-t-2">
            <Button type="submit" form="create-trip-form">
              Create Trip
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  );
};

export default CreateTrip;

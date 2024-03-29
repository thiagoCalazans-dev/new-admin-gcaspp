"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/src/components/ui/command";

import { useState } from "react";
import { Check, ChevronDown } from "@/src/infra/icons";
import { cn } from "@/src/infra/cn";

interface ComboboxProps {
  form: any;
  name: string;
  label: string;
  data: {
    id: string;
    name: string;
  }[];
}

export function Combobox({ form, name, data, label }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1 w-full">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl className="w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between text-left overflow-x-hidden",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? data.find((item) => item.id === field.value)?.name
                    : "Select an item"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-[23rem] overflow-x-hidden p-0"
              align="start"
            >
              <Command>
                <CommandInput
                  className=" overflow-x-hidden"
                  placeholder="Search..."
                />
                <CommandEmpty>No resource found.</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      className="cursor-pointer w-full z-50 "
                      value={item.name}
                      key={item.id}
                      onSelect={() => {
                        form.setValue(name, item.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          item.id === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

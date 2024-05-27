"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Check, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getFighters, saveFight } from "@/utils/actions";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getFighterById } from "@/utils/actions";
import { simulateFight } from "@/utils/fight";
import { useRouter } from "next/navigation";

type Fighter = {
  id_fighter: number;
  name: string;
};

const FormSchema = z
  .object({
    id_fighter1: z.number({
      required_error: "Please select a fighter.",
    }),
    id_fighter2: z.number({
      required_error: "Please select a fighter.",
    }),
  })
  .refine((data) => data.id_fighter1 !== data.id_fighter2, {
    message: "Fighters must be different",
    path: ["id_fighter2"],
  });

export default function CreateFightPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (session?.accessToken) {
      const fetchFighters = async () => {
        const fetchedFighters = await getFighters(session.accessToken);
        console.log(fetchedFighters);
        setFighters(fetchedFighters);
      };

      fetchFighters();
    }
  }, [session]);

  if (!session || !session.accessToken || fighters.length == 0) {
    return (
      <div className="flex flex-col items-center min-h-screen pt-20">
        <div className="w-full max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="mb-5 text-2xl font-bold text-left">
            Simulate a Fight
          </h1>
        </div>
        <div className="w-full max-w-5xl mx-auto px-4 flex justify-between items-center mt-12">
          Loading...
        </div>
        <div className="w-full max-w-5xl mx-auto px-4 flex flex-col space-y-4"></div>
        <div className="w-full max-w-5xl mx-auto px-4 mb-10"></div>
      </div>
    );
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    ("use server");

    const fighter1 = await getFighterById(
      session?.accessToken,
      data.id_fighter1,
    );
    const fighter2 = await getFighterById(
      session?.accessToken,
      data.id_fighter2,
    );

    console.log(fighter1, fighter2);

    if (!fighter1 || !fighter2) {
      console.log("nullified");
      return null;
    }

    const fight = await simulateFight(
      session?.accessToken,
      String(fighter1.name),
      String(fighter2.name),
    );

    const savedFight = await saveFight(session?.accessToken, fight);

    router.push(`/fights/${savedFight.id_fight}`);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <div className="w-full max-w-5xl mx-auto px-4 flex justify-between items-center">
        <h1 className="mb-5 text-2xl font-bold text-left">Simulate a Fight</h1>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 flex justify-between items-center mt-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="w-full max-w-5xl mx-auto px-4 flex justify-between items-center mt-12">
              {/* Group 1 */}
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="id_fighter1"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fighter 1</FormLabel>
                      <Popover open={open1} onOpenChange={setOpen1}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? fighters.find(
                                    (fighter) =>
                                      fighter.id_fighter ===
                                      Number(field.value),
                                  )?.name
                                : "Select fighter"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search fighter..." />
                            <CommandList>
                              <CommandEmpty>No fighter found.</CommandEmpty>
                              <CommandGroup>
                                {fighters.map((fighter) => (
                                  <CommandItem
                                    value={fighter.name}
                                    key={fighter.id_fighter}
                                    onSelect={() => {
                                      form.setValue(
                                        "id_fighter1",
                                        fighter.id_fighter,
                                      );
                                      setOpen1(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        fighter.id_fighter ===
                                          Number(field.value)
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {fighter.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Middle text */}
              <div className="text-center">
                <span>vs</span>
              </div>

              {/* Group2 */}
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="id_fighter2"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fighter 2</FormLabel>
                      <Popover open={open2} onOpenChange={setOpen2}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? fighters.find(
                                    (fighter) =>
                                      fighter.id_fighter ===
                                      Number(field.value),
                                  )?.name
                                : "Select fighter"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search fighter..." />
                            <CommandList>
                              <CommandEmpty>No fighter found.</CommandEmpty>
                              <CommandGroup>
                                {fighters.map((fighter) => (
                                  <CommandItem
                                    value={fighter.name}
                                    key={fighter.id_fighter}
                                    onSelect={() => {
                                      form.setValue(
                                        "id_fighter2",
                                        fighter.id_fighter,
                                      );
                                      setOpen2(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        fighter.id_fighter ===
                                          Number(field.value)
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {fighter.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Simulate"}
              </Button>{" "}
            </div>
          </form>
        </Form>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col space-y-4"></div>

      <div className="w-full max-w-5xl mx-auto px-4 mb-10"></div>
    </div>
  );
}

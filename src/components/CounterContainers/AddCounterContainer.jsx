import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ID } from "appwrite";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import counter from "../../appwrite/counter";

export const AddCounterContainer = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      status: "public",
      hasCountLimit: false,
    },
  });
  const [hasCountLimit, setHasCountLimit] = useState(
    getValues("hasCountLimit")
  );
  // const [Slug, setSlug] = useState("");

  // useEffect(() => {
  //   console.log(
  //     watch("counterName")
  //       .replace(/[^\w\s]|_/g, "")
  //       .replace(/^\s+/, "")
  //       .replace(/\s+/g, "-")
  //   );
  // }, [watch("counterName")]);

  useEffect(() => {
    setHasCountLimit(getValues("hasCountLimit") == "true");
  }, [watch("hasCountLimit")]);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const createdOnValue = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return createdOnValue;
  };

  const onSubmit = (data) => {
    console.log(data);
    // counterDefaultValue: 0
    // counterName: "s s"
    // counterResetValue: 0
    // hasCountLimit: false
    // maximumValue: 1
    // minimumValue: 0
    // status: "public"

    let createdOn = getCurrentDate();
    let slug = data.counterName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]+/g, "")
      .replace(/\s+/g, " ")
      .replace(/(\w)\s(\w)/g, "$1-$2")
      .replaceAll(" ", "-");
    let counterData = {
      counterName: data.counterName,
      counterDefaultValue: data.counterDefaultValue,
      counterResetValue: data.counterResetValue,
      countLimit: {
        hasCountLimit: data.hasCountLimit,
        minimumValue: data.minimumValue,
        maximumValue: data.maximumValue,
      },
      status: data.status,
      userId: ID.unique(),
      createdOn: createdOn,
      slug: slug,
    };

    console.log(counter.client);
    counter.createCounter(counterData);
  };

  useEffect(() => {
    document.title = "Create Counter";
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="space-y-6 p-0">
          <div className="space-y-0.5 pt-5 flex justify-center flex-col items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-0">
                Create Counter
              </h2>
              <p className="text-muted-foreground text-xs text-base relative opacity-60">
                Deploy your Counter With just a click
              </p>
            </div>
          </div>
          <div className="border-y-[1px] border-slate-300 py-5 flex justify-center">
            <div className="min-[400px]:flex-grow-0 flex-grow">
              <CardContent>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 items-start gap-4 md:px-5">
                  {/* Counter Name Input  */}
                  <div className="flex flex-col gap-2">
                    <Label>Counter Name</Label>
                    <div>
                      <Input
                        {...register("counterName", { required: true })}
                        placeholder="Name of your Counter"
                        required
                      />
                      <CardDescription className="text-slate-500 mt-1 text-nowrap text-xs">
                        Counter Slug will be created from name
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-4 min-[400px]:flex-row flex-col">
                    {/* Count Default Value Input  */}
                    <div className="flex flex-1 flex-col gap-2">
                      <Label>Counter Default Value</Label>
                      <Input
                        {...register("counterDefaultValue", { value: 0 })}
                        id="name"
                        placeholder="Name of your Counter"
                        type="number"
                      />
                    </div>
                    {/* Count Reset Value Input  */}
                    <div className="flex flex-1 flex-col gap-2">
                      <Label>Counter Reset Value</Label>
                      <Input
                        {...register("counterResetValue", { value: 0 })}
                        id="name"
                        placeholder="Name of your Counter"
                        type="number"
                      />
                    </div>
                  </div>
                  {/* Does Counter have limit Select Option  */}
                  <div className="flex flex-col flex-grow gap-2">
                    <Label>Counter Has Limit? </Label>
                    <Select
                      {...register("hasCountLimit")}
                      className=" relative top-4"
                      defaultValue={String(hasCountLimit)}
                      onValueChange={(e) => {
                        setValue("hasCountLimit", e);
                      }}
                    >
                      <SelectTrigger id="hasCountLimit">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="true">YES</SelectItem>
                        <SelectItem value="false">NO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Minimum Maximum Value  */}
                  <div className="flex gap-4 min-[400px]:flex-row flex-col">
                    {/* Minimum Count Value Input  */}
                    <div
                      className={`flex flex-col flex-grow gap-2 ${
                        !hasCountLimit ? "pointer-events-none select-none" : ""
                      }`}
                    >
                      <Label
                        className={`${!hasCountLimit ? "text-slate-400" : ""}`}
                      >
                        Minimum Value
                      </Label>
                      <Input
                        {...register("minimumValue", { value: 0 })}
                        id="name"
                        placeholder="Counter Maximum Value"
                        type="number"
                        disabled={!hasCountLimit}
                      />
                    </div>
                    {/* Maximum Count Value Input  */}
                    <div
                      className={`flex flex-col flex-grow gap-2 ${
                        !hasCountLimit ? "pointer-events-none select-none" : ""
                      }`}
                    >
                      <Label
                        className={`${!hasCountLimit ? "text-slate-400" : ""}`}
                      >
                        maximum Value
                      </Label>
                      <Input
                        {...register("maximumValue", { value: 1 })}
                        id="name"
                        placeholder="Counter Minimum Value"
                        type="number"
                        disabled={!hasCountLimit}
                      />
                    </div>
                  </div>

                  {/* Upload Counter Status  */}
                  <div className="flex flex-col gap-2">
                    <Label>Upload Status</Label>
                    <Select
                      {...register("status")}
                      className=" relative top-4"
                      defaultValue="public"
                      onValueChange={(e) => setValue("status", e)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value={"public"}>Public</SelectItem>
                        <SelectItem value={"private"}>Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => navigate("/")}
                >
                  Cancel
                </Button>
                <Button type="submit">Deploy</Button>
              </CardFooter>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const dropdown = () => {
  return <></>;
};

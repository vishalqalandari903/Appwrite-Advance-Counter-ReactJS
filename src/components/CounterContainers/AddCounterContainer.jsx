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

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import counterService from "../../appwrite/counter";
import { useSelector } from "react-redux";

import Alert from "@mui/material/Alert";
import { createCounter } from "@/app/slices/counter";

export const AddCounterContainer = () => {
  // Errors to show to user
  const errors = {
    counterNameTaken: "Counter Name has already been taken",
    allFieldsRequired: "All fields are required",
    minimumGreaterThanMaximumValue:
      "Minimum value must be greater than maximum value",
  };

  // Constants hooks
  const userData = useSelector((state) => state.auth.userData);
  const [errorMsg, setErrorMsg] = useState(errors.allFieldsRequired);

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

  // Getting counters from store
  const counters = useSelector((state) => state.counter.counters);

  // Function to get current date
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

  // Function when form submits
  const onSubmit = (data) => {
    // Making Slug
    let slug = data.counterName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/gi, "")
      .replace(/\s+/g, "-");

    // Checking if counter with this slug already exists?
    if (counters.find((counter) => counter.$id == slug)) {
      setErrorMsg(errors.counterNameTaken);
      window.scrollTo(0, 0);
    } else {
      // ? executing if slug does not exists

      if (data.hasCountLimit) {
        if (data.minimumValue > data.maximumValue) {
          setErrorMsg(errors.minimumGreaterThanMaximumValue);
          window.scrollTo(0, 0);
        } else {
          sendData(data, slug);
        }
      } else {
        sendData(data, slug);
      }

      // making error empty
      // setErrorMsg("");
    }
  };

  const sendData = (data, slug) => {
    // making data constant
    let createdOn = getCurrentDate();
    let counterData = {
      counterName: data.counterName,
      counterDefaultValue: Number(data.counterDefaultValue),
      counterResetValue: Number(data.counterResetValue),
      countLimit: {
        hasCountLimit: data.hasCountLimit,
        minimumValue: Number(data.minimumValue),
        maximumValue: Number(data.maximumValue),
      },
      status: data.status,
      userId: userData.$id,
      createdOn,
      slug,
    };

    // creating new counter
    counterService
      .createCounter(counterData)
      .then((data) => {
        createCounter(data);
        navigate("/");
      })
      .catch((error) => {
        console.log("error addCounterContainer", error);
      });
  };

  // checks if counterName already exists? as user is typing
  useEffect(() => {
    let slug = watch("counterName")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (slug !== slug.replace(/[^a-z0-9\s-]/gi, "")) {
      setErrorMsg("special characters are not allowed in counter name");
    } else {
      if (counters.find((counter) => counter.$id == slug)) {
        setErrorMsg(errors.counterNameTaken);
        window.scrollTo(0, 0);
      } else {
        setErrorMsg("");
      }
    }
    // .replace(/[^a-z0-9\s]/gi, "") // Remove all non-alphanumeric characters except spaces globally
  }, [watch("counterName")]);

  // disabling minimum, maximum input according to select option
  useEffect(() => {
    setHasCountLimit(getValues("hasCountLimit") == "true");
  }, [watch("hasCountLimit")]);

  // Handling minimum maximum value errors
  useEffect(() => {
    if (watch("maximumValue") !== "" && watch("minimumValue") !== "") {
      if (Number(watch("maximumValue")) <= Number(watch("minimumValue"))) {
        setErrorMsg(errors.minimumGreaterThanMaximumValue);
      } else {
        setErrorMsg("");
      }
    } else {
      setErrorMsg("");
    }
  }, [watch("maximumValue"), watch("minimumValue")]);

  // Setting title of the document
  // useEffect(() => {
  document.title = "Create Counter";
  // }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="space-y-6 p-0 text-base">
          <div className="space-y-0.5 pt-5 flex justify-center flex-col items-center">
            <div>
              <h2
                className={`text-2xl font-bold tracking-tight  mb-0 fade-in-50 delay-75`}
              >
                Create Counter
              </h2>
              <p className="text-muted-foreground text-xs text-base relative opacity-60">
                Deploy your Counter With just a click
              </p>
            </div>
          </div>
          <div className="border-y-[1px] border-slate-300 flex-col flex justify-center">
            <div className="w-fit flex self-center">
              {
                <Alert
                  severity="error"
                  className={`${!errorMsg && "opacity-0"} rounded-none`}
                >
                  {errorMsg}
                  What the hell
                </Alert>
              }
            </div>
            <div className="min-[400px]:flex-grow-0 px-6 py-6 gap-4 flex flex-col items-center">
              <div className="w-fit">
                <CardContent className="flex flex-col gap-4 p-0">
                  <div className="grid lg:grid-cols-2 md:grid-cols-2 items-start gap-4">
                    {/* Counter Name Input  */}
                    <div className="flex flex-col gap-2">
                      <Label>Counter Name</Label>
                      <div>
                        <Input
                          {...register("counterName", { required: true })}
                          placeholder="Name of your Counter"
                          required
                          className={`${
                            errorMsg == errors.counterNameTaken &&
                            "ring-red-500 ring-offset-0 focus-visible:ring-red-500 focus-visible:ring-offset-0 ring-2"
                          }`}
                        />
                        <CardDescription className="text-slate-500 mt-1 md:text-nowrap text-xs">
                          Counter Slug will be created from name
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-4 min-[400px]:flex-row flex-col">
                      {/* Count Default Value Input  */}
                      <div className="flex flex-1 flex-col gap-2">
                        <Label>Counter Default Value</Label>
                        <Input
                          {...register("counterDefaultValue", {
                            value: 0,
                            required: true,
                          })}
                          id="name"
                          placeholder="Name of your Counter"
                          type="number"
                          required
                        />
                      </div>
                      {/* Count Reset Value Input  */}
                      <div className="flex flex-1 flex-col gap-2">
                        <Label>Counter Reset Value</Label>
                        <Input
                          {...register("counterResetValue", {
                            value: 0,
                            required: true,
                          })}
                          id="name"
                          placeholder="Name of your Counter"
                          type="number"
                          required
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
                          !hasCountLimit
                            ? "pointer-events-none select-none"
                            : ""
                        }`}
                      >
                        <Label
                          className={`${
                            !hasCountLimit ? "text-slate-400" : ""
                          }`}
                        >
                          Minimum Value
                        </Label>
                        <Input
                          {...register("minimumValue", {
                            value: 0,
                            required: hasCountLimit ? true : false,
                          })}
                          id="name"
                          placeholder="Counter Minimum Value"
                          type="number"
                          disabled={!hasCountLimit}
                          required={hasCountLimit}
                          className={`${
                            hasCountLimit &&
                            errorMsg == errors.minimumGreaterThanMaximumValue &&
                            "ring-red-500 focus-visible:ring-red-500 ring-2"
                          }`}
                        />
                      </div>
                      {/* Maximum Count Value Input  */}
                      <div
                        className={`flex flex-col flex-grow gap-2 ${
                          !hasCountLimit
                            ? "pointer-events-none select-none"
                            : ""
                        }`}
                      >
                        <Label
                          className={`${
                            !hasCountLimit ? "text-slate-400" : ""
                          }`}
                        >
                          maximum Value
                        </Label>
                        <Input
                          {...register("maximumValue", {
                            value: 1,
                            required: hasCountLimit ? true : false,
                          })}
                          id="name"
                          placeholder="Counter Maximum Value"
                          type="number"
                          disabled={!hasCountLimit}
                          required={hasCountLimit}
                          className={`${
                            hasCountLimit &&
                            errorMsg == errors.minimumGreaterThanMaximumValue &&
                            "ring-red-500 focus-visible:ring-red-500 ring-2"
                          }`}
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
                <CardFooter className="flex justify-end gap-2 p-0">
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
        </div>
      </form>
    </>
  );
};

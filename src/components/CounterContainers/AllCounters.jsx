import React, { useEffect, useState } from "react";
import { Counter } from "./Counter";
import { CountersWrapper } from "./CountersWrapper";
import { AddCounterContainer } from "./AddCounterContainer";
import { useSelector, useDispatch } from "react-redux";
import { databases } from "../../appwrite/appwriteConfig";
import { Skeleton } from "../ui/skeleton";
import Loader from "../Loader";

export const AllCounters = () => {
  // const counters = useSelector((state) => state.counter.counters);
  const [counters, setCounters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let promise = databases.listDocuments(
      "661f34bbb5d1a230d246",
      "661f351331712a69aa84"
    );

    promise.then(
      function (response) {
        setCounters(response.documents);
        setIsLoading(false);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <CountersWrapper>
      {counters.map((counter, index) => (
        <Counter
          key={counter.$id}
          id={counter.$id}
          name={counter.name}
          count={counter.count}
          index={index}
        />
      ))}
    </CountersWrapper>
  );
};

import React, { useEffect, useState } from "react";
import { Counter } from "./Counter";
import { CountersWrapper } from "./CountersWrapper";
import counterService from "../../appwrite/counter";
import { useDispatch, useSelector } from "react-redux";
import { setCounters } from "../../app/slices/counter";

export const AllCounters = () => {
  const dispatch = useDispatch();
  const counters = useSelector((state) => state.counter.counters);

  return (
    <CountersWrapper>
      {counters.length == 0 &&
        counters.map((counter, index) => (
          <Counter
            counter={counter}
            key={counter.$id}
            id={counter.$id}
            name={counter.name}
            count={counter.value}
            index={index}
            slug={counter.slug}
          />
        ))}
      {counters.length !== 0 && <p>Counters Not Found</p>}
    </CountersWrapper>
  );
};

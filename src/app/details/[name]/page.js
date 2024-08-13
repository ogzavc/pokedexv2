"use client";
import { useParams } from "next/navigation";

export default function Details() {
  const params = useParams();
  const { name } = params;

  return <main>{name}</main>;
}

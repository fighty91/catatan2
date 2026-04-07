"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setContact } from "@/lib/features/contact/contactSlice";

export function Contact() {
  const contact = useAppSelector(state => state.contact.value);
  const dispatch = useAppDispatch();

}
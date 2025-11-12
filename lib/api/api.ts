// lib/api/api.ts
import axios, { AxiosError } from 'axios';
export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

import { Request, Response } from "express";
export default function headerMiddleWare(req: Request, res: Response, next: () => void) {
  res.setHeader("Access-Control-Allow-Origin", "*, OPTIONS");
  res.setHeader("Access-Control-Allow-Method", [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ]);
  res.setHeader("Access-Control-Allow-Headers", ["Origin", "Content-Type", "X-Auth-Token"]);
  next();
}

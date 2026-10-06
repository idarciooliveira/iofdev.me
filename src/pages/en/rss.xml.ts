import type { APIContext } from "astro";
import { rssFeed } from "../rss.xml";

export const GET = (context: APIContext) => rssFeed(context, "en");

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

export default async function getData() {
	//Find the absolute path of the json directory
	const jsonDirectory = path.join(process.cwd());
	//Read the json data file data.json
	const fileContents = await fs.readFile(
		jsonDirectory + "/mock-data.json",
		"utf8"
	);
	return fileContents;
}
